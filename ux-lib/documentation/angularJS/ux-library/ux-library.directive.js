/* eslint-disable */
(function () {
  'use strict';
  angular
    .module('domi.virtualis.components.ux-library')
    .directive('uxBind', function ($interval, $parse) {
      return {
        restrict: 'A',
        replace: false,
        transclude: false,
        scope: {
          uxBind: '@',
          uxModel: '=',
          uxChange: '='
        },
        link: function (scope, elem, attr) {
          function checkIfSpecialBoolean(name) {
            if (name === 'checked' || name === 'selected' || name === 'disabled') {
              return true;
            } else {
              return false;
            }
          }
          function isAssignable(attrs, propertyName) {
            var fn = $parse(attrs[propertyName]);
            return angular.isFunction(fn.assign);
          }
          function isObjLiteral(_obj) {
            var _test = _obj;
            return typeof _obj !== 'object' || _obj === null ? false : (function () {
              while (!false) {
                if (
                  Object.getPrototypeOf(
                    (_test = Object.getPrototypeOf(_test))
                  ) === null
                ) {
                  break;
                }
              }
              return Object.getPrototypeOf(_obj) === _test;
            })();
          }
          scope.parse = isObjLiteral(scope.uxModel);

          if (scope.parse) {
            attr.$set(scope.uxBind, angular.toJson(scope.uxModel));
          } else {
            attr.$set(scope.uxBind, scope.uxModel);
          }

          //Watch model for changes, and update attribute
          scope.$watch(
            function () {
              return scope.uxModel;
            },
            function () {
              if (scope.parse) {
                attr.$set(scope.uxBind, angular.toJson(scope.uxModel));
              } else {
                attr.$set(scope.uxBind, scope.uxModel);
              }
            }
          );

          //Watch for changes in attribute, and update model
          scope.$watch(
            function () {
              if (!elem[0]) {
                return;
              }
              return elem[0].getAttribute(scope.uxBind);
            },
            function (value) {
              if (isAssignable(attr, 'uxModel')) {
                var tmpVal = scope.parse ? JSON.parse(value) : value;
                if (checkIfSpecialBoolean(scope.uxBind)) {
                  scope.uxModel = checkIfSpecialBoolean(tmpVal);
                } else {
                  scope.uxModel = tmpVal;
                }
                if (scope.uxChange) {
                  scope.uxChange(scope.uxModel);
                }
              }
            }
          );

          //Get attribute value for angularjs to reevaluate dom
          var interval = $interval(function () {
            if (!elem[0]) {
              return;
            }
            elem[0].getAttribute(scope.uxBind);
          }, 100);

          elem.on('$destroy', function () {
            $interval.cancel(interval);
          });
        }
      };
    });
})();
