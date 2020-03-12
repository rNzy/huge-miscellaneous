export const btnOutlined = customEl => {
  it('Btn Outlined Mixin working ?', () => {
    // Ajout d'un element a trigger dans le document
    customEl.outlined = true;
    expect(customEl.container.classList).toContain('c-btn--outlined');

    // Disable off don't have class
    customEl.outlined = false;
    expect(customEl.container.classList).not.toContain('c-btn--outlined');
  });
};
