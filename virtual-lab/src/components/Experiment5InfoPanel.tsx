import { ExperimentInfoSidebar } from './ExperimentInfoSidebar';
import { experiment5SidebarData } from '../data/experiment5Sidebar';

/** 实验五复用统一的安全、原理问答、仪器匹配和试剂查阅侧边栏。 */
export function Experiment5InfoPanel() {
  return <ExperimentInfoSidebar data={experiment5SidebarData} />;
}
