/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function (nums) {
  let obj = {};
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] in obj && i - obj[nums[i]]) {
      return true;
    }
    obj[nums[i]] = i;
  }
  return false;
};
