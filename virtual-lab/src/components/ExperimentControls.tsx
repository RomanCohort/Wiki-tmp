import { RotateCcw } from 'lucide-react';
import { Button } from './ui/button';

export function RestartExperimentButton({ onRestart }: { onRestart: () => void }) {
  return (
    <button type="button" onClick={onRestart} aria-label="Restart experiment" title="Restart experiment"
      className="lab-icon-button grid h-8 w-8 shrink-0 place-items-center">
      <RotateCcw className="h-4 w-4" />
    </button>
  );
}

export function ExperimentCompletion({ onRestart, onBack }: { onRestart: () => void; onBack: () => void }) {
  return (
    <div role="dialog" aria-modal="true" aria-labelledby="experiment-complete-title"
      className="lab-completion absolute inset-0 z-[300] flex items-center justify-center p-6 text-center animate-in fade-in">
      <div className="lab-completion__card max-w-xs">
        <p className="lab-tape-label mx-auto mb-4">Field note · done</p>
        <div className="lab-completion__seal mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full">
          <div className="flex h-12 w-12 items-center justify-center rounded-full text-2xl" aria-hidden="true">✓</div>
        </div>
        <h2 id="experiment-complete-title" className="lab-completion__title mb-6 text-3xl">Experiment Complete</h2>
        <div className="flex gap-3">
          <Button onClick={onRestart} className="lab-pill-button lab-pill-button--primary flex-1">Try Again</Button>
          <Button onClick={onBack} variant="outline" className="lab-pill-button lab-pill-button--ghost flex-1">Back</Button>
        </div>
      </div>
    </div>
  );
}
