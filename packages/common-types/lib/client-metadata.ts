import { BrowserType, CPU, Device } from 'ua-parser-js/enums';
import { z } from 'zod';
import { getZodEnumFromObjectValues } from './utils';

const BrowserTypeEnum = getZodEnumFromObjectValues(BrowserType);
const CpuArchitectureEnum = getZodEnumFromObjectValues(CPU);
const DeviceTypeEnum = getZodEnumFromObjectValues(Device);
// const DeviceVendorEnum = getZodEnumFromObjectValues(Vendor);

export const ClientMetadataV1 = z.object({
  version: z.literal('1').default('1'),
  userAgent: z.string().optional(),
  browser: z
    .object({
      name: z.string().optional(),
      version: z.string().optional(),
      major: z.string().optional(),
      type: BrowserTypeEnum.optional(),
    })
    .default({}),
  cpu: z
    .object({
      architecture: CpuArchitectureEnum.optional(),
    })
    .default({}),
  device: z
    .object({
      model: z.string().optional(),
      type: DeviceTypeEnum.optional(),
      vendor: z.string().optional(),
    })
    .default({}),
  os: z
    .object({
      name: z.string().optional(),
      version: z.string().optional(),
    })
    .default({}),
});

// Placeholder for future versions
export const ClientMetadata = ClientMetadataV1;
export type ClientMetadata = z.infer<typeof ClientMetadata>;
