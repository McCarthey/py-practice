class Solution(object):
    def countDigitOne(self, n):
        """
       用递归做的，可以改成记忆化搜索，加快时间
        """
        if n<=0: return 0
        if n<10: return 1
        last = int(str(n)[1:])
        power =  10**(len(str(n))-1)      
        high = int(str(n)[0])
        if high == 1:
            return self.countDigitOne(last) + self.countDigitOne(power-1) + last+1
        else:
            return power+high*self.countDigitOne(power-1) + self.countDigitOne(last);

print(Solution().countDigitOne(4925))