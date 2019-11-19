/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { DwInput } from './dw-input';

export class DwEmailInput extends DwInput {

  constructor() {
    super();
    this.errorMessage = "Invalid Email";
    this.pattern = "^[a-zA-Z0-9.!#$%&’*+=?^_`{|}~-]+@[a-zA-Z0-9-]+[\.][a-zA-Z0-9-]+$";
    this.validator = this._validator;
  }

  _validator(value) {
    if (!this.required && !value) { 
      return true;
    }

    return true;
    
  }

}

window.customElements.define('dw-email-input', DwEmailInput);