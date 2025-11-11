// 26 Marketing Functions mapped to Global Cities
export const MARKETING_CITIES = [
  {
    id: 'abm',
    name: 'London',
    country: 'UK',
    function: 'Account-Based Marketing',
    coordinates: [-0.1276, 51.5074],
    color: '#3b82f6',
    icon: '🎯',
    description: 'Strategic targeting of high-value accounts',
    keyMetrics: ['Account Coverage', 'Pipeline Influence', 'Deal Velocity']
  },
  {
    id: 'seo',
    name: 'New York',
    country: 'USA',
    function: 'SEO & Search',
    coordinates: [-74.0060, 40.7128],
    color: '#10b981',
    icon: '🔍',
    description: 'Organic search visibility and rankings',
    keyMetrics: ['Keyword Rankings', 'Organic Traffic', 'Domain Authority']
  },
  {
    id: 'video',
    name: 'Singapore',
    country: 'Singapore',
    function: 'Video Marketing',
    coordinates: [103.8198, 1.3521],
    color: '#ef4444',
    icon: '🎥',
    description: 'Video content creation and distribution',
    keyMetrics: ['View Rate', 'Engagement', 'Completion Rate']
  },
  {
    id: 'analytics',
    name: 'Tokyo',
    country: 'Japan',
    function: 'Marketing Analytics',
    coordinates: [139.6917, 35.6895],
    color: '#8b5cf6',
    icon: '📊',
    description: 'Data analysis and performance measurement',
    keyMetrics: ['ROI', 'Attribution', 'Conversion Rate']
  },
  {
    id: 'brand',
    name: 'Paris',
    country: 'France',
    function: 'Brand Strategy',
    coordinates: [2.3522, 48.8566],
    color: '#ec4899',
    icon: '✨',
    description: 'Brand positioning and awareness',
    keyMetrics: ['Brand Awareness', 'Sentiment', 'Share of Voice']
  },
  {
    id: 'content',
    name: 'Berlin',
    country: 'Germany',
    function: 'Content Marketing',
    coordinates: [13.4050, 52.5200],
    color: '#f59e0b',
    icon: '📝',
    description: 'Content creation and distribution',
    keyMetrics: ['Content Volume', 'Engagement', 'Lead Gen']
  },
  {
    id: 'social',
    name: 'Sydney',
    country: 'Australia',
    function: 'Social Media',
    coordinates: [151.2093, -33.8688],
    color: '#06b6d4',
    icon: '💬',
    description: 'Social media marketing and engagement',
    keyMetrics: ['Followers', 'Engagement Rate', 'Reach']
  },
  {
    id: 'email',
    name: 'Amsterdam',
    country: 'Netherlands',
    function: 'Email Marketing',
    coordinates: [4.9041, 52.3676],
    color: '#14b8a6',
    icon: '📧',
    description: 'Email campaigns and automation',
    keyMetrics: ['Open Rate', 'Click Rate', 'Conversion']
  },
  {
    id: 'paid_ads',
    name: 'San Francisco',
    country: 'USA',
    function: 'Paid Advertising',
    coordinates: [-122.4194, 37.7749],
    color: '#f97316',
    icon: '💰',
    description: 'Paid media and advertising campaigns',
    keyMetrics: ['CPC', 'ROAS', 'Impression Share']
  },
  {
    id: 'martech',
    name: 'Bangalore',
    country: 'India',
    function: 'Marketing Technology',
    coordinates: [77.5946, 12.9716],
    color: '#6366f1',
    icon: '⚙️',
    description: 'Marketing automation and tech stack',
    keyMetrics: ['Stack Coverage', 'Integration', 'Utilization']
  },
  {
    id: 'research',
    name: 'Copenhagen',
    country: 'Denmark',
    function: 'Market Research',
    coordinates: [12.5683, 55.6761],
    color: '#a855f7',
    icon: '🔬',
    description: 'Customer and market insights',
    keyMetrics: ['Survey Response', 'Insight Quality', 'NPS']
  },
  {
    id: 'automation',
    name: 'Stockholm',
    country: 'Sweden',
    function: 'Marketing Automation',
    coordinates: [18.0686, 59.3293],
    color: '#84cc16',
    icon: '🤖',
    description: 'Workflow automation and orchestration',
    keyMetrics: ['Workflow Count', 'Time Saved', 'Lead Velocity']
  },
  {
    id: 'growth',
    name: 'Tel Aviv',
    country: 'Israel',
    function: 'Growth Marketing',
    coordinates: [34.7818, 32.0853],
    color: '#22c55e',
    icon: '📈',
    description: 'Experimentation and growth hacking',
    keyMetrics: ['Experiments Run', 'Growth Rate', 'Activation']
  },
  {
    id: 'crm',
    name: 'Dubai',
    country: 'UAE',
    function: 'CRM & Customer Data',
    coordinates: [55.2708, 25.2048],
    color: '#0ea5e9',
    icon: '👥',
    description: 'Customer relationship management',
    keyMetrics: ['Data Quality', 'Segmentation', 'Lifetime Value']
  },
  {
    id: 'events',
    name: 'Barcelona',
    country: 'Spain',
    function: 'Event Marketing',
    coordinates: [2.1734, 41.3851],
    color: '#f43f5e',
    icon: '🎪',
    description: 'Event planning and execution',
    keyMetrics: ['Attendance', 'Lead Quality', 'Pipeline']
  },
  {
    id: 'partnership',
    name: 'Toronto',
    country: 'Canada',
    function: 'Partner Marketing',
    coordinates: [-79.3832, 43.6532],
    color: '#8b5cf6',
    icon: '🤝',
    description: 'Channel and partner programs',
    keyMetrics: ['Partner Count', 'Co-Marketing', 'Revenue']
  },
  {
    id: 'product',
    name: 'Seoul',
    country: 'South Korea',
    function: 'Product Marketing',
    coordinates: [126.9780, 37.5665],
    color: '#06b6d4',
    icon: '📦',
    description: 'Product positioning and launches',
    keyMetrics: ['Launch Success', 'Adoption', 'Feature Usage']
  },
  {
    id: 'pr',
    name: 'Los Angeles',
    country: 'USA',
    function: 'Public Relations',
    coordinates: [-118.2437, 34.0522],
    color: '#ec4899',
    icon: '📰',
    description: 'Media relations and PR campaigns',
    keyMetrics: ['Media Coverage', 'Impressions', 'Sentiment']
  },
  {
    id: 'community',
    name: 'Austin',
    country: 'USA',
    function: 'Community Building',
    coordinates: [-97.7431, 30.2672],
    color: '#eab308',
    icon: '🌟',
    description: 'Community engagement and advocacy',
    keyMetrics: ['Community Size', 'Activity', 'Advocacy']
  },
  {
    id: 'design',
    name: 'Milan',
    country: 'Italy',
    function: 'Creative & Design',
    coordinates: [9.1900, 45.4642],
    color: '#d946ef',
    icon: '🎨',
    description: 'Creative production and design',
    keyMetrics: ['Asset Volume', 'Brand Consistency', 'Speed']
  },
  {
    id: 'localization',
    name: 'Hong Kong',
    country: 'Hong Kong',
    function: 'Localization',
    coordinates: [114.1694, 22.3193],
    color: '#f59e0b',
    icon: '🌏',
    description: 'Regional and language adaptation',
    keyMetrics: ['Markets Covered', 'Localization Speed', 'Quality']
  },
  {
    id: 'web',
    name: 'Seattle',
    country: 'USA',
    function: 'Web Experience',
    coordinates: [-122.3321, 47.6062],
    color: '#0ea5e9',
    icon: '🌐',
    description: 'Website optimization and UX',
    keyMetrics: ['Page Speed', 'Conversion', 'Bounce Rate']
  },
  {
    id: 'lifecycle',
    name: 'Boston',
    country: 'USA',
    function: 'Lifecycle Marketing',
    coordinates: [-71.0589, 42.3601],
    color: '#10b981',
    icon: '🔄',
    description: 'Customer journey orchestration',
    keyMetrics: ['Retention', 'Churn', 'Expansion Revenue']
  },
  {
    id: 'demand',
    name: 'Chicago',
    country: 'USA',
    function: 'Demand Generation',
    coordinates: [-87.6298, 41.8781],
    color: '#3b82f6',
    icon: '⚡',
    description: 'Lead generation and nurturing',
    keyMetrics: ['MQLs', 'SQLs', 'Pipeline Generated']
  },
  {
    id: 'ops',
    name: 'Zurich',
    country: 'Switzerland',
    function: 'Marketing Operations',
    coordinates: [8.5417, 47.3769],
    color: '#6366f1',
    icon: '⚙️',
    description: 'Process and operational excellence',
    keyMetrics: ['Efficiency', 'Automation Rate', 'Data Governance']
  },
  {
    id: 'strategy',
    name: 'Washington DC',
    country: 'USA',
    function: 'Strategic Planning',
    coordinates: [-77.0369, 38.9072],
    color: '#8b5cf6',
    icon: '🎯',
    description: 'Strategic direction and planning',
    keyMetrics: ['Goal Achievement', 'Strategic Alignment', 'Planning Quality']
  }
];

// Journey pathways connecting cities
export const JOURNEY_PATHS = [
  {
    id: 'foundation',
    name: 'Foundation Journey',
    from: 'strategy',
    to: 'analytics',
    via: ['ops', 'martech'],
    duration: '12-16 weeks',
    difficulty: 'Beginner'
  },
  {
    id: 'demand-engine',
    name: 'Demand Engine',
    from: 'content',
    to: 'demand',
    via: ['seo', 'email'],
    duration: '10-14 weeks',
    difficulty: 'Intermediate'
  },
  {
    id: 'brand-awareness',
    name: 'Brand Awareness',
    from: 'brand',
    to: 'social',
    via: ['pr', 'community'],
    duration: '8-12 weeks',
    difficulty: 'Intermediate'
  },
  {
    id: 'revenue-growth',
    name: 'Revenue Growth',
    from: 'abm',
    to: 'lifecycle',
    via: ['crm', 'automation'],
    duration: '16-20 weeks',
    difficulty: 'Advanced'
  }
];

// Get city by ID
export const getCityById = (id) => {
  return MARKETING_CITIES.find(city => city.id === id);
};

// Get cities by function keywords
export const searchCities = (keyword) => {
  const lower = keyword.toLowerCase();
  return MARKETING_CITIES.filter(city => 
    city.function.toLowerCase().includes(lower) ||
    city.name.toLowerCase().includes(lower) ||
    city.description.toLowerCase().includes(lower)
  );
};

// Calculate distance between two cities (for animation)
export const calculateDistance = (city1, city2) => {
  const [lon1, lat1] = city1.coordinates;
  const [lon2, lat2] = city2.coordinates;
  
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};
