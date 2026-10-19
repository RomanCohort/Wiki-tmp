import { ExperimentInfoSidebar } from './ExperimentInfoSidebar';
import { experiment6SidebarData } from '../data/experiment6Sidebar';

/** 实验六复用统一的安全、原理问答、仪器匹配和试剂查阅侧边栏。 */
export function Experiment6InfoPanel() {
  return <ExperimentInfoSidebar data={experiment6SidebarData} />;
}
