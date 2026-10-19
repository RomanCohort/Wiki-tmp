type Language = 'en' | 'zh';

export function LanguageToggle({ language, onToggle }: { language: Language; onToggle: () => void }) {
  return (
    <button
      type="button"
      className="lab-language-toggle"
      onClick={onToggle}
      aria-label={language === 'en' ? 'Switch laboratory to Chinese' : '切换实验室为英文'}
      title={language === 'en' ? 'Switch to Chinese' : 'Switch to English'}
      data-no-translate
    >
      <span aria-hidden="true">{language === 'en' ? '中文' : 'EN'}</span>
    </button>
  );
}
