import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import './axion-spinner'

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('axion-button')
export class AxionButton extends LitElement {
  /**
   * The number of times the button has been clicked.
   */
  @property({ type: String })
  buttonType = 'primary'
  /**
   * The number of times the button has been clicked.
   */
  @property({ type: Boolean })
  disabled = false
  /**
   * The number of times the button has been clicked.
   */
  @property({ type: Boolean })
  loading = false

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
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'axion-button': AxionButton
  }
}
