
# dw-input

A material input element made with lit-html. For more detail visit https://material.io/develop/web/components/input-controls/text-field/.

## Installation

```html
  npm install @dreamworld/dw-input
```

## Usage

```html
  @import '@dreamworld/dw-input/dw-input';
```

## [Demo](https://dreamworldsolutions.github.io/dw-input/demo/index.html)

## Features

- It follows material design outlines input style and provides all features of it. [know more](https://material.io/develop/web/components/input-controls/text-field/)
- It auto select's text if `autoSelect` property is true
- Provides a `validator` property to add custom validations
- Set `multiline` to true to show input as text area
- Set `icon` and `iconTrailing` to show prefix and suffix icon
- Performs validation on blur. It also performs validation on User type if input is invalid.

### Value parsing & Text Formatting
By default `value` property is exactly the text written in the text-field. But, When creating custom input elements
by extending `dw-input` we need to change this behavior. e.g. For we want to create a date-input, whose value will always be in `yyyy-mm-dd` format. But, allows user to choose input format. e.g. For American user it allows to enter date in `mm/dd/yyyy` format and for Indian users it allows to enter date in `dd/mm/yyyy` format. In addition, we need
1 more feature that date input can be done without `/` or `-`. And even partial dates can be entered. e.g. 
- If I enter `12`, then the date will be come 12th of the current month and year. (assumed input format is dd/mmy/yyyy)
- If I enter `125`, then the date will become 12th May of the current year.
For such features, we need to do custom parsing of value from the input text and when user sets value property, we need 
to compute corresponding text representation.

This can be easily done by extending this element and then overriding following 2 functions:
- `parseValue(text)`, Receives input-text as argument and returns parsed value. e.g. for the above case it receives user inputted string and returns string date in format `yyyy-mm-dd`.
- `formatText(value)`, Receives value property as argument and returns formatted text to be shown in the input field.
e.g. For the above exmaple, it receives date in `yyyy-mm-dd` format and it's output is date representation in `dd/mm/yyyy` format for indian user.

**How exactly `parseValue` and `formatText` function is used internally?**
- Input text is formatted on 2 events: a. On the blur of the input b. User changes `value` property explicitly. In other word, `value` property isn't changed due to user interaction in the text field. So, `formatText` is used on these 2 events.
- When user interacts with input text-field, at that time on each change in the text-field (as user types) this function
is invoked to parse the current text as value. When this function returns `undefined`, then `value` property isn't changed (stays to it's last value). In any other cases, including `null` value and blank-string returned, value is changed to the return value. This could be used when user is typing & parsing of the currently typed text isn't possible, so you can return `undefined` in such case.


#### Future extension
`parseValue(text, userEditing)`: this function can receive one more argument `userEditing`. While user is editing the text-field it's value will be `true`, but when user leaves text-field this function is called again with `false` value.
This fact might be used by integrator to throw any error if user has completed editing, OR return `null` instead of `undefined` when user has finished editing.


## Events

Triggers `value-changed` event on value change.

## Methods

- `focus` - Focuses the input

- `selectText` - Selected input's text

- `validate` - Call this to validate input. Returns false if value is invalid.

## Theme
Configure color of the icon using `--dw-icon-color` css variable.  

#### Example css to change icon color

```html
dw-input{
--dw-icon-color: green;
}
```

## Custom input

Override dwInput class to create a custom input

```
class CustomInput extends DwInput {
  static get styles() {
  return [
    DwInput.styles,
    css`
      .mdc-text-field{
        border-radius: 8px;
      }`
    ];
  }
}
customElements.define('custom-input', CustomInput);

<custom-input></custom-input>
```

## Examples

```html
<dw-input label="Name" validator="<VALIDATION_FN>" placeholder="Enter name here" autoSelect required hint="Hint text"></dw-input>

<dw-input label="Number" disabled allowedPattern="[0-9]" value="12"></dw-input>

<dw-input label="Number" readOnly icon='search' iconTrailing='add_comment'></dw-input>

<dw-input noLabel multiline></dw-input>

<dw-input value="12" originalValue="12" highLightOnChanged></dw-input>
```

# dw-textarea
- The element provide way to autogrow textarea with non decore style.

## Install
  
```html
npm install @dw/dw-input
```
## Usage
```javascript
import  '@dreamworld/dw-input/dw-textarea';
```
## Events
-  `value-changed` event with input value.
	- Fires this event on input value is changed
-  `enter` event with input value and event object.
	- Fires this user press `enter` key on input.
-  `esc` event with input value and event object.
	- Fires this event if user press `esc` key on input.
- `blur` event with input value and event object.
  - Fires this event on textarea blur event.

## Methods 
-  `focus` - Focus in the input
-  `focusToEnd`- Focus in the input at last
-  `blur` - Remove the input focus
-  `validate` - Call this to validate input. Returns false if value is invalid.

## Theme
- Configure padding of the textarea `--dw-textarea-padding` css variable.  
- For Borders, direclty apply to `dw-textarea` element at the time of usage. Default border hasn't provided as it's 
raw element to be used for the custom purposes/UI.
- It has no (transparent) background-color, so set background-color to `dw-textarea` as per your need.
- For typo-graphy, set relevant typography class from your theme (e.g. `material-styles`) to `dw-textarea`. No default,
  typography is applied. When used in `dw-input`, it applies typo graphy as per the input fonts.
- Font colors: `--mdc-theme-text-primary`, `--mdc-theme-text-hint` and `--mdc-theme-text-disabled` are used for the font
 colors. So, change these css properties as per your need.

## Features
- Auto grow input.
- Fixed height input with scroll
- Disabled enter

### Auto grow input.
- Provide auto grow input based on `minHeight` and `maxHeight` property.
- Input auto grows from `minHeight` to `maxHeight` after that they show scroll.

#### Example with Auto grow input:
```html
<dw-textarea  .minHeight=${80}  .maxHeight=${200}></dw-textarea>
```
### Fixed height input with scroll
- Provide input with fixed height after that they show scroll.
- Passed to `minHeight` to input to show fix height

#### Example Fixed height input with scroll:
```html
<dw-textarea  .minHeight=${70} .maxHeight=${70}></dw-textarea>
```
### Disabled enter
- Provide way enter not allowed in input.
- Set `disabledEnter` property set as a `true`.

#### Example Disabled enter:
```html
<dw-textarea .minHeight=${70} .maxHeight=${70} disabledEnter></dw-textarea>
```
## Other examples
- Read only input
```html
<dw-textarea  .minHeight=${80}  .maxHeight=${200}  .readOnly=${true}></dw-textarea>
```