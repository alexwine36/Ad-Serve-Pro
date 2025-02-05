'use client';
var Qr = Object.create;
var or = Object.defineProperty;
var Kr = Object.getOwnPropertyDescriptor;
var ei = Object.getOwnPropertyNames;
var ti = Object.getPrototypeOf,
  ri = Object.prototype.hasOwnProperty;
var ii = (r, e) => () => (e || r((e = { exports: {} }).exports, e), e.exports);
var ai = (r, e, t, i) => {
  if ((e && typeof e == 'object') || typeof e == 'function')
    for (const a of ei(e))
      !ri.call(r, a) &&
        a !== t &&
        or(r, a, {
          get: () => e[a],
          enumerable: !(i = Kr(e, a)) || i.enumerable,
        });
  return r;
};
var ni = (r, e, t) => (
  (t = r != null ? Qr(ti(r)) : {}),
  ai(
    e || !r || !r.__esModule
      ? or(t, 'default', { value: r, enumerable: !0 })
      : t,
    r
  )
);
var Gr = ii(() => {
  var We = class extends Event {
      constructor(e = {}) {
        super('urlchangeevent', { cancelable: !0, ...e }),
          (this.newURL = e.newURL),
          (this.oldURL = e.oldURL),
          (this.action = e.action);
      }
      get [Symbol.toStringTag]() {
        return 'UrlChangeEvent';
      }
    },
    La = window.history.pushState.bind(window.history);
  window.history.pushState = (r, e, t) => {
    const i = new URL(t || '', window.location.href);
    window.dispatchEvent(
      new We({ newURL: i, oldURL: ft, action: 'pushState' })
    ) && (La({ _index: lt + 1, ...r }, e, t), It());
  };
  var Wr = window.history.replaceState.bind(window.history);
  window.history.replaceState = (r, e, t) => {
    const i = new URL(t || '', window.location.href);
    window.dispatchEvent(
      new We({ newURL: i, oldURL: ft, action: 'replaceState' })
    ) && (Wr({ _index: lt, ...r }, e, t), It());
  };
  var ft, lt;
  function qr() {
    const r = window.history.state;
    (!r || typeof r._index != 'number') &&
      Wr({ _index: window.history.length, ...r }, null, null);
  }
  function It() {
    (ft = new URL(window.location.href)), (lt = window.history.state._index);
  }
  qr();
  It();
  window.addEventListener('popstate', (r) => {
    qr();
    const e = window.history.state._index,
      t = new URL(window.location);
    if (e === lt) {
      r.stopImmediatePropagation();
      return;
    }
    if (
      !window.dispatchEvent(
        new We({ oldURL: ft, newURL: t, action: 'popstate' })
      )
    ) {
      r.stopImmediatePropagation(), window.history.go(lt - e);
      return;
    }
    It();
  });
  window.addEventListener('beforeunload', (r) => {
    if (
      !window.dispatchEvent(
        new We({ oldURL: ft, newURL: null, action: 'beforeunload' })
      )
    ) {
      r.preventDefault();
      const t = 'o/';
      return (r.returnValue = t), t;
    }
  });
});
function cr(r, e, t) {
  const i = (a) => r(a, ...e);
  return t === void 0 ? i : Object.assign(i, { lazy: t, lazyArgs: e });
}
function dr(r, e, t) {
  const i = r.length - e.length;
  if (i === 0) return r(...e);
  if (i === 1) return cr(r, e, t);
  throw new Error('Wrong number of arguments');
}
function Pt(...r) {
  return dr(si, r);
}
function si(r, e) {
  const t = {};
  for (const [i, a] of Object.entries(r)) e(a, i, r) && (t[i] = a);
  return t;
}
var ur = { VERCEL_URL: 'localhost:3000' };
var E;
((r) => {
  r.assertEqual = (a) => a;
  function e(a) {}
  r.assertIs = e;
  function t(a) {
    throw new Error();
  }
  (r.assertNever = t),
    (r.arrayToEnum = (a) => {
      const n = {};
      for (const s of a) n[s] = s;
      return n;
    }),
    (r.getValidEnumValues = (a) => {
      const n = r.objectKeys(a).filter((o) => typeof a[a[o]] != 'number'),
        s = {};
      for (const o of n) s[o] = a[o];
      return r.objectValues(s);
    }),
    (r.objectValues = (a) => r.objectKeys(a).map((n) => a[n])),
    (r.objectKeys =
      typeof Object.keys == 'function'
        ? (a) => Object.keys(a)
        : (a) => {
            const n = [];
            for (const s in a)
              Object.prototype.hasOwnProperty.call(a, s) && n.push(s);
            return n;
          }),
    (r.find = (a, n) => {
      for (const s of a) if (n(s)) return s;
    }),
    (r.isInteger =
      typeof Number.isInteger == 'function'
        ? (a) => Number.isInteger(a)
        : (a) => typeof a == 'number' && isFinite(a) && Math.floor(a) === a);
  function i(a, n = ' | ') {
    return a.map((s) => (typeof s == 'string' ? `'${s}'` : s)).join(n);
  }
  (r.joinValues = i),
    (r.jsonStringifyReplacer = (a, n) =>
      typeof n == 'bigint' ? n.toString() : n);
})(E || (E = {}));
var Dt;
((r) => {
  r.mergeShapes = (e, t) => ({ ...e, ...t });
})(Dt || (Dt = {}));
var v = E.arrayToEnum([
    'string',
    'nan',
    'number',
    'integer',
    'float',
    'boolean',
    'date',
    'bigint',
    'symbol',
    'function',
    'undefined',
    'null',
    'array',
    'object',
    'unknown',
    'promise',
    'void',
    'never',
    'map',
    'set',
  ]),
  J = (r) => {
    switch (typeof r) {
      case 'undefined':
        return v.undefined;
      case 'string':
        return v.string;
      case 'number':
        return isNaN(r) ? v.nan : v.number;
      case 'boolean':
        return v.boolean;
      case 'function':
        return v.function;
      case 'bigint':
        return v.bigint;
      case 'symbol':
        return v.symbol;
      case 'object':
        return Array.isArray(r)
          ? v.array
          : r === null
            ? v.null
            : r.then &&
                typeof r.then == 'function' &&
                r.catch &&
                typeof r.catch == 'function'
              ? v.promise
              : typeof Map < 'u' && r instanceof Map
                ? v.map
                : typeof Set < 'u' && r instanceof Set
                  ? v.set
                  : typeof Date < 'u' && r instanceof Date
                    ? v.date
                    : v.object;
      default:
        return v.unknown;
    }
  },
  h = E.arrayToEnum([
    'invalid_type',
    'invalid_literal',
    'custom',
    'invalid_union',
    'invalid_union_discriminator',
    'invalid_enum_value',
    'unrecognized_keys',
    'invalid_arguments',
    'invalid_return_type',
    'invalid_date',
    'invalid_string',
    'too_small',
    'too_big',
    'invalid_intersection_types',
    'not_multiple_of',
    'not_finite',
  ]),
  oi = (r) => JSON.stringify(r, null, 2).replace(/"([^"]+)":/g, '$1:'),
  j = class r extends Error {
    get errors() {
      return this.issues;
    }
    constructor(e) {
      super(),
        (this.issues = []),
        (this.addIssue = (i) => {
          this.issues = [...this.issues, i];
        }),
        (this.addIssues = (i = []) => {
          this.issues = [...this.issues, ...i];
        });
      const t = new.target.prototype;
      Object.setPrototypeOf
        ? Object.setPrototypeOf(this, t)
        : (this.__proto__ = t),
        (this.name = 'ZodError'),
        (this.issues = e);
    }
    format(e) {
      const t = e || ((n) => n.message),
        i = { _errors: [] },
        a = (n) => {
          for (const s of n.issues)
            if (s.code === 'invalid_union') s.unionErrors.map(a);
            else if (s.code === 'invalid_return_type') a(s.returnTypeError);
            else if (s.code === 'invalid_arguments') a(s.argumentsError);
            else if (s.path.length === 0) i._errors.push(t(s));
            else {
              let o = i,
                c = 0;
              while (c < s.path.length) {
                const f = s.path[c];
                c === s.path.length - 1
                  ? ((o[f] = o[f] || { _errors: [] }), o[f]._errors.push(t(s)))
                  : (o[f] = o[f] || { _errors: [] }),
                  (o = o[f]),
                  c++;
              }
            }
        };
      return a(this), i;
    }
    static assert(e) {
      if (!(e instanceof r)) throw new Error(`Not a ZodError: ${e}`);
    }
    toString() {
      return this.message;
    }
    get message() {
      return JSON.stringify(this.issues, E.jsonStringifyReplacer, 2);
    }
    get isEmpty() {
      return this.issues.length === 0;
    }
    flatten(e = (t) => t.message) {
      const t = {},
        i = [];
      for (const a of this.issues)
        a.path.length > 0
          ? ((t[a.path[0]] = t[a.path[0]] || []), t[a.path[0]].push(e(a)))
          : i.push(e(a));
      return { formErrors: i, fieldErrors: t };
    }
    get formErrors() {
      return this.flatten();
    }
  };
j.create = (r) => new j(r);
var Le = (r, e) => {
    let t;
    switch (r.code) {
      case h.invalid_type:
        r.received === v.undefined
          ? (t = 'Required')
          : (t = `Expected ${r.expected}, received ${r.received}`);
        break;
      case h.invalid_literal:
        t = `Invalid literal value, expected ${JSON.stringify(r.expected, E.jsonStringifyReplacer)}`;
        break;
      case h.unrecognized_keys:
        t = `Unrecognized key(s) in object: ${E.joinValues(r.keys, ', ')}`;
        break;
      case h.invalid_union:
        t = 'Invalid input';
        break;
      case h.invalid_union_discriminator:
        t = `Invalid discriminator value. Expected ${E.joinValues(r.options)}`;
        break;
      case h.invalid_enum_value:
        t = `Invalid enum value. Expected ${E.joinValues(r.options)}, received '${r.received}'`;
        break;
      case h.invalid_arguments:
        t = 'Invalid function arguments';
        break;
      case h.invalid_return_type:
        t = 'Invalid function return type';
        break;
      case h.invalid_date:
        t = 'Invalid date';
        break;
      case h.invalid_string:
        typeof r.validation == 'object'
          ? 'includes' in r.validation
            ? ((t = `Invalid input: must include "${r.validation.includes}"`),
              typeof r.validation.position == 'number' &&
                (t = `${t} at one or more positions greater than or equal to ${r.validation.position}`))
            : 'startsWith' in r.validation
              ? (t = `Invalid input: must start with "${r.validation.startsWith}"`)
              : 'endsWith' in r.validation
                ? (t = `Invalid input: must end with "${r.validation.endsWith}"`)
                : E.assertNever(r.validation)
          : r.validation !== 'regex'
            ? (t = `Invalid ${r.validation}`)
            : (t = 'Invalid');
        break;
      case h.too_small:
        r.type === 'array'
          ? (t = `Array must contain ${r.exact ? 'exactly' : r.inclusive ? 'at least' : 'more than'} ${r.minimum} element(s)`)
          : r.type === 'string'
            ? (t = `String must contain ${r.exact ? 'exactly' : r.inclusive ? 'at least' : 'over'} ${r.minimum} character(s)`)
            : r.type === 'number'
              ? (t = `Number must be ${r.exact ? 'exactly equal to ' : r.inclusive ? 'greater than or equal to ' : 'greater than '}${r.minimum}`)
              : r.type === 'date'
                ? (t = `Date must be ${r.exact ? 'exactly equal to ' : r.inclusive ? 'greater than or equal to ' : 'greater than '}${new Date(Number(r.minimum))}`)
                : (t = 'Invalid input');
        break;
      case h.too_big:
        r.type === 'array'
          ? (t = `Array must contain ${r.exact ? 'exactly' : r.inclusive ? 'at most' : 'less than'} ${r.maximum} element(s)`)
          : r.type === 'string'
            ? (t = `String must contain ${r.exact ? 'exactly' : r.inclusive ? 'at most' : 'under'} ${r.maximum} character(s)`)
            : r.type === 'number'
              ? (t = `Number must be ${r.exact ? 'exactly' : r.inclusive ? 'less than or equal to' : 'less than'} ${r.maximum}`)
              : r.type === 'bigint'
                ? (t = `BigInt must be ${r.exact ? 'exactly' : r.inclusive ? 'less than or equal to' : 'less than'} ${r.maximum}`)
                : r.type === 'date'
                  ? (t = `Date must be ${r.exact ? 'exactly' : r.inclusive ? 'smaller than or equal to' : 'smaller than'} ${new Date(Number(r.maximum))}`)
                  : (t = 'Invalid input');
        break;
      case h.custom:
        t = 'Invalid input';
        break;
      case h.invalid_intersection_types:
        t = 'Intersection results could not be merged';
        break;
      case h.not_multiple_of:
        t = `Number must be a multiple of ${r.multipleOf}`;
        break;
      case h.not_finite:
        t = 'Number must be finite';
        break;
      default:
        (t = e.defaultError), E.assertNever(r);
    }
    return { message: t };
  },
  mr = Le;
function ci(r) {
  mr = r;
}
function mt() {
  return mr;
}
var pt = (r) => {
    const { data: e, path: t, errorMaps: i, issueData: a } = r,
      n = [...t, ...(a.path || [])],
      s = { ...a, path: n };
    if (a.message !== void 0) return { ...a, path: n, message: a.message };
    let o = '',
      c = i
        .filter((f) => !!f)
        .slice()
        .reverse();
    for (const f of c) o = f(s, { data: e, defaultError: o }).message;
    return { ...a, path: n, message: o };
  },
  di = [];
function g(r, e) {
  const t = mt(),
    i = pt({
      issueData: e,
      data: r.data,
      path: r.path,
      errorMaps: [
        r.common.contextualErrorMap,
        r.schemaErrorMap,
        t,
        t === Le ? void 0 : Le,
      ].filter((a) => !!a),
    });
  r.common.issues.push(i);
}
var O = class r {
    constructor() {
      this.value = 'valid';
    }
    dirty() {
      this.value === 'valid' && (this.value = 'dirty');
    }
    abort() {
      this.value !== 'aborted' && (this.value = 'aborted');
    }
    static mergeArray(e, t) {
      const i = [];
      for (const a of t) {
        if (a.status === 'aborted') return _;
        a.status === 'dirty' && e.dirty(), i.push(a.value);
      }
      return { status: e.value, value: i };
    }
    static async mergeObjectAsync(e, t) {
      const i = [];
      for (const a of t) {
        const n = await a.key,
          s = await a.value;
        i.push({ key: n, value: s });
      }
      return r.mergeObjectSync(e, i);
    }
    static mergeObjectSync(e, t) {
      const i = {};
      for (const a of t) {
        const { key: n, value: s } = a;
        if (n.status === 'aborted' || s.status === 'aborted') return _;
        n.status === 'dirty' && e.dirty(),
          s.status === 'dirty' && e.dirty(),
          n.value !== '__proto__' &&
            (typeof s.value < 'u' || a.alwaysSet) &&
            (i[n.value] = s.value);
      }
      return { status: e.value, value: i };
    }
  },
  _ = Object.freeze({ status: 'aborted' }),
  Ie = (r) => ({ status: 'dirty', value: r }),
  I = (r) => ({ status: 'valid', value: r }),
  Zt = (r) => r.status === 'aborted',
  zt = (r) => r.status === 'dirty',
  le = (r) => r.status === 'valid',
  Ye = (r) => typeof Promise < 'u' && r instanceof Promise;
function ht(r, e, t, i) {
  if (t === 'a' && !i)
    throw new TypeError('Private accessor was defined without a getter');
  if (typeof e == 'function' ? r !== e || !i : !e.has(r))
    throw new TypeError(
      'Cannot read private member from an object whose class did not declare it'
    );
  return t === 'm' ? i : t === 'a' ? i.call(r) : i ? i.value : e.get(r);
}
function pr(r, e, t, i, a) {
  if (i === 'm') throw new TypeError('Private method is not writable');
  if (i === 'a' && !a)
    throw new TypeError('Private accessor was defined without a setter');
  if (typeof e == 'function' ? r !== e || !a : !e.has(r))
    throw new TypeError(
      'Cannot write private member to an object whose class did not declare it'
    );
  return i === 'a' ? a.call(r, t) : a ? (a.value = t) : e.set(r, t), t;
}
var w;
((r) => {
  (r.errToObj = (e) => (typeof e == 'string' ? { message: e } : e || {})),
    (r.toString = (e) => (typeof e == 'string' ? e : e?.message));
})(w || (w = {}));
var Ge,
  Je,
  z = class {
    constructor(e, t, i, a) {
      (this._cachedPath = []),
        (this.parent = e),
        (this.data = t),
        (this._path = i),
        (this._key = a);
    }
    get path() {
      return (
        this._cachedPath.length ||
          (this._key instanceof Array
            ? this._cachedPath.push(...this._path, ...this._key)
            : this._cachedPath.push(...this._path, this._key)),
        this._cachedPath
      );
    }
  },
  lr = (r, e) => {
    if (le(e)) return { success: !0, data: e.value };
    if (!r.common.issues.length)
      throw new Error('Validation failed but no issues detected.');
    return {
      success: !1,
      get error() {
        if (this._error) return this._error;
        const t = new j(r.common.issues);
        return (this._error = t), this._error;
      },
    };
  };
function x(r) {
  if (!r) return {};
  const {
    errorMap: e,
    invalid_type_error: t,
    required_error: i,
    description: a,
  } = r;
  if (e && (t || i))
    throw new Error(
      `Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`
    );
  return e
    ? { errorMap: e, description: a }
    : {
        errorMap: (s, o) => {
          var c, f;
          const { message: y } = r;
          return s.code === 'invalid_enum_value'
            ? { message: y ?? o.defaultError }
            : typeof o.data > 'u'
              ? {
                  message:
                    (c = y ?? i) !== null && c !== void 0 ? c : o.defaultError,
                }
              : s.code !== 'invalid_type'
                ? { message: o.defaultError }
                : {
                    message:
                      (f = y ?? t) !== null && f !== void 0
                        ? f
                        : o.defaultError,
                  };
        },
        description: a,
      };
}
var k = class {
    get description() {
      return this._def.description;
    }
    _getType(e) {
      return J(e.data);
    }
    _getOrReturnCtx(e, t) {
      return (
        t || {
          common: e.parent.common,
          data: e.data,
          parsedType: J(e.data),
          schemaErrorMap: this._def.errorMap,
          path: e.path,
          parent: e.parent,
        }
      );
    }
    _processInputParams(e) {
      return {
        status: new O(),
        ctx: {
          common: e.parent.common,
          data: e.data,
          parsedType: J(e.data),
          schemaErrorMap: this._def.errorMap,
          path: e.path,
          parent: e.parent,
        },
      };
    }
    _parseSync(e) {
      const t = this._parse(e);
      if (Ye(t)) throw new Error('Synchronous parse encountered promise.');
      return t;
    }
    _parseAsync(e) {
      const t = this._parse(e);
      return Promise.resolve(t);
    }
    parse(e, t) {
      const i = this.safeParse(e, t);
      if (i.success) return i.data;
      throw i.error;
    }
    safeParse(e, t) {
      var i;
      const a = {
          common: {
            issues: [],
            async: (i = t?.async) !== null && i !== void 0 ? i : !1,
            contextualErrorMap: t?.errorMap,
          },
          path: t?.path || [],
          schemaErrorMap: this._def.errorMap,
          parent: null,
          data: e,
          parsedType: J(e),
        },
        n = this._parseSync({ data: e, path: a.path, parent: a });
      return lr(a, n);
    }
    '~validate'(e) {
      var t, i;
      const a = {
        common: { issues: [], async: !!this['~standard'].async },
        path: [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data: e,
        parsedType: J(e),
      };
      if (!this['~standard'].async)
        try {
          const n = this._parseSync({ data: e, path: [], parent: a });
          return le(n) ? { value: n.value } : { issues: a.common.issues };
        } catch (n) {
          !(
            (i =
              (t = n?.message) === null || t === void 0
                ? void 0
                : t.toLowerCase()) === null || i === void 0
          ) &&
            i.includes('encountered') &&
            (this['~standard'].async = !0),
            (a.common = { issues: [], async: !0 });
        }
      return this._parseAsync({ data: e, path: [], parent: a }).then((n) =>
        le(n) ? { value: n.value } : { issues: a.common.issues }
      );
    }
    async parseAsync(e, t) {
      const i = await this.safeParseAsync(e, t);
      if (i.success) return i.data;
      throw i.error;
    }
    async safeParseAsync(e, t) {
      const i = {
          common: { issues: [], contextualErrorMap: t?.errorMap, async: !0 },
          path: t?.path || [],
          schemaErrorMap: this._def.errorMap,
          parent: null,
          data: e,
          parsedType: J(e),
        },
        a = this._parse({ data: e, path: i.path, parent: i }),
        n = await (Ye(a) ? a : Promise.resolve(a));
      return lr(i, n);
    }
    refine(e, t) {
      const i = (a) =>
        typeof t == 'string' || typeof t > 'u'
          ? { message: t }
          : typeof t == 'function'
            ? t(a)
            : t;
      return this._refinement((a, n) => {
        const s = e(a),
          o = () => n.addIssue({ code: h.custom, ...i(a) });
        return typeof Promise < 'u' && s instanceof Promise
          ? s.then((c) => (c ? !0 : (o(), !1)))
          : s
            ? !0
            : (o(), !1);
      });
    }
    refinement(e, t) {
      return this._refinement((i, a) =>
        e(i) ? !0 : (a.addIssue(typeof t == 'function' ? t(i, a) : t), !1)
      );
    }
    _refinement(e) {
      return new D({
        schema: this,
        typeName: b.ZodEffects,
        effect: { type: 'refinement', refinement: e },
      });
    }
    superRefine(e) {
      return this._refinement(e);
    }
    constructor(e) {
      (this.spa = this.safeParseAsync),
        (this._def = e),
        (this.parse = this.parse.bind(this)),
        (this.safeParse = this.safeParse.bind(this)),
        (this.parseAsync = this.parseAsync.bind(this)),
        (this.safeParseAsync = this.safeParseAsync.bind(this)),
        (this.spa = this.spa.bind(this)),
        (this.refine = this.refine.bind(this)),
        (this.refinement = this.refinement.bind(this)),
        (this.superRefine = this.superRefine.bind(this)),
        (this.optional = this.optional.bind(this)),
        (this.nullable = this.nullable.bind(this)),
        (this.nullish = this.nullish.bind(this)),
        (this.array = this.array.bind(this)),
        (this.promise = this.promise.bind(this)),
        (this.or = this.or.bind(this)),
        (this.and = this.and.bind(this)),
        (this.transform = this.transform.bind(this)),
        (this.brand = this.brand.bind(this)),
        (this.default = this.default.bind(this)),
        (this.catch = this.catch.bind(this)),
        (this.describe = this.describe.bind(this)),
        (this.pipe = this.pipe.bind(this)),
        (this.readonly = this.readonly.bind(this)),
        (this.isNullable = this.isNullable.bind(this)),
        (this.isOptional = this.isOptional.bind(this)),
        (this['~standard'] = {
          version: 1,
          vendor: 'zod',
          validate: (t) => this['~validate'](t),
        });
    }
    optional() {
      return Z.create(this, this._def);
    }
    nullable() {
      return $.create(this, this._def);
    }
    nullish() {
      return this.nullable().optional();
    }
    array() {
      return X.create(this);
    }
    promise() {
      return ne.create(this, this._def);
    }
    or(e) {
      return ye.create([this, e], this._def);
    }
    and(e) {
      return we.create(this, e, this._def);
    }
    transform(e) {
      return new D({
        ...x(this._def),
        schema: this,
        typeName: b.ZodEffects,
        effect: { type: 'transform', transform: e },
      });
    }
    default(e) {
      const t = typeof e == 'function' ? e : () => e;
      return new Ae({
        ...x(this._def),
        innerType: this,
        defaultValue: t,
        typeName: b.ZodDefault,
      });
    }
    brand() {
      return new Xe({ typeName: b.ZodBranded, type: this, ...x(this._def) });
    }
    catch(e) {
      const t = typeof e == 'function' ? e : () => e;
      return new Ee({
        ...x(this._def),
        innerType: this,
        catchValue: t,
        typeName: b.ZodCatch,
      });
    }
    describe(e) {
      const t = this.constructor;
      return new t({ ...this._def, description: e });
    }
    pipe(e) {
      return Qe.create(this, e);
    }
    readonly() {
      return Te.create(this);
    }
    isOptional() {
      return this.safeParse(void 0).success;
    }
    isNullable() {
      return this.safeParse(null).success;
    }
  },
  ui = /^c[^\s-]{8,}$/i,
  li = /^[0-9a-z]+$/,
  fi = /^[0-9A-HJKMNP-TV-Z]{26}$/i,
  mi =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,
  pi = /^[a-z0-9_-]{21}$/i,
  hi = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/,
  gi =
    /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/,
  vi =
    /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9-]*\.)+[A-Z]{2,}$/i,
  yi = '^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$',
  jt,
  wi =
    /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
  bi =
    /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/,
  _i =
    /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/,
  xi =
    /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
  ki = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
  Ai = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/,
  hr =
    '((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))',
  Ei = new RegExp(`^${hr}$`);
function gr(r) {
  let e = '([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d';
  return (
    r.precision
      ? (e = `${e}\\.\\d{${r.precision}}`)
      : r.precision == null && (e = `${e}(\\.\\d+)?`),
    e
  );
}
function Ti(r) {
  return new RegExp(`^${gr(r)}$`);
}
function vr(r) {
  let e = `${hr}T${gr(r)}`,
    t = [];
  return (
    t.push(r.local ? 'Z?' : 'Z'),
    r.offset && t.push('([+-]\\d{2}:?\\d{2})'),
    (e = `${e}(${t.join('|')})`),
    new RegExp(`^${e}$`)
  );
}
function Ci(r, e) {
  return !!(
    ((e === 'v4' || !e) && wi.test(r)) ||
    ((e === 'v6' || !e) && _i.test(r))
  );
}
function Si(r, e) {
  if (!hi.test(r)) return !1;
  try {
    const [t] = r.split('.'),
      i = t
        .replace(/-/g, '+')
        .replace(/_/g, '/')
        .padEnd(t.length + ((4 - (t.length % 4)) % 4), '='),
      a = JSON.parse(atob(i));
    return !(
      typeof a != 'object' ||
      a === null ||
      !a.typ ||
      !a.alg ||
      (e && a.alg !== e)
    );
  } catch {
    return !1;
  }
}
function Ri(r, e) {
  return !!(
    ((e === 'v4' || !e) && bi.test(r)) ||
    ((e === 'v6' || !e) && xi.test(r))
  );
}
var ie = class r extends k {
  _parse(e) {
    if (
      (this._def.coerce && (e.data = String(e.data)),
      this._getType(e) !== v.string)
    ) {
      const n = this._getOrReturnCtx(e);
      return (
        g(n, {
          code: h.invalid_type,
          expected: v.string,
          received: n.parsedType,
        }),
        _
      );
    }
    let i = new O(),
      a;
    for (const n of this._def.checks)
      if (n.kind === 'min')
        e.data.length < n.value &&
          ((a = this._getOrReturnCtx(e, a)),
          g(a, {
            code: h.too_small,
            minimum: n.value,
            type: 'string',
            inclusive: !0,
            exact: !1,
            message: n.message,
          }),
          i.dirty());
      else if (n.kind === 'max')
        e.data.length > n.value &&
          ((a = this._getOrReturnCtx(e, a)),
          g(a, {
            code: h.too_big,
            maximum: n.value,
            type: 'string',
            inclusive: !0,
            exact: !1,
            message: n.message,
          }),
          i.dirty());
      else if (n.kind === 'length') {
        const s = e.data.length > n.value,
          o = e.data.length < n.value;
        (s || o) &&
          ((a = this._getOrReturnCtx(e, a)),
          s
            ? g(a, {
                code: h.too_big,
                maximum: n.value,
                type: 'string',
                inclusive: !0,
                exact: !0,
                message: n.message,
              })
            : o &&
              g(a, {
                code: h.too_small,
                minimum: n.value,
                type: 'string',
                inclusive: !0,
                exact: !0,
                message: n.message,
              }),
          i.dirty());
      } else if (n.kind === 'email')
        vi.test(e.data) ||
          ((a = this._getOrReturnCtx(e, a)),
          g(a, {
            validation: 'email',
            code: h.invalid_string,
            message: n.message,
          }),
          i.dirty());
      else if (n.kind === 'emoji')
        jt || (jt = new RegExp(yi, 'u')),
          jt.test(e.data) ||
            ((a = this._getOrReturnCtx(e, a)),
            g(a, {
              validation: 'emoji',
              code: h.invalid_string,
              message: n.message,
            }),
            i.dirty());
      else if (n.kind === 'uuid')
        mi.test(e.data) ||
          ((a = this._getOrReturnCtx(e, a)),
          g(a, {
            validation: 'uuid',
            code: h.invalid_string,
            message: n.message,
          }),
          i.dirty());
      else if (n.kind === 'nanoid')
        pi.test(e.data) ||
          ((a = this._getOrReturnCtx(e, a)),
          g(a, {
            validation: 'nanoid',
            code: h.invalid_string,
            message: n.message,
          }),
          i.dirty());
      else if (n.kind === 'cuid')
        ui.test(e.data) ||
          ((a = this._getOrReturnCtx(e, a)),
          g(a, {
            validation: 'cuid',
            code: h.invalid_string,
            message: n.message,
          }),
          i.dirty());
      else if (n.kind === 'cuid2')
        li.test(e.data) ||
          ((a = this._getOrReturnCtx(e, a)),
          g(a, {
            validation: 'cuid2',
            code: h.invalid_string,
            message: n.message,
          }),
          i.dirty());
      else if (n.kind === 'ulid')
        fi.test(e.data) ||
          ((a = this._getOrReturnCtx(e, a)),
          g(a, {
            validation: 'ulid',
            code: h.invalid_string,
            message: n.message,
          }),
          i.dirty());
      else if (n.kind === 'url')
        try {
          new URL(e.data);
        } catch {
          (a = this._getOrReturnCtx(e, a)),
            g(a, {
              validation: 'url',
              code: h.invalid_string,
              message: n.message,
            }),
            i.dirty();
        }
      else
        n.kind === 'regex'
          ? ((n.regex.lastIndex = 0),
            n.regex.test(e.data) ||
              ((a = this._getOrReturnCtx(e, a)),
              g(a, {
                validation: 'regex',
                code: h.invalid_string,
                message: n.message,
              }),
              i.dirty()))
          : n.kind === 'trim'
            ? (e.data = e.data.trim())
            : n.kind === 'includes'
              ? e.data.includes(n.value, n.position) ||
                ((a = this._getOrReturnCtx(e, a)),
                g(a, {
                  code: h.invalid_string,
                  validation: { includes: n.value, position: n.position },
                  message: n.message,
                }),
                i.dirty())
              : n.kind === 'toLowerCase'
                ? (e.data = e.data.toLowerCase())
                : n.kind === 'toUpperCase'
                  ? (e.data = e.data.toUpperCase())
                  : n.kind === 'startsWith'
                    ? e.data.startsWith(n.value) ||
                      ((a = this._getOrReturnCtx(e, a)),
                      g(a, {
                        code: h.invalid_string,
                        validation: { startsWith: n.value },
                        message: n.message,
                      }),
                      i.dirty())
                    : n.kind === 'endsWith'
                      ? e.data.endsWith(n.value) ||
                        ((a = this._getOrReturnCtx(e, a)),
                        g(a, {
                          code: h.invalid_string,
                          validation: { endsWith: n.value },
                          message: n.message,
                        }),
                        i.dirty())
                      : n.kind === 'datetime'
                        ? vr(n).test(e.data) ||
                          ((a = this._getOrReturnCtx(e, a)),
                          g(a, {
                            code: h.invalid_string,
                            validation: 'datetime',
                            message: n.message,
                          }),
                          i.dirty())
                        : n.kind === 'date'
                          ? Ei.test(e.data) ||
                            ((a = this._getOrReturnCtx(e, a)),
                            g(a, {
                              code: h.invalid_string,
                              validation: 'date',
                              message: n.message,
                            }),
                            i.dirty())
                          : n.kind === 'time'
                            ? Ti(n).test(e.data) ||
                              ((a = this._getOrReturnCtx(e, a)),
                              g(a, {
                                code: h.invalid_string,
                                validation: 'time',
                                message: n.message,
                              }),
                              i.dirty())
                            : n.kind === 'duration'
                              ? gi.test(e.data) ||
                                ((a = this._getOrReturnCtx(e, a)),
                                g(a, {
                                  validation: 'duration',
                                  code: h.invalid_string,
                                  message: n.message,
                                }),
                                i.dirty())
                              : n.kind === 'ip'
                                ? Ci(e.data, n.version) ||
                                  ((a = this._getOrReturnCtx(e, a)),
                                  g(a, {
                                    validation: 'ip',
                                    code: h.invalid_string,
                                    message: n.message,
                                  }),
                                  i.dirty())
                                : n.kind === 'jwt'
                                  ? Si(e.data, n.alg) ||
                                    ((a = this._getOrReturnCtx(e, a)),
                                    g(a, {
                                      validation: 'jwt',
                                      code: h.invalid_string,
                                      message: n.message,
                                    }),
                                    i.dirty())
                                  : n.kind === 'cidr'
                                    ? Ri(e.data, n.version) ||
                                      ((a = this._getOrReturnCtx(e, a)),
                                      g(a, {
                                        validation: 'cidr',
                                        code: h.invalid_string,
                                        message: n.message,
                                      }),
                                      i.dirty())
                                    : n.kind === 'base64'
                                      ? ki.test(e.data) ||
                                        ((a = this._getOrReturnCtx(e, a)),
                                        g(a, {
                                          validation: 'base64',
                                          code: h.invalid_string,
                                          message: n.message,
                                        }),
                                        i.dirty())
                                      : n.kind === 'base64url'
                                        ? Ai.test(e.data) ||
                                          ((a = this._getOrReturnCtx(e, a)),
                                          g(a, {
                                            validation: 'base64url',
                                            code: h.invalid_string,
                                            message: n.message,
                                          }),
                                          i.dirty())
                                        : E.assertNever(n);
    return { status: i.value, value: e.data };
  }
  _regex(e, t, i) {
    return this.refinement((a) => e.test(a), {
      validation: t,
      code: h.invalid_string,
      ...w.errToObj(i),
    });
  }
  _addCheck(e) {
    return new r({ ...this._def, checks: [...this._def.checks, e] });
  }
  email(e) {
    return this._addCheck({ kind: 'email', ...w.errToObj(e) });
  }
  url(e) {
    return this._addCheck({ kind: 'url', ...w.errToObj(e) });
  }
  emoji(e) {
    return this._addCheck({ kind: 'emoji', ...w.errToObj(e) });
  }
  uuid(e) {
    return this._addCheck({ kind: 'uuid', ...w.errToObj(e) });
  }
  nanoid(e) {
    return this._addCheck({ kind: 'nanoid', ...w.errToObj(e) });
  }
  cuid(e) {
    return this._addCheck({ kind: 'cuid', ...w.errToObj(e) });
  }
  cuid2(e) {
    return this._addCheck({ kind: 'cuid2', ...w.errToObj(e) });
  }
  ulid(e) {
    return this._addCheck({ kind: 'ulid', ...w.errToObj(e) });
  }
  base64(e) {
    return this._addCheck({ kind: 'base64', ...w.errToObj(e) });
  }
  base64url(e) {
    return this._addCheck({ kind: 'base64url', ...w.errToObj(e) });
  }
  jwt(e) {
    return this._addCheck({ kind: 'jwt', ...w.errToObj(e) });
  }
  ip(e) {
    return this._addCheck({ kind: 'ip', ...w.errToObj(e) });
  }
  cidr(e) {
    return this._addCheck({ kind: 'cidr', ...w.errToObj(e) });
  }
  datetime(e) {
    var t, i;
    return typeof e == 'string'
      ? this._addCheck({
          kind: 'datetime',
          precision: null,
          offset: !1,
          local: !1,
          message: e,
        })
      : this._addCheck({
          kind: 'datetime',
          precision: typeof e?.precision > 'u' ? null : e?.precision,
          offset: (t = e?.offset) !== null && t !== void 0 ? t : !1,
          local: (i = e?.local) !== null && i !== void 0 ? i : !1,
          ...w.errToObj(e?.message),
        });
  }
  date(e) {
    return this._addCheck({ kind: 'date', message: e });
  }
  time(e) {
    return typeof e == 'string'
      ? this._addCheck({ kind: 'time', precision: null, message: e })
      : this._addCheck({
          kind: 'time',
          precision: typeof e?.precision > 'u' ? null : e?.precision,
          ...w.errToObj(e?.message),
        });
  }
  duration(e) {
    return this._addCheck({ kind: 'duration', ...w.errToObj(e) });
  }
  regex(e, t) {
    return this._addCheck({ kind: 'regex', regex: e, ...w.errToObj(t) });
  }
  includes(e, t) {
    return this._addCheck({
      kind: 'includes',
      value: e,
      position: t?.position,
      ...w.errToObj(t?.message),
    });
  }
  startsWith(e, t) {
    return this._addCheck({ kind: 'startsWith', value: e, ...w.errToObj(t) });
  }
  endsWith(e, t) {
    return this._addCheck({ kind: 'endsWith', value: e, ...w.errToObj(t) });
  }
  min(e, t) {
    return this._addCheck({ kind: 'min', value: e, ...w.errToObj(t) });
  }
  max(e, t) {
    return this._addCheck({ kind: 'max', value: e, ...w.errToObj(t) });
  }
  length(e, t) {
    return this._addCheck({ kind: 'length', value: e, ...w.errToObj(t) });
  }
  nonempty(e) {
    return this.min(1, w.errToObj(e));
  }
  trim() {
    return new r({
      ...this._def,
      checks: [...this._def.checks, { kind: 'trim' }],
    });
  }
  toLowerCase() {
    return new r({
      ...this._def,
      checks: [...this._def.checks, { kind: 'toLowerCase' }],
    });
  }
  toUpperCase() {
    return new r({
      ...this._def,
      checks: [...this._def.checks, { kind: 'toUpperCase' }],
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((e) => e.kind === 'datetime');
  }
  get isDate() {
    return !!this._def.checks.find((e) => e.kind === 'date');
  }
  get isTime() {
    return !!this._def.checks.find((e) => e.kind === 'time');
  }
  get isDuration() {
    return !!this._def.checks.find((e) => e.kind === 'duration');
  }
  get isEmail() {
    return !!this._def.checks.find((e) => e.kind === 'email');
  }
  get isURL() {
    return !!this._def.checks.find((e) => e.kind === 'url');
  }
  get isEmoji() {
    return !!this._def.checks.find((e) => e.kind === 'emoji');
  }
  get isUUID() {
    return !!this._def.checks.find((e) => e.kind === 'uuid');
  }
  get isNANOID() {
    return !!this._def.checks.find((e) => e.kind === 'nanoid');
  }
  get isCUID() {
    return !!this._def.checks.find((e) => e.kind === 'cuid');
  }
  get isCUID2() {
    return !!this._def.checks.find((e) => e.kind === 'cuid2');
  }
  get isULID() {
    return !!this._def.checks.find((e) => e.kind === 'ulid');
  }
  get isIP() {
    return !!this._def.checks.find((e) => e.kind === 'ip');
  }
  get isCIDR() {
    return !!this._def.checks.find((e) => e.kind === 'cidr');
  }
  get isBase64() {
    return !!this._def.checks.find((e) => e.kind === 'base64');
  }
  get isBase64url() {
    return !!this._def.checks.find((e) => e.kind === 'base64url');
  }
  get minLength() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === 'min' && (e === null || t.value > e) && (e = t.value);
    return e;
  }
  get maxLength() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === 'max' && (e === null || t.value < e) && (e = t.value);
    return e;
  }
};
ie.create = (r) => {
  var e;
  return new ie({
    checks: [],
    typeName: b.ZodString,
    coerce: (e = r?.coerce) !== null && e !== void 0 ? e : !1,
    ...x(r),
  });
};
function Oi(r, e) {
  const t = (r.toString().split('.')[1] || '').length,
    i = (e.toString().split('.')[1] || '').length,
    a = t > i ? t : i,
    n = Number.parseInt(r.toFixed(a).replace('.', '')),
    s = Number.parseInt(e.toFixed(a).replace('.', ''));
  return (n % s) / Math.pow(10, a);
}
var fe = class r extends k {
  constructor() {
    super(...arguments),
      (this.min = this.gte),
      (this.max = this.lte),
      (this.step = this.multipleOf);
  }
  _parse(e) {
    if (
      (this._def.coerce && (e.data = Number(e.data)),
      this._getType(e) !== v.number)
    ) {
      const n = this._getOrReturnCtx(e);
      return (
        g(n, {
          code: h.invalid_type,
          expected: v.number,
          received: n.parsedType,
        }),
        _
      );
    }
    let i,
      a = new O();
    for (const n of this._def.checks)
      n.kind === 'int'
        ? E.isInteger(e.data) ||
          ((i = this._getOrReturnCtx(e, i)),
          g(i, {
            code: h.invalid_type,
            expected: 'integer',
            received: 'float',
            message: n.message,
          }),
          a.dirty())
        : n.kind === 'min'
          ? (n.inclusive ? e.data < n.value : e.data <= n.value) &&
            ((i = this._getOrReturnCtx(e, i)),
            g(i, {
              code: h.too_small,
              minimum: n.value,
              type: 'number',
              inclusive: n.inclusive,
              exact: !1,
              message: n.message,
            }),
            a.dirty())
          : n.kind === 'max'
            ? (n.inclusive ? e.data > n.value : e.data >= n.value) &&
              ((i = this._getOrReturnCtx(e, i)),
              g(i, {
                code: h.too_big,
                maximum: n.value,
                type: 'number',
                inclusive: n.inclusive,
                exact: !1,
                message: n.message,
              }),
              a.dirty())
            : n.kind === 'multipleOf'
              ? Oi(e.data, n.value) !== 0 &&
                ((i = this._getOrReturnCtx(e, i)),
                g(i, {
                  code: h.not_multiple_of,
                  multipleOf: n.value,
                  message: n.message,
                }),
                a.dirty())
              : n.kind === 'finite'
                ? Number.isFinite(e.data) ||
                  ((i = this._getOrReturnCtx(e, i)),
                  g(i, { code: h.not_finite, message: n.message }),
                  a.dirty())
                : E.assertNever(n);
    return { status: a.value, value: e.data };
  }
  gte(e, t) {
    return this.setLimit('min', e, !0, w.toString(t));
  }
  gt(e, t) {
    return this.setLimit('min', e, !1, w.toString(t));
  }
  lte(e, t) {
    return this.setLimit('max', e, !0, w.toString(t));
  }
  lt(e, t) {
    return this.setLimit('max', e, !1, w.toString(t));
  }
  setLimit(e, t, i, a) {
    return new r({
      ...this._def,
      checks: [
        ...this._def.checks,
        { kind: e, value: t, inclusive: i, message: w.toString(a) },
      ],
    });
  }
  _addCheck(e) {
    return new r({ ...this._def, checks: [...this._def.checks, e] });
  }
  int(e) {
    return this._addCheck({ kind: 'int', message: w.toString(e) });
  }
  positive(e) {
    return this._addCheck({
      kind: 'min',
      value: 0,
      inclusive: !1,
      message: w.toString(e),
    });
  }
  negative(e) {
    return this._addCheck({
      kind: 'max',
      value: 0,
      inclusive: !1,
      message: w.toString(e),
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: 'max',
      value: 0,
      inclusive: !0,
      message: w.toString(e),
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: 'min',
      value: 0,
      inclusive: !0,
      message: w.toString(e),
    });
  }
  multipleOf(e, t) {
    return this._addCheck({
      kind: 'multipleOf',
      value: e,
      message: w.toString(t),
    });
  }
  finite(e) {
    return this._addCheck({ kind: 'finite', message: w.toString(e) });
  }
  safe(e) {
    return this._addCheck({
      kind: 'min',
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: w.toString(e),
    })._addCheck({
      kind: 'max',
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: w.toString(e),
    });
  }
  get minValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === 'min' && (e === null || t.value > e) && (e = t.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === 'max' && (e === null || t.value < e) && (e = t.value);
    return e;
  }
  get isInt() {
    return !!this._def.checks.find(
      (e) =>
        e.kind === 'int' || (e.kind === 'multipleOf' && E.isInteger(e.value))
    );
  }
  get isFinite() {
    let e = null,
      t = null;
    for (const i of this._def.checks) {
      if (i.kind === 'finite' || i.kind === 'int' || i.kind === 'multipleOf')
        return !0;
      i.kind === 'min'
        ? (t === null || i.value > t) && (t = i.value)
        : i.kind === 'max' && (e === null || i.value < e) && (e = i.value);
    }
    return Number.isFinite(t) && Number.isFinite(e);
  }
};
fe.create = (r) =>
  new fe({
    checks: [],
    typeName: b.ZodNumber,
    coerce: r?.coerce || !1,
    ...x(r),
  });
var me = class r extends k {
  constructor() {
    super(...arguments), (this.min = this.gte), (this.max = this.lte);
  }
  _parse(e) {
    if (this._def.coerce)
      try {
        e.data = BigInt(e.data);
      } catch {
        return this._getInvalidInput(e);
      }
    if (this._getType(e) !== v.bigint) return this._getInvalidInput(e);
    let i,
      a = new O();
    for (const n of this._def.checks)
      n.kind === 'min'
        ? (n.inclusive ? e.data < n.value : e.data <= n.value) &&
          ((i = this._getOrReturnCtx(e, i)),
          g(i, {
            code: h.too_small,
            type: 'bigint',
            minimum: n.value,
            inclusive: n.inclusive,
            message: n.message,
          }),
          a.dirty())
        : n.kind === 'max'
          ? (n.inclusive ? e.data > n.value : e.data >= n.value) &&
            ((i = this._getOrReturnCtx(e, i)),
            g(i, {
              code: h.too_big,
              type: 'bigint',
              maximum: n.value,
              inclusive: n.inclusive,
              message: n.message,
            }),
            a.dirty())
          : n.kind === 'multipleOf'
            ? e.data % n.value !== BigInt(0) &&
              ((i = this._getOrReturnCtx(e, i)),
              g(i, {
                code: h.not_multiple_of,
                multipleOf: n.value,
                message: n.message,
              }),
              a.dirty())
            : E.assertNever(n);
    return { status: a.value, value: e.data };
  }
  _getInvalidInput(e) {
    const t = this._getOrReturnCtx(e);
    return (
      g(t, {
        code: h.invalid_type,
        expected: v.bigint,
        received: t.parsedType,
      }),
      _
    );
  }
  gte(e, t) {
    return this.setLimit('min', e, !0, w.toString(t));
  }
  gt(e, t) {
    return this.setLimit('min', e, !1, w.toString(t));
  }
  lte(e, t) {
    return this.setLimit('max', e, !0, w.toString(t));
  }
  lt(e, t) {
    return this.setLimit('max', e, !1, w.toString(t));
  }
  setLimit(e, t, i, a) {
    return new r({
      ...this._def,
      checks: [
        ...this._def.checks,
        { kind: e, value: t, inclusive: i, message: w.toString(a) },
      ],
    });
  }
  _addCheck(e) {
    return new r({ ...this._def, checks: [...this._def.checks, e] });
  }
  positive(e) {
    return this._addCheck({
      kind: 'min',
      value: BigInt(0),
      inclusive: !1,
      message: w.toString(e),
    });
  }
  negative(e) {
    return this._addCheck({
      kind: 'max',
      value: BigInt(0),
      inclusive: !1,
      message: w.toString(e),
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: 'max',
      value: BigInt(0),
      inclusive: !0,
      message: w.toString(e),
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: 'min',
      value: BigInt(0),
      inclusive: !0,
      message: w.toString(e),
    });
  }
  multipleOf(e, t) {
    return this._addCheck({
      kind: 'multipleOf',
      value: e,
      message: w.toString(t),
    });
  }
  get minValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === 'min' && (e === null || t.value > e) && (e = t.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === 'max' && (e === null || t.value < e) && (e = t.value);
    return e;
  }
};
me.create = (r) => {
  var e;
  return new me({
    checks: [],
    typeName: b.ZodBigInt,
    coerce: (e = r?.coerce) !== null && e !== void 0 ? e : !1,
    ...x(r),
  });
};
var pe = class extends k {
  _parse(e) {
    if (
      (this._def.coerce && (e.data = !!e.data), this._getType(e) !== v.boolean)
    ) {
      const i = this._getOrReturnCtx(e);
      return (
        g(i, {
          code: h.invalid_type,
          expected: v.boolean,
          received: i.parsedType,
        }),
        _
      );
    }
    return I(e.data);
  }
};
pe.create = (r) =>
  new pe({ typeName: b.ZodBoolean, coerce: r?.coerce || !1, ...x(r) });
var he = class r extends k {
  _parse(e) {
    if (
      (this._def.coerce && (e.data = new Date(e.data)),
      this._getType(e) !== v.date)
    ) {
      const n = this._getOrReturnCtx(e);
      return (
        g(n, {
          code: h.invalid_type,
          expected: v.date,
          received: n.parsedType,
        }),
        _
      );
    }
    if (isNaN(e.data.getTime())) {
      const n = this._getOrReturnCtx(e);
      return g(n, { code: h.invalid_date }), _;
    }
    let i = new O(),
      a;
    for (const n of this._def.checks)
      n.kind === 'min'
        ? e.data.getTime() < n.value &&
          ((a = this._getOrReturnCtx(e, a)),
          g(a, {
            code: h.too_small,
            message: n.message,
            inclusive: !0,
            exact: !1,
            minimum: n.value,
            type: 'date',
          }),
          i.dirty())
        : n.kind === 'max'
          ? e.data.getTime() > n.value &&
            ((a = this._getOrReturnCtx(e, a)),
            g(a, {
              code: h.too_big,
              message: n.message,
              inclusive: !0,
              exact: !1,
              maximum: n.value,
              type: 'date',
            }),
            i.dirty())
          : E.assertNever(n);
    return { status: i.value, value: new Date(e.data.getTime()) };
  }
  _addCheck(e) {
    return new r({ ...this._def, checks: [...this._def.checks, e] });
  }
  min(e, t) {
    return this._addCheck({
      kind: 'min',
      value: e.getTime(),
      message: w.toString(t),
    });
  }
  max(e, t) {
    return this._addCheck({
      kind: 'max',
      value: e.getTime(),
      message: w.toString(t),
    });
  }
  get minDate() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === 'min' && (e === null || t.value > e) && (e = t.value);
    return e != null ? new Date(e) : null;
  }
  get maxDate() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === 'max' && (e === null || t.value < e) && (e = t.value);
    return e != null ? new Date(e) : null;
  }
};
he.create = (r) =>
  new he({ checks: [], coerce: r?.coerce || !1, typeName: b.ZodDate, ...x(r) });
var Ne = class extends k {
  _parse(e) {
    if (this._getType(e) !== v.symbol) {
      const i = this._getOrReturnCtx(e);
      return (
        g(i, {
          code: h.invalid_type,
          expected: v.symbol,
          received: i.parsedType,
        }),
        _
      );
    }
    return I(e.data);
  }
};
Ne.create = (r) => new Ne({ typeName: b.ZodSymbol, ...x(r) });
var ge = class extends k {
  _parse(e) {
    if (this._getType(e) !== v.undefined) {
      const i = this._getOrReturnCtx(e);
      return (
        g(i, {
          code: h.invalid_type,
          expected: v.undefined,
          received: i.parsedType,
        }),
        _
      );
    }
    return I(e.data);
  }
};
ge.create = (r) => new ge({ typeName: b.ZodUndefined, ...x(r) });
var ve = class extends k {
  _parse(e) {
    if (this._getType(e) !== v.null) {
      const i = this._getOrReturnCtx(e);
      return (
        g(i, {
          code: h.invalid_type,
          expected: v.null,
          received: i.parsedType,
        }),
        _
      );
    }
    return I(e.data);
  }
};
ve.create = (r) => new ve({ typeName: b.ZodNull, ...x(r) });
var ae = class extends k {
  constructor() {
    super(...arguments), (this._any = !0);
  }
  _parse(e) {
    return I(e.data);
  }
};
ae.create = (r) => new ae({ typeName: b.ZodAny, ...x(r) });
var Y = class extends k {
  constructor() {
    super(...arguments), (this._unknown = !0);
  }
  _parse(e) {
    return I(e.data);
  }
};
Y.create = (r) => new Y({ typeName: b.ZodUnknown, ...x(r) });
var F = class extends k {
  _parse(e) {
    const t = this._getOrReturnCtx(e);
    return (
      g(t, { code: h.invalid_type, expected: v.never, received: t.parsedType }),
      _
    );
  }
};
F.create = (r) => new F({ typeName: b.ZodNever, ...x(r) });
var Me = class extends k {
  _parse(e) {
    if (this._getType(e) !== v.undefined) {
      const i = this._getOrReturnCtx(e);
      return (
        g(i, {
          code: h.invalid_type,
          expected: v.void,
          received: i.parsedType,
        }),
        _
      );
    }
    return I(e.data);
  }
};
Me.create = (r) => new Me({ typeName: b.ZodVoid, ...x(r) });
var X = class r extends k {
  _parse(e) {
    const { ctx: t, status: i } = this._processInputParams(e),
      a = this._def;
    if (t.parsedType !== v.array)
      return (
        g(t, {
          code: h.invalid_type,
          expected: v.array,
          received: t.parsedType,
        }),
        _
      );
    if (a.exactLength !== null) {
      const s = t.data.length > a.exactLength.value,
        o = t.data.length < a.exactLength.value;
      (s || o) &&
        (g(t, {
          code: s ? h.too_big : h.too_small,
          minimum: o ? a.exactLength.value : void 0,
          maximum: s ? a.exactLength.value : void 0,
          type: 'array',
          inclusive: !0,
          exact: !0,
          message: a.exactLength.message,
        }),
        i.dirty());
    }
    if (
      (a.minLength !== null &&
        t.data.length < a.minLength.value &&
        (g(t, {
          code: h.too_small,
          minimum: a.minLength.value,
          type: 'array',
          inclusive: !0,
          exact: !1,
          message: a.minLength.message,
        }),
        i.dirty()),
      a.maxLength !== null &&
        t.data.length > a.maxLength.value &&
        (g(t, {
          code: h.too_big,
          maximum: a.maxLength.value,
          type: 'array',
          inclusive: !0,
          exact: !1,
          message: a.maxLength.message,
        }),
        i.dirty()),
      t.common.async)
    )
      return Promise.all(
        [...t.data].map((s, o) => a.type._parseAsync(new z(t, s, t.path, o)))
      ).then((s) => O.mergeArray(i, s));
    const n = [...t.data].map((s, o) =>
      a.type._parseSync(new z(t, s, t.path, o))
    );
    return O.mergeArray(i, n);
  }
  get element() {
    return this._def.type;
  }
  min(e, t) {
    return new r({
      ...this._def,
      minLength: { value: e, message: w.toString(t) },
    });
  }
  max(e, t) {
    return new r({
      ...this._def,
      maxLength: { value: e, message: w.toString(t) },
    });
  }
  length(e, t) {
    return new r({
      ...this._def,
      exactLength: { value: e, message: w.toString(t) },
    });
  }
  nonempty(e) {
    return this.min(1, e);
  }
};
X.create = (r, e) =>
  new X({
    type: r,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: b.ZodArray,
    ...x(e),
  });
function Oe(r) {
  if (r instanceof L) {
    const e = {};
    for (const t in r.shape) {
      const i = r.shape[t];
      e[t] = Z.create(Oe(i));
    }
    return new L({ ...r._def, shape: () => e });
  } else
    return r instanceof X
      ? new X({ ...r._def, type: Oe(r.element) })
      : r instanceof Z
        ? Z.create(Oe(r.unwrap()))
        : r instanceof $
          ? $.create(Oe(r.unwrap()))
          : r instanceof B
            ? B.create(r.items.map((e) => Oe(e)))
            : r;
}
var L = class r extends k {
  constructor() {
    super(...arguments),
      (this._cached = null),
      (this.nonstrict = this.passthrough),
      (this.augment = this.extend);
  }
  _getCached() {
    if (this._cached !== null) return this._cached;
    const e = this._def.shape(),
      t = E.objectKeys(e);
    return (this._cached = { shape: e, keys: t });
  }
  _parse(e) {
    if (this._getType(e) !== v.object) {
      const f = this._getOrReturnCtx(e);
      return (
        g(f, {
          code: h.invalid_type,
          expected: v.object,
          received: f.parsedType,
        }),
        _
      );
    }
    const { status: i, ctx: a } = this._processInputParams(e),
      { shape: n, keys: s } = this._getCached(),
      o = [];
    if (!(this._def.catchall instanceof F && this._def.unknownKeys === 'strip'))
      for (const f in a.data) s.includes(f) || o.push(f);
    const c = [];
    for (const f of s) {
      const y = n[f],
        T = a.data[f];
      c.push({
        key: { status: 'valid', value: f },
        value: y._parse(new z(a, T, a.path, f)),
        alwaysSet: f in a.data,
      });
    }
    if (this._def.catchall instanceof F) {
      const f = this._def.unknownKeys;
      if (f === 'passthrough')
        for (const y of o)
          c.push({
            key: { status: 'valid', value: y },
            value: { status: 'valid', value: a.data[y] },
          });
      else if (f === 'strict')
        o.length > 0 &&
          (g(a, { code: h.unrecognized_keys, keys: o }), i.dirty());
      else if (f !== 'strip')
        throw new Error('Internal ZodObject error: invalid unknownKeys value.');
    } else {
      const f = this._def.catchall;
      for (const y of o) {
        const T = a.data[y];
        c.push({
          key: { status: 'valid', value: y },
          value: f._parse(new z(a, T, a.path, y)),
          alwaysSet: y in a.data,
        });
      }
    }
    return a.common.async
      ? Promise.resolve()
          .then(async () => {
            const f = [];
            for (const y of c) {
              const T = await y.key,
                R = await y.value;
              f.push({ key: T, value: R, alwaysSet: y.alwaysSet });
            }
            return f;
          })
          .then((f) => O.mergeObjectSync(i, f))
      : O.mergeObjectSync(i, c);
  }
  get shape() {
    return this._def.shape();
  }
  strict(e) {
    return (
      w.errToObj,
      new r({
        ...this._def,
        unknownKeys: 'strict',
        ...(e !== void 0
          ? {
              errorMap: (t, i) => {
                var a, n, s, o;
                const c =
                  (s =
                    (n = (a = this._def).errorMap) === null || n === void 0
                      ? void 0
                      : n.call(a, t, i).message) !== null && s !== void 0
                    ? s
                    : i.defaultError;
                return t.code === 'unrecognized_keys'
                  ? {
                      message:
                        (o = w.errToObj(e).message) !== null && o !== void 0
                          ? o
                          : c,
                    }
                  : { message: c };
              },
            }
          : {}),
      })
    );
  }
  strip() {
    return new r({ ...this._def, unknownKeys: 'strip' });
  }
  passthrough() {
    return new r({ ...this._def, unknownKeys: 'passthrough' });
  }
  extend(e) {
    return new r({
      ...this._def,
      shape: () => ({ ...this._def.shape(), ...e }),
    });
  }
  merge(e) {
    return new r({
      unknownKeys: e._def.unknownKeys,
      catchall: e._def.catchall,
      shape: () => ({ ...this._def.shape(), ...e._def.shape() }),
      typeName: b.ZodObject,
    });
  }
  setKey(e, t) {
    return this.augment({ [e]: t });
  }
  catchall(e) {
    return new r({ ...this._def, catchall: e });
  }
  pick(e) {
    const t = {};
    return (
      E.objectKeys(e).forEach((i) => {
        e[i] && this.shape[i] && (t[i] = this.shape[i]);
      }),
      new r({ ...this._def, shape: () => t })
    );
  }
  omit(e) {
    const t = {};
    return (
      E.objectKeys(this.shape).forEach((i) => {
        e[i] || (t[i] = this.shape[i]);
      }),
      new r({ ...this._def, shape: () => t })
    );
  }
  deepPartial() {
    return Oe(this);
  }
  partial(e) {
    const t = {};
    return (
      E.objectKeys(this.shape).forEach((i) => {
        const a = this.shape[i];
        e && !e[i] ? (t[i] = a) : (t[i] = a.optional());
      }),
      new r({ ...this._def, shape: () => t })
    );
  }
  required(e) {
    const t = {};
    return (
      E.objectKeys(this.shape).forEach((i) => {
        if (e && !e[i]) t[i] = this.shape[i];
        else {
          let n = this.shape[i];
          while (n instanceof Z) n = n._def.innerType;
          t[i] = n;
        }
      }),
      new r({ ...this._def, shape: () => t })
    );
  }
  keyof() {
    return yr(E.objectKeys(this.shape));
  }
};
L.create = (r, e) =>
  new L({
    shape: () => r,
    unknownKeys: 'strip',
    catchall: F.create(),
    typeName: b.ZodObject,
    ...x(e),
  });
L.strictCreate = (r, e) =>
  new L({
    shape: () => r,
    unknownKeys: 'strict',
    catchall: F.create(),
    typeName: b.ZodObject,
    ...x(e),
  });
L.lazycreate = (r, e) =>
  new L({
    shape: r,
    unknownKeys: 'strip',
    catchall: F.create(),
    typeName: b.ZodObject,
    ...x(e),
  });
var ye = class extends k {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e),
      i = this._def.options;
    function a(n) {
      for (const o of n) if (o.result.status === 'valid') return o.result;
      for (const o of n)
        if (o.result.status === 'dirty')
          return t.common.issues.push(...o.ctx.common.issues), o.result;
      const s = n.map((o) => new j(o.ctx.common.issues));
      return g(t, { code: h.invalid_union, unionErrors: s }), _;
    }
    if (t.common.async)
      return Promise.all(
        i.map(async (n) => {
          const s = { ...t, common: { ...t.common, issues: [] }, parent: null };
          return {
            result: await n._parseAsync({
              data: t.data,
              path: t.path,
              parent: s,
            }),
            ctx: s,
          };
        })
      ).then(a);
    {
      let n,
        s = [];
      for (const c of i) {
        const f = { ...t, common: { ...t.common, issues: [] }, parent: null },
          y = c._parseSync({ data: t.data, path: t.path, parent: f });
        if (y.status === 'valid') return y;
        y.status === 'dirty' && !n && (n = { result: y, ctx: f }),
          f.common.issues.length && s.push(f.common.issues);
      }
      if (n) return t.common.issues.push(...n.ctx.common.issues), n.result;
      const o = s.map((c) => new j(c));
      return g(t, { code: h.invalid_union, unionErrors: o }), _;
    }
  }
  get options() {
    return this._def.options;
  }
};
ye.create = (r, e) => new ye({ options: r, typeName: b.ZodUnion, ...x(e) });
var G = (r) =>
    r instanceof be
      ? G(r.schema)
      : r instanceof D
        ? G(r.innerType())
        : r instanceof _e
          ? [r.value]
          : r instanceof xe
            ? r.options
            : r instanceof ke
              ? E.objectValues(r.enum)
              : r instanceof Ae
                ? G(r._def.innerType)
                : r instanceof ge
                  ? [void 0]
                  : r instanceof ve
                    ? [null]
                    : r instanceof Z
                      ? [void 0, ...G(r.unwrap())]
                      : r instanceof $
                        ? [null, ...G(r.unwrap())]
                        : r instanceof Xe || r instanceof Te
                          ? G(r.unwrap())
                          : r instanceof Ee
                            ? G(r._def.innerType)
                            : [],
  gt = class r extends k {
    _parse(e) {
      const { ctx: t } = this._processInputParams(e);
      if (t.parsedType !== v.object)
        return (
          g(t, {
            code: h.invalid_type,
            expected: v.object,
            received: t.parsedType,
          }),
          _
        );
      const i = this.discriminator,
        a = t.data[i],
        n = this.optionsMap.get(a);
      return n
        ? t.common.async
          ? n._parseAsync({ data: t.data, path: t.path, parent: t })
          : n._parseSync({ data: t.data, path: t.path, parent: t })
        : (g(t, {
            code: h.invalid_union_discriminator,
            options: Array.from(this.optionsMap.keys()),
            path: [i],
          }),
          _);
    }
    get discriminator() {
      return this._def.discriminator;
    }
    get options() {
      return this._def.options;
    }
    get optionsMap() {
      return this._def.optionsMap;
    }
    static create(e, t, i) {
      const a = new Map();
      for (const n of t) {
        const s = G(n.shape[e]);
        if (!s.length)
          throw new Error(
            `A discriminator value for key \`${e}\` could not be extracted from all schema options`
          );
        for (const o of s) {
          if (a.has(o))
            throw new Error(
              `Discriminator property ${String(e)} has duplicate value ${String(o)}`
            );
          a.set(o, n);
        }
      }
      return new r({
        typeName: b.ZodDiscriminatedUnion,
        discriminator: e,
        options: t,
        optionsMap: a,
        ...x(i),
      });
    }
  };
function Ut(r, e) {
  const t = J(r),
    i = J(e);
  if (r === e) return { valid: !0, data: r };
  if (t === v.object && i === v.object) {
    const a = E.objectKeys(e),
      n = E.objectKeys(r).filter((o) => a.indexOf(o) !== -1),
      s = { ...r, ...e };
    for (const o of n) {
      const c = Ut(r[o], e[o]);
      if (!c.valid) return { valid: !1 };
      s[o] = c.data;
    }
    return { valid: !0, data: s };
  } else if (t === v.array && i === v.array) {
    if (r.length !== e.length) return { valid: !1 };
    const a = [];
    for (let n = 0; n < r.length; n++) {
      const s = r[n],
        o = e[n],
        c = Ut(s, o);
      if (!c.valid) return { valid: !1 };
      a.push(c.data);
    }
    return { valid: !0, data: a };
  } else
    return t === v.date && i === v.date && +r == +e
      ? { valid: !0, data: r }
      : { valid: !1 };
}
var we = class extends k {
  _parse(e) {
    const { status: t, ctx: i } = this._processInputParams(e),
      a = (n, s) => {
        if (Zt(n) || Zt(s)) return _;
        const o = Ut(n.value, s.value);
        return o.valid
          ? ((zt(n) || zt(s)) && t.dirty(), { status: t.value, value: o.data })
          : (g(i, { code: h.invalid_intersection_types }), _);
      };
    return i.common.async
      ? Promise.all([
          this._def.left._parseAsync({ data: i.data, path: i.path, parent: i }),
          this._def.right._parseAsync({
            data: i.data,
            path: i.path,
            parent: i,
          }),
        ]).then(([n, s]) => a(n, s))
      : a(
          this._def.left._parseSync({ data: i.data, path: i.path, parent: i }),
          this._def.right._parseSync({ data: i.data, path: i.path, parent: i })
        );
  }
};
we.create = (r, e, t) =>
  new we({ left: r, right: e, typeName: b.ZodIntersection, ...x(t) });
var B = class r extends k {
  _parse(e) {
    const { status: t, ctx: i } = this._processInputParams(e);
    if (i.parsedType !== v.array)
      return (
        g(i, {
          code: h.invalid_type,
          expected: v.array,
          received: i.parsedType,
        }),
        _
      );
    if (i.data.length < this._def.items.length)
      return (
        g(i, {
          code: h.too_small,
          minimum: this._def.items.length,
          inclusive: !0,
          exact: !1,
          type: 'array',
        }),
        _
      );
    !this._def.rest &&
      i.data.length > this._def.items.length &&
      (g(i, {
        code: h.too_big,
        maximum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: 'array',
      }),
      t.dirty());
    const n = [...i.data]
      .map((s, o) => {
        const c = this._def.items[o] || this._def.rest;
        return c ? c._parse(new z(i, s, i.path, o)) : null;
      })
      .filter((s) => !!s);
    return i.common.async
      ? Promise.all(n).then((s) => O.mergeArray(t, s))
      : O.mergeArray(t, n);
  }
  get items() {
    return this._def.items;
  }
  rest(e) {
    return new r({ ...this._def, rest: e });
  }
};
B.create = (r, e) => {
  if (!Array.isArray(r))
    throw new Error('You must pass an array of schemas to z.tuple([ ... ])');
  return new B({ items: r, typeName: b.ZodTuple, rest: null, ...x(e) });
};
var vt = class r extends k {
    get keySchema() {
      return this._def.keyType;
    }
    get valueSchema() {
      return this._def.valueType;
    }
    _parse(e) {
      const { status: t, ctx: i } = this._processInputParams(e);
      if (i.parsedType !== v.object)
        return (
          g(i, {
            code: h.invalid_type,
            expected: v.object,
            received: i.parsedType,
          }),
          _
        );
      const a = [],
        n = this._def.keyType,
        s = this._def.valueType;
      for (const o in i.data)
        a.push({
          key: n._parse(new z(i, o, i.path, o)),
          value: s._parse(new z(i, i.data[o], i.path, o)),
          alwaysSet: o in i.data,
        });
      return i.common.async
        ? O.mergeObjectAsync(t, a)
        : O.mergeObjectSync(t, a);
    }
    get element() {
      return this._def.valueType;
    }
    static create(e, t, i) {
      return t instanceof k
        ? new r({ keyType: e, valueType: t, typeName: b.ZodRecord, ...x(i) })
        : new r({
            keyType: ie.create(),
            valueType: e,
            typeName: b.ZodRecord,
            ...x(t),
          });
    }
  },
  Pe = class extends k {
    get keySchema() {
      return this._def.keyType;
    }
    get valueSchema() {
      return this._def.valueType;
    }
    _parse(e) {
      const { status: t, ctx: i } = this._processInputParams(e);
      if (i.parsedType !== v.map)
        return (
          g(i, {
            code: h.invalid_type,
            expected: v.map,
            received: i.parsedType,
          }),
          _
        );
      const a = this._def.keyType,
        n = this._def.valueType,
        s = [...i.data.entries()].map(([o, c], f) => ({
          key: a._parse(new z(i, o, i.path, [f, 'key'])),
          value: n._parse(new z(i, c, i.path, [f, 'value'])),
        }));
      if (i.common.async) {
        const o = new Map();
        return Promise.resolve().then(async () => {
          for (const c of s) {
            const f = await c.key,
              y = await c.value;
            if (f.status === 'aborted' || y.status === 'aborted') return _;
            (f.status === 'dirty' || y.status === 'dirty') && t.dirty(),
              o.set(f.value, y.value);
          }
          return { status: t.value, value: o };
        });
      } else {
        const o = new Map();
        for (const c of s) {
          const f = c.key,
            y = c.value;
          if (f.status === 'aborted' || y.status === 'aborted') return _;
          (f.status === 'dirty' || y.status === 'dirty') && t.dirty(),
            o.set(f.value, y.value);
        }
        return { status: t.value, value: o };
      }
    }
  };
Pe.create = (r, e, t) =>
  new Pe({ valueType: e, keyType: r, typeName: b.ZodMap, ...x(t) });
var je = class r extends k {
  _parse(e) {
    const { status: t, ctx: i } = this._processInputParams(e);
    if (i.parsedType !== v.set)
      return (
        g(i, { code: h.invalid_type, expected: v.set, received: i.parsedType }),
        _
      );
    const a = this._def;
    a.minSize !== null &&
      i.data.size < a.minSize.value &&
      (g(i, {
        code: h.too_small,
        minimum: a.minSize.value,
        type: 'set',
        inclusive: !0,
        exact: !1,
        message: a.minSize.message,
      }),
      t.dirty()),
      a.maxSize !== null &&
        i.data.size > a.maxSize.value &&
        (g(i, {
          code: h.too_big,
          maximum: a.maxSize.value,
          type: 'set',
          inclusive: !0,
          exact: !1,
          message: a.maxSize.message,
        }),
        t.dirty());
    const n = this._def.valueType;
    function s(c) {
      const f = new Set();
      for (const y of c) {
        if (y.status === 'aborted') return _;
        y.status === 'dirty' && t.dirty(), f.add(y.value);
      }
      return { status: t.value, value: f };
    }
    const o = [...i.data.values()].map((c, f) =>
      n._parse(new z(i, c, i.path, f))
    );
    return i.common.async ? Promise.all(o).then((c) => s(c)) : s(o);
  }
  min(e, t) {
    return new r({
      ...this._def,
      minSize: { value: e, message: w.toString(t) },
    });
  }
  max(e, t) {
    return new r({
      ...this._def,
      maxSize: { value: e, message: w.toString(t) },
    });
  }
  size(e, t) {
    return this.min(e, t).max(e, t);
  }
  nonempty(e) {
    return this.min(1, e);
  }
};
je.create = (r, e) =>
  new je({
    valueType: r,
    minSize: null,
    maxSize: null,
    typeName: b.ZodSet,
    ...x(e),
  });
var yt = class r extends k {
    constructor() {
      super(...arguments), (this.validate = this.implement);
    }
    _parse(e) {
      const { ctx: t } = this._processInputParams(e);
      if (t.parsedType !== v.function)
        return (
          g(t, {
            code: h.invalid_type,
            expected: v.function,
            received: t.parsedType,
          }),
          _
        );
      function i(o, c) {
        return pt({
          data: o,
          path: t.path,
          errorMaps: [
            t.common.contextualErrorMap,
            t.schemaErrorMap,
            mt(),
            Le,
          ].filter((f) => !!f),
          issueData: { code: h.invalid_arguments, argumentsError: c },
        });
      }
      function a(o, c) {
        return pt({
          data: o,
          path: t.path,
          errorMaps: [
            t.common.contextualErrorMap,
            t.schemaErrorMap,
            mt(),
            Le,
          ].filter((f) => !!f),
          issueData: { code: h.invalid_return_type, returnTypeError: c },
        });
      }
      const n = { errorMap: t.common.contextualErrorMap },
        s = t.data;
      if (this._def.returns instanceof ne) {
        const o = this;
        return I(async function (...c) {
          const f = new j([]),
            y = await o._def.args.parseAsync(c, n).catch((re) => {
              throw (f.addIssue(i(c, re)), f);
            }),
            T = await Reflect.apply(s, this, y);
          return await o._def.returns._def.type.parseAsync(T, n).catch((re) => {
            throw (f.addIssue(a(T, re)), f);
          });
        });
      } else {
        const o = this;
        return I(function (...c) {
          const f = o._def.args.safeParse(c, n);
          if (!f.success) throw new j([i(c, f.error)]);
          const y = Reflect.apply(s, this, f.data),
            T = o._def.returns.safeParse(y, n);
          if (!T.success) throw new j([a(y, T.error)]);
          return T.data;
        });
      }
    }
    parameters() {
      return this._def.args;
    }
    returnType() {
      return this._def.returns;
    }
    args(...e) {
      return new r({ ...this._def, args: B.create(e).rest(Y.create()) });
    }
    returns(e) {
      return new r({ ...this._def, returns: e });
    }
    implement(e) {
      return this.parse(e);
    }
    strictImplement(e) {
      return this.parse(e);
    }
    static create(e, t, i) {
      return new r({
        args: e || B.create([]).rest(Y.create()),
        returns: t || Y.create(),
        typeName: b.ZodFunction,
        ...x(i),
      });
    }
  },
  be = class extends k {
    get schema() {
      return this._def.getter();
    }
    _parse(e) {
      const { ctx: t } = this._processInputParams(e);
      return this._def
        .getter()
        ._parse({ data: t.data, path: t.path, parent: t });
    }
  };
be.create = (r, e) => new be({ getter: r, typeName: b.ZodLazy, ...x(e) });
var _e = class extends k {
  _parse(e) {
    if (e.data !== this._def.value) {
      const t = this._getOrReturnCtx(e);
      return (
        g(t, {
          received: t.data,
          code: h.invalid_literal,
          expected: this._def.value,
        }),
        _
      );
    }
    return { status: 'valid', value: e.data };
  }
  get value() {
    return this._def.value;
  }
};
_e.create = (r, e) => new _e({ value: r, typeName: b.ZodLiteral, ...x(e) });
function yr(r, e) {
  return new xe({ values: r, typeName: b.ZodEnum, ...x(e) });
}
var xe = class r extends k {
  constructor() {
    super(...arguments), Ge.set(this, void 0);
  }
  _parse(e) {
    if (typeof e.data != 'string') {
      const t = this._getOrReturnCtx(e),
        i = this._def.values;
      return (
        g(t, {
          expected: E.joinValues(i),
          received: t.parsedType,
          code: h.invalid_type,
        }),
        _
      );
    }
    if (
      (ht(this, Ge, 'f') || pr(this, Ge, new Set(this._def.values), 'f'),
      !ht(this, Ge, 'f').has(e.data))
    ) {
      const t = this._getOrReturnCtx(e),
        i = this._def.values;
      return (
        g(t, { received: t.data, code: h.invalid_enum_value, options: i }), _
      );
    }
    return I(e.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const e = {};
    for (const t of this._def.values) e[t] = t;
    return e;
  }
  get Values() {
    const e = {};
    for (const t of this._def.values) e[t] = t;
    return e;
  }
  get Enum() {
    const e = {};
    for (const t of this._def.values) e[t] = t;
    return e;
  }
  extract(e, t = this._def) {
    return r.create(e, { ...this._def, ...t });
  }
  exclude(e, t = this._def) {
    return r.create(
      this.options.filter((i) => !e.includes(i)),
      { ...this._def, ...t }
    );
  }
};
Ge = new WeakMap();
xe.create = yr;
var ke = class extends k {
  constructor() {
    super(...arguments), Je.set(this, void 0);
  }
  _parse(e) {
    const t = E.getValidEnumValues(this._def.values),
      i = this._getOrReturnCtx(e);
    if (i.parsedType !== v.string && i.parsedType !== v.number) {
      const a = E.objectValues(t);
      return (
        g(i, {
          expected: E.joinValues(a),
          received: i.parsedType,
          code: h.invalid_type,
        }),
        _
      );
    }
    if (
      (ht(this, Je, 'f') ||
        pr(this, Je, new Set(E.getValidEnumValues(this._def.values)), 'f'),
      !ht(this, Je, 'f').has(e.data))
    ) {
      const a = E.objectValues(t);
      return (
        g(i, { received: i.data, code: h.invalid_enum_value, options: a }), _
      );
    }
    return I(e.data);
  }
  get enum() {
    return this._def.values;
  }
};
Je = new WeakMap();
ke.create = (r, e) => new ke({ values: r, typeName: b.ZodNativeEnum, ...x(e) });
var ne = class extends k {
  unwrap() {
    return this._def.type;
  }
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    if (t.parsedType !== v.promise && t.common.async === !1)
      return (
        g(t, {
          code: h.invalid_type,
          expected: v.promise,
          received: t.parsedType,
        }),
        _
      );
    const i = t.parsedType === v.promise ? t.data : Promise.resolve(t.data);
    return I(
      i.then((a) =>
        this._def.type.parseAsync(a, {
          path: t.path,
          errorMap: t.common.contextualErrorMap,
        })
      )
    );
  }
};
ne.create = (r, e) => new ne({ type: r, typeName: b.ZodPromise, ...x(e) });
var D = class extends k {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === b.ZodEffects
      ? this._def.schema.sourceType()
      : this._def.schema;
  }
  _parse(e) {
    const { status: t, ctx: i } = this._processInputParams(e),
      a = this._def.effect || null,
      n = {
        addIssue: (s) => {
          g(i, s), s.fatal ? t.abort() : t.dirty();
        },
        get path() {
          return i.path;
        },
      };
    if (((n.addIssue = n.addIssue.bind(n)), a.type === 'preprocess')) {
      const s = a.transform(i.data, n);
      if (i.common.async)
        return Promise.resolve(s).then(async (o) => {
          if (t.value === 'aborted') return _;
          const c = await this._def.schema._parseAsync({
            data: o,
            path: i.path,
            parent: i,
          });
          return c.status === 'aborted'
            ? _
            : c.status === 'dirty' || t.value === 'dirty'
              ? Ie(c.value)
              : c;
        });
      {
        if (t.value === 'aborted') return _;
        const o = this._def.schema._parseSync({
          data: s,
          path: i.path,
          parent: i,
        });
        return o.status === 'aborted'
          ? _
          : o.status === 'dirty' || t.value === 'dirty'
            ? Ie(o.value)
            : o;
      }
    }
    if (a.type === 'refinement') {
      const s = (o) => {
        const c = a.refinement(o, n);
        if (i.common.async) return Promise.resolve(c);
        if (c instanceof Promise)
          throw new Error(
            'Async refinement encountered during synchronous parse operation. Use .parseAsync instead.'
          );
        return o;
      };
      if (i.common.async === !1) {
        const o = this._def.schema._parseSync({
          data: i.data,
          path: i.path,
          parent: i,
        });
        return o.status === 'aborted'
          ? _
          : (o.status === 'dirty' && t.dirty(),
            s(o.value),
            { status: t.value, value: o.value });
      } else
        return this._def.schema
          ._parseAsync({ data: i.data, path: i.path, parent: i })
          .then((o) =>
            o.status === 'aborted'
              ? _
              : (o.status === 'dirty' && t.dirty(),
                s(o.value).then(() => ({ status: t.value, value: o.value })))
          );
    }
    if (a.type === 'transform')
      if (i.common.async === !1) {
        const s = this._def.schema._parseSync({
          data: i.data,
          path: i.path,
          parent: i,
        });
        if (!le(s)) return s;
        const o = a.transform(s.value, n);
        if (o instanceof Promise)
          throw new Error(
            'Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.'
          );
        return { status: t.value, value: o };
      } else
        return this._def.schema
          ._parseAsync({ data: i.data, path: i.path, parent: i })
          .then((s) =>
            le(s)
              ? Promise.resolve(a.transform(s.value, n)).then((o) => ({
                  status: t.value,
                  value: o,
                }))
              : s
          );
    E.assertNever(a);
  }
};
D.create = (r, e, t) =>
  new D({ schema: r, typeName: b.ZodEffects, effect: e, ...x(t) });
D.createWithPreprocess = (r, e, t) =>
  new D({
    schema: e,
    effect: { type: 'preprocess', transform: r },
    typeName: b.ZodEffects,
    ...x(t),
  });
var Z = class extends k {
  _parse(e) {
    return this._getType(e) === v.undefined
      ? I(void 0)
      : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
};
Z.create = (r, e) => new Z({ innerType: r, typeName: b.ZodOptional, ...x(e) });
var $ = class extends k {
  _parse(e) {
    return this._getType(e) === v.null
      ? I(null)
      : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
};
$.create = (r, e) => new $({ innerType: r, typeName: b.ZodNullable, ...x(e) });
var Ae = class extends k {
  _parse(e) {
    let { ctx: t } = this._processInputParams(e),
      i = t.data;
    return (
      t.parsedType === v.undefined && (i = this._def.defaultValue()),
      this._def.innerType._parse({ data: i, path: t.path, parent: t })
    );
  }
  removeDefault() {
    return this._def.innerType;
  }
};
Ae.create = (r, e) =>
  new Ae({
    innerType: r,
    typeName: b.ZodDefault,
    defaultValue: typeof e.default == 'function' ? e.default : () => e.default,
    ...x(e),
  });
var Ee = class extends k {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e),
      i = { ...t, common: { ...t.common, issues: [] } },
      a = this._def.innerType._parse({
        data: i.data,
        path: i.path,
        parent: { ...i },
      });
    return Ye(a)
      ? a.then((n) => ({
          status: 'valid',
          value:
            n.status === 'valid'
              ? n.value
              : this._def.catchValue({
                  get error() {
                    return new j(i.common.issues);
                  },
                  input: i.data,
                }),
        }))
      : {
          status: 'valid',
          value:
            a.status === 'valid'
              ? a.value
              : this._def.catchValue({
                  get error() {
                    return new j(i.common.issues);
                  },
                  input: i.data,
                }),
        };
  }
  removeCatch() {
    return this._def.innerType;
  }
};
Ee.create = (r, e) =>
  new Ee({
    innerType: r,
    typeName: b.ZodCatch,
    catchValue: typeof e.catch == 'function' ? e.catch : () => e.catch,
    ...x(e),
  });
var De = class extends k {
  _parse(e) {
    if (this._getType(e) !== v.nan) {
      const i = this._getOrReturnCtx(e);
      return (
        g(i, { code: h.invalid_type, expected: v.nan, received: i.parsedType }),
        _
      );
    }
    return { status: 'valid', value: e.data };
  }
};
De.create = (r) => new De({ typeName: b.ZodNaN, ...x(r) });
var Ii = Symbol('zod_brand'),
  Xe = class extends k {
    _parse(e) {
      const { ctx: t } = this._processInputParams(e),
        i = t.data;
      return this._def.type._parse({ data: i, path: t.path, parent: t });
    }
    unwrap() {
      return this._def.type;
    }
  },
  Qe = class r extends k {
    _parse(e) {
      const { status: t, ctx: i } = this._processInputParams(e);
      if (i.common.async)
        return (async () => {
          const n = await this._def.in._parseAsync({
            data: i.data,
            path: i.path,
            parent: i,
          });
          return n.status === 'aborted'
            ? _
            : n.status === 'dirty'
              ? (t.dirty(), Ie(n.value))
              : this._def.out._parseAsync({
                  data: n.value,
                  path: i.path,
                  parent: i,
                });
        })();
      {
        const a = this._def.in._parseSync({
          data: i.data,
          path: i.path,
          parent: i,
        });
        return a.status === 'aborted'
          ? _
          : a.status === 'dirty'
            ? (t.dirty(), { status: 'dirty', value: a.value })
            : this._def.out._parseSync({
                data: a.value,
                path: i.path,
                parent: i,
              });
      }
    }
    static create(e, t) {
      return new r({ in: e, out: t, typeName: b.ZodPipeline });
    }
  },
  Te = class extends k {
    _parse(e) {
      const t = this._def.innerType._parse(e),
        i = (a) => (le(a) && (a.value = Object.freeze(a.value)), a);
      return Ye(t) ? t.then((a) => i(a)) : i(t);
    }
    unwrap() {
      return this._def.innerType;
    }
  };
Te.create = (r, e) =>
  new Te({ innerType: r, typeName: b.ZodReadonly, ...x(e) });
function wr(r, e = {}, t) {
  return r
    ? ae.create().superRefine((i, a) => {
        var n, s;
        if (!r(i)) {
          const o =
              typeof e == 'function'
                ? e(i)
                : typeof e == 'string'
                  ? { message: e }
                  : e,
            c =
              (s = (n = o.fatal) !== null && n !== void 0 ? n : t) !== null &&
              s !== void 0
                ? s
                : !0,
            f = typeof o == 'string' ? { message: o } : o;
          a.addIssue({ code: 'custom', ...f, fatal: c });
        }
      })
    : ae.create();
}
var Li = { object: L.lazycreate },
  b;
((r) => {
  (r.ZodString = 'ZodString'),
    (r.ZodNumber = 'ZodNumber'),
    (r.ZodNaN = 'ZodNaN'),
    (r.ZodBigInt = 'ZodBigInt'),
    (r.ZodBoolean = 'ZodBoolean'),
    (r.ZodDate = 'ZodDate'),
    (r.ZodSymbol = 'ZodSymbol'),
    (r.ZodUndefined = 'ZodUndefined'),
    (r.ZodNull = 'ZodNull'),
    (r.ZodAny = 'ZodAny'),
    (r.ZodUnknown = 'ZodUnknown'),
    (r.ZodNever = 'ZodNever'),
    (r.ZodVoid = 'ZodVoid'),
    (r.ZodArray = 'ZodArray'),
    (r.ZodObject = 'ZodObject'),
    (r.ZodUnion = 'ZodUnion'),
    (r.ZodDiscriminatedUnion = 'ZodDiscriminatedUnion'),
    (r.ZodIntersection = 'ZodIntersection'),
    (r.ZodTuple = 'ZodTuple'),
    (r.ZodRecord = 'ZodRecord'),
    (r.ZodMap = 'ZodMap'),
    (r.ZodSet = 'ZodSet'),
    (r.ZodFunction = 'ZodFunction'),
    (r.ZodLazy = 'ZodLazy'),
    (r.ZodLiteral = 'ZodLiteral'),
    (r.ZodEnum = 'ZodEnum'),
    (r.ZodEffects = 'ZodEffects'),
    (r.ZodNativeEnum = 'ZodNativeEnum'),
    (r.ZodOptional = 'ZodOptional'),
    (r.ZodNullable = 'ZodNullable'),
    (r.ZodDefault = 'ZodDefault'),
    (r.ZodCatch = 'ZodCatch'),
    (r.ZodPromise = 'ZodPromise'),
    (r.ZodBranded = 'ZodBranded'),
    (r.ZodPipeline = 'ZodPipeline'),
    (r.ZodReadonly = 'ZodReadonly');
})(b || (b = {}));
var Ni = (r, e = { message: `Input not instance of ${r.name}` }) =>
    wr((t) => t instanceof r, e),
  br = ie.create,
  _r = fe.create,
  Mi = De.create,
  Pi = me.create,
  xr = pe.create,
  ji = he.create,
  Di = Ne.create,
  Zi = ge.create,
  zi = ve.create,
  Ui = ae.create,
  Fi = Y.create,
  Vi = F.create,
  Bi = Me.create,
  $i = X.create,
  Hi = L.create,
  Wi = L.strictCreate,
  qi = ye.create,
  Gi = gt.create,
  Ji = we.create,
  Yi = B.create,
  Xi = vt.create,
  Qi = Pe.create,
  Ki = je.create,
  ea = yt.create,
  ta = be.create,
  ra = _e.create,
  ia = xe.create,
  aa = ke.create,
  na = ne.create,
  fr = D.create,
  sa = Z.create,
  oa = $.create,
  ca = D.createWithPreprocess,
  da = Qe.create,
  ua = () => br().optional(),
  la = () => _r().optional(),
  fa = () => xr().optional(),
  ma = {
    string: (r) => ie.create({ ...r, coerce: !0 }),
    number: (r) => fe.create({ ...r, coerce: !0 }),
    boolean: (r) => pe.create({ ...r, coerce: !0 }),
    bigint: (r) => me.create({ ...r, coerce: !0 }),
    date: (r) => he.create({ ...r, coerce: !0 }),
  },
  pa = _,
  Ke = Object.freeze({
    __proto__: null,
    defaultErrorMap: Le,
    setErrorMap: ci,
    getErrorMap: mt,
    makeIssue: pt,
    EMPTY_PATH: di,
    addIssueToContext: g,
    ParseStatus: O,
    INVALID: _,
    DIRTY: Ie,
    OK: I,
    isAborted: Zt,
    isDirty: zt,
    isValid: le,
    isAsync: Ye,
    get util() {
      return E;
    },
    get objectUtil() {
      return Dt;
    },
    ZodParsedType: v,
    getParsedType: J,
    ZodType: k,
    datetimeRegex: vr,
    ZodString: ie,
    ZodNumber: fe,
    ZodBigInt: me,
    ZodBoolean: pe,
    ZodDate: he,
    ZodSymbol: Ne,
    ZodUndefined: ge,
    ZodNull: ve,
    ZodAny: ae,
    ZodUnknown: Y,
    ZodNever: F,
    ZodVoid: Me,
    ZodArray: X,
    ZodObject: L,
    ZodUnion: ye,
    ZodDiscriminatedUnion: gt,
    ZodIntersection: we,
    ZodTuple: B,
    ZodRecord: vt,
    ZodMap: Pe,
    ZodSet: je,
    ZodFunction: yt,
    ZodLazy: be,
    ZodLiteral: _e,
    ZodEnum: xe,
    ZodNativeEnum: ke,
    ZodPromise: ne,
    ZodEffects: D,
    ZodTransformer: D,
    ZodOptional: Z,
    ZodNullable: $,
    ZodDefault: Ae,
    ZodCatch: Ee,
    ZodNaN: De,
    BRAND: Ii,
    ZodBranded: Xe,
    ZodPipeline: Qe,
    ZodReadonly: Te,
    custom: wr,
    Schema: k,
    ZodSchema: k,
    late: Li,
    get ZodFirstPartyTypeKind() {
      return b;
    },
    coerce: ma,
    any: Ui,
    array: $i,
    bigint: Pi,
    boolean: xr,
    date: ji,
    discriminatedUnion: Gi,
    effect: fr,
    enum: ia,
    function: ea,
    instanceof: Ni,
    intersection: Ji,
    lazy: ta,
    literal: ra,
    map: Qi,
    nan: Mi,
    nativeEnum: aa,
    never: Vi,
    null: zi,
    nullable: oa,
    number: _r,
    object: Hi,
    oboolean: fa,
    onumber: la,
    optional: sa,
    ostring: ua,
    pipeline: da,
    preprocess: ca,
    promise: na,
    record: Xi,
    set: Ki,
    strictObject: Wi,
    string: br,
    symbol: Di,
    transformer: fr,
    tuple: Yi,
    undefined: Zi,
    union: qi,
    unknown: Fi,
    void: Bi,
    NEVER: pa,
    ZodIssueCode: h,
    quotelessJson: oi,
    ZodError: j,
  });
var ha = Ke.object({
  adId: Ke.string(),
  adPlacement: Ke.string(),
  adSize: Ke.string(),
});
async function ga(r, e = 3, t = 1e3) {
  for (let i = 0; i < e; i++) {
    const a = await r();
    if (a !== void 0) return a;
    await new Promise((n) => setTimeout(n, t));
  }
  throw new Error('Max retries exceeded');
}
var Ft = class {
    element;
    constructor(e, t, i) {
      (this.element = e),
        this.getAttributes().adId ||
          t().then((a) => {
            if ((console.log('Ad', a), a && !this.getAttributes().adId)) {
              this.element.setAttribute('data-ad-id', a.id);
              const n = a.dimensions,
                s = document.createElement('div');
              (s.style.width = `${n.width}px`),
                (s.style.height = `${n.height}px`);
              const o = document.createElement('img');
              o.setAttribute('src', a.content),
                s.appendChild(o),
                e.appendChild(s),
                i();
            }
          });
    }
    getAttributes() {
      return ha.partial().parse(this.element.dataset);
    }
  },
  wt = class {
    advertisments = [];
    config;
    ads = [];
    cb;
    constructor({ path: e = '/api/advertisement', ...t }, i) {
      (this.config = { ...t, path: e }),
        requestIdleCallback(() => {
          this.getAds().then((a) => {
            this.ads = a;
          });
        }),
        console.log('AdvertisementConfigurer wassup', this.config),
        (this.cb = i);
    }
    async getPromisedAd() {
      return ga(async () => this.getAd());
    }
    getAd() {
      return this.ads.shift();
    }
    async getAds() {
      const e = { organizationId: this.config.organizationId };
      return await (
        await fetch(this.config.path, {
          method: 'POST',
          body: JSON.stringify(e),
        })
      ).json();
    }
    init() {
      this.configureIns();
    }
    configureIns() {
      const e = document.querySelectorAll('ins');
      console.log('configure Ads', e),
        e.forEach((t, i) => {
          this.advertisments.push(
            new Ft(t, this.getPromisedAd.bind(this), this.cb)
          );
        });
    }
  };
var va = '2.0.1',
  Qt = 500,
  kr = 'user-agent',
  Ve = '',
  Ar = '?',
  kt = 'function',
  de = 'undefined',
  Be = 'object',
  Kt = 'string',
  N = 'browser',
  Q = 'cpu',
  W = 'device',
  V = 'engine',
  U = 'os',
  Ue = 'result',
  l = 'name',
  d = 'type',
  m = 'vendor',
  p = 'version',
  M = 'architecture',
  dt = 'major',
  u = 'model',
  ot = 'console',
  A = 'mobile',
  C = 'tablet',
  S = 'smarttv',
  H = 'wearable',
  Vt = 'xr',
  ct = 'embedded',
  et = 'inapp',
  rr = 'brands',
  Se = 'formFactors',
  ir = 'fullVersionList',
  Fe = 'platform',
  ar = 'platformVersion',
  Et = 'bitness',
  ue = 'sec-ch-ua',
  ya = ue + '-full-version-list',
  wa = ue + '-arch',
  ba = ue + '-' + Et,
  _a = ue + '-form-factors',
  xa = ue + '-' + A,
  ka = ue + '-' + u,
  Ur = ue + '-' + Fe,
  Aa = Ur + '-version',
  Fr = [rr, ir, A, u, Fe, ar, M, Se, Et],
  bt = 'Amazon',
  Ze = 'Apple',
  Er = 'ASUS',
  Tr = 'BlackBerry',
  Ce = 'Google',
  Cr = 'Huawei',
  Sr = 'Lenovo',
  Rr = 'Honor',
  _t = 'LG',
  Bt = 'Microsoft',
  $t = 'Motorola',
  Ht = 'Nvidia',
  Or = 'OnePlus',
  Wt = 'OPPO',
  tt = 'Samsung',
  Ir = 'Sharp',
  rt = 'Sony',
  qt = 'Xiaomi',
  Gt = 'Zebra',
  Lr = 'Chrome',
  Nr = 'Chromium',
  se = 'Chromecast',
  Ea = 'Edge',
  it = 'Firefox',
  at = 'Opera',
  Mr = 'Facebook',
  Pr = 'Sogou',
  ze = 'Mobile ',
  nt = ' Browser',
  er = 'Windows',
  Ta = typeof window !== de,
  P = Ta && window.navigator ? window.navigator : void 0,
  oe = P && P.userAgentData ? P.userAgentData : void 0,
  Ca = (r, e) => {
    var t = {},
      i = e;
    if (!At(e)) {
      i = {};
      for (var a in e)
        for (var n in e[a]) i[n] = e[a][n].concat(i[n] ? i[n] : []);
    }
    for (var s in r)
      t[s] = i[s] && i[s].length % 2 === 0 ? i[s].concat(r[s]) : r[s];
    return t;
  },
  Tt = (r) => {
    for (var e = {}, t = 0; t < r.length; t++) e[r[t].toUpperCase()] = r[t];
    return e;
  },
  tr = (r, e) => {
    if (typeof r === Be && r.length > 0) {
      for (var t in r) if (K(r[t]) == K(e)) return !0;
      return !1;
    }
    return He(r) ? K(e).indexOf(K(r)) !== -1 : !1;
  },
  At = (r, e) => {
    for (var t in r)
      return /^(browser|cpu|device|engine|os)$/.test(t) || (e ? At(r[t]) : !1);
  },
  He = (r) => typeof r === Kt,
  Jt = (r) => {
    if (r) {
      for (var e = [], t = $e(/\\?"/g, r).split(','), i = 0; i < t.length; i++)
        if (t[i].indexOf(';') > -1) {
          var a = ut(t[i]).split(';v=');
          e[i] = { brand: a[0], version: a[1] };
        } else e[i] = ut(t[i]);
      return e;
    }
  },
  K = (r) => (He(r) ? r.toLowerCase() : r),
  Yt = (r) => (He(r) ? $e(/[^\d.]/g, r).split('.')[0] : void 0),
  ee = function (r) {
    for (var e in r) {
      var t = r[e];
      typeof t == Be && t.length == 2
        ? (this[t[0]] = t[1])
        : (this[t] = void 0);
    }
    return this;
  },
  $e = (r, e) => (He(e) ? e.replace(r, Ve) : e),
  st = (r) => $e(/\\?"/g, r),
  ut = (r, e) => {
    if (He(r))
      return (r = $e(/^\s\s*/, r)), typeof e === de ? r : r.substring(0, Qt);
  },
  Xt = function (r, e) {
    if (!(!r || !e))
      for (var t = 0, i, a, n, s, o, c; t < e.length && !o; ) {
        var f = e[t],
          y = e[t + 1];
        for (i = a = 0; i < f.length && !o && f[i]; )
          if (((o = f[i++].exec(r)), o))
            for (n = 0; n < y.length; n++)
              (c = o[++a]),
                (s = y[n]),
                typeof s === Be && s.length > 0
                  ? s.length === 2
                    ? typeof s[1] == kt
                      ? (this[s[0]] = s[1].call(this, c))
                      : (this[s[0]] = s[1])
                    : s.length === 3
                      ? typeof s[1] === kt && !(s[1].exec && s[1].test)
                        ? (this[s[0]] = c ? s[1].call(this, c, s[2]) : void 0)
                        : (this[s[0]] = c ? c.replace(s[1], s[2]) : void 0)
                      : s.length === 4 &&
                        (this[s[0]] = c
                          ? s[3].call(this, c.replace(s[1], s[2]))
                          : void 0)
                  : (this[s] = c || void 0);
        t += 2;
      }
  },
  ce = (r, e) => {
    for (var t in e)
      if (typeof e[t] === Be && e[t].length > 0) {
        for (var i = 0; i < e[t].length; i++)
          if (tr(e[t][i], r)) return t === Ar ? void 0 : t;
      } else if (tr(e[t], r)) return t === Ar ? void 0 : t;
    return e.hasOwnProperty('*') ? e['*'] : r;
  },
  jr = {
    ME: '4.90',
    'NT 3.11': 'NT3.51',
    'NT 4.0': 'NT4.0',
    2e3: 'NT 5.0',
    XP: ['NT 5.1', 'NT 5.2'],
    Vista: 'NT 6.0',
    7: 'NT 6.1',
    8: 'NT 6.2',
    8.1: 'NT 6.3',
    10: ['NT 6.4', 'NT 10.0'],
    RT: 'ARM',
  },
  Dr = {
    embedded: 'Automotive',
    mobile: 'Mobile',
    tablet: ['Tablet', 'EInk'],
    smarttv: 'TV',
    wearable: 'Watch',
    xr: ['VR', 'XR'],
    '?': ['Desktop', 'Unknown'],
    '*': void 0,
  },
  Zr = {
    browser: [
      [/\b(?:crmo|crios)\/([\w.]+)/i],
      [p, [l, ze + 'Chrome']],
      [/edg(?:e|ios|a)?\/([\w.]+)/i],
      [p, [l, 'Edge']],
      [
        /(opera mini)\/([-\w.]+)/i,
        /(opera [mobiletab]{3,6})\b.+version\/([-\w.]+)/i,
        /(opera)(?:.+version\/|[/ ]+)([\w.]+)/i,
      ],
      [l, p],
      [/opios[/ ]+([\w.]+)/i],
      [p, [l, at + ' Mini']],
      [/\bop(?:rg)?x\/([\w.]+)/i],
      [p, [l, at + ' GX']],
      [/\bopr\/([\w.]+)/i],
      [p, [l, at]],
      [/\bb[ai]*d(?:uhd|[ub]*[aekoprswx]{5,6})[/ ]?([\w.]+)/i],
      [p, [l, 'Baidu']],
      [/\b(?:mxbrowser|mxios|myie2)\/?([-\w.]*)\b/i],
      [p, [l, 'Maxthon']],
      [
        /(kindle)\/([\w.]+)/i,
        /(lunascape|maxthon|netfront|jasmine|blazer|sleipnir)[/ ]?([\w.]*)/i,
        /(avant|iemobile|slim(?:browser|boat|jet))[/ ]?([\d.]*)/i,
        /(?:ms|\()(ie) ([\w.]+)/i,
        /(flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|duckduckgo|klar|helio|(?=comodo_)?dragon)\/([-\w.]+)/i,
        /(heytap|ovi|115)browser\/([\d.]+)/i,
        /(weibo)__([\d.]+)/i,
      ],
      [l, p],
      [/quark(?:pc)?\/([-\w.]+)/i],
      [p, [l, 'Quark']],
      [/\bddg\/([\w.]+)/i],
      [p, [l, 'DuckDuckGo']],
      [/(?:\buc? ?browser|(?:juc.+)ucweb)[/ ]?([\w.]+)/i],
      [p, [l, 'UCBrowser']],
      [
        /microm.+\bqbcore\/([\w.]+)/i,
        /\bqbcore\/([\w.]+).+microm/i,
        /micromessenger\/([\w.]+)/i,
      ],
      [p, [l, 'WeChat']],
      [/konqueror\/([\w.]+)/i],
      [p, [l, 'Konqueror']],
      [/trident.+rv[: ]([\w.]{1,9})\b.+like gecko/i],
      [p, [l, 'IE']],
      [/ya(?:search)?browser\/([\w.]+)/i],
      [p, [l, 'Yandex']],
      [/slbrowser\/([\w.]+)/i],
      [p, [l, 'Smart ' + Sr + nt]],
      [/(avast|avg)\/([\w.]+)/i],
      [[l, /(.+)/, '$1 Secure' + nt], p],
      [/\bfocus\/([\w.]+)/i],
      [p, [l, it + ' Focus']],
      [/\bopt\/([\w.]+)/i],
      [p, [l, at + ' Touch']],
      [/coc_coc\w+\/([\w.]+)/i],
      [p, [l, 'Coc Coc']],
      [/dolfin\/([\w.]+)/i],
      [p, [l, 'Dolphin']],
      [/coast\/([\w.]+)/i],
      [p, [l, at + ' Coast']],
      [/miuibrowser\/([\w.]+)/i],
      [p, [l, 'MIUI' + nt]],
      [/fxios\/([\w.-]+)/i],
      [p, [l, ze + it]],
      [/\bqihoobrowser\/?([\w.]*)/i],
      [p, [l, '360']],
      [/\b(qq)\/([\w.]+)/i],
      [[l, /(.+)/, '$1Browser'], p],
      [/(oculus|sailfish|huawei|vivo|pico)browser\/([\w.]+)/i],
      [[l, /(.+)/, '$1' + nt], p],
      [/samsungbrowser\/([\w.]+)/i],
      [p, [l, tt + ' Internet']],
      [/metasr[/ ]?([\d.]+)/i],
      [p, [l, Pr + ' Explorer']],
      [/(sogou)mo\w+\/([\d.]+)/i],
      [[l, Pr + ' Mobile'], p],
      [
        /(electron)\/([\w.]+) safari/i,
        /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w.]+))/i,
        /m?(qqbrowser|2345(?=browser|chrome|explorer))\w*[/ ]?v?([\w.]+)/i,
      ],
      [l, p],
      [/(lbbrowser|rekonq)/i],
      [l],
      [/ome\/([\w.]+) \w* ?(iron) saf/i, /ome\/([\w.]+).+qihu (360)[es]e/i],
      [p, l],
      [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w.]+);)/i],
      [[l, Mr], p, [d, et]],
      [
        /(Klarna)\/([\w.]+)/i,
        /(kakao(?:talk|story))[/ ]([\w.]+)/i,
        /(naver)\(.*?(\d+\.[\w.]+).*\)/i,
        /(daum)apps[/ ]([\w.]+)/i,
        /safari (line)\/([\w.]+)/i,
        /\b(line)\/([\w.]+)\/iab/i,
        /(alipay)client\/([\w.]+)/i,
        /(twitter)(?:and| f.+e\/([\w.]+))/i,
        /(instagram|snapchat)[/ ]([-\w.]+)/i,
      ],
      [l, p, [d, et]],
      [/\bgsa\/([\w.]+) .*safari\//i],
      [p, [l, 'GSA'], [d, et]],
      [/musical_ly(?:.+app_?version\/|_)([\w.]+)/i],
      [p, [l, 'TikTok'], [d, et]],
      [/\[(linkedin)app\]/i],
      [l, [d, et]],
      [/(chromium)[/ ]([-\w.]+)/i],
      [l, p],
      [/headlesschrome(?:\/([\w.]+)| )/i],
      [p, [l, Lr + ' Headless']],
      [/ wv\).+(chrome)\/([\w.]+)/i],
      [[l, Lr + ' WebView'], p],
      [/droid.+ version\/([\w.]+)\b.+(?:mobile safari|safari)/i],
      [p, [l, 'Android' + nt]],
      [/chrome\/([\w.]+) mobile/i],
      [p, [l, ze + 'Chrome']],
      [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w.]+)/i],
      [l, p],
      [/version\/([\w.,]+) .*mobile(?:\/\w+ | ?)safari/i],
      [p, [l, ze + 'Safari']],
      [/iphone .*mobile(?:\/\w+ | ?)safari/i],
      [[l, ze + 'Safari']],
      [/version\/([\w.,]+) .*(safari)/i],
      [p, l],
      [/webkit.+?(mobile ?safari|safari)(\/[\w.]+)/i],
      [l, [p, '1']],
      [/(webkit|khtml)\/([\w.]+)/i],
      [l, p],
      [/(?:mobile|tablet);.*(firefox)\/([\w.-]+)/i],
      [[l, ze + it], p],
      [/(navigator|netscape\d?)\/([-\w.]+)/i],
      [[l, 'Netscape'], p],
      [/(wolvic|librewolf)\/([\w.]+)/i],
      [l, p],
      [/mobile vr; rv:([\w.]+)\).+firefox/i],
      [p, [l, it + ' Reality']],
      [
        /ekiohf.+(flow)\/([\w.]+)/i,
        /(swiftfox)/i,
        /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror)[/ ]?([\w.+]+)/i,
        /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w.]+)$/i,
        /(firefox)\/([\w.]+)/i,
        /(mozilla)\/([\w.]+) .+rv:.+gecko\/\d+/i,
        /(amaya|dillo|doris|icab|ladybird|lynx|mosaic|netsurf|obigo|polaris|w3m|(?:go|ice|up)[. ]?browser)[-/ ]?v?([\w.]+)/i,
        /\b(links) \(([\w.]+)/i,
      ],
      [l, [p, /_/g, '.']],
      [/(cobalt)\/([\w.]+)/i],
      [l, [p, /[^\d.]+./, Ve]],
    ],
    cpu: [
      [/\b((amd|x|x86[-_]?|wow|win)64)\b/i],
      [[M, 'amd64']],
      [/(ia32(?=;))/i, /\b((i[346]|x)86)(pc)?\b/i],
      [[M, 'ia32']],
      [/\b(aarch64|arm(v?[89]e?l?|_?64))\b/i],
      [[M, 'arm64']],
      [/\b(arm(v[67])?ht?n?[fl]p?)\b/i],
      [[M, 'armhf']],
      [/( (ce|mobile); ppc;|\/[\w.]+arm\b)/i],
      [[M, 'arm']],
      [/((ppc|powerpc)(64)?)( mac|;|\))/i],
      [[M, /ower/, Ve, K]],
      [/ sun4\w[;)]/i],
      [[M, 'sparc']],
      [
        /\b(avr32|ia64(?=;)|68k(?=\))|\barm(?=v([1-7]|[5-7]1)l?|;|eabi)|(irix|mips|sparc)(64)?\b|pa-risc)/i,
      ],
      [[M, K]],
    ],
    device: [
      [
        /\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i,
      ],
      [u, [m, tt], [d, C]],
      [
        /\b((?:s[cgp]h|gt|sm)-(?![lr])\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,
        /samsung[- ]((?!sm-[lr])[-\w]+)/i,
        /sec-(sgh\w+)/i,
      ],
      [u, [m, tt], [d, A]],
      [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i],
      [u, [m, Ze], [d, A]],
      [
        /\((ipad);[-\w),; ]+apple/i,
        /applecoremedia\/[\w.]+ \((ipad)/i,
        /\b(ipad)\d\d?,\d\d?[;\]].+ios/i,
      ],
      [u, [m, Ze], [d, C]],
      [/(macintosh);/i],
      [u, [m, Ze]],
      [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i],
      [u, [m, Ir], [d, A]],
      [
        /\b((?:brt|eln|hey2?|gdi|jdn)-a?[lnw]09|(?:ag[rm]3?|jdn2|kob2)-a?[lw]0[09]hn)(?: bui|\)|;)/i,
      ],
      [u, [m, Rr], [d, C]],
      [/honor([-\w ]+)[;)]/i],
      [u, [m, Rr], [d, A]],
      [
        /\b((?:ag[rs][2356]?k?|bah[234]?|bg[2o]|bt[kv]|cmr|cpn|db[ry]2?|jdn2|got|kob2?k?|mon|pce|scm|sht?|[tw]gr|vrd)-[ad]?[lw][0125][09]b?|605hw|bg2-u03|(?:gem|fdr|m2|ple|t1)-[7a]0[1-4][lu]|t1-a2[13][lw]|mediapad[\w. ]*(?= bui|\)))\b(?!.+d\/s)/i,
      ],
      [u, [m, Cr], [d, C]],
      [
        /(?:huawei)([-\w ]+)[;)]/i,
        /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i,
      ],
      [u, [m, Cr], [d, A]],
      [
        /oid[^)]+; (2[\dbc]{4}(182|283|rp\w{2})[cgl]|m2105k81a?c)(?: bui|\))/i,
        /\b((?:red)?mi[-_ ]?pad[\w- ]*)(?: bui|\))/i,
      ],
      [
        [u, /_/g, ' '],
        [m, qt],
        [d, C],
      ],
      [
        /\b(poco[\w ]+|m2\d{3}j\d\d[a-z]{2})(?: bui|\))/i,
        /\b; (\w+) build\/hm\1/i,
        /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,
        /\b(redmi[-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,
        /oid[^)]+; (m?[12][0-389][01]\w{3,6}[c-y])( bui|; wv|\))/i,
        /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite|pro)?)(?: bui|\))/i,
        / ([\w ]+) miui\/v?\d/i,
      ],
      [
        [u, /_/g, ' '],
        [m, qt],
        [d, A],
      ],
      [
        /; (\w+) bui.+ oppo/i,
        /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i,
      ],
      [u, [m, Wt], [d, A]],
      [/\b(opd2(\d{3}a?))(?: bui|\))/i],
      [u, [m, ce, { OnePlus: ['304', '403', '203'], '*': Wt }], [d, C]],
      [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i],
      [u, [m, 'Vivo'], [d, A]],
      [/\b(rmx[1-3]\d{3})(?: bui|;|\))/i],
      [u, [m, 'Realme'], [d, A]],
      [
        /\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,
        /\bmot(?:orola)?[- ](\w*)/i,
        /((?:moto(?! 360)[\w() ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i,
      ],
      [u, [m, $t], [d, A]],
      [/\b(mz60\d|xoom[2 ]{0,2}) build\//i],
      [u, [m, $t], [d, C]],
      [/((?=lg)?[vl]k-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i],
      [u, [m, _t], [d, C]],
      [
        /(lm(?:-?f100[nv]?|-[\w.]+)(?= bui|\))|nexus [45])/i,
        /\blg[-e;/ ]+((?!browser|netcast|android tv|watch)\w+)/i,
        /\blg-?([\d\w]+) bui/i,
      ],
      [u, [m, _t], [d, A]],
      [
        /(ideatab[-\w ]+|602lv|d-42a|a101lv|a2109a|a3500-hv|s[56]000|pb-6505[my]|tb-?x?\d{3,4}(?:f[cu]|xu|[av])|yt\d?-[jx]?\d+[lfmx])( bui|;|\)|\/)/i,
        /lenovo ?(b[68]0[08]0-?[hf]?|tab(?:[\w- ]+?)|tb[\w-]{6,7})( bui|;|\)|\/)/i,
      ],
      [u, [m, Sr], [d, C]],
      [/(nokia) (t[12][01])/i],
      [m, u, [d, C]],
      [/(?:maemo|nokia).*(n900|lumia \d+|rm-\d+)/i, /nokia[-_ ]?(([-\w. ]*))/i],
      [
        [u, /_/g, ' '],
        [d, A],
        [m, 'Nokia'],
      ],
      [/(pixel (c|tablet))\b/i],
      [u, [m, Ce], [d, C]],
      [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i],
      [u, [m, Ce], [d, A]],
      [
        /droid.+; (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i,
      ],
      [u, [m, rt], [d, A]],
      [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i],
      [
        [u, 'Xperia Tablet'],
        [m, rt],
        [d, C],
      ],
      [
        / (kb2005|in20[12]5|be20[12][59])\b/i,
        /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i,
      ],
      [u, [m, Or], [d, A]],
      [
        /(alexa)webm/i,
        /(kf[a-z]{2}wi|aeo(?!bc)\w\w)( bui|\))/i,
        /(kf[a-z]+)( bui|\)).+silk\//i,
      ],
      [u, [m, bt], [d, C]],
      [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i],
      [
        [u, /(.+)/g, 'Fire Phone $1'],
        [m, bt],
        [d, A],
      ],
      [/(playbook);[-\w),; ]+(rim)/i],
      [u, m, [d, C]],
      [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i],
      [u, [m, Tr], [d, A]],
      [
        /(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i,
      ],
      [u, [m, Er], [d, C]],
      [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i],
      [u, [m, Er], [d, A]],
      [/(nexus 9)/i],
      [u, [m, 'HTC'], [d, C]],
      [
        /(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,
        /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,
        /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i,
      ],
      [m, [u, /_/g, ' '], [d, A]],
      [
        /tcl (xess p17aa)/i,
        /droid [\w.]+; ((?:8[14]9[16]|9(?:0(?:48|60|8[01])|1(?:3[27]|66)|2(?:6[69]|9[56])|466))[gqswx])(_\w(\w|\w\w))?(\)| bui)/i,
      ],
      [u, [m, 'TCL'], [d, C]],
      [
        /droid [\w.]+; (418(?:7d|8v)|5087z|5102l|61(?:02[dh]|25[adfh]|27[ai]|56[dh]|59k|65[ah])|a509dl|t(?:43(?:0w|1[adepqu])|50(?:6d|7[adju])|6(?:09dl|10k|12b|71[efho]|76[hjk])|7(?:66[ahju]|67[hw]|7[045][bh]|71[hk]|73o|76[ho]|79w|81[hks]?|82h|90[bhsy]|99b)|810[hs]))(_\w(\w|\w\w))?(\)| bui)/i,
      ],
      [u, [m, 'TCL'], [d, A]],
      [/(itel) ((\w+))/i],
      [[m, K], u, [d, ce, { tablet: ['p10001l', 'w7001'], '*': 'mobile' }]],
      [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i],
      [u, [m, 'Acer'], [d, C]],
      [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i],
      [u, [m, 'Meizu'], [d, A]],
      [/; ((?:power )?armor(?:[\w ]{0,8}))(?: bui|\))/i],
      [u, [m, 'Ulefone'], [d, A]],
      [/; (energy ?\w+)(?: bui|\))/i, /; energizer ([\w ]+)(?: bui|\))/i],
      [u, [m, 'Energizer'], [d, A]],
      [/; cat (b35);/i, /; (b15q?|s22 flip|s48c|s62 pro)(?: bui|\))/i],
      [u, [m, 'Cat'], [d, A]],
      [/((?:new )?andromax[\w- ]+)(?: bui|\))/i],
      [u, [m, 'Smartfren'], [d, A]],
      [/droid.+; (a(?:015|06[35]|142p?))/i],
      [u, [m, 'Nothing'], [d, A]],
      [/(imo) (tab \w+)/i, /(infinix) (x1101b?)/i],
      [m, u, [d, C]],
      [
        /(blackberry|benq|palm(?=-)|sonyericsson|acer|asus(?! zenw)|dell|jolla|meizu|motorola|polytron|infinix|tecno|micromax|advan)[-_ ]?([-\w]*)/i,
        /; (hmd|imo) ([\w ]+?)(?: bui|\))/i,
        /(hp) ([\w ]+\w)/i,
        /(microsoft); (lumia[\w ]+)/i,
        /(lenovo)[-_ ]?([-\w ]+?)(?: bui|\)|\/)/i,
        /(oppo) ?([\w ]+) bui/i,
      ],
      [m, u, [d, A]],
      [
        /(kobo)\s(ereader|touch)/i,
        /(archos) (gamepad2?)/i,
        /(hp).+(touchpad(?!.+tablet)|tablet)/i,
        /(kindle)\/([\w.]+)/i,
      ],
      [m, u, [d, C]],
      [/(surface duo)/i],
      [u, [m, Bt], [d, C]],
      [/droid [\d.]+; (fp\du?)(?: b|\))/i],
      [u, [m, 'Fairphone'], [d, A]],
      [/((?:tegranote|shield t(?!.+d tv))[\w- ]*?)(?: b|\))/i],
      [u, [m, Ht], [d, C]],
      [/(sprint) (\w+)/i],
      [m, u, [d, A]],
      [/(kin\.[onetw]{3})/i],
      [
        [u, /\./g, ' '],
        [m, Bt],
        [d, A],
      ],
      [/droid.+; ([c6]+|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i],
      [u, [m, Gt], [d, C]],
      [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i],
      [u, [m, Gt], [d, A]],
      [/smart-tv.+(samsung)/i],
      [m, [d, S]],
      [/hbbtv.+maple;(\d+)/i],
      [
        [u, /^/, 'SmartTV'],
        [m, tt],
        [d, S],
      ],
      [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i],
      [
        [m, _t],
        [d, S],
      ],
      [/(apple) ?tv/i],
      [m, [u, Ze + ' TV'], [d, S]],
      [/crkey.*devicetype\/chromecast/i],
      [
        [u, se + ' Third Generation'],
        [m, Ce],
        [d, S],
      ],
      [/crkey.*devicetype\/([^/]*)/i],
      [
        [u, /^/, 'Chromecast '],
        [m, Ce],
        [d, S],
      ],
      [/fuchsia.*crkey/i],
      [
        [u, se + ' Nest Hub'],
        [m, Ce],
        [d, S],
      ],
      [/crkey/i],
      [
        [u, se],
        [m, Ce],
        [d, S],
      ],
      [/droid.+aft(\w+)( bui|\))/i],
      [u, [m, bt], [d, S]],
      [/(shield \w+ tv)/i],
      [u, [m, Ht], [d, S]],
      [/\(dtv[);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i],
      [u, [m, Ir], [d, S]],
      [/(bravia[\w ]+)( bui|\))/i],
      [u, [m, rt], [d, S]],
      [/(mi(tv|box)-?\w+) bui/i],
      [u, [m, qt], [d, S]],
      [/Hbbtv.*(technisat) (.*);/i],
      [m, u, [d, S]],
      [
        /\b(roku)[\dx]*[)/]((?:dvp-)?[\d.]*)/i,
        /hbbtv\/\d+\.\d+\.\d+ +\([\w+ ]*; *([\w\d][^;]*);([^;]*)/i,
      ],
      [
        [m, ut],
        [u, ut],
        [d, S],
      ],
      [/droid.+; ([\w- ]+) (?:android tv|smart[- ]?tv)/i],
      [u, [d, S]],
      [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i],
      [[d, S]],
      [/(ouya)/i, /(nintendo) (\w+)/i],
      [m, u, [d, ot]],
      [/droid.+; (shield)( bui|\))/i],
      [u, [m, Ht], [d, ot]],
      [/(playstation \w+)/i],
      [u, [m, rt], [d, ot]],
      [/\b(xbox(?: one)?(?!; xbox))[); ]/i],
      [u, [m, Bt], [d, ot]],
      [/\b(sm-[lr]\d\d[0156][fnuw]?s?|gear live)\b/i],
      [u, [m, tt], [d, H]],
      [
        /((pebble))app/i,
        /(asus|google|lg|oppo) ((pixel |zen)?watch[\w ]*)( bui|\))/i,
      ],
      [m, u, [d, H]],
      [/(ow(?:19|20)?we?[1-3]{1,3})/i],
      [u, [m, Wt], [d, H]],
      [/(watch)(?: ?os[,/]|\d,\d\/)[\d.]+/i],
      [u, [m, Ze], [d, H]],
      [/(opwwe\d{3})/i],
      [u, [m, Or], [d, H]],
      [/(moto 360)/i],
      [u, [m, $t], [d, H]],
      [/(smartwatch 3)/i],
      [u, [m, rt], [d, H]],
      [/(g watch r)/i],
      [u, [m, _t], [d, H]],
      [/droid.+; (wt63?0{2,3})\)/i],
      [u, [m, Gt], [d, H]],
      [/droid.+; (glass) \d/i],
      [u, [m, Ce], [d, Vt]],
      [/(pico) (4|neo3(?: link|pro)?)/i],
      [m, u, [d, Vt]],
      [/; (quest( \d| pro)?)/i],
      [u, [m, Mr], [d, Vt]],
      [/(tesla)(?: qtcarbrowser|\/[-\w.]+)/i],
      [m, [d, ct]],
      [/(aeobc)\b/i],
      [u, [m, bt], [d, ct]],
      [/(homepod).+mac os/i],
      [u, [m, Ze], [d, ct]],
      [/windows iot/i],
      [[d, ct]],
      [/droid .+?; ([^;]+?)(?: bui|; wv\)|\) applew).+?(mobile|vr|\d) safari/i],
      [u, [d, ce, { mobile: 'Mobile', xr: 'VR', '*': C }]],
      [/\b((tablet|tab)[;/]|focus\/\d(?!.+mobile))/i],
      [[d, C]],
      [/(phone|mobile(?:[;/]| [ \w/.]*safari)|pda(?=.+windows ce))/i],
      [[d, A]],
      [/droid .+?; ([\w. -]+)( bui|\))/i],
      [u, [m, 'Generic']],
    ],
    engine: [
      [/windows.+ edge\/([\w.]+)/i],
      [p, [l, Ea + 'HTML']],
      [/(arkweb)\/([\w.]+)/i],
      [l, p],
      [/webkit\/537\.36.+chrome\/(?!27)([\w.]+)/i],
      [p, [l, 'Blink']],
      [
        /(presto)\/([\w.]+)/i,
        /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna|servo)\/([\w.]+)/i,
        /ekioh(flow)\/([\w.]+)/i,
        /(khtml|tasman|links)[/ ]\(?([\w.]+)/i,
        /(icab)[/ ]([23]\.[\d.]+)/i,
        /\b(libweb)/i,
      ],
      [l, p],
      [/ladybird\//i],
      [[l, 'LibWeb']],
      [/rv:([\w.]{1,9})\b.+(gecko)/i],
      [p, l],
    ],
    os: [
      [/microsoft (windows) (vista|xp)/i],
      [l, p],
      [/(windows (?:phone(?: os)?|mobile|iot))[/ ]?([\d.\w ]*)/i],
      [l, [p, ce, jr]],
      [
        /windows nt 6\.2; (arm)/i,
        /windows[/ ]([ntce\d. ]+\w)(?!.+xbox)/i,
        /(?:win(?=3|9|n)|win 9x )([nt\d.]+)/i,
      ],
      [
        [p, ce, jr],
        [l, er],
      ],
      [
        /[adehimnop]{4,7}\b(?:.*os ([\w]+) like mac|; opera)/i,
        /(?:ios;fbsv\/|iphone.+ios[/ ])([\d.]+)/i,
        /cfnetwork\/.+darwin/i,
      ],
      [
        [p, /_/g, '.'],
        [l, 'iOS'],
      ],
      [/(mac os x) ?([\w. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i],
      [
        [l, 'macOS'],
        [p, /_/g, '.'],
      ],
      [/android ([\d.]+).*crkey/i],
      [p, [l, se + ' Android']],
      [/fuchsia.*crkey\/([\d.]+)/i],
      [p, [l, se + ' Fuchsia']],
      [/crkey\/([\d.]+).*devicetype\/smartspeaker/i],
      [p, [l, se + ' SmartSpeaker']],
      [/linux.*crkey\/([\d.]+)/i],
      [p, [l, se + ' Linux']],
      [/crkey\/([\d.]+)/i],
      [p, [l, se]],
      [/droid ([\w.]+)\b.+(android[- ]x86|harmonyos)/i],
      [p, l],
      [/(ubuntu) ([\w.]+) like android/i],
      [[l, /(.+)/, '$1 Touch'], p],
      [
        /(android|bada|blackberry|kaios|maemo|meego|openharmony|qnx|rim tablet os|sailfish|series40|symbian|tizen|webos)\w*[-/; ]?([\d.]*)/i,
      ],
      [l, p],
      [/\(bb(10);/i],
      [p, [l, Tr]],
      [/(?:symbian ?os|symbos|s60(?=;)|series ?60)[-/ ]?([\w.]*)/i],
      [p, [l, 'Symbian']],
      [
        /mozilla\/[\d.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w.]+)/i,
      ],
      [p, [l, it + ' OS']],
      [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w.]+)/i],
      [p, [l, 'webOS']],
      [/watch(?: ?os[,/]|\d,\d\/)([\d.]+)/i],
      [p, [l, 'watchOS']],
      [/(cros) [\w]+(?:\)| ([\w.]+)\b)/i],
      [[l, 'Chrome OS'], p],
      [
        /panasonic;(viera)/i,
        /(netrange)mmh/i,
        /(nettv)\/(\d+\.[\w.]+)/i,
        /(nintendo|playstation) (\w+)/i,
        /(xbox); +xbox ([^);]+)/i,
        /(pico) .+os([\w.]+)/i,
        /\b(joli|palm)\b ?(?:os)?\/?([\w.]*)/i,
        /(mint)[/() ]?(\w*)/i,
        /(mageia|vectorlinux)[; ]/i,
        /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-/ ]?(?!chrom|package)([-\w.]*)/i,
        /(hurd|linux)(?: arm\w*| x86\w*| ?)([\w.]*)/i,
        /(gnu) ?([\w.]*)/i,
        /\b([-frentopcghs]{0,5}bsd|dragonfly)[/ ]?(?!amd|[ix346]{1,2}86)([\w.]*)/i,
        /(haiku) (\w+)/i,
      ],
      [l, p],
      [/(sunos) ?([\w.\d]*)/i],
      [[l, 'Solaris'], p],
      [
        /((?:open)?solaris)[-/ ]?([\w.]*)/i,
        /(aix) ((\d)(?=\.|\)| )[\w.])*/i,
        /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i,
        /(unix) ?([\w.]*)/i,
      ],
      [l, p],
    ],
  },
  xt = (() => {
    var r = { init: {}, isIgnore: {}, isIgnoreRgx: {}, toString: {} };
    return (
      ee.call(r.init, [
        [N, [l, p, dt, d]],
        [Q, [M]],
        [W, [d, u, m]],
        [V, [l, p]],
        [U, [l, p]],
      ]),
      ee.call(r.isIgnore, [
        [N, [p, dt]],
        [V, [p]],
        [U, [p]],
      ]),
      ee.call(r.isIgnoreRgx, [
        [N, / ?browser$/i],
        [U, / ?os$/i],
      ]),
      ee.call(r.toString, [
        [N, [l, p]],
        [Q, [M]],
        [W, [m, u]],
        [V, [l, p]],
        [U, [l, p]],
      ]),
      r
    );
  })(),
  Sa = (r, e) => {
    var t = xt.init[e],
      i = xt.isIgnore[e] || 0,
      a = xt.isIgnoreRgx[e] || 0,
      n = xt.toString[e] || 0;
    function s() {
      ee.call(this, t);
    }
    return (
      (s.prototype.getItem = () => r),
      (s.prototype.withClientHints = () =>
        oe
          ? oe
              .getHighEntropyValues(Fr)
              .then((o) => r.setCH(new Vr(o, !1)).parseCH().get())
          : r.parseCH().get()),
      (s.prototype.withFeatureCheck = () => r.detectFeature().get()),
      e != Ue &&
        ((s.prototype.is = function (o) {
          var c = !1;
          for (var f in this)
            if (
              this.hasOwnProperty(f) &&
              !tr(i, f) &&
              K(a ? $e(a, this[f]) : this[f]) == K(a ? $e(a, o) : o)
            ) {
              if (((c = !0), o != de)) break;
            } else if (o == de && c) {
              c = !c;
              break;
            }
          return c;
        }),
        (s.prototype.toString = function () {
          var o = Ve;
          for (var c in n)
            typeof this[n[c]] !== de && (o += (o ? ' ' : Ve) + this[n[c]]);
          return o || de;
        })),
      oe ||
        (s.prototype.then = function (o) {
          var c = this,
            f = function () {
              for (var T in c) c.hasOwnProperty(T) && (this[T] = c[T]);
            };
          f.prototype = { is: s.prototype.is, toString: s.prototype.toString };
          var y = new f();
          return o(y), y;
        }),
      new s()
    );
  };
function Vr(r, e) {
  if (((r = r || {}), ee.call(this, Fr), e))
    ee.call(this, [
      [rr, Jt(r[ue])],
      [ir, Jt(r[ya])],
      [A, /\?1/.test(r[xa])],
      [u, st(r[ka])],
      [Fe, st(r[Ur])],
      [ar, st(r[Aa])],
      [M, st(r[wa])],
      [Se, Jt(r[_a])],
      [Et, st(r[ba])],
    ]);
  else
    for (var t in r)
      this.hasOwnProperty(t) && typeof r[t] !== de && (this[t] = r[t]);
}
function zr(r, e, t, i) {
  return (
    (this.get = function (a) {
      return a
        ? this.data.hasOwnProperty(a)
          ? this.data[a]
          : void 0
        : this.data;
    }),
    (this.set = function (a, n) {
      return (this.data[a] = n), this;
    }),
    (this.setCH = function (a) {
      return (this.uaCH = a), this;
    }),
    (this.detectFeature = function () {
      if (P && P.userAgent == this.ua)
        switch (this.itemType) {
          case N:
            P.brave && typeof P.brave.isBrave == kt && this.set(l, 'Brave');
            break;
          case W:
            !this.get(d) && oe && oe[A] && this.set(d, A),
              this.get(u) == 'Macintosh' &&
                P &&
                typeof P.standalone !== de &&
                P.maxTouchPoints &&
                P.maxTouchPoints > 2 &&
                this.set(u, 'iPad').set(d, C);
            break;
          case U:
            !this.get(l) && oe && oe[Fe] && this.set(l, oe[Fe]);
            break;
          case Ue:
            var a = this.data,
              n = (s) => a[s].getItem().detectFeature().get();
            this.set(N, n(N))
              .set(Q, n(Q))
              .set(W, n(W))
              .set(V, n(V))
              .set(U, n(U));
        }
      return this;
    }),
    (this.parseUA = function () {
      return (
        this.itemType != Ue && Xt.call(this.data, this.ua, this.rgxMap),
        this.itemType == N && this.set(dt, Yt(this.get(p))),
        this
      );
    }),
    (this.parseCH = function () {
      var a = this.uaCH,
        n = this.rgxMap;
      switch (this.itemType) {
        case N:
        case V:
          var s = a[ir] || a[rr],
            o;
          if (s)
            for (var c in s) {
              var f = s[c].brand || s[c],
                y = s[c].version;
              this.itemType == N &&
                !/not.a.brand/i.test(f) &&
                (!o || (/chrom/i.test(o) && f != Nr)) &&
                ((f = ce(f, {
                  Chrome: 'Google Chrome',
                  Edge: 'Microsoft Edge',
                  'Chrome WebView': 'Android WebView',
                  'Chrome Headless': 'HeadlessChrome',
                })),
                this.set(l, f).set(p, y).set(dt, Yt(y)),
                (o = f)),
                this.itemType == V && f == Nr && this.set(p, y);
            }
          break;
        case Q:
          var T = a[M];
          T &&
            (T && a[Et] == '64' && (T += '64'), Xt.call(this.data, T + ';', n));
          break;
        case W:
          if (
            (a[A] && this.set(d, A),
            a[u] && (this.set(u, a[u]), !this.get(d) || !this.get(m)))
          ) {
            var R = {};
            Xt.call(R, 'droid 9; ' + a[u] + ')', n),
              !this.get(d) && R.type && this.set(d, R.type),
              !this.get(m) && R.vendor && this.set(m, R.vendor);
          }
          if (a[Se]) {
            var re;
            if (typeof a[Se] != 'string')
              for (var sr = 0; !re && sr < a[Se].length; )
                re = ce(a[Se][sr++], Dr);
            else re = ce(a[Se], Dr);
            this.set(d, re);
          }
          break;
        case U:
          var Nt = a[Fe];
          if (Nt) {
            var Mt = a[ar];
            Nt == er && (Mt = Number.parseInt(Yt(Mt), 10) >= 13 ? '11' : '10'),
              this.set(l, Nt).set(p, Mt);
          }
          this.get(l) == er &&
            a[u] == 'Xbox' &&
            this.set(l, 'Xbox').set(p, void 0);
          break;
        case Ue:
          var Yr = this.data,
            qe = (Xr) => Yr[Xr].getItem().setCH(a).parseCH().get();
          this.set(N, qe(N))
            .set(Q, qe(Q))
            .set(W, qe(W))
            .set(V, qe(V))
            .set(U, qe(U));
      }
      return this;
    }),
    ee.call(this, [
      ['itemType', r],
      ['ua', e],
      ['uaCH', i],
      ['rgxMap', t],
      ['data', Sa(this, r)],
    ]),
    this
  );
}
function q(r, e, t) {
  if (
    (typeof r === Be
      ? (At(r, !0)
          ? (typeof e === Be && (t = e), (e = r))
          : ((t = r), (e = void 0)),
        (r = void 0))
      : typeof r === Kt && !At(e, !0) && ((t = e), (e = void 0)),
    t && typeof t.append === kt)
  ) {
    var i = {};
    t.forEach((c, f) => {
      i[f] = c;
    }),
      (t = i);
  }
  if (!(this instanceof q)) return new q(r, e, t).getResult();
  var a =
      typeof r === Kt
        ? r
        : t && t[kr]
          ? t[kr]
          : P && P.userAgent
            ? P.userAgent
            : Ve,
    n = new Vr(t, !0),
    s = e ? Ca(Zr, e) : Zr,
    o = (c) =>
      c == Ue
        ? function () {
            return new zr(c, a, s, n)
              .set('ua', a)
              .set(N, this.getBrowser())
              .set(Q, this.getCPU())
              .set(W, this.getDevice())
              .set(V, this.getEngine())
              .set(U, this.getOS())
              .get();
          }
        : () => new zr(c, a, s[c], n).parseUA().get();
  return (
    ee
      .call(this, [
        ['getBrowser', o(N)],
        ['getCPU', o(Q)],
        ['getDevice', o(W)],
        ['getEngine', o(V)],
        ['getOS', o(U)],
        ['getResult', o(Ue)],
        ['getUA', () => a],
        [
          'setUA',
          function (c) {
            return He(c) && (a = c.length > Qt ? ut(c, Qt) : c), this;
          },
        ],
      ])
      .setUA(a),
    this
  );
}
q.VERSION = va;
q.BROWSER = Tt([l, p, dt, d]);
q.CPU = Tt([M]);
q.DEVICE = Tt([u, m, d, ot, A, S, C, H, ct]);
q.ENGINE = q.OS = Tt([l, p]);
var te = class {
  data;
  timestamp;
  cacheTimeout = 24 * 60 * 60 * 1e3;
  key;
  getData;
  constructor(e, t, i) {
    (this.key = e), (this.getData = t), i && (this.cacheTimeout = i);
  }
  getFromCache() {
    const e = localStorage.getItem(this.key);
    if (!e) return;
    const t = JSON.parse(e);
    if (Date.now() - t.timestamp < this.cacheTimeout) return t.data;
  }
  cache(e) {
    localStorage.setItem(
      this.key,
      JSON.stringify({ data: e, timestamp: Date.now() })
    );
  }
  async get() {
    const e = this.getFromCache();
    if (e) return e;
    const t = await this.getData();
    return this.cache(t), t;
  }
};
var Ct = class extends te {
  constructor() {
    super('client-metadata', () => this.getClientMetadata());
  }
  async getClientMetadata() {
    return new Promise((e, t) => {
      const i = new q(navigator.userAgent),
        a = i.getBrowser(),
        n = i.getDevice(),
        s = i.getCPU(),
        o = i.getOS();
      e({ version: '1', browser: a, device: n, cpu: s, os: o });
    });
  }
};
var St = class {
  type;
  referrer;
  pageUrl;
  viewportSize;
  screenSize;
  timestamp;
  adId;
  metadata;
  constructor({ type: e, adId: t, metadata: i }) {
    (this.type = e),
      (this.adId = t),
      (this.metadata = i),
      (this.referrer = document.referrer),
      (this.pageUrl = location.href),
      (this.viewportSize = this.getViewportSize()),
      (this.screenSize = this.getScreenSize()),
      (this.timestamp = Date.now());
  }
  getScreenSize() {
    return { width: screen.width, height: screen.height };
  }
  getViewportSize() {
    return { width: window.innerWidth, height: window.innerHeight };
  }
};
var Ra = { seed: 789, encoding: 'hex' };
function Oa(r) {
  return new TextEncoder().encode(r);
}
function Re(r, e) {
  return (r & 65535) * e + ((((r >>> 16) * e) & 65535) << 16);
}
function nr(r, e) {
  return (r << e) | (r >>> (32 - e));
}
function Ia(r) {
  let e = r;
  return (
    (e ^= e >>> 16),
    (e = Re(e, 2246822507)),
    (e ^= e >>> 13),
    (e = Re(e, 3266489909)),
    (e ^= e >>> 16),
    e
  );
}
function Br(r, e) {
  let { seed: t, encoding: i } = { ...Ra, ...e },
    a;
  typeof r == 'object' ? (a = JSON.stringify(r)) : (a = r);
  let n = Oa(a),
    s = Math.floor(n.length / 4),
    o = t;
  for (let T = 0; T < s; T++) {
    let R =
      (n[T * 4] & 255) |
      ((n[T * 4 + 1] & 255) << 8) |
      ((n[T * 4 + 2] & 255) << 16) |
      ((n[T * 4 + 3] & 255) << 24);
    (R = Re(R, 3432918353)),
      (R = nr(R, 15)),
      (R = Re(R, 461845907)),
      (o ^= R),
      (o = nr(o, 13)),
      (o = Re(o, 5) + 3864292196);
  }
  let c = 0,
    f = n.length % 4,
    y = s * 4;
  switch (f) {
    case 3:
      c ^= n[y + 2] << 16;
    case 2:
      c ^= n[y + 1] << 8;
    case 1:
      (c ^= n[y]),
        (c = Re(c, 3432918353)),
        (c = nr(c, 15)),
        (c = Re(c, 461845907)),
        (o ^= c);
  }
  switch (((o ^= n.length), (o = Ia(o)), (o = o >>> 0), i)) {
    case 'hex':
      return o.toString(16).padStart(8, '0');
    case 'decimal':
      return o;
    default:
      throw new Error(`Invalid encoding: ${i}`);
  }
}
var Rt = class {
  fingerprintCache;
  componentCache;
  constructor() {
    (this.fingerprintCache = new te('fingerprint', () =>
      this.generateFingerprint()
    )),
      (this.componentCache = new te('fingerprint-components', () =>
        this.gatherComponents()
      ));
  }
  getFingerprint() {
    return this.fingerprintCache.get();
  }
  getComponents() {
    return this.componentCache.get();
  }
  async generateFingerprint() {
    const e = await this.getComponents();
    return Br(e);
  }
  async gatherComponents() {
    return {
      userAgent: navigator.userAgent,
      language: navigator.language,
      languages: navigator.languages,
      platform: navigator.platform,
      hardwareConcurrency: navigator.hardwareConcurrency,
      deviceMemory: navigator.deviceMemory,
      screenResolution: `${screen.width}x${screen.height}`,
      screenDepth: screen.colorDepth,
      screenOrientation: screen.orientation?.type,
      cookiesEnabled: navigator.cookieEnabled,
      doNotTrack: navigator.doNotTrack,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timezoneOffset: new Date().getTimezoneOffset(),
      canvasFingerprint: this.getCanvasFingerprint(),
      audioFingerprint: this.getAudioFingerprint(),
      webglFingerprint: this.getWebGLFingerprint(),
      fonts: await this.detectFonts(),
      features: this.detectFeatures(),
      connection: this.getConnectionInfo(),
    };
  }
  getCanvasFingerprint() {
    const e = document.createElement('canvas'),
      t = e.getContext('2d');
    return (
      (e.width = 200),
      (e.height = 50),
      t &&
        ((t.textBaseline = 'top'),
        (t.font = '14px Arial'),
        (t.textBaseline = 'alphabetic'),
        (t.fillStyle = '#f60'),
        t.fillRect(125, 1, 62, 20),
        (t.fillStyle = '#069'),
        t.fillText('Browser Fingerprint', 2, 15),
        (t.fillStyle = 'rgba(102, 204, 0, 0.7)'),
        t.fillText('Canvas Test', 4, 17)),
      e.toDataURL()
    );
  }
  getAudioFingerprint() {
    try {
      const e = new (window.AudioContext || window.webkitAudioContext)(),
        t = e.createOscillator(),
        i = e.createAnalyser(),
        a = e.createGain();
      t.connect(i),
        i.connect(a),
        a.connect(e.destination),
        (t.type = 'triangle'),
        (a.gain.value = 0),
        (t.frequency.value = 1e4),
        t.start(0);
      const n = new Float32Array(i.frequencyBinCount);
      return (
        i.getFloatFrequencyData(n),
        t.stop(),
        e.close(),
        n.slice(0, 10).join(',')
      );
    } catch {
      return null;
    }
  }
  getWebGLFingerprint() {
    let e = document.createElement('canvas'),
      t;
    try {
      t = e.getContext('webgl') || e.getContext('experimental-webgl');
    } catch {
      return null;
    }
    return t
      ? {
          vendor: t.getParameter(t.VENDOR),
          renderer: t.getParameter(t.RENDERER),
          webglVersion: t.getParameter(t.VERSION),
          shadingLanguageVersion: t.getParameter(t.SHADING_LANGUAGE_VERSION),
          extensions: t.getSupportedExtensions(),
        }
      : null;
  }
  async detectFonts() {
    const e = [
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
      ],
      t = [];
    if ('FontFace' in window)
      for (const i of e)
        try {
          (await new FontFace('testFont', `local(${i})`).load()) && t.push(i);
        } catch {}
    return t;
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
      emptyEvalLength: eval.toString().length,
    };
  }
  getConnectionInfo() {
    const e =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection;
    return e
      ? {
          type: e.type,
          effectiveType: e.effectiveType,
          downlinkMax: e.downlinkMax,
          rtt: e.rtt,
        }
      : null;
  }
  detectAdBlock() {
    const e = document.createElement('div');
    (e.innerHTML = '&nbsp;'),
      (e.className = 'adsbox'),
      document.body.appendChild(e);
    const t = e.offsetHeight === 0;
    return document.body.removeChild(e), t;
  }
  getWebGLVendor() {
    try {
      const t = document.createElement('canvas').getContext('webgl');
      return t?.getParameter(t.VENDOR);
    } catch {
      return null;
    }
  }
};
var $r = async () => {
    const e = await (await fetch('https://ipapi.co/json/')).json();
    return {
      ...e,
      country: e.country,
      region: e.region,
      city: e.city,
      latitude: e.latitude,
      longitude: e.longitude,
    };
  },
  Hr = async () => {
    const e = await (await fetch('https://ipwhois.app/json/')).json();
    return {
      ...e,
      country: e.country,
      region: e.region,
      city: e.city,
      latitude: e.latitude,
      longitude: e.longitude,
    };
  };
var Ot = class extends te {
  constructor() {
    super('location', () => this.getLocation());
  }
  async getLocation() {
    try {
      return await $r();
    } catch {
      return await Hr();
    }
  }
};
var Lt = class r {
  config;
  fingerprinter;
  eventQueue = [];
  locationService;
  advertisementService;
  worker;
  static DEFAULT_CONFIG = {
    organizationId: '',
    endpoint: ur.VERCEL_URL || 'localhost:3000',
    debug: !1,
    cacheTimeout: 24 * 60 * 60 * 1e3,
  };
  analyticsEndpoint;
  clientMetadataService;
  constructor(e) {
    (this.config = { ...r.DEFAULT_CONFIG, ...Pt(e, (t, i) => !!t) }),
      (this.analyticsEndpoint = `http://${this.config.endpoint}/api/advertisement/analytics`),
      (this.fingerprinter = new Rt()),
      (this.clientMetadataService = new Ct()),
      (this.advertisementService = new wt(
        this.config,
        this.detectAndPopulateAds.bind(this)
      )),
      (this.locationService = new Ot()),
      this.setup(),
      console.log(r.DEFAULT_CONFIG),
      console.log('config', this.config);
  }
  setup() {
    this.configureAds(),
      this.detectAndPopulateAds(),
      this.setupEventListeners();
  }
  createWorkerBlob() {
    const e = `
      onmessage = async function(e) {
        const { type, data } = e.data;

        switch(type) {
          case 'process-events':
            // Simulate some processing
            const processedEvents = data.map(event => ({
              ...event,
              processed: true
            }));
            postMessage({ type: 'processed-events', data: processedEvents });
            break;
        }
      }
    `;
    return URL.createObjectURL(
      new Blob([e], { type: 'application/javascript' })
    );
  }
  handleWorkerMessage(e) {
    const { type: t, data: i } = e.data;
    t === 'processed-events' && this.sendEventsToServer(i);
  }
  configureAds() {
    this.advertisementService.init(), this.detectAndPopulateAds();
  }
  detectAndPopulateAds() {
    'requestIdleCallback' in window
      ? requestIdleCallback(() => {
          document.querySelectorAll('[data-ad-id]').forEach((t) => {
            const i = t.getAttribute('data-ad-id');
            i && this.instrumentAdTag(t, i);
          });
        })
      : document.querySelectorAll('[data-ad-id]').forEach((t) => {
          const i = t.getAttribute('data-ad-id');
          i && this.instrumentAdTag(t, i);
        });
  }
  instrumentAdTag(e, t) {
    const i = new IntersectionObserver(
      (a) => {
        a.forEach((n) => {
          n.isIntersecting &&
            (this.track({ type: 'IMPRESSION', adId: t }),
            i.unobserve(n.target));
        });
      },
      { threshold: 0.5 }
    );
    e.addEventListener('click', () => {
      this.track({ type: 'CLICK', adId: t });
    }),
      i.observe(e);
  }
  setupEventListeners() {
    Promise.resolve().then(() => ni(Gr())),
      window.addEventListener('beforeunload', () => {
        this.flush();
      }),
      window.addEventListener('DOMContentLoaded', () => {
        requestIdleCallback(() => {
          this.configureAds();
        });
      }),
      window.addEventListener('urlchangeevent', (e) => {
        e.oldURL.pathname !== e.newURL?.pathname &&
          (this.track({ type: 'PAGE_VIEW', adId: 'page-view' }),
          this.configureAds());
      }),
      setInterval(() => {
        this.debug('Flushing events'), this.flush();
      }, 1e4);
  }
  async getLocation() {
    return await this.locationService.get();
  }
  async getFingerprint() {
    return await this.fingerprinter.getFingerprint();
  }
  async getComponents() {
    return await this.fingerprinter.getComponents();
  }
  track(e) {
    const t = new St({
      ...e,
      metadata: {
        userAgent: navigator.userAgent,
        language: navigator.language,
      },
    });
    this.eventQueue.push(t), this.eventQueue.length >= 10 && this.flush();
  }
  async getAdEvents(e) {
    const t = await this.getLocation(),
      i = await this.getComponents(),
      { country: a, region: n, city: s } = t || {};
    return e
      .filter((o) => o.type !== 'PAGE_VIEW')
      .map((o) => ({
        ...o,
        type: o.type,
        country: a,
        region: n,
        city: s,
        metadata: {},
        viewportSize: `${o.viewportSize.width}x${o.viewportSize.height}`,
        screenSize: `${o.screenSize.width}x${o.screenSize.height}`,
        connectionType: i.connection?.type,
      }));
  }
  async formatEvents(e) {
    const t = await this.getComponents(),
      i = {
        events: await this.getAdEvents(e),
        client: {
          fingerprint: await this.getFingerprint(),
          userAgent: t.userAgent,
          language: t.language,
          timezone: t.timezone,
          platform: t.platform,
          metadata: await this.clientMetadataService.get(),
        },
      };
    return this.debug('Events formatted', i), i;
  }
  async sendMetrics(e, t) {
    try {
      if (navigator.sendBeacon) {
        const i = new Blob([JSON.stringify(t)], { type: 'application/json' });
        navigator.sendBeacon(e, i);
      } else
        await fetch(e, {
          method: 'POST',
          body: JSON.stringify(t),
          keepalive: !0,
        });
    } catch {
      await fetch(e, {
        method: 'POST',
        body: JSON.stringify(t),
        keepalive: !0,
      });
    }
  }
  async sendEventsToServer(e) {
    e.length !== 0 &&
      (await this.sendMetrics(
        this.analyticsEndpoint,
        await this.formatEvents(e)
      ),
      this.debug('Events sent', e));
  }
  flush() {
    this.eventQueue.length !== 0 &&
      (this.worker
        ? this.worker.postMessage({
            type: 'process-events',
            data: this.eventQueue,
          })
        : this.sendEventsToServer(this.eventQueue),
      (this.eventQueue = []));
  }
  setDebug(e) {
    this.config.debug = e;
  }
  debug(...e) {
    this.config.debug && console.log('[AdAnalytics]', ...e);
  }
};
var Jr = () => {
  console.log('running');
  const r = window.document.getElementById('ad-analytics');
  if (r) {
    const e = r.getAttribute('data-org-id') || void 0,
      t = r.getAttribute('data-endpoint') || void 0,
      i = r.getAttribute('data-debug') === 'true',
      a = new Lt({
        organizationId: e,
        endpoint: t,
        debug: i,
        cacheTimeout: 24 * 60 * 60 * 1e3,
      });
    (window.Analytics = a), a.track({ type: 'PAGE_VIEW', adId: 'page-view' });
  }
};
typeof window < 'u' &&
  typeof document < 'u' &&
  (document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', Jr)
    : Jr());
