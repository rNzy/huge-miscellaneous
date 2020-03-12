/*eslint no-constant-condition: ["error", { "checkLoops": false }]*/
/**
 *
 * @param {*} topClass
 */
export const getConstructorTree = topClass => {
  let protoTree = [],
    parentClass = null;
  while (true) {
    parentClass =
      parentClass === null ? topClass : Object.getPrototypeOf(parentClass);
    if (
      !parentClass ||
      !parentClass.constructor ||
      parentClass.constructor === HTMLElement ||
      parentClass.constructor === Function ||
      parentClass.constructor === Object ||
      parentClass.constructor === parentClass.constructor.constructor
    )
      break;
    protoTree.push(parentClass);
  }
  return protoTree;
};

/**
 *
 * @param {*} topClass
 */
export const getProtoTree = topClass => {
  let protoTree = [],
    parentClass = null;
  while (true) {
    parentClass =
      parentClass === null ? topClass : Object.getPrototypeOf(parentClass);
    if (
      !parentClass ||
      parentClass === HTMLElement ||
      parentClass === Function ||
      parentClass === Object ||
      parentClass === parentClass.constructor
    )
      break;
    protoTree.push(parentClass);
  }
  return protoTree;
};

/**
 * Get navigator with version
 *
 * output exemple :
 * {
 *  name: 'Chrome',
 *  version: '62'
 * }
 */
export const getNavigator = () => {
  var ua = navigator.userAgent,
    tem,
    M =
      ua.match(
        /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
      ) || [];
  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
    return {
      name: 'IE ' + (tem[1] || '')
    };
  }
  if (M[1] === 'Chrome') {
    tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
    if (tem != null) {
      return {
        name: tem
        .slice(1)
        .join(' ')
        .replace('OPR', 'Opera')
      };
    }
  }
  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
  if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
  return {
    name: M[0],
    version: M[1]
  };
};
