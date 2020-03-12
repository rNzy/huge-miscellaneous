import { getProtoTree, getConstructorTree } from './utils';

export default function PropertiesMixin(base, propertiesName = 'properties') {
  /**
   *
   *
   * @class PropertiesMixin
   * @extends {base}
   *
   * @prop {Array} protoTree - L'arbre des classes étendues
   * @prop {Object} propsConfig - Toutes les valeurs de get properties() de toutes les classes étendues
   */
  class PropertiesMixin extends base {
    static get observedAttributes() {
      let props = [];
      const propsConfig = buildProtoPropsConfig(
        propertiesName,
        getProtoTree(this)
      );
      return Object.keys(propsConfig)
        .filter(prop => {
          let attrName = propsConfig[prop].attributeName;
          if (attrName) {
            if (prop !== attrName) {
              props.push(attrName);
            }
          } else {
            props.push(camelToSnake(prop));
          }
        })
        .concat(props, super.observedAttributes || []);
    }

    constructor() {
      super();
      this.protoTree = getConstructorTree(Object.getPrototypeOf(this));
      this.propsConfig = buildConstructorPropsConfig(
        propertiesName,
        this.protoTree
      );
      Object.keys(this.propsConfig).forEach(name => {
        // Is like upgradeProperty from google WC best pratice
        const oldValue = this[name];

        // Permet de définir les getter et les setter en fonction
        // pour binder les attributs et les propriétés
        Object.defineProperty(
          this,
          name,
          makeDefineObject(
            this,
            this.getAttrNameFromJs(name),
            this.propsConfig[name].type
          )
        );

        // Is like upgradeProperty from google WC best pratice
        if (typeof oldValue !== 'undefined') {
          this[name] = oldValue;
        }
      });
    }

    /**
     * Here connectedCallback handle defaultValue of the properties
     * exemple if in some WC you have :
     * static get properties() {
     *   return {
     *     navigation: {
     *       type: 'boolean',
     *       defaultValue: 'true'
     *     }
     *   };
     * }
     */
    connectedCallback() {
      if (super.connectedCallback) super.connectedCallback();

      // Check if value already exists
      Object.keys(this.propsConfig).forEach(name => {
        // Check if value already set in DOM
        const value = this.getAttribute(this.getAttrNameFromJs(name));
        if (value != null) {
          if (this[name] != value) this[name] = value;
        } else if (
          this.propsConfig[name].defaultValue ||
          this.propsConfig[name].defaultValue === 0 ||
          this.propsConfig[name].defaultValue === ''
        ) {
          if (this[name] != this.propsConfig[name].defaultValue)
            this[name] = this.propsConfig[name].defaultValue;
        }
      });
    }

    // Update property see google WC exemple
    // upgradeProperty(prop) {
    //   if (this.hasOwnProperty(prop)) {
    //     const value = this[prop];
    //     delete this[prop];
    //     this[prop] = value;
    //   }
    // }

    // Return the Js Name (propertie) from the attribute name
    // exemple border-bottom return borderBottom
    // But if user specify a different name in his composant like this
    // static get properties() {
    //  return {
    //    borderLeft: {
    //      type: 'boolean',
    //      attributeName: 'arf-arf'
    //    }
    //  };
    // }
    // if we call this function with arf-arf it will return borderLeft
    getJsNameFromAttr(attrName) {
      // First check if a props exists in camelCase
      if (this.propsConfig[snaketoCamel(attrName)])
        return snaketoCamel(attrName);

      const propsArr = Object.keys(this.propsConfig);
      for (let i = 0, l = propsArr.length; i < l; i++) {
        if (
          this.propsConfig[propsArr[i]].attributeName &&
          this.propsConfig[propsArr[i]].attributeName === attrName
        )
          return propsArr[i];
      }
    }

    // Return the Attribute name from js propertie
    // exemple borderBottom return border-bottom
    // But if user specify a different name in his composant like this
    // static get properties() {
    //  return {
    //    borderLeft: {
    //      type: 'boolean',
    //      attributeName: 'arf-arf'
    //    }
    //  };
    // }
    // if we call this function with borderLeft it will return arf-arf
    getAttrNameFromJs(jsName) {
      return this.propsConfig[jsName].attributeName
        ? this.propsConfig[jsName].attributeName
        : camelToSnake(jsName);
    }
  }
  return PropertiesMixin;
}

/**
 * @private
 * @param {*} self
 * @param {*} name
 * @param {String} type
 */
function makeDefineObject(self, name, type) {
  switch (type) {
    case 'boolean':
      return {
        get: () => {
          return self.hasAttribute(name) && self.getAttribute(name) != 'false';
        },
        set: value => {
          // Si l'attribut a la même valeur que la propriété alors ne fait rien
          // == car on ne connait pas forcement le type.
          // utilise self[name] pour utiliser le get définie juste au dessus pour
          // bien avoir un boolean.
          if (self[name] == value) return;

          if (
            value === 'false' ||
            value === false ||
            value === null ||
            value === undefined ||
            value === 0 ||
            value === '0'
          ) {
            // Test pour angular js qui met des attributs de ce type checked=checked
            if (checkIfSpecialBoolean(name)) {
              self.removeAttribute(name);
            } else {
              self.setAttribute(name, false);
            }
          } else if (
            value === 'true' ||
            value === true ||
            value === '1' ||
            value === 1 ||
            value === ''
          ) {
            // Test pour angular js qui met des attributs de ce type checked=checked
            if (checkIfSpecialBoolean(name)) {
              self.setAttribute(name, name);
            } else {
              self.setAttribute(name, true);
            }
          } else {
            // eslint-disable-next-line no-console
            console.error('Error when you set value');
          }
          return;
        }
      };
    case 'string':
    case 'number':
      return {
        get: () => {
          return self.getAttribute(name);
        },
        set: value => {
          // Si l'attribut a la même valeur que la propriété alors ne fait rien
          // == car on ne connait pas forcement le type.
          if (self.getAttribute(name) == value) return;

          self.setAttribute(name, value);
        }
      };
  }
}

function checkIfSpecialBoolean(name) {
  if (
    name === 'checked' ||
    name === 'selected' ||
    name === 'disabled' ||
    name === 'open'
  ) {
    return true;
  } else {
    return false;
  }
}

/**
 * @private
 * @param {*} propertiesName
 * @param {*} protoTree
 */
function buildProtoPropsConfig(propertiesName, protoTree) {
  let propsConfig = {};
  for (let parentClass of [...protoTree].reverse()) {
    if (parentClass.hasOwnProperty(propertiesName))
      propsConfig = Object.assign(propsConfig, parentClass[propertiesName]);
  }
  return propsConfig;
}

/**
 * @private
 * @param {*} propertiesName
 * @param {*} protoTree
 */
function buildConstructorPropsConfig(propertiesName, protoTree) {
  let propsConfig = {};
  for (let parentClass of [...protoTree].reverse()) {
    if (parentClass.constructor.hasOwnProperty(propertiesName))
      propsConfig = Object.assign(
        propsConfig,
        parentClass.constructor[propertiesName]
      );
  }
  return propsConfig;
}

/**
 * Function to convert SnakeCase to CamelCase
 * border-bottom => borderBottom
 * @private
 * @param {string} str in SnakeCase
 * @return {sting} str in CamelCase
 */
function snaketoCamel(str) {
  const array = str.split('-');

  // Remove data at start
  if (array[0] === 'data') array.shift();

  return array.reduce((acc, current, index) => {
    const capitalized =
      index > 0 ? current.charAt(0).toUpperCase() + current.slice(1) : current;
    return acc + capitalized;
  }, '');
}

/**
 * Function to convert CamelCase to SnakeCase
 * borderBottom => border-bottom
 * @private
 * @param {string} str in CamelCase
 * @return {sting} str in SnakeCase
 */
function camelToSnake(str) {
  return str
    .split(/(?=[A-Z])/)
    .join('-')
    .toLowerCase();
}
