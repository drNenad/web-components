/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const T = window, K = T.ShadowRoot && (T.ShadyCSS === void 0 || T.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, J = Symbol(), F = /* @__PURE__ */ new WeakMap();
let lt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== J)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (K && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = F.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && F.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ut = (o) => new lt(typeof o == "string" ? o : o + "", void 0, J), pt = (o, ...t) => {
  const e = o.length === 1 ? o[0] : t.reduce((i, s, r) => i + ((n) => {
    if (n._$cssResult$ === !0)
      return n.cssText;
    if (typeof n == "number")
      return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + o[r + 1], o[0]);
  return new lt(e, o, J);
}, $t = (o, t) => {
  K ? o.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet) : t.forEach((e) => {
    const i = document.createElement("style"), s = T.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, o.appendChild(i);
  });
}, G = K ? (o) => o : (o) => o instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules)
    e += i.cssText;
  return ut(e);
})(o) : o;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var z;
const O = window, Q = O.trustedTypes, vt = Q ? Q.emptyScript : "", X = O.reactiveElementPolyfillSupport, W = { toAttribute(o, t) {
  switch (t) {
    case Boolean:
      o = o ? vt : null;
      break;
    case Object:
    case Array:
      o = o == null ? o : JSON.stringify(o);
  }
  return o;
}, fromAttribute(o, t) {
  let e = o;
  switch (t) {
    case Boolean:
      e = o !== null;
      break;
    case Number:
      e = o === null ? null : Number(o);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(o);
      } catch {
        e = null;
      }
  }
  return e;
} }, ht = (o, t) => t !== o && (t == t || o == o), j = { attribute: !0, type: String, converter: W, reflect: !1, hasChanged: ht };
let A = class extends HTMLElement {
  constructor() {
    super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = !1, this.hasUpdated = !1, this._$El = null, this.u();
  }
  static addInitializer(t) {
    var e;
    this.finalize(), ((e = this.h) !== null && e !== void 0 ? e : this.h = []).push(t);
  }
  static get observedAttributes() {
    this.finalize();
    const t = [];
    return this.elementProperties.forEach((e, i) => {
      const s = this._$Ep(i, e);
      s !== void 0 && (this._$Ev.set(s, i), t.push(s));
    }), t;
  }
  static createProperty(t, e = j) {
    if (e.state && (e.attribute = !1), this.finalize(), this.elementProperties.set(t, e), !e.noAccessor && !this.prototype.hasOwnProperty(t)) {
      const i = typeof t == "symbol" ? Symbol() : "__" + t, s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && Object.defineProperty(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    return { get() {
      return this[e];
    }, set(s) {
      const r = this[t];
      this[e] = s, this.requestUpdate(t, r, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) || j;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized"))
      return !1;
    this.finalized = !0;
    const t = Object.getPrototypeOf(this);
    if (t.finalize(), t.h !== void 0 && (this.h = [...t.h]), this.elementProperties = new Map(t.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const e = this.properties, i = [...Object.getOwnPropertyNames(e), ...Object.getOwnPropertySymbols(e)];
      for (const s of i)
        this.createProperty(s, e[s]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), !0;
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const s of i)
        e.unshift(G(s));
    } else
      t !== void 0 && e.push(G(t));
    return e;
  }
  static _$Ep(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  u() {
    var t;
    this._$E_ = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), (t = this.constructor.h) === null || t === void 0 || t.forEach((e) => e(this));
  }
  addController(t) {
    var e, i;
    ((e = this._$ES) !== null && e !== void 0 ? e : this._$ES = []).push(t), this.renderRoot !== void 0 && this.isConnected && ((i = t.hostConnected) === null || i === void 0 || i.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$ES) === null || e === void 0 || e.splice(this._$ES.indexOf(t) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((t, e) => {
      this.hasOwnProperty(e) && (this._$Ei.set(e, this[e]), delete this[e]);
    });
  }
  createRenderRoot() {
    var t;
    const e = (t = this.shadowRoot) !== null && t !== void 0 ? t : this.attachShadow(this.constructor.shadowRootOptions);
    return $t(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var t;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$ES) === null || t === void 0 || t.forEach((e) => {
      var i;
      return (i = e.hostConnected) === null || i === void 0 ? void 0 : i.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$ES) === null || t === void 0 || t.forEach((e) => {
      var i;
      return (i = e.hostDisconnected) === null || i === void 0 ? void 0 : i.call(e);
    });
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$EO(t, e, i = j) {
    var s;
    const r = this.constructor._$Ep(t, i);
    if (r !== void 0 && i.reflect === !0) {
      const n = (((s = i.converter) === null || s === void 0 ? void 0 : s.toAttribute) !== void 0 ? i.converter : W).toAttribute(e, i.type);
      this._$El = t, n == null ? this.removeAttribute(r) : this.setAttribute(r, n), this._$El = null;
    }
  }
  _$AK(t, e) {
    var i;
    const s = this.constructor, r = s._$Ev.get(t);
    if (r !== void 0 && this._$El !== r) {
      const n = s.getPropertyOptions(r), d = typeof n.converter == "function" ? { fromAttribute: n.converter } : ((i = n.converter) === null || i === void 0 ? void 0 : i.fromAttribute) !== void 0 ? n.converter : W;
      this._$El = r, this[r] = d.fromAttribute(e, n.type), this._$El = null;
    }
  }
  requestUpdate(t, e, i) {
    let s = !0;
    t !== void 0 && (((i = i || this.constructor.getPropertyOptions(t)).hasChanged || ht)(this[t], e) ? (this._$AL.has(t) || this._$AL.set(t, e), i.reflect === !0 && this._$El !== t && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t, i))) : s = !1), !this.isUpdatePending && s && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = !0;
    try {
      await this._$E_;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((s, r) => this[r] = s), this._$Ei = void 0);
    let e = !1;
    const i = this._$AL;
    try {
      e = this.shouldUpdate(i), e ? (this.willUpdate(i), (t = this._$ES) === null || t === void 0 || t.forEach((s) => {
        var r;
        return (r = s.hostUpdate) === null || r === void 0 ? void 0 : r.call(s);
      }), this.update(i)) : this._$Ek();
    } catch (s) {
      throw e = !1, this._$Ek(), s;
    }
    e && this._$AE(i);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$ES) === null || e === void 0 || e.forEach((i) => {
      var s;
      return (s = i.hostUpdated) === null || s === void 0 ? void 0 : s.call(i);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$Ek() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$EC !== void 0 && (this._$EC.forEach((e, i) => this._$EO(i, this[i], e)), this._$EC = void 0), this._$Ek();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
A.finalized = !0, A.elementProperties = /* @__PURE__ */ new Map(), A.elementStyles = [], A.shadowRootOptions = { mode: "open" }, X == null || X({ ReactiveElement: A }), ((z = O.reactiveElementVersions) !== null && z !== void 0 ? z : O.reactiveElementVersions = []).push("1.6.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var L;
const R = window, g = R.trustedTypes, Y = g ? g.createPolicy("lit-html", { createHTML: (o) => o }) : void 0, q = "$lit$", v = `lit$${(Math.random() + "").slice(9)}$`, at = "?" + v, _t = `<${at}>`, y = document, C = () => y.createComment(""), x = (o) => o === null || typeof o != "object" && typeof o != "function", dt = Array.isArray, ft = (o) => dt(o) || typeof (o == null ? void 0 : o[Symbol.iterator]) == "function", B = `[ 	
\f\r]`, S = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, tt = /-->/g, et = />/g, _ = RegExp(`>|${B}(?:([^\\s"'>=/]+)(${B}*=${B}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), it = /'/g, st = /"/g, ct = /^(?:script|style|textarea|title)$/i, yt = (o) => (t, ...e) => ({ _$litType$: o, strings: t, values: e }), At = yt(1), m = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), ot = /* @__PURE__ */ new WeakMap(), f = y.createTreeWalker(y, 129, null, !1), gt = (o, t) => {
  const e = o.length - 1, i = [];
  let s, r = t === 2 ? "<svg>" : "", n = S;
  for (let l = 0; l < e; l++) {
    const h = o[l];
    let $, a, c = -1, p = 0;
    for (; p < h.length && (n.lastIndex = p, a = n.exec(h), a !== null); )
      p = n.lastIndex, n === S ? a[1] === "!--" ? n = tt : a[1] !== void 0 ? n = et : a[2] !== void 0 ? (ct.test(a[2]) && (s = RegExp("</" + a[2], "g")), n = _) : a[3] !== void 0 && (n = _) : n === _ ? a[0] === ">" ? (n = s ?? S, c = -1) : a[1] === void 0 ? c = -2 : (c = n.lastIndex - a[2].length, $ = a[1], n = a[3] === void 0 ? _ : a[3] === '"' ? st : it) : n === st || n === it ? n = _ : n === tt || n === et ? n = S : (n = _, s = void 0);
    const H = n === _ && o[l + 1].startsWith("/>") ? " " : "";
    r += n === S ? h + _t : c >= 0 ? (i.push($), h.slice(0, c) + q + h.slice(c) + v + H) : h + v + (c === -2 ? (i.push(void 0), l) : H);
  }
  const d = r + (o[e] || "<?>") + (t === 2 ? "</svg>" : "");
  if (!Array.isArray(o) || !o.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return [Y !== void 0 ? Y.createHTML(d) : d, i];
};
class P {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let r = 0, n = 0;
    const d = t.length - 1, l = this.parts, [h, $] = gt(t, e);
    if (this.el = P.createElement(h, i), f.currentNode = this.el.content, e === 2) {
      const a = this.el.content, c = a.firstChild;
      c.remove(), a.append(...c.childNodes);
    }
    for (; (s = f.nextNode()) !== null && l.length < d; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) {
          const a = [];
          for (const c of s.getAttributeNames())
            if (c.endsWith(q) || c.startsWith(v)) {
              const p = $[n++];
              if (a.push(c), p !== void 0) {
                const H = s.getAttribute(p.toLowerCase() + q).split(v), N = /([.?@])?(.*)/.exec(p);
                l.push({ type: 1, index: r, name: N[2], strings: H, ctor: N[1] === "." ? bt : N[1] === "?" ? St : N[1] === "@" ? wt : k });
              } else
                l.push({ type: 6, index: r });
            }
          for (const c of a)
            s.removeAttribute(c);
        }
        if (ct.test(s.tagName)) {
          const a = s.textContent.split(v), c = a.length - 1;
          if (c > 0) {
            s.textContent = g ? g.emptyScript : "";
            for (let p = 0; p < c; p++)
              s.append(a[p], C()), f.nextNode(), l.push({ type: 2, index: ++r });
            s.append(a[c], C());
          }
        }
      } else if (s.nodeType === 8)
        if (s.data === at)
          l.push({ type: 2, index: r });
        else {
          let a = -1;
          for (; (a = s.data.indexOf(v, a + 1)) !== -1; )
            l.push({ type: 7, index: r }), a += v.length - 1;
        }
      r++;
    }
  }
  static createElement(t, e) {
    const i = y.createElement("template");
    return i.innerHTML = t, i;
  }
}
function b(o, t, e = o, i) {
  var s, r, n, d;
  if (t === m)
    return t;
  let l = i !== void 0 ? (s = e._$Co) === null || s === void 0 ? void 0 : s[i] : e._$Cl;
  const h = x(t) ? void 0 : t._$litDirective$;
  return (l == null ? void 0 : l.constructor) !== h && ((r = l == null ? void 0 : l._$AO) === null || r === void 0 || r.call(l, !1), h === void 0 ? l = void 0 : (l = new h(o), l._$AT(o, e, i)), i !== void 0 ? ((n = (d = e)._$Co) !== null && n !== void 0 ? n : d._$Co = [])[i] = l : e._$Cl = l), l !== void 0 && (t = b(o, l._$AS(o, t.values), l, i)), t;
}
class mt {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    var e;
    const { el: { content: i }, parts: s } = this._$AD, r = ((e = t == null ? void 0 : t.creationScope) !== null && e !== void 0 ? e : y).importNode(i, !0);
    f.currentNode = r;
    let n = f.nextNode(), d = 0, l = 0, h = s[0];
    for (; h !== void 0; ) {
      if (d === h.index) {
        let $;
        h.type === 2 ? $ = new U(n, n.nextSibling, this, t) : h.type === 1 ? $ = new h.ctor(n, h.name, h.strings, this, t) : h.type === 6 && ($ = new Ct(n, this, t)), this._$AV.push($), h = s[++l];
      }
      d !== (h == null ? void 0 : h.index) && (n = f.nextNode(), d++);
    }
    return f.currentNode = y, r;
  }
  v(t) {
    let e = 0;
    for (const i of this._$AV)
      i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class U {
  constructor(t, e, i, s) {
    var r;
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = s, this._$Cp = (r = s == null ? void 0 : s.isConnected) === null || r === void 0 || r;
  }
  get _$AU() {
    var t, e;
    return (e = (t = this._$AM) === null || t === void 0 ? void 0 : t._$AU) !== null && e !== void 0 ? e : this._$Cp;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = b(this, t, e), x(t) ? t === u || t == null || t === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : t !== this._$AH && t !== m && this._(t) : t._$litType$ !== void 0 ? this.g(t) : t.nodeType !== void 0 ? this.$(t) : ft(t) ? this.T(t) : this._(t);
  }
  k(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  $(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.k(t));
  }
  _(t) {
    this._$AH !== u && x(this._$AH) ? this._$AA.nextSibling.data = t : this.$(y.createTextNode(t)), this._$AH = t;
  }
  g(t) {
    var e;
    const { values: i, _$litType$: s } = t, r = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = P.createElement(s.h, this.options)), s);
    if (((e = this._$AH) === null || e === void 0 ? void 0 : e._$AD) === r)
      this._$AH.v(i);
    else {
      const n = new mt(r, this), d = n.u(this.options);
      n.v(i), this.$(d), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = ot.get(t.strings);
    return e === void 0 && ot.set(t.strings, e = new P(t)), e;
  }
  T(t) {
    dt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const r of t)
      s === e.length ? e.push(i = new U(this.k(C()), this.k(C()), this, this.options)) : i = e[s], i._$AI(r), s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) === null || i === void 0 || i.call(this, !1, !0, e); t && t !== this._$AB; ) {
      const s = t.nextSibling;
      t.remove(), t = s;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cp = t, (e = this._$AP) === null || e === void 0 || e.call(this, t));
  }
}
class k {
  constructor(t, e, i, s, r) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = u;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t, e = this, i, s) {
    const r = this.strings;
    let n = !1;
    if (r === void 0)
      t = b(this, t, e, 0), n = !x(t) || t !== this._$AH && t !== m, n && (this._$AH = t);
    else {
      const d = t;
      let l, h;
      for (t = r[0], l = 0; l < r.length - 1; l++)
        h = b(this, d[i + l], e, l), h === m && (h = this._$AH[l]), n || (n = !x(h) || h !== this._$AH[l]), h === u ? t = u : t !== u && (t += (h ?? "") + r[l + 1]), this._$AH[l] = h;
    }
    n && !s && this.j(t);
  }
  j(t) {
    t === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class bt extends k {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === u ? void 0 : t;
  }
}
const Et = g ? g.emptyScript : "";
class St extends k {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    t && t !== u ? this.element.setAttribute(this.name, Et) : this.element.removeAttribute(this.name);
  }
}
class wt extends k {
  constructor(t, e, i, s, r) {
    super(t, e, i, s, r), this.type = 5;
  }
  _$AI(t, e = this) {
    var i;
    if ((t = (i = b(this, t, e, 0)) !== null && i !== void 0 ? i : u) === m)
      return;
    const s = this._$AH, r = t === u && s !== u || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, n = t !== u && (s === u || r);
    r && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e, i;
    typeof this._$AH == "function" ? this._$AH.call((i = (e = this.options) === null || e === void 0 ? void 0 : e.host) !== null && i !== void 0 ? i : this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ct {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    b(this, t);
  }
}
const nt = R.litHtmlPolyfillSupport;
nt == null || nt(P, U), ((L = R.litHtmlVersions) !== null && L !== void 0 ? L : R.litHtmlVersions = []).push("2.7.4");
const xt = (o, t, e) => {
  var i, s;
  const r = (i = e == null ? void 0 : e.renderBefore) !== null && i !== void 0 ? i : t;
  let n = r._$litPart$;
  if (n === void 0) {
    const d = (s = e == null ? void 0 : e.renderBefore) !== null && s !== void 0 ? s : null;
    r._$litPart$ = n = new U(t.insertBefore(C(), d), d, void 0, e ?? {});
  }
  return n._$AI(o), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var D, I;
class w extends A {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t, e;
    const i = super.createRenderRoot();
    return (t = (e = this.renderOptions).renderBefore) !== null && t !== void 0 || (e.renderBefore = i.firstChild), i;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = xt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) === null || t === void 0 || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) === null || t === void 0 || t.setConnected(!1);
  }
  render() {
    return m;
  }
}
w.finalized = !0, w._$litElement$ = !0, (D = globalThis.litElementHydrateSupport) === null || D === void 0 || D.call(globalThis, { LitElement: w });
const rt = globalThis.litElementPolyfillSupport;
rt == null || rt({ LitElement: w });
((I = globalThis.litElementVersions) !== null && I !== void 0 ? I : globalThis.litElementVersions = []).push("3.3.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Pt = (o) => (t) => typeof t == "function" ? ((e, i) => (customElements.define(e, i), i))(o, t) : ((e, i) => {
  const { kind: s, elements: r } = i;
  return { kind: s, elements: r, finisher(n) {
    customElements.define(e, n);
  } };
})(o, t);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ut = (o, t) => t.kind === "method" && t.descriptor && !("value" in t.descriptor) ? { ...t, finisher(e) {
  e.createProperty(t.key, o);
} } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: t.key, initializer() {
  typeof t.initializer == "function" && (this[t.key] = t.initializer.call(this));
}, finisher(e) {
  e.createProperty(t.key, o);
} };
function Z(o) {
  return (t, e) => e !== void 0 ? ((i, s, r) => {
    s.constructor.createProperty(r, i);
  })(o, t, e) : Ut(o, t);
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var V;
((V = window.HTMLSlotElement) === null || V === void 0 ? void 0 : V.prototype.assignedElements) != null;
var Ht = Object.defineProperty, Nt = Object.getOwnPropertyDescriptor, M = (o, t, e, i) => {
  for (var s = i > 1 ? void 0 : i ? Nt(t, e) : t, r = o.length - 1, n; r >= 0; r--)
    (n = o[r]) && (s = (i ? n(t, e, s) : n(s)) || s);
  return i && s && Ht(t, e, s), s;
};
let E = class extends w {
  constructor() {
    super(...arguments), this.buttonType = "primary", this.disabled = !1, this.loading = !1;
  }
  render() {
    return At`
      <button class="${this.buttonType}" disabled="${this.disabled}">
        <slot></slot>
      </button>
    `;
  }
};
E.styles = pt`
    button {
      display: inline-flex; 
      transition-property: background-color, border-color, color, fill, stroke; 
      transition-duration: 200ms; 
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); 
      font-size: 0.875rem;
      line-height: 1.25rem; 
      justify-content: center; 
      align-items: center; 
      border-radius: 0.25rem; 
      border-width: 1px; 
      --ring-color: transparent;
      padding: 8px;
      cursor: pointer;
    }
    .primary {
      min-width: 7rem;
      border-color: #5b9eff; /* Replace with actual color code for signal-alt-base */
      background-color: #5b9eff; /* Replace with actual color code for signal-alt-base */
      color: white;
    }

    /* Add other styles for secondary, icon and extended classes. Replace with actual color code in each class */

    .primary:disabled {
      border-color: #8b8b8b; /* Replace with actual color code for signal-alt-low */
      background-color: #8b8b8b; /* Replace with actual color code for signal-alt-low */
    }
  `;
M([
  Z({ type: String })
], E.prototype, "buttonType", 2);
M([
  Z({ type: Boolean })
], E.prototype, "disabled", 2);
M([
  Z({ type: Boolean })
], E.prototype, "loading", 2);
E = M([
  Pt("axion-button")
], E);
export {
  E as AxionButton
};
