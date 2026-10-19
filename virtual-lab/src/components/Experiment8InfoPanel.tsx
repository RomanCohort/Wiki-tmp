import { ExperimentInfoSidebar } from './ExperimentInfoSidebar';
import { experiment8SidebarData } from '../data/experiment8Sidebar';

/** 实验八复用统一的安全、原理问答、仪器匹配和试剂查阅侧边栏。 */
export function Experiment8InfoPanel() {
  return <ExperimentInfoSidebar data={experiment8SidebarData} />;
}
