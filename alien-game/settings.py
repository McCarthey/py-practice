class Settings():
	# 存储游戏中的所有设置的类
	
	def __init__(self):
		# 初始化游戏设置
		# 屏幕设置
		self.screen_width = 1200
		self.screen_height = 800
		# 设置背景颜色 pygame中的颜色都是RGB的形式
		self.bg_color = (230, 230, 230)
		# 控制飞船移动速度
		self.ship_speed_factor = 1.5
