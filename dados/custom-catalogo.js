(function (r, f) {
  const d = f();
  if (typeof module !== 'undefined' && module.exports) module.exports = d;
  else r.ForjaCustomCatalogo = d;
})(globalThis, function () {
  'use strict';
  return {
    imagens: {
      racas: {},
      subracas: {},
      classes: {},
      subclasses: {}
    },
    racas: {},
    subracas: {},
    classes: {},
    subclasses: {},
    talentos: {},
    antecedentes: {}
  };
});
