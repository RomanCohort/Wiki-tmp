import { useExperimentTimers } from '../hooks/use-experiment-timers';
import { useStepSnapshots } from '../hooks/use-step-snapshots';
import { RestartExperimentButton, ExperimentCompletion } from '../components/ExperimentControls';
// src/pages/ExperimentPage1.tsx
import { useState, useCallback, useMemo, useEffect, useLayoutEffect, useRef } from 'react';
import { ChevronLeft, Lightbulb } from 'lucide-react';

import { allExperiments } from '../data/experiments';
import { StepIndicator } from '../components/StepIndicator';
import { Experiment1InfoPanel } from '../components/Experiment1InfoPanel';
import gsap from 'gsap';

interface ExperimentPageProps {
  experimentId?: string;
  onBack: () => void;
  onRestart: () => void;
}

const CANVAS_ASPECT_RATIO = 16 / 9;
const ALPHA_GLOW = '[filter:drop-shadow(0_0_3px_#fff8a6)_drop-shadow(0_0_9px_#ffd52e)_drop-shadow(0_0_14px_rgba(255,190,0,0.82))]';
const COMPACT_GLOW = '[filter:drop-shadow(0_0_1px_#fff)_drop-shadow(0_0_4px_#fff45c)_drop-shadow(0_0_8px_rgba(255,204,0,1))]';

function useFixedCanvasSize() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const updateSize = () => {
      const { width: availableWidth, height: availableHeight } = frame.getBoundingClientRect();
      const width = Math.min(availableWidth, availableHeight * CANVAS_ASPECT_RATIO);
      const height = width / CANVAS_ASPECT_RATIO;

      setSize(previous => (
        Math.abs(previous.width - width) < 0.25 && Math.abs(previous.height - height) < 0.25
          ? previous
          : { width, height }
      ));
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  return {
    frameRef,
    canvasStyle: size.width > 0
      ? { width: size.width, height: size.height, aspectRatio: '16 / 9' }
      : { width: '100%', aspectRatio: '16 / 9' },
  };
}

export function ExperimentPage({ experimentId = 'exp1', onBack, onRestart }: ExperimentPageProps) {
  const { schedule: scheduleTimeout, cancel: cancelTimers } = useExperimentTimers();
  const experiment = useMemo(() => 
    allExperiments.find(e => e.id === experimentId) || allExperiments[0],
  [experimentId]);

  // 通用基础状态
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [coolingMessage, setCoolingMessage] = useState('');

  // ========== 实验一专属状态 ==========
  const [freezerOpen, setFreezerOpen] = useState(false); // 冰箱是否打开
  const [tubeVisible, setTubeVisible] = useState(false); // 菌管是否可见
  const [tubeOnIce, setTubeOnIce] = useState(false); // 菌管是否已放到冰上
  const [lampLit, setLampLit] = useState(false); // 酒精灯是否点燃
  const [loopHeated, setLoopHeated] = useState(false); // 接种环是否已第一次灼烧
  const [tubeOpened, setTubeOpened] = useState(false); // 菌管是否已打开
  const [hasBacteria, setHasBacteria] = useState(false); // 接种环是否沾有菌体
  const [plateStreaked, setPlateStreaked] = useState(false); // 平板是否已划线
  const [incubatorOpen, setIncubatorOpen] = useState(false); // 培养箱是否打开
  const [plateInIncubator, setPlateInIncubator] = useState(false); // 平板是否已放入培养箱
  const [showStreakingDetail, setShowStreakingDetail] = useState(false); // 划线详情弹窗
  const [showColoniesDetail, setShowColoniesDetail] = useState(false); // 菌落详情弹窗
  const [showIncubationClock, setShowIncubationClock] = useState(false); // 恒温培养时钟提示是否显示
  const [incubationComplete, setIncubationComplete] = useState(false); // 培养完成后才展示划线/菌落结果
  const { frameRef: canvasFrameRef, canvasStyle } = useFixedCanvasSize();
  const [tubeAtBench, setTubeAtBench] = useState(false);
  const [tubeClickable, setTubeClickable] = useState(false);

  const pendingRestoreStepRef = useRef<number | null>(null);
  const [sceneRevision, setSceneRevision] = useState(0);

  // ========== 显式的"下一步可点击"开关（参考实验二队友写法：每个阶段各司其职，
  // 点击后立刻关闭防止重复触发，动画走完再精确打开下一个开关） ==========
  const [loopClickable, setLoopClickable] = useState(false); // 接种环当前是否高亮可点

  // 用于防止 completedSteps 重复塞入同一个下标，导致进度超过100%
  const markStepCompleted = useCallback((stepIdx: number) => {
    setCompletedSteps(prev => (prev.includes(stepIdx) ? prev : [...prev, stepIdx]));
  }, []);

  const clearMotion = useCallback(() => {
    const targets = [
      '#freezer',
      '#tube',
      '#inoculation-loop',
      '#petri-dish',
      '#alcohol-lamp',
      '#incubator',
    ];
    gsap.killTweensOf(targets);
    gsap.set('#inoculation-loop', {
      left: '19%',
      top: '82%',
      x: 0,
      y: 0,
      xPercent: 0,
      opacity: 1,
      filter: 'none',
    });
    gsap.set('#petri-dish', {
      left: '35%',
      top: '68.5%',
      scale: 1,
      x: 0,
      y: 0,
      opacity: 1,
      filter: 'none',
    });
    gsap.set(['#freezer', '#tube', '#alcohol-lamp', '#incubator'], {
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
      filter: 'none',
    });
  }, []);

  const restoreSceneForStep = useCallback((stepIndex: number) => {
    clearMotion();

    const base = {
      freezerOpen: false,
      tubeVisible: false,
      tubeOnIce: false,
      lampLit: false,
      loopHeated: false,
      tubeOpened: false,
      hasBacteria: false,
      plateStreaked: false,
      incubatorOpen: false,
      plateInIncubator: false,
      showIncubationClock: false,
      incubationComplete: false,
      tubeAtBench: false,
      tubeClickable: false,
      loopClickable: false,
      showStreakingDetail: false,
      showColoniesDetail: false,
      coolingMessage: '',
    };

    const byStep: Record<number, Partial<typeof base>> = {
      0: {},
      1: {
        tubeVisible: true,
        tubeOnIce: true,
      },
      2: {
        lampLit: true,
        loopHeated: true,
        tubeOpened: true,
        hasBacteria: true,
        tubeAtBench: true,
        loopClickable: true,
      },
      3: {
        lampLit: true,
        loopHeated: true,
        tubeOpened: true,
        hasBacteria: true,
        plateStreaked: true,
        tubeAtBench: true,
        loopClickable: true,
      },
      4: {
        lampLit: true,
        loopHeated: true,
        tubeOpened: true,
        hasBacteria: true,
        plateStreaked: true,
        tubeAtBench: true,
        loopClickable: true,
      },
      5: {
        lampLit: true,
        loopHeated: true,
        tubeOpened: true,
        hasBacteria: true,
        plateStreaked: true,
        tubeAtBench: true,
      },
      6: {
        lampLit: true,
        loopHeated: true,
        tubeOpened: true,
        hasBacteria: true,
        plateStreaked: true,
        incubatorOpen: true,
        plateInIncubator: true,
        showIncubationClock: true,
        tubeAtBench: true,
      },
    };

    const next = { ...base, ...(byStep[stepIndex] ?? {}) };
    setFreezerOpen(next.freezerOpen);
    setTubeVisible(next.tubeVisible);
    setTubeOnIce(next.tubeOnIce);
    setLampLit(next.lampLit);
    setLoopHeated(next.loopHeated);
    setTubeOpened(next.tubeOpened);
    setHasBacteria(next.hasBacteria);
    setPlateStreaked(next.plateStreaked);
    setIncubatorOpen(next.incubatorOpen);
    setPlateInIncubator(next.plateInIncubator);
    setShowIncubationClock(next.showIncubationClock);
    setIncubationComplete(next.incubationComplete);
    setTubeAtBench(next.tubeAtBench);
    setTubeClickable(next.tubeClickable);
    setLoopClickable(next.loopClickable);
    setShowStreakingDetail(next.showStreakingDetail);
    setShowColoniesDetail(next.showColoniesDetail);
    setCoolingMessage(next.coolingMessage);
    setIsAnimating(false);
    setHoveredStep(null);

    if (stepIndex >= 6) {
      gsap.set('#petri-dish', {
        left: '39%',
        top: '24.1%',
        scale: 0.35,
        x: 0,
        y: 0,
        opacity: 1,
        filter: 'none',
      });
    }
  }, [clearMotion]);

  useLayoutEffect(() => {
    const stepIndex = pendingRestoreStepRef.current;
    if (stepIndex === null) return;
    restoreSceneForStep(stepIndex);
    pendingRestoreStepRef.current = null;
  }, [restoreSceneForStep, sceneRevision]);

    const stepSnapshots = useStepSnapshots(currentStep, isAnimating,
    () => ({ currentStep, completedSteps, isAnimating, coolingMessage, freezerOpen, tubeVisible, tubeOnIce, lampLit, loopHeated, tubeOpened, hasBacteria, plateStreaked, incubatorOpen, plateInIncubator, showStreakingDetail, showColoniesDetail, showIncubationClock, incubationComplete, tubeAtBench, tubeClickable, loopClickable }),
    (state) => {
    setCurrentStep(state.currentStep);
    setCompletedSteps(state.completedSteps);
    setIsAnimating(state.isAnimating);
    setCoolingMessage(state.coolingMessage);
    setFreezerOpen(state.freezerOpen);
    setTubeVisible(state.tubeVisible);
    setTubeOnIce(state.tubeOnIce);
    setLampLit(state.lampLit);
    setLoopHeated(state.loopHeated);
    setTubeOpened(state.tubeOpened);
    setHasBacteria(state.hasBacteria);
    setPlateStreaked(state.plateStreaked);
    setIncubatorOpen(state.incubatorOpen);
    setPlateInIncubator(state.plateInIncubator);
    setShowStreakingDetail(state.showStreakingDetail);
    setShowColoniesDetail(state.showColoniesDetail);
    setShowIncubationClock(state.showIncubationClock);
    setIncubationComplete(state.incubationComplete);
    setTubeAtBench(state.tubeAtBench);
    setTubeClickable(state.tubeClickable);
    setLoopClickable(state.loopClickable);
    setHoveredStep(null);
    setSceneRevision((revision) => revision + 1);
  });

const handleStepNavigation = useCallback((stepIndex: number) => {
    if (stepIndex < 0 || stepIndex >= experiment.steps.length || stepIndex > currentStep || isAnimating) return;
    cancelTimers();
    if (stepSnapshots.restore(stepIndex)) return;
    clearMotion();
    setCompletedSteps(Array.from({ length: stepIndex }, (_, index) => index));
    pendingRestoreStepRef.current = stepIndex;
    setCurrentStep(stepIndex);
    setSceneRevision((revision) => revision + 1);
  }, [clearMotion, experiment.steps.length, currentStep, isAnimating, stepSnapshots, cancelTimers]);

  


  // 坐标调试工具
  useEffect(() => {
    const handleDebugClick = (e: MouseEvent) => {
      const stage = document.getElementById('experiment-canvas');
      if (!stage) return;
      const rect = stage.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      console.log(`Debug position: left-[${x.toFixed(1)}%] top-[${y.toFixed(1)}%]`);
    };
    window.addEventListener('click', handleDebugClick);

    return () => window.removeEventListener('click', handleDebugClick);
  }, []);

  // ========== 步骤动画执行函数 ==========
  const executeStepAnimation = useCallback((stepIndex: number) => {
    if (isAnimating) return;
    setIsAnimating(true);

    const tl = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false);
      }
    });

    // 步骤0：点击冰箱，冰箱打开，出现菌管
    if (stepIndex === 0) {
      tl.to("#freezer", {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.inOut"
      }).call(() => {
        setFreezerOpen(true);
        setTubeVisible(true);
        setIsAnimating(false);
      });
    }
    // 步骤0：点击菌管，菌管移动到冰盒上，正好搁在冰块上面
    else if (stepIndex === 1) {
      tl.to("#tube", {
        left: "25%",
        top: "64%",
        duration: 1,
        ease: "power2.inOut"
      }).call(() => {
        setTubeOnIce(true);
        setFreezerOpen(false);
        setIsAnimating(false);
        markStepCompleted(0);
        setCurrentStep(1);
      });
    }
  }, [isAnimating, markStepCompleted]);

  // ========== 器材点击事件处理（每一步都是独立分支，显式开关，互不干扰） ==========
  const handleItemClick = useCallback((itemId: string) => {
    console.log('handleItemClick called for:', itemId, 'currentStep:', currentStep, 'isAnimating:', isAnimating);
    if (isAnimating) return;

    // ==================== 步骤0：取出甘油菌管 ====================
    if (currentStep === 0 && itemId === 'freezer' && !freezerOpen) {
      executeStepAnimation(0);
      return;
    }
    if (currentStep === 0 && itemId === 'tube' && tubeVisible && !tubeOnIce) {
      executeStepAnimation(1);
      return;
    }

    // ==================== 步骤1：点击酒精灯，点燃 -> 接种环立即高亮 ====================
    if (currentStep === 1 && itemId === 'alcohol-lamp' && !lampLit) {
      setLampLit(true);
      setLoopClickable(true); // 打开：准备第一次灼烧
      return;
    }

    // ==================== 步骤1：点击接种环，第一次灼烧灭菌 ====================
    if (currentStep === 1 && itemId === 'inoculation-loop' && loopClickable && !loopHeated) {
      setLoopClickable(false); // 立刻关闭，防止重复点击触发动画
      setIsAnimating(true);

      const loop = document.querySelector("#inoculation-loop");
      if (!loop) {
        setIsAnimating(false);
        return;
      }

      // 5.png 的可见接种环位于图片底端；此坐标让环底略高于火焰顶端。
      const flameX = "50.3%";
      const flameY = "55.6%";

      const burnTl = gsap.timeline({
        onComplete: () => {
          gsap.to(loop, {
            x: 6, duration: 0.16, repeat: 5, yoyo: true,
            ease: "power1.inOut",
            onComplete: () => {
              gsap.to(loop, {
                left: "19%", top: "82%", x: 0, duration: 0.5,
                ease: "back.out(1)",
                onComplete: () => {
                  setLoopHeated(true);
                  setIsAnimating(false);
                  setCoolingMessage("Cool for a few seconds");
                  scheduleTimeout(() => {
                    setCoolingMessage('');
                    setTubeClickable(true); // 冷却结束，先点击菌管将其从冰盒取下
                  }, 500);
                }
              });
            }
          });
        }
      });

      burnTl.to(loop, {
        left: flameX, top: flameY, duration: 0.6,
        ease: "power2.inOut"
      }, 0);

      return;
    }

    // ==================== 步骤1：点击菌管，先闭盖移到冰盒前方，落稳后再开盖 ====================
    if (currentStep === 1 && itemId === 'tube' && tubeOnIce && tubeClickable && !tubeOpened && !tubeAtBench) {
      setTubeClickable(false);
      setIsAnimating(true);

      const tube = document.querySelector("#tube");
      if (!tube) {
        setTubeAtBench(true);
        setTubeOpened(true);
        setLoopClickable(true);
        setIsAnimating(false);
        return;
      }

      gsap.to(tube, {
        left: "25%",
        top: "78%",
        duration: 0.75,
        ease: "power2.inOut",
        onComplete: () => {
          setTubeAtBench(true);
          setTubeOpened(true);
          setLoopClickable(true);
          setIsAnimating(false);
        }
      });
      return;
    }

    // ==================== 步骤1：点击接种环，对准台面菌管的管口并挑取菌体 ====================
    if (currentStep === 1 && itemId === 'inoculation-loop' && loopClickable && loopHeated && tubeOpened && tubeAtBench && !hasBacteria) {
      setLoopClickable(false); // 立刻关闭
      setIsAnimating(true);

      const loop = document.querySelector<HTMLElement>("#inoculation-loop");
      if (!loop) {
        setIsAnimating(false);
        return;
      }

      gsap.set(loop, { x: 0, y: 0, xPercent: 0 });
      gsap.timeline().to(loop, {
        // 5.png 的环位于图片左下端；向管身右侧偏移 0.8%，使环中心对准管口。
        left: "25.8%",
        top: "67.0%",
        x: 0,
        y: 0,
        xPercent: 0,
        duration: 0.55,
        ease: "power2.inOut"
      }).to(loop, {
        x: "+=6",
        duration: 0.18,
        repeat: 3,
        yoyo: true,
        ease: "power1.inOut"
      }).to('#tube', {
        y: -18,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in"
      }).call(() => {
        setHasBacteria(true);
        gsap.to(loop, {
          left: "19%",
          top: "82%",
          duration: 0.5,
          x: 0,
          y: 0,
          xPercent: 0,
          ease: "power2.inOut",
          onComplete: () => {
            setIsAnimating(false);
            markStepCompleted(1);
            setCurrentStep(2);
            setLoopClickable(true); // 打开：进入步骤2，准备划线
          }
        });
      });
      return;
    }

    // ==================== 步骤2：点击接种环，在平板上划线（接种环位于培养基上方，右移） ====================
    if (currentStep === 2 && itemId === 'inoculation-loop' && loopClickable && hasBacteria && !plateStreaked) {
      setLoopClickable(false); // 立刻关闭
      setIsAnimating(true);

      const loop = document.querySelector("#inoculation-loop");
      if (!loop) {
        setIsAnimating(false);
        return;
      }

      const tl = gsap.timeline();

      tl.to(loop, {
        left: "40.1%",
        top: "62.5%",
        duration: 0.5,
        ease: "power2.inOut"
      }).call(() => {
        gsap.to(loop, {
          xPercent: "-=10",
          duration: 0.2,
          repeat: 3,
          yoyo: true,
          ease: "power1.inOut",
          onComplete: () => {
            setPlateStreaked(true);
            gsap.to(loop, {
              left: "19%",
              top: "82%",
              duration: 0.4,
              ease: "power2.inOut",
              onComplete: () => {
                setIsAnimating(false);
                markStepCompleted(2);
                setCurrentStep(3);
                setLoopClickable(true); // 打开：进入步骤3，准备再次灼烧
              }
            });
          }
        });
      });
      return;
    }

    // ==================== 步骤3：点击接种环，再次灼烧灭菌 ====================
    if (currentStep === 3 && itemId === 'inoculation-loop' && loopClickable && plateStreaked) {
      setLoopClickable(false); // 立刻关闭
      setIsAnimating(true);

      const loop = document.querySelector("#inoculation-loop");
      if (!loop) {
        setIsAnimating(false);
        return;
      }

      const tl = gsap.timeline();

      tl.to(loop, {
        left: "50.3%",
        top: "55.6%",
        duration: 0.5,
        ease: "power2.inOut"
      }).call(() => {
        gsap.to(loop, {
          x: 6,
          duration: 0.16,
          repeat: 5,
          yoyo: true,
          ease: "power1.inOut",
          onComplete: () => {
            gsap.to(loop, {
              left: "19%",
              top: "82%",
              duration: 0.4,
              ease: "power2.inOut",
              onComplete: () => {
                setIsAnimating(false);
                markStepCompleted(3);
                setCurrentStep(4);
                setLoopClickable(true); // 打开：进入步骤4，查看四区划线详情
              }
            });
          }
        });
      });
      return;
    }

    // ==================== 步骤4：四区划线法（点击接种环查看详情） ====================
    if (currentStep === 4 && itemId === 'inoculation-loop' && loopClickable) {
      setLoopClickable(false); // 立刻关闭
      setShowStreakingDetail(true);
      return;
    }

    // ==================== 步骤5：恒温培养（放入培养箱，左移并缩小，置于顶层） ====================
    if (currentStep === 5 && itemId === 'petri-dish' && plateStreaked && !plateInIncubator) {
      setIsAnimating(true);
      const tl = gsap.timeline({
        onComplete: () => setIsAnimating(false)
      });
      tl.to("#petri-dish", {
        left: "39%",
        top: "24.1%",
        scale: 0.35,
        duration: 1.2,
        ease: "power2.inOut"
      }).call(() => {
        setIncubatorOpen(true);
        setPlateInIncubator(true);
        setShowIncubationClock(true);
      }).to({}, { duration: 0.9 }).call(() => {
        setIsAnimating(false);
        markStepCompleted(5);
        setCurrentStep(6);
      });
      return;
    }

    // ==================== 步骤6：观察结果（点击培养皿或培养箱都可以进入） ====================
    if (currentStep === 6 && (itemId === 'incubator' || itemId === 'petri-dish') && plateInIncubator) {
      setShowIncubationClock(false);
      setIncubationComplete(true);
      setShowColoniesDetail(true);
      return;
    }

    // 常规步骤检测（兜底，用于 experiments 数据里定义的通用高亮项）
    const currentStepData = experiment.steps[currentStep];
    if (currentStepData?.highlightItems.includes(itemId)) {
      executeStepAnimation(currentStep);
    }
  }, [
    experiment,
    currentStep,
    isAnimating,
    executeStepAnimation,
    markStepCompleted,
    freezerOpen,
    tubeVisible,
    tubeOnIce,
    tubeAtBench,
    lampLit,
    loopClickable,
    loopHeated,
    tubeClickable,
    tubeOpened,
    hasBacteria,
    plateStreaked,
    plateInIncubator
  ]);

  const currentStepData = experiment.steps[currentStep];
  const isCompleted = currentStep >= 7;

  // 左侧导航栏：悬停显示该步；未悬停时显示"上一步"（第一步时显示 STEP 1 本身）
  const sidebarStepIndex = hoveredStep ?? (currentStep === 0
    ? 0
    : Math.min(currentStep - 1, experiment.steps.length - 1));
  const sidebarStepData = experiment.steps[sidebarStepIndex];

  const handleCloseStreakingDetail = useCallback(() => {
    setShowStreakingDetail(false);
    markStepCompleted(4);
    setCurrentStep(5);
  }, [markStepCompleted]);

  const handleCloseColoniesDetail = useCallback(() => {
    setShowColoniesDetail(false);
    markStepCompleted(6);
    setCurrentStep(7);
  }, [markStepCompleted]);

  // ========== 静态派生高亮（只用一次，不涉及复用冲突，保留派生写法即可） ==========
  const freezerHighlighted = currentStep === 0 && !freezerOpen;
  const incubatorHighlighted = currentStep === 6 && plateInIncubator;
  const lampHighlighted = currentStep === 1 && !lampLit;
  const tubeInFreezerHighlighted = currentStep === 0 && freezerOpen;
  const petriHighlighted = currentStep === 5 && plateStreaked && !plateInIncubator;

  return (
    <div className="experiment-shell experiment-page-1 h-screen w-screen flex flex-col overflow-hidden text-white font-sans">
      {/* 顶部导航栏 */}
      <header className="h-12 lab-topbar flex items-center justify-between px-4 z-50 shrink-0">
        <div className="flex items-center gap-3">
          <ChevronLeft className="cursor-pointer text-blue-200 hover:text-white" onClick={onBack} />
          <h1 className="font-bold text-xs text-white uppercase tracking-widest">{experiment.title}</h1>
        </div>
        <RestartExperimentButton onRestart={onRestart} />
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* 左侧步骤面板：顶部信息卡片固定高度；点击步骤跳回该步开始前状态并保证目标光效 */}
        <aside className="hidden lg:flex flex-col w-64 p-3 lab-steps-rail shrink-0 overflow-y-auto">
          {sidebarStepData && !isCompleted && (
            <div className="lab-hint-card p-3 mb-4 shrink-0 h-32 overflow-hidden">
              <div className="flex items-center gap-2 text-blue-200 mb-1">
                <Lightbulb className="w-3 h-3" />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  {hoveredStep !== null
                    ? `STEP ${hoveredStep + 1}`
                    : currentStep === 0
                      ? 'STEP 1'
                      : `Previous · STEP${currentStep}`}
                </span>
              </div>
              <h3 className="text-xs font-bold mb-1 text-white line-clamp-1">{sidebarStepData.title}</h3>
              <p className="text-[11px] text-blue-200 leading-relaxed line-clamp-3">{sidebarStepData.description}</p>
            </div>
          )}
          <StepIndicator
            steps={experiment.steps}
            currentStep={Math.min(currentStep, experiment.steps.length - 1)}
            completedSteps={completedSteps}
            onStepClick={handleStepNavigation}
            onStepHover={setHoveredStep}
            tone="exp3"
          />
        </aside>

        {/* 主实验画布 */}
        <main className="flex-1 lab-bench flex flex-col items-center justify-center gap-2 p-3 relative overflow-hidden min-w-0">
          <div ref={canvasFrameRef} className="flex h-[72%] w-full shrink-0 items-center justify-center overflow-hidden">
          <div
            id="experiment-canvas"
            className="relative flex-none shadow-2xl bg-[#1e293b] overflow-hidden lab-canvas-frame"
            style={canvasStyle}
          >
            {/* 背景图 */}
            {/* 与实验二共用背景及坐标基准，保证后景桌面和左侧移液枪托保持同一相对位置。 */}
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/bg.avif')" }} />

            {/* 后景层 */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-80">
              <img src="https://static.igem.wiki/teams/6056/wiki/virtual-lab/common/blue-table.avif" className="absolute left-[50%] top-[24%] -translate-x-1/2 w-[35%] pointer-events-auto" />
              <img src="https://static.igem.wiki/teams/6056/wiki/virtual-lab/common/table-normal.avif" className="absolute left-[72%] top-[20%] w-[25%] pointer-events-auto" />
            </div>

            {/* 冰箱单独放在最底层（背景之上、超净台主体之下），
                这样冰箱下半部分会被超净台前挡板自然遮住，看起来像是靠后立在地面上，而不是浮在操作台前面 */}
            <div className="absolute inset-0 z-[5] pointer-events-none">
              <img 
                id="freezer"
                src={freezerOpen ? "https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment1/freezer-open.avif" : "https://static.igem.wiki/teams/6056/wiki/virtual-lab/common/freezer.avif"}
                className={`absolute left-[5%] top-[5%] w-[24%] pointer-events-auto cursor-pointer transition-all duration-300
                  ${freezerHighlighted ? `${ALPHA_GLOW} z-10` : 'z-0'}
                `}
                onClick={() => handleItemClick('freezer')}
                alt="-80°C Freezer"
              />
            </div>

            {/* 超净台主体 */}
            <div className="absolute inset-x-0 bottom-0 h-[60%] bg-[length:100%_100%] bg-bottom bg-no-repeat z-10 pointer-events-none" style={{ backgroundImage: "url('https://static.igem.wiki/teams/6056/wiki/virtual-lab/common/cleanbench-part.avif')" }} />

            {/* ========== 实验一器材层 ========== */}
            <div className="absolute inset-0 z-20 pointer-events-none">
              {/* 恒温培养箱 */}
              <img 
                id="incubator"
                src={incubatorOpen ? "https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment1/incubator-open.avif" : "https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/13.avif"}
                className={`absolute left-[42%] ${incubatorOpen ? 'top-[24.6%]' : 'top-[23.8%]'} w-[6.5%] pointer-events-auto cursor-pointer transition-all duration-300
                  ${incubatorHighlighted ? `${ALPHA_GLOW} z-30` : 'z-20'}
                `}
                onClick={() => handleItemClick('incubator')}
                alt="Incubator"
              />

              {/* 步骤6：观察结果的点击识别范围放大，覆盖培养箱和培养皿一整片区域，
                  点这片区域内任意位置（不只是小小的培养箱本体）都能触发观察详情 */}
              {currentStep === 6 && plateInIncubator && (
                <div
                  className="absolute left-[36%] top-[14.3%] w-[18%] h-[22%] pointer-events-auto cursor-pointer z-[45]"
                  onClick={() => handleItemClick('incubator')}
                  aria-label="Click to observe culture results"
                />
              )}

              {/* 培养箱上方的恒温培养时钟提示（14-18h） */}
              {showIncubationClock && (
                <div className="absolute left-[41%] top-[8.3%] w-[9%] pointer-events-none flex flex-col items-center animate-bounce">
                  <img 
                    src="https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment1/hours.avif"
                    className="w-full drop-shadow-[0_0_15px_rgba(255,255,0,0.7)]"
                    alt="Incubation Timer"
                  />
                  <span className="text-[10px] font-bold text-yellow-300 mt-1 bg-black/60 px-2 py-0.5 rounded-full whitespace-nowrap">14h - 18h</span>
                </div>
              )}

              {/* 黄色冰盒 */}
              <img 
                id="ice-box"
                src="https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment1/ice-box.avif"
                className="absolute left-[20%] top-[65%] w-[14%] pointer-events-auto z-20"
                alt="Ice Box"
              />

              {/* 酒精灯 */}
              <img 
                id="alcohol-lamp"
                src={lampLit ? "https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/26.avif" : "https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/6.avif"}
                className={`absolute left-[48%] top-[68%] w-[7%] pointer-events-auto cursor-pointer transition-all duration-300
                  ${lampHighlighted ? `${COMPACT_GLOW} z-30` : 'z-20'}
                `}
                onClick={() => handleItemClick('alcohol-lamp')}
                alt="Alcohol Lamp"
              />

              {/* 甘油菌管（放在冰箱里） */}
              {tubeVisible && !tubeOnIce && (
                <img 
                  id="tube"
                  src="https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment1/08251.avif"
                  className={`absolute left-[14%] top-[17%] w-[4%] pointer-events-auto cursor-pointer transition-[filter] duration-300
                    ${tubeInFreezerHighlighted ? `${COMPACT_GLOW} z-40` : 'z-30'}
                  `}
                  onClick={() => handleItemClick('tube')}
                  alt="Glycerol Stock Tube"
                />
              )}
              {/* 甘油菌管保持闭盖离开冰盒，落到冰盒前方台面后才开盖。 */}
              {tubeOnIce && !hasBacteria && (
                <img 
                  id="tube"
                  src={tubeOpened ? "https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment1/tube-open.avif" : "https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment1/08251.avif"}
                  className={`absolute left-[25%] ${tubeAtBench ? 'top-[78%]' : 'top-[64%]'} w-[4%] transition-[filter] duration-300
                    ${tubeClickable && !isAnimating
                      ? `pointer-events-auto cursor-pointer z-[80] ${COMPACT_GLOW}`
                      : 'pointer-events-none z-40'}
                  `}
                  onClick={() => handleItemClick('tube')}
                  alt="Glycerol Stock Tube"
                />
              )}

              {/* 接种环由外层承接 GSAP 位移，并直接使用实验三同款 alpha 外缘黄光。 */}
              <div
                id="inoculation-loop"
                className={`absolute left-[19%] top-[82%] w-[4%] aspect-[1/2]
                  ${loopClickable && !isAnimating
                    ? `pointer-events-auto cursor-pointer z-[80] ${COMPACT_GLOW}`
                    : 'pointer-events-none z-[60]'}
                `}
                onClick={() => handleItemClick('inoculation-loop')}
                role="button"
                aria-label="Inoculation Loop"
              >
                <img
                  src="https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/5.avif"
                  className="absolute inset-0 h-full w-full -rotate-12 pointer-events-none"
                  alt="Inoculation Loop"
                />
              </div>

              {/* LB平板使用原有图案培养皿的固定 7:5 几何比例，素材切换不改变尺寸和锚点。 */}
              <div
                id="petri-dish"
                className={`absolute left-[35%] top-[68.5%] w-[12%] aspect-[7/5] pointer-events-auto cursor-pointer transition-all duration-300
                  ${petriHighlighted ? `${ALPHA_GLOW} z-30` : (plateInIncubator ? 'z-40' : 'z-20')}
                `}
                onClick={() => handleItemClick('petri-dish')}
                role="button"
                aria-label="LB Agar Plate"
              >
                <img
                  src={incubationComplete ? "https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment1/lb-plate-streaked.avif" : "https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment1/08252.avif"}
                  className="absolute left-1/2 top-1/2 h-auto w-[58.3%] max-w-none -translate-x-1/2 -translate-y-1/2 object-contain pointer-events-none"
                  alt="LB Agar Plate"
                />
              </div>

              {/* 移液枪 */}
              <img 
                id="pipette"
                src="https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/24.avif"
                className="absolute left-[6.5%] top-[52%] w-[11%] pointer-events-auto z-20"
                alt="Pipette"
              />
            </div>

            {/* 冷却提示文字 */}
            {coolingMessage && (
              <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 z-[200] lab-toast px-6 py-2 text-base font-bold pointer-events-none">
                {coolingMessage}
              </div>
            )}

            {/* ========== 实验一详情弹窗（浅色底，参考队长的观察结果卡片样式） ========== */}
            {showStreakingDetail && (
              <div className="absolute inset-0 z-[100] flex items-center justify-center pointer-events-auto">
                <div className="absolute inset-0 lab-scrim cursor-pointer" 
                  onClick={handleCloseStreakingDetail}
                />
                <div className="relative flex flex-col md:flex-row items-center gap-8 bg-amber-50/95 p-8 rounded-3xl border border-amber-900/10 shadow-2xl animate-in zoom-in duration-300">
                  <div className="space-y-2 text-center">
                    <img src="https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment1/step5-streaking-detail.avif" className="w-[320px] rounded-xl border-2 border-slate-200 shadow-2xl" alt="Quadrant Streaking" />
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest">Procedure Diagram</p>
                  </div>
                  <div className="flex flex-col gap-4 max-w-[240px]">
                    <div className="border-l-4 border-blue-600 pl-4 space-y-3">
                      <h4 className="text-blue-700 font-bold text-lg">Quadrant Streaking</h4>
                      <div className="text-sm space-y-1 text-slate-700">
                        <p>● First quadrant: apply bacteria directly</p>
                        <p>● Remaining quadrants: flame and cool the loop before each streak</p>
                        <p>● Obtain isolated colonies derived from individual cells</p>
                      </div>
                    </div>
                    <p className="text-[10px] text-blue-700/60 animate-pulse mt-4">Click the gray background to return and continue...</p>
                  </div>
                </div>
              </div>
            )}

            {showColoniesDetail && (
              <div className="absolute inset-0 z-[100] flex items-center justify-center pointer-events-auto">
                <div className="absolute inset-0 lab-scrim cursor-pointer" 
                  onClick={handleCloseColoniesDetail}
                />
                <div className="relative flex flex-col md:flex-row items-center gap-8 bg-amber-50/95 p-8 rounded-3xl border border-amber-900/10 shadow-2xl animate-in zoom-in duration-300">
                  <div className="space-y-2 text-center">
                    <img src="https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment1/lb-plate-streaked.avif" className="w-[280px] rounded-xl border-2 border-slate-200 shadow-2xl" alt="Streaked Plate" />
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest">Enlarged Streaked Plate</p>
                  </div>
                  <div className="flex flex-col gap-4 max-w-[240px]">
                    <div className="border-l-4 border-blue-600 pl-4 space-y-3">
                      <h4 className="text-blue-700 font-bold text-lg">Streaking Results</h4>
                      <div className="text-sm space-y-1 text-slate-700">
                        <p>● Clear streak marks in all four quadrants</p>
                        <p>● Isolated colonies appear in the fourth quadrant</p>
                        <p>● Successful streaking provides colonies for later experiments</p>
                      </div>
                    </div>
                    <p className="text-[10px] text-blue-700/60 animate-pulse mt-4">Click the gray background to complete the experiment...</p>
                  </div>
                </div>
              </div>
            )}

            {/* 实验完成界面 */}
            {isCompleted && <ExperimentCompletion onRestart={onRestart} onBack={onBack} />}
          </div>
          </div>

          {/* 画框下方当前步骤说明，参考队长版本的底部步骤条 */}
          {(currentStepData || isCompleted) && (
            <div className="w-full min-h-[112px] flex-1 px-1 pt-1 text-left">
              <div className="lab-step-caption mb-2 flex items-center gap-2 text-sm font-bold">
                <span className="text-blue-400">Step {Math.min(currentStep + 1, experiment.steps.length)}/{experiment.steps.length}</span>
                <span className="text-blue-500">|</span>
                <span className="text-blue-400">{(currentStepData ?? experiment.steps[experiment.steps.length - 1]).title}</span>
              </div>
              <div className="flex h-[calc(100%-30px)] items-center justify-center lab-note-card px-4 py-3 text-center text-xs leading-relaxed">
                {(currentStepData ?? experiment.steps[experiment.steps.length - 1]).description}
              </div>
            </div>
          )}
        </main>

        {/* 右侧信息面板固定存在，仅由 xl 响应式断点控制显示。 */}
        <aside className="hidden xl:flex flex-col w-80 p-3 lab-info-rail shrink-0 overflow-y-auto">
          <Experiment1InfoPanel />
        </aside>
      </div>

      {/* 横屏提示 */}
      <div className="fixed inset-0 z-[2000] lab-rotate-overlay flex flex-col items-center justify-center lg:hidden portrait:flex hidden px-8 text-center text-white">
        <div className="w-16 h-16 mb-4 animate-bounce text-4xl">🔄</div>
        <h2 className="text-xl font-bold">Rotate Your Device to Landscape</h2>
      </div>
    </div>
  );
}
