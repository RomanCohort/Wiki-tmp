// src/App.tsx
import { useState, lazy, Suspense } from 'react';
import { CatalogPage } from './pages/CatalogPage';
import { useLabLanguage } from './i18n/LabLanguage';
import { LanguageToggle } from './i18n/LanguageToggle';

const ExperimentPage1 = lazy(() => import('./pages/ExperimentPage1').then((m) => ({ default: m.ExperimentPage })));
const ExperimentPage2 = lazy(() => import('./pages/ExperimentPage2').then((m) => ({ default: m.ExperimentPage })));
const ExperimentPage3 = lazy(() => import('./pages/ExperimentPage3').then((m) => ({ default: m.ExperimentPage })));
const ExperimentPage4 = lazy(() => import('./pages/ExperimentPage4').then((m) => ({ default: m.ExperimentPage })));
const ExperimentPage5 = lazy(() => import('./pages/ExperimentPage5').then((m) => ({ default: m.ExperimentPage })));
const ExperimentPage6 = lazy(() => import('./pages/ExperimentPage6').then((m) => ({ default: m.ExperimentPage })));
const ExperimentPage7 = lazy(() => import('./pages/ExperimentPage7').then((m) => ({ default: m.ExperimentPage })));
const ExperimentPage8 = lazy(() => import('./pages/ExperimentPage8').then((m) => ({ default: m.ExperimentPage })));
const ExperimentPage9 = lazy(() => import('./pages/ExperimentPage9').then((m) => ({ default: m.ExperimentPage })));

type ExperimentPageProps = { experimentId?: string; onBack: () => void; onRestart: () => void };

const experimentComponents: Record<string, React.ComponentType<ExperimentPageProps>> = {
  '1': ExperimentPage1,
  'exp1': ExperimentPage1,
  '2': ExperimentPage2,
  'exp2': ExperimentPage2,
  '3': ExperimentPage3,
  'exp3': ExperimentPage3,
  '4': ExperimentPage4,
  'exp4': ExperimentPage4,
  '5': ExperimentPage5,
  'exp5': ExperimentPage5,
  '6': ExperimentPage6,
  'exp6': ExperimentPage6,
  '7': ExperimentPage7,
  'exp7': ExperimentPage7,
  '8': ExperimentPage8,
  'exp8': ExperimentPage8,
  '9': ExperimentPage9,
  'exp9': ExperimentPage9,
};

type Page = 'catalog' | 'experiment';

function App() {
  const { language, toggleLanguage } = useLabLanguage();
  const [experimentRevision, setExperimentRevision] = useState(0);
  const [currentPage, setCurrentPage] = useState<Page>('catalog');
  const [selectedExperiment, setSelectedExperiment] = useState<string | null>(null);

  const handleSelectExperiment = (id: string) => {
    setSelectedExperiment(id);
    setCurrentPage('experiment');
  };

  const handleBackToCatalog = () => {
    setCurrentPage('catalog');
    setSelectedExperiment(null);
  };

  const ExperimentComponent = selectedExperiment ? experimentComponents[selectedExperiment] : null;

  return (
    <div className="virtual-lab-theme min-h-screen bg-background text-foreground">
      <LanguageToggle language={language} onToggle={toggleLanguage} />
      {currentPage === 'catalog' && (
        <CatalogPage onSelectExperiment={handleSelectExperiment} />
      )}

      {currentPage === 'experiment' && ExperimentComponent && (
        <Suspense
          fallback={
            <div className="flex h-screen items-center justify-center bg-background text-foreground text-sm font-medium">
              Loading experiment…
            </div>
          }
        >
          <ExperimentComponent 
            key={`${selectedExperiment}-${experimentRevision}`}
            experimentId={selectedExperiment ?? undefined}
            onBack={handleBackToCatalog} 
            onRestart={() => setExperimentRevision((revision) => revision + 1)} 
          />
        </Suspense>
      )}
    </div>
  );
}

export default App;
