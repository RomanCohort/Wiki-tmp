// 实验步骤
export interface ExperimentStep {
  id: number;
  title: string;
  description: string;
  highlightItems: string[];
  animationType: 'move' | 'heat' | 'cool' | 'streak' | 'place' | 'wait';
  completed: boolean;
}

// 实验器材
export interface LabItem {
  id: string;
  name: string;
  nameEn: string;
  image: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  description: string;
}

// 实验数据
export interface Experiment {
  id: string;
  title: string;
  titleEn: string;
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  steps: ExperimentStep[];
  items: LabItem[];
  materials?: string[];
  reagents?: string[];
  equipment?: string[];
  results?: string;
  safety?: string[];
}

// 实验状态
export interface ExperimentState {
  currentStep: number;
  completedSteps: number[];
  isAnimating: boolean;
  currentView: 'hood' | 'bench';
}

// 信息面板标签
export type InfoTab = 'principle' | 'instruments' | 'reagents';
