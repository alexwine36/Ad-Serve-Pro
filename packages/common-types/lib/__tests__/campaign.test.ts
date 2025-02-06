import { describe, expect, it } from 'vitest';
import {
  CampaignStatus,
  type FormatCampaignPickedTypes,
  formatCampaignInput,
} from '../campaign';

describe('formatCampaignInput', () => {
  it('should return DRAFT status if input status is not READY', () => {
    const input: FormatCampaignPickedTypes = {
      startDate: new Date(),
      endDate: new Date(),
      status: 'DRAFT',
    };
    const result = formatCampaignInput(input);
    expect(result.status).toBe(CampaignStatus.enum.DRAFT);
  });

  it('should return ACTIVE status if input status is READY and current date is within start and end date', () => {
    const input: FormatCampaignPickedTypes = {
      startDate: new Date(Date.now() - 1000),
      endDate: new Date(Date.now() + 1000),
      status: 'READY',
    };
    const result = formatCampaignInput(input);
    expect(result.status).toBe(CampaignStatus.enum.ACTIVE);
  });

  it('should return SCHEDULED status if input status is READY and start date is in the future', () => {
    const input: FormatCampaignPickedTypes = {
      startDate: new Date(Date.now() + 1000),
      endDate: new Date(Date.now() + 2000),
      status: 'READY',
    };
    const result = formatCampaignInput(input);
    expect(result.status).toBe(CampaignStatus.enum.SCHEDULED);
  });

  it('should return COMPLETED status if input status is READY and end date is in the past', () => {
    const input: FormatCampaignPickedTypes = {
      startDate: new Date(Date.now() - 2000),
      endDate: new Date(Date.now() - 1000),
      status: 'READY',
    };
    const result = formatCampaignInput(input);
    expect(result.status).toBe(CampaignStatus.enum.COMPLETED);
  });

  it('should return the same status if input status is not READY', () => {
    const input: FormatCampaignPickedTypes = {
      startDate: new Date(),
      endDate: new Date(),
      status: 'PAUSED',
    };
    const result = formatCampaignInput(input);
    expect(result.status).toBe(CampaignStatus.enum.PAUSED);
  });
});
