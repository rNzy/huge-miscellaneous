# Checkbox

## WAI-ARIA checklist

https://www.w3.org/TR/wai-aria-practices-1.1/#checkbox

## Keyboard Interaction

- [x] When the checkbox has focus, pressing the Space key changes the state of the checkbox

## WAI-ARIA Roles, States, and Properties

- [x] The checkbox has role checkbox.
- [x] The checkbox has an accessible label provided by one of the following:
  - Visible text content contained within the element with role checkbox.
  - A visible label referenced by the value of aria-labelledby set on the element with role checkbox.
  - aria-label set on the element with role checkbox.
- [x] When checked, the checkbox element has state aria-checked set to true.
- [x] When not checked, it has state aria-checked set to false.
- [ ] When partially checked, it has state aria-checked set to mixed.
- [ ] If a set of checkboxes is presented as a logical group with a visible label, the checkboxes are included in an element with role group that has the property aria-labelledby set to the ID of the element containing the label.
- [ ] If the presentation includes additional descriptive static text relevant to a checkbox or checkbox group, the checkbox or checkbox group has the property aria-describedby set to the ID of the element containing the description.
