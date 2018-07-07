import sys
import pygame


def check_events(ship):
    # 用于响应鼠标和键盘事件
	# 每当用户按键时，都将在pygame中注册一个事件。事件都是通过pygame.event.get()方法获取的
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            sys.exit()
        elif event.type == pygame.KEYDOWN:
            if event.key == pygame.K_RIGHT:
                ship.moving_right = True
            elif event.key == pygame.K_LEFT:
                ship.moving_left = True
        elif event.type == pygame.KEYUP:
            if event.key == pygame.K_RIGHT:
                ship.moving_right = False
            elif event.key == pygame.K_LEFT:
                ship.moving_left = False
				
def update_screen(ai_settings, screen, ship):
    # 用于更新屏幕
	# 每次循环时都重绘屏幕 填充颜色
    screen.fill(ai_settings.bg_color)
    ship.blitme()

    # 让最近绘制的屏幕可见：每次执行循环时都会绘制一个空屏幕，并擦去旧屏幕，使得只有新屏幕可见，即是一个不断更新屏幕的过程，类似于电影的成像效果
    pygame.display.flip()
