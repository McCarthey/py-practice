# 每个定义的类都有一个特殊的方法__init()__，来控制如何初始化对象
# 注：python中没有'new'的概念
class Athlete:
	def __init__(self,value=0):
		self.thing = value
	def how_big(self):
		return (len(self.thing))
	
d = Athlete("Hello shit")
print(d.how_big())