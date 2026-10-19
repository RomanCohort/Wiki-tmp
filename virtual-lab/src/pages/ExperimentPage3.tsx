import { useStepSnapshots } from '../hooks/use-step-snapshots';
import { RestartExperimentButton, ExperimentCompletion } from '../components/ExperimentControls';
// src/pages/ExperimentPage3.tsx
// 实验三：质粒载体（pET-28a）的小量提取与琼脂糖凝胶电泳检测
// 视觉参考 ExperimentPage2.tsx；动作、状态、坐标与文案依据实验三 PPT P5-P84。
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Check, ChevronLeft, Lightbulb } from 'lucide-react';

import { Experiment3InfoPanel } from '../components/Experiment3InfoPanel';
import { allExperiments } from '../data/experiments';
import gsap from 'gsap';

interface ExperimentPageProps { experimentId?: string; onBack: () => void; onRestart: () => void }
const CANVAS_ASPECT_RATIO = 16 / 9;

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

type Tip = 0 | 1 | 2 | 3;
type Detail = 'spinResult' | 'vortexResult' | 's3Result' | 'dnaResult' | 'gelResult' | 'loading90' | 'assembly91' | 'electrophoresisResult' | 'bandGuide' | null;
type Sample = 'empty' | 'culture' | 'tube1' | 'tube2' | 'tube3' | 'tube4' | 'tube5' | 'tube6' | 'dna';
type Flask = 'empty' | 'powder' | 'mixed' | 'cooled' | 'dyed';
type Gel = 'blank' | 'poured' | 'solid' | 'chamber' | 'loaded' | 'finished';
type SpoonState = 'tray' | 'raised' | 'loaded' | 'done';
type CastingState = 'empty' | 'filled' | 'solid';
type TubeStage = 'rack' | 'three' | 'mixed' | 'mixedOnly' | 'marker' | 'dnaLoaded' | 'loaded';
type StandaloneColumnState = 'hidden' | 'empty' | 'liquid';
type CollectionTubeState = 'hidden' | 'empty' | 'final';
type ColumnAssemblyState = 'hidden' | 'empty' | 'open' | 'loaded';
type RackTubeKey = 'blueAtWork' | 'redAtWork' | 'orangeAtWork' | 'greenAtWork';
type Kind = 'move' | 'tip' | 'pipette' | 'dispense' | 'spinSample' | 'spinColumn' | 'invert' | 'vortex' | 'timer' | 'detail' | 'custom';
interface Action { id:string; step:number; item:string; ppt:string; kind:Kind; to?:[string,string]; tip?:Tip; sample?:Sample; status?:string; detail?:Exclude<Detail,null> }
interface Scene {
  cultureAtWork:boolean; sample:Sample; sampleVisible:boolean; sampleOpen:boolean; tilted:boolean; tip:Tip; openBox:Tip;
  solutionIIIAtWork:boolean; blueAtWork:boolean; redAtWork:boolean; orangeAtWork:boolean;
  standaloneColumn:StandaloneColumnState; collectionTube:CollectionTubeState; columnAssembly:ColumnAssemblyState;
  flask:Flask; greenAtWork:boolean;
  microwaveOpen:boolean; comb:boolean; gel:Gel; connected:boolean; gelAtImager:boolean;
  powderOpen:boolean; spoon:SpoonState; cylinderFull:boolean; dyeOpen:boolean; toolsVisible:boolean;
  casting:CastingState; coverPlaced:boolean; coverVisible:boolean; chamberFilled:boolean;
  tubeStage:TubeStage; loadStage:0|1|2;
}

const steps = [
  { id:1,title:"Pellet the Cells",description:"Centrifuge 1.5 mL culture for 1 min. Discard the supernatant and retain the cell pellet.",highlightItems:[],animationType:'move',completed:false },
  { id:2,title:"Resuspend in Solution I",description:"Add 100 μL chilled Solution I and vortex until the cells are fully resuspended.",highlightItems:[],animationType:'move',completed:false },
  { id:3,title:"Lyse with Solution II",description:"Add 200 μL Solution II, mix by inversion and leave for 5 min until clear and viscous.",highlightItems:[],animationType:'move',completed:false },
  { id:4,title:"Neutralize with Solution III",description:"Add 150 μL chilled Solution III, mix by inversion and leave for 5 min until a white precipitate forms.",highlightItems:[],animationType:'move',completed:false },
  { id:5,title:"Purify on a Column",description:"Centrifuge for 10 min, transfer the supernatant to a purification column, spin for 30 s and discard the flow-through.",highlightItems:[],animationType:'move',completed:false },
  { id:6,title:"Wash and Dry",description:"Add 500 μL wash buffer and centrifuge for 30 s. Spin the empty column for 2 min to remove residual ethanol.",highlightItems:[],animationType:'move',completed:false },
  { id:7,title:"Elute and Collect DNA",description:"Place the column in a new tube, add 30–50 μL elution buffer at 55°C, leave for 2 min and centrifuge for 2 min to collect DNA.",highlightItems:[],animationType:'move',completed:false },
  { id:8,title:"Melt Agarose and Add Stain",description:"Add 0.3 g agarose to 30 mL TAE and microwave to dissolve. Cool to 60°C, add stain and mix.",highlightItems:[],animationType:'move',completed:false },
  { id:9,title:"Cast and Set the Gel",description:"Pour into the casting tray and leave for 30 min to set. Remove the comb, transfer the gel to the tank and cover with TAE.",highlightItems:[],animationType:'move',completed:false },
  { id:10,title:"Mix and Load Samples",description:"Mix 5 μL plasmid DNA with 1 μL loading buffer and load a well. Add 5 μL ladder to an adjacent well.",highlightItems:[],animationType:'move',completed:false },
  { id:11,title:"Run Electrophoresis",description:"Close the tank with the wells toward the negative electrode. Run at 120 V for 25 min and stop when bromophenol blue reaches two-thirds of the gel.",highlightItems:[],animationType:'move',completed:false },
  { id:12,title:"UV Imaging",description:"Place the gel in the UV imaging system, turn on the light and capture an image. Compare with the ladder to identify the 5369 bp plasmid.",highlightItems:[],animationType:'move',completed:false },
];

const I = {
  room:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment2/bg.avif',
  table1:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/common/blue-table.avif', table2:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/common/table-normal.avif', bench:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/common/cleanbench-part.avif',
  centrifuge:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/highspeedcentrifuge.avif', vortex:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/vortexoscillator.avif',
  microwave:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/microwaveovenclosed.avif', microwaveOpen:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/44.avif',
  ultrasonic:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/ultrasoniccleaner.avif', uv:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/uvgelimagingsystem.avif',
  power:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/electrophoresispowersupply.avif', chamber:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/electrophoresischamber.avif',
  chamberOn:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/electrophoresischamberconnected.avif', ice:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/iceboxyellow.avif',
  carboy:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/reagentcarboyblue.avif', pcr:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/pcrplate96well.avif',
  pageRack:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/common/img10.avif', schoolLogo:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/common/img5.avif', igemLogo:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/common/img6.avif',
  labRack:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/811.avif', rackBlueMini:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/812.avif',
  blueWork:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/813.avif', redWork:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/8100.avif',
  rackOrange:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/8105.avif', rackGreen:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/8106.avif',
  beaker:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/beaker.avif', tray:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/metaltray.avif',
  pipette:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/pipette.avif',
  bodies:['','https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/pipette1-1.avif','https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/pipette2-1.avif','https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/pipette3-1.avif'],
  tips:['','https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/pipette1-2.avif','https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/pipette2-2.avif','https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/pipette3-2.avif'],
  boxes:['','https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/pipettetipboxclosed1.avif','https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/pipettetipboxclosed2.avif','https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/pipettetipboxclosed3.avif'],
  boxesOpen:['','https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/pipettetipboxopen1.avif','https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/pipettetipboxopen2.avif','https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/pipettetipboxopen3.avif'],
  empty:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/eptubeempty.avif', blue:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/eptubeblue.avif',
  tube1:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/1.avif', tube2:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/2.avif',
  tube3:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/3.avif', tube4:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/4.avif', tube5:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/5.avif',
  tube6:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/6.avif',
  spinResult:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/show5.avif', purple:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/eptubepurple.avif', culture:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/eptubeblue.avif',
  rack:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/tuberack.avif', rackBlue:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/tuberackblueempty.avif',
  rackYellow:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/tuberackwithyellowsample.avif',
  s1:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/tubeiconnavy.avif', s2:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/tubeiconred.avif',
  s3:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/10.avif', orangeWash:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/33.avif',
  eluent:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/tubeiconpurple.avif', load:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/eptubesmallblue.avif',
  marker:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/eptubesmallblue2.avif', dye:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/pcrtubered.avif',
  clear:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/eptubesmallclear.avif', column:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/eptubelightblue.avif',
  columnEmpty:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/eptubelightblueempty.avif',
  flask:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/erlenmeyerflask.avif', flaskPowder:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/erlenmeyerflaskpowder.avif',
  flaskRed:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/erlenmeyerflaskred.avif', comb:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/gelcomb.avif',
  gel:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/gelcassetteblank.avif', gelOpen:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/gelcassetteblankopen.avif',
  gelSolid:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/gelcassetteblank2.avif',
  shows1:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/shows1.avif', shows2:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/shows2.avif', shows3:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/shows3.avif',
  tubeTilted:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/eptubeyellowtilted.avif', clearWater:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/eptubesmallclearwater.avif',
  orange:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/eptubeorange.avif', orangeTilted:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/eptubeorangetilted.avif',
  green:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/eptubegreen.avif', greenTilted:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/eptubegreentilted.avif',
  standaloneColumnEmpty:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/13.avif', standaloneColumnLiquid:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/14.avif',
  columnAssembly:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/16.avif', columnAssemblyOpen:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/8201.avif',
  sampleOpen:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/8202.avif', columnAssemblyLoaded:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/8203.avif',
  finalCollectionTube:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/8310.avif', greenEluent:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/081.avif',
  cleanBench:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment7/cleanbenchsmall.webp', electrophoresis:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/31.avif',
  amber:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/reagentbottleambercapped.avif', filledBottle:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/reagentbottlefilled.avif',
  beaker30:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/beaker30ml.avif',
  spoon:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/41.avif', powderOpen:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/42.avif', flaskMixed:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/43.avif',
  flaskCooled:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/45.avif', dyeOpen:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/46.avif', flaskDyed:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/47.avif',
  castingBase:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/48.avif', castingCover:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/49.avif', castingFilled:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/50.avif',
  castingSolid:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/51.avif', rackTubeA:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/53.avif', rackTubeB:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/54.avif',
  rackClear:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/8501.avif', rackEmpty:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/8502.avif',
  rackBlueSample:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/8503.avif', rackPurple:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/8504.avif',
  sampleTube:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/55.avif', mixedTube:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/60.avif', markerTube:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/61.avif',
  loading90:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/90.avif', assembly91:'https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment3/91.avif',
};

/*
 * 严格按 PPT 页序排列。每段注释记录：Step、PPT页、器材起点→终点（均为实验画布百分比坐标）。
 * PPT 中的解释箭头不保留；任一时刻只让当前 action.item 产生贴边黄光。
 */
const actions: Action[] = [
  // Step1 P5-P13：1号吸头盒 → 枪取右侧黄色菌液 → 空EP管接液并变为黄底沉淀管 → 离心1min后完成。
  {id:'tip1a',step:0,item:'box1',ppt:'P5-P6',kind:'tip',tip:1},
  {id:'aspCulture',step:0,item:'pipette',ppt:'P6-P8',kind:'pipette',to:['72%','70%']},
  {id:'dispCulture',step:0,item:'sample',ppt:'P8-P9',kind:'dispense',to:['33.8%','68%'],sample:'tube6'},
  {id:'spin1',step:0,item:'centrifuge',ppt:'P9-P13',kind:'spinSample',status:"Centrifuge for 1 min"},

  // Step2：3号枪头；左下架蓝管取出后一次完成取液、滴液、归位，再涡旋。
  {id:'tip3s1',step:1,item:'box3',ppt:'P14-P15',kind:'tip',tip:3},
  {id:'transferS1',step:1,item:'blueMini',ppt:'P15-P17',kind:'custom'},
  {id:'vortex',step:1,item:'vortex',ppt:'P17-P18',kind:'vortex'},
  // Step3：3号枪头；右上红管取出后一次完成取液、滴液、归位，再自动颠倒静置。
  {id:'tip3s2',step:2,item:'box3',ppt:'P19-P20',kind:'tip',tip:3},
  {id:'transferS2',step:2,item:'s2',ppt:'P20-P23',kind:'custom'},
  // Step4：黄色试管留在冰盒上；3号枪头装好后一次完成取液和滴液。
  {id:'tip3a',step:3,item:'box3',ppt:'P24-P25',kind:'tip',tip:3},
  {id:'transferS3',step:3,item:'s3',ppt:'P25-P30',kind:'custom'},
  // Step5：先取新EP管并套入空纯化柱；开盖后换3号枪头，从主管吸液滴入纯化柱，再离心30s。
  {id:'takeCollection5',step:4,item:'collectionTube',ppt:'P31',kind:'custom'},
  {id:'assembleColumn5',step:4,item:'standaloneColumn',ppt:'P31-P32',kind:'custom'},
  {id:'openColumn5',step:4,item:'column',ppt:'P32',kind:'custom'},
  {id:'tip3Column',step:4,item:'box3',ppt:'P32-P33',kind:'tip',tip:3},
  {id:'transferSampleToColumn',step:4,item:'pipette',ppt:'P33-P35',kind:'custom'},
  {id:'spinLoadedColumn',step:4,item:'centrifuge',ppt:'P35-P36',kind:'custom',status:"Centrifuge for 30 s"},
  // Step6：含液纯化柱换入新EP管，加入橙色漂洗液，依次离心30s和2min。
  {id:'takeCollection6',step:5,item:'collectionTube',ppt:'P37',kind:'custom'},
  {id:'assembleColumn6',step:5,item:'standaloneColumn',ppt:'P37',kind:'custom'},
  {id:'tip2b',step:5,item:'box2',ppt:'P37-P38',kind:'tip',tip:2},
  {id:'transferWash',step:5,item:'washMini',ppt:'P38-P40',kind:'custom'},
  {id:'spinWashColumn',step:5,item:'centrifuge',ppt:'P40-P41',kind:'custom',status:"Centrifuge for 30 s"},
  {id:'spinDryColumn',step:5,item:'centrifuge',ppt:'P41-P42',kind:'custom',status:"Centrifuge for 2 min"},
  // Step7：纯化柱再次换入新EP管，加入55℃绿色洗脱液，静置、离心并拆柱收集DNA。
  {id:'takeCollection7',step:6,item:'collectionTube',ppt:'P43',kind:'custom'},
  {id:'assembleColumn7',step:6,item:'standaloneColumn',ppt:'P43',kind:'custom'},
  {id:'takeGreen',step:6,item:'greenMini',ppt:'P43-P44',kind:'custom'},
  {id:'heatGreen',step:6,item:'ultrasonic',ppt:'P44-P45',kind:'custom',status:"Preheat to 55°C"},
  {id:'tip3b',step:6,item:'box3',ppt:'P45-P46',kind:'tip',tip:3},
  {id:'aspEluent',step:6,item:'green',ppt:'P46-P48',kind:'pipette',to:['61.3%','20%']},
  {id:'elute',step:6,item:'column',ppt:'P48-P49',kind:'dispense',to:['57.5%','65%']},
  {id:'restColumn',step:6,item:'column',ppt:'P49-P50',kind:'timer',status:"Leave for 2 min"},
  {id:'spinElution',step:6,item:'centrifuge',ppt:'P50',kind:'custom',status:"Centrifuge for 2 min"},
  {id:'detachColumn',step:6,item:'column',ppt:'P51-P53',kind:'custom'},
  // Step8：开琼脂糖瓶、用汤匙加粉、量取TAE、微波加热冷却，再换头加入核酸染料。
  {id:'openPowder',step:7,item:'powderBottle',ppt:'P54',kind:'custom'},
  {id:'scoopPowder',step:7,item:'spoon',ppt:'P55',kind:'custom'},
  {id:'fillCylinder',step:7,item:'carboy',ppt:'P57',kind:'custom'},
  {id:'addWater',step:7,item:'flask',ppt:'P58-P59',kind:'custom'},
  {id:'microIn',step:7,item:'microwave',ppt:'P60-P61',kind:'custom',status:"Microwave Heating"},
  {id:'coolFlask',step:7,item:'flask',ppt:'P62-P63',kind:'custom',status:"Cool to 60°C"},
  {id:'openDye',step:7,item:'dye',ppt:'P63',kind:'custom'},
  {id:'tip1d',step:7,item:'box1',ppt:'P64',kind:'tip',tip:1},
  {id:'aspDye',step:7,item:'dye',ppt:'P64',kind:'pipette',to:['25.5%','65%']},
  {id:'dispenseDye',step:7,item:'flask',ppt:'P65',kind:'custom'},
  // Step9：倒胶、放置封盖、静置凝固并取下封盖，展示48+51组合结果。
  {id:'pourGel',step:8,item:'flask',ppt:'P66-P67',kind:'custom'},
  {id:'coverGel',step:8,item:'gelCover',ppt:'P68',kind:'custom'},
  {id:'solid',step:8,item:'gelRig',ppt:'P69',kind:'timer',status:"Allow to set for 30 min"},
  {id:'uncoverGel',step:8,item:'gelCover',ppt:'P70',kind:'custom'},
  // Step10：加缓冲液、取三支管、混样并分别把质粒样品和Marker加入电泳槽。
  {id:'fillChamber',step:9,item:'carboy',ppt:'P71',kind:'custom'},
  {id:'takeRackTubes',step:9,item:'rack',ppt:'P72',kind:'custom'},
  {id:'tip1Sample',step:9,item:'box1',ppt:'P73',kind:'tip',tip:1},
  {id:'aspSample',step:9,item:'sampleSource',ppt:'P74',kind:'pipette',to:['17.2%','72%']},
  {id:'mixSample',step:9,item:'emptyTube',ppt:'P75',kind:'custom'},
  {id:'returnTubes',step:9,item:'rack',ppt:'P76',kind:'custom'},
  {id:'takeMarker',step:9,item:'rack',ppt:'P77',kind:'custom'},
  {id:'tip3Load',step:9,item:'box3',ppt:'P78',kind:'tip',tip:3},
  {id:'aspDna',step:9,item:'mixedTube',ppt:'P79',kind:'pipette',to:['10.5%','72%']},
  {id:'loadDna',step:9,item:'chamber',ppt:'P80',kind:'custom'},
  {id:'tip2Marker',step:9,item:'box2',ppt:'P81',kind:'tip',tip:2},
  {id:'aspMarker',step:9,item:'markerTube',ppt:'P82',kind:'pipette',to:['23%','72%']},
  {id:'loadMarker',step:9,item:'chamber',ppt:'P83',kind:'custom'},
  // Step11：启动完整电泳设备。
  {id:'run',step:10,item:'power',ppt:'P84',kind:'custom',status:"Run at 120 V for 25 min"},
  // Step12：紫外成像后连续展示凝胶照片和条带判读。
  {id:'observe',step:11,item:'uvGelTransfer',ppt:'P85',kind:'custom'},];

const initial:Scene = {
  cultureAtWork:false,sample:'empty',sampleVisible:true,sampleOpen:false,tilted:false,tip:0,openBox:0,solutionIIIAtWork:false,
  blueAtWork:false,redAtWork:false,orangeAtWork:false,
  standaloneColumn:'hidden',collectionTube:'hidden',columnAssembly:'hidden',flask:'empty',greenAtWork:false,
  microwaveOpen:false,comb:false,
  gel:'blank',connected:false,gelAtImager:false,
  powderOpen:false,spoon:'tray',cylinderFull:false,dyeOpen:false,toolsVisible:false,
  casting:'empty',coverPlaced:false,coverVisible:true,chamberFilled:false,tubeStage:'rack',loadStage:0,
};

const stepStartScenes:Scene[] = [
  initial,
  {...initial,sample:'tube1'},
  {...initial,sample:'tube3'},
  {...initial,sample:'tube4'},
  {...initial,sample:'tube2',standaloneColumn:'empty',collectionTube:'empty'},
  {...initial,sample:'tube2',sampleVisible:false,standaloneColumn:'liquid',collectionTube:'empty'},
  {...initial,sample:'tube2',sampleVisible:false,standaloneColumn:'empty',collectionTube:'empty'},
  {...initial,sample:'tube2',sampleVisible:false,standaloneColumn:'empty',collectionTube:'final'},
  {
    ...initial,sample:'tube2',sampleVisible:false,standaloneColumn:'empty',collectionTube:'final',
    flask:'dyed',powderOpen:true,spoon:'done',toolsVisible:true,
  },
  {
    ...initial,sample:'tube2',sampleVisible:false,standaloneColumn:'empty',collectionTube:'final',
    flask:'dyed',powderOpen:true,spoon:'done',toolsVisible:true,
    casting:'solid',coverVisible:false,
  },
  {
    ...initial,sample:'tube2',sampleVisible:false,standaloneColumn:'empty',collectionTube:'final',
    flask:'dyed',powderOpen:true,spoon:'done',toolsVisible:true,
    casting:'solid',coverVisible:false,chamberFilled:true,tubeStage:'loaded',loadStage:2,
  },
  {
    ...initial,sample:'tube2',sampleVisible:false,standaloneColumn:'empty',collectionTube:'final',
    flask:'dyed',powderOpen:true,spoon:'done',toolsVisible:true,
    casting:'solid',coverVisible:false,chamberFilled:true,tubeStage:'loaded',loadStage:2,connected:true,gel:'finished',
  },
];

const firstPhaseForStep=(stepIndex:number)=>actions.findIndex((candidate)=>candidate.step===stepIndex);
const pendingWaits=new Set<number>();
const wait=(ms:number)=>new Promise<void>((resolve)=>{
  const timer=window.setTimeout(()=>{
    pendingWaits.delete(timer);
    resolve();
  },ms);
  pendingWaits.add(timer);
});
const cancelPendingWaits=()=>{
  pendingWaits.forEach((timer)=>window.clearTimeout(timer));
  pendingWaits.clear();
};

function getTransformedImagePoint(image:HTMLImageElement,xRatio:number,yRatio:number){
  const offsetParent=image.offsetParent as HTMLElement|null;
  const parentRect=offsetParent?.getBoundingClientRect();
  const style=window.getComputedStyle(image);
  const [originX=0,originY=0]=style.transformOrigin.split(' ').map(Number.parseFloat);
  const matrix=new DOMMatrixReadOnly(style.transform==='none'?'matrix(1, 0, 0, 1, 0, 0)':style.transform);
  const localPoint=new DOMPoint(
    image.offsetWidth*xRatio-originX,
    image.offsetHeight*yRatio-originY,
  ).matrixTransform(matrix);
  return {
    x:(parentRect?.left??0)+image.offsetLeft+originX+localPoint.x,
    y:(parentRect?.top??0)+image.offsetTop+originY+localPoint.y,
  };
}

function getContainedImagePoint(image:HTMLImageElement,xRatio:number,yRatio:number){
  const rect=image.getBoundingClientRect();
  const naturalAspect=image.naturalWidth/image.naturalHeight;
  const boxAspect=rect.width/rect.height;
  let width=rect.width;
  let height=rect.height;
  let offsetX=0;
  let offsetY=0;
  if(boxAspect>naturalAspect){
    width=height*naturalAspect;
    offsetX=(rect.width-width)/2;
  }else{
    height=width/naturalAspect;
    offsetY=rect.height-height;
  }
  return {x:rect.left+offsetX+width*xRatio,y:rect.top+offsetY+height*yRatio};
}

export function ExperimentPage({experimentId='exp3',onBack,onRestart}:ExperimentPageProps){
  const experiment=useMemo(()=>({...((allExperiments.find((e)=>e.id===experimentId))||allExperiments[0]),steps:steps as (typeof allExperiments)[number]['steps']}),[experimentId]);
  const [phase,setPhase]=useState(0);
  const [done,setDone]=useState<number[]>([]);
  const [hovered,setHovered]=useState<number|null>(null);
  const [animating,setAnimating]=useState(false);
  const [status,setStatus]=useState('');
  const [detail,setDetail]=useState<Detail>(null);
  const [scene,setScene]=useState<Scene>(initial);
  const [sceneRevision,setSceneRevision]=useState(0);
  const [clockLabel,setClockLabel]=useState<string|null>(null);
  const activeTimeline=useRef<gsap.core.Timeline|null>(null);
  const {frameRef:canvasFrameRef,canvasStyle}=useFixedCanvasSize();

  const action=actions[phase];
  const currentStep=action?.step??steps.length;
  const complete=phase>=actions.length;
  const stepData=experiment.steps[currentStep];
  const sideIndex=hovered??(currentStep===0?0:Math.min(currentStep-1,steps.length-1));
  const sideData=experiment.steps[sideIndex];
  const extraction=currentStep<=6;

  // 实验二同款贴边柔和黄光：透明 PNG 的 alpha 外缘发光，不闪烁、不画框、不放大。
  const hl=useCallback((item:string)=>action?.item===item&&!animating&&!detail
    ?'pointer-events-auto cursor-pointer z-[80] [filter:drop-shadow(0_0_3px_#fff8a6)_drop-shadow(0_0_9px_#ffd52e)_drop-shadow(0_0_14px_rgba(255,190,0,0.82))]'
    :'pointer-events-none z-30',[action,animating,detail]);

  const tween=useCallback((selector:string,vars:gsap.TweenVars)=>new Promise<void>((resolve)=>{
    const el=document.querySelector(selector);
    if(!el){resolve();return}
    gsap.to(el,{...vars,onComplete:resolve});
  }),[]);
  const playTimeline=useCallback((build:(timeline:gsap.core.Timeline)=>void)=>new Promise<void>((resolve)=>{
    activeTimeline.current?.kill();
    const timeline=gsap.timeline({onComplete:()=>{
      if(activeTimeline.current===timeline)activeTimeline.current=null;
      resolve();
    }});
    activeTimeline.current=timeline;
    build(timeline);
  }),[]);
  useEffect(()=>()=> {
    cancelPendingWaits();
    activeTimeline.current?.kill();
    const canvas=document.querySelector('#experiment-canvas');
    if(canvas)gsap.killTweensOf(canvas.querySelectorAll('*'));
  },[]);
  const say=useCallback(async(text:string,ms=850)=>{setStatus(text);await wait(ms);setStatus('')},[]);
  const finish=useCallback(()=>{
    const current=actions[phase],next=actions[phase+1];
    if(current&&(!next||next.step!==current.step))setDone((p)=>p.includes(current.step)?p:[...p,current.step]);
    setPhase((p)=>p+1);
  },[phase]);

  const fitTip=useCallback(async(n:Exclude<Tip,0>)=>{
    setScene((p)=>({...p,openBox:n}));await wait(60);
    const pipetteEl=document.querySelector<HTMLElement>('#pipette');
    const boxEl=document.querySelector<HTMLElement>('#box'+n);
    if(!pipetteEl||!boxEl)return;
    gsap.set(pipetteEl,{zIndex:110,x:0,y:0});
    const pipetteRect=pipetteEl.getBoundingClientRect();
    const boxRect=boxEl.getBoundingClientRect();
    const moveX=boxRect.left+boxRect.width/2-(pipetteRect.left+pipetteRect.width/2);
    const moveY=boxRect.top+boxRect.height*.32-pipetteRect.bottom;
    await playTimeline((timeline)=>timeline.to(pipetteEl,{x:moveX,y:moveY,duration:.68,ease:'power2.inOut'}));
    await wait(150);setScene((p)=>({...p,tip:n}));await wait(180);setScene((p)=>({...p,openBox:0}));
    await playTimeline((timeline)=>timeline.to(pipetteEl,{x:0,y:0,rotation:0,duration:.56,ease:'power2.out'}));
    gsap.set(pipetteEl,{zIndex:100,x:0,y:0});
  },[playTimeline]);
  const pipette=useCallback(async(to:[string,string],back=true)=>{
    const el=document.querySelector<HTMLElement>('#pipette');
    const canvas=document.querySelector<HTMLElement>('#experiment-canvas');
    if(!el||!canvas)return;
    gsap.set(el,{zIndex:110,x:0,y:0,yPercent:0});
    const canvasRect=canvas.getBoundingClientRect();
    const startRect=el.getBoundingClientRect();
    const targetLeft=canvasRect.width*parseFloat(to[0])/100;
    const targetTop=canvasRect.height*parseFloat(to[1])/100;
    const tipOffsetX=startRect.width*0.5;
    const tipOffsetY=startRect.height*0.98;
    const moveX=targetLeft-(startRect.left+tipOffsetX-canvasRect.left);
    const moveY=targetTop-(startRect.top+tipOffsetY-canvasRect.top);
    await tween('#pipette',{x:moveX,y:moveY,duration:.9,ease:'power2.inOut'});
    await tween('#pipette',{yPercent:4,duration:.14,ease:'sine.in'});
    await tween('#pipette',{yPercent:0,duration:.14,ease:'sine.out'});
    await wait(260);
    if(back)await tween('#pipette',{x:0,y:0,duration:.75,ease:'power2.out'});
    gsap.set(el,{zIndex:100,x:0,y:0,yPercent:0});
  },[tween]);

  const pipetteToElement=useCallback(async(target:string,xRatio=.5,yRatio=.28)=>{
    const targetEl=document.querySelector<HTMLElement>(target);
    const canvas=document.querySelector<HTMLElement>('#experiment-canvas');
    if(!targetEl||!canvas)return;
    const targetRect=targetEl.getBoundingClientRect();
    const canvasRect=canvas.getBoundingClientRect();
    const x=((targetRect.left-canvasRect.left+targetRect.width*xRatio)/canvasRect.width*100).toFixed(2)+'%';
    const y=((targetRect.top-canvasRect.top+targetRect.height*yRatio)/canvasRect.height*100).toFixed(2)+'%';
    await pipette([x,y]);
  },[pipette]);

  const pourInto=useCallback(async(source:string,target:string)=>{
    const sourceEl=document.querySelector<HTMLElement>(source);
    const targetEl=document.querySelector<HTMLElement>(target);
    if(!sourceEl||!targetEl)return;
    const sourceRect=sourceEl.getBoundingClientRect();
    const targetRect=targetEl.getBoundingClientRect();
    const moveX=targetRect.left+targetRect.width*.12-sourceRect.right;
    const moveY=targetRect.top-sourceRect.top;
    gsap.set(sourceEl,{zIndex:125,transformOrigin:'100% 0%'});
    await tween(source,{x:moveX,y:moveY,duration:.72,ease:'power2.inOut'});
    await tween(source,{rotation:120,duration:.64,ease:'power2.inOut'});
    await wait(360);
  },[tween]);

  const pourIntoCounterClockwise=useCallback(async(source:string,target:string)=>{
    const sourceEl=document.querySelector<HTMLElement>(source);
    const targetEl=document.querySelector<HTMLElement>(target);
    if(!sourceEl||!targetEl)return;
    const sourceRect=sourceEl.getBoundingClientRect();
    const targetRect=targetEl.getBoundingClientRect();
    const moveX=targetRect.left+targetRect.width*.62-sourceRect.left;
    const moveY=targetRect.top-sourceRect.top;
    gsap.set(sourceEl,{zIndex:125,transformOrigin:'0% 0%'});
    await tween(source,{x:moveX,y:moveY,duration:.72,ease:'power2.inOut'});
    await tween(source,{rotation:-120,duration:.64,ease:'power2.inOut'});
    await wait(360);
  },[tween]);

  const restorePour=useCallback(async(source:string)=>{
    await tween(source,{rotation:0,x:0,y:0,duration:.62,ease:'power2.out'});
    const sourceEl=document.querySelector(source);
    if(sourceEl)gsap.set(sourceEl,{zIndex:30,transformOrigin:'50% 50%'});
  },[tween]);

  const moveAboveCentrifuge=useCallback(async(selector:string,scale=.7)=>{
    const sourceEl=document.querySelector<HTMLElement>(selector);
    const centrifugeEl=document.querySelector<HTMLElement>('#centrifuge');
    if(!sourceEl||!centrifugeEl)return;
    const sourceRect=sourceEl.getBoundingClientRect();
    const targetRect=centrifugeEl.getBoundingClientRect();
    const moveX=targetRect.left+targetRect.width/2-(sourceRect.left+sourceRect.width/2);
    const moveY=targetRect.top+targetRect.height/2-(sourceRect.top+sourceRect.height/2);
    gsap.set(sourceEl,{zIndex:125});
    await tween(selector,{x:moveX,y:moveY,scale,duration:.72,ease:'power2.inOut'});
  },[tween]);

  const spinOnCentrifuge=useCallback(async(selector:string,label:string)=>{
    const sourceEl=document.querySelector<HTMLElement>(selector);
    if(!sourceEl)return;
    await moveAboveCentrifuge(selector);
    await say(label,720);
    await playTimeline((timeline)=>timeline.to(selector,{rotation:1440,duration:1.05,ease:'none'}));
    await tween(selector,{rotation:0,x:0,y:0,scale:1,duration:.62,ease:'power2.out'});
    gsap.set(sourceEl,{zIndex:30});
  },[moveAboveCentrifuge,playTimeline,say,tween]);

  const moveCenterTo=useCallback(async(source:string,target:string,scale=1)=>{
    const sourceEl=document.querySelector<HTMLElement>(source);
    const targetEl=document.querySelector<HTMLElement>(target);
    if(!sourceEl||!targetEl)return;
    const sourceRect=sourceEl.getBoundingClientRect();
    const targetRect=targetEl.getBoundingClientRect();
    const moveX=targetRect.left+targetRect.width/2-(sourceRect.left+sourceRect.width/2);
    const moveY=targetRect.top+targetRect.height/2-(sourceRect.top+sourceRect.height/2);
    gsap.set(sourceEl,{zIndex:125});
    await tween(source,{x:moveX,y:moveY,scale,duration:.72,ease:'power2.inOut'});
  },[tween]);
  const settleFiveMinutes=useCallback(async(finalSample:'tube4'|'tube2')=>{
    setScene((p)=>({...p,tilted:true}));
    await playTimeline((timeline)=>timeline
      .to('#sample',{rotation:165,duration:.38,ease:'power1.inOut'})
      .to('#sample',{rotation:-165,repeat:2,yoyo:true,duration:.34,ease:'power1.inOut'})
      .to('#sample',{rotation:0,duration:.36,ease:'power2.out'}));
    setScene((p)=>({...p,tilted:false}));
    setClockLabel("After 5 minutes");setStatus("Leave for 5 min");
    await wait(1000);
    setClockLabel(null);setStatus('');
    setScene((p)=>({...p,sample:finalSample}));
  },[playTimeline]);

  const takeRackTube=useCallback(async(rackSelector:string,workingSelector:string,key:RackTubeKey)=>{
    setScene((p)=>({...p,[key]:true}));
    await wait(90);
    const rackEl=document.querySelector<HTMLElement>(rackSelector);
    const workingEl=document.querySelector<HTMLElement>(workingSelector);
    if(!rackEl||!workingEl)return;
    const rackRect=rackEl.getBoundingClientRect();
    const workingRect=workingEl.getBoundingClientRect();
    gsap.set(workingEl,{
      x:rackRect.left+rackRect.width/2-(workingRect.left+workingRect.width/2),
      y:rackRect.bottom-workingRect.bottom,
      scale:.48,opacity:1,zIndex:125,transformOrigin:'50% 100%',
    });
    await tween(workingSelector,{x:0,y:0,scale:1,duration:.62,ease:'power2.inOut'});
  },[tween]);

  const returnRackTube=useCallback(async(rackSelector:string,workingSelector:string,key:RackTubeKey)=>{
    const rackEl=document.querySelector<HTMLElement>(rackSelector);
    const workingEl=document.querySelector<HTMLElement>(workingSelector);
    if(rackEl&&workingEl){
      const rackRect=rackEl.getBoundingClientRect();
      const workingRect=workingEl.getBoundingClientRect();
      await tween(workingSelector,{
        x:rackRect.left+rackRect.width/2-(workingRect.left+workingRect.width/2),
        y:rackRect.bottom-workingRect.bottom,
        scale:.48,opacity:0,duration:.58,ease:'power2.inOut',
      });
    }
    setScene((p)=>({...p,[key]:false}));
    await wait(60);
  },[tween]);

  const transferRackTube=useCallback(async(
    rackSelector:string,
    workingSelector:string,
    targetSelector:string,
    key:RackTubeKey,
    updateScene:(scene:Scene)=>Scene,
  )=>{
    await takeRackTube(rackSelector,workingSelector,key);
    await pipetteToElement(workingSelector,.5,.14);
    await pipetteToElement(targetSelector,.5,.14);
    setScene((p)=>updateScene({...p,tip:0}));
    await wait(90);
    await returnRackTube(rackSelector,workingSelector,key);
  },[pipetteToElement,returnRackTube,takeRackTube]);

  const takeSceneTwoTube=useCallback(async(rackSelector:string,workingSelector:string)=>{
    const rackEl=document.querySelector<HTMLElement>(rackSelector);
    const workingEl=document.querySelector<HTMLElement>(workingSelector);
    if(!rackEl||!workingEl)return;
    const rackRect=rackEl.getBoundingClientRect();
    const workingRect=workingEl.getBoundingClientRect();
    gsap.set(workingEl,{
      x:rackRect.left+rackRect.width/2-(workingRect.left+workingRect.width/2),
      y:rackRect.bottom-workingRect.bottom,
      scale:.46,opacity:1,zIndex:125,transformOrigin:'50% 100%',
    });
    await tween(workingSelector,{x:0,y:0,scale:1,duration:.62,ease:'power2.inOut'});
  },[tween]);

  const returnSceneTwoTube=useCallback(async(workingSelector:string,rackSelector:string)=>{
    const rackEl=document.querySelector<HTMLElement>(rackSelector);
    const workingEl=document.querySelector<HTMLElement>(workingSelector);
    if(!rackEl||!workingEl)return;
    const rackRect=rackEl.getBoundingClientRect();
    const workingRect=workingEl.getBoundingClientRect();
    await tween(workingSelector,{
      x:rackRect.left+rackRect.width/2-(workingRect.left+workingRect.width/2),
      y:rackRect.bottom-workingRect.bottom,
      scale:.46,opacity:0,duration:.52,ease:'power2.inOut',
    });
  },[tween]);

  const takeCollectionTube=useCallback(async()=>{
    await tween('#collectionTube',{y:-18,scale:1.06,duration:.3,ease:'power2.out'});
    await tween('#collectionTube',{y:0,scale:1,duration:.34,ease:'power2.inOut'});
  },[tween]);

  const assembleColumn=useCallback(async()=>{
    await moveCenterTo('#standaloneColumn','#collectionTube',.88);
    setScene((p)=>({...p,standaloneColumn:'hidden',collectionTube:'hidden',columnAssembly:'empty'}));
    await wait(100);
  },[moveCenterTo]);

  const handleItemClick=useCallback(async(item:string)=>{
    const a=actions[phase];
    if(!a||a.item!==item||animating||detail)return;
    setAnimating(true);

    if(a.kind==='move'&&a.to){
      await tween('#'+item,{left:a.to[0],top:a.to[1],duration:.72,ease:'power2.inOut'});
      if(a.id==='culture')setScene((p)=>({...p,cultureAtWork:true}));
    }else if(a.kind==='tip'&&a.tip){
      await fitTip(a.tip as Exclude<Tip,0>);
    }else if(a.kind==='pipette'&&a.to){
      const dynamicSource=a.id==='aspSample'?'#sampleSource':a.id==='aspDna'?'#mixedTube':a.id==='aspMarker'?'#markerTube':a.id==='aspDye'?'#dye':a.id==='aspEluent'?'#green':null;
      if(dynamicSource)await pipetteToElement(dynamicSource,.5,.08);
      else await pipette(a.to);
      if(a.sample)setScene((p)=>({...p,sample:a.sample!}));
    }else if(a.kind==='dispense'&&a.to){
      await pipette(a.to);
      setScene((p)=>({...p,tip:0,sample:a.sample??p.sample,gel:a.id==='loadDna'?'loaded':p.gel}));
      if(a.id==='elute')await returnRackTube('#greenMini','#green','greenAtWork');
      if(a.status)await say(a.status,700);
    }else if(a.kind==='spinSample'){
      // 所有离心操作都让物品中心与离心机中心严格重合。
      await moveCenterTo('#sample','#centrifuge',.75);
      if(a.id==='spin1'){
        setClockLabel("After 1 minute");setStatus("Centrifuge for 1 min");
        await playTimeline((timeline)=>timeline.to('#sample',{rotation:1080,duration:1.05,ease:'none'}));
        await wait(420);setClockLabel(null);setStatus('');
      }else{
        await say(a.status||"Centrifuge",850);
        await tween('#sample',{rotation:360,repeat:4,duration:.4,ease:'linear'});
      }
      setScene((p)=>({...p,sample:a.sample??p.sample}));
      await tween('#sample',{rotation:0,duration:.1});
      await tween('#sample',{x:0,y:0,scale:1,duration:.62,ease:'power2.out'});
      if(a.id==='spin1'){
        setDetail('spinResult');setAnimating(false);return;
      }
    }else if(a.kind==='spinColumn'){
      // 兼容旧动作类型，同样按中心对中心执行离心。
      const selector='#column';
      await moveCenterTo(selector,'#centrifuge',.66);
      await say(a.status||"Centrifuge",850);
      await tween(selector,{x:0,y:0,scale:1,duration:.6,ease:'power2.out'});
      if(a.sample)setScene((p)=>({...p,sample:a.sample!}));
    }else if(a.kind==='invert'){
      // Step1/3：样品在 (35%,61%) 原位倾斜/颠倒；动作结束仍以该位置作为下一步起点。
      setScene((p)=>({...p,tilted:true}));
      await tween('#sample',{rotation:a.id==='decant'?78:168,x:a.id==='decant'?20:0,repeat:a.id==='decant'?0:3,yoyo:true,duration:a.id==='decant'?.55:.36,ease:'power1.inOut'});
      await wait(250);await tween('#sample',{rotation:0,x:0,duration:.42,ease:'power2.out'});
      setScene((p)=>({...p,tilted:false,sample:a.sample??p.sample}));
      if(a.status)await say(a.status);
    }else if(a.kind==='vortex'){
      // Step2：样品上移到涡旋仪正上方，中心横向对齐后振荡。
      const sampleEl=document.querySelector<HTMLElement>('#sample');
      const vortexEl=document.querySelector<HTMLElement>('#vortex');
      if(sampleEl&&vortexEl){
        const sampleRect=sampleEl.getBoundingClientRect();
        const vortexRect=vortexEl.getBoundingClientRect();
        await tween('#sample',{
          x:vortexRect.left+vortexRect.width/2-(sampleRect.left+sampleRect.width/2),
          y:vortexRect.top-sampleRect.bottom+vortexRect.height*.18+sampleRect.height*.36,
          scale:.72,duration:.62,ease:'power2.inOut',
        });
      }
      await playTimeline((timeline)=>timeline.to('#sample',{x:'+=6',rotation:4,repeat:9,yoyo:true,duration:.07,ease:'none'}));
      setScene((p)=>({...p,sample:'tube3'}));
      await tween('#sample',{x:0,y:0,rotation:0,scale:1,duration:.56,ease:'power2.out'});
      setDetail('vortexResult');setAnimating(false);return;
    }else if(a.kind==='timer'){
      await say(a.status||"Processing",900);
      if(a.id==='solid')setScene((p)=>({...p,casting:'solid'}));
    }else if(a.kind==='detail'){
      if(a.to){await pipette(a.to);setScene((p)=>({...p,tip:0}))}
      if(a.status)await say(a.status,1000);
      if(a.id==='run')setScene((p)=>({...p,gel:'finished'}));
      setDetail(a.detail!);setAnimating(false);return;
    }else{
      switch(a.id){
        // Step2：蓝色试管从左下架取出，一次完成取液、滴液和归位。
        case'transferS1':
          await transferRackTube('#blueMini','#blueWork','#sample','blueAtWork',(p)=>({...p,sample:'tube2'}));break;
        // Step3：红色试管从右上架取出，一次完成取液、滴液和归位。
        case'transferS2':
          await transferRackTube('#s2','#redWork','#sample','redAtWork',(p)=>({...p,sample:'tube3'}));
          await settleFiveMinutes('tube4');break;
        // Step4：黄色试管留在冰盒内，直接取液并滴入主管。
        case'transferS3':
          await pipetteToElement('#s3',.5,.16);
          await pipetteToElement('#sample',.5,.14);
          setScene((p)=>({...p,tip:0,sample:'tube2'}));
          await settleFiveMinutes('tube2');
          setDetail('s3Result');setAnimating(false);return;
        // Step5：新EP管与空纯化柱分两次点击组装，随后开盖并用3号枪头转移主管液体。
        case'takeCollection5':
        case'takeCollection6':
        case'takeCollection7':
          await takeCollectionTube();break;
        case'assembleColumn5':
        case'assembleColumn6':
        case'assembleColumn7':
          await assembleColumn();break;
        case'openColumn5':
          setScene((p)=>({...p,sampleOpen:true,columnAssembly:'open'}));
          await wait(100);
          await tween('#column',{scale:1.05,repeat:1,yoyo:true,duration:.25});break;
        case'transferSampleToColumn':
          await pipetteToElement('#sample',.5,.14);
          await pipetteToElement('#column',.5,.13);
          setScene((p)=>({...p,tip:0,sampleVisible:false,sampleOpen:false,columnAssembly:'loaded'}));
          await wait(100);break;
        case'spinLoadedColumn':
          await spinOnCentrifuge('#column',a.status||"Centrifuge for 30 s");
          setScene((p)=>({...p,columnAssembly:'hidden',standaloneColumn:'liquid',collectionTube:'empty'}));break;
        // Step6：橙色漂洗液从右上架取出，一次完成取液、滴入组合纯化柱和归位。
        case'transferWash':
          await transferRackTube('#washMini','#orangeWork','#column','orangeAtWork',(p)=>p);break;
        case'spinWashColumn':
          await spinOnCentrifuge('#column',a.status||"Spin the column for 30 s");
          setScene((p)=>({...p,columnAssembly:'hidden',standaloneColumn:'empty',collectionTube:'empty'}));break;
        case'spinDryColumn':
          await spinOnCentrifuge('#standaloneColumn',a.status||"Spin the empty column for 2 min");
          setScene((p)=>({...p,columnAssembly:'hidden',standaloneColumn:'empty',collectionTube:'empty'}));break;
        // Step7：取出绿色洗脱液，55℃预热后取液滴入纯化柱。
        case'takeGreen':
          await takeRackTube('#greenMini','#green','greenAtWork');break;
        case'heatGreen':
          await tween('#green',{left:'41.5%',top:'7.5%',scale:.72,duration:.66,ease:'power2.inOut'});
          await say(a.status||"Preheat to 55°C",760);
          await tween('#green',{left:'64.3%',top:'19%',scale:1,duration:.56,ease:'power2.out'});break;
        case'spinElution':
          await spinOnCentrifuge('#column',a.status||"Centrifuge for 2 min");break;
        // 离心后拆出空纯化柱，保留含液体和沉淀的收集EP管，再展示最终沉淀。
        case'detachColumn':
          await tween('#column',{y:-24,scale:1.05,duration:.34,ease:'power2.out'});
          setScene((p)=>({...p,columnAssembly:'hidden',standaloneColumn:'empty',collectionTube:'final'}));
          await wait(260);
          setDetail('dnaResult');setAnimating(false);return;
        // Step8：开瓶后拿起汤匙，依次舀粉、加TAE、微波加热并加入染料。
        case'openPowder':
          setScene((p)=>({...p,powderOpen:true}));await wait(80);
          await tween('#powderBottle',{scale:1.06,repeat:1,yoyo:true,duration:.24});break;
        case'scoopPowder':
          {
            const spoonEl=document.querySelector<HTMLImageElement>('#spoon');
            const powderEl=document.querySelector<HTMLImageElement>('#powderBottle');
            const flaskEl=document.querySelector<HTMLImageElement>('#flask');
            if(spoonEl&&powderEl&&flaskEl){
              await Promise.all([
                spoonEl.decode().catch(()=>undefined),
                powderEl.decode().catch(()=>undefined),
                flaskEl.decode().catch(()=>undefined),
              ]);
              gsap.set(spoonEl,{x:0,y:0,rotation:90});
              const spoonTip=getTransformedImagePoint(spoonEl,.8981,.6077);
              const powderMouth=getContainedImagePoint(powderEl,.6509,.0766);
              const flaskMouth=getContainedImagePoint(flaskEl,.5109,.0813);
              const powderX=powderMouth.x-spoonTip.x;
              const powderY=powderMouth.y-spoonTip.y;
              const flaskX=flaskMouth.x-spoonTip.x;
              const flaskY=flaskMouth.y-spoonTip.y;
              await playTimeline((timeline)=>timeline
                .to(spoonEl,{x:powderX,y:powderY,rotation:90,duration:.62,ease:'power2.inOut'})
                .call(()=>setScene((p)=>({...p,spoon:'loaded'})))
                .to(spoonEl,{x:flaskX,y:flaskY,rotation:90,duration:.58,ease:'power2.inOut'},'+=.16')
                .to(spoonEl,{x:0,y:0,rotation:90,duration:.58,ease:'power2.out'},'+=.2'));
            }
          }
          setScene((p)=>({...p,spoon:'done'}));break;
        case'fillCylinder':
          await pourIntoCounterClockwise('#carboy','#cylinder');
          setScene((p)=>({...p,cylinderFull:true}));await wait(100);
          await restorePour('#carboy');break;
        case'addWater':
          await pourIntoCounterClockwise('#cylinder','#flask');
          setScene((p)=>({...p,cylinderFull:false,flask:'mixed'}));await wait(100);
          await restorePour('#cylinder');break;
        case'microIn':
          setScene((p)=>({...p,microwaveOpen:true}));await wait(80);
          await moveCenterTo('#flask','#microwave',.58);
          await say(a.status||"Microwave Heating",760);break;
        case'coolFlask':
          await say(a.status||"Cool to 60°C",760);
          setScene((p)=>({...p,microwaveOpen:false,flask:'cooled'}));await wait(80);
          await tween('#flask',{x:0,y:0,scale:1,duration:.64,ease:'power2.out'});break;
        case'openDye':
          setScene((p)=>({...p,dyeOpen:true,toolsVisible:true}));await wait(80);
          await tween('#dye',{scale:1.08,repeat:1,yoyo:true,duration:.28});break;
        case'dispenseDye':
          await pipetteToElement('#flask',.5,.18);
          setScene((p)=>({...p,tip:0,flask:'dyed',dyeOpen:false}));break;
        // Step9：48为底座，倒胶后切换50，49放置并在凝固后取下，最终展示48+51。
        case'pourGel':
          await pourInto('#flask','#gelRig');
          setScene((p)=>({...p,casting:'filled'}));await wait(100);
          await restorePour('#flask');break;
        case'coverGel':
          {
            const coverEl=document.querySelector<HTMLElement>('#gelCover');
            const rigEl=document.querySelector<HTMLElement>('#gelRig');
            if(coverEl&&rigEl){
              const coverRect=coverEl.getBoundingClientRect();
              const rigRect=rigEl.getBoundingClientRect();
              const coverScale=1.57;
              const coverCenterX=coverRect.left+coverRect.width/2;
              const coverCenterY=coverRect.top+coverRect.height/2;
              const visibleCenterX=coverRect.left+coverRect.width*.4286;
              const visibleCenterY=coverRect.top+coverRect.height*.4364;
              const scaledVisibleCenterX=coverCenterX+(visibleCenterX-coverCenterX)*coverScale;
              const scaledVisibleCenterY=coverCenterY+(visibleCenterY-coverCenterY)*coverScale;
              const targetX=rigRect.left+rigRect.width*.5;
              const targetY=rigRect.top+rigRect.height*.4;
              await tween('#gelCover',{x:targetX-scaledVisibleCenterX,y:targetY-scaledVisibleCenterY,scale:coverScale,transformOrigin:'50% 50%',duration:.62,ease:'power2.inOut'});
            }
          }
          setScene((p)=>({...p,coverPlaced:true}));break;
        case'uncoverGel':
          await tween('#gelCover',{x:0,y:0,scale:1,duration:.54,ease:'power2.out'});
          setScene((p)=>({...p,coverPlaced:false,coverVisible:false,casting:'solid'}));await wait(100);
          setDetail('gelResult');setAnimating(false);return;
        // Step10：缓冲液入槽，三管混样后用新枪头分别上样质粒样品和Marker。
        case'fillChamber':
          await pourIntoCounterClockwise('#carboy','#chamber');
          setScene((p)=>({...p,chamberFilled:true}));await wait(100);
          await restorePour('#carboy');break;
        case'takeRackTubes':
          await tween('#rack',{scale:1.06,repeat:1,yoyo:true,duration:.28});
          setScene((p)=>({...p,tubeStage:'three'}));await wait(80);
          await Promise.all([
            takeSceneTwoTube('#rackBlueSource','#sampleSource'),
            takeSceneTwoTube('#rackEmptySource','#emptyTube'),
            takeSceneTwoTube('#rackClearSource','#clearTube'),
          ]);break;
        case'mixSample':
          await pipetteToElement('#emptyTube',.5,.08);
          setScene((p)=>({...p,tip:0,tubeStage:'mixed'}));break;
        case'returnTubes':
          await Promise.all([
            returnSceneTwoTube('#sampleSource','#rackBlueSource'),
            returnSceneTwoTube('#clearTube','#rackClearSource'),
          ]);
          setScene((p)=>({...p,tubeStage:'mixedOnly'}));break;
        case'takeMarker':
          await tween('#rack',{scale:1.06,repeat:1,yoyo:true,duration:.28});
          setScene((p)=>({...p,tubeStage:'marker'}));await wait(80);
          await takeSceneTwoTube('#rackPurpleSource','#markerTube');break;
        case'loadDna':
          await pipetteToElement('#chamber',.46,.12);
          await returnSceneTwoTube('#mixedTube','#rackEmptySource');
          setScene((p)=>({...p,tip:0,loadStage:1,tubeStage:'dnaLoaded'}));break;
        case'loadMarker':
          await pipetteToElement('#chamber',.54,.12);
          await returnSceneTwoTube('#markerTube','#rackPurpleSource');
          setScene((p)=>({...p,tip:0,loadStage:2,tubeStage:'loaded'}));
          setDetail('loading90');setAnimating(false);return;
        case'run':
          setScene((p)=>({...p,connected:true}));
          await say(a.status||"Run at 120 V for 25 min",1050);
          await tween('#chamber',{scale:1.05,repeat:1,yoyo:true,duration:.3});break;
        case'observe':
          await moveCenterTo('#uvGelTransfer','#uvImagerTarget',.48);
          await tween('#uvGelTransfer',{opacity:0,duration:.32,ease:'power2.in'});
          setScene((p)=>({...p,gelAtImager:true}));
          await wait(60);
          gsap.set('#uvImagerResult',{opacity:0,scale:.78,filter:'brightness(.85)'});
          await tween('#uvImagerResult',{opacity:1,scale:1,filter:'brightness(1.3) drop-shadow(0 0 10px rgba(196,120,255,.9))',duration:.42,ease:'power2.out'});
          await tween('#uv',{filter:'brightness(1.22) drop-shadow(0 0 8px rgba(168,85,247,.72))',duration:.18,repeat:2,yoyo:true,ease:'sine.inOut'});
          gsap.set('#uv',{clearProps:'filter'});
          await tween('#uv',{scale:1.05,repeat:1,yoyo:true,duration:.3});
          setDetail('electrophoresisResult');setAnimating(false);return;
      }
    }
    finish();setAnimating(false);
  },[animating,assembleColumn,detail,finish,fitTip,moveCenterTo,phase,pipette,pipetteToElement,playTimeline,pourInto,pourIntoCounterClockwise,restorePour,returnRackTube,returnSceneTwoTube,say,settleFiveMinutes,spinOnCentrifuge,takeCollectionTube,takeRackTube,takeSceneTwoTube,transferRackTube,tween]);

  const closeDetail=useCallback(()=>{
    if(detail==='loading90'){setDetail('assembly91');return}
    if(detail==='electrophoresisResult'){setDetail('bandGuide');return}
    if(detail==='spinResult')setScene((p)=>({...p,sample:'tube1'}));
    if(detail==='vortexResult')setScene((p)=>({...p,sample:'tube3'}));
    if(detail==='s3Result')setScene((p)=>({...p,sample:'tube2',sampleOpen:false,standaloneColumn:'empty',collectionTube:'empty',columnAssembly:'hidden'}));
    setDetail(null);finish();
  },[detail,finish]);
    const stepSnapshots = useStepSnapshots(currentStep, animating,
    () => ({ phase, done, animating, status, detail, scene, clockLabel }),
    (state) => {
    setPhase(state.phase);
    setDone(state.done);
    setAnimating(state.animating);
    setStatus(state.status);
    setDetail(state.detail);
    setScene(state.scene);
    setClockLabel(state.clockLabel);
    setHovered(null);
    setSceneRevision((revision) => revision + 1);
  });

const handleStepNavigation=useCallback((stepIndex:number)=>{
    if(stepIndex<0||stepIndex>=steps.length||stepIndex>currentStep||animating)return;
    const targetPhase=firstPhaseForStep(stepIndex);
    if(targetPhase<0)return;

    cancelPendingWaits();
    if (stepSnapshots.restore(stepIndex)) return;
    activeTimeline.current?.kill();
    activeTimeline.current=null;
    const canvas=document.querySelector('#experiment-canvas');
    if(canvas){
      gsap.killTweensOf(canvas.querySelectorAll('*'));
      gsap.set(canvas.querySelectorAll('*'),{clearProps:'filter'});
    }
    gsap.set(['#uv','#uvGelTransfer','#uvImagerResult'],{clearProps:'filter'});
    gsap.set('#uvImagerResult',{opacity:0,scale:.78,filter:'none'});
    gsap.set('#uv',{filter:'none'});

    setPhase(targetPhase);
    setDone(Array.from({length:stepIndex},(_,index)=>index));
    setHovered(null);
    setAnimating(false);
    setStatus('');
    setDetail(null);
    setClockLabel(null);
    setScene({...stepStartScenes[stepIndex]});
    setSceneRevision((revision)=>revision+1);
  },[currentStep, animating, stepSnapshots, cancelPendingWaits]);

  useLayoutEffect(()=>{
    // 仅在侧栏跳转 remount 后清理残留 inline filter，避免吞掉 class 黄光。
    const canvas=document.querySelector('#experiment-canvas');
    if(canvas)gsap.set(canvas.querySelectorAll('*'),{clearProps:'filter'});
    const item=actions[phase]?.item;
    if(!item)return;
    const target=document.getElementById(item);
    if(target)gsap.set(target,{clearProps:'filter'});
  },[sceneRevision]);
  

  const sampleImage=useMemo(()=>{
    if(scene.sampleOpen)return I.sampleOpen;
    if(scene.sample==='dna')return I.purple;
    if(scene.sample==='tube1')return I.tube1;
    if(scene.sample==='tube2')return I.tube2;
    if(scene.sample==='tube3')return I.tube3;
    if(scene.sample==='tube4')return I.tube4;
    if(scene.sample==='tube5')return I.tube5;
    if(scene.sample==='tube6')return I.tube6;
    if(scene.sample==='culture')return I.blue;
    return I.empty;
  },[scene.sample,scene.sampleOpen]);
  const flaskImage=scene.flask==='powder'?I.flaskPowder:scene.flask==='mixed'?I.flaskMixed:scene.flask==='cooled'?I.flaskCooled:scene.flask==='dyed'?I.flaskDyed:I.flask;
  const columnAssemblyImage=scene.columnAssembly==='open'?I.columnAssemblyOpen:scene.columnAssembly==='loaded'?I.columnAssemblyLoaded:I.columnAssembly;
  const detailImage=detail==='spinResult'||detail==='dnaResult'?I.tube1:detail==='vortexResult'?I.tube3:detail==='s3Result'?I.tube2:detail==='loading90'?I.loading90:detail==='assembly91'?I.assembly91:I.shows3;
  const detailTitle=detail==='spinResult'?"Cell Pelleting Result":detail==='vortexResult'?"Cells Fully Resuspended":detail==='s3Result'?"Neutralization Result":detail==='dnaResult'?"DNA Collection Complete":detail==='gelResult'?"Gel Setting Complete":detail==='loading90'?"Confirm Loading Positions":detail==='assembly91'?"Electrophoresis Tank Structure":detail==='electrophoresisResult'?"Electrophoresis Image":"Interpret Plasmid Bands";
  const detailCopy=detail==='spinResult'?"Centrifugation is complete. Discarding the supernatant reveals the cell pellet.":detail==='vortexResult'?"The cells are fully resuspended after adding Solution I and vortexing.":detail==='s3Result'?"After neutralization with Solution III, the clear liquid and precipitate are separated.":detail==='dnaResult'?"The purification column has been removed from the collection tube. The DNA collected in this scene remains in the tube.":detail==='gelResult'?"The cover has been removed; the gel remains on the casting base.":detail==='loading90'?"The plasmid sample and DL2000 ladder have been loaded into adjacent wells.":detail==='assembly91'?"This exploded view illustrates the tank layers and disappears when closed.":detail==='electrophoresisResult'?"Electrophoresis is complete. Compare the plasmid bands with the DL2000 ladder.":'';
  const showPipetteTools=(currentStep===7&&scene.toolsVisible)||currentStep===9;
  const currentToolBox:Exclude<Tip,0>|null=action?.item==='box1'?1:action?.item==='box2'?2:action?.item==='box3'?3:null;

  const renderBox=(n:Exclude<Tip,0>,className:string)=><div id={'box'+n} onClick={()=>handleItemClick('box'+n)} className={'absolute transition-[filter] duration-200 '+className+' '+hl('box'+n)}>
    <img src={scene.openBox===n?I.boxesOpen[n]:I.boxes[n]} className="h-full w-full object-contain object-bottom" alt={n+" Tip Box"}/>
  </div>;
  // 稳定的枪身节点让 GSAP 在状态更新后仍控制同一个 DOM；三类枪头共享相同的居中尺寸槽。
  const renderPipette=(className:string)=><div id="pipette" onClick={()=>handleItemClick('pipette')} className={'absolute z-[100] transition-[filter] duration-200 '+className+' '+hl('pipette')}>
    <img src={scene.tip?I.bodies[scene.tip]:I.pipette} className="w-full object-contain" alt="Pipette"/>
    {scene.tip>0&&<img src={I.tips[scene.tip]} className="absolute left-1/2 top-[92%] h-[16%] w-auto -translate-x-1/2 translate-y-[-50%] object-contain" alt={scene.tip+" Tip"}/>}
  </div>;
  const renderCastingSolid=(alt:string)=><div className="absolute bottom-[21%] left-[27.5%] h-[42%] w-[45%] overflow-hidden pointer-events-none">
    <img
      src={I.castingSolid}
      className="absolute max-w-none"
      style={{width:'134.09%',height:'260.62%',left:'-17.45%',top:'-126.6%'}}
      alt={alt}/>
  </div>;
  return <div className="experiment-shell flex h-screen w-screen flex-col overflow-hidden font-sans text-white">
    <header className="z-50 flex h-12 shrink-0 items-center justify-between lab-topbar px-4">
      <div className="flex items-center gap-3"><ChevronLeft className="cursor-pointer text-blue-200 hover:text-white" onClick={onBack}/><h1 className="text-xs font-bold uppercase tracking-widest text-white">{experiment.title}</h1></div>
      <RestartExperimentButton onRestart={onRestart} />
    </header>
    <div className="flex flex-1 overflow-hidden">
      <aside className="hidden w-64 shrink-0 flex-col overflow-hidden lab-steps-rail p-3 lg:flex">
        {sideData&&!complete&&<div className="mb-3 h-[104px] shrink-0 overflow-hidden lab-hint-card p-3">
          <div className="mb-1 flex items-center gap-2 text-blue-200"><Lightbulb className="h-3 w-3"/><span className="text-[10px] font-black uppercase tracking-widest">{hovered!==null?'STEP '+(hovered+1):currentStep===0?'STEP 1':"Previous · STEP"+currentStep}</span></div>
          <h3 className="mb-1 text-xs font-bold">{sideData.title}</h3>
          <p className="h-[48px] overflow-hidden text-[11px] leading-4 text-blue-200">{sideData.description}</p>
        </div>}
        <div className="flex min-h-0 flex-1 flex-col rounded-lg border border-white/15 bg-slate-950/20 p-2.5">
          <h3 className="mb-2 flex shrink-0 items-center gap-2 text-xs font-semibold">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-blue-400/20 text-[10px] text-blue-100">{Math.min(currentStep+1,steps.length)}</span>
            <span className="text-blue-50">Experiment Steps</span>
          </h3>
          <div className="min-h-0 flex-1 overflow-y-auto pr-1">
            {steps.map((step,index)=>{
              const isCompleted=done.includes(index);
              const isActive=index===currentStep;
              const isPending=index>currentStep;
              return <div key={step.id}>
                {(index===0||index===7)&&<div className={'px-1 pb-1 text-[11px] font-bold text-blue-100 '+(index===7?'pt-2':'pt-0')}>
                  {index===0?"(I) Plasmid Extraction":"(II) Electrophoresis"}
                </div>}
                <div
                  onMouseEnter={()=>setHovered(index)}
                  onMouseLeave={()=>setHovered(null)}
                  onClick={()=>handleStepNavigation(index)}
                  onKeyDown={(event)=>{
                    if(event.key==='Enter'||event.key===' '){
                      event.preventDefault();
                      handleStepNavigation(index);
                    }
                  }}
                  role="button"
                  tabIndex={isPending?-1:0}
                  aria-disabled={isPending||animating}
                  aria-current={isActive?'step':undefined}
                  aria-label={"Go to step"+(index+1)+'：'+step.title}
                  className={'mb-1 flex h-8 cursor-pointer items-center gap-2 rounded-md border px-2 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-blue-200/80 '+(isActive?'border-blue-300/60 bg-blue-500/25 text-white':isCompleted?'border-blue-400/30 bg-blue-500/15 text-blue-50':isPending?'border-white/10 bg-white/5 text-blue-200/55 hover:bg-white/10 hover:text-blue-100':'border-white/15 bg-white/10 text-blue-100')}
                >
                  <span className={'flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] '+(isActive?'bg-blue-500 text-white':isCompleted?'bg-blue-500 text-white':'bg-white/10 text-blue-200/70')}>
                    {isCompleted?<Check className="h-2.5 w-2.5"/>:index+1}
                  </span>
                  <span className="min-w-0 text-[11px] font-medium leading-snug break-words">{step.title}</span>
                </div>
              </div>;
            })}
          </div>
          <div className="mt-2 shrink-0 border-t border-white/15 pt-2">
            <div className="mb-1 flex items-center justify-between text-[10px] text-blue-200/80">
              <span>Overall Progress</span><span>{Math.round((done.length/steps.length)*100)}%</span>
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-white/10"><div className="h-full bg-blue-400 transition-[width] duration-500" style={{width:(done.length/steps.length*100)+'%'}}/></div>
          </div>
        </div>
      </aside>
      <main className="relative flex min-w-0 flex-1 flex-col items-center justify-center gap-2 overflow-hidden lab-bench p-3">
        <div ref={canvasFrameRef} className="flex h-[72%] w-full shrink-0 items-center justify-center overflow-hidden">
        <div
          key={sceneRevision}
          id="experiment-canvas"
          className="relative flex-none overflow-hidden bg-[#4f83d1] shadow-2xl"
          style={canvasStyle}
        >
          {extraction
            ? <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{backgroundImage:"url('"+I.room+"')"}}/>
            : <div className="absolute inset-0 overflow-hidden bg-[#4774c1]">
                <div className="absolute inset-x-0 bottom-[28%] top-[35%] border-t border-slate-500 bg-[#d9dee7]"/>
                <div className="absolute inset-x-0 bottom-0 top-[71%] border-t border-slate-500 bg-[#eeeeee] [clip-path:polygon(4%_0,96%_0,100%_100%,0_100%)]"/>
              </div>}
          {extraction?<>
            {/* 初始页 / PPT P5 后景：坐标均为画布百分比，格式为 left / top / width。 */}
            <div className="absolute inset-0 z-10 pointer-events-none">
              {/* 紫外成像系统：PPT P5 (1.0, 10.5, 14.7)。 */}
              <img id="uv" src={I.uv} onClick={()=>handleItemClick('uv')} className={'absolute left-[1%] top-[10.5%] w-[14.7%] '+hl('uv')} alt="UV Imaging System"/>
              {/* 试剂桶：PPT P5 (14.8, 27.2, 6.7)。 */}
              <img src={I.carboy} className="absolute left-[14.8%] top-[27.2%] w-[6.7%]" alt="Reagent Container"/>
              {/* 蓝色实验台：PPT P5 (16.7, 13.4, 38.9)；微波炉、恒温设备以台面为参考整体下移，底边贴合台面。 */}
              <img src={I.table1} className="absolute left-[16.7%] top-[13.4%] w-[38.9%]" alt="Blue Laboratory Bench"/>
              {/* 紫色实验台：PPT P5 (51.5, 11.8, 47.3)。 */}
              <img src={I.table2} className="absolute left-[51.5%] top-[11.8%] w-[47.3%]" alt="Laboratory Bench"/>
              {/* 初始页 / PPT P5 左桌：微波炉 (24.7, 12.0, 10.0)，恒温设备 (34.5, 6.5, 15.9)，底边与蓝色台面齐平。 */}
              <img src={I.microwave} className="absolute left-[24.7%] top-[12%] w-[10%]" alt="Microwave"/>
              <img id="ultrasonic" src={I.ultrasonic} onClick={()=>handleItemClick('ultrasonic')} className={'absolute left-[34.5%] top-[6.5%] w-[15.9%] '+hl('ultrasonic')} alt="55°C Heating Device"/>
              {/* 初始页 / PPT P5 右桌：托架不动，其余器材统一下移 3.5%；五支小管下移到 26.7% 插入托架。 */}
              <img src={I.pageRack} className="absolute left-[58.1%] top-[22.8%] w-[7.5%]" alt="Blue Tube Rack"/>
              <img id="ice" src={I.ice} onClick={()=>handleItemClick('ice')} className={'absolute left-[66.1%] top-[24.3%] w-[6.2%] '+hl('ice')} alt="Ice Box"/>
              <img src={I.beaker} className="absolute left-[73.1%] top-[25.7%] w-[2.3%]" alt="Beaker"/>
              <img id="vortex" src={I.vortex} onClick={()=>handleItemClick('vortex')} className={'absolute left-[75.6%] top-[23.5%] w-[3.2%] '+hl('vortex')} alt="Vortex Mixer"/>
              <img id="centrifuge" src={I.centrifuge} onClick={()=>handleItemClick('centrifuge')} className={'absolute left-[78.9%] top-[13.5%] w-[8.2%] '+hl('centrifuge')} alt="High-speed Centrifuge"/>
              <img id="power" src={I.power} onClick={()=>handleItemClick('power')} className={'absolute left-[87.5%] top-[23.7%] w-[8.7%] '+hl('power')} alt="Electrophoresis Power Supply"/>
              {/* 右上角标志：PPT P5，校徽 (82.3, 1.2, 6.4)，iGEM (90.1, 1.5, 8.2)。 */}
              <img src={I.schoolLogo} className="absolute left-[82.5%] top-[1.2%] w-[6%]" alt="University Emblem"/>
              <img src={I.igemLogo} className="absolute left-[90.7%] top-[1.5%] w-[6.8%]" alt="iGEM Logo"/>
              {/* 右上试管架：橙、红管各右移一个管宽，绿管上移半个可见管身。 */}
              <img id="washMini" src={I.rackOrange} onClick={()=>handleItemClick('washMini')} className={'absolute left-[59.6%] top-[24.2%] h-[5.2%] w-[1.1%] object-contain object-bottom '+(scene.orangeAtWork?'opacity-0 ':'')+hl('washMini')} alt="Orange Wash Buffer Tube"/>
              <img id="s2" src={I.s2} onClick={()=>handleItemClick('s2')} className={'absolute left-[61%] top-[26.7%] w-[1.1%] '+(scene.redAtWork?'opacity-0 ':'')+hl('s2')} alt="Solution II"/>
              <img id="greenMini" src={I.rackGreen} onClick={()=>handleItemClick('greenMini')} className={'absolute left-[62.45%] top-[22.5%] h-[5.2%] w-[1.1%] object-contain object-bottom '+(scene.greenAtWork?'opacity-0 ':'')+hl('greenMini')} alt="Green Elution Buffer Tube"/>
              <img id="s3" src={I.s3} onClick={()=>handleItemClick('s3')} className={'absolute left-[67.7%] top-[18.9%] h-[10.5%] w-[3.1%] object-contain '+hl('s3')} alt="Solution III"/>
              {scene.greenAtWork&&<img id="green" src={I.greenEluent} onClick={()=>handleItemClick('green')} className={'absolute left-[64.3%] top-[19%] h-[11%] w-[3.2%] object-contain opacity-0 '+hl('green')} alt="Green Elution Buffer"/>}
            </div>
            {clockLabel&&<div className={'absolute top-[4.3%] z-[95] flex w-[8%] flex-col items-center pointer-events-none animate-bounce '+(clockLabel==="After 1 minute"?'left-[79%]':'left-[66%]')}>
              <img src="https://static.igem.wiki/teams/6056/wiki/virtual-lab/experiment1/hours.avif" className="w-full drop-shadow-[0_0_12px_rgba(255,220,80,0.85)]" alt="Experiment Timer"/>
              <span className="-mt-1 rounded-full bg-black/70 px-2 py-0.5 text-[10px] font-bold text-yellow-200 whitespace-nowrap">{clockLabel}</span>
            </div>}
            <div className="absolute inset-x-0 bottom-0 z-20 h-[60%] bg-bottom bg-no-repeat pointer-events-none" style={{backgroundImage:"url('"+I.bench+"')",backgroundSize:'100% 100%'}}/>
            {/* 初始页 / PPT P5 前景：移液枪、吸头盒、蓝色架、空管和黄色试管架。 */}
            <div className="absolute inset-0 z-30 pointer-events-none">
              {/* 移液枪初始位置：右移1/4身位，z-index最高 */}
              {renderPipette('left-[7.4%] top-[52.5%] w-[7.3%]')}
              {renderBox(1,'left-[10.7%] top-[66.8%] h-[9.4%] w-[6.1%]')}{renderBox(2,'left-[17.1%] top-[66.8%] h-[9.4%] w-[6.1%]')}{renderBox(3,'left-[23.5%] top-[66.8%] h-[9.4%] w-[6.1%]')}
              {/* 左下试管架及架内蓝色小管；蓝管下移约五个可见管身，取出时仅隐藏架内贴图。 */}
              <img src={I.labRack} className="absolute left-[12.5%] top-[78.3%] w-[16.9%]" alt="Blue Tube Rack"/>
              <img id="blueMini" src={I.rackBlueMini} onClick={()=>handleItemClick('blueMini')} className={'absolute left-[20.1%] top-[85.1%] h-[5.2%] w-[1.35%] object-contain object-bottom '+(scene.blueAtWork?'opacity-0 ':'')+hl('blueMini')} alt="Blue Tube in Rack"/>
              {/* 空 EP 管 (30.3, 72.1, 2.7)；前3步大小不变，第4步起放大到2倍 */}
              {scene.sampleVisible&&<div id="sample" onClick={()=>handleItemClick('sample')} className={'absolute left-[30.3%] top-[67%] h-[15%] w-[7%] '+hl('sample')}>
                <img src={sampleImage} className="h-full w-full object-contain object-bottom" alt="Sample Microcentrifuge Tube"/>
              </div>}
              {/* 蓝色取出态为原尺寸的 2/3，并保持原工作位置的底部中心锚点。 */}
              {scene.blueAtWork&&<img id="blueWork" src={I.blueWork} className="absolute left-[39.367%] top-[72%] h-[10%] w-[4.667%] object-contain object-bottom opacity-0" alt="Blue Sample Tube"/>}
              {scene.redAtWork&&<img id="redWork" src={I.redWork} className="absolute left-[38.2%] top-[67%] h-[15%] w-[7%] object-contain object-bottom opacity-0" alt="Red Sample Tube"/>}
              {scene.orangeAtWork&&<img id="orangeWork" src={I.orangeWash} className="absolute left-[46.2%] top-[67%] h-[15%] w-[7%] object-contain object-bottom opacity-0" alt="Orange Wash Buffer Sample Tube"/>}
              {/* 黄色菌液架保持在右侧；冰盒内的 Solution III 单独使用 10.png。 */}
              <img src={I.rackYellow} className="absolute left-[65.5%] top-[74.1%] w-[13.1%]" alt="Tube Rack"/>
              {scene.standaloneColumn!=='hidden'&&<div id="standaloneColumn" onClick={()=>handleItemClick('standaloneColumn')} className={'absolute left-[38.2%] top-[65%] h-[17%] w-[6.5%] '+hl('standaloneColumn')}>
                <img src={scene.standaloneColumn==='liquid'?I.standaloneColumnLiquid:I.standaloneColumnEmpty} className="h-full w-full object-contain object-bottom" alt={scene.standaloneColumn==='liquid'?"Purification Column with Liquid":"Empty Purification Column"}/>
              </div>}
              {scene.collectionTube!=='hidden'&&<div id="collectionTube" onClick={()=>handleItemClick('collectionTube')} className={'absolute left-[46.2%] top-[67%] h-[15%] w-[7%] '+hl('collectionTube')}>
                <img src={scene.collectionTube==='final'?I.finalCollectionTube:I.empty} className="h-full w-full object-contain object-bottom" alt={scene.collectionTube==='final'?"DNA Collection Tube":"New Microcentrifuge Tube"}/>
              </div>}
              {scene.columnAssembly!=='hidden'&&<div id="column" onClick={()=>handleItemClick('column')} className={'absolute left-[54.2%] top-[64%] h-[18%] w-[7%] '+hl('column')}>
                <img src={columnAssemblyImage} className="h-full w-full object-contain object-bottom" alt={scene.columnAssembly==='open'?"Open Column Assembly":"Column and Collection Tube Assembly"}/>
              </div>}
            </div>
          </>:<>
            {/* 第二场景以画布百分比锚定，设备按参考图重新分层摆放。 */}
            <div className="absolute inset-0 z-10 pointer-events-none">
              <img id="uv" src={I.uv} onClick={()=>handleItemClick('uv')} className={'absolute left-[6.5%] top-[14%] w-[14.5%] '+hl('uv')} alt="UV Imaging System"/>
              <div id="uvImagerTarget" className="pointer-events-none absolute left-[9.2%] top-[31%] z-[45] h-[10.5%] w-[8%] overflow-hidden rounded-[2px]">
                <div
                  id="uvImagerResult"
                  className={'absolute inset-[8%] border border-violet-200/80 bg-violet-500/75 opacity-0 shadow-[inset_0_0_12px_rgba(40,8,70,.75)] '+(scene.gelAtImager?'':'invisible')}
                >
                  <span className="absolute left-[16%] top-[23%] h-[4%] w-[68%] bg-violet-100/90"/>
                  <span className="absolute left-[28%] top-[48%] h-[6%] w-[46%] bg-fuchsia-100/90"/>
                  <span className="absolute left-[20%] top-[72%] h-[4%] w-[60%] bg-violet-200/90"/>
                </div>
              </div>
              <img src={I.table1} className="absolute left-[31%] top-[18%] w-[38%]" alt="Blue Laboratory Bench"/>
              <div id="microwave" onClick={()=>handleItemClick('microwave')} className={'absolute left-[36.6%] top-[16.8%] w-[10%] overflow-visible '+hl('microwave')} style={{aspectRatio:'1065 / 985'}}>
                <img
                  src={scene.microwaveOpen?I.microwaveOpen:I.microwave}
                  className="absolute w-full max-w-none pointer-events-none"
                  style={scene.microwaveOpen?{left:'-0.11%',top:'6.71%'}:{left:'-2.86%',top:'-2.13%'}}
                  alt="Microwave"
                />
              </div>
              <img src={I.ultrasonic} className="absolute left-[50%] top-[15.8%] w-[11.5%]" alt="Temperature-controlled Device"/>
              <img src={I.cleanBench} className="absolute left-[76.5%] top-[7.5%] w-[16%]" alt="Laminar Flow Cabinet"/>
              <img src={I.schoolLogo} className="absolute left-[83.5%] top-[0.5%] w-[6%]" alt="University Emblem"/>
              <img src={I.igemLogo} className="absolute left-[91%] top-[1%] w-[7%]" alt="iGEM Logo"/>
            </div>
            <div className="absolute inset-0 z-30 pointer-events-none">
              <img id="carboy" src={I.carboy} onClick={()=>handleItemClick('carboy')} className={'absolute left-[23.4%] top-[34%] w-[6.2%] '+hl('carboy')} alt="Reagent Bottle"/>
              <img id="dye" src={scene.dyeOpen?I.dyeOpen:I.amber} onClick={()=>handleItemClick('dye')} className={'absolute left-[28.3%] top-[66%] h-[11%] w-[3.8%] object-contain object-bottom '+hl('dye')} alt="Nucleic Acid Stain Bottle"/>
              <img id="powderBottle" src={scene.powderOpen?I.powderOpen:I.filledBottle} onClick={()=>handleItemClick('powderBottle')} className={'absolute left-[34.3%] top-[62.5%] h-[15%] w-[4.8%] object-contain object-bottom '+hl('powderBottle')} alt="Agarose Powder Bottle"/>
              <img id="flask" src={flaskImage} onClick={()=>handleItemClick('flask')} className={'absolute left-[43.3%] top-[64.5%] h-[13%] w-[4.8%] object-contain object-bottom '+hl('flask')} alt="Erlenmeyer Flask"/>
              <div id="cylinder" className="absolute left-[50.3%] top-[66%] h-[12%] w-[4.8%]">
                <img src={I.beaker30} className="absolute inset-0 h-full w-full object-contain object-bottom" alt="Graduated Cylinder"/>
              </div>
              <img src={I.tray} className="absolute left-[28.8%] top-[78%] h-[14%] w-[7.5%] object-contain" alt="Metal Tray"/>
              <img id="spoon" src={I.spoon} onClick={()=>handleItemClick('spoon')} className={'absolute left-[30.1%] top-[82%] w-[5%] rotate-90 object-contain '+hl('spoon')} alt="Spoon"/>

              <div id="rack" onClick={()=>handleItemClick('rack')} className={'absolute left-[6.4%] top-[79.5%] h-[13%] w-[14.7%] '+hl('rack')}>
                <div id="rackClearSource" className="absolute bottom-[66.72%] left-[11.69%] z-20 h-[46.7%] w-[7.3%]">
                  {scene.tubeStage!=='three'&&scene.tubeStage!=='mixed'&&<img src={I.rackClear} className="h-full w-full object-contain object-bottom" alt="Water Tube in Rack"/>}
                </div>
                <div id="rackEmptySource" className="absolute bottom-[66.35%] left-[20.02%] z-20 h-[46.7%] w-[7.3%]">
                  {(scene.tubeStage==='rack'||scene.tubeStage==='dnaLoaded'||scene.tubeStage==='loaded')&&<img src={I.rackEmpty} className="h-full w-full object-contain object-bottom" alt="Empty Tube in Rack"/>}
                </div>
                <div id="rackBlueSource" className="absolute bottom-[72.08%] left-[36.23%] z-20 h-[48%] w-[7.3%]">
                  {scene.tubeStage!=='three'&&scene.tubeStage!=='mixed'&&<img src={I.rackBlueSample} className="h-full w-full object-contain object-bottom" alt="Blue Sample Tube in Rack"/>}
                </div>
                {[
                  {left:44.16,bottom:71.98},
                  {left:53.32,bottom:76.29},
                  {left:62.57,bottom:86},
                  {left:69.74,bottom:85.62},
                ].map(({left,bottom})=><img key={left} src={I.rackBlueSample} className="absolute z-20 h-[44.7%] w-[6.6%] object-contain object-bottom" style={{left:left+'%',bottom:bottom+'%'}} alt="Small Blue Tube in Rack"/>)}
                <div id="rackPurpleSource" className="absolute bottom-[65.78%] left-[28.48%] z-20 h-[44%] w-[6.7%]">
                  {scene.tubeStage!=='marker'&&scene.tubeStage!=='dnaLoaded'&&<img src={I.rackPurple} className="h-full w-full object-contain object-bottom" alt="Purple Tube in Rack"/>}
                </div>
                <img src={I.labRack} className="absolute inset-x-0 bottom-0 z-10 w-full object-contain" alt="Blue Tube Rack"/>
              </div>

              {currentStep===9&&<>
                {(scene.tubeStage==='three'||scene.tubeStage==='mixed')&&<img id="sampleSource" src={I.sampleTube} onClick={()=>handleItemClick('sampleSource')} className={'absolute left-[19%] top-[69.5%] h-[11%] w-[2.2%] object-contain opacity-0 '+hl('sampleSource')} alt="Plasmid DNA Source Tube"/>}
                {scene.tubeStage==='three'&&<img id="emptyTube" src={I.empty} onClick={()=>handleItemClick('emptyTube')} className={'absolute left-[21.8%] top-[69.5%] h-[11%] w-[2.2%] object-contain opacity-0 '+hl('emptyTube')} alt="Empty Tube"/>}
                {(scene.tubeStage==='mixed'||scene.tubeStage==='mixedOnly'||scene.tubeStage==='marker')&&<img id="mixedTube" src={I.mixedTube} onClick={()=>handleItemClick('mixedTube')} className={'absolute left-[21.8%] top-[69.5%] h-[11%] w-[2.2%] object-contain '+hl('mixedTube')} alt="Mixed Sample Tube"/>}
                {(scene.tubeStage==='three'||scene.tubeStage==='mixed')&&<img id="clearTube" src={I.clearWater} className="absolute left-[24.6%] top-[69.5%] h-[11%] w-[2.2%] object-contain opacity-0" alt="Tube with Water and Precipitate"/>}
                {(scene.tubeStage==='marker'||scene.tubeStage==='dnaLoaded')&&<img id="markerTube" src={I.markerTube} onClick={()=>handleItemClick('markerTube')} className={'absolute left-[25.2%] top-[68.5%] h-[12%] w-[2.4%] object-contain opacity-0 '+hl('markerTube')} alt="DL2000 Ladder Tube"/>}
              </>}

              {currentStep===7&&<img src={I.electrophoresis} className="absolute left-[70%] top-[67%] w-[25%] object-contain" style={{zIndex:110}} alt="Complete Electrophoresis Assembly"/>}
              {currentStep===10&&<div id="chamber" onClick={()=>handleItemClick(action?.item==='power'?'power':'chamber')} className={'absolute left-[70%] top-[67%] w-[25%] object-contain '+(action?.item==='power'?hl('power'):hl('chamber'))} style={{zIndex:110}}>
                <img src={I.electrophoresis} className="w-full object-contain" alt="Electrophoresis Equipment"/>
              </div>}
              {currentStep===11&&<img src={I.electrophoresis} className="pointer-events-none absolute left-[70%] top-[67%] z-[110] w-[25%] object-contain" alt="Electrophoresis Equipment"/>}
              {currentStep===11&&!scene.gelAtImager&&<img id="uvGelTransfer" src={I.shows3} onClick={()=>handleItemClick('uvGelTransfer')} className={'absolute left-[58.3%] top-[68%] z-[130] h-[18%] w-[12%] object-contain '+hl('uvGelTransfer')} alt="Gel Backing with Dye at Two-thirds"/>}
              {(currentStep===8||currentStep===9)&&<img src={I.power} className="absolute left-[86.2%] top-[71%] w-[8.7%] object-contain" style={{zIndex:115}} alt="Electrophoresis Power Supply"/>}

              {showPipetteTools&&renderPipette(currentStep===7?'left-[54.8%] top-[71%] w-[5.2%]':'left-[72.5%] top-[71%] w-[5.2%]')}
              {showPipetteTools&&currentToolBox&&renderBox(currentToolBox,currentStep===7?'left-[60.8%] top-[75.25%] h-[8.5%] w-[5.5%]':'left-[78.5%] top-[75.25%] h-[8.5%] w-[5.5%]')}

              {currentStep===8&&<>
                <div id="gelRig" onClick={()=>handleItemClick('gelRig')} className={'absolute left-[58.3%] top-[68%] h-[18%] w-[12%] '+hl('gelRig')}>
                  <img src={scene.casting==='filled'||scene.coverPlaced?I.castingFilled:I.castingBase} className="absolute inset-0 h-full w-full object-contain object-bottom" alt="Gel Casting Base"/>
                  {scene.casting==='solid'&&!scene.coverPlaced&&renderCastingSolid("Solidified Agarose Gel")}
                </div>
                {scene.coverVisible&&<img id="gelCover" src={I.castingCover} onClick={()=>handleItemClick('gelCover')} className={'absolute left-[70.2%] top-[70%] w-[7%] object-contain '+hl('gelCover')} alt="Gel Casting Cover"/>}
              </>}
              {currentStep===9&&<div id="chamber" onClick={()=>handleItemClick('chamber')} className={'absolute left-[58.3%] top-[68%] h-[18%] w-[12%] '+hl('chamber')}>
                <img src={I.castingBase} className="absolute inset-0 h-full w-full object-contain object-bottom" alt="Rear of Electrophoresis Tank"/>
                {renderCastingSolid("Gel in Tank")}
              </div>}
            </div>
          </>}
          {status&&<div className="absolute left-1/2 top-[5%] z-[120] -translate-x-1/2 text-lg font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,.9)]">{status}</div>}
          {detail&&<div className="absolute inset-0 z-[200] flex items-center justify-center pointer-events-auto">
            <button aria-label="Close enlarged image" className="absolute inset-0 cursor-pointer lab-scrim" onClick={closeDetail}/>
            {detail==='bandGuide'?<div className="relative z-10 max-h-[88%] w-[min(680px,86%)] overflow-auto lab-chalk-sheet px-8 py-6">
              <h3 className="mb-4 text-center text-lg font-black text-blue-200">Interpret Plasmid Bands</h3>
              <div className="relative mx-auto max-w-[560px] border-l-2 border-dashed border-blue-300/70 pl-7 text-sm leading-6 text-blue-50">
                <div className="mb-4 font-bold">[TOP] ← Loading wells (negative electrode)</div>
                <div className="mb-8 rounded-md border border-cyan-300/40 bg-cyan-400/10 px-4 py-3">
                  <span className="font-bold text-cyan-200">[PLASMID BAND]</span>
                  <span> ← 5369 bp, larger than the 2000 bp DL2000 band</span>
                </div>
                <div className="mb-7 text-blue-200/60">(Blank area)</div>
                <div className="mb-5 border-l-4 border-emerald-400 pl-4">
                  <div className="mb-2 font-bold text-emerald-200">[DL2000 LADDER BANDS]</div>
                  <div className="font-black text-white">2000 bp ← Brightest</div>
                  <div>1000 bp</div><div>750 bp</div><div>500 bp</div><div>250 bp</div><div>100 bp ← Lowest</div>
                </div>
                <div className="text-lg text-blue-200">↓</div>
                <div className="font-bold">[BOTTOM] ← Positive electrode (dye front)</div>
              </div>
            </div>:<div className="relative z-10 flex max-h-[88%] max-w-[86%] items-center gap-7 lab-chalk-sheet p-6">
              {detail==='gelResult'?<div className="relative w-[330px] shrink-0" style={{aspectRatio:'1.185'}}>
                <img src={I.castingBase} className="absolute inset-0 h-full w-full object-contain object-bottom" alt="Gel Casting Base"/>
                {renderCastingSolid("Solidified Agarose Gel")}
              </div>:<img src={detailImage} className={'max-h-[56vh] object-contain '+(detail==='loading90'||detail==='spinResult'||detail==='vortexResult'?'w-[440px]':detail==='assembly91'?'w-[300px]':'w-[360px]')} alt={detailTitle}/>}
              <div className="max-w-[280px] border-l-4 border-blue-500 pl-4 text-sm leading-relaxed text-slate-200">
                <h3 className="mb-3 text-lg font-black text-blue-300">{detailTitle}</h3>
                <p>{detailCopy}</p>
                <p className="mt-4 text-[10px] text-blue-300/70">Click the dark background to continue</p>
              </div>
            </div>}
          </div>}          {complete && <ExperimentCompletion onRestart={onRestart} onBack={onBack} />}
        </div>
        </div>
        {(stepData||complete)&&<div className="w-full min-h-[112px] flex-1 px-1 pt-1 text-left">
          <div className="lab-step-caption mb-2 flex items-center gap-2 text-sm font-bold"><span className="text-blue-400">Step {Math.min(currentStep+1,experiment.steps.length)}/{experiment.steps.length}</span><span className="text-blue-500">|</span><span className="text-blue-400">{(stepData??experiment.steps[experiment.steps.length-1]).title}</span></div>
          <div className="flex h-[calc(100%-30px)] items-center justify-center lab-note-card px-4 py-3 text-center text-xs leading-relaxed">{(stepData??experiment.steps[experiment.steps.length-1]).description}</div>
        </div>}
      </main>
      <aside className="hidden w-80 shrink-0 flex-col overflow-y-auto lab-info-rail p-3 xl:flex"><Experiment3InfoPanel/></aside>
    </div>
    <div className="fixed inset-0 z-[2000] hidden flex-col items-center justify-center lab-rotate-overlay px-8 text-center portrait:flex lg:hidden"><div className="mb-4 text-4xl">📱</div><h2 className="text-xl font-bold">Rotate Your Device to Landscape</h2></div>
  </div>;
}
