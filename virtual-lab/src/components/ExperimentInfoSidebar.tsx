import { useEffect, useMemo, useRef, useState, type PointerEvent } from 'react';
import { createPortal } from 'react-dom';
import {
  ArrowLeft,
  Beaker,
  BookOpen,
  Check,
  CheckCircle2,
  CircleHelp,
  FlaskConical,
  Gamepad2,
  GripVertical,
  RotateCcw,
  ShieldCheck,
  X,
  ZoomIn,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { LabeledTubeArtwork, type TubeLabelShape } from './LabeledTubeArtwork';
import { cn } from '../lib/utils';

export interface SidebarQuestion {
  id: string | number;
  question: string;
  options: string[];
  correctIndex: number;
}

export interface SidebarMaterial {
  id: string;
  name: string;
  englishName: string;
  image: string;
  /** 可选：在底图上叠加实验场景同款的试剂标签。 */
  labelOverlay?: {
    color: string;
    shape?: TubeLabelShape;
    aspectRatio?: number;
  };
}

export interface ExperimentInfoSidebarData {
  experimentLabel: string;
  title?: string;
  safety: string[];
  principle: string;
  questions?: SidebarQuestion[];
  instruments: SidebarMaterial[];
  /** 可选：用仪器 id 控制游戏底部图标的排列顺序。 */
  instrumentTrayOrder?: string[];
  reagents: SidebarMaterial[];
}

interface ExperimentInfoSidebarProps {
  data: ExperimentInfoSidebarData;
  className?: string;
}

function MaterialArtwork({
  material,
  className,
  artworkClassName,
  decorative = false,
}: {
  material: SidebarMaterial;
  className?: string;
  artworkClassName?: string;
  decorative?: boolean;
}) {
  const alt = decorative ? '' : material.name;

  return (
    <div className={cn('flex items-center justify-center', className)}>
      {material.labelOverlay ? (
        <LabeledTubeArtwork
          imageSrc={material.image}
          alt={alt}
          labelColor={material.labelOverlay.color}
          labelShape={material.labelOverlay.shape}
          className={cn('max-h-full max-w-full', artworkClassName)}
          style={{ aspectRatio: material.labelOverlay.aspectRatio ?? 185 / 285 }}
          aria-hidden={decorative || undefined}
        />
      ) : (
        <img
          src={material.image}
          alt={alt}
          aria-hidden={decorative || undefined}
          className={cn('max-h-full max-w-full object-contain', artworkClassName)}
          draggable={false}
        />
      )}
    </div>
  );
}

function MaterialPreviewDialog({
  material,
  onClose,
}: {
  material: SidebarMaterial | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={material !== null} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="lab-dialog sm:max-w-2xl">
        {material && (
          <>
            <DialogHeader>
              <DialogTitle className="lab-serif">{material.name}</DialogTitle>
              <DialogDescription className="lab-muted" data-no-translate>{material.englishName}</DialogDescription>
            </DialogHeader>
            <div className="lab-specimen-plate flex max-h-[65vh] min-h-64 items-center justify-center overflow-hidden p-6">
              <MaterialArtwork
                material={material}
                className="h-[58vh] max-h-[58vh] w-full"
                artworkClassName="h-full"
              />
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function MaterialThumbnail({
  material,
  onPreview,
}: {
  material: SidebarMaterial;
  onPreview: (material: SidebarMaterial) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onPreview(material)}
      className="group relative flex h-14 w-12 shrink-0 items-center justify-center lab-thumb p-1.5 transition-all hover:scale-105"
      aria-label={`Enlarge${material.name}`}
      title={`Enlarge${material.name}`}
    >
      <MaterialArtwork material={material} className="h-full w-full" artworkClassName="h-full" />
      <span className="absolute bottom-0.5 right-0.5 flex h-4 w-4 items-center justify-center rounded-full lab-thumb__zoom opacity-80 transition-opacity group-hover:opacity-100">
        <ZoomIn className="h-2.5 w-2.5" />
      </span>
    </button>
  );
}

function SafetySection({ safety }: Pick<ExperimentInfoSidebarData, 'safety'>) {
  return (
    <div className="space-y-3 pr-3 pb-3 text-[11px] leading-[1.7]">
      <div className="flex items-center gap-2">
        <ShieldCheck className="h-4 w-4 lab-accent-coral" />
        <h4 className="lab-section-title">Laboratory Safety</h4>
      </div>
      <div className="space-y-2">
        {safety.map((item, index) => (
          <div key={item} className="lab-entry flex gap-2.5 p-3">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full lab-entry__num text-[9px]">
              {index + 1}
            </span>
            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PrincipleSection({
  principle,
  questions = [],
}: Pick<ExperimentInfoSidebarData, 'principle' | 'questions'>) {
  const [answers, setAnswers] = useState<Record<string, number>>({});

  return (
    <div className="space-y-4 pr-3 pb-3 text-[11px] leading-[1.75]">
      <section>
        <h4 className="lab-section-title mb-1.5">Experimental Principle</h4>
        {principle.split('\n').map((paragraph, index) => (
          paragraph.trim() ? <p key={index} className="mb-2 last:mb-0">{paragraph}</p> : null
        ))}
      </section>

      {questions.length > 0 && (
        <section className="lab-divider pt-4">
          <div className="mb-3 flex items-center gap-2">
            <CircleHelp className="h-4 w-4 lab-accent-gold" />
            <h4 className="lab-section-title">Review Questions</h4>
          </div>

          <div className="space-y-3">
            {questions.map((question, questionIndex) => {
              const answerKey = String(question.id);
              const selected = answers[answerKey];
              const answered = selected !== undefined;
              const correct = selected === question.correctIndex;

              return (
                <div key={question.id} className="lab-entry p-3">
                  <p className="lab-ink mb-2 font-medium">
                    {questionIndex + 1}. {question.question}
                  </p>
                  <div className="space-y-1.5">
                    {question.options.map((option, optionIndex) => {
                      const isSelected = selected === optionIndex;
                      const isCorrectOption = answered && optionIndex === question.correctIndex;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setAnswers((previous) => ({ ...previous, [answerKey]: optionIndex }))}
                          className={cn(
                            'lab-option flex w-full items-center gap-2 px-2.5 py-2 text-left transition-colors',
                            isCorrectOption
                              ? 'lab-option--correct'
                              : isSelected
                                ? 'lab-option--wrong'
                                : '',
                          )}
                        >
                          <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-current">
                            {isCorrectOption ? <Check className="h-3 w-3" /> : isSelected ? <X className="h-3 w-3" /> : null}
                          </span>
                          <span>{option}</span>
                        </button>
                      );
                    })}
                  </div>
                  {answered && (
                    <p className={cn('mt-2 flex items-center gap-1.5', correct ? 'lab-feedback--ok' : 'lab-feedback--warn')}>
                      {correct ? <CheckCircle2 className="h-3.5 w-3.5" /> : <CircleHelp className="h-3.5 w-3.5" />}
                      {correct ? "Correct answer" : `Try again. The correct answer is “${question.options[question.correctIndex]}”`}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}

function InstrumentMatchingGame({
  instruments,
  instrumentTrayOrder,
  onExit,
}: Pick<ExperimentInfoSidebarData, 'instruments' | 'instrumentTrayOrder'> & { onExit: () => void }) {
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<{ kind: 'success' | 'error'; text: string } | null>(null);
  const gameRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    id: string;
    pointerId: number;
    startX: number;
    startY: number;
    x: number;
    y: number;
    active: boolean;
  } | null>(null);
  const suppressClickRef = useRef(false);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!draggedId) return;
    const viewport = gameRef.current?.closest<HTMLElement>('[data-radix-scroll-area-viewport]');
    if (!viewport) return;
    let frame = 0;
    let lastTime: number | null = null;
    const scrollNearEdge = (time: number) => {
      const elapsed = lastTime === null ? 0 : Math.min(time - lastTime, 32) / 1000;
      lastTime = time;
      const drag = dragRef.current;
      if (drag?.active) {
        const bounds = viewport.getBoundingClientRect();
        const edge = Math.min(64, bounds.height / 4);
        if (drag.x >= bounds.left && drag.x <= bounds.right &&
            drag.y >= bounds.top - 24 && drag.y <= bounds.bottom + 24) {
          const up = Math.max(0, Math.min(1, (bounds.top + edge - drag.y) / edge));
          const down = Math.max(0, Math.min(1, (drag.y - bounds.bottom + edge) / edge));
          viewport.scrollTop += (down - up) * 600 * elapsed;
        }
      }
      frame = window.requestAnimationFrame(scrollNearEdge);
    };
    frame = window.requestAnimationFrame(scrollNearEdge);
    return () => window.cancelAnimationFrame(frame);
  }, [draggedId]);

  const trayItems = useMemo(() => {
    if (!instrumentTrayOrder) return instruments;
    const itemMap = new Map(instruments.map((instrument) => [instrument.id, instrument]));
    const ordered = instrumentTrayOrder
      .map((instrumentId) => itemMap.get(instrumentId))
      .filter((instrument): instrument is SidebarMaterial => Boolean(instrument));
    const orderedIds = new Set(ordered.map((instrument) => instrument.id));
    return [...ordered, ...instruments.filter((instrument) => !orderedIds.has(instrument.id))];
  }, [instrumentTrayOrder, instruments]);

  const matched = new Set(matchedIds);
  const completed = instruments.length > 0 && matchedIds.length === instruments.length;

  const tryMatch = (targetId: string, sourceId = draggedId ?? selectedId) => {
    if (!sourceId || matched.has(sourceId)) return;
    if (sourceId === targetId) {
      setMatchedIds((previous) => [...previous, sourceId]);
      setFeedback({ kind: 'success', text: "Correct match!" });
    } else {
      setFeedback({ kind: 'error', text: "Incorrect match. Please try again." });
    }
    setDraggedId(null);
    setSelectedId(null);
  };

  // Pointer capture keeps the drag alive when scrolling moves the source offscreen.
  // Unlike native HTML drag-and-drop, this also leaves mouse-wheel scrolling available.
  const startDrag = (event: PointerEvent<HTMLButtonElement>, id: string) => {
    if (event.button !== 0 || !event.isPrimary) return;
    suppressClickRef.current = false;
    dragRef.current = {
      id, pointerId: event.pointerId,
      startX: event.clientX, startY: event.clientY,
      x: event.clientX, y: event.clientY, active: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const moveDrag = (event: PointerEvent<HTMLButtonElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    drag.x = event.clientX;
    drag.y = event.clientY;
    if (!drag.active && Math.hypot(drag.x - drag.startX, drag.y - drag.startY) < 6) return;
    event.preventDefault();
    drag.active = true;
    suppressClickRef.current = true;
    setDraggedId(drag.id);
    setSelectedId(drag.id);
    setFeedback(null);
    setDragPosition({ x: drag.x, y: drag.y });
  };

  const finishDrag = (event: PointerEvent<HTMLButtonElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    dragRef.current = null;
    setDraggedId(null);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    if (!drag.active) return;
    const target = document.elementFromPoint(event.clientX, event.clientY)
      ?.closest<HTMLElement>('[data-equipment-target]');
    if (target && gameRef.current?.contains(target)) {
      tryMatch(target.dataset.equipmentTarget!, drag.id);
    }
  };

  const cancelDrag = () => {
    if (dragRef.current?.active) suppressClickRef.current = true;
    dragRef.current = null;
    setDraggedId(null);
  };

  const resetGame = () => {
    cancelDrag();
    setDraggedId(null);
    setSelectedId(null);
    setMatchedIds([]);
    setFeedback(null);
  };

  return (
    <div ref={gameRef} className="space-y-3 pr-3 pb-3 text-[10px] text-blue-100">
      {draggedId && createPortal(
        <div aria-hidden="true" className="pointer-events-none fixed z-[3000] h-16 w-16 rounded-lg border-2 border-amber-300 bg-white p-2 shadow-xl"
          style={{ left: dragPosition.x + 12, top: dragPosition.y + 12 }}>
          <MaterialArtwork material={instruments.find((instrument) => instrument.id === draggedId)!}
            className="h-full w-full" artworkClassName="h-full" decorative />
        </div>, document.body,
      )}
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <button
            type="button"
            onClick={onExit}
            className="lab-mini-button shrink-0 p-1.5"
            aria-label="Back to equipment list"
            title="Back to equipment list"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
          </button>
          <div className="min-w-0">
          <h4 className="lab-section-title">Equipment Matching Challenge</h4>
          <p className="lab-muted mt-0.5">Drag each icon to its name, or click the icon and then the name.</p>
          </div>
        </div>
        <button
          type="button"
          onClick={resetGame}
          className="lab-mini-button shrink-0 p-1.5"
          aria-label="Restart equipment matching"
          title="Restart"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </button>
      </div>

      <div>
        <div className="lab-muted mb-1.5 flex items-center justify-between">
          <span>Matching progress</span>
          <span>{matchedIds.length} / {instruments.length}</span>
        </div>
        <div className="lab-progress">
          <div
            className="lab-progress__fill"
            style={{ width: `${instruments.length ? (matchedIds.length / instruments.length) * 100 : 0}%` }}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        {instruments.map((instrument, instrumentIndex) => {
          const isMatched = matched.has(instrument.id);
          return (
            <button
              key={instrument.id}
              type="button"
              data-equipment-target={instrument.id}
              onClick={() => tryMatch(instrument.id)}
              className={cn(
                'lab-drop-slot flex min-h-12 w-full items-center gap-2 px-3 py-2 text-left transition-all',
                isMatched
                  ? 'lab-drop-slot--matched'
                  : selectedId
                    ? 'lab-drop-slot--armed'
                    : '',
              )}
            >
              <span className={cn(
                'flex h-6 w-6 shrink-0 items-center justify-center rounded-full',
                isMatched ? 'lab-drop-slot__num--done' : 'lab-drop-slot__num',
              )}>
                {isMatched ? <Check className="h-4 w-4" /> : <span className="text-[9px]">{instrumentIndex + 1}</span>}
              </span>
              <span className="min-w-0">
                <span className="lab-ink block font-medium">{instrument.name}</span>
                <span className="lab-muted" data-no-translate>{instrument.englishName}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="lab-divider pt-3">
        <p className="lab-muted mb-2 text-center">Drag the icons below to the matching names above</p>
        <div className="grid grid-cols-3 gap-2">
          {trayItems.map((instrument) => {
            const isMatched = matched.has(instrument.id);
            const isSelected = selectedId === instrument.id;
            return (
              <div key={instrument.id}>
                <button
                  type="button"
                  draggable={false}
                  disabled={isMatched}
                  onPointerDown={(event) => startDrag(event, instrument.id)}
                  onPointerMove={moveDrag}
                  onPointerUp={finishDrag}
                  onPointerCancel={cancelDrag}
                  onLostPointerCapture={cancelDrag}
                  style={{ touchAction: 'none' }}
                  onClick={(event) => {
                    if (suppressClickRef.current) {
                      suppressClickRef.current = false;
                      if (event.detail > 0) return;
                    }
                    if (isMatched) return;
                    setSelectedId(instrument.id);
                    setFeedback(null);
                  }}
                  className={cn(
                    'lab-tray-item relative flex h-[72px] w-full items-center justify-center overflow-hidden p-2 transition-all',
                    isMatched
                      ? 'lab-tray-item--matched cursor-not-allowed opacity-40'
                      : isSelected
                        ? 'lab-tray-item--selected cursor-grab'
                        : 'cursor-grab hover:-translate-y-0.5 active:cursor-grabbing',
                  )}
                  aria-label="Draggable equipment icons"
                >
                  <GripVertical className="lab-muted absolute left-0.5 top-1 h-3 w-3" />
                  <MaterialArtwork
                    material={instrument}
                    className="h-full w-full"
                    artworkClassName="h-full"
                    decorative
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {feedback && !completed && (
        <p className={cn(
          'lab-feedback-chip px-2.5 py-2 text-center',
          feedback.kind === 'success' ? 'lab-feedback-chip--ok' : 'lab-feedback-chip--bad',
        )}>
          {feedback.text}
        </p>
      )}

      {completed && (
        <div className="lab-feedback-chip lab-feedback-chip--ok p-3 text-center">
          <CheckCircle2 className="mx-auto mb-1 h-6 w-6" />
          <p className="font-semibold">All matches complete!</p>
        </div>
      )}
    </div>
  );
}

function InstrumentOverview({
  instruments,
  onStartGame,
}: Pick<ExperimentInfoSidebarData, 'instruments'> & { onStartGame: () => void }) {
  const [previewMaterial, setPreviewMaterial] = useState<SidebarMaterial | null>(null);

  return (
    <div className="space-y-2 pr-3 pb-3">
      <div>
        <h4 className="lab-section-title">Laboratory Equipment</h4>
        <p className="lab-muted mt-0.5 text-[10px]">Review the equipment for this experiment, then start the matching challenge.</p>
      </div>
      <button
        type="button"
        onClick={onStartGame}
        className="lab-pill-button lab-pill-button--care flex w-full items-center justify-center gap-2 px-3 py-2.5 text-[11px]"
      >
        <Gamepad2 className="h-4 w-4" />
        Start Matching Challenge
      </button>
      {instruments.map((instrument) => (
        <div key={instrument.id} className="lab-entry flex items-center gap-3 p-2.5">
          <MaterialThumbnail material={instrument} onPreview={setPreviewMaterial} />
          <div className="min-w-0">
            <p className="lab-ink text-[11px] font-medium">{instrument.name}</p>
            <p className="lab-muted mt-0.5 break-words text-[10px] leading-snug" data-no-translate>{instrument.englishName}</p>
          </div>
        </div>
      ))}
      <MaterialPreviewDialog material={previewMaterial} onClose={() => setPreviewMaterial(null)} />
    </div>
  );
}

function InstrumentSection({
  instruments,
  instrumentTrayOrder,
}: Pick<ExperimentInfoSidebarData, 'instruments' | 'instrumentTrayOrder'>) {
  const [gameStarted, setGameStarted] = useState(false);

  if (!gameStarted) {
    return <InstrumentOverview instruments={instruments} onStartGame={() => setGameStarted(true)} />;
  }

  return (
    <InstrumentMatchingGame
      instruments={instruments}
      instrumentTrayOrder={instrumentTrayOrder}
      onExit={() => setGameStarted(false)}
    />
  );
}

function ReagentList({ reagents }: Pick<ExperimentInfoSidebarData, 'reagents'>) {
  const [previewMaterial, setPreviewMaterial] = useState<SidebarMaterial | null>(null);

  return (
    <div className="space-y-2 pr-3 pb-3">
      <div>
        <h4 className="lab-section-title">Laboratory Reagents</h4>
        <p className="lab-muted mt-0.5 text-[10px]">Reagents are for reference; no matching is required.</p>
      </div>
      {reagents.map((reagent) => (
        <div key={reagent.id} className="lab-entry flex items-center gap-3 p-2.5">
          <MaterialThumbnail material={reagent} onPreview={setPreviewMaterial} />
          <div className="min-w-0">
            <p className="lab-ink text-[11px] font-medium">{reagent.name}</p>
            <p className="lab-muted mt-0.5 break-words text-[10px] leading-snug" data-no-translate>{reagent.englishName}</p>
          </div>
        </div>
      ))}
      <MaterialPreviewDialog material={previewMaterial} onClose={() => setPreviewMaterial(null)} />
    </div>
  );
}

export function ExperimentInfoSidebar({ data, className }: ExperimentInfoSidebarProps) {
  const instanceKey = data.experimentLabel;

  return (
    <div className={cn(
      'lab-info-card flex h-full min-h-0 flex-col p-3.5',
      className,
    )}>
      <div className="mb-3 shrink-0">
        <p className="lab-tape-label">{data.experimentLabel}</p>
        <h3 className="lab-info-card__title mt-2">{data.title ?? "Experiment Information"}</h3>
      </div>

      <Tabs defaultValue="safety" className="flex min-h-0 flex-1 flex-col">
        <TabsList className="lab-tabs mb-3 grid h-9 w-full shrink-0 grid-cols-4">
          <TabsTrigger value="safety" className="lab-tab px-1 text-[10px]">
            <ShieldCheck className="mr-0.5 h-3 w-3" />Safety
          </TabsTrigger>
          <TabsTrigger value="principle" className="lab-tab px-1 text-[10px]">
            <BookOpen className="mr-0.5 h-3 w-3" />Principle
          </TabsTrigger>
          <TabsTrigger value="instruments" className="lab-tab px-1 text-[10px]">
            <FlaskConical className="mr-0.5 h-3 w-3" />Equipment
          </TabsTrigger>
          <TabsTrigger value="reagents" className="lab-tab px-1 text-[10px]">
            <Beaker className="mr-0.5 h-3 w-3" />Reagents
          </TabsTrigger>
        </TabsList>

        <TabsContent value="safety" className="mt-0 min-h-0 flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <SafetySection safety={data.safety} />
          </ScrollArea>
        </TabsContent>
        <TabsContent value="principle" className="mt-0 min-h-0 flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <PrincipleSection key={`principle-${instanceKey}`} principle={data.principle} questions={data.questions} />
          </ScrollArea>
        </TabsContent>
        <TabsContent value="instruments" className="mt-0 min-h-0 flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <InstrumentSection
              key={`instruments-${instanceKey}`}
              instruments={data.instruments}
              instrumentTrayOrder={data.instrumentTrayOrder}
            />
          </ScrollArea>
        </TabsContent>
        <TabsContent value="reagents" className="mt-0 min-h-0 flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <ReagentList reagents={data.reagents} />
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}
