export const haveShadow = customEl => {
  return it('Have shadow ?', () => {
    expect(customEl.$).toBeDefined();
  });
};

export const haveSlot = customEl => {
  it('Have slot ?', () => {
    expect(customEl.$.querySelector('slot')).toBeTruthy();
  });
};

export const haveContainer = customEl => {
  it('Have container ?', () => {
    expect(customEl.container).toBeTruthy();
  });
};
