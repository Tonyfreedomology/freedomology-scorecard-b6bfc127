
import { Pillar } from '../types/assessment';
import { selfRelationshipCategory } from './relationships/selfRelationship';
import { relationshipsWithOthersCategory } from './relationships/relationshipsWithOthers';
import { spiritualCategory } from './relationships/spiritual';

export const relationshipsPillar: Pillar = {
  name: 'Relationships',
  color: '#EF3E36',
  categories: [
    selfRelationshipCategory,
    relationshipsWithOthersCategory,
    spiritualCategory,
  ],
};
