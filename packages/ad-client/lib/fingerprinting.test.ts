import { beforeEach } from 'vitest';
import { BrowserFingerprint } from './fingerprinting';
// vi.stubGlobal('screen.orientation', { type: 'landscape-primary' });

describe('Fingerprinting', () => {
  let fingerprinter: BrowserFingerprint;

  beforeEach(() => {
    fingerprinter = new BrowserFingerprint();
  });

  test('should generate a fingerprint', async () => {
    const fingerprint = await fingerprinter.getFingerprint();
    expect(fingerprint).toBeDefined();
    expect(typeof fingerprint).toBe('string');
  });

  test('should gather components', async () => {
    const components = await fingerprinter.getComponents();

    expect(components).toBeDefined();
    expect(components).toHaveProperty('userAgent');
    expect(components).toHaveProperty('language');
    expect(components).toHaveProperty('languages');
    expect(components).toHaveProperty('platform');
    expect(components).toHaveProperty('hardwareConcurrency');
    // expect(components).toHaveProperty('deviceMemory');
    expect(components).toHaveProperty('screenResolution');
    expect(components).toHaveProperty('screenDepth');
    // expect(components).toHaveProperty('screenOrientation');
    expect(components).toHaveProperty('cookiesEnabled');
    // expect(components).toHaveProperty('doNotTrack');
    expect(components).toHaveProperty('timezone');
    expect(components).toHaveProperty('timezoneOffset');
    expect(components).toHaveProperty('canvasFingerprint');
    expect(components).toHaveProperty('audioFingerprint');
    expect(components).toHaveProperty('webglFingerprint');
    expect(components).toHaveProperty('fonts');
    expect(components).toHaveProperty('features');
    expect(components).toHaveProperty('connection');
  });

  test('should detect features', () => {
    const features = fingerprinter.detectFeatures();
    expect(features).toBeDefined();
    expect(features).toHaveProperty('localStorage');
    expect(features).toHaveProperty('sessionStorage');
    expect(features).toHaveProperty('indexedDB');
    expect(features).toHaveProperty('addBehavior');
    expect(features).toHaveProperty('openDatabase');
    expect(features).toHaveProperty('cpuClass');
    expect(features).toHaveProperty('webdriver');
    expect(features).toHaveProperty('webglVendor');
    expect(features).toHaveProperty('adBlock');
    expect(features).toHaveProperty('touchPoints');
    expect(features).toHaveProperty('productSub');
    expect(features).toHaveProperty('emptyEvalLength');
  });

  test('should detect ad block', () => {
    const adBlock = fingerprinter.detectAdBlock();
    expect(adBlock).toBeDefined();
    expect(typeof adBlock).toBe('boolean');
  });

  test('should get connection info', () => {
    const connectionInfo = fingerprinter.getConnectionInfo();
    if (connectionInfo) {
      expect(connectionInfo).toHaveProperty('type');
      expect(connectionInfo).toHaveProperty('effectiveType');
      expect(connectionInfo).toHaveProperty('downlinkMax');
      expect(connectionInfo).toHaveProperty('rtt');
    } else {
      expect(connectionInfo).toBeNull();
    }
  });
});
