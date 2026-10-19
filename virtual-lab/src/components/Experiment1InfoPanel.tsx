import { ExperimentInfoSidebar } from './ExperimentInfoSidebar';
import { experiment1SidebarData } from '../data/experiment1Sidebar';

/** 实验一复用统一的安全、原理问答、仪器匹配和试剂查阅侧边栏。 */
export function Experiment1InfoPanel() {
  return <ExperimentInfoSidebar data={experiment1SidebarData} />;
}
