class Solution:
    def twoSum(self, nums, target):
        """
        :type nums: List[int]
        :type target: int
        :rtype: List[int]
                """
        for i in range(len(nums)):
            num_expect = target - nums[i]
            if num_expect in nums[i + 1:]:
                print([i, nums.index(num_expect, i+1)])
                return [i, nums.index(num_expect, i+1)]


Solution().twoSum([3, 5, 4, 1, 4], 9)
