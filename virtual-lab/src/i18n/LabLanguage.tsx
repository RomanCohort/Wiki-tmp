import { useEffect, useState } from 'react';
import translations from './translations.zh.json';
import reviewedTranslations from './translations.reviewed.zh.json';

type Language = 'en' | 'zh';
const translationMap: Record<string, string> = Object.fromEntries(
  Object.entries({ ...translations, ...reviewedTranslations }).map(([english, chinese]) => [normalize(english), chinese]),
);
const attributeNames = ['aria-label', 'title', 'placeholder', 'alt'];
const originalText = new WeakMap<Text, string>();
const originalAttributes = new WeakMap<Element, Map<string, string>>();

function normalize(value: string) {
  return value.replace(/\s+/g, ' ').trim();
}

function localizedText(original: string, language: Language) {
  if (language === 'en') return original;
  const normalized = normalize(original);
  let translated = translationMap[normalized];
  if (!translated) {
    const stepNumber = normalized.match(/^STEP\s*(\d+)$/);
    const previousStep = normalized.match(/^Previous · STEP\s*(\d+)$/);
    const experimentNumber = normalized.match(/^View experiment (\d+)$/);
    if (stepNumber) translated = `步骤 ${stepNumber[1]}`;
    else if (previousStep) translated = `上一步 · 步骤 ${previousStep[1]}`;
    else if (experimentNumber) translated = `查看实验 ${experimentNumber[1]}`;
    else if (normalized.startsWith('View ')) translated = `查看${translationMap[normalized.slice(5)] ?? normalized.slice(5)}`;
    else if (normalized.endsWith(', open experiment')) translated = `${translationMap[normalized.slice(0, -17)] ?? normalized.slice(0, -17)}，打开实验`;
    else if (normalized.startsWith('In progress:')) translated = `进行中：${translationMap[normalize(normalized.slice(12))] ?? normalized.slice(12)}`;
    else if (normalized.startsWith('New tip attached. Click the highlighted pipette to aspirate')) {
      const name = normalized.slice('New tip attached. Click the highlighted pipette to aspirate'.length);
      translated = `已安装新吸头。点击高亮的移液器吸取${translationMap[name] ?? name}`;
    } else if (normalized.startsWith('Aspirating with a new tip')) {
      const name = normalized.slice('Aspirating with a new tip'.length).replace(/…$/, '');
      translated = `正在用新吸头吸取${translationMap[name] ?? name}……`;
    } else if (normalized.startsWith('Change tips after every addition! Fit a new tip, then click the pipette to aspirate')) {
      const name = normalized.slice('Change tips after every addition! Fit a new tip, then click the pipette to aspirate'.length);
      translated = `每次加样后都要更换吸头！安装新吸头，再点击移液器吸取${translationMap[name] ?? name}`;
    } else {
      const reagentLabel = normalized.match(/^(.+)\((retrieved|in ice box|in box)\)$/);
      if (reagentLabel) {
        const name = translationMap[reagentLabel[1]] ?? reagentLabel[1];
        const locations: Record<string, string> = { retrieved: '已取出', 'in ice box': '在冰盒中', 'in box': '在盒中' };
        const location = locations[reagentLabel[2]];
        translated = `${name}（${location}）`;
      }
    }
  }
  if (!translated) return original;
  const leading = original.match(/^\s*/)?.[0] ?? '';
  const trailing = original.match(/\s*$/)?.[0] ?? '';
  return leading + translated + trailing;
}

function translateTextNode(node: Text, language: Language) {
  const parent = node.parentElement;
  if (!parent || parent.closest('script, style, code, pre, textarea, [data-no-translate]')) return;
  const current = node.nodeValue ?? '';
  if (!normalize(current)) return;
  let original = originalText.get(node);
  if (original === undefined || (current !== original && current !== localizedText(original, 'zh'))) {
    original = current;
    originalText.set(node, original);
  }
  const target = localizedText(original, language);
  if (current !== target) node.nodeValue = target;
}

function translateElementAttributes(element: Element, language: Language) {
  if (element.closest('[data-no-translate]')) return;
  let originals = originalAttributes.get(element);
  if (!originals) {
    originals = new Map();
    originalAttributes.set(element, originals);
  }
  for (const name of attributeNames) {
    const current = element.getAttribute(name);
    if (!current) continue;
    let original = originals.get(name);
    if (original === undefined || (current !== original && current !== localizedText(original, 'zh'))) {
      original = current;
      originals.set(name, original);
    }
    const target = localizedText(original, language);
    if (current !== target) element.setAttribute(name, target);
  }
}

function translateSubtree(root: Node, language: Language) {
  if (root instanceof Text) {
    translateTextNode(root, language);
    return;
  }
  if (!(root instanceof Element)) return;
  translateElementAttributes(root, language);
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (node instanceof Text) translateTextNode(node, language);
    else if (node instanceof Element) translateElementAttributes(node, language);
  }
}

function initialLanguage(): Language {
  try {
    return window.localStorage.getItem('virtual-lab-language') === 'zh' ? 'zh' : 'en';
  } catch {
    return 'en';
  }
}

export function useLabLanguage() {
  const [language, setLanguage] = useState<Language>(initialLanguage);

  useEffect(() => {
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    try { window.localStorage.setItem('virtual-lab-language', language); } catch { /* storage may be disabled */ }
    translateSubtree(document.body, language);
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'characterData') translateSubtree(mutation.target, language);
        else if (mutation.type === 'attributes') translateElementAttributes(mutation.target as Element, language);
        else mutation.addedNodes.forEach((node) => translateSubtree(node, language));
      }
    });
    observer.observe(document.body, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: attributeNames,
    });
    return () => observer.disconnect();
  }, [language]);

  return { language, toggleLanguage: () => setLanguage((value) => value === 'en' ? 'zh' : 'en') };
}

