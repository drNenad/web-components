import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('axion-spinner')
export class AxionSpinner extends LitElement {
    render() {
        return html`
            <span class="loader"></span>
        `;
    }

    static styles = css`
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
}

declare global {
    interface HTMLElementTagNameMap {
        'axion-spinner': AxionSpinner
    }
}
