class Solution:
    def removeDuplicates(self, nums):
        """
        :type nums: List[int]
        :rtype: int
        """
        print(sorted(set(nums)))
        return sorted(set(nums))


Solution().removeDuplicates([1, 1, 2])
