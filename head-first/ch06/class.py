# 每个定义的类都有一个特殊的方法__init()__，来控制如何初始化对象
# 注：python中没有'new'的概念
# 类中定义的所有方法的第一个参数都需要是self，表示调用对象实例
class Athlete:
	def __init__(self, a_name, a_dob=None, a_times=[]):
		self.name = a_name
		self.dob = a_dob
		self.times = a_times


sarah = Athlete('Sarah Sweeney', '2002-6-17', ['2.18', '2.25', '2.39'])
james = Athlete('James Bullunt', '2001-8-02', ['2.01', '2.22', '2.34'])

