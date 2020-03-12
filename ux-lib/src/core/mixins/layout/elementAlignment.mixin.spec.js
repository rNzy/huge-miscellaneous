// à utiliser pour les éléments ayant un display: block;
export const elementAlignmentBlock = customEl => {
  it('ElementAlignment center block ?', () => {
    // Disable on have class
    customEl.center = true;
    expect(customEl.container.classList).toContain('center');
    expect(customEl.container.style.marginLeft).toEqual('auto');
    expect(customEl.container.style.marginRight).toEqual('auto');
    expect(customEl.container.style.display).toEqual('block');

    // Disable off don't have class
    customEl.center = false;
    expect(customEl.container.classList).not.toContain('center');
    // Ces test ne marche pas sous jsdom mais cela fonctionne
    // sur le navigateur
    expect(customEl.container.style.marginLeft).toEqual('');
    expect(customEl.container.style.marginRight).toEqual('');
    expect(customEl.container.style.display).toEqual('');
  });

  it('ElementAlignment left block ?', () => {
    // Disable on have class
    customEl.left = true;
    expect(customEl.container.classList).toContain('left');
    expect(customEl.container.style.marginRight).toEqual('auto');
    expect(customEl.container.style.display).toEqual('block');

    // Disable off don't have class
    customEl.left = false;
    expect(customEl.container.classList).not.toContain('left');
    // Ces test ne marche pas sous jsdom mais cela fonctionne
    // sur le navigateur
    expect(customEl.container.style.marginLeft).toEqual('');
    expect(customEl.container.style.marginRight).toEqual('');
    expect(customEl.container.style.display).toEqual('');
  });

  it('ElementAlignment right block ?', () => {
    // Disable on have class
    customEl.right = true;
    expect(customEl.container.classList).toContain('right');
    expect(customEl.container.style.marginLeft).toEqual('auto');
    expect(customEl.container.style.display).toEqual('block');

    // Disable off don't have class
    customEl.right = false;
    expect(customEl.container.classList).not.toContain('right');
    // Ces test ne marche pas sous jsdom mais cela fonctionne
    // sur le navigateur
    expect(customEl.container.style.marginLeft).toEqual('');
    expect(customEl.container.style.display).toEqual('');
  });
};

// à utiliser pour les éléments ayant un display: flex;
export const elementAlignmentFlex = customEl => {
  it('ElementAlignment center flex ?', () => {
    // Disable on have class
    customEl.center = true;
    expect(customEl.container.classList).toContain('center');
    expect(customEl.container.style.marginLeft).toEqual('auto');
    expect(customEl.container.style.marginRight).toEqual('auto');
    expect(customEl.container.style.display).toEqual('flex');

    // Disable off don't have class
    customEl.center = false;
    expect(customEl.container.classList).not.toContain('center');
    // Ces test ne marche pas sous jsdom mais cela fonctionne
    // sur le navigateur
    expect(customEl.container.style.marginLeft).toEqual('');
    expect(customEl.container.style.marginRight).toEqual('');
    expect(customEl.container.style.display).toEqual('');
  });

  it('ElementAlignment left flex ?', () => {
    // Disable on have class
    customEl.left = true;
    expect(customEl.container.classList).toContain('left');
    expect(customEl.container.style.marginRight).toEqual('auto');
    expect(customEl.container.style.display).toEqual('flex');

    // Disable off don't have class
    customEl.left = false;
    expect(customEl.container.classList).not.toContain('left');
    // Ces test ne marche pas sous jsdom mais cela fonctionne
    // sur le navigateur
    expect(customEl.container.style.marginLeft).toEqual('');
    expect(customEl.container.style.marginRight).toEqual('');
    expect(customEl.container.style.display).toEqual('');
  });

  it('ElementAlignment right flex ?', () => {
    // Disable on have class
    customEl.right = true;
    expect(customEl.container.classList).toContain('right');
    expect(customEl.container.style.marginLeft).toEqual('auto');
    expect(customEl.container.style.display).toEqual('flex');

    // Disable off don't have class
    customEl.right = false;
    expect(customEl.container.classList).not.toContain('right');
    // Ces test ne marche pas sous jsdom mais cela fonctionne
    // sur le navigateur
    expect(customEl.container.style.marginLeft).toEqual('');
    expect(customEl.container.style.display).toEqual('');
  });
};
