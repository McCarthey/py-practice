import sys
import pygame

from settings import Settings
from ship import Ship
import game_functions as gf


def run_game():
    # 初始化游戏并创建一个屏幕对象
    pygame.init()
    ai_settings = Settings()
    screen = pygame.display.set_mode(
        (ai_settings.screen_width, ai_settings.screen_height))
    # 设置游戏窗口标题
    pygame.display.set_caption("Alien Invasion")

    # 创建一艘飞船
    ship = Ship(screen, ai_settings)

    # 开始游戏的主循环
    while True:
        gf.check_events(ship)
        # 飞船的位置将在检测到键盘事件后（更新屏幕前）更新
        ship.update()
        gf.update_screen(ai_settings, screen, ship)


run_game()
