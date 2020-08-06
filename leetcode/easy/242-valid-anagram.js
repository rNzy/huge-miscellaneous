/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
  if (s.length !== t.length) return false;

  const obj = {};
  s.split("").map((i) => (obj[i] = obj[i] ? obj[i] + 1 : 1));
  t.split("").map((i) => (obj[i] = obj[i] ? obj[i] - 1 : -1));
  return Object.keys(obj).every((j) => obj[j] === 0);
};
