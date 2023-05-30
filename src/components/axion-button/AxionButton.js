import { LitElement, css, html } from 'lit'
import { property } from 'lit/decorators.js'
import '../axion-spinner/index.js'

export class AxionButton extends LitElement {
  constructor() {
    super();
    
    this.buttonType = 'primary'
    this.disabled = false
    this.loading = false
  }
  static properties = {
    buttonType: {type: String},
    disabled: {type: Boolean},
    loading: {type: Boolean}
  };
  
  connectedCallback() {
    console.log("axion-button component connected!")
  }
  
  disconnectedCallback() {
    console.log("axion-button component disconnected!")
  }
  
  updated(_changedProperties) {
    console.log("axion-button is updated with new value: ", _changedProperties)
  }
  
  render() {
    return html`
      <button class="${this.buttonType}" disabled="${this.disabled}">
        ${this.loading ? html`<axion-spinner />` : html`<slot></slot>` }
      </button>
    `;
  }

  static styles = css`
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
    .secondary {
      min-width: 7rem;
      border-color: #5b9eff; /* Replace with actual color code for signal-alt-base */
      background-color: #ffffff; /* Replace with actual color code for signal-alt-base */
      color: #5b9eff;
    }
  `;
}
