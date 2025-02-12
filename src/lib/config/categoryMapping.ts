
export const categoryToPillarMapping: Record<string, { pillar: string; displayName: string }> = {
  'Mental Health': { pillar: 'Health', displayName: 'Mental Health' },
  'Physical Health': { pillar: 'Health', displayName: 'Physical Health' },
  'Environmental Health': { pillar: 'Health', displayName: 'Environmental Health' },
  'Income': { pillar: 'Financial', displayName: 'Income' },
  'Independence': { pillar: 'Financial', displayName: 'Independence' },
  'Impact': { pillar: 'Financial', displayName: 'Impact' },
  'Relationships with Others': { pillar: 'Relationships', displayName: 'Relationships with Others' },
  'Relationship with Self': { pillar: 'Relationships', displayName: 'Relationship with Self' },
  'Relationship with God': { pillar: 'Relationships', displayName: 'Relationship with God' }
};

export const pillarColors = {
  'Health': '#EDB88B',
  'Financial': '#17BEBB',
  'Relationships': '#EF3E36'
} as const;

export const pillarOrder = ['Health', 'Financial', 'Relationships'] as const;
