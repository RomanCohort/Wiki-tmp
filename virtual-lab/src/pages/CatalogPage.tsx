import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { allExperiments } from '../data/experiments';
import type { Experiment } from '../types';

interface CatalogPageProps {
  onSelectExperiment: (id: string) => void;
}

type Difficulty = Experiment['difficulty'];
const AVAILABLE_EXPERIMENTS = new Set(['exp1', 'exp2', 'exp3', 'exp4', 'exp5', 'exp6', 'exp7', 'exp8', 'exp9']);
const difficultyOrder: Difficulty[] = ['easy', 'medium', 'hard'];

const difficultyConfig: Record<Difficulty, { label: string; description: string }> = {
  easy: {
    label: 'Beginner',
    description: 'Build confidence with aseptic technique, culture handling and observation.',
  },
  medium: {
    label: 'Intermediate',
    description: 'Move into molecular cloning, from amplification to digestion and ligation.',
  },
  hard: {
    label: 'Advanced',
    description: 'Combine multiple techniques to verify constructs and interpret results.',
  },
};

const experimentDescriptions: Record<string, string> = {
  exp1: 'Revive E. coli DH5α from frozen stock and establish an active culture using aseptic technique.',
  exp2: 'Observe colony morphology and identify characteristic cells through Gram staining.',
  exp3: 'Extract the pET-28a plasmid and assess the sample with agarose gel electrophoresis.',
  exp4: 'Recover and purify the GFP gene fragment from an agarose gel.',
  exp5: 'Amplify the GFP gene by PCR and verify the resulting product.',
  exp6: 'Digest the pET-28a vector and GFP insert with two restriction enzymes.',
  exp7: 'Ligate the digested vector and GFP fragment into a recombinant construct.',
  exp8: 'Prepare competent E. coli cells and transform them with the recombinant plasmid.',
  exp9: 'Screen positive clones and verify GFP fluorescence and protein expression.',
};

export function CatalogPage({ onSelectExperiment }: CatalogPageProps) {
  const pageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [experimentIndex, setExperimentIndex] = useState(0);
  const wheelLockRef = useRef(0);
  const dragStartRef = useRef<number | null>(null);

  const experiments = useMemo(
    () => allExperiments.filter((experiment) => experiment.difficulty === difficulty),
    [difficulty],
  );
  const currentConfig = difficultyConfig[difficulty];
  const progress = ((experimentIndex + 1) / experiments.length) * 100;

  const move = (delta: number) => {
    if (experiments.length < 2) return;
    setExperimentIndex((current) => (current + delta + experiments.length) % experiments.length);
  };

  const selectDifficulty = (nextDifficulty: Difficulty) => {
    if (nextDifficulty === difficulty) return;
    setDifficulty(nextDifficulty);
    setExperimentIndex(0);
  };

  const carouselItems = experiments.map((experiment, index) => {
    let offset = index - experimentIndex;
    const half = experiments.length / 2;
    if (offset > half) offset -= experiments.length;
    if (offset < -half) offset += experiments.length;
    return { experiment, offset, index };
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') move(-1);
      if (event.key === 'ArrowRight') move(1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [experiments.length]);

  useLayoutEffect(() => {
    if (!pageRef.current) return;
    const context = gsap.context(() => {
      gsap.from('.catalog-stage-copy > *', {
        x: -34,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        delay: 0.12,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      });
      gsap.from('.catalog-route-button', {
        x: -24,
        opacity: 0,
        duration: 0.75,
        stagger: 0.1,
        delay: 0.25,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      });
      gsap.from('.catalog-workspace', {
        clipPath: 'inset(0 0 100% 0 round 28px)',
        duration: 1.05,
        delay: 0.18,
        ease: 'power3.inOut',
        clearProps: 'clipPath',
      });
      gsap.from('.catalog-ribbon-knot', {
        scale: 0,
        rotate: -35,
        duration: 1.15,
        delay: 0.5,
        ease: 'back.out(1.7)',
      });
    }, pageRef);
    return () => context.revert();
  }, []);

  useLayoutEffect(() => {
    if (!contentRef.current) return;
    const context = gsap.context(() => {
      const timeline = gsap.timeline();
      timeline
        .set('.catalog-transition-wave', {
          scaleX: 0,
          opacity: 0,
          transformOrigin: 'left center',
        })
        .to('.catalog-transition-wave', {
          scaleX: 1,
          opacity: 1,
          duration: 0.58,
          ease: 'power3.inOut',
        })
        .fromTo(
          '.catalog-stage-copy',
          { opacity: 0, x: -28 },
          { opacity: 1, x: 0, duration: 0.62, ease: 'power3.out', clearProps: 'transform,opacity' },
          0.22,
        )
        .fromTo(
          '.catalog-carousel-stage',
          { opacity: 0, x: -72, scale: 0.985 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.78,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
          },
          0.28,
        )
        .to('.catalog-transition-wave', {
          opacity: 0,
          duration: 0.42,
          ease: 'power2.out',
        }, 0.52)
        .set('.catalog-transition-wave', { scaleX: 0 });
    }, contentRef);
    return () => context.revert();
  }, [difficulty]);

  return (
    <div ref={pageRef} className="catalog-page">
      <main className="catalog-stage">
        <div className="catalog-stage-grid">
          <aside className="catalog-route">
            <div className="catalog-route-heading">
              <div>
                <h1>Experiments</h1>
              </div>
            </div>

            <nav aria-label="Experiment levels">
              {difficultyOrder.map((item, index) => {
                const config = difficultyConfig[item];
                const active = item === difficulty;
                const count = allExperiments.filter((experiment) => experiment.difficulty === item).length;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => selectDifficulty(item)}
                    aria-pressed={active}
                    className={`catalog-route-button ${active ? 'is-active' : ''}`}
                  >
                    <span>0{index + 1}</span>
                    <strong>{config.label}</strong>
                    <small>{count} experiments</small>
                  </button>
                );
              })}
            </nav>
          </aside>

          <section
            ref={contentRef}
            className="catalog-carousel catalog-workspace"
            onWheel={(event) => {
              const now = Date.now();
              if (now < wheelLockRef.current || Math.abs(event.deltaY) < 16) return;
              event.preventDefault();
              wheelLockRef.current = now + 420;
              move(event.deltaY > 0 ? 1 : -1);
            }}
            onPointerDown={(event) => {
              if ((event.target as HTMLElement).closest('button')) return;
              dragStartRef.current = event.clientX;
            }}
            onPointerUp={(event) => {
              if (dragStartRef.current === null) return;
              const distance = event.clientX - dragStartRef.current;
              dragStartRef.current = null;
              if (Math.abs(distance) > 55) move(distance < 0 ? 1 : -1);
            }}
            onPointerCancel={() => {
              dragStartRef.current = null;
            }}
          >
            <div className="catalog-transition-wave" aria-hidden="true" />
            <div className="catalog-stage-copy">
              <h2>{currentConfig.label}</h2>
              <p>{currentConfig.description}</p>
            </div>

            <div className="catalog-carousel-stage">
              {carouselItems.map(({ experiment, offset, index }) => {
                const active = offset === 0;
                const positionClass = active
                  ? 'active'
                  : offset === -1
                    ? 'previous'
                    : offset === 1
                      ? 'next'
                      : offset < 0
                        ? 'far-previous'
                        : 'far-next';
                return (
                  <button
                    key={experiment.id}
                    type="button"
                    className={`catalog-experiment-card catalog-experiment-card--${positionClass}`}
                    onClick={() => {
                      if (active) {
                        if (AVAILABLE_EXPERIMENTS.has(experiment.id)) onSelectExperiment(experiment.id);
                      } else {
                        setExperimentIndex(index);
                      }
                    }}
                    tabIndex={Math.abs(offset) <= 1 ? 0 : -1}
                    aria-hidden={Math.abs(offset) > 1}
                    aria-label={active ? `${experiment.titleEn}, open experiment` : `View ${experiment.titleEn}`}
                  >
                    <span className="catalog-card-number">{String(index + 1).padStart(2, '0')}</span>
                    <strong>{experiment.titleEn}</strong>
                    <span className="catalog-card-description">{experimentDescriptions[experiment.id]}</span>
                    <span className="catalog-card-action">
                      {AVAILABLE_EXPERIMENTS.has(experiment.id) ? 'Open experiment' : 'Coming soon'}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="catalog-controls">
              <div className="catalog-progress" aria-label="Experiment position">
                <span
                  className="catalog-progress-fill"
                  style={{ width: `${progress}%` }}
                />
                <span className="catalog-progress-knot" style={{ left: `${progress}%` }} aria-hidden="true">
                  <svg viewBox="0 0 32 46">
                    <path d="M8.2 41C10.8 32.6 19.8 24.7 21.4 15.9C22.6 9.2 18.4 5.1 14.3 6.6C9.7 8.2 9.6 13.3 12.4 18.3C15.7 24.2 21.8 31.3 24.2 41" />
                  </svg>
                </span>
                {experiments.map((experiment, index) => (
                  <button
                    key={experiment.id}
                    type="button"
                    onClick={() => setExperimentIndex(index)}
                    className={index === experimentIndex ? 'is-active' : ''}
                    aria-label={`View experiment ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
