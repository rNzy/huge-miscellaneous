/**
 * @param {number[]} nums
 * @return {number[]}
 */
var runningSum = function (nums) {
  let sum = [];
  const reducer = (acc, cur) => acc + cur;

  for (i = nums.length; i > 0; i--) {
    sum.push(nums.reduce(reducer) - nums.splice(i, 1));
  }
  return sum.reverse();
};
