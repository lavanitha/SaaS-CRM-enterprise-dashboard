export const dashboardKPIs = {
  orders: { value: 2847, change: 12.5, trend: 'up' },
  customers: { value: 1294, change: 8.3, trend: 'up' },
  revenue: { value: 284750, change: 15.2, trend: 'up' },
  returningBuyers: { value: 68.5, change: 5.1, trend: 'up' }
};

export const monthlyRevenue = [
  { month: 'Jan', revenue: 45000, forecast: 42000 },
  { month: 'Feb', revenue: 52000, forecast: 48000 },
  { month: 'Mar', revenue: 48000, forecast: 50000 },
  { month: 'Apr', revenue: 61000, forecast: 58000 },
  { month: 'May', revenue: 55000, forecast: 60000 },
  { month: 'Jun', revenue: 67000, forecast: 65000 },
  { month: 'Jul', revenue: 72000, forecast: 70000 },
  { month: 'Aug', revenue: 68000, forecast: 72000 },
  { month: 'Sep', revenue: 78000, forecast: 75000 },
  { month: 'Oct', revenue: 85000, forecast: 82000 },
  { month: 'Nov', revenue: 92000, forecast: 88000 },
  { month: 'Dec', revenue: 98000, forecast: 95000 }
];

export const yearlyRevenue = [
  { year: '2020', revenue: 450000, forecast: 420000 },
  { year: '2021', revenue: 620000, forecast: 580000 },
  { year: '2022', revenue: 780000, forecast: 750000 },
  { year: '2023', revenue: 920000, forecast: 880000 },
  { year: '2024', revenue: 1050000, forecast: 1020000 }
];

export const recentOrders = [
  { id: 'ORD-001', customer: 'Acme Corp', amount: 12500, status: 'completed', date: '2024-01-04' },
  { id: 'ORD-002', customer: 'TechStart Inc', amount: 8750, status: 'processing', date: '2024-01-03' },
  { id: 'ORD-003', customer: 'Global Solutions', amount: 15200, status: 'completed', date: '2024-01-03' },
  { id: 'ORD-004', customer: 'Innovate Labs', amount: 6800, status: 'pending', date: '2024-01-02' },
  { id: 'ORD-005', customer: 'Digital Dynamics', amount: 9400, status: 'completed', date: '2024-01-02' },
  { id: 'ORD-006', customer: 'NextGen Systems', amount: 11200, status: 'processing', date: '2024-01-01' }
];

export const pipelineKPIs = {
  totalValue: { value: 2450000, change: 18.5 },
  winRate: { value: 32.5, change: 4.2 },
  avgDeal: { value: 45800, change: -2.1 },
  deals: { value: 147, change: 12.0 }
};

export const funnelData = [
  { stage: 'Prospecting', value: 150, deals: 150 },
  { stage: 'Qualification', value: 120, deals: 120 },
  { stage: 'Proposal', value: 85, deals: 85 },
  { stage: 'Negotiation', value: 52, deals: 52 },
  { stage: 'Closed', value: 35, deals: 35 }
];

export const deals = [
  { id: 'D-001', company: 'Enterprise Co', value: 125000, stage: 'Negotiation', probability: 85, owner: 'Sarah Johnson', closeDate: '2024-01-15' },
  { id: 'D-002', company: 'MegaCorp Ltd', value: 98000, stage: 'Proposal', probability: 65, owner: 'Michael Chen', closeDate: '2024-01-20' },
  { id: 'D-003', company: 'StartUp Inc', value: 45000, stage: 'Qualification', probability: 40, owner: 'Emily Davis', closeDate: '2024-02-01' },
  { id: 'D-004', company: 'Tech Solutions', value: 87500, stage: 'Negotiation', probability: 90, owner: 'David Martinez', closeDate: '2024-01-12' },
  { id: 'D-005', company: 'Growth Ventures', value: 156000, stage: 'Proposal', probability: 70, owner: 'Sarah Johnson', closeDate: '2024-01-25' },
  { id: 'D-006', company: 'Innovation Hub', value: 62000, stage: 'Prospecting', probability: 25, owner: 'Michael Chen', closeDate: '2024-02-15' }
];

export const customerKPIs = {
  totalCustomers: { value: 1294, change: 8.3 },
  activeCustomers: { value: 1087, change: 12.1 },
  churnedCustomers: { value: 207, change: -15.2 },
  lifetimeValue: { value: 12450, change: 18.7 }
};

export const customerSegments = [
  { name: 'Enterprise', value: 285, percentage: 22 },
  { name: 'Mid-Market', value: 456, percentage: 35 },
  { name: 'Small Business', value: 387, percentage: 30 },
  { name: 'Startup', value: 166, percentage: 13 }
];

export const customerGrowth = [
  { month: 'Jan', active: 950, churned: 45 },
  { month: 'Feb', active: 985, churned: 38 },
  { month: 'Mar', active: 1020, churned: 42 },
  { month: 'Apr', active: 1065, churned: 35 },
  { month: 'May', active: 1098, churned: 40 },
  { month: 'Jun', active: 1142, churned: 32 },
  { month: 'Jul', active: 1185, churned: 38 },
  { month: 'Aug', active: 1224, churned: 28 },
  { month: 'Sep', active: 1268, churned: 35 },
  { month: 'Oct', active: 1305, churned: 30 },
  { month: 'Nov', active: 1348, churned: 25 },
  { month: 'Dec', active: 1394, churned: 22 }
];

export const topCustomers = [
  { id: 'C-001', name: 'Global Enterprises', revenue: 245000, orders: 48, ltv: 18500, segment: 'Enterprise' },
  { id: 'C-002', name: 'TechVision Corp', revenue: 198000, orders: 36, ltv: 15200, segment: 'Enterprise' },
  { id: 'C-003', name: 'Digital Innovations', revenue: 167000, orders: 42, ltv: 12800, segment: 'Mid-Market' },
  { id: 'C-004', name: 'Smart Solutions Ltd', revenue: 145000, orders: 38, ltv: 11500, segment: 'Mid-Market' },
  { id: 'C-005', name: 'NextWave Systems', revenue: 128000, orders: 32, ltv: 10200, segment: 'Enterprise' },
  { id: 'C-006', name: 'Future Tech Inc', revenue: 112000, orders: 28, ltv: 9800, segment: 'Mid-Market' }
];

export const revenueKPIs = {
  mtd: { value: 284750, target: 300000, change: 15.2 },
  qtd: { value: 825000, target: 850000, change: 12.8 },
  ytd: { value: 2450000, target: 2500000, change: 18.5 },
  arr: { value: 3200000, target: 3500000, change: 22.3 }
};

export const revenueByProduct = [
  { product: 'Enterprise Plan', revenue: 125000, percentage: 44 },
  { product: 'Professional Plan', revenue: 85000, percentage: 30 },
  { product: 'Basic Plan', revenue: 45000, percentage: 16 },
  { product: 'Add-ons', revenue: 29750, percentage: 10 }
];

export const revenueByRegion = [
  { region: 'North America', revenue: 142375, percentage: 50 },
  { region: 'Europe', revenue: 85425, percentage: 30 },
  { region: 'Asia Pacific', revenue: 42713, percentage: 15 },
  { region: 'Other', revenue: 14238, percentage: 5 }
];

export const revenueGrowth = [
  { month: 'Jan', actual: 205000, forecast: 195000, target: 200000 },
  { month: 'Feb', actual: 218000, forecast: 210000, target: 215000 },
  { month: 'Mar', actual: 232000, forecast: 225000, target: 230000 },
  { month: 'Apr', actual: 245000, forecast: 240000, target: 245000 },
  { month: 'May', actual: 258000, forecast: 250000, target: 255000 },
  { month: 'Jun', actual: 272000, forecast: 265000, target: 270000 },
  { month: 'Jul', actual: 285000, forecast: 280000, target: 285000 },
  { month: 'Aug', actual: 298000, forecast: 290000, target: 295000 },
  { month: 'Sep', actual: 312000, forecast: 305000, target: 310000 },
  { month: 'Oct', actual: 328000, forecast: 320000, target: 325000 },
  { month: 'Nov', actual: 345000, forecast: 335000, target: 340000 },
  { month: 'Dec', actual: 365000, forecast: 350000, target: 360000 }
];

// src/config/mockUser.ts
export const mockUser = {
  name: "Sarah Johnson",
  email: "sarah.johnson@company.com",
  role: "Sales Manager",
};

