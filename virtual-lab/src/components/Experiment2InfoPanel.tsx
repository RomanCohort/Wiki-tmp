import { ExperimentInfoSidebar } from './ExperimentInfoSidebar';
import { experiment2SidebarData } from '../data/experiment2Sidebar';

/** 实验二只负责提供配置；布局、答题和拖拽逻辑由通用侧边栏统一维护。 */
export function Experiment2InfoPanel() {
  return <ExperimentInfoSidebar data={experiment2SidebarData} />;
}
