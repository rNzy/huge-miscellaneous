export const triggerEl = customEl => {
  it('Trigger Mixin working ?', () => {
    // Ajout d'un element a trigger dans le document
    const tplTriger = document.createElement('div');
    tplTriger.id = 'mytargetId';
    document.body.appendChild(tplTriger);

    // Ajout de la targetId au customEl
    customEl.targetId = 'mytargetId';

    // On clique sur le boutton il doit ouvrir le div
    customEl.container.click();
    expect(tplTriger.open).toBeTruthy();

    // On clique sur le boutton il doit fermer le div
    customEl.container.click();
    expect(tplTriger.open).toBeFalsy();

    document.body.remove(tplTriger);
  });
};
