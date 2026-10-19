import { Check } from 'lucide-react';
import type { ExperimentStep } from '../types';
import { ScrollArea } from './ui/scroll-area';

interface StepIndicatorProps {
  steps: ExperimentStep[];
  currentStep: number;
  completedSteps: number[];
  onStepClick?: (stepIndex: number) => void;
  showDescriptionOnHover?: boolean;
  onStepHover?: (stepIndex: number | null) => void;
  allowFreeNavigation?: boolean;
  tone?: 'default' | 'exp3';
}

export function StepIndicator({
  steps,
  currentStep,
  completedSteps,
  onStepClick,
  showDescriptionOnHover = false,
  onStepHover,
}: StepIndicatorProps) {
  // `tone` is accepted for existing callers; every workspace now shares the field-notebook skin.
  const progress = Math.round((completedSteps.length / steps.length) * 100);

  return (
    <div className="lab-steps-card h-full p-3 flex flex-col">
      <h3 className="lab-steps-card__title mb-2.5 flex items-center gap-2 shrink-0">
        <span className="lab-steps-card__count">
          {Math.min(currentStep + 1, steps.length)}
        </span>
        <span>Experiment Steps</span>
      </h3>

      <ScrollArea className="min-h-0 flex-1 -mx-1">
        <div className="space-y-1.5 px-1">
          {steps.map((step, index) => {
            const isCompleted = completedSteps.includes(index);
            const isActive = index === currentStep;
            const isPending = index > currentStep;
            const canNavigate = Boolean(onStepClick) && !isPending;
            const state = isActive ? 'active' : isCompleted ? 'done' : isPending ? 'pending' : 'open';

            return (
              <div
                key={step.id}
                onClick={() => { if (canNavigate) onStepClick?.(index); }}
                role={onStepClick ? 'button' : undefined}
                tabIndex={onStepClick ? (canNavigate ? 0 : -1) : undefined}
                aria-disabled={onStepClick ? !canNavigate : undefined}
                aria-current={isActive ? 'step' : undefined}
                onKeyDown={canNavigate ? (event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    onStepClick?.(index);
                  }
                } : undefined}
                onMouseEnter={() => onStepHover?.(index)}
                onMouseLeave={() => onStepHover?.(null)}
                data-state={state}
                className={`lab-step group flex items-start gap-2 px-2 py-1.5
                  ${canNavigate ? 'cursor-pointer' : isPending ? 'cursor-not-allowed' : 'cursor-default'}`}
              >
                <div className="lab-step__marker">
                  {isCompleted ? (
                    <Check className="w-2.5 h-2.5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="lab-step__title text-[11px] leading-snug break-words">
                    {step.title}
                  </p>
                  {showDescriptionOnHover && (
                    <p className="lab-step__desc max-h-0 overflow-hidden text-[10px] leading-relaxed opacity-0 transition-all duration-200 group-hover:mt-1 group-hover:max-h-24 group-hover:opacity-100">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      {/* 进度条 */}
      <div className="lab-steps-card__footer mt-2 pt-2 shrink-0">
        <div className="flex items-center justify-between text-[10px] mb-1.5">
          <span>Overall Progress</span>
          <span className="lab-mono">{progress}%</span>
        </div>
        <div className="lab-progress">
          <div className="lab-progress__fill" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}
