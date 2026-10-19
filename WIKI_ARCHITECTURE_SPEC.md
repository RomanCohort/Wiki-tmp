# Wiki 共用图片加载规则

本次仅同步官方仓库现有页面使用的共享加载底座，不引入未发布页面。

## 共享阅读页样式

`src/styles/wiki-route-skin.css` 是阅读器结构、正文、图注与折叠条目的唯一共享样式入口。模块配色由 `route-palette-*.css` 提供，页面专属样式只管理该页组件。旧的两套全局阅读样式及导入已删除，不得重新引入或复制旧的版式覆盖规则。

### 4.7 页面加载与加载动画退出规则

**加载单位是当前目标页面。** 首次打开与站内跳转采用同一规则：先显示 `index.html` 的加载动画，在遮罩下加载并挂载目标路由，等待该页的全部图片与动画资源就绪，再退出加载动画、显示页面。不得将所有路由的正文、图片或动画代码集中加载，也不得只等首屏图片便把普通页面的其余图片留给滚动时加载。

1. **路由代码按页加载**：`src/contents/index.tsx` 通过 `React.lazy` + 动态 `import()` 注册各页。`src/pages.ts` 仅提供同步导航元数据；导航栏、搜索与路由表不得因静态导出而拉入全部页面。公共导航、页脚、字体及共享运行时可以共用缓存。
2. **挂载后才判断就绪**：`src/containers/App/App.tsx` 的 `Suspense` 保留加载遮罩；目标页面实际提交后，由 `PageReady` 调用唯一共享入口 `hidePageLoaderWhenReady()`。不得在路由代码仍在加载、旧页面仍在屏幕上或只有 fallback 时提前判定完成。
3. **整页资源必须就绪**：`src/utils/pageLoader.ts` 等待样式与字体，以及当前已挂载页面的所有 `<img>`（包括屏幕外、透明、滚动揭示层）、SVG `<image>`、CSS 背景与蒙版（包括伪元素）、动画视频的 poster 和可渲染首帧。图片在遮罩期间触发加载并等待 `decode()`；普通页面的 `loading="lazy"` 不得绕过这一就绪门槛。
4. **动画就绪不等于播放结束**：CSS / SVG / GSAP 动画的代码、样式与所需图片须已准备好，动画仍按原有入场、滚动或交互时机播放；无限循环动画不等待播放完成。页面加载遮罩本身的有限入场动画结束后才允许退出。
5. **唯一按点击加载例外**：Games 页的游戏本体、虚拟实验室，以及页面中明确说明点击后才加载的 PDF、图谱、3D 查看器、播放器或其他对象，可以继续按点击挂载、下载并显示自己的加载状态。页面上的封面、预览图与普通正文图片仍须提前就绪。不得把普通内容擅自归为例外；点击加载对象未打开时，不创建其实际资源节点或提前请求其应用包。
6. **跳转与失败处理**：切换页面时取消上一轮就绪判定，迟到的旧请求不能收起新页面的遮罩。图片或媒体明确报错时结束该资源等待、保留页面原有替代显示；不得以固定计时器（例如原来的 8 秒上限）把仍在加载的普通图片视为已就绪。已缓存资源可以直接复用，不强制重复下载。

#### 4.7.1 共享模板的图片准备契约（新页面自动继承）

加载策略必须由共享底座执行，页面不得另写计时器、图片扫描器或加载遮罩。

- **公共导航**：`Navbar` 的桌面与移动菜单图标默认立即加载，不等待菜单展开；共享加载器等待这些图标就绪。
- **普通正文**：`WikiRoutePage` 自动把 `heroImage` 和 `content.sections` 中全部 `figure.src` 交给 `PageImagePreloads`。`wikiPageImages()` 递归覆盖 `dbtl.stages[].blocks` 和 `split.prose / aside`，包括未展开的抽屉和未选中的阶段。以后新增、替换普通正文图只改数据层，无需再改加载逻辑。
- **自定义交互**：如果图片尚未挂载在 DOM 中，将其 URL 清单通过模板的 `preloadImages` 属性声明。可复用 Feature 也可以在自身的始终挂载部分使用共享 `PageImagePreloads`；清单从已有资产字典、访谈或协议数据派生，不复制一套 URL。`protocolPairs` 的流程图与器材图由 `WikiRoutePage` 自动收集。
- **整页兜底**：`pageLoader.ts` 读取图片预加载声明，并扫描当前已挂载页面的图片、SVG 与 CSS 图像；普通 `<img>` 即使原先标记为 `lazy`，也会在遮罩期间统一启动加载，等待实际 `load / error`，成功后再完成解码。图片还在请求时的解码拒绝不能算作加载完成。
- **首页及独立布局**：首页各章节在加载遮罩期间一起准备素材，不按滚动距离才开始下载。未使用 `WikiRoutePage` 的独立页面复用 `wikiPageImages()` 和 `PageImagePreloads`，仍由 App 的同一个 `PageReady` 判定退出。
- **资源范围**：清单只包含目标页面及公共界面的普通图片。PDF 文件、游戏包、虚拟实验室、3D 数据和播放器本体继续遵循第 5 条的点击加载例外，预览图仍属于页面图片。

```tsx
// 普通正文图已在 pageContent 的 figure blocks 中，模板会自动收集。
// 只有交互之后才挂载的普通图片需要额外声明；不要把 PDF 或游戏包传入。
<WikiRoutePage
  content={pageContent}
  heroImage={getModuleHeroImage(pageContent.route)}
  preloadImages={dialogPhotos.map((photo) => photo.src)}
  features={pageFeatures()}
/>
```

新增可复用 Feature 时，若它自己拥有图片数据，使用下面的统一声明即可；在展开条件之外声明，所有复用该 Feature 的页面都会继承：

```tsx
<>
  <PageImagePreloads sources={records.map((record) => record.image)} />
  {open ? <ImageDialog record={records[selected]} /> : null}
</>
```

加载时序回归检查：`node --test scripts/verify-page-image-loading.mjs`，覆盖隐藏导航、整页图片、未挂载的弹窗、SVG/伪元素、慢图、失败、连续切页和大型对象例外。

**验收**：直接打开或切换到 Description / Hardware，加载遮罩退出时 Hero 和全部普通正文图片都已加载并解码；菜单第一次展开时图标已就绪。模拟慢速、损坏图片与连续切页，验证退出时机。后续发布其他页面时复用同一规则，PDF、游戏本体等仍按点击加载。
