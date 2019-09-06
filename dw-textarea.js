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
import { styleMap } from 'lit-html/directives/style-map.js';
export class DwTextarea extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: block;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
          color: var(--mdc-theme-text-primary);
        }

        :host[hidden] {
          display: none;
        }

        :host([disabled]),
        :host([readOnly]){
          pointer-events: none;
        }

        :host([disabled]){
          opacity: 0.3;
        }

        textarea {
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
          display: block;
          resize: none;
          border: none;
          outline:none;
          background-color: transparent;
          color: inherit;
          font-size: inherit;
          font-weight: inherit;
          letter-spacing: inherit;
          line-height: inherit;
          padding: var(--dw-textarea-padding, 0px);
          width: 100%;
        }

        textarea:focus {
          outline:none;
        }

        ::-webkit-input-placeholder { /* Edge */
          color: var(--mdc-theme-text-hint);
        }

        :-ms-input-placeholder { /* Internet Explorer 10-11 */
          color: var(--mdc-theme-text-hint);
        }

        ::placeholder {
          color: var(--mdc-theme-text-hint);
        }
      `
    ];
  }

  static get properties() {
    return {
      /**
       * Represent textarea value.
       */
      value: { type: String },

      /**
       * Minimum height of textarea
       */
      minHeight: { type: Number },

      /**
       * Max height of textarea. After that vertical scroll is available.
       */
      maxHeight: { type: Number },

      /**
       * Set to true to make input field readonly.
       */
      readOnly: { type: Boolean, reflect: true},

      /**
       * Set to true to make input field disabled.
       */
      disabled: { type: Boolean, reflect: true},

      /**
       * Set to `true` to mark the input as required.
       */
      required: { type: Boolean },

      /**
       * A placeholder for textarea.
       */
      placeholder: { type: String },

      /**
       * Disabled enter in input.
       */
      disabledEnter: { type: Boolean }
    };
  }

  /**
   * Getter of `value` property.
   */
  get value() {
    return this._value;
  }

  /**
   * Setter of `value` property.
   */
  set value(value) {
    this._value = value;
    if(this._textarea) {
      this._textarea.value = this._value;
    }
    this._resize()
  }

  render() {
    return html`<textarea id="textarea" rows="1"
        style=${styleMap(this._textareaStyle())}
        .value="${this.value}"
        .name="${this.name}"
        ?disabled="${this.disabled}"
        ?required="${this.required}"
        ?readonly="${this.readOnly}"
        .placeholder="${this.placeholder}"
        @input="${this._onInput}"
        @blur="${this._onInputBlur}"
        @cut="${this.resize}"
        @paste="${this.resize}"
        @keydown="${this._onKeyDown}"></textarea>`;
  }

  constructor() {
    super();
    this.name = '';
    this.value = '';
    this.disabled = false;
    this.required = false;
    this.placeholder = '';
    this.readOnly = false;
    this.minHeight = 42;

    /**
     * A reference to the textarea element.
     */
    this._textarea = null;
  }

  firstUpdated() {
    super.firstUpdated && super.firstUpdated();
    this._textarea = this.shadowRoot.querySelector('#textarea');
    this._resize();
  }

  disconnectedCallback() {
    if (this._textarea) {
      this._textarea = null;
    }
    super.disconnectedCallback();
  }

  /**
   * Call this to set focus in the input.
   * @public
   */
  focus() {
    this._textarea.focus();
  }

  /**
   * Set focus to end of text.
   * @protected
   */
  focusToEnd() {
    if (typeof this._textarea.selectionStart == "number") {
      this._textarea.selectionStart = this._textarea.selectionEnd = this._textarea.value.length;
      this._textarea.focus();
    } else if (typeof ele.createTextRange != "undefined") {
      this._textarea.focus();
      let range = this._textarea.createTextRange();
      range.collapse(false);
      range.select();
    }
  }

  /**
   * Call this to remove focus in the input.
   * @public
   */
  blur() {
    this._textarea.blur();
  }

  /**
   * Call this to perform validation of the textarea.
   * @public
   */
  validate() {
    return this._textarea.checkValidity();;
  }

  /**
   * Resize input based on content.
   * @protected
   */
  _resize() {
    if(!this._textarea || this.minHeight === this.maxHeight) {
      return;
    }

    this._textarea.style.height = 'auto';
    let scrollHeight = this._textarea.scrollHeight;
    if(scrollHeight < this.minHeight) {
      this._textarea.style.height = this.minHeight + 'px';
      return;
    }
    
    this._textarea.style.height = scrollHeight + 'px';
  }

  /**
   * Invoked when any key down on `textarea`.
   * @protected
   */
  _onKeyDown(e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode === 13) {
      this._onEnterKeyDown(e);
      return;
    }

    if (keyCode === 27) {
      this._onEscKeyDown(e);
    }
  }

  /**
   * Invoked when `enter` key press on `textarea`.
   * @protected
   */
  _onEnterKeyDown(e) {
    this.dispatchEvent(new CustomEvent('enter', {
      detail: { value: this._textarea.value, event: e }
    }));

    if (this.disabledEnter) {
      e.preventDefault && e.preventDefault();
      return false;
    }
  }

  /**
   * Invoked when `esc` key press on `texarea`.
   * @protected
   */
  _onEscKeyDown(e) {
    this.dispatchEvent(new CustomEvent('esc', {
      detail: { value: this._textarea.value, event: e }
    }));
  }

  /**
   * @returns {Object} - Text area style based on `minHeight` and `maxHeight` property.
   * @protected
   */
  _textareaStyle() {
    return {
      'min-height': this.minHeight + 'px',
      'max-height': this.maxHeight + 'px'
    }
  }

  /**
   * Invoked when user type in the input.
   * Triggers `value-changed` event.
   * @protected
   */
  _onInput() {
    this.value = this._textarea.value;
    this._resize();
    this.dispatchEvent(new CustomEvent('value-changed', {
      detail: { value: this.value }
    }));
  }

  /**
   * Invokes on input blur.
   * Validates input value.
   * Trigger `blur` event.
   * @protected
   */
  _onInputBlur(e) {
    this.dispatchEvent(new CustomEvent('blur', {
      detail: { value: this._textarea.value, event: e }
    }));
    this.validate();
  }
}

window.customElements.define('dw-textarea', DwTextarea);