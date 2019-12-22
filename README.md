# DualSelectBox.js

A Javascript class that allows you to move values between two select boxes and then select all of the options in one of the boxes for submission. 

### The following variables *must* be passed to the constructor on creation:
  * `leftBox` - an array of JSON objects in the form of `{name,id}` to be placed in the left `<select>` element  
  * `rightBox` - an array of JSON objects in the form of `{name,id}` to be placed in the right `<select>` element  
  
### The following variables *can* be passed to the constructor on creation, however they also have default values assigned to them:  
  * `leftBoxId` - the HTML id of the left `<select>` element - Default: dsb-leftBox  
  * `rightBoxId` - the HTML id of the right `<select>` element - Default: dsb-rightBox  
  * `buttonDivId` - the HTML id of the `<div>` element that the shift buttons will be placed in - Default: dsb-buttons  
  * `submitButtonId` - the HTML id of the `<button>` element that submits the form that the `<select>` boxes are in - Default: dsb-submit  
