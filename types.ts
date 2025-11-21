export interface Metric {
  name: string;
  value: string | number;
  unit: string;
  status: 'good' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
}

export interface SimulationEvent {
  timestamp: string;
  message: string;
  type: 'info' | 'alert' | 'success';
}

export interface SimulationResponse {
  systemStatus: 'Optimal' | 'Degraded' | 'Critical' | 'Maintenance';
  efficiencyScore: number;
  metrics: Metric[];
  recentEvents: SimulationEvent[];
  aiAnalysis: string;
  recommendedAction: string;
}

export interface Zone {
  id: string;
  title: string;
  description: string;
  iconName: string; // Using string to map to Lucide icons dynamically or manually
  position: { top: string; left: string }; // CSS positioning for the map
  category: 'Operations' | 'Supply Chain' | 'Quality' | 'Workforce' | 'Maintenance';
}

export interface TourStep {
  stopNumber: number;
  zoneId: string;
  title: string; // The "Stop Name" (e.g. The Production Floor)
  focus: string;
  useCase: string;
  impact: string;
}

export interface FactoryArea {
  id: string;
  title: string;
  position: { top: string; left: string };
  zoneIds: string[];
}