import sys
import pygame

from settings import Settings
from ship import Ship


def run_game():
    # 初始化游戏并创建一个屏幕对象
    pygame.init()
    ai_settings = Settings()
    screen = pygame.display.set_mode(
        (ai_settings.screen_width, ai_settings.screen_height))
    # 设置游戏窗口标题
    pygame.display.set_caption("Alien Invasion")

    # 创建一艘飞船
    ship = Ship(screen)
    
    # 开始游戏的主循环
    while True:
        # 监听输入事件
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                sys.exit()

                # 每次循环时都重绘屏幕 填充颜色
        screen.fill(ai_settings.bg_color)
        ship.blitme()

        # 让最近绘制的屏幕可见：每次执行循环时都会绘制一个空屏幕，并擦去旧屏幕，使得只有新屏幕可见，即是一个不断更新屏幕的过程，类似于电影的成像效果
        pygame.display.flip()


run_game()
