import { ExperimentInfoSidebar } from './ExperimentInfoSidebar';
import { experiment9SidebarData } from '../data/experiment9Sidebar';

/** 实验九复用统一的安全、原理问答、仪器匹配和试剂查阅侧边栏。 */
export function Experiment9InfoPanel() {
  return <ExperimentInfoSidebar data={experiment9SidebarData} />;
}
