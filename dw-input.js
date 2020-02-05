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
import { classMap } from 'lit-html/directives/class-map.js';
import { MDCTextField } from '@material/textfield';
import { MDCTextFieldCharacterCounter } from '@material/textfield/character-counter';
import { TextfieldStyle } from './mdc-text-field-css.js';
import { DwFormElement } from '@dreamworld/dw-form/dw-form-element';
import '@dreamworld/dw-icon-button/dw-icon-button';
import './dw-textarea.js'; 

export class DwInput extends DwFormElement(LitElement) {
  static get styles() {
    return [
      TextfieldStyle,
      css`
        :host {
          display: block;
          outline:none;
          position: relative;
          --dw-input-outlined-idle-border-color: var(--mdc-theme-text-secondary);
          --dw-input-outlined-hover-border-color: var(--mdc-theme-text-primary);
          --dw-input-outlined-disabled-border-color: var(--mdc-theme-text-disabled);
        }

        :host[hidden] {
          display: none;
        }

        :host([disabled]),
        :host([readOnly]){
          pointer-events: none;
        }

        .mdc-text-field{
          width: 100%;
        }
        
        /* Add a way to customize label color */
        .mdc-text-field--focused .mdc-text-field__input:required ~ .mdc-notched-outline .mdc-floating-label::after,
        .mdc-text-field--focused:not(.mdc-text-field--invalid):not(.mdc-text-field--disabled) .mdc-floating-label {
          color: var(--mdc-theme-primary, rgba(98, 0, 238, 0.87));
        }

        /* STARTS: style for dark/light theme */
        .mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__input{
          color: var(--mdc-theme-text-primary, rgba(0, 0, 0, 0.87))
        }

        .mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder,
        .mdc-text-field:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):not(.mdc-text-field--invalid) .mdc-floating-label{
          color: var(--mdc-theme-text-secondary ,rgba(0, 0, 0, 0.6));
        }

        .mdc-text-field.mdc-text-field--disabled .mdc-text-field__input::placeholder,
        .mdc-text-field.mdc-text-field--disabled .mdc-text-field__input,
        .mdc-text-field.mdc-text-field--disabled .mdc-floating-label{
          color: var(--mdc-theme-text-disabled ,rgba(0, 0, 0, 0.38));
        }

        .mdc-text-field:not(.mdc-text-field--disabled) + .mdc-text-field-helper-line .mdc-text-field-helper-text{
          color: var(--mdc-theme-text-secondary, rgba(0, 0, 0, 0.6));
        }
        /* ENDS: style for dark theme */
        
        /* Hide right bottom corner icon */
        textarea{
          resize: none;
        }

        /* STARTS style for hide helper text when input is invalid */
        .mdc-text-field--invalid + .mdc-text-field-helper-line .mdc-text-field-helper-text--validation-msg {
          display: block;  
        }

        .mdc-text-field--invalid + .mdc-text-field-helper-line .helper-text {
          display: none;  
        }

        .mdc-text-field-helper-text--validation-msg{
          display: none;
        }
        /* ENDS style for hide helper text when input is invalid */

        /* Add a way to configure icon color */
        .mdc-text-field--outlined .mdc-text-field__icon{
          height: 24px;
          fill: var(--dw-icon-color, rgba(0, 0, 0, 0.54));
          color: var(--dw-icon-color, rgba(0, 0, 0, 0.54));
        }
        
         /* Add a way to configure disabled icon color */
        :host([disabled]) .mdc-text-field--outlined .mdc-text-field__icon {
          fill: var(--dw-icon-color-disabled, rgba(0, 0, 0, 0.38));
          color: var(--dw-icon-color-disabled, rgba(0, 0, 0, 0.38));
        }

        /* Add a way to configure idle border color */
        .mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__leading,
        .mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__notch,
        .mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__trailing {
          border-color: var(--dw-input-outlined-idle-border-color, rgba(0, 0, 0, 0.38));
        }

        /* Add a way to configure disabled border color */
        .mdc-text-field--outlined.mdc-text-field--disabled .mdc-notched-outline__leading,
        .mdc-text-field--outlined.mdc-text-field--disabled .mdc-notched-outline__notch,
        .mdc-text-field--outlined.mdc-text-field--disabled .mdc-notched-outline__trailing {
          border-color: var(--dw-input-outlined-disabled-border-color, rgba(0, 0, 0, 0.06));
        }

        /* Add a way to configure hover border color */
        .mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__input:hover ~ .mdc-notched-outline .mdc-notched-outline__leading,
        .mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__input:hover ~ .mdc-notched-outline .mdc-notched-outline__notch,
        .mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__input:hover ~ .mdc-notched-outline .mdc-notched-outline__trailing,
        .mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__icon:hover ~ .mdc-notched-outline .mdc-notched-outline__leading,
        .mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__icon:hover ~ .mdc-notched-outline .mdc-notched-outline__notch,
        .mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__icon:hover ~ .mdc-notched-outline .mdc-notched-outline__trailing {
          border-color: var(--dw-input-outlined-hover-border-color, rgba(0, 0, 0, 0.87));
        }

        /* STARTS: Change border/label color when value is changed */
        :host([_valueUpdated]) .mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--invalid) .mdc-notched-outline__leading,
        :host([_valueUpdated]) .mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--invalid) .mdc-notched-outline__notch,
        :host([_valueUpdated]) .mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--invalid) .mdc-notched-outline__trailing,
        :host([_valueUpdated]) .mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--invalid) .mdc-text-field__input:hover ~ .mdc-notched-outline .mdc-notched-outline__leading,
        :host([_valueUpdated]) .mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--invalid) .mdc-text-field__input:hover ~ .mdc-notched-outline .mdc-notched-outline__notch,
        :host([_valueUpdated]) .mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--invalid) .mdc-text-field__input:hover ~ .mdc-notched-outline .mdc-notched-outline__trailing,
        :host([_valueUpdated]) .mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__icon:hover ~ .mdc-notched-outline .mdc-notched-outline__leading,
        :host([_valueUpdated]) .mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__icon:hover ~ .mdc-notched-outline .mdc-notched-outline__notch,
        :host([_valueUpdated]) .mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__icon:hover ~ .mdc-notched-outline .mdc-notched-outline__trailing{
          border-color: var(--mdc-theme-secondary);
          border-width: 2px;
        }

        :host([_valueUpdated]) .mdc-text-field--focused .mdc-text-field__input:required ~ .mdc-notched-outline .mdc-floating-label::after,
        :host([_valueUpdated]) .mdc-text-field:not(.mdc-text-field--disabled):not(.mdc-text-field--invalid) .mdc-floating-label{
          color: var(--mdc-theme-secondary);
        }
        /* ENDS: Change  border/label color when value is changed */


        /* STARTS: Style for dense field */
        .mdc-text-field--outlined.mdc-text-field--dense .mdc-text-field__input{
          padding-top: 7px;
        }

        .mdc-text-field--outlined.mdc-text-field--dense .mdc-floating-label{
          font-size: 1rem;
        }
        /* ENDS: Style for dense field */
        
        .mdc-text-field + .mdc-text-field-helper-line{
           position: var(--dw-input-helper-line-position, relative);
        }
  
        .mdc-text-field__icon{
          outline: none;
        }
      
        dw-icon-button{
          width: 24px;
          height: 24px;
        }

        :host([clickableIcon]) dw-icon-button.mdc-text-field__icon{
          pointer-events: auto;
          cursor: pointer;
        }

        /* Add a way to customize the background color of the text field when showAsFilled is true */
        :host([showAsFilled]) .mdc-text-field:not(.mdc-text-field--disabled) {
          background-color: var(--dw-input-fill-color, whitesmoke);
        }
  
      `
    ];
  }

  static get properties() {
    return {
      /**
       * The name of input element
       */
      name: { type: String },

      /**
       * Current input value entered by user
       */
      value: { type: String },

      /**
       * Sets floating label value.
       */
      label: { type: String },

      /**
       * Set to `true` to disable this input.
       */
      disabled: { type: Boolean },

      /**
       * Helper text to display below the input. Display default only when focused.
       */
      hint: { type: String },

      /**
       * Set to `true` to mark the input as required. Displays error state if value is empty and input is blurred.
       */
      required: { type: Boolean },

      /**
       * A pattern to validate the `input` with. Checked during `validate()`.
       * Doens't work when custom validator is provided through `validator` property.
       */
      pattern: { type: String },

      /**
       * Set this to specify the pattern allowed by user. Checked at the time user types in the textfield.
       */
      allowedPattern: { type: String },
      
      /**
       * Leading icon to display in input
       */
      icon: { type: String },

       /**
       * Trailing icon to display in input
       */
      iconTrailing: { type: String },

      /**
       * A placeholder text in addition to the label.
       */
      placeholder: { type: String },
      
      /**
       * Message to show in the error color when the textfield is invalid. 
       */
      errorMessage: { type: String },

      /**
       * Set to true to make input field readonly.
       */
      readOnly: { type: Boolean},

      /**
       * Set this to apply custom validation of input. Receives value to be validated as argument.
       * It must return Boolean.
       */
      validator: { type: Function },

      /**
       * Set to `true` when the last call to `validate` is invalid. Mostly, you don't need to manually set/change this
       * property. It's automatically updated as the part of the validation logic. Generally, validation is performed
       * on blur & value change if the current value is invalid.
       */
      invalid: { type: Boolean },

      /**
       * Set to true to auto-select text on focus
       */
      autoSelect: { type: Boolean },

      /**
       * Set to true show input as a text-area
       */
      multiline: { type: Boolean },
      
      dense: { type: Boolean },

      /**
       * Always show the helper text despite focus.
       */
      hintPersistent: { type: Boolean },

      /**
       * Maximum length to accept input.
       */
      maxLength: { type: Number },

      /**
       * Display character counter with max length. Note: requires maxLength to be set to some value.
       */
      charCounter: { type: Boolean },

      /**
       * A string which used to check whether user has updated value or not
       * When `originalValue` and `value` is different input style is changed.
       * Used only when `highlightChanged=true`.
       */
      originalValue: { type: String },

      /**
       * Set to true to highLight textfield when value is changed
       * Make sure to provide `originalValue` when setting this to true
       * It will highLight field when `value` and `originalValue` is not same
       */
      highlightChanged: { type: Boolean },

      /**
       * Set this to configure custom logic to detect whether value is changed or not.
       * By default it will check by equality check of `value` and `originalValue`.
       * It must return a Boolean.
       * Function receives 2 arguments: (val1, val2). Should return `true` when both values are same otherwise `false`.
       */
      valueEqualityChecker: { type: Function },
      
      /**
       * Set this to true to make icon clickable.
       * Default is false
       */
      clickableIcon: { type: Boolean },
      
      /**
       * Minimum height of textarea
       * Applicable when `multiline` is true
       */
      minHeight: { type: Number },

      /**
       * Max height of textarea. After that vertical scroll is available.
       * Applicable when `multiline` is true
       */
      maxHeight: { type: Number },

      /**
       * Disabled enter in input.
       * Applicable when `multiline` is true
       */
      disabledEnter: { type: Boolean },
      
      /**
       * Set to true to trim value on input blur 
       */
      truncateOnBlur: { type: Boolean },

      /**
       * Input property
       * Set to true to render input in filled style
       */
      showAsFilled: { type: Boolean, value: false, reflect: true},

      /**
       * True when `originalValue` available and it's not equal to `value`
       */
      _valueUpdated: { type: Boolean, reflect: true },

      /**
       * A reference to the input element.
       */
      _textFieldInstance: { type: Object },
    };
  }

  render() {
    
    const wrapperClasses = {
      'mdc-text-field--disabled': this.disabled,
      'mdc-text-field--no-label': !this.label,
      'mdc-text-field--with-leading-icon': this.icon ? true : false,
      'mdc-text-field--with-trailing-icon': this.iconTrailing ? true : false,
      'mdc-text-field--textarea': this.multiline,
      'mdc-text-field--dense': this.dense && !this.multiline,
      'mdc-text-field--outlined' : !this.showAsFilled
    };

    const labelClasses = {
      'mdc-floating-label--float-above': (this._textFieldInstance && this._textFieldInstance.foundation_.isFocused_) || this.value || this.value === 0
    };

    const helperTextClasses = {
      'mdc-text-field-helper-text--persistent': this.hintPersistent
    };

    return html`
    
      <div class="mdc-text-field ${classMap(wrapperClasses)}">

        ${this.icon
        ? html`
            <dw-icon-button class="mdc-text-field__icon" icon="${this.icon}" ?disabled="${this.disabled}" tabindex="${this.clickableIcon ? '' : -1}"></dw-icon-button>
            `
          : html``
        }

        ${this.multiline ? html`${ this.textareaTemplate}` : html`${this.inputTemplate}`}
        
        ${this.iconTrailing
        ? html`
            <dw-icon-button class="mdc-text-field__icon" icon="${this.iconTrailing}" ?disabled="${this.disabled}" tabindex="${this.clickableIcon ? '' : -1}"></dw-icon-button>
            `
          : html``
        }

        ${this.showAsFilled ? html`
          ${this.label
            ? html`<label for="tf-outlined" class="mdc-floating-label ${classMap(labelClasses)}">${this.label}</label>`
            : html``
          }
        ` : html`
          <div class="mdc-notched-outline">
            <div class="mdc-notched-outline__leading"></div>
            <div class="mdc-notched-outline__notch">
              ${this.label
                ? html`<label for="tf-outlined" class="mdc-floating-label ${classMap(labelClasses)}">${this.label}</label>`
                : html``
              }
            </div>
            <div class="mdc-notched-outline__trailing"></div>
          </div>
        ` }

      </div>
      
      ${this.hint || this.errorMessage || this.charCounter
        ? html` 
          <div class="mdc-text-field-helper-line">
            <div class="mdc-text-field-helper-text mdc-text-field-helper-text--validation-msg">${this.errorMessage}</div>
            <div class="mdc-text-field-helper-text helper-text ${classMap(helperTextClasses)}">${this.hint}</div>
            ${this.charCounter ? html`<div class="mdc-text-field-character-counter"></div>` : html``}
          </div>`
        : html``
      }
    `;
  }

  set value(value){
    this._setValue(value, false);
  }

  get value() {
    return this._value;
  }

  constructor() {
    super();
    this.disabled = false;
    this.required = false;
    this.readOnly = false;
    this.placeholder = '';
    this._value = '';
    this.errorMessage = '';
    this.name = '';
    this.pattern = '(.*?)';
    this.invalid = false;
    this.autoSelect = false;
    this.multiline = false;
    this.dense = false;
    this.hintPersistent = false;
    this.charCounter = false;
    this.maxLength = 524288;
    this.minHeight = 42;
    this.truncateOnBlur = false;
    this.showAsFilled = false;

    this.valueEqualityChecker = function (value, originalValue) { 
      return value != originalValue;
    }
  }

  get inputTemplate() { 
    return html`
      <input type="text"
        id="tf-outlined"
        class="mdc-text-field__input"
        .name="${this.name}"
        ?disabled="${this.disabled}"
        ?required="${this.required}"
        ?readonly="${this.readOnly}"
        .pattern="${this.pattern}"
        .placeholder="${this.placeholder}"
        .maxLength="${this.maxLength}"
        ?charCounter="${this.charCounter}"
        @keypress="${this._preventInvalidInput}"
        @input="${this._onInput}"
        @blur="${this._onInputBlur}"
        @focus="${this._onFocus}">
    `;
  }

  get textareaTemplate() {
    return html`
      <dw-textarea id="tf-outlined"
        class="mdc-text-field__input"
        .value="${this.value}"
        .name="${this.name}"
        ?disabled="${this.disabled}"
        ?required="${this.required}"
        ?readonly="${this.readOnly}"
        .placeholder="${this.placeholder}"
        .minHeight="${this.minHeight}"
        .maxHeight="${this.maxHeight}"
        .disabledEnter="${this.disabledEnter}"
        @input="${this._onInput}"
        @blur = "${this._onInputBlur}" >
      </dw-textarea>
    `;
  }

  firstUpdated() {
    this._initMdcTextField();
    this._updateTextfieldValue();

    // Setting timeout here for proper label placement
    setTimeout(() => {
      this._textFieldInstance.layout();
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback && super.disconnectedCallback();
    if (this._textFieldInstance) {
      this._textFieldInstance.destroy();
      this._textFieldInstance = null;
    }
  }

  /* Call this to set focus in the input */
  focus() {
    this._textFieldInstance.focus();
  }

  /* Call this to select text of the input */
  selectText(){
    this._textFieldInstance.input_.select();
  }

  /* Call this to perform validation of the input */
  validate() { 
    let isValid = this._getInputValidity();

    //Updating value only if it's changed because it's setting label as float
    // on `_textFieldInstance.valid` set which shows jerk in label. 
    if (this._textFieldInstance && this._textFieldInstance.valid !== isValid) { 
      this._textFieldInstance.valid = isValid;
    }

    this.invalid = !isValid;
    return isValid;
  }

  layout() {
    this._textFieldInstance.layout();
  }

  parseValue(text) {  
    return text;
  }

  formatText(value) {
    return value;
  }

  /**
   * Intializes textfield
   */
  _initMdcTextField() { 
    const el = this.shadowRoot.querySelector('.mdc-text-field');
    this._textFieldInstance = new MDCTextField(el);
    this._textFieldInstance.useNativeValidation = false;
    new MDCTextFieldCharacterCounter(document.querySelector('.mdc-text-field-character-counter'));
  }

  /**
   * Triggers value changed event
   * Validates input is it's invalid
   * HighLights text field if value is changed and `highlightChanged` property is true
   * Sets formatted text into text field if value is changed explicitly
   * @param {String} value - Value to be set
   * @param {Boolean} internal - True when element it self updates value
   */
  _setValue(value, internal) {
    if (value == this._value) {
      return;
    }

    this._value = value === undefined ? '' : value;

    this.dispatchEvent(new CustomEvent('value-changed', {
      detail: { value: this._value }
    }));

    if (this.highlightChanged) {
      this._setIsValueUpdated();
    }

    if (value && this.invalid) {
      this.validate();
    }

    if(!internal) {
      this._updateTextfieldValue();
    }

  }

  /**
   * Updates text-field's value based on the current value of `value` property.
   * It applies formatting.
   */
  _updateTextfieldValue() {
    if (!this._textFieldInstance) {
      return;
    }
    
    if(this.truncateOnBlur && this.value){
      this.value = typeof this.value === 'string' ? this.value.trim() : this.value;
    }
    
    this._textFieldInstance.value = this.formatText(this.value);
  }

  /**
   * invokes on keys press
   * If `allowedPattern` is available then checks input validitiy again allowedPattern
   * If it's invalid, stops propagation of the event
   * `keypress` event is not triggers for pasted value so it's validation will perform on `input` event
   */
  _preventInvalidInput(event) {
    if (!this.allowedPattern) {
      return;
    }

    let isValid = this._isValidValue(event.key);

    if (!isValid) {
      event.preventDefault();
    }
  }

  /**
   * Validates pasted value
   * Triggers `value-changed` event
   */
  _onInput() {
    let value = this.parseValue(this._textFieldInstance.value);

    if(value !== undefined) {
      this._setValue(value, true);
    }
  }

  /**
   * Validates value against `allowedPattern` 
   * If value is invalid, clears input value
   */
  _checkPatternValidity() { 
    for (let i = 0; i < this._textFieldInstance.value.length; i++) {
      let isValid = this._isValidValue(this._textFieldInstance.value[i]);

      if (!isValid) {
        this._textFieldInstance.value = '';
      }
    }
  }

  /**
   * checks `value` against `allowedPattern`
   * Returns `true` if value is valid 
   */
  _isValidValue(value) { 
    if(!this.allowedPattern) {
      return true;
    }

    return RegExp(this.allowedPattern).test(value);
  }

  /**
   * Invokes on input focus
   * Selects input text if `autoSelect` property is true
   */
  _onFocus() { 
    if (this.autoSelect) {
      //Set timeout so that we can always get selected text when autoSelect is true
      setTimeout(() => {
        this.selectText();
      });
    }
  }

  /**
   * Invokes on input blur
   * Validates input value
   */
  _onInputBlur() { 
    this._updateTextfieldValue();
    this.validate();
  }

  /**
   * Performs validatio of input
   * It also invokes `validator` if provided
   * Returns true if validation is passed
   */
  _getInputValidity() { 
    let isValid = this._textFieldInstance && this._textFieldInstance.input_.checkValidity();

    if (!isValid) { 
      return false;
    }

    if (this.validator) { 
      isValid = this.validator(this.value);
    }

    return isValid;
  }

  /**
   * Sets `_valueUpdated` is value is changed. It's used to high-light textfield
   */
  _setIsValueUpdated() { 
    let value = this.value;
    let originalValue = this.originalValue;

    this._valueUpdated = !!(originalValue && value && this.valueEqualityChecker(value, originalValue));
  }
}

window.customElements.define('dw-input', DwInput);