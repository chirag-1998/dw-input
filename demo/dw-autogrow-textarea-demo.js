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
import '../dw-textarea';

class DwAutogrowTextareaDemo extends LitElement {
  static get styles() {
    return [
      css`
        dw-textarea {
          max-width: 300px;
          background-color: #0000001a;
          margin-bottom: 24px;
        }
      `
    ];
  }

  render() {
    
    return html`
      <h4>Auto grow textarea</h4>
      <dw-textarea .minHeight=${42} 
        .maxHeight=${154}
        .placeholder=${"Enter a new value"} 
        @esc=${this._onEscKey} 
        @enter=${this._onEnter} 
        @value-changed=${this._onValueChange}
        @blur=${this._onBlur}>
      </dw-textarea>

      <h4>Fix hieght textarea</h4>
      <dw-textarea .minHeight=${52} .maxHeight=${52} 
        .placeholder=${"Enter a new value"} 
        @esc=${this._onEscKey} 
        @enter=${this._onEnter} 
        @value-changed=${this._onValueChange}
        @blur=${this._onBlur}>
      </dw-textarea>
    `;
  }

  _onEscKey(e) {
    console.log("on esc key", e.detail);
  }
  
  _onEnter(e) {
    console.log("on enter", e.detail);
  }

  _onValueChange(e) {
    console.log("on value changed", e.detail);
  }

  _onBlur(e){
    console.log("on blur", e.detail);
  }
}

window.customElements.define('dw-autogrow-textarea-demo', DwAutogrowTextareaDemo);