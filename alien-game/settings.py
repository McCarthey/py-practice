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

        # 子弹设置
        self.bullet_speed_factor = 1
        self.bullet_width = 30
        self.bullet_height = 15
        self.bullet_color = (200, 0, 0)
        self.bullets_allowed = 5

        # 外星人设置
        self.alien_speed_factor = 1
        self.fleet_drop_speed = 10
        # fleet_direction为1表示向右移,为-1表示向左移动
        self.fleet_direction = 1
