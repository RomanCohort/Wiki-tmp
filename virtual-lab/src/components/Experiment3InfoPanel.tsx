import { ExperimentInfoSidebar } from './ExperimentInfoSidebar';
import { experiment3SidebarData } from '../data/experiment3Sidebar';

/** 实验三复用统一的安全、原理问答、仪器匹配和试剂查阅侧边栏。 */
export function Experiment3InfoPanel() {
  return <ExperimentInfoSidebar data={experiment3SidebarData} />;
}
