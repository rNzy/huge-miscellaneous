export const delegateFocus = customEl => {
  it('Delegate Focus El existe', () => {
    expect(customEl.delegateFocusElement).toBeTruthy();
  });

  it('Delegate Focus Work', () => {
    const oldTabIndex = customEl.tabIndex;
    customEl.tabIndex = '-1';
    customEl.focus();
    expect(
      customEl.$.activeElement === customEl.delegateFocusElement
    ).toBeTruthy();
    customEl.tabIndex = oldTabIndex;
  });
};
