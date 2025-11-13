/**
 * Shared journey catalog data
 * Used for both the full Flight Deck page and live journey suggestions during assessment
 */

export const journeyCatalog = [
  {
    id: 'spray_to_abm',
    title: 'From Spray & Pray to Targeted ABM',
    origin: 'Demand Generation',
    destination: 'Account-Based Marketing',
    layovers: ['Marketing Operations', 'Analytics & Data', 'Sales Alignment'],
    summary: 'Target high-value prospects with precision instead of mass marketing',
    description: 'Transform your mass marketing approach into a sophisticated account-based strategy that targets high-value prospects with precision.',
    nextSteps: [
      'Identify and tier your top 100 target accounts using firmographic and intent data',
      'Implement account scoring and stakeholder mapping for tier-1 accounts',
      'Build personalized content and messaging frameworks by vertical and use case',
      'Set up multi-channel orchestration with coordinated touchpoints across email, social, and direct channels',
      'Establish sales-marketing SLAs for account engagement and handoff processes'
    ],
    techRequired: ['6sense', 'Demandbase', 'LinkedIn Sales Navigator', 'Salesforce'],
    estimatedTime: '12-16 weeks',
    priority: 'high',
    minPoints: 400 // Flight miles needed to consider this journey
  },
  {
    id: 'manual_to_automated',
    title: 'From Manual Campaigns to Marketing Automation',
    origin: 'Email Marketing',
    destination: 'Marketing Automation',
    layovers: ['Marketing Operations', 'Data Management', 'Lead Scoring'],
    summary: 'Scale marketing with automation that nurtures leads and drives pipeline',
    description: 'Scale your marketing with sophisticated automation that nurtures leads, scores engagement, and drives pipeline efficiently.',
    nextSteps: [
      'Audit current email campaigns and identify automation opportunities',
      'Map buyer journey stages and define qualification criteria',
      'Implement behavioral lead scoring based on engagement and firmographics',
      'Build automated nurture tracks for each stage of the buyer journey',
      'Create closed-loop reporting with sales to optimize conversion rates'
    ],
    techRequired: ['HubSpot', 'Marketo', 'Pardot', 'ActiveCampaign'],
    estimatedTime: '8-12 weeks',
    priority: 'high',
    minPoints: 250
  },
  {
    id: 'vanity_to_revenue',
    title: 'From Vanity Metrics to Revenue Attribution',
    origin: 'Basic Analytics',
    destination: 'Revenue Attribution',
    layovers: ['Data Integration', 'Marketing Operations', 'CRM Alignment'],
    summary: 'Prove marketing impact on revenue with multi-touch attribution',
    description: 'Move beyond page views and clicks to prove marketing\'s true impact on revenue with multi-touch attribution.',
    nextSteps: [
      'Integrate all marketing touchpoints into a unified data warehouse',
      'Define attribution model (first-touch, last-touch, or multi-touch weighted)',
      'Map campaigns and channels to pipeline and closed-won revenue',
      'Build executive dashboards showing marketing ROI and CAC by channel',
      'Implement predictive analytics to forecast pipeline contribution'
    ],
    techRequired: ['Bizible', 'Google Analytics', 'Tableau', 'Salesforce'],
    estimatedTime: '10-14 weeks',
    priority: 'medium',
    minPoints: 350
  },
  {
    id: 'blog_to_demand',
    title: 'From Blog Posts to Demand Engine',
    origin: 'Content Marketing',
    destination: 'Integrated Demand Generation',
    layovers: ['SEO & Distribution', 'Lead Capture', 'Nurture Programs'],
    summary: 'Turn content into a lead generation machine with strategic distribution',
    description: 'Transform your content library into a lead generation machine with strategic distribution and conversion optimization.',
    nextSteps: [
      'Conduct content audit and map existing assets to buyer journey stages',
      'Develop content pillars aligned to product value propositions and SEO keywords',
      'Create gated assets (ebooks, webinars, tools) for lead capture at each stage',
      'Build multi-channel distribution strategy including syndication and paid promotion',
      'Implement content-to-pipeline tracking with attribution modeling'
    ],
    techRequired: ['SEMrush', 'HubSpot', 'Canva', 'Vidyard'],
    estimatedTime: '12-16 weeks',
    priority: 'medium',
    minPoints: 300
  },
  {
    id: 'siloed_to_aligned',
    title: 'From Siloed to Sales-Marketing Alignment',
    origin: 'Disconnected Teams',
    destination: 'Revenue Operations',
    layovers: ['Shared Metrics', 'Process Definition', 'Technology Integration'],
    summary: 'Create unified revenue engine with shared goals and accountability',
    description: 'Break down barriers between sales and marketing to create a unified revenue engine with shared goals and accountability.',
    nextSteps: [
      'Define Service Level Agreement (SLA) between sales and marketing teams',
      'Establish lead lifecycle stages and handoff criteria with sales input',
      'Create shared revenue dashboards visible to both teams',
      'Implement regular sales-marketing alignment meetings (weekly/bi-weekly)',
      'Build closed-loop feedback system for lead quality and conversion insights'
    ],
    techRequired: ['Salesforce', 'Gong', 'Clari', 'Slack'],
    estimatedTime: '8-10 weeks',
    priority: 'high',
    minPoints: 300
  },
  {
    id: 'local_to_global',
    title: 'From Local Tools to Integrated Stack',
    origin: 'Point Solutions',
    destination: 'Unified Marketing Platform',
    layovers: ['Technology Audit', 'Integration Architecture', 'Data Governance'],
    summary: 'Consolidate fragmented martech into integrated ecosystem',
    description: 'Consolidate your fragmented martech stack into an integrated ecosystem that shares data and enables sophisticated workflows.',
    nextSteps: [
      'Audit current martech stack and identify redundancies and gaps',
      'Design integration architecture with customer data platform (CDP) at center',
      'Implement middleware or iPaaS to connect marketing, sales, and customer success tools',
      'Establish data governance policies and master data management practices',
      'Build unified reporting layer across all marketing systems'
    ],
    techRequired: ['Segment', 'mParticle', 'Zapier', 'Salesforce'],
    estimatedTime: '14-18 weeks',
    priority: 'medium',
    minPoints: 450
  },
  {
    id: 'reactive_to_predictive',
    title: 'From Reactive to Predictive Marketing',
    origin: 'Historical Reporting',
    destination: 'AI-Powered Insights',
    layovers: ['Data Warehouse', 'ML Models', 'Real-time Analytics'],
    summary: 'Leverage AI to predict behavior, optimize campaigns, prevent churn',
    description: 'Leverage AI and machine learning to predict customer behavior, optimize campaigns, and proactively prevent churn.',
    nextSteps: [
      'Build data warehouse with historical customer engagement and conversion data',
      'Implement predictive lead scoring using machine learning algorithms',
      'Create propensity models for upsell, cross-sell, and churn prediction',
      'Deploy real-time recommendation engine for content and next-best-action',
      'Set up automated alerts and triggers based on predictive insights'
    ],
    techRequired: ['Salesforce Einstein', 'Adobe Sensei', 'Google Analytics 4', 'Python/R'],
    estimatedTime: '16-20 weeks',
    priority: 'low',
    minPoints: 600
  },
  {
    id: 'basic_to_personalized',
    title: 'From Batch-and-Blast to Personalized Engagement',
    origin: 'Mass Email',
    destination: 'Dynamic Personalization',
    layovers: ['Segmentation', 'Behavioral Tracking', 'Content Customization'],
    summary: 'Deliver personalized experiences based on behavior and preferences',
    description: 'Replace one-size-fits-all messaging with dynamic, personalized experiences tailored to individual customer needs and behaviors.',
    nextSteps: [
      'Implement customer data platform to unify customer data across touchpoints',
      'Build dynamic segmentation based on demographics, firmographics, and behavior',
      'Create personalized email templates with dynamic content blocks',
      'Deploy website personalization based on visitor attributes and intent',
      'Measure lift in engagement and conversion from personalization efforts'
    ],
    techRequired: ['Optimizely', 'Dynamic Yield', 'HubSpot', 'Segment'],
    estimatedTime: '10-12 weeks',
    priority: 'medium',
    minPoints: 350
  }
];

/**
 * Convert combined score (0-10 scale) to points (0-1000 scale)
 * Alias for toFlightMiles to maintain compatibility
 */
export const toPoints = (combinedScore) => {
  return Math.round(combinedScore * 100);
};

/**
 * Get live journey suggestions based on current points
 * @param {number} currentPoints - User's current flight miles/points
 * @param {number} maxCount - Maximum number of journeys to return
 * @returns {Array} Array of suggested journey objects
 */
export const getLiveJourneySuggestions = (currentPoints, maxCount = 3) => {
  if (currentPoints === 0) {
    // No answers yet - return entry-level journeys
    return journeyCatalog
      .filter(journey => journey.minPoints <= 300)
      .sort((a, b) => a.minPoints - b.minPoints)
      .slice(0, maxCount);
  }

  // Show journeys that are:
  // 1. Within reach (user has enough points OR close to it +100 buffer)
  // 2. Not too far above their current level
  const reachableJourneys = journeyCatalog
    .filter(journey => {
      // Show if user has the points OR is within 100 miles of reaching it
      const isReachable = currentPoints >= journey.minPoints - 100;
      // Don't show journeys too far above current level (more than +200)
      const notTooFar = journey.minPoints <= currentPoints + 300;
      return isReachable && notTooFar;
    })
    .sort((a, b) => {
      // Sort by how close they are to the user's current score
      const diffA = Math.abs(a.minPoints - currentPoints);
      const diffB = Math.abs(b.minPoints - currentPoints);
      return diffA - diffB;
    });

  // Return top matches
  return reachableJourneys.slice(0, maxCount);
};
