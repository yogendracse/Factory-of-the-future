import { Zone, TourStep, FactoryArea } from './types';

export const FACTORY_ZONES: Zone[] = [
  // --- Left Side: Processing & Maintenance ---
  {
    id: 'process-optimization',
    title: 'Process Optimization',
    description: 'AI-driven batch optimization (Golden Batch) to maximize yield and minimize waste.',
    iconName: 'Cpu',
    position: { top: '25%', left: '20%' }, // Top Left (Tanks area)
    category: 'Operations'
  },
  {
    id: 'condition-monitoring',
    title: 'Predictive Maintenance',
    description: 'Real-time condition monitoring to predict failures before they occur.',
    iconName: 'Activity',
    position: { top: '45%', left: '15%' }, // Mid Left (Pumps/Motors)
    category: 'Maintenance'
  },

  // --- Top Center: Workforce & Machines ---
  {
    id: 'connected-workers',
    title: 'Connected Workers',
    description: 'AR/VR enabled workforce with Digital Lean tools for real-time guidance.',
    iconName: 'Users',
    position: { top: '15%', left: '45%' }, // Top Center (Walkways)
    category: 'Workforce'
  },
  {
    id: 'connected-machines',
    title: 'Connected Machines (IoT)',
    description: 'Full IoT integration for seamless machine-to-machine communication.',
    iconName: 'Wifi',
    position: { top: '15%', left: '70%' }, // Top Right (Back infrastructure)
    category: 'Operations'
  },

  // --- Center Line: Quality & Automation ---
  {
    id: 'digital-quality',
    title: 'Digital Quality (Vision AI)',
    description: 'In-line computer vision systems for automated defect detection.',
    iconName: 'Eye',
    position: { top: '55%', left: '35%' }, // Center Left (Production Line)
    category: 'Quality'
  },
  {
    id: 'equipment-automation',
    title: 'Equipment Automation',
    description: 'Cobots and advanced machine vision enhancing production speed.',
    iconName: 'Bot',
    position: { top: '50%', left: '60%' }, // Center Right (Packaging)
    category: 'Operations'
  },

  // --- Bottom: Logistics & Control ---
  {
    id: 'decision-guidance',
    title: 'AI Decision Guidance',
    description: 'GenAI-enhanced decision support for shopfloor operators.',
    iconName: 'Brain',
    position: { top: '75%', left: '25%' }, // Bottom Left (Near Quality)
    category: 'Operations'
  },
  {
    id: 'watch-tower',
    title: 'Supply Chain Watch Tower',
    description: 'End-to-end visibility across the manufacturing and logistics network.',
    iconName: 'TowerControl',
    position: { top: '85%', left: '50%' }, // Bottom Center (Control Room)
    category: 'Supply Chain'
  },
  {
    id: 'agv-automation',
    title: 'Warehouse Automation',
    description: 'AGVs and automated conveyance systems for material handling.',
    iconName: 'Truck',
    position: { top: '75%', left: '80%' }, // Bottom Right (Warehouse floor)
    category: 'Supply Chain'
  },
  {
    id: 'digital-twins',
    title: 'Digital Twins',
    description: 'Virtual replicas of assets and processes for scenario planning.',
    iconName: 'Copy',
    position: { top: '60%', left: '90%' }, // Far Right (Virtual Overlay)
    category: 'Operations'
  },
];

export const FACTORY_AREAS: FactoryArea[] = [
  {
    id: 'processing-unit',
    title: 'Processing Unit',
    position: { top: '15%', left: '10%' }, // Moved higher and left
    zoneIds: ['process-optimization', 'condition-monitoring']
  },
  {
    id: 'assembly-ops',
    title: 'Assembly Operations',
    position: { top: '8%', left: '60%' }, // Moved higher and right
    zoneIds: ['connected-workers', 'connected-machines']
  },
  {
    id: 'production-line',
    title: 'Production Line',
    position: { top: '35%', left: '48%' }, // Centered above the line
    zoneIds: ['digital-quality', 'equipment-automation']
  },
  {
    id: 'logistics-hub',
    title: 'Logistics Hub',
    position: { top: '50%', left: '88%' }, // Higher up above floor
    zoneIds: ['agv-automation', 'digital-twins']
  },
  {
    id: 'command-center',
    title: 'Command Center',
    position: { top: '92%', left: '30%' }, // Lower and left
    zoneIds: ['watch-tower', 'decision-guidance']
  }
];

export const TOUR_STEPS: TourStep[] = [
  {
    stopNumber: 1,
    zoneId: 'connected-workers',
    title: 'The Production Floor',
    focus: 'Connected Workers (Digital Lean, AR/VR) & Augmented Guidance',
    useCase: 'Augmented Systems to Guide Workers in Shopfloor Actions',
    impact: 'A new technician is assembling a complex piece of equipment. The AR glasses highlight the exact bolts to tighten, show the required torque specification as a real-time visual indicator, and instantly flag any steps that are missed or performed incorrectly.'
  },
  {
    stopNumber: 2,
    zoneId: 'digital-quality',
    title: 'The Quality Inspection Station',
    focus: 'In-process Digital Quality',
    useCase: 'In-process Digital Quality (Vision, AI, and integrated quality systems)',
    impact: 'As the product moves down the line, an array of AI-powered cameras captures thousands of high-resolution images. The AI model compares these images against the perfect "digital twin" of the product, identifying microscopic defects that a human eye would miss.'
  },
  {
    stopNumber: 3,
    zoneId: 'condition-monitoring',
    title: 'The Maintenance Bay',
    focus: 'Condition Monitoring & Predictive Maintenance',
    useCase: 'Condition monitoring & predictive maintenance',
    impact: 'Sensors detect a subtle, rising frequency in a motor\'s vibration pattern. Instead of waiting for the motor to break, the system automatically schedules maintenance for that specific component 48 hours later, flagging the exact part that needs replacement.'
  },
  {
    stopNumber: 4,
    zoneId: 'decision-guidance',
    title: 'The Central Control Center',
    focus: 'Intelligent Decision Support',
    useCase: 'Intelligent Decision Support and Exception Based Intervention',
    impact: 'A sudden supply chain delay is detected. The AI immediately analyzes all active orders and presents the human operator with three optimized scenarios: Re-prioritize, substitute material, or adjust speed. The operator makes a data-backed choice in seconds.'
  },
  {
    stopNumber: 5,
    zoneId: 'digital-twins',
    title: 'The Warehouse & Logistics Hub',
    focus: 'Digital Twins of Assets, Processes & Networks',
    useCase: 'Digital twins of assets, processes & networks',
    impact: 'An operator uses the digital twin to simulate a sudden rush of urgent orders. They can test how the AGVs would route and where congestion points would occur in the virtual world, ensuring the physical system is pre-optimized.'
  }
];