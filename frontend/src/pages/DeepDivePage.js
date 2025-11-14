import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Send, Target, Compass } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const API = API_BASE_URL;

const DeepDivePage = () => {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [responses, setResponses] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const topics = [
    {
      id: 'strategy',
      name: 'Marketing Strategy & Goals',
      emoji: '🎯',
      description: 'Explore strategic planning, goal-setting, and alignment',
      color: 'from-blue-600 to-blue-800'
    },
    {
      id: 'content',
      name: 'Content Marketing',
      emoji: '📝',
      description: 'Deep dive into content strategy, creation, and distribution',
      color: 'from-green-600 to-green-800'
    },
    {
      id: 'demand_gen',
      name: 'Demand Generation',
      emoji: '📈',
      description: 'Master lead generation, nurturing, and conversion',
      color: 'from-purple-600 to-purple-800'
    },
    {
      id: 'sales_alignment',
      name: 'Sales & Marketing Alignment',
      emoji: '🤝',
      description: 'Optimize collaboration between sales and marketing teams',
      color: 'from-orange-600 to-orange-800'
    },
    {
      id: 'operations',
      name: 'Marketing Operations',
      emoji: '⚙️',
      description: 'Streamline processes, automation, and efficiency',
      color: 'from-cyan-600 to-cyan-800'
    },
    {
      id: 'tech_stack',
      name: 'Tech Stack Foundation',
      emoji: '🛠️',
      description: 'Evaluate tools, integration, and technology maturity',
      color: 'from-indigo-600 to-indigo-800'
    },
    {
      id: 'abm',
      name: 'Account-Based Marketing',
      emoji: '🎯',
      description: 'Target high-value accounts with precision',
      color: 'from-red-600 to-red-800'
    },
    {
      id: 'analytics',
      name: 'Analytics & Insights',
      emoji: '📊',
      description: 'Master data analysis, reporting, and attribution',
      color: 'from-pink-600 to-pink-800'
    },
    {
      id: 'team',
      name: 'Team & Skills',
      emoji: '👥',
      description: 'Build capabilities, structure, and talent',
      color: 'from-teal-600 to-teal-800'
    },
    {
      id: 'budget',
      name: 'Budget & Resources',
      emoji: '💰',
      description: 'Optimize spending, ROI, and resource allocation',
      color: 'from-yellow-600 to-yellow-800'
    }
  ];

  const deepDiveQuestions = {
    strategy: [
      {
        id: 'strategy_dd_1',
        text: 'How clearly defined are your marketing objectives and key results (OKRs)?',
        options: [
          { label: 'No formal objectives set', value: 0 },
          { label: 'Basic goals exist but not documented', value: 25 },
          { label: 'Documented quarterly goals with some metrics', value: 50 },
          { label: 'Well-defined OKRs with regular tracking', value: 75 },
          { label: 'Comprehensive OKR framework with executive alignment', value: 100 }
        ]
      },
      {
        id: 'strategy_dd_2',
        text: 'How well do you understand your ideal customer profile (ICP) and buyer personas?',
        options: [
          { label: 'No documented ICP or personas', value: 0 },
          { label: 'Basic demographic information only', value: 25 },
          { label: 'Documented personas with basic firmographics', value: 50 },
          { label: 'Detailed personas with pain points and buying journey', value: 75 },
          { label: 'Data-driven personas updated quarterly with buying signals', value: 100 }
        ]
      },
      {
        id: 'strategy_dd_3',
        text: 'How mature is your competitive positioning and differentiation strategy?',
        options: [
          { label: 'No competitive analysis or positioning', value: 0 },
          { label: 'Aware of competitors but no formal positioning', value: 25 },
          { label: 'Basic competitive matrix and value proposition', value: 50 },
          { label: 'Clear differentiation with battle cards for sales', value: 75 },
          { label: 'Dynamic competitive intelligence with win/loss analysis', value: 100 }
        ]
      },
      {
        id: 'strategy_dd_4',
        text: 'How effectively do you segment and prioritize your target markets?',
        options: [
          { label: 'No market segmentation strategy', value: 0 },
          { label: 'Broad market categories only', value: 25 },
          { label: 'Basic segmentation by industry or size', value: 50 },
          { label: 'Multi-dimensional segmentation with prioritization', value: 75 },
          { label: 'Data-driven segmentation with predictive scoring', value: 100 }
        ]
      },
      {
        id: 'strategy_dd_5',
        text: 'How aligned is your marketing strategy with overall business objectives?',
        options: [
          { label: 'Marketing operates independently', value: 0 },
          { label: 'Occasional alignment meetings', value: 25 },
          { label: 'Quarterly business review participation', value: 50 },
          { label: 'Marketing KPIs tied to revenue goals', value: 75 },
          { label: 'Full integration with board-level strategic planning', value: 100 }
        ]
      }
    ],
    content: [
      {
        id: 'content_dd_1',
        text: 'How sophisticated is your content strategy and planning process?',
        options: [
          { label: 'Ad-hoc content creation with no strategy', value: 0 },
          { label: 'Basic content calendar for blogs', value: 25 },
          { label: 'Multi-channel calendar aligned to campaigns', value: 50 },
          { label: 'Strategic content pillars mapped to buyer journey', value: 75 },
          { label: 'Data-driven content strategy with performance optimization', value: 100 }
        ]
      },
      {
        id: 'content_dd_2',
        text: 'How effective is your content distribution and amplification?',
        options: [
          { label: 'Publish and hope approach', value: 0 },
          { label: 'Basic social media sharing', value: 25 },
          { label: 'Multi-channel distribution with email and social', value: 50 },
          { label: 'Coordinated campaigns across owned, earned, and paid', value: 75 },
          { label: 'Optimized distribution with syndication and influencer network', value: 100 }
        ]
      },
      {
        id: 'content_dd_3',
        text: 'How mature is your content personalization capability?',
        options: [
          { label: 'One-size-fits-all content', value: 0 },
          { label: 'Basic persona-targeted content', value: 25 },
          { label: 'Industry or segment-specific variations', value: 50 },
          { label: 'Dynamic content based on behavior and stage', value: 75 },
          { label: 'AI-powered 1:1 personalization at scale', value: 100 }
        ]
      },
      {
        id: 'content_dd_4',
        text: 'How well do you measure content performance and ROI?',
        options: [
          { label: 'No content analytics', value: 0 },
          { label: 'Basic page views and downloads', value: 25 },
          { label: 'Engagement metrics across channels', value: 50 },
          { label: 'Attribution to pipeline and revenue', value: 75 },
          { label: 'Predictive content scoring with optimization engine', value: 100 }
        ]
      },
      {
        id: 'content_dd_5',
        text: 'How scalable is your content production process?',
        options: [
          { label: 'Single person creating all content', value: 0 },
          { label: 'Small team with no defined workflow', value: 25 },
          { label: 'Content calendar with approval process', value: 50 },
          { label: 'Production workflow with freelancer network', value: 75 },
          { label: 'Content factory with templates, AI tools, and agencies', value: 100 }
        ]
      }
    ],
    demand_gen: [
      {
        id: 'demand_gen_dd_1',
        text: 'How sophisticated are your lead generation tactics and channels?',
        options: [
          { label: 'Relying solely on referrals or inbound luck', value: 0 },
          { label: 'Basic website forms and content downloads', value: 25 },
          { label: 'Multi-channel campaigns with gated content', value: 50 },
          { label: 'Integrated campaigns across paid, owned, and earned', value: 75 },
          { label: 'Omnichannel demand orchestration with intent signals', value: 100 }
        ]
      },
      {
        id: 'demand_gen_dd_2',
        text: 'How effective is your lead nurturing and scoring process?',
        options: [
          { label: 'No nurturing - leads go straight to sales', value: 0 },
          { label: 'Basic email drip campaigns', value: 25 },
          { label: 'Stage-based nurture tracks with scoring', value: 50 },
          { label: 'Behavioral scoring with multi-touch nurturing', value: 75 },
          { label: 'Predictive AI scoring with personalized journeys', value: 100 }
        ]
      },
      {
        id: 'demand_gen_dd_3',
        text: 'How optimized is your conversion rate optimization (CRO) practice?',
        options: [
          { label: 'No testing or optimization', value: 0 },
          { label: 'Occasional A/B tests on email subject lines', value: 25 },
          { label: 'Regular landing page and email testing', value: 50 },
          { label: 'Full-funnel testing program with experimentation roadmap', value: 75 },
          { label: 'Advanced personalization with AI-driven optimization', value: 100 }
        ]
      },
      {
        id: 'demand_gen_dd_4',
        text: 'How well do you manage and optimize your paid acquisition channels?',
        options: [
          { label: 'No paid advertising', value: 0 },
          { label: 'Small budget on Google Ads or LinkedIn', value: 25 },
          { label: 'Multi-channel paid campaigns with tracking', value: 50 },
          { label: 'Sophisticated targeting with regular optimization', value: 75 },
          { label: 'AI-powered bidding with full attribution and ROAS tracking', value: 100 }
        ]
      },
      {
        id: 'demand_gen_dd_5',
        text: 'How mature is your marketing automation and campaign execution?',
        options: [
          { label: 'Manual email sends only', value: 0 },
          { label: 'Basic email automation platform', value: 25 },
          { label: 'Multi-step automated campaigns with triggers', value: 50 },
          { label: 'Sophisticated workflows with lead lifecycle management', value: 75 },
          { label: 'Omnichannel orchestration with AI-powered journeys', value: 100 }
        ]
      }
    ],
    sales_alignment: [
      {
        id: 'sales_alignment_dd_1',
        text: 'How well-defined is your Service Level Agreement (SLA) between sales and marketing?',
        options: [
          { label: 'No SLA or formal agreement', value: 0 },
          { label: 'Verbal understanding of expectations', value: 25 },
          { label: 'Documented SLA for lead volume and quality', value: 50 },
          { label: 'Comprehensive SLA with response times and feedback loops', value: 75 },
          { label: 'Dynamic SLA with real-time dashboards and accountability', value: 100 }
        ]
      },
      {
        id: 'sales_alignment_dd_2',
        text: 'How effective is your lead handoff and follow-up process?',
        options: [
          { label: 'Leads dumped into CRM with no process', value: 0 },
          { label: 'Email notifications to sales reps', value: 25 },
          { label: 'Routing rules with basic lead alerts', value: 50 },
          { label: 'Intelligent routing with real-time notifications and context', value: 75 },
          { label: 'AI-powered routing with conversation intelligence and playbooks', value: 100 }
        ]
      },
      {
        id: 'sales_alignment_dd_3',
        text: 'How collaborative is your sales and marketing planning process?',
        options: [
          { label: 'Separate planning with no coordination', value: 0 },
          { label: 'Annual joint meeting for high-level goals', value: 25 },
          { label: 'Quarterly planning sessions with shared objectives', value: 50 },
          { label: 'Monthly alignment on campaigns, accounts, and targets', value: 75 },
          { label: 'Weekly revenue meetings with integrated dashboards', value: 100 }
        ]
      },
      {
        id: 'sales_alignment_dd_4',
        text: 'How robust is your closed-loop reporting and feedback mechanism?',
        options: [
          { label: 'No visibility into what happens after lead handoff', value: 0 },
          { label: 'Basic win/loss reporting monthly', value: 25 },
          { label: 'Regular feedback on lead quality and conversion', value: 50 },
          { label: 'Real-time dashboards showing full funnel performance', value: 75 },
          { label: 'AI-powered insights with predictive win probability', value: 100 }
        ]
      },
      {
        id: 'sales_alignment_dd_5',
        text: 'How well does marketing support sales enablement and content needs?',
        options: [
          { label: 'Sales creates their own materials', value: 0 },
          { label: 'Basic pitch decks and one-sheets available', value: 25 },
          { label: 'Content library with battle cards and case studies', value: 50 },
          { label: 'Sales enablement portal with training and playbooks', value: 75 },
          { label: 'AI-powered content recommendations with usage analytics', value: 100 }
        ]
      }
    ],
    operations: [
      {
        id: 'operations_dd_1',
        text: 'How mature are your marketing processes and workflows?',
        options: [
          { label: 'Ad-hoc with no documentation', value: 0 },
          { label: 'Basic checklists for common tasks', value: 25 },
          { label: 'Documented processes for key activities', value: 50 },
          { label: 'Standardized workflows with approval gates', value: 75 },
          { label: 'Fully automated processes with continuous improvement', value: 100 }
        ]
      },
      {
        id: 'operations_dd_2',
        text: 'How effective is your marketing project management capability?',
        options: [
          { label: 'No project management system', value: 0 },
          { label: 'Spreadsheets and email for tracking', value: 25 },
          { label: 'Project management tool with basic usage', value: 50 },
          { label: 'Robust PM with templates, dashboards, and resource planning', value: 75 },
          { label: 'Enterprise work management with portfolio optimization', value: 100 }
        ]
      },
      {
        id: 'operations_dd_3',
        text: 'How sophisticated is your data management and hygiene practice?',
        options: [
          { label: 'No data governance or cleanup', value: 0 },
          { label: 'Occasional manual deduplication', value: 25 },
          { label: 'Regular data quality checks and cleanup', value: 50 },
          { label: 'Automated data enrichment and validation rules', value: 75 },
          { label: 'AI-powered data quality with master data management', value: 100 }
        ]
      },
      {
        id: 'operations_dd_4',
        text: 'How well do you manage marketing compliance and governance?',
        options: [
          { label: 'No compliance processes in place', value: 0 },
          { label: 'Basic awareness of GDPR/CASL requirements', value: 25 },
          { label: 'Consent management and opt-out processes', value: 50 },
          { label: 'Comprehensive compliance program with training', value: 75 },
          { label: 'Enterprise governance with automated compliance monitoring', value: 100 }
        ]
      },
      {
        id: 'operations_dd_5',
        text: 'How mature is your marketing budget planning and tracking?',
        options: [
          { label: 'No budget tracking', value: 0 },
          { label: 'Annual budget with basic tracking', value: 25 },
          { label: 'Monthly budget reviews with variance analysis', value: 50 },
          { label: 'Real-time budget dashboard with forecasting', value: 75 },
          { label: 'Predictive budget optimization with scenario planning', value: 100 }
        ]
      }
    ],
    tech_stack: [
      {
        id: 'tech_stack_dd_1',
        text: 'How well-integrated is your marketing technology stack?',
        options: [
          { label: 'Disparate tools with no integration', value: 0 },
          { label: 'Manual data transfers between systems', value: 25 },
          { label: 'Basic native integrations for core tools', value: 50 },
          { label: 'iPaaS or middleware connecting most systems', value: 75 },
          { label: 'Unified data layer with real-time bidirectional sync', value: 100 }
        ]
      },
      {
        id: 'tech_stack_dd_2',
        text: 'How strategic is your martech selection and vendor management process?',
        options: [
          { label: 'Tools purchased ad-hoc by individuals', value: 0 },
          { label: 'Basic vendor evaluation when needed', value: 25 },
          { label: 'Documented selection criteria and approval process', value: 50 },
          { label: 'Martech roadmap with vendor scorecards', value: 75 },
          { label: 'Enterprise architecture with strategic vendor partnerships', value: 100 }
        ]
      },
      {
        id: 'tech_stack_dd_3',
        text: 'How well do you leverage your martech stack capabilities?',
        options: [
          { label: 'Using less than 20% of tool features', value: 0 },
          { label: 'Basic usage of core features only', value: 25 },
          { label: 'Moderate utilization with some advanced features', value: 50 },
          { label: 'High utilization with regular training and optimization', value: 75 },
          { label: 'Expert-level usage with custom development and APIs', value: 100 }
        ]
      },
      {
        id: 'tech_stack_dd_4',
        text: 'How mature is your marketing analytics and business intelligence capability?',
        options: [
          { label: 'No centralized reporting or analytics', value: 0 },
          { label: 'Basic dashboards in individual tools', value: 25 },
          { label: 'Consolidated dashboard pulling from multiple sources', value: 50 },
          { label: 'Data warehouse with custom BI dashboards', value: 75 },
          { label: 'Real-time analytics with predictive modeling and AI insights', value: 100 }
        ]
      },
      {
        id: 'tech_stack_dd_5',
        text: 'How well do you manage martech licenses, costs, and ROI?',
        options: [
          { label: 'No visibility into martech spend', value: 0 },
          { label: 'Spreadsheet tracking of subscriptions', value: 25 },
          { label: 'Regular license audits and cost reviews', value: 50 },
          { label: 'Usage monitoring with ROI tracking per tool', value: 75 },
          { label: 'Automated SaaS management with optimization recommendations', value: 100 }
        ]
      }
    ],
    abm: [
      {
        id: 'abm_dd_1',
        text: 'How sophisticated is your target account identification and selection?',
        options: [
          { label: 'No formal account selection process', value: 0 },
          { label: 'Sales provides list of target accounts', value: 25 },
          { label: 'Joint sales-marketing account selection with basic criteria', value: 50 },
          { label: 'Data-driven account scoring with predictive models', value: 75 },
          { label: 'AI-powered account identification with intent signals and lookalikes', value: 100 }
        ]
      },
      {
        id: 'abm_dd_2',
        text: 'How deep is your account intelligence and stakeholder mapping?',
        options: [
          { label: 'No account research or mapping', value: 0 },
          { label: 'Basic company information from website', value: 25 },
          { label: 'LinkedIn research identifying key contacts', value: 50 },
          { label: 'Comprehensive stakeholder maps with org charts', value: 75 },
          { label: 'Real-time account intelligence with buying committee insights', value: 100 }
        ]
      },
      {
        id: 'abm_dd_3',
        text: 'How personalized are your account-based campaigns?',
        options: [
          { label: 'Mass campaigns with no personalization', value: 0 },
          { label: 'Company name in subject line', value: 25 },
          { label: 'Industry-specific messaging and content', value: 50 },
          { label: 'Account-specific campaigns with custom content', value: 75 },
          { label: '1:1 personalization with multi-channel orchestration', value: 100 }
        ]
      },
      {
        id: 'abm_dd_4',
        text: 'How well do you orchestrate multi-channel ABM plays?',
        options: [
          { label: 'Email only', value: 0 },
          { label: 'Email + basic LinkedIn outreach', value: 25 },
          { label: 'Coordinated email, social, and content syndication', value: 50 },
          { label: 'Omnichannel plays including direct mail and events', value: 75 },
          { label: 'Sophisticated orchestration with intent-based triggers', value: 100 }
        ]
      },
      {
        id: 'abm_dd_5',
        text: 'How do you measure and optimize ABM performance?',
        options: [
          { label: 'No ABM-specific metrics', value: 0 },
          { label: 'Tracking engagement at account level', value: 25 },
          { label: 'Account progression through funnel stages', value: 50 },
          { label: 'Pipeline and revenue attribution by account tier', value: 75 },
          { label: 'Predictive account health scores with AI-powered optimization', value: 100 }
        ]
      }
    ],
    analytics: [
      {
        id: 'analytics_dd_1',
        text: 'How comprehensive is your marketing attribution model?',
        options: [
          { label: 'No attribution tracking', value: 0 },
          { label: 'Last-touch attribution only', value: 25 },
          { label: 'First and last touch tracking', value: 50 },
          { label: 'Multi-touch attribution with weighted models', value: 75 },
          { label: 'AI-powered algorithmic attribution with incrementality testing', value: 100 }
        ]
      },
      {
        id: 'analytics_dd_2',
        text: 'How mature is your marketing analytics and reporting cadence?',
        options: [
          { label: 'No regular reporting', value: 0 },
          { label: 'Monthly spreadsheet reports', value: 25 },
          { label: 'Weekly dashboards for key metrics', value: 50 },
          { label: 'Real-time dashboards with automated insights', value: 75 },
          { label: 'Predictive analytics with proactive alerts and recommendations', value: 100 }
        ]
      },
      {
        id: 'analytics_dd_3',
        text: 'How well do you track and optimize customer lifetime value (CLV)?',
        options: [
          { label: 'No CLV tracking', value: 0 },
          { label: 'Basic revenue per customer calculation', value: 25 },
          { label: 'CLV estimates by segment', value: 50 },
          { label: 'Predictive CLV models with cohort analysis', value: 75 },
          { label: 'Real-time CLV with AI-powered expansion predictions', value: 100 }
        ]
      },
      {
        id: 'analytics_dd_4',
        text: 'How sophisticated is your pipeline and forecast analytics?',
        options: [
          { label: 'No pipeline visibility', value: 0 },
          { label: 'Basic CRM pipeline reports', value: 25 },
          { label: 'Marketing-sourced pipeline tracking', value: 50 },
          { label: 'Stage conversion analysis with velocity metrics', value: 75 },
          { label: 'Predictive pipeline forecasting with AI-powered win probability', value: 100 }
        ]
      },
      {
        id: 'analytics_dd_5',
        text: 'How data-driven is your marketing decision-making culture?',
        options: [
          { label: 'Decisions based on gut feel and opinions', value: 0 },
          { label: 'Data referenced occasionally in discussions', value: 25 },
          { label: 'Regular data review informing strategy', value: 50 },
          { label: 'Data-first culture with experimentation mindset', value: 75 },
          { label: 'Quantitative rigor with statistical testing and modeling', value: 100 }
        ]
      }
    ],
    team: [
      {
        id: 'team_dd_1',
        text: 'How well-structured is your marketing team organization?',
        options: [
          { label: 'One-person marketing team', value: 0 },
          { label: 'Small team with overlapping responsibilities', value: 25 },
          { label: 'Basic functional structure (content, demand, etc.)', value: 50 },
          { label: 'Specialized roles with clear swim lanes', value: 75 },
          { label: 'Pods or agile squads with cross-functional expertise', value: 100 }
        ]
      },
      {
        id: 'team_dd_2',
        text: 'How mature is your marketing talent development and training program?',
        options: [
          { label: 'No formal training or development', value: 0 },
          { label: 'Ad-hoc external training when requested', value: 25 },
          { label: 'Annual training budget with some courses', value: 50 },
          { label: 'Structured learning paths with certifications', value: 75 },
          { label: 'Marketing academy with mentorship and career progression', value: 100 }
        ]
      },
      {
        id: 'team_dd_3',
        text: 'How effectively do you leverage external resources (agencies, freelancers)?',
        options: [
          { label: 'Everything done in-house with limited capacity', value: 0 },
          { label: 'Occasional freelancer for overflow work', value: 25 },
          { label: 'Agency for specific projects (events, design, etc.)', value: 50 },
          { label: 'Strategic agency partnerships with clear SOWs', value: 75 },
          { label: 'Hybrid model with flexible talent network and optimization', value: 100 }
        ]
      },
      {
        id: 'team_dd_4',
        text: 'How well do you measure and incentivize team performance?',
        options: [
          { label: 'No performance metrics or goals', value: 0 },
          { label: 'Annual reviews with subjective feedback', value: 25 },
          { label: 'Individual KPIs tied to team objectives', value: 50 },
          { label: 'Quarterly OKRs with performance dashboards', value: 75 },
          { label: 'Real-time performance tracking with variable compensation', value: 100 }
        ]
      },
      {
        id: 'team_dd_5',
        text: 'How diverse are the skill sets within your marketing team?',
        options: [
          { label: 'Generalists only with limited specialization', value: 0 },
          { label: 'Basic skills in traditional marketing', value: 25 },
          { label: 'Mix of digital, content, and design skills', value: 50 },
          { label: 'Specialists in analytics, automation, and growth', value: 75 },
          { label: 'Full-stack marketers with technical, creative, and analytical depth', value: 100 }
        ]
      }
    ],
    budget: [
      {
        id: 'budget_dd_1',
        text: 'How sophisticated is your marketing budget allocation strategy?',
        options: [
          { label: 'No formal budget or allocation', value: 0 },
          { label: 'Annual lump sum with ad-hoc spending', value: 25 },
          { label: 'Budget split by channel or campaign type', value: 50 },
          { label: 'Data-driven allocation based on ROI and performance', value: 75 },
          { label: 'Dynamic budget optimization with predictive modeling', value: 100 }
        ]
      },
      {
        id: 'budget_dd_2',
        text: 'How well do you track and measure marketing ROI?',
        options: [
          { label: 'No ROI tracking', value: 0 },
          { label: 'Basic cost per lead calculation', value: 25 },
          { label: 'CAC and payback period tracking', value: 50 },
          { label: 'Full-funnel ROI with attribution modeling', value: 75 },
          { label: 'Incremental ROAS with marketing mix modeling', value: 100 }
        ]
      },
      {
        id: 'budget_dd_3',
        text: 'How flexible is your budget to respond to opportunities or market changes?',
        options: [
          { label: 'Rigid annual budget with no flexibility', value: 0 },
          { label: 'Can request additional funds through approval process', value: 25 },
          { label: 'Quarterly budget reviews with reallocation', value: 50 },
          { label: 'Reserved contingency fund for opportunities', value: 75 },
          { label: 'Dynamic budgeting with real-time optimization', value: 100 }
        ]
      },
      {
        id: 'budget_dd_4',
        text: 'How effectively do you forecast and manage your marketing spend?',
        options: [
          { label: 'No forecasting - reactive spending', value: 0 },
          { label: 'Annual budget plan only', value: 25 },
          { label: 'Quarterly forecasts with variance tracking', value: 50 },
          { label: 'Monthly rolling forecasts with scenario planning', value: 75 },
          { label: 'Real-time spend tracking with predictive alerts', value: 100 }
        ]
      },
      {
        id: 'budget_dd_5',
        text: 'How well do you benchmark your marketing investment against industry standards?',
        options: [
          { label: 'No benchmarking or external comparison', value: 0 },
          { label: 'Aware of general industry statistics', value: 25 },
          { label: 'Annual review of industry benchmarks', value: 50 },
          { label: 'Regular competitive spend analysis and indexing', value: 75 },
          { label: 'Real-time competitive intelligence with investment optimization', value: 100 }
        ]
      }
    ]
  };

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    setCurrentQuestion(0);
    setResponses({});
  };

  const handleAnswer = (questionId, value) => {
    setResponses({
      ...responses,
      [questionId]: value
    });
  };

  const goNext = () => {
    const questions = deepDiveQuestions[selectedTopic.id];
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const goPrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    const questions = deepDiveQuestions[selectedTopic.id];
    
    if (Object.keys(responses).length !== questions.length) {
      alert('Please answer all questions before submitting');
      return;
    }

    setSubmitting(true);

    try {
      const response = await axios.post(`${API}/assessment/submit`, {
        responses: responses,
        tech_tools: []
      });

      localStorage.removeItem('deep_dive_responses');
      localStorage.setItem('latestAssessmentId', response.data.id);
      navigate(`/results/${response.data.id}`);
    } catch (error) {
      console.error('Error submitting deep dive:', error);
      alert('Error submitting assessment. Please try again.');
      setSubmitting(false);
    }
  };

  const isAllAnswered = () => {
    if (!selectedTopic) return false;
    const questions = deepDiveQuestions[selectedTopic.id];
    return Object.keys(responses).length === questions.length;
  };

  if (!selectedTopic) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <button
                onClick={() => navigate('/assessment')}
                className="mb-6 flex items-center gap-2 text-blue-300 hover:text-blue-200 transition-colors mx-auto"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Quick Assessment
              </button>
              <div className="flex items-center justify-center gap-3 mb-4">
                <Compass className="w-12 h-12 text-cyan-400" />
                <h1 className="text-5xl font-bold text-white">Deep Dive Assessments</h1>
              </div>
              <p className="text-xl text-blue-200 mb-3">Explore Specific Terminals</p>
              <p className="text-blue-300 max-w-2xl mx-auto">
                Choose a marketing function to explore in depth with detailed questions that reveal your true capabilities and gaps
              </p>
            </div>

            {/* Topic Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => handleTopicSelect(topic)}
                  className="bg-slate-900/50 border-2 border-blue-900/30 rounded-xl p-6 hover:border-cyan-500/60 hover:shadow-xl hover:shadow-cyan-500/20 transition-all text-left group"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <span className="text-4xl">{topic.emoji}</span>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors mb-2">
                        {topic.name}
                      </h3>
                      <p className="text-sm text-blue-300">{topic.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-blue-400">{deepDiveQuestions[topic.id].length} detailed questions</span>
                    <ChevronRight className="w-5 h-5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              ))}
            </div>

            {/* Info Box */}
            <div className="mt-12 bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border-2 border-cyan-500/30 rounded-xl p-6 text-center">
              <Target className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">Why Deep Dive?</h3>
              <p className="text-blue-200 max-w-2xl mx-auto">
                Deep Dive assessments help you uncover specific strengths and weaknesses within each marketing function. 
                Get detailed insights and targeted recommendations for improvement in your chosen area.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Question View
  const questions = deepDiveQuestions[selectedTopic.id];
  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => setSelectedTopic(null)}
              className="mb-4 flex items-center gap-2 text-blue-300 hover:text-blue-200 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Topics
            </button>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{selectedTopic.emoji}</span>
              <h1 className="text-3xl font-bold text-white">{selectedTopic.name}</h1>
            </div>
            <p className="text-blue-300">{selectedTopic.description}</p>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-blue-300 mb-2">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <div className="w-full bg-slate-800/50 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-slate-900/50 border-2 border-blue-900/30 rounded-xl p-8 mb-6">
            <h2 className="text-2xl font-bold text-white mb-6">{currentQ.text}</h2>
            <div className="space-y-3">
              {currentQ.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(currentQ.id, option.value)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    responses[currentQ.id] === option.value
                      ? 'border-cyan-500 bg-cyan-500/20 shadow-lg shadow-cyan-500/20'
                      : 'border-blue-900/30 bg-slate-800/30 hover:border-blue-700/50 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-blue-100">{option.label}</span>
                    <span className={`text-sm font-semibold px-2 py-1 rounded ${
                      responses[currentQ.id] === option.value
                        ? 'bg-cyan-600 text-white'
                        : 'bg-slate-700 text-blue-300'
                    }`}>
                      {option.value}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={goPrev}
              disabled={currentQuestion === 0}
              className="px-6 py-3 bg-slate-800 text-blue-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700 transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </button>

            {currentQuestion < questions.length - 1 ? (
              <button
                onClick={goNext}
                disabled={!responses[currentQ.id] && responses[currentQ.id] !== 0}
                className="px-6 py-3 bg-cyan-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-cyan-700 transition-colors flex items-center gap-2"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!isAllAnswered() || submitting}
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-cyan-600 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-green-700 hover:to-cyan-700 transition-colors flex items-center gap-2 shadow-lg"
              >
                {submitting ? 'Submitting...' : 'Complete Deep Dive'}
                <Send className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Status Message */}
          {isAllAnswered() && currentQuestion === questions.length - 1 && (
            <div className="mt-6 bg-green-900/20 border border-green-500/30 rounded-lg p-4 text-center">
              <p className="text-green-300 font-semibold">All questions answered! Ready to submit your deep dive assessment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeepDivePage;
