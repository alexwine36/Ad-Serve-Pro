interface Navigator {
  deviceMemory?: number;
  cpuClass?: string;
  connection?: NetworkInformation;
  mozConnection?: NetworkInformation;
  webkitConnection?: NetworkInformation;
}
interface NetworkInformation {
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
  downlinkMax?: number;
  saveData?: boolean;
  type?: string;
}

interface HTMLElement {
  addBehavior?: unknown;
}

interface Window {
  Analytics: unknown;
  openDatabase?: unknown;
  webkitAudioContext?: unknown;
}
