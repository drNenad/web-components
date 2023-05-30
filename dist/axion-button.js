import{i as d,s as u,x as c,e as y}from"./axion-spinner.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const b=(o,t)=>t.kind==="method"&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(r){r.createProperty(t.key,o)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){typeof t.initializer=="function"&&(this[t.key]=t.initializer.call(this))},finisher(r){r.createProperty(t.key,o)}};function p(o){return(t,r)=>r!==void 0?((i,e,s)=>{e.constructor.createProperty(s,i)})(o,t,r):b(o,t)}var f=Object.defineProperty,h=Object.getOwnPropertyDescriptor,a=(o,t,r,i)=>{for(var e=i>1?void 0:i?h(t,r):t,s=o.length-1,l;s>=0;s--)(l=o[s])&&(e=(i?l(t,r,e):l(e))||e);return i&&e&&f(t,r,e),e};let n=class extends u{constructor(){super(...arguments),this.buttonType="primary",this.disabled=!1,this.loading=!1}render(){return c`
      <button class="${this.buttonType}" disabled="${this.disabled}">
        ${this.loading?c`<axion-spinner />`:c`<slot></slot>`}
      </button>
    `}};n.styles=d`
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
      background-color: #ffa500; /* Replace with actual color code for signal-alt-base */
      color: white;
    }
  `;a([p({type:String})],n.prototype,"buttonType",2);a([p({type:Boolean})],n.prototype,"disabled",2);a([p({type:Boolean})],n.prototype,"loading",2);n=a([y("axion-button")],n);export{n as A};
