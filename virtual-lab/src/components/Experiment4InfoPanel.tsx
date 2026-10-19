import { ExperimentInfoSidebar } from './ExperimentInfoSidebar';
import { experiment4SidebarData } from '../data/experiment4Sidebar';

/** 实验四复用实验二的通用安全、原理问答、仪器匹配和试剂查阅侧边栏。 */
export function Experiment4InfoPanel() {
  return <ExperimentInfoSidebar data={experiment4SidebarData} />;
}
