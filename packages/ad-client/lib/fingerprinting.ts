// Import a stable hashing function
import { CacheEntry } from './cache';
import { murmur3 } from './hash';

export class BrowserFingerprint {
  fingerprintCache: CacheEntry<string | number>;
  componentCache: CacheEntry<
    Awaited<ReturnType<BrowserFingerprint['gatherComponents']>>
  >;

  constructor() {
    this.fingerprintCache = new CacheEntry('fingerprint', () => {
      return this.generateFingerprint();
    });
    this.componentCache = new CacheEntry('fingerprint-components', () => {
      return this.gatherComponents();
    });
  }

  getFingerprint() {
    return this.fingerprintCache.get();
  }

  getComponents() {
    return this.componentCache.get();
  }

  private async generateFingerprint() {
    const components = await this.getComponents();
    // Create a stable hash of all components
    return murmur3(components);
  }

  private async gatherComponents() {
    return {
      // Standard navigator properties
      userAgent: navigator.userAgent,
      language: navigator.language,
      languages: navigator.languages,
      platform: navigator.platform,
      hardwareConcurrency: navigator.hardwareConcurrency,
      deviceMemory: navigator.deviceMemory,

      // Screen properties
      screenResolution: `${screen.width}x${screen.height}`,
      screenDepth: screen.colorDepth,
      screenOrientation: screen.orientation?.type,

      // Browser capabilities
      cookiesEnabled: navigator.cookieEnabled,
      doNotTrack: navigator.doNotTrack,

      // Time and locale information
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timezoneOffset: new Date().getTimezoneOffset(),

      // Canvas fingerprint
      canvasFingerprint: this.getCanvasFingerprint(),

      // Audio fingerprint
      audioFingerprint: this.getAudioFingerprint(),

      // WebGL information
      webglFingerprint: this.getWebGLFingerprint(),

      // Font detection
      fonts: await this.detectFonts(),

      // Feature detection
      features: this.detectFeatures(),

      // Connection information
      connection: this.getConnectionInfo(),
    };
  }

  private getCanvasFingerprint() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Draw various shapes and text
    canvas.width = 200;
    canvas.height = 50;
    if (ctx) {
      ctx.textBaseline = 'top';
      ctx.font = '14px Arial';
      ctx.textBaseline = 'alphabetic';
      ctx.fillStyle = '#f60';
      ctx.fillRect(125, 1, 62, 20);
      ctx.fillStyle = '#069';
      ctx.fillText('Browser Fingerprint', 2, 15);
      ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
      ctx.fillText('Canvas Test', 4, 17);
    }

    return canvas.toDataURL();
  }

  private getAudioFingerprint() {
    try {
      const audioContext = new (
        window.AudioContext || window.webkitAudioContext
      )();
      const oscillator = audioContext.createOscillator();
      const analyser = audioContext.createAnalyser();
      const gain = audioContext.createGain();

      oscillator.connect(analyser);
      analyser.connect(gain);
      gain.connect(audioContext.destination);

      oscillator.type = 'triangle';
      gain.gain.value = 0; // Muted
      oscillator.frequency.value = 10000;

      oscillator.start(0);

      const buffer = new Float32Array(analyser.frequencyBinCount);
      analyser.getFloatFrequencyData(buffer);

      oscillator.stop();
      audioContext.close();

      return buffer.slice(0, 10).join(',');
    } catch (e) {
      return null;
    }
  }

  private getWebGLFingerprint() {
    const canvas = document.createElement('canvas');
    let gl: WebGLRenderingContext | null;
    try {
      gl =
        canvas.getContext('webgl') ||
        (canvas.getContext('experimental-webgl') as WebGLRenderingContext);
    } catch (e) {
      return null;
    }
    if (!gl) return null;

    return {
      vendor: gl.getParameter(gl.VENDOR),
      renderer: gl.getParameter(gl.RENDERER),
      webglVersion: gl.getParameter(gl.VERSION),
      shadingLanguageVersion: gl.getParameter(gl.SHADING_LANGUAGE_VERSION),
      extensions: gl.getSupportedExtensions(),
    };
  }

  private async detectFonts() {
    // List of fonts to test
    const fontList = [
      'Arial',
      'Times New Roman',
      'Courier New',
      'Georgia',
      'Verdana',
      'Helvetica',
      'Comic Sans MS',
      'Impact',
      'Tahoma',
      'Trebuchet MS',
    ];

    const available = [];

    // Use FontFace API if available
    if ('FontFace' in window) {
      for (const font of fontList) {
        try {
          const fontFace = new FontFace('testFont', `local(${font})`);
          const loaded = await fontFace.load();
          if (loaded) available.push(font);
        } catch (e) {
          // Font not available
        }
      }
    }

    return available;
  }

  detectFeatures() {
    return {
      localStorage: !!window.localStorage,
      sessionStorage: !!window.sessionStorage,
      indexedDB: !!window.indexedDB,
      addBehavior: !!document.body.addBehavior,
      openDatabase: !!window.openDatabase,
      cpuClass: navigator.cpuClass,
      webdriver: navigator.webdriver,
      webglVendor: this.getWebGLVendor(),
      adBlock: this.detectAdBlock(),
      touchPoints: navigator.maxTouchPoints,
      productSub: navigator.productSub,
      // biome-ignore lint/security/noGlobalEval: <explanation>
      emptyEvalLength: eval.toString().length,
    };
  }

  getConnectionInfo() {
    const connection =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection;

    if (connection) {
      return {
        type: connection.type,
        effectiveType: connection.effectiveType,
        downlinkMax: connection.downlinkMax,
        rtt: connection.rtt,
      };
    }

    return null;
  }

  detectAdBlock() {
    const test = document.createElement('div');
    test.innerHTML = '&nbsp;';
    test.className = 'adsbox';
    document.body.appendChild(test);
    const blocked = test.offsetHeight === 0;
    document.body.removeChild(test);
    return blocked;
  }

  private getWebGLVendor() {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl');
      return gl?.getParameter(gl.VENDOR);
    } catch (e) {
      return null;
    }
  }
}
