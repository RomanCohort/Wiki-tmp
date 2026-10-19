import { useExperimentTimers } from '../hooks/use-experiment-timers';
import { useStepSnapshots } from '../hooks/use-step-snapshots';
import { RestartExperimentButton, ExperimentCompletion } from '../components/ExperimentControls';
import { useState, useCallback, useMemo, useEffect } from 'react';
import { ChevronLeft, Lightbulb } from 'lucide-react';
import { Button } from '../components/ui/button';
import { allExperiments } from '../data/experiments';
import { StepIndicator } from '../components/StepIndicator';
import { Experiment2InfoPanel } from '../components/Experiment2InfoPanel';
import gsap from 'gsap';

interface ExperimentPageProps {
  experimentId?: string;
  onBack: () => void;
  onRestart: () => void;
}

export function ExperimentPage({ experimentId = 'exp2', onBack, onRestart }: ExperimentPageProps) {
  const { schedule: scheduleTimeout, cancel: cancelTimers } = useExperimentTimers();
  const experiment = useMemo(() => 
    allExperiments.find(e => e.id === experimentId) || allExperiments[0],
  [experimentId]);

  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [sceneRevision, setSceneRevision] = useState(0);
  const [showBacteria, setShowBacteria] = useState(false);
  const [isSlidePrepared, setIsSlidePrepared] = useState(false);
  const [showColonyDetail, setShowColonyDetail] = useState(false);
  const [isDropperMoving, setIsDropperMoving] = useState(false);
  // 步骤三增强状态
  const [isDropperUsed, setIsDropperUsed] = useState(false);       // 标记图22是否出现
const [isDropperInserted, setIsDropperInserted] = useState(false); // 标记滴管是否已移入瓶子(变图23)
const [isSmearPrepared, setIsSmearPrepared] = useState(false); // 滴水完成后切换为待接种的玻片图
  // 在 ExperimentPage 组件顶部，与其他 useState 一起添加
const [lampClickable, setLampClickable] = useState(false);   // 控制酒精灯(图6)是否高亮可点
const [lampLit, setLampLit] = useState(false);      // 酒精灯是否已点燃（控制图片26.png）
const [coolingMessage, setCoolingMessage] = useState(''); // 冷却提示文字
const [loopClickable, setLoopClickable] = useState(false); // 接种环是否高亮可点
const [loopVisible, setLoopVisible] = useState(true);      // 接种环是否可见
const [bottleClickable, setBottleClickable] = useState(false); // 试剂瓶是否高亮可点
const [isStained, setIsStained] = useState(false);           // 是否已染色（控制28, 29, 30）
const [showStainDetail, setShowStainDetail] = useState(false); // 是否显示染色结果详情（图30）
const [poolClickable, setPoolClickable] = useState(false);     // 控制水池是否高亮可点
const [isPoolReplaced, setIsPoolReplaced] = useState(false);   // 水池是否替换为31.png
const [showStainIcon, setShowStainIcon] = useState(false);     // 是否显示染色悬浮图标（28）
const [isStainedRound2, setIsStainedRound2] = useState(false); // 是否已进行第二轮染色（33）
const [showStainIconRound2, setShowStainIconRound2] = useState(false); // 是否显示第二轮染色图标（32）
const [showStainDetailRound2, setShowStainDetailRound2] = useState(false); // 是否显示34号图详情
const [item10Clickable, setItem10Clickable] = useState(false); // 图片10是否高亮可点
const [isTweezersAtPool, setIsTweezersAtPool] = useState(false); // 镊子是否在水池处
const [tweezersClicked, setTweezersClicked] = useState(false); // 镊子是否已被点击过

const [isStainedRound3, setIsStainedRound3] = useState(false); // 是否已进行第三轮染色（37）
const [showStainIconRound3, setShowStainIconRound3] = useState(false); // 是否显示第三轮染色图标（35）
const [showStainDetailRound3, setShowStainDetailRound3] = useState(false); // 是否显示36号图详情
const [item9Clickable, setItem9Clickable] = useState(false); // 图片9是否高亮可点


const [isStainedRound4, setIsStainedRound4] = useState(false); // 是否已进行第四轮染色（39）
const [showStainIconRound4, setShowStainIconRound4] = useState(false); // 是否显示第四轮染色图标（38）
const [showStainDetailRound4, setShowStainDetailRound4] = useState(false); // 是否显示40号图详情
const [hasViewedStainDetailRound4, setHasViewedStainDetailRound4] = useState(false); // 第四轮详情只允许查看一次
const [item8Clickable, setItem8Clickable] = useState(false); // 图片8是否高亮可点

const [isMicroscopeViewActive, setIsMicroscopeViewActive] = useState(false); // 显微镜观察模式是否激活

const [isReagentClicked, setIsReagentClicked] = useState(false); // 试剂瓶是否已点击
const [isMicroscopeHighlighted, setIsMicroscopeHighlighted] = useState(false); // 显微镜是否高亮
const [isSlideMovedToMicroscope, setIsSlideMovedToMicroscope] = useState(false); // 载玻片是否已移动到显微镜旁
const [isSlideInserted, setIsSlideInserted] = useState(false); // 载玻片是否已插入显微镜
const [showMicroscopeInfo, setShowMicroscopeInfo] = useState(false); // 是否显示显微镜信息
const isDropperHighlighted = currentStep === 2
  && isDropperUsed
  && !isAnimating
  && !isDropperMoving
  && !lampClickable
  && !completedSteps.includes(2);
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
  

  const executeStepAnimation = useCallback((stepIndex: number) => {
    if (isAnimating) return;
    setIsAnimating(true);

    const tl = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false); 
        // 步骤1和步骤2、3的特定阶段不自动进入下一步，由交互触发
        if (experiment.id === 'exp2' && (stepIndex === 1 || stepIndex === 2)) return;
        
        setIsAnimating(false);
        setCompletedSteps(prev => [...prev, stepIndex]);
        setCurrentStep(stepIndex + 1);
      }
    });

    if (experiment.id === 'exp2') {
      if (stepIndex === 0) {
        tl.to("#petri-dish", { 
          left: "50%", top: "64%", xPercent: -50, yPercent: -50, 
          scale: 1.2, duration: 1.2, ease: "power2.inOut" 
        }).call(() => setShowBacteria(true));

      } else if (stepIndex === 2) {
        // 步骤三第一阶段：镊子移动
        tl.to("#tweezers", {
          left: "24.5%", top: "62.5%", rotation: 20, duration: 1, ease: "back.out(1.2)"
        }).call(() => {
          setIsSlidePrepared(true);
          setIsAnimating(false);
        });
      }
    }
  }, [experiment, isAnimating]);

 const handleItemClick = useCallback((itemId: string) => {
  console.log('handleItemClick called for:', itemId, 'currentStep:', currentStep, 'isAnimating:', isAnimating);
  if (isAnimating) return;

  // 步骤二：点击培养皿打开详情（exp2专用）
  if (experiment.id === 'exp2' && currentStep === 1 && itemId === 'petri-dish') {
    setShowColonyDetail(true);
    return;
  }

  // 步骤三：分阶段交互（exp2专用）
  if (experiment.id === 'exp2' && currentStep === 2) {
    // 1. 点击载玻片
    if (itemId === 'item-2' && !isSlidePrepared) {
      executeStepAnimation(2);
      return;
    }
    // 2. 点击底座滴管（图7）
    if (itemId === 'item-7' && currentStep === 2 && !completedSteps.includes(2) && isSlidePrepared && !isDropperUsed) {
  setIsDropperUsed(true);
  return;
}
    // 3. 点击悬浮滴管（图22）-> 移动到瓶子变成图23
    if (itemId === 'item-22' && isDropperUsed && !isDropperInserted && !isDropperMoving && !completedSteps.includes(2)) {
      setIsAnimating(true);
      gsap.to("#item-22", {
        left: "82.2%",
        top: "58.5%",
        rotation: 12,
        transformOrigin: "50% 50%",
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          setIsDropperInserted(true);
          setIsAnimating(false);
        }
      });
      return;
    }
    // 4. 点击图23（已插入的滴管）-> 移动到中央变成图25，同时移动镊子
    if (itemId === 'item-22' && isDropperUsed && isDropperInserted && !isDropperMoving && !completedSteps.includes(2)) {
  setIsDropperMoving(true);
  setIsAnimating(true);
  
  // 强制清除滴管的所有transform和缩放样式，确保从原始大小开始移动
  gsap.set("#item-22", { clearProps: "transform,scale" });
  // 移除可能残留的高亮类
  const dropperElem = document.querySelector("#item-22");
  if (dropperElem) dropperElem.classList.remove("scale-110", "drop-shadow-[0_0_30px_#ffcc00]");
  
  const tl = gsap.timeline({
  onComplete: () => {
  setIsDropperMoving(false);
  setIsAnimating(false);
  setIsSmearPrepared(true); // 滴管消失的同时，玻片切换为下一张
  //setCompletedSteps(prev => [...prev, 2]);
  setLampClickable(true);   // 滴管操作完成，高亮酒精灯，等待点击
}
});
  
  // 只改变位置，不改变宽高和缩放
  tl.to("#item-22", {
    left: "35.8%",
    top: "79%",
    xPercent: -50,
    yPercent: -50,
    duration: 0.5,
    ease: "linear",  // 最简单的线性移动
    onComplete: () => {
      const img = document.querySelector("#item-22") as HTMLImageElement;
      if (img && img.src && !img.src.includes("25.avif")) {
        img.src = "https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/25.avif";
      }
    }
  }, 0)
  .to("#tweezers", {
    left: "35%",
    top: "82%",
    xPercent: -50,
    yPercent: -50,
    duration: 0.5,
    ease: "linear"
  }, 0)
  // 滴管在玻片位置停留 1 秒后再消失
  .to({}, { duration: 1 });
  
  return;
}

    if (itemId === 'item-6') {
  if (!lampClickable || isAnimating) return;   // 必须高亮且未动画中
  setLampClickable(false);                     // 取消高亮，防止重复点
  setLampLit(true);                            // 切换到点燃图片
  setIsAnimating(true);

  // 获取接种环元素
  const loop = document.querySelector("#item-5");
  if (!loop) {
    setIsAnimating(false);
    return;
  }

  // 1. 移动接种环到酒精灯火焰上方（假设火焰位置在(50%,62%)，接种环原位置在(19%,82%)）
  const flameX = "50%";
  const flameY = "62%";

  const tl = gsap.timeline({
    onComplete: () => {
      // 左右移动三次（每次0.3秒，左右偏移10%）
      gsap.to(loop, {
        xPercent: -100, duration: 0.2, repeat: 5, yoyo: true,
        ease: "power1.inOut",
        onComplete: () => {
          // 最后静止到酒精灯旁边（比如酒精灯右侧偏下）
          gsap.to(loop, {
            left: "55%", top: "65%", duration: 0.5,
            ease: "back.out(1)",
            onComplete: () => {
              setIsAnimating(false);
              // 显示冷却提示文字
              setCoolingMessage("Cool for a few seconds");
              // 可选：2秒后自动隐藏文字
               scheduleTimeout(() => setCoolingMessage(''), 2000);
               
               setLoopClickable(true); // 接种环操作完成，高亮，等待点击
            }
          });
        }
      });
    }
  });

  // 先移动接种环到火焰位置
  tl.to(loop, {
    left: flameX, top: flameY, duration: 0.6,
    ease: "power2.inOut"
  }, 0);
  
  return;
}
if (itemId === 'item-5') {
  if (!loopClickable || isAnimating) return; 
  setLoopClickable(false);
  setCoolingMessage(''); 
  setIsAnimating(true);

  const loop = document.querySelector("#item-5") as HTMLElement;
  const tweezers = document.querySelector("#tweezers") as HTMLImageElement;
  const lamp = document.querySelector("#item-6") as HTMLElement;

  if (!loop || !tweezers || !lamp) {
    setIsAnimating(false);
    return;
  }

  // 同时也隐藏可能干扰的滴管
  const dropper = document.querySelector("#item-22") as HTMLElement;
  if (dropper) dropper.style.display = "none";

  const tl = gsap.timeline({
    onComplete: () => {
      setIsAnimating(false);
    }
  });

  // 1. 接种环移动到镊子(图27)上并晃动（涂布）
  tl.to(loop, {
    left: "38%",
    top: "80%",
    xPercent: -50,
    yPercent: -50,
    duration: 0.8,
    ease: "power2.inOut"
  })
  .to(loop, {
    xPercent: "-=10",
    repeat: 5,
    yoyo: true,
    duration: 0.1,
    ease: "none"
  })
  // 2. 弹出文字“等待自然干燥”持续2s
  .call(() => {
    setCoolingMessage("Wait for air-drying");
  })
  .to({}, { duration: 2 }) 
  .call(() => {
    setCoolingMessage("");
    setLoopVisible(false); // 3. 接种环消失
  })
  // 4. 镊子(图27)移动到酒精灯上晃动再移回原位（固定）
  .to(tweezers, {
    left: "50%",
    top: "65%",
    duration: 1,
    ease: "power2.inOut"
  })
  .to(tweezers, {
    xPercent: "-=5",
    repeat: 3,
    yoyo: true,
    duration: 0.2
  })
  .to(tweezers, {
    left: "35%",
    top: "82%",
    duration: 1,
    ease: "power2.inOut"
  })
  // 5. 步骤完成，并标记完成
    .call(() => {
      setBottleClickable(true);
      setCompletedSteps(prev => [...prev, 2]);
      setCurrentStep(3); // 自动进入第四步（染色）
    });

    return;
  }
}

// 步骤四：染色与清洗阶段（exp2专用）
if (experiment.id === 'exp2' && (currentStep === 3 || currentStep === 4 ||currentStep ===5 ||currentStep === 6||currentStep === 7)) {
  // 1. 点击染色瓶（图11）
  if (itemId === 'item-11' && bottleClickable) {
    setBottleClickable(false);
    setIsAnimating(true);
    setTweezersClicked(false);
    
    const tweezers = document.querySelector("#tweezers") as HTMLImageElement;
    if (tweezers) tweezers.src = "https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/29.avif";
    
    setIsStained(true);
    setShowStainIcon(true);
    setCoolingMessage("After 1 minute");
    
    scheduleTimeout(() => {
      setCoolingMessage("");
      setIsAnimating(false);
    }, 1000);
    return;
  }

  // 2. 点击染色后的镊子（图29）查看结果
   if (itemId === 'tweezers' && isStained && !isStainedRound2 && !tweezersClicked) {
      setTweezersClicked(true);
      if (isTweezersAtPool) {
        // 在水池处，点击触发甩干动画
        setIsAnimating(true);
        const tl = gsap.timeline({
          onComplete: () => {
            setIsAnimating(false);
            setCoolingMessage("");
            setItem10Clickable(true); // 图片10高亮
            setIsTweezersAtPool(false); // 不再标记在水池
            setIsPoolReplaced(false); // 恢复原水池图
          }
        });
        
        tl.to("#tweezers", {
         left: "10%", // 向左移动
         duration: 0.5,
         ease: "power2.inOut"
       })
       .call(() => setCoolingMessage("Shake off excess water"))
       .to("#tweezers", {
         xPercent: "-=10",
         repeat: 9,
         yoyo: true,
         duration: 0.08
       })
       .to({}, { duration: 0.5 });
       return; // 动画处理完直接返回，不展示详情
      }
      setShowStainDetail(true);
      return;
    }

  // 3. 点击水池（洗去浮色）
  if (itemId === 'pool' && poolClickable) {
    setPoolClickable(false);
    setShowStainIcon(false);
    setShowStainIconRound2(false); 
    setShowStainIconRound3(false); // 移动到水池后，隐藏并移除第三轮图标
    setShowStainIconRound4(false); // 移动到水池后，隐藏并移除第四轮图标
    setIsAnimating(true);
    
    // 移动镊子到水池
    gsap.to("#tweezers", {
      left: "17%",
      top: "20%",
      scale: 0.8, // 变小一点
      duration: 1.2,
      ease: "power2.inOut",
      onComplete: () => {
        setIsAnimating(false);
        setIsTweezersAtPool(true); // 标记在水池
        setTweezersClicked(false); // 重置镊子点击状态，允许再次点击
        if (!isStainedRound2) {
          setCompletedSteps(prev => [...prev, 3]);
          setCurrentStep(4); // 进入下一步
        }
      }
    });
    return;
  }

  // 4. 点击图片10（第二轮染色）
  if (itemId === 'item-10' && item10Clickable) {
    setItem10Clickable(false);
    setIsAnimating(true);
    setTweezersClicked(false);
    
    // 29变成33（由状态控制），回到下方位置
    gsap.to("#tweezers", {
      left: "35%",
      top: "82%",
      scale: 1.1, // 高亮
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        setIsStainedRound2(true); // 回到桌面后再切换为第二轮染色图片
        setIsAnimating(false);
        setShowStainIconRound2(true); // 显示32
      }
    });
    return;
  }

  // 5. 点击33号镊子查看结果
    if (itemId === 'tweezers' && isStainedRound2 && !isStainedRound3 && !tweezersClicked) {
      setTweezersClicked(true);
      if (isTweezersAtPool) {
        // 第二轮在水池处，再次触发甩干
        setIsAnimating(true);
        const tl = gsap.timeline({
           onComplete: () => {
             setIsAnimating(false);
             setCoolingMessage("");
             setIsTweezersAtPool(false);
             setItem9Clickable(true); // 第三轮开始，图9高亮

             setCompletedSteps(prev => [...prev, 4]);
            setCurrentStep(5);
             setIsPoolReplaced(false); // 恢复原水池图
           }
         });
      
      tl.to("#tweezers", {
        left: "10%",
        duration: 0.5,
        ease: "power2.inOut"
      })
      .call(() => setCoolingMessage("Shake off excess water"))
      .to("#tweezers", {
        xPercent: "-=10",
        repeat: 9,
        yoyo: true,
        duration: 0.08
      })
      .to({}, { duration: 0.5 });
      return;
    }
    
    setShowStainDetailRound2(true);
    return;
  }

  // 6. 点击图片9（第三轮染色）
  if (itemId === 'item-9' && item9Clickable) {
    setItem9Clickable(false);
    setIsAnimating(true);
    setTweezersClicked(false);
    
    // 33变成37，回到下方位置
    gsap.to("#tweezers", {
      left: "35%",
      top: "82%",
      scale: 1.1,
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        setIsStainedRound3(true); // 回到桌面后再切换为第三轮染色图片
        setIsAnimating(false);
        setShowStainIconRound3(true); // 显示35
      }
    });
    return;
  }

  // 7. 点击37号镊子查看结果
  if (itemId === 'tweezers' && isStainedRound3 && !isStainedRound4 && !tweezersClicked) {
    setTweezersClicked(true);
    if (isTweezersAtPool) {
      setIsAnimating(true);
      const tl = gsap.timeline({
        onComplete: () => {
          setIsAnimating(false);
          setCoolingMessage("");
          setIsTweezersAtPool(false);
          // setItem8Clickable(true); // 第四轮开始，图8高亮

          setCompletedSteps(prev => [...prev, 5]);
            setCurrentStep(6);
          setIsPoolReplaced(false); // 恢复原水池图
        }
      });
      setItem8Clickable(true); // 第四轮开始，图8高亮
      tl.to("#tweezers", { left: "10%", duration: 0.5, ease: "power2.inOut" })
      .call(() => setCoolingMessage("Shake off excess water"))
      .to("#tweezers", { xPercent: "-=10", repeat: 9, yoyo: true, duration: 0.08 })
      .to({}, { duration: 0.5 });
      return;
    }
   
    setShowStainDetailRound3(true);
    return;
  }

  // 8. 点击图片8（第四轮染色）
  if (itemId === 'item-8' && item8Clickable) {
    setItem8Clickable(false);
    setIsAnimating(true);
    setTweezersClicked(false);
    
    // 37变成39，回到下方位置
    gsap.to("#tweezers", {
      left: "35%",
      top: "82%",
      scale: 1.1,
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        setIsStainedRound4(true); // 回到桌面后再切换为第四轮染色图片
        setIsAnimating(false);
        setShowStainIconRound4(true); // 显示38
      }
    });
    return;
  }

  // 9. 点击39号镊子查看结果
  if (itemId === 'tweezers' && isStainedRound4 && !tweezersClicked) {
    setTweezersClicked(true);
    if (isTweezersAtPool) {
      setIsAnimating(true);
      const tl = gsap.timeline({
        onComplete: () => {
          setIsAnimating(false);
          setCoolingMessage("");
          setIsTweezersAtPool(false);
          setIsPoolReplaced(false); // 恢复原水池图

          // 根据当前染色轮次更新步骤
        
            setCompletedSteps(prev => [...prev, 6]);
            setCurrentStep(7);
          
         
        }
      });
      tl.to("#tweezers", { left: "10%", duration: 0.5, ease: "power2.inOut" })
      .call(() => setCoolingMessage("Allow to air-dry"))
      .to("#tweezers", { xPercent: "-=10", repeat: 9, yoyo: true, duration: 0.08 })
      .to({}, { duration: 0.5 });
      return;
    }
    if (!hasViewedStainDetailRound4) {
      setHasViewedStainDetailRound4(true);
      setShowStainDetailRound4(true);
    }
    return;
  }

  // 10. 点击显微镜进入观察模式
  if (itemId === 'microscope' && currentStep === 7) {
    setIsMicroscopeViewActive(true);
    return;
  }

  // 显微镜观察模式下点击试剂瓶
  if (itemId === 'microscope-stain-bottle' && isMicroscopeViewActive && !isReagentClicked) {
    setIsReagentClicked(true);
    setIsMicroscopeHighlighted(true);
    return;
  }

  // 显微镜观察模式下点击显微镜
  if (itemId === 'microscope-microscope' && isMicroscopeViewActive && isMicroscopeHighlighted) {
    setIsMicroscopeHighlighted(false);
    setIsSlideMovedToMicroscope(true);
    return;
  }

  // 显微镜观察模式下点击载玻片，载玻片消失，显微镜切换图片
  if (itemId === 'slide-in-microscope' && isMicroscopeViewActive && isSlideMovedToMicroscope && !isSlideInserted) {
    setIsSlideInserted(true);
    return;
  }

  // 显微镜观察模式下点击显微镜显示 info
  if (itemId === 'microscope-microscope' && isMicroscopeViewActive && isSlideInserted && !showMicroscopeInfo) {
    setShowMicroscopeInfo(true);
    return;
  }

  // 关闭显微镜 info 完成实验
  if (itemId === 'close-microscope-info' && showMicroscopeInfo) {
    setShowMicroscopeInfo(false);
    setCompletedSteps(prev => [...prev, 7]);
    setCurrentStep(8);
    setIsMicroscopeViewActive(false);
    return;
  }
}

  // 常规步骤检测
  const currentStepData = experiment.steps[currentStep];
  if (currentStepData?.highlightItems.includes(itemId)) {
    executeStepAnimation(currentStep);
  }
}, [experiment, currentStep, completedSteps, isAnimating, executeStepAnimation, isSlidePrepared, isDropperUsed, isDropperInserted, isDropperMoving, setShowColonyDetail, setCompletedSteps, setCurrentStep, bottleClickable, isStained, lampClickable, loopClickable, setShowStainDetail, poolClickable, isStainedRound2, isTweezersAtPool, item10Clickable, setShowStainDetailRound2, isStainedRound3, isStainedRound4, item9Clickable, item8Clickable, setShowStainDetailRound3, setShowStainDetailRound4, isMicroscopeViewActive, isReagentClicked, isMicroscopeHighlighted, isSlideMovedToMicroscope, isSlideInserted, showMicroscopeInfo]);

  const currentStepData = experiment.steps[currentStep];
  const isCompleted = currentStep >= experiment.steps.length;
  const sidebarStepIndex = hoveredStep ?? (currentStep === 0
    ? 0
    : Math.min(currentStep - 1, experiment.steps.length - 1));
  const sidebarStepData = experiment.steps[sidebarStepIndex];

  // 左侧目录只允许回到当前步骤或已经完成的步骤。回退时恢复该步骤开始时
  // 所需的实验台状态，用户可以从这里重新继续完成后续操作。
    const stepSnapshots = useStepSnapshots(currentStep, isAnimating,
    () => ({ currentStep, completedSteps, isAnimating, showBacteria, isSlidePrepared, showColonyDetail, isDropperMoving, isDropperUsed, isDropperInserted, isSmearPrepared, lampClickable, lampLit, coolingMessage, loopClickable, loopVisible, bottleClickable, isStained, showStainDetail, poolClickable, isPoolReplaced, showStainIcon, isStainedRound2, showStainIconRound2, showStainDetailRound2, item10Clickable, isTweezersAtPool, tweezersClicked, isStainedRound3, showStainIconRound3, showStainDetailRound3, item9Clickable, isStainedRound4, showStainIconRound4, showStainDetailRound4, hasViewedStainDetailRound4, item8Clickable, isMicroscopeViewActive, isReagentClicked, isMicroscopeHighlighted, isSlideMovedToMicroscope, isSlideInserted, showMicroscopeInfo }),
    (state) => {
    setCurrentStep(state.currentStep);
    setCompletedSteps(state.completedSteps);
    setIsAnimating(state.isAnimating);
    setShowBacteria(state.showBacteria);
    setIsSlidePrepared(state.isSlidePrepared);
    setShowColonyDetail(state.showColonyDetail);
    setIsDropperMoving(state.isDropperMoving);
    setIsDropperUsed(state.isDropperUsed);
    setIsDropperInserted(state.isDropperInserted);
    setIsSmearPrepared(state.isSmearPrepared);
    setLampClickable(state.lampClickable);
    setLampLit(state.lampLit);
    setCoolingMessage(state.coolingMessage);
    setLoopClickable(state.loopClickable);
    setLoopVisible(state.loopVisible);
    setBottleClickable(state.bottleClickable);
    setIsStained(state.isStained);
    setShowStainDetail(state.showStainDetail);
    setPoolClickable(state.poolClickable);
    setIsPoolReplaced(state.isPoolReplaced);
    setShowStainIcon(state.showStainIcon);
    setIsStainedRound2(state.isStainedRound2);
    setShowStainIconRound2(state.showStainIconRound2);
    setShowStainDetailRound2(state.showStainDetailRound2);
    setItem10Clickable(state.item10Clickable);
    setIsTweezersAtPool(state.isTweezersAtPool);
    setTweezersClicked(state.tweezersClicked);
    setIsStainedRound3(state.isStainedRound3);
    setShowStainIconRound3(state.showStainIconRound3);
    setShowStainDetailRound3(state.showStainDetailRound3);
    setItem9Clickable(state.item9Clickable);
    setIsStainedRound4(state.isStainedRound4);
    setShowStainIconRound4(state.showStainIconRound4);
    setShowStainDetailRound4(state.showStainDetailRound4);
    setHasViewedStainDetailRound4(state.hasViewedStainDetailRound4);
    setItem8Clickable(state.item8Clickable);
    setIsMicroscopeViewActive(state.isMicroscopeViewActive);
    setIsReagentClicked(state.isReagentClicked);
    setIsMicroscopeHighlighted(state.isMicroscopeHighlighted);
    setIsSlideMovedToMicroscope(state.isSlideMovedToMicroscope);
    setIsSlideInserted(state.isSlideInserted);
    setShowMicroscopeInfo(state.showMicroscopeInfo);
    setHoveredStep(null);
    setSceneRevision((revision) => revision + 1);
  });

const handleStepNavigation = useCallback((stepIndex: number) => {
    if (stepIndex < 0 || stepIndex >= experiment.steps.length || stepIndex > currentStep || isAnimating) return;
    cancelTimers();
    if (stepSnapshots.restore(stepIndex)) return;

    gsap.killTweensOf('#tweezers, #item-22, #petri-dish');
    gsap.set('#tweezers, #item-22, #petri-dish', { clearProps: 'all' });

    setShowColonyDetail(false);
    setShowStainDetail(false);
    setShowStainDetailRound2(false);
    setShowStainDetailRound3(false);
    setShowStainDetailRound4(false);
    setShowMicroscopeInfo(false);
    setIsMicroscopeViewActive(false);
    setCoolingMessage('');
    setIsAnimating(false);
    setShowBacteria(stepIndex >= 1);
    setIsSlidePrepared(stepIndex >= 3);
    setIsDropperUsed(stepIndex >= 3);
    setIsDropperInserted(false);
    setIsDropperMoving(false);
    setIsSmearPrepared(stepIndex >= 3);
    setLampClickable(false);
    setLampLit(stepIndex >= 3);
    setLoopClickable(false);
    // 第 3 步完成后接种环已退出实验台，回到第 4 步及以后不能再次出现。
    setLoopVisible(stepIndex < 3);
    setBottleClickable(stepIndex === 3);
    setIsStained(stepIndex >= 4);
    setShowStainIcon(false);
    setPoolClickable(false);
    setIsPoolReplaced(false);
    setIsStainedRound2(stepIndex >= 5);
    setShowStainIconRound2(false);
    setIsStainedRound3(stepIndex >= 6);
    setShowStainIconRound3(false);
    setIsStainedRound4(stepIndex >= 7);
    setShowStainIconRound4(false);
    setHasViewedStainDetailRound4(false);
    setIsTweezersAtPool(false);
    setTweezersClicked(false);
    setItem10Clickable(stepIndex === 4);
    setItem9Clickable(stepIndex === 5);
    setItem8Clickable(stepIndex === 6);
    setIsReagentClicked(false);
    setIsMicroscopeHighlighted(false);
    setIsSlideMovedToMicroscope(false);
    setIsSlideInserted(false);
    setCompletedSteps(Array.from({ length: stepIndex }, (_, index) => index));
    setCurrentStep(stepIndex);
    // 强制重新创建被 GSAP 操作过的物件，避免后续步骤遗留的坐标缓存
    // 影响回退后的玻片、镊子和滴管对齐。
    setSceneRevision(revision => revision + 1);
  }, [currentStep, isAnimating, stepSnapshots, cancelTimers, experiment.steps.length]);



  return (
    <div className="experiment-shell h-screen w-screen flex flex-col overflow-hidden text-white font-sans">
      <header className="h-12 lab-topbar flex items-center justify-between px-4 z-50 shrink-0">
        <div className="flex items-center gap-3">
          <ChevronLeft className="cursor-pointer hover:text-white text-blue-200" onClick={onBack} />
          <h1 className="font-bold text-xs text-white uppercase tracking-widest">{experiment.title}</h1>
        </div>
        <RestartExperimentButton onRestart={onRestart} />
      </header>

      <div className="flex-1 flex overflow-hidden">
        <aside className="hidden lg:flex flex-col w-64 p-3 lab-steps-rail shrink-0 overflow-y-auto">
          {sidebarStepData && !isCompleted && (
            <div className="lab-hint-card p-3 mb-4 shrink-0">
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
            <h3 className="text-xs font-bold mb-1 text-white">{sidebarStepData.title}</h3>
            <p className="text-[11px] text-blue-200 leading-relaxed">{sidebarStepData.description}</p>
          </div>
          )}
          <StepIndicator
            steps={experiment.steps}
            currentStep={currentStep}
            completedSteps={completedSteps}
            onStepClick={handleStepNavigation}
            onStepHover={setHoveredStep}
          />
        </aside>

        <main className="flex-1 lab-bench flex flex-col items-center gap-3 p-3 relative overflow-hidden min-w-0">
          {isMicroscopeViewActive ? (
            <div className="relative aspect-video w-auto h-[72%] shrink-0 max-w-full shadow-2xl overflow-hidden lab-canvas-frame">
              <div className="absolute inset-0 bg-center bg-no-repeat" style={{ backgroundImage: "url('https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/background-new.avif')", backgroundSize: '100% 100%' }} />
              <div className="absolute inset-0">
                {!isSlideInserted && (
                  <img 
                    id="slide-in-microscope"
                    src="https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/bopian.avif"
                    className={`absolute w-[12%] cursor-pointer transition-all hover:scale-110
                      ${isSlideMovedToMicroscope ? 'left-[35%] bottom-[10%] drop-shadow-[0_0_20px_rgba(255,255,0,0.8)]' : 'left-[20%] bottom-[15%]'}
                    `}
                    onClick={() => handleItemClick('slide-in-microscope')}
                    alt="Microscope Slide" 
                  />
                )}
                {isReagentClicked && !isSlideMovedToMicroscope && (
                  <img 
                    id="microscope-diguan"
                    src="https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/diguan.avif"
                    className="absolute left-[24%] bottom-[22%] w-[8%]"
                    alt="Dropper" 
                  />
                )}
                <img 
                  id="microscope-stain-bottle"
                  src="https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/shiji-normal.avif"
                  className={`absolute left-[32%] bottom-[18%] w-[4%] transition-all cursor-pointer hover:scale-110
                    ${isReagentClicked ? '' : 'drop-shadow-[0_0_15px_rgba(255,255,0,0.8)]'}
                  `}
                  onClick={() => handleItemClick('microscope-stain-bottle')}
                  alt="Reagent Bottle" 
                />
                <img 
                  id="microscope-microscope"
                  src={(isSlideInserted ? 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/xianweijing.avif' : 'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/15.avif')}
                  className={`absolute left-[48%] bottom-[5%] w-[18%] transition-all cursor-pointer hover:scale-105
                    ${isMicroscopeHighlighted ? 'drop-shadow-[0_0_20px_rgba(255,255,0,0.8)]' : ''}
                  `}
                  onClick={() => handleItemClick('microscope-microscope')}
                  alt="Microscope" 
                />
              </div>
              {showMicroscopeInfo && (
                <div className="absolute inset-0 z-[100] flex items-center justify-center p-4 pointer-events-auto">
                  <div className="absolute inset-0 lab-scrim cursor-pointer" 
                    onClick={() => handleItemClick('close-microscope-info')}
                  />
                  <div className="relative flex items-center gap-5 lab-chalk-sheet p-4 animate-in zoom-in duration-300 max-w-[88%] max-h-[88%] overflow-hidden">
                    <div className="space-y-2 text-center">
                      <img src="https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/info.avif" className="w-auto max-w-[240px] max-h-[230px] object-contain rounded-xl border-2 border-white/30 shadow-2xl" alt="Microscopic Observation" />
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest">Microscope View</p>
                    </div>
                    <div className="flex flex-col gap-4 max-w-[240px]">
                      <div className="border-l-4 border-blue-500 pl-4 space-y-3">
                        <h4 className="text-blue-400 font-bold text-lg">Microscopy Results</h4>
                        <div className="text-sm space-y-1 text-slate-300">
                          <p>● Shape: short rods</p>
                          <p>● Arrangement: single cells or pairs</p>
                          <p>● Color: red</p>
                          <p>● Conclusion: Gram-negative bacteria</p>
                        </div>
                      </div>
                      <p className="text-[10px] text-blue-400/60 animate-pulse mt-4">Click the gray background to return and complete the experiment...</p>
                    </div>
                  </div>
                </div>
              )}
              <Button 
                onClick={() => setIsMicroscopeViewActive(false)}
                className="absolute top-4 right-4 z-50 bg-white/90 text-black hover:bg-white"
              >
                Back
              </Button>
            </div>
          ) : (
            <div id="experiment-canvas" className="relative aspect-video w-auto h-[72%] shrink-0 max-w-full shadow-2xl bg-[#1e293b] overflow-hidden lab-canvas-frame">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/bg.avif')" }} />

              {/* 后景层 */}
              <div className="absolute inset-0 z-0 pointer-events-none opacity-80">
                <img 
                  id="pool"
                  src={isPoolReplaced ? "https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/31.avif" : "https://static.igem.wiki/teams/6056/wiki/virtual-lab/common/pool.avif"}
                  className={`absolute left-[8%] top-[18%] w-[18%] pointer-events-auto transition-all cursor-pointer
                    ${poolClickable ? 'drop-shadow-[0_0_20px_rgba(255,255,0,0.8)] scale-105 z-50' : ''}
                  `}
                  onClick={() => handleItemClick('pool')}
                />
                <img src="https://static.igem.wiki/teams/6056/wiki/virtual-lab/common/blue-table.avif" className="absolute left-[50%] top-[24%] -translate-x-1/2 w-[35%] pointer-events-auto" />
                <img src="https://static.igem.wiki/teams/6056/wiki/virtual-lab/common/table-normal.avif" className="absolute left-[72%] top-[20%] w-[25%] pointer-events-auto" />
                <img 
                  id="incubator"
                  src="https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/13.avif"
                  className={`absolute left-[42%] top-[23.5%] w-[6.5%] z-10 pointer-events-auto transition-all cursor-pointer
                   
                  `}
                  onClick={() => handleItemClick('incubator')}
                  alt="Incubator" 
                />
                <img 
                  id="microscope"
                  src="https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/15.avif"
                  className={`absolute left-[78%] top-[16%] w-[9.5%] z-10 pointer-events-auto transition-all cursor-pointer
                    ${(currentStep === 7) ? 'drop-shadow-[0_0_20px_rgba(255,255,0,0.8)]' : ''}
                  `}
                  onClick={() => handleItemClick('microscope')}
                  alt="Microscope" 
                />
              </div>

            <div className="absolute inset-x-0 bottom-0 h-[56%] bg-[length:100%_100%] bg-bottom bg-no-repeat z-10 pointer-events-none" style={{ backgroundImage: "url('https://static.igem.wiki/teams/6056/wiki/virtual-lab/common/cleanbench-part.avif')" }} />

            {/* 器材层 */}
            <div className="absolute inset-0 z-20 pointer-events-none">
                <img id="pipette" src="https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/24.avif" className="absolute left-[6.5%] top-[52%] w-[11%] pointer-events-auto cursor-pointer" />

                {/* 培养皿 */}
                <div key={`petri-${sceneRevision}`} id="petri-dish" onClick={() => handleItemClick('petri-dish')}
                  className={`absolute left-[35%] top-[68%] w-[12%] pointer-events-auto cursor-pointer
                    ${currentStep < 2 ? 'drop-shadow-[0_0_20px_rgba(255,255,0,0.8)] z-30 transition-all' : 'z-20'}
                  `}>
                  <img src="https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/18.avif" className="w-full" />
                  {showBacteria && currentStep < 2 && (
                    <div className="absolute inset-0 bg-yellow-200/20 rounded-full animate-pulse blur-md pointer-events-none" />
                  )}
                </div>

                {/* 载玻片 */}
                <img key={`slide-${sceneRevision}`} id="item-2"
                  src={isSlidePrepared ? "https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/19.avif" : "https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/2.avif"}
                  onClick={() => handleItemClick('item-2')}
                  className={`absolute left-[20%] top-[68%] w-[8%] pointer-events-auto cursor-pointer transition-all
                    ${(currentStep === 2 && !isSlidePrepared) ? 'drop-shadow-[0_0_20px_rgba(255,255,0,0.8)] z-30 scale-110' : 'z-20'}
                  `} 
                />

                {/* 镊子 */}
                <img key={`tweezers-${sceneRevision}`} id="tweezers"
                  src={isSlidePrepared ? (isStainedRound4 ? "https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/39.avif" : (isStainedRound3 ? "https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/37.avif" : (isStainedRound2 ? "https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/33.avif" : (isStained ? "https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/29.avif" : (isSmearPrepared ? "https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/27.avif" : "https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/20.avif"))))) : "https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/4.avif"}
                  className={`absolute pointer-events-auto z-[60] transition-all cursor-pointer
                    ${isSlidePrepared
                      ? (currentStep >= 3
                        ? 'left-[35%] top-[82%] w-[11%] -translate-x-1/2 -translate-y-1/2 rotate-[20deg]'
                        : 'left-[18%] top-[65%] w-[11%] rotate-0')
                      : 'left-[17.5%] top-[83%] w-[5%] -rotate-12'}
                    ${(!tweezersClicked && ((isStained && !isStainedRound2 && !item10Clickable) || (isStainedRound2 && !isStainedRound3 && !item9Clickable) || (isStainedRound3 && !isStainedRound4 && !item8Clickable) || (isStainedRound4 && !hasViewedStainDetailRound4) || isTweezersAtPool)) ? 'drop-shadow-[0_0_20px_rgba(255,255,0,0.8)] scale-110' : ''}
                  `}
                  style={{ transformOrigin: 'bottom left' }}
                  onClick={() => handleItemClick('tweezers')}
                />

                {/* 染色悬浮图 28 */}
                {showStainIcon && !isTweezersAtPool && (
                  <img 
                    id="item-28"
                    src="https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/28.avif"
                    className="absolute left-[32%] top-[76%] w-[10%] z-50 pointer-events-none animate-bounce"
                  />
                )}

                {/* 染色悬浮图 32 */}
                {showStainIconRound2 && !isTweezersAtPool && (
                  <img 
                    id="item-32"
                    src="https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/32.avif"
                    className="absolute left-[32%] top-[76%] w-[10%] z-50 pointer-events-none animate-bounce"
                  />
                )}

                {/* 染色悬浮图 35 */}
                {showStainIconRound3 && !isTweezersAtPool && (
                  <img 
                    id="item-35"
                    src="https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/35.avif"
                    className="absolute left-[32%] top-[76%] w-[10%] z-50 pointer-events-none animate-bounce"
                  />
                )}

                {/* 染色悬浮图 38 */}
                {showStainIconRound4 && !isTweezersAtPool && (
                  <img 
                    id="item-38"
                    src="https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/38.avif"
                    className="absolute left-[32%] top-[76%] w-[10%] z-50 pointer-events-none animate-bounce"
                  />
                )}

                {/* 静态器材：找回 3, 5, 6, 8-11 */}
               <img 
  id="item-3" 
  src="https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/3.avif"
  className={`absolute left-[15%] top-[79%] w-[10%] pointer-events-auto cursor-pointer transition-all
   
  `}
  onClick={() => handleItemClick('item-3')}
/>
{/* 接种环 - 图片5 */}
{loopVisible && (
  <img 
    id="item-5" 
    src={loopClickable ? "https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/1.avif" : "https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/5.avif"}
    className={`absolute left-[19%] top-[82%] w-[4%] -rotate-12 pointer-events-auto cursor-pointer transition-all
      ${loopClickable ? 'drop-shadow-[0_0_20px_rgba(255,255,0,0.8)] z-90 scale-110' : 'z-90'}
    `}
    onClick={() => handleItemClick('item-5')}
  />
)}
<img 
  id="item-6" 
  src={lampLit ? "https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/26.avif" : "https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/6.avif"}
  className={`absolute left-[48%] top-[68%] w-[7%] pointer-events-auto cursor-pointer transition-all
    ${(experiment.id === 'exp2' && lampClickable) 
      ? 'drop-shadow-[0_0_20px_rgba(255,255,0,0.8)] z-50 scale-110' 
      : 'z-20'
    }
  `}
  onClick={() => handleItemClick('item-6')}
/>
                <div className="absolute left-[58%] top-[65%] flex gap-[1%] w-[20%] pointer-events-none">
                   {[8, 9, 10, 11].map(n => (
                     <img 
                       key={n} 
                       src={`https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/${n}.avif`}
                       className={`w-[20%] transition-all pointer-events-auto
                         ${(n === 11 && bottleClickable) || (n === 10 && item10Clickable) || (n === 9 && item9Clickable) || (n === 8 && item8Clickable) ? 'drop-shadow-[0_0_20px_rgba(255,255,0,0.8)] z-50 scale-125 cursor-pointer' : ''}
                       `}
                       onClick={n === 11 ? () => handleItemClick('item-11') : (n === 10 ? () => handleItemClick('item-10') : (n === 9 ? () => handleItemClick('item-9') : (n === 8 ? () => handleItemClick('item-8') : undefined)))}
                     />
                   ))}
                </div>

                {/* 滴管底座 (图7) */}
                <img id="item-7"
                  src={isDropperUsed ? "https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/21.avif" : "https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/7.avif"}
                  className={`absolute left-[68%] top-[77%] w-[5%] pointer-events-auto transition-all
                    ${(isSlidePrepared && !isDropperUsed && currentStep === 2) ? 'drop-shadow-[0_0_20px_rgba(255,255,0,0.8)] z-30 scale-110 cursor-pointer' : 'z-20'}
                  `}
                  onClick={() => handleItemClick('item-7')}
                />

                {/* 试剂瓶 (图12) */}
                {/* 找到 id="item-12" 的 img 标签 */}
<img 
  id="item-12" 
  src="https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/12.avif"
  className="absolute left-[82%] top-[65%] w-[8%] pointer-events-auto z-20"
/>
             {/* 悬浮滴管 (图22 -> 23) */}
{isDropperUsed && !lampClickable && !lampLit && (
  <img
    key={`dropper-${sceneRevision}`}
    id="item-22"
    src={isDropperHighlighted
      ? "https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/highlight-diguan.avif"
      : (isDropperInserted ? "https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/23.avif" : "https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/22.avif")}
    className={`absolute left-[78%] top-[52%] w-[7%] pointer-events-auto transition-all
      ${isDropperHighlighted 
        ? 'drop-shadow-[0_0_20px_rgba(255,255,0,0.8)] z-[100] cursor-pointer scale-110' 
        : 'z-20'
      }
    `}
    onClick={() => handleItemClick('item-22')}
  />
)}
            </div>
{coolingMessage && (
  <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 z-[200] lab-toast px-6 py-2 text-base font-bold pointer-events-none">
    {coolingMessage}
  </div>
)}
            {/* 观察菌落详情 */}
            {showColonyDetail && (
              <div className="absolute inset-0 z-[100] flex items-center justify-center p-4 pointer-events-auto">
                <div className="absolute inset-0 lab-scrim cursor-pointer" 
                  onClick={() => {
                    setShowColonyDetail(false);
                    setCompletedSteps(prev => [...prev, 1]); 
                    setCurrentStep(2); 
                    gsap.to("#petri-dish", {
                      left: "35%", top: "68%", xPercent: 0, yPercent: 0, 
                      scale: 1, duration: 0.5, ease: "power2.out"
                    });
                  }}
                />
                <div className="relative flex items-center gap-5 lab-chalk-sheet p-4 animate-in zoom-in duration-300 max-w-[88%] max-h-[88%] overflow-hidden">
                  <div className="space-y-2 text-center">
                    <img src="https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/16.avif" className="w-auto max-w-[240px] max-h-[230px] object-contain rounded-xl border-2 border-white/30 shadow-2xl" alt="Colony Distribution" />
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest">Enlarged View</p>
                  </div>
                  <div className="flex flex-col gap-4 max-w-[240px]">
                    <div className="border-l-4 border-blue-500 pl-4 space-y-3">
                      <h4 className="text-blue-400 font-bold text-lg">Colony Characteristics</h4>
                      <div className="text-sm space-y-1 text-slate-300">
                        <p>● Size: small to medium</p>
                        <p>● Color: creamy white</p>
                        <p>● Edges: smooth and regular</p>
                        <p>● Surface: moist and glossy</p>
                      </div>
                    </div>
                    <p className="text-[10px] text-blue-400/60 animate-pulse mt-4">Click the gray background to return and proceed to Step 3...</p>
                  </div>
                </div>
              </div>
            )}

            {/* 染色结果详情 (图30) */}
            {showStainDetail && (
              <div className="absolute inset-0 z-[110] flex items-center justify-center p-4 pointer-events-auto">
                <div className="absolute inset-0 lab-scrim cursor-pointer" 
                  onClick={() => {
                    setShowStainDetail(false);
                    setPoolClickable(true); // 退出图30后水池高亮
                    setIsPoolReplaced(true); // 水池替换为31.png
                  }}
                />
                <div className="relative flex items-center gap-5 lab-chalk-sheet p-4 animate-in zoom-in duration-300 max-w-[88%] max-h-[88%] overflow-hidden">
                  <div className="text-center space-y-2">
                    <img src="https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/30.avif" className="w-auto max-w-[240px] max-h-[230px] object-contain rounded-lg border-2 border-white/30 shadow-2xl" alt="Staining Results" />
                    <p className="text-[9px] text-slate-500 uppercase tracking-widest">Microscope View (After Staining)</p>
                  </div>
                  <div className="max-w-[240px] text-left">
                    <h4 className="text-blue-400 font-bold text-base mb-1">Gram Staining Results</h4>
                    <p className="text-xs text-slate-300">Purple rod-shaped bacteria are visible at this staining stage.</p>
                    <p className="text-[9px] text-blue-400/60 animate-pulse mt-2">Click the background to return...</p>
                  </div>
                </div>
              </div>
            )}

            {/* 复染结果详情 (图34) */}
             {showStainDetailRound2 && (
               <div className="absolute inset-0 z-[110] flex items-center justify-center p-4 pointer-events-auto">
                 <div className="absolute inset-0 lab-scrim cursor-pointer" 
                   onClick={() => {
                     setShowStainDetailRound2(false);
                     setPoolClickable(true); // 退出后水池再次高亮
                     setIsPoolReplaced(true);
                   }}
                 />
                 <div className="relative flex items-center gap-5 lab-chalk-sheet p-4 animate-in zoom-in duration-300 max-w-[88%] max-h-[88%] overflow-hidden">
                   <div className="text-center space-y-2">
                     <img src="https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/34.avif" className="w-auto max-w-[240px] max-h-[230px] object-contain rounded-lg border-2 border-white/30 shadow-2xl" alt="Counterstaining Results" />
                     <p className="text-[9px] text-slate-500 uppercase tracking-widest">Microscope View (After Counterstaining)</p>
                   </div>
                   <div className="max-w-[240px] text-left">
                     <h4 className="text-blue-400 font-bold text-base mb-1">Observe Counterstaining Results</h4>
                     <p className="text-xs text-slate-300">Red rod-shaped bacteria are visible, indicating Gram-negative bacteria.</p>
                     <p className="text-[9px] text-blue-400/60 animate-pulse mt-2">Click the background to return...</p>
                   </div>
                 </div>
               </div>
             )}

             {/* 第三轮结果详情 (图36) */}
             {showStainDetailRound3 && (
               <div className="absolute inset-0 z-[110] flex items-center justify-center p-4 pointer-events-auto">
                 <div className="absolute inset-0 lab-scrim cursor-pointer" 
                   onClick={() => {
                     setShowStainDetailRound3(false);
                     setPoolClickable(true);
                     setIsPoolReplaced(true);
                   }}
                 />
                 <div className="relative flex items-center gap-5 lab-chalk-sheet p-4 animate-in zoom-in duration-300 max-w-[88%] max-h-[88%] overflow-hidden">
                   <div className="text-center space-y-2">
                     <img src="https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/36.avif" className="w-auto max-w-[240px] max-h-[230px] object-contain rounded-lg border-2 border-white/30 shadow-2xl" alt="Round 3 Results" />
                     <p className="text-[9px] text-slate-500 uppercase tracking-widest">Microscope View (Round 3)</p>
                   </div>
                   <div className="max-w-[240px] text-left">
                     <h4 className="text-blue-400 font-bold text-base mb-1">Round 3 Staining Observation</h4>
                     <p className="text-xs text-slate-300">Further enhance staining to observe cellular detail.</p>
                     <p className="text-[9px] text-blue-400/60 animate-pulse mt-2">Click the background to return...</p>
                   </div>
                 </div>
               </div>
             )}

             {/* 第四轮结果详情 (图40) */}
             {showStainDetailRound4 && (
               <div className="absolute inset-0 z-[110] flex items-center justify-center p-4 pointer-events-auto">
                 <div className="absolute inset-0 lab-scrim cursor-pointer" 
                   onClick={() => {
                     setShowStainDetailRound4(false);
                     setPoolClickable(true);
                     setIsPoolReplaced(true);
                   }}
                 />
                 <div className="relative flex items-center gap-5 lab-chalk-sheet p-4 animate-in zoom-in duration-300 max-w-[88%] max-h-[88%] overflow-hidden">
                   <div className="text-center space-y-2">
                     <img src="https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/40.avif" className="w-auto max-w-[240px] max-h-[230px] object-contain rounded-lg border-2 border-white/30 shadow-2xl" alt="Round 4 Results" />
                     <p className="text-[9px] text-slate-500 uppercase tracking-widest">Microscope View (Round 4)</p>
                   </div>
                   <div className="max-w-[240px] text-left">
                     <h4 className="text-blue-400 font-bold text-base mb-1">Final Round 4 Observation</h4>
                     <p className="text-xs text-slate-300">All staining steps are complete, providing a clear final morphology image.</p>
                     <p className="text-[9px] text-blue-400/60 animate-pulse mt-2">Click the background to return...</p>
                   </div>
                 </div>
               </div>
             )}

            {/* 完成界面 */}
            {isCompleted && <ExperimentCompletion onRestart={onRestart} onBack={onBack} />}
          </div>
          )}

          {/* 画框下方当前步骤说明，内容对应实验二 PPT */}
          {currentStepData && !isCompleted && (
            <div className="w-full min-h-[112px] flex-1 px-1 pt-1 text-left">
              <div className="lab-step-caption mb-2 flex items-center gap-2 text-sm font-bold">
                <span className="text-blue-400">Step {currentStep + 1}/{experiment.steps.length}</span>
                <span className="text-blue-500">|</span>
                <span className="text-blue-400">{currentStepData.title}</span>
              </div>
              <div className="flex h-[calc(100%-30px)] items-center justify-center lab-note-card px-4 py-3 text-center text-xs leading-relaxed">
                {currentStepData.description}
              </div>
              <div className="mt-2 flex justify-end">
                
              </div>
            </div>
          )}
        </main>

        <aside className="hidden xl:flex flex-col w-80 p-3 lab-info-rail shrink-0 overflow-y-auto">
          <Experiment2InfoPanel />
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
