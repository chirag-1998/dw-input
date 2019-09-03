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
          border: 1px solid rgba(0,0,0,.54);
        }
      `
    ];
  }

  render() {
    
    return html`
      <h4>Auto grow textarea</h4>
      <dw-textarea .minHeight=${42} .placeholder=${"Enter a new value"}></dw-textarea>

      <h4>Fix hieght textarea</h4>
      <dw-textarea .minHeight=${52} .maxHeight=${52} .placeholder=${"Enter a new value"}></dw-textarea>
    `;
  }

  firstUpdated() {
    super.firstUpdated && super.firstUpdated();
    let dwAutogrowTextarea =  this.shadowRoot.querySelectorAll('dw-textarea');
    this._onEscKeyHandler =  this._onEscKey.bind(this);
    this._onEnterHandler =  this._onEnter.bind(this);
    this._onValueChangeHandler = this._onValueChange.bind(this);
    for(let i = 0;  i < dwAutogrowTextarea.length; i++) {
      let el = dwAutogrowTextarea[i];
      el.addEventListener('enter', this._onEnterHandler);
      el.addEventListener('esc', this._onEscKeyHandler);
      el.addEventListener('value-changed', this._onValueChangeHandler);
    }
  }

  disconnectedCallback() {
    let dwAutogrowTextarea =  this.shadowRoot.querySelectorAll('dw-textarea');
    for(let i = 0;  i < dwAutogrowTextarea.length; i++) {
      let el = dwAutogrowTextarea[i];
      el.removeEventListener('enter', this._onEnterHandler);
      el.removeEventListener('esc', this._onEscKeyHandler);
      el.removeEventListener('value-changed', this._onValueChangeHandler);
    }
    super.disconnectedCallback();
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
}

window.customElements.define('dw-autogrow-textarea-demo', DwAutogrowTextareaDemo);