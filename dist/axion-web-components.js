/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const N = window, J = N.ShadowRoot && (N.ShadyCSS === void 0 || N.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Z = Symbol(), Q = /* @__PURE__ */ new WeakMap();
let at = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== Z)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (J && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = Q.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && Q.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const _t = (n) => new at(typeof n == "string" ? n : n + "", void 0, Z), dt = (n, ...t) => {
  const e = n.length === 1 ? n[0] : t.reduce((i, s, o) => i + ((r) => {
    if (r._$cssResult$ === !0)
      return r.cssText;
    if (typeof r == "number")
      return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + n[o + 1], n[0]);
  return new at(e, n, Z);
}, ft = (n, t) => {
  J ? n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet) : t.forEach((e) => {
    const i = document.createElement("style"), s = N.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, n.appendChild(i);
  });
}, X = J ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules)
    e += i.cssText;
  return _t(e);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var j;
const R = window, Y = R.trustedTypes, yt = Y ? Y.emptyScript : "", tt = R.reactiveElementPolyfillSupport, q = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? yt : null;
      break;
    case Object:
    case Array:
      n = n == null ? n : JSON.stringify(n);
  }
  return n;
}, fromAttribute(n, t) {
  let e = n;
  switch (t) {
    case Boolean:
      e = n !== null;
      break;
    case Number:
      e = n === null ? null : Number(n);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(n);
      } catch {
        e = null;
      }
  }
  return e;
} }, ct = (n, t) => t !== n && (t == t || n == n), L = { attribute: !0, type: String, converter: q, reflect: !1, hasChanged: ct };
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
  static createProperty(t, e = L) {
    if (e.state && (e.attribute = !1), this.finalize(), this.elementProperties.set(t, e), !e.noAccessor && !this.prototype.hasOwnProperty(t)) {
      const i = typeof t == "symbol" ? Symbol() : "__" + t, s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && Object.defineProperty(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    return { get() {
      return this[e];
    }, set(s) {
      const o = this[t];
      this[e] = s, this.requestUpdate(t, o, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) || L;
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
        e.unshift(X(s));
    } else
      t !== void 0 && e.push(X(t));
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
    return ft(e, this.constructor.elementStyles), e;
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
  _$EO(t, e, i = L) {
    var s;
    const o = this.constructor._$Ep(t, i);
    if (o !== void 0 && i.reflect === !0) {
      const r = (((s = i.converter) === null || s === void 0 ? void 0 : s.toAttribute) !== void 0 ? i.converter : q).toAttribute(e, i.type);
      this._$El = t, r == null ? this.removeAttribute(o) : this.setAttribute(o, r), this._$El = null;
    }
  }
  _$AK(t, e) {
    var i;
    const s = this.constructor, o = s._$Ev.get(t);
    if (o !== void 0 && this._$El !== o) {
      const r = s.getPropertyOptions(o), d = typeof r.converter == "function" ? { fromAttribute: r.converter } : ((i = r.converter) === null || i === void 0 ? void 0 : i.fromAttribute) !== void 0 ? r.converter : q;
      this._$El = o, this[o] = d.fromAttribute(e, r.type), this._$El = null;
    }
  }
  requestUpdate(t, e, i) {
    let s = !0;
    t !== void 0 && (((i = i || this.constructor.getPropertyOptions(t)).hasChanged || ct)(this[t], e) ? (this._$AL.has(t) || this._$AL.set(t, e), i.reflect === !0 && this._$El !== t && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t, i))) : s = !1), !this.isUpdatePending && s && (this._$E_ = this._$Ej());
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
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((s, o) => this[o] = s), this._$Ei = void 0);
    let e = !1;
    const i = this._$AL;
    try {
      e = this.shouldUpdate(i), e ? (this.willUpdate(i), (t = this._$ES) === null || t === void 0 || t.forEach((s) => {
        var o;
        return (o = s.hostUpdate) === null || o === void 0 ? void 0 : o.call(s);
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
A.finalized = !0, A.elementProperties = /* @__PURE__ */ new Map(), A.elementStyles = [], A.shadowRootOptions = { mode: "open" }, tt == null || tt({ ReactiveElement: A }), ((j = R.reactiveElementVersions) !== null && j !== void 0 ? j : R.reactiveElementVersions = []).push("1.6.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var B;
const k = window, g = k.trustedTypes, et = g ? g.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, F = "$lit$", v = `lit$${(Math.random() + "").slice(9)}$`, ut = "?" + v, At = `<${ut}>`, y = document, C = () => y.createComment(""), x = (n) => n === null || typeof n != "object" && typeof n != "function", pt = Array.isArray, mt = (n) => pt(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", D = `[ 	
\f\r]`, w = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, it = /-->/g, st = />/g, _ = RegExp(`>|${D}(?:([^\\s"'>=/]+)(${D}*=${D}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), nt = /'/g, rt = /"/g, $t = /^(?:script|style|textarea|title)$/i, gt = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), T = gt(1), b = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), ot = /* @__PURE__ */ new WeakMap(), f = y.createTreeWalker(y, 129, null, !1), bt = (n, t) => {
  const e = n.length - 1, i = [];
  let s, o = t === 2 ? "<svg>" : "", r = w;
  for (let l = 0; l < e; l++) {
    const h = n[l];
    let $, a, c = -1, p = 0;
    for (; p < h.length && (r.lastIndex = p, a = r.exec(h), a !== null); )
      p = r.lastIndex, r === w ? a[1] === "!--" ? r = it : a[1] !== void 0 ? r = st : a[2] !== void 0 ? ($t.test(a[2]) && (s = RegExp("</" + a[2], "g")), r = _) : a[3] !== void 0 && (r = _) : r === _ ? a[0] === ">" ? (r = s ?? w, c = -1) : a[1] === void 0 ? c = -2 : (c = r.lastIndex - a[2].length, $ = a[1], r = a[3] === void 0 ? _ : a[3] === '"' ? rt : nt) : r === rt || r === nt ? r = _ : r === it || r === st ? r = w : (r = _, s = void 0);
    const O = r === _ && n[l + 1].startsWith("/>") ? " " : "";
    o += r === w ? h + At : c >= 0 ? (i.push($), h.slice(0, c) + F + h.slice(c) + v + O) : h + v + (c === -2 ? (i.push(void 0), l) : O);
  }
  const d = o + (n[e] || "<?>") + (t === 2 ? "</svg>" : "");
  if (!Array.isArray(n) || !n.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return [et !== void 0 ? et.createHTML(d) : d, i];
};
class P {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let o = 0, r = 0;
    const d = t.length - 1, l = this.parts, [h, $] = bt(t, e);
    if (this.el = P.createElement(h, i), f.currentNode = this.el.content, e === 2) {
      const a = this.el.content, c = a.firstChild;
      c.remove(), a.append(...c.childNodes);
    }
    for (; (s = f.nextNode()) !== null && l.length < d; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) {
          const a = [];
          for (const c of s.getAttributeNames())
            if (c.endsWith(F) || c.startsWith(v)) {
              const p = $[r++];
              if (a.push(c), p !== void 0) {
                const O = s.getAttribute(p.toLowerCase() + F).split(v), H = /([.?@])?(.*)/.exec(p);
                l.push({ type: 1, index: o, name: H[2], strings: O, ctor: H[1] === "." ? St : H[1] === "?" ? Ct : H[1] === "@" ? xt : M });
              } else
                l.push({ type: 6, index: o });
            }
          for (const c of a)
            s.removeAttribute(c);
        }
        if ($t.test(s.tagName)) {
          const a = s.textContent.split(v), c = a.length - 1;
          if (c > 0) {
            s.textContent = g ? g.emptyScript : "";
            for (let p = 0; p < c; p++)
              s.append(a[p], C()), f.nextNode(), l.push({ type: 2, index: ++o });
            s.append(a[c], C());
          }
        }
      } else if (s.nodeType === 8)
        if (s.data === ut)
          l.push({ type: 2, index: o });
        else {
          let a = -1;
          for (; (a = s.data.indexOf(v, a + 1)) !== -1; )
            l.push({ type: 7, index: o }), a += v.length - 1;
        }
      o++;
    }
  }
  static createElement(t, e) {
    const i = y.createElement("template");
    return i.innerHTML = t, i;
  }
}
function E(n, t, e = n, i) {
  var s, o, r, d;
  if (t === b)
    return t;
  let l = i !== void 0 ? (s = e._$Co) === null || s === void 0 ? void 0 : s[i] : e._$Cl;
  const h = x(t) ? void 0 : t._$litDirective$;
  return (l == null ? void 0 : l.constructor) !== h && ((o = l == null ? void 0 : l._$AO) === null || o === void 0 || o.call(l, !1), h === void 0 ? l = void 0 : (l = new h(n), l._$AT(n, e, i)), i !== void 0 ? ((r = (d = e)._$Co) !== null && r !== void 0 ? r : d._$Co = [])[i] = l : e._$Cl = l), l !== void 0 && (t = E(n, l._$AS(n, t.values), l, i)), t;
}
class Et {
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
    const { el: { content: i }, parts: s } = this._$AD, o = ((e = t == null ? void 0 : t.creationScope) !== null && e !== void 0 ? e : y).importNode(i, !0);
    f.currentNode = o;
    let r = f.nextNode(), d = 0, l = 0, h = s[0];
    for (; h !== void 0; ) {
      if (d === h.index) {
        let $;
        h.type === 2 ? $ = new U(r, r.nextSibling, this, t) : h.type === 1 ? $ = new h.ctor(r, h.name, h.strings, this, t) : h.type === 6 && ($ = new Pt(r, this, t)), this._$AV.push($), h = s[++l];
      }
      d !== (h == null ? void 0 : h.index) && (r = f.nextNode(), d++);
    }
    return f.currentNode = y, o;
  }
  v(t) {
    let e = 0;
    for (const i of this._$AV)
      i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class U {
  constructor(t, e, i, s) {
    var o;
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = s, this._$Cp = (o = s == null ? void 0 : s.isConnected) === null || o === void 0 || o;
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
    t = E(this, t, e), x(t) ? t === u || t == null || t === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : t !== this._$AH && t !== b && this._(t) : t._$litType$ !== void 0 ? this.g(t) : t.nodeType !== void 0 ? this.$(t) : mt(t) ? this.T(t) : this._(t);
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
    const { values: i, _$litType$: s } = t, o = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = P.createElement(s.h, this.options)), s);
    if (((e = this._$AH) === null || e === void 0 ? void 0 : e._$AD) === o)
      this._$AH.v(i);
    else {
      const r = new Et(o, this), d = r.u(this.options);
      r.v(i), this.$(d), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = ot.get(t.strings);
    return e === void 0 && ot.set(t.strings, e = new P(t)), e;
  }
  T(t) {
    pt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const o of t)
      s === e.length ? e.push(i = new U(this.k(C()), this.k(C()), this, this.options)) : i = e[s], i._$AI(o), s++;
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
class M {
  constructor(t, e, i, s, o) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = u;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t, e = this, i, s) {
    const o = this.strings;
    let r = !1;
    if (o === void 0)
      t = E(this, t, e, 0), r = !x(t) || t !== this._$AH && t !== b, r && (this._$AH = t);
    else {
      const d = t;
      let l, h;
      for (t = o[0], l = 0; l < o.length - 1; l++)
        h = E(this, d[i + l], e, l), h === b && (h = this._$AH[l]), r || (r = !x(h) || h !== this._$AH[l]), h === u ? t = u : t !== u && (t += (h ?? "") + o[l + 1]), this._$AH[l] = h;
    }
    r && !s && this.j(t);
  }
  j(t) {
    t === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class St extends M {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === u ? void 0 : t;
  }
}
const wt = g ? g.emptyScript : "";
class Ct extends M {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    t && t !== u ? this.element.setAttribute(this.name, wt) : this.element.removeAttribute(this.name);
  }
}
class xt extends M {
  constructor(t, e, i, s, o) {
    super(t, e, i, s, o), this.type = 5;
  }
  _$AI(t, e = this) {
    var i;
    if ((t = (i = E(this, t, e, 0)) !== null && i !== void 0 ? i : u) === b)
      return;
    const s = this._$AH, o = t === u && s !== u || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, r = t !== u && (s === u || o);
    o && this.element.removeEventListener(this.name, this, s), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e, i;
    typeof this._$AH == "function" ? this._$AH.call((i = (e = this.options) === null || e === void 0 ? void 0 : e.host) !== null && i !== void 0 ? i : this.element, t) : this._$AH.handleEvent(t);
  }
}
class Pt {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    E(this, t);
  }
}
const lt = k.litHtmlPolyfillSupport;
lt == null || lt(P, U), ((B = k.litHtmlVersions) !== null && B !== void 0 ? B : k.litHtmlVersions = []).push("2.7.4");
const Ut = (n, t, e) => {
  var i, s;
  const o = (i = e == null ? void 0 : e.renderBefore) !== null && i !== void 0 ? i : t;
  let r = o._$litPart$;
  if (r === void 0) {
    const d = (s = e == null ? void 0 : e.renderBefore) !== null && s !== void 0 ? s : null;
    o._$litPart$ = r = new U(t.insertBefore(C(), d), d, void 0, e ?? {});
  }
  return r._$AI(n), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var I, V;
class m extends A {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ut(e, this.renderRoot, this.renderOptions);
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
    return b;
  }
}
m.finalized = !0, m._$litElement$ = !0, (I = globalThis.litElementHydrateSupport) === null || I === void 0 || I.call(globalThis, { LitElement: m });
const ht = globalThis.litElementPolyfillSupport;
ht == null || ht({ LitElement: m });
((V = globalThis.litElementVersions) !== null && V !== void 0 ? V : globalThis.litElementVersions = []).push("3.3.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const vt = (n) => (t) => typeof t == "function" ? ((e, i) => (customElements.define(e, i), i))(n, t) : ((e, i) => {
  const { kind: s, elements: o } = i;
  return { kind: s, elements: o, finisher(r) {
    customElements.define(e, r);
  } };
})(n, t);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ot = (n, t) => t.kind === "method" && t.descriptor && !("value" in t.descriptor) ? { ...t, finisher(e) {
  e.createProperty(t.key, n);
} } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: t.key, initializer() {
  typeof t.initializer == "function" && (this[t.key] = t.initializer.call(this));
}, finisher(e) {
  e.createProperty(t.key, n);
} };
function G(n) {
  return (t, e) => e !== void 0 ? ((i, s, o) => {
    s.constructor.createProperty(o, i);
  })(n, t, e) : Ot(n, t);
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var W;
((W = window.HTMLSlotElement) === null || W === void 0 ? void 0 : W.prototype.assignedElements) != null;
var Ht = Object.defineProperty, Nt = Object.getOwnPropertyDescriptor, Tt = (n, t, e, i) => {
  for (var s = i > 1 ? void 0 : i ? Nt(t, e) : t, o = n.length - 1, r; o >= 0; o--)
    (r = n[o]) && (s = (i ? r(t, e, s) : r(s)) || s);
  return i && s && Ht(t, e, s), s;
};
let K = class extends m {
  render() {
    return T`
            <span class="loader"></span>
        `;
  }
};
K.styles = dt`
        .loader {
            width: 20px;
            height: 20px;
            border: 5px solid #FFF;
            border-bottom-color: transparent;
            border-radius: 50%;
            display: inline-block;
            box-sizing: border-box;
            animation: rotation 1s linear infinite;
            }
        
            @keyframes rotation {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        } 
  `;
K = Tt([
  vt("axion-spinner")
], K);
var Rt = Object.defineProperty, kt = Object.getOwnPropertyDescriptor, z = (n, t, e, i) => {
  for (var s = i > 1 ? void 0 : i ? kt(t, e) : t, o = n.length - 1, r; o >= 0; o--)
    (r = n[o]) && (s = (i ? r(t, e, s) : r(s)) || s);
  return i && s && Rt(t, e, s), s;
};
let S = class extends m {
  constructor() {
    super(...arguments), this.buttonType = "primary", this.disabled = !1, this.loading = !1;
  }
  render() {
    return T`
      <button class="${this.buttonType}" disabled="${this.disabled}">
        ${this.loading ? T`<axion-spinner />` : T`<slot></slot>`}
      </button>
    `;
  }
};
S.styles = dt`
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
      border-color: #5b9eff;
      background-color: #ffa500;
      color: white;
    }
  `;
z([
  G({ type: String })
], S.prototype, "buttonType", 2);
z([
  G({ type: Boolean })
], S.prototype, "disabled", 2);
z([
  G({ type: Boolean })
], S.prototype, "loading", 2);
S = z([
  vt("axion-button")
], S);
export {
  S as AxionButton
};
