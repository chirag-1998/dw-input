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
import { ThemeStyle } from '@dreamworld/material-styles/theme';
import '@material/mwc-switch';
import '@material/mwc-formfield';
import './formatted-input.js';

class DwInputDemo extends LitElement {
  static get styles() {
    return [
      ThemeStyle,,
      css`
        :host{
          display: inline-block;
          width: 100%;
          padding: 24px;
        }

        :host([dark-theme]){
          --dw-input-fill-color: #333;
        }

        dw-input,
        formatted-input{
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

        h4{
          color: var(--mdc-theme-text-primary);
        }

        mwc-formfield{
          display: block;
          padding-bottom: 24px;
          --mdc-theme-text-primary-on-background: var(--mdc-theme-text-primary);
        }

      `
    ];
  }

  render() {
    
    return html`

      <mwc-formfield label="Enable dark theme">
        <mwc-switch @change="${(e) => {
          if (e.target.checked) { 
            this.setAttribute('dark-theme', e.detail);
            return;
          }
      
          this.removeAttribute('dark-theme');
          }}">
        </mwc-switch>
      </mwc-formfield>

      <h4>Required text field</h4>
      <dw-input label="First name" required errorMessage="Required"></dw-input>

      <h4>Filled</h4>
      <dw-input label="First name" showAsFilled required errorMessage="Required"></dw-input>

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
      <dw-input label="First name" value="Ruchita" highlightChanged originalValue="Ruchita" required errorMessage="Required"></dw-input>

      <h4>Text field with prefix icon</h4>
      <dw-input label="Name" icon="search"></dw-input>

      <h4>Text field with suffix icon</h4>
      <dw-input label="Name" iconTrailing="insert_emoticon"></dw-input>

      <h4>Text field which accepts only Numbers</h4>
      <dw-input label="Phone number" allowedPattern="[0-9]"></dw-input>

      <h4>Text field which accepts only Characters</h4>
      <dw-input label="Name" allowedPattern="[a-zA-Z]"></dw-input>

      <h4>Custom validation</h4>
      <dw-input id="customValidatorInupt" hint="Type cat here" errorMessage="Value must be a 'cat'" label="Animal name" palceholder="Type cat"></dw-input>

      <h4>Auto formatting</h4>
      <formatted-input label="Currency" allowedPattern="[0-9]" value="456895" required errorMessage="Required"></formatted-input>

      <h4>Max length</h4>
      <dw-input maxLength="5" label="Name" charCounter></dw-input>

      <h4>Dense field</h4>
      <dw-input label="Name" dense></dw-input>
      
      <h4>Auto-select text on focus</h4>
      <dw-input label="First name" value="Hello" autoSelect required errorMessage="Required"></dw-input>

      <h4>Textarea</h4>
      <dw-input label="Notes" rows="5" multiline></dw-input>

      <h4>Readonly</h4>
      <dw-input label="Animal name" value="Cat" readOnly></dw-input>

      <h4>Disabled</h4>
      <dw-input label="Animal name" value="Cat" disabled icon="insert_emoticon"></dw-input>
    `;
  }

  firstUpdated() {
    let el = this.shadowRoot.querySelector('#customValidatorInupt');
    el.validator = function(value){
      return value === 'cat';
    }
  }
}

window.customElements.define('dw-input-demo', DwInputDemo);