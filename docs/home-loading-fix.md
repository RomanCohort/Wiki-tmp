# 首页图片加载问题：排查与修复记录

> 适用代码：`2026/jlu-fbh` wiki（React + Vite）
> 记录时间：2026-10-20
> 面向：后续接手 wiki 维护的同学

---

## 1. 现象

首页在部分手机上、以及部分网络环境下出现：

- 场景图只显示一部分；
- 弹出 `Some scene images could not load` + 当前章节名；
- 有时整页停在 `Loading scene images…` 不再前进；
- 部分手机（老 WebView）出现破图图标；
- 电脑端在部署切换期间也偶发看到同样的红字。

一开始的猜测是「页面是 HTTPS，图片是 HTTP 的混合内容」——**这个猜测是错的**。源码里所有资源都是 `https://static.igem.wiki/...`，服务端也正常返回 `Access-Control-Allow-Origin: *`。

---

## 2. 排查过程与实测数据

### 2.1 先证明不是「服务器慢」

`static.igem.wiki` 实际走 **AWS CloudFront**（解析到 `18.65.x.x` / `13.33.x.x` 等边缘 IP）。

| 测试 | 结果 |
|---|---|
| 首页图片总量 | 111 张，约 **12.8 MB** |
| 直连、并发 20 下载全部 | 6 秒，最慢 1.42 秒，0 失败 |
| 单张冷连接 | 偶发 **10 秒**（之后同图 0.19 秒） |
| 服务器出口到 CloudFront | 17–26 ms，1–1.6 MB/s |

结论：不是「带宽不够导致整体慢」，而是**偶发长尾 + 固定超时**把个别请求判成了失败。

### 2.2 找到「全量并发」的源头

`src/utils/pageLoader.ts` 的 `pageImagesAndAnimations()`：

- 遍历 `document.body` 全部元素；
- 对所有 `img`、SVG `<image>`、CSS `background-image` 调用 `preload()`；
- 全部塞进 `pending`，最后 `await Promise.all(pending)`。

它有一个视口跳过逻辑，但被条件锁死：

```ts
const deferred = (element: Element) => {
  if (!article?.contains(element)) return false;  // 只对 .wiki-article 生效
  ...
};
```

首页不是 `.wiki-article`，所以 **首页所有资源都会一次性进入并发队列**。实测：一次页面加载在 2 秒内发出 278 个图片请求。

### 2.3 找到「加载条不消失」的源头

在 `pageReady()` / `styledPageReady()` 的每个 await 之间打时间戳（`?loader-timing` 开启），得到：

```
renderFrames#1  187ms
prepareArt#1    510ms   ← 图片其实已经好了
aborted        15197ms  ← 卡在这里，直到 15 秒 deadline
fonts#1        15197ms
```

卡点有两个：

1. **`document.fonts.ready` 偶发 10–15 秒**。字体文件本身正常（0.18–0.45 秒），但链路上偶发长尾，`fonts.ready` 会一直等。
2. **`finishPagePreparations()` 排空循环永不到头**。`createRnaRingMorph` 注册的 preparation 是手动 resolve 的，`refresh()` 里 geometry 测不出来就直接 `return`，这个 promise 永远不会完成。而 15 秒 deadline 之后本来也会强行放行——**这 14 秒等待收益为零**。

### 2.4 找到「红字死锁」

- `homeArtwork.status()` 只要场景内有一张图 `error` 就返回 `error`；
- `useHomePlayback.tick()` 只判断 `status !== "ready"`，`error` 也会被当成「还没准备好」→ `return`；
- 结果：一张图失败 → 整章暂停 → 弹红字。

### 2.5 找到「手机破图」的真正原因

不是文件缺失。抽查：

```
clinician-concerned.avif  200  image/avif  62 KB
clinician-concerned.webp  403  ← 不存在
```

三张场景图（`clinician-concerned` / `clinician-ellipsis` / `patient-question`）是 **AVIF**，而部分安卓 WebView / 老 iOS **没有 AVIF 解码器**。文件完好，但浏览器解不出来，表现成破图。

### 2.6 找到「测试站 Footer 破图」的原因

Footer、导航图标等资源是用模板字符串拼的：

```ts
const mathworks = `${SHARED_CDN}/sponsor-mathworks.avif`;
```

按静态字符串提取 URL 的正则会漏掉这些文件名，导致镜像时没下载、URL 替换后 404。

---

## 3. 修复内容

### 3.1 `src/utils/homeArtwork.ts`

- **超时自适应**：8 秒一刀切 → 桌面 12s、触摸设备约 18.5s、省流量/2G 25s；
- **失败不再死锁**：`status()` 只等待「尚未结束」的图；`complete` 但没有像素的图不再永远算 loading；
- **AVIF 回退后的 error 状态解除**：带 `data-avif-fallback` 的元素不再把场景判成 error；
- **预热读取真实 URL**：优先读 `data-artwork-src`，避免被占位资源挡住。

### 3.2 `src/hooks/useHomePlayback.ts`

- **两阶段预热**：首屏章节立即加载，1.5 秒后后台加载其余章节——正好利用 intro 播放的那十几秒；
- **入场门槛**：播放开始前等待所有章节「不再 loading」，失败的直接跳过；最多等 **30 秒**，超时先开始、剩余静默续传；
- 章节变化时预热「当前 + 下一章」；
- 等待条件从 `!== "ready"` 改为 `=== "loading"`：失败跳过，继续播放；
- `seekChapter` 同样只等 loading；
- **演示期间静默等待**：自动播放时，加载中和失败的章节都不显示任何卡片，画面停在当前帧，就绪后继续；只有用户手动接管（`mode === "manual"`）时才出现重试按钮。

> 曾经尝试把预取扩到「当前 + 后两章」，在 200 KB/s 限速下请求从 187 涨到 254，带宽被摊薄、超时反而增多（`artworkError` 0 → 61），已回滚为「当前 + 下一章」。

> 也试过「全部加载完才进入」，200 KB/s 下 50 秒仍有 91 张在队列里，因此加了 30 秒入场预算：演示网络正常时几乎立刻放行，弱网时不会无限等待。

### 3.3 `src/utils/pageLoader.ts`

- **首页章节按视口 deferred**：两屏以外的 `.story-chapter` 不再进入 `pending`；
- **字体等待上限 2.5 秒**（所有字体都是 `font-display: swap`，字体晚到不应阻塞页面）；
- **场景准备排空预算 4 秒**，到点放行，动画准备在后台继续；
- **跳过 `data:` 资源**，避免占位图进入预加载；
- 增加可选的时间戳日志：URL 加 `?loader-timing` 才会输出。

### 3.4 `src/utils/homeArtworkGate.ts`

- 遍历 `document` 的 `img` / SVG `image`，把 `.avif` **统一换成同名 `.webp`**；
- 用 `MutationObserver` 监听 `document.body`，覆盖后挂载的 Footer 等组件；
- 不再有模糊占位（LQIP 方案已移除，视觉上像页面坏了）。

### 3.5 首页组件

- 场景图 `loading="eager"` → `lazy`（预热时 `warm()` 会自动切回 eager）；
- `home-scene-01.tsx` 安装 gate（`useLayoutEffect`）。

### 3.6 CSS

- 加载中/失败的图层保持原有隐藏规则；
- 不再有 LQIP 相关的例外。

### 3.7 测试契约

`scripts/verify-page-image-loading.mjs`：

- 原测试要求「字体加载完才做布局测量」，与「字体不能卡死页面」冲突；
- 改为「字体最多等 2.5 秒」，测试名同步调整为 *a stalled font cannot hold layout past its own budget*。

---

## 4. 效果对比

| 指标 | 修复前 | 修复后 |
|---|---|---|
| 首页图片请求（首屏） | 278 | 约 125–156 |
| loader 消失（本地） | 15.1 秒（deadline 强制） | **4.7 秒** |
| loader 消失（线上真实网络） | ~15 秒 | 约 10 秒 |
| AVIF 全禁用模拟 | 红字 + 大量破图 | **0 红字、0 破图** |
| 全站 `avifSrc`（首页 / 路由切换后） | 27 / — | **0 / 0** |
| 全站 404 | Footer、导航图标批量 404 | **0** |
| 页面加载测试 | 44/44 | **44/44** |
| 构建 | 通过 | 通过 |

---

## 5. 测试方法（可复现）

### 5.1 本地构建与预览

```bash
yarn install
yarn build
yarn preview --port 4173
```

### 5.2 加载计时

访问 `http://localhost:4173/jlu-fbh/?loader-timing`，控制台会输出：

```
[loader-timing] [{"label":"start","at":0},...]
```

### 5.3 模拟弱网

在服务器上起一个只监听 `127.0.0.1` 的限速代理（200 KB/s），再通过 SSH 隧道拉回本地，用 Playwright 把图片请求改走代理。可验证 loader、超时、降级行为。

### 5.4 模拟「手机不支持 AVIF」

Playwright：

```js
await page.route(/\.avif(\?|$)/, (route) => route.abort());
```

然后检查：

```js
document.querySelectorAll('[data-home-artwork="error"]').length  // 应为 0
[...document.querySelectorAll("img")].filter(i => i.complete && i.naturalWidth === 0).length  // 应为 0
```

### 5.5 契约测试

```bash
yarn test:page-loading
```

---

## 6. 文件清单

| 文件 | 说明 |
|---|---|
| `src/utils/pageLoader.ts` | 页面加载器：视口 gate、字体上限、准备预算、计时日志 |
| `src/utils/homeArtwork.ts` | 首页图加载器：超时自适应、error 降级 |
| `src/utils/homeArtworkGate.ts` | 统一 AVIF → WebP、覆盖全部 DOM |
| `src/hooks/useHomePlayback.ts` | 章节预热、失败不阻塞 |
| `src/containers/App/App.tsx` | 全站安装 AVIF → WebP gate |
| `src/components/Navbar.tsx` | 桌面导航卡片图按需加载 |
| `src/contents/home-scene-01.tsx` | 首页根组件（gate 已上移到 App） |
| `src/contents/home-story.tsx` 等 7 个组件 | 场景图 lazy |
| `src/styles/home-playback.css` | 加载/失败状态样式 |
| `scripts/verify-page-image-loading.mjs` | 加载契约测试 |
| `docs/home-loading-fix.md` | 本文档 |

---

## 7. 已知限制

1. **全站已统一 AVIF → WebP**：gate 挂在 `App.tsx` 的 `useEffect`，覆盖所有路由。**但前提是 WebP 已上传到 `static.igem.wiki`**——没有 WebP 的页面会 404，所以正式站上传完成前，这一段不要合并进 iGEM 仓库。
2. **Navbar 桌面卡片图已改为面板打开时才请求**（96 张 → 关闭时 0 张）；移动端菜单的卡片图仍保持原样，可同样处理但收益有限。
3. **未做章节条件渲染（unmount）**。当前是「延迟 src」而不是不挂载 DOM，SVG 资源仍会在章节挂载时请求。
4. **测试站资源本地化只用于实验**。正式提交 iGEM 的版本必须使用 `static.igem.wiki`，不能引用 `www.romancohort.cloud`。

---

## 8. 部署说明（测试站）

- 站点根：`/var/www/site`，wiki 子路径：`/jlu-fbh/`；
- 资源镜像目录：`/var/www/site/wikifiles/teams/6056/wiki/files/...`；
- 构建后把 `dist` 中的 `https://static.igem.wiki` 替换为 `https://www.romancohort.cloud/wikifiles` 再上传；
- AVIF 的 WebP 副本由服务器上的 `sharp` 批量生成（一张一进程，避免 OOM）。

**注意**：以上本地化仅用于测试，**不要**提交到 iGEM 正式仓库。

---

## 9. 回滚

如果某项改动引起回归，按文件回滚：

- 只想恢复「不阻塞」逻辑：回滚 `src/hooks/useHomePlayback.ts`；
- 只想恢复加载器行为：回滚 `src/utils/pageLoader.ts`；
- 只想恢复图片格式策略：回滚 `src/utils/homeArtworkGate.ts` 并移除 `home-scene-01.tsx` 中的安装调用。

提交前务必跑：

```bash
yarn build && yarn test:page-loading
```

---

## 10. 把 WebP 上传到 iGEM（正式站）

测试站的 WebP 放在 `www.romancohort.cloud` 上，**正式提交不能引用它**。iGEM 要求所有资源由 iGEM 基础设施提供，所以必须把 WebP 传到 `static.igem.wiki`。

### 10.1 在测试服务器上打包

```bash
ssh root@www.romancohort.cloud \
  "cd /var/www/site/wikifiles && find . -name '*.webp' | tar -czf /tmp/webp-all.tar.gz -T -"
```

### 10.2 下载到本地

```bash
scp root@www.romancohort.cloud:/tmp/webp-all.tar.gz .
tar -xzf webp-all.tar.gz -C ./webp-upload
```

解压后的目录结构与 `static.igem.wiki` 完全一致：

```
webp-upload/
└── teams/6056/wiki/files/
    ├── pages/home/clinician-concerned.webp
    ├── pages/shared/nav-roster.webp
    └── ...
```

### 10.3 通过 iGEM 上传工具上传

地址：<https://teams.igem.org/go/deliverables/wiki/uploads>

要点：

1. **目录必须与图片原路径一致**——`pages/home/` 下的 WebP 必须传到 `pages/home/`，不能平铺。
2. **文件名必须与 AVIF 同名，只换扩展名**——例如 `clinician-concerned.avif` → `clinician-concerned.webp`。代码是靠同名替换找回来的。
3. 可以分批上传，先传首页相关的（`pages/home/`、`pages/shared/`），再传其余。
4. 上传完成后，用下面的命令抽查。

### 10.4 验证

```bash
curl -sI https://static.igem.wiki/teams/6056/wiki/files/pages/home/clinician-concerned.webp \
  | grep -iE "^(HTTP|content-type|content-length)"
```

应返回 `200` 和 `Content-Type: image/webp`。

### 10.5 代码侧要不要改

- **全站**：gate 已经挂在 `App.tsx`，所有路由的 `.avif` 都会换成 `.webp`，WebP 一旦存在就自动生效。
- **前提**：上传必须覆盖代码里出现的每一个 AVIF 文件名，否则该位置会 404。建议先传首页相关的 `pages/home/`、`pages/shared/`，验证后再传其余。
- **没有 WebP 的页面**：不要提前合并这段代码，否则会 404。可以先在测试站验证。

### 10.6 回滚

如果上传后某张 WebP 有问题，直接删掉该文件即可——代码在 WebP 请求失败后不会再退回 AVIF，但那一个位置会显示破图；恢复 AVIF 引用需要回滚对应的 URL 替换。

---

## 11. 测试站资源本地化（完整步骤）

以下是把 wiki 从「依赖跨境 CloudFront」搬到自有服务器的完整流程，仅用于测试。正式站不要照做。

### 11.1 提取资源 URL

```bash
grep -rhoE 'https://static\.igem\.wiki/[^"'"'"' )]+\.(webp|avif|png|jpe?g|svg|woff2?)' \
  src index.html | sort -u > /tmp/wikifiles.txt
```

**注意**：这样就够了吗？不够。以下资源是用模板字符串拼的，正则抓不到完整文件名：

```ts
const mathworks = `${SHARED_CDN}/sponsor-mathworks.avif`;
```

所以第一次镜像后会出现 Footer、导航图标批量 404。**正确做法是镜像后再用浏览器跑一遍，收集所有 404 URL 补下载**（见 11.4）。

### 11.2 服务器端镜像

在服务器上运行 Python（`urllib` + 线程池）：

```python
import os, urllib.request
from concurrent.futures import ThreadPoolExecutor

ROOT = "/var/www/site/wikifiles"
urls = [l.strip() for l in open("/tmp/wikifiles.txt") if l.strip()]

def fetch(url):
    path = url.split("https://static.igem.wiki/", 1)[-1]
    dest = os.path.join(ROOT, path)
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=60) as r, open(dest, "wb") as f:
        f.write(r.read())

with ThreadPoolExecutor(max_workers=10) as pool:
    list(pool.map(fetch, urls))
```

实测结果：797 个文件、约 206 MB。

### 11.3 构建时替换 URL

```bash
mkdir -p dist-local && cp -a dist/. dist-local/
grep -rl 'https://static.igem.wiki' dist-local \
  --include=*.js --include=*.css --include=*.html --include=*.json \
  | while read -r f; do
      sed -i 's|https://static.igem.wiki|https://www.romancohort.cloud/wikifiles|g; s|\.avif|\.webp|g' "$f"
    done
```

第二条 `s|\.avif|\.webp|g` 只在**测试站**使用：所有 WebP 都已就位时直接换扩展名，避免「先请求 AVIF、失败再换 WebP」造成每张图两次请求。弱网实测中，双请求把并发从 187 推到 366，直接压垮带宽。

替换后检查：`grep -ro 'https://static.igem.wiki' dist-local | wc -l` 应为 0；入口 chunk 里 `.avif` 也应为 0：

```bash
entry=$(grep -oE 'assets/[^"]+\.js' dist-local/index.html | head -1)
grep -o '\.avif' "dist-local/$entry" | wc -l
```

### 11.4 补下载 404

用 Playwright 打开部署后的页面，收集所有 `status >= 400` 的图片 URL：

```js
page.on("response", (res) => {
  if (isImage(res.url()) && res.status() >= 400) bad.add(res.url());
});
```

把结果转换成服务器上的相对路径后在服务器补齐：

```bash
while IFS= read -r p; do
  mkdir -p "/var/www/site/wikifiles/$(dirname "$p")"
  curl -s -f -o "/var/www/site/wikifiles/$p" "https://static.igem.wiki/$p"
done < /tmp/missing.txt
```

本次补了 41 个（Footer 图标、导航图）。

### 11.5 AVIF → WebP 批量转换

服务器内存只有 896 MB，`sharp` 多并发会 OOM。用「一张一个进程」：

```js
// one.js
const sharp = require("/opt/avif2webp/node_modules/sharp");
const fs = require("fs");
const src = process.argv[2];
const dest = src.replace(/\.avif$/i, ".webp");
if (fs.existsSync(dest)) process.exit(0);
sharp(src).webp({ quality: 85 }).toFile(dest)
  .then(() => process.exit(0))
  .catch((e) => { console.error(e.message); process.exit(1); });
```

```bash
find /var/www/site/wikifiles -iname "*.avif" -print0 \
  | while IFS= read -r -d "" f; do
      [ -f "${f%.avif}.webp" ] || node /opt/avif2webp/one.js "$f"
    done
```

超大图（如 624 KB 的 `jlu-crest.avif`）仍可能 OOM，需要单独用 `resize({ width: 512 })` + `sequentialRead(true)` 处理。

**顺序很重要**：转换必须在「补下载 404」之后跑。本次先转换、后补齐，导致后来下载的 41 个文件没有 WebP，Footer 又破了一轮。

### 11.6 部署与验证

```bash
tar -C dist-local -czf - . \
  | ssh root@www.romancohort.cloud "tar -xzf - -C /var/www/site/jlu-fbh"
```

验证：

```bash
curl -sI https://www.romancohort.cloud/jlu-fbh/ | head -1
curl -sI https://www.romancohort.cloud/wikifiles/teams/6056/wiki/files/pages/home/scene-1-layer-1.webp | head -1
```

---

## 12. 常见坑（本次实际踩过）

| 坑 | 表现 | 处理 |
|---|---|---|
| 模板字符串资源没被提取 | Footer/导航批量 404 | 用浏览器收集 404 后补下载 |
| `sharp` 并发转换 OOM | 进程 `Killed` | 一张一进程，大图单独 resize |
| 构建在错误目录执行 | `Couldn't find a package.json`，部署了旧包 | 命令前显式 `cd` 到项目根 |
| 浏览器缓存旧 JS | 修复后仍看到旧红字 | 加 `?v=` 参数或无痕窗口 |
| nginx 无 SPA fallback | 直接访问 `/jlu-fbh/results` 返回 404 | 站点内导航测试；正式站需要 `try_files` |
| `status()` 把失败当 pending | `Loading scene images…` 永不到头 | 只等待 `!complete` 的图 |
| AVIF 失败后 error 状态不解除 | 图已经显示 WebP，红字仍弹 | 回退时打 `data-avif-fallback`，`status()` 跳过 |
| 首页图被延迟替换 | 首屏黑屏 | gate 不要碰 `.home-scene01` |
| gate 先加载 AVIF 再换 WebP | 每张图请求两次，弱网下请求数翻倍、超时暴涨 | 测试站构建时直接替换扩展名 |
| `cp -a dist/. dist-local/` 累积旧 chunk | `dist-local` 里残留几十个旧 hash 文件，统计 `.avif` 时虚高 | 每次构建后重建 `dist-local`，或以入口 chunk 为准 |
