import {
  campaignUpdateStatusCronFunction,
  campaignUpdateStatusFunction,
} from './update-status';

export const campaignFunctions = [
  // FunctionArray
  campaignUpdateStatusFunction,
  campaignUpdateStatusCronFunction,
];
