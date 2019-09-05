/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { LitElement, html, css } from 'lit-element';
import '../dw-input.js';

class DwInputDemo extends LitElement {
  static get styles() {
    return [
      css`
        dw-input{
          margin-bottom: 16px;
          max-width: 300px;
        }

        .horizontal-layout{
          display: flex;
          flex-direction: row;
        }

        .col{
          margin-right: 30px;
        }
      `
    ];
  }

  render() {
    
    return html`
      <h4>Required text field</h4>
      <dw-input label="First name" required errorMessage="Required"></dw-input>

      <h4>Text field without label</h4>
      <dw-input noLabel placeholder="Enter Name here"></dw-input>

      <h4>Text field with helper text</h4>
      <div class="horizontal-layout">
        <dw-input class="col" label="Name" hint="Helper Text" required errorMessage="Required"></dw-input>
        <dw-input label="Name" hintPersistent hint="Helper Text"></dw-input>
      </div>

      <h4>Text field with prefilled value</h4>
      <dw-input label="Name" value="Simmy"></dw-input>

      <h4>Highlight field on value change</h4>
      <dw-input label="First name" value="Ruchita" highLightOnChanged originalValue="Ruchita" required errorMessage="Required"></dw-input>

      <h4>Text field with prefix icon</h4>
      <dw-input label="Name" prefixSvgIcon=${this._getPrefixIcon()}></dw-input>

      <h4>Text field with suffix icon</h4>
      <dw-input label="Name" sufixSvgIcon="${this._getSuffixIcon()}"></dw-input>

      <h4>Text field which accepts only Numbers</h4>
      <dw-input label="Phone number" allowedPattern="[0-9]"></dw-input>

      <h4>Text field which accepts only Characters</h4>
      <dw-input label="Name" allowedPattern="[a-zA-Z]"></dw-input>

      <h4>Custom validation</h4>
      <dw-input id="customValidatorInupt" hint="Type cat here" errorMessage="Value must be a 'cat'" label="Animal name" palceholder="Type cat"></dw-input>

      <h4>Auto formatting</h4>
      <dw-input label="Currency" allowedPattern="[0-9]" value="456895" .focusedValueGetter="${this._getValue}" .formattedValueGetter="${this._getFormattedValue}" required errorMessage="Required"></dw-input>

      <h4>Max length</h4>
      <dw-input maxLength="5" label="Name" charCounter></dw-input>

      <h4>Dense field</h4>
      <dw-input label="Name" isDense></dw-input>
      
      <h4>Auto-select text on focus</h4>
      <dw-input label="First name" value="Hello" autoSelect required errorMessage="Required"></dw-input>

      <h4>Textarea</h4>
      <dw-input label="Notes" rows="5" multiline></dw-input>

      <h4>Readonly</h4>
      <dw-input label="Animal name" value="Cat" readOnly></dw-input>

      <h4>Disabled</h4>
      <dw-input label="Animal name" value="Cat" disabled prefixSvgIcon=${this._getSuffixIcon()}></dw-input>
    `;
  }

  firstUpdated() {
    let el = this.shadowRoot.querySelector('#customValidatorInupt');
    el.validator = function(value){
      return value === 'cat';
    }
  }

  _getFormattedValue(value) { 
    return Number(value).toLocaleString();
  }

  _getValue(value) {
    return value;
   }

  _getPrefixIcon() { 
    return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M17.81 4.47c-.08 0-.16-.02-.23-.06C15.66 3.42 14 3 12.01 3c-1.98 0-3.86.47-5.57 1.41-.24.13-.54.04-.68-.2-.13-.24-.04-.55.2-.68C7.82 2.52 9.86 2 12.01 2c2.13 0 3.99.47 6.03 1.52.25.13.34.43.21.67-.09.18-.26.28-.44.28zM3.5 9.72c-.1 0-.2-.03-.29-.09-.23-.16-.28-.47-.12-.7.99-1.4 2.25-2.5 3.75-3.27C9.98 4.04 14 4.03 17.15 5.65c1.5.77 2.76 1.86 3.75 3.25.16.22.11.54-.12.7-.23.16-.54.11-.7-.12-.9-1.26-2.04-2.25-3.39-2.94-2.87-1.47-6.54-1.47-9.4.01-1.36.7-2.5 1.7-3.4 2.96-.08.14-.23.21-.39.21zm6.25 12.07c-.13 0-.26-.05-.35-.15-.87-.87-1.34-1.43-2.01-2.64-.69-1.23-1.05-2.73-1.05-4.34 0-2.97 2.54-5.39 5.66-5.39s5.66 2.42 5.66 5.39c0 .28-.22.5-.5.5s-.5-.22-.5-.5c0-2.42-2.09-4.39-4.66-4.39s-4.66 1.97-4.66 4.39c0 1.44.32 2.77.93 3.85.64 1.15 1.08 1.64 1.85 2.42.19.2.19.51 0 .71-.11.1-.24.15-.37.15zm7.17-1.85c-1.19 0-2.24-.3-3.1-.89-1.49-1.01-2.38-2.65-2.38-4.39 0-.28.22-.5.5-.5s.5.22.5.5c0 1.41.72 2.74 1.94 3.56.71.48 1.54.71 2.54.71.24 0 .64-.03 1.04-.1.27-.05.53.13.58.41.05.27-.13.53-.41.58-.57.11-1.07.12-1.21.12zM14.91 22c-.04 0-.09-.01-.13-.02-1.59-.44-2.63-1.03-3.72-2.1-1.4-1.39-2.17-3.24-2.17-5.22 0-1.62 1.38-2.94 3.08-2.94s3.08 1.32 3.08 2.94c0 1.07.93 1.94 2.08 1.94s2.08-.87 2.08-1.94c0-3.77-3.25-6.83-7.25-6.83-2.84 0-5.44 1.58-6.61 4.03-.39.81-.59 1.76-.59 2.8 0 .78.07 2.01.67 3.61.1.26-.03.55-.29.64-.26.1-.55-.04-.64-.29-.49-1.31-.73-2.61-.73-3.96 0-1.2.23-2.29.68-3.24 1.33-2.79 4.28-4.6 7.51-4.6 4.55 0 8.25 3.51 8.25 7.83 0 1.62-1.38 2.94-3.08 2.94s-3.08-1.32-3.08-2.94c0-1.07-.93-1.94-2.08-1.94s-2.08.87-2.08 1.94c0 1.71.66 3.31 1.87 4.51.95.94 1.86 1.46 3.27 1.85.27.07.42.35.35.61-.05.23-.26.38-.47.38z"/></svg>';
  }

  _getSuffixIcon() {
    return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0zm0 0h24v24H0V0z"/><path d="M9 21h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.58 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2zM9 9l4.34-4.34L12 10h9v2l-3 7H9V9zM1 9h4v12H1z"/></svg>';
  }
}

window.customElements.define('dw-input-demo', DwInputDemo);