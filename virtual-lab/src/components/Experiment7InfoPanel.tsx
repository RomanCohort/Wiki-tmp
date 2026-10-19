import { ExperimentInfoSidebar } from './ExperimentInfoSidebar';
import { experiment7SidebarData } from '../data/experiment7Sidebar';

/** 实验7只提供内容配置，公共侧边栏负责答题、拖拽匹配和试剂展示。 */
export function Experiment7InfoPanel() {
  return <ExperimentInfoSidebar data={experiment7SidebarData} />;
}
