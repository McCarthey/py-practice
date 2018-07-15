import sys
import pygame
from bullet import Bullet
from alien import Alien


def check_events(ai_settings, screen, ship, bullets):
    # 用于响应鼠标和键盘事件
        # 每当用户按键时，都将在pygame中注册一个事件。事件都是通过pygame.event.get()方法获取的
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            sys.exit()
        elif event.type == pygame.KEYDOWN:
            check_keydown_events(event, ship, bullets, ai_settings, screen)
        elif event.type == pygame.KEYUP:
            check_keyup_events(event, ship)


def check_keydown_events(event, ship, bullets, ai_settings, screen):
        # 响应按键
    if event.key == pygame.K_RIGHT:
        ship.moving_right = True
    elif event.key == pygame.K_LEFT:
        ship.moving_left = True
    elif event.key == pygame.K_SPACE:
        fire_bullet(ai_settings, screen, ship, bullets)
    elif event.key == pygame.K_q:
        sys.exit()


def check_keyup_events(event, ship):
        # 响应松开
    if event.key == pygame.K_RIGHT:
        ship.moving_right = False
    elif event.key == pygame.K_LEFT:
        ship.moving_left = False


def fire_bullet(ai_settings, screen, ship, bullets):
    # 如果当前屏幕的子弹数小于最大限制 则创建一颗子弹，并将其加入到编组中
    if len(bullets) < ai_settings.bullets_allowed:
        new_bullet = Bullet(ai_settings, screen, ship)
        bullets.add(new_bullet)


def update_bullets(bullets):
    # 更新子弹的位置，并删除已消失的子弹
    bullets.update()

    # 删除已消失的子弹
    for bullet in bullets.copy():
        if bullet.rect.bottom <= 0:
            bullets.remove(bullet)


def create_fleet(ai_settings, screen, aliens):
    # 创建外星人群
    # 创建一个外星人，并计算一行可容纳多少个外星人
    # 外星人间距为外星人宽度
    alien = Alien(ai_settings, screen)
    alien_width = alien.rect.width
    create_alien(ai_settings, alien_width, screen, aliens)

def get_number_alien_x(ai_settings, alien_width):
    # 计算一行能排多少外星人
    available_space_x = ai_settings.screen_width - 2 * alien_width
    number_aliens_x = int(available_space_x / (2 * alien_width))
    return number_aliens_x

def create_alien(ai_settings, alien_number, screen, aliens):
    # 创建一个外星人并将其加入当前行
    alien = Alien(ai_settings, screen)
    alien_width = alien.rect.width
    alien.x = alien_width + 2 * alien_width * alien_number
    alien.rect.x = alien.x
    aliens.add(alien)

def update_screen(ai_settings, screen, ship, aliens, bullets):
    # 用于更新屏幕
    # 每次循环时都重绘屏幕 填充颜色
    screen.fill(ai_settings.bg_color)
    # 在飞船和外星人后面重绘所有子弹
    for bullet in bullets.sprites():
        bullet.draw_bullet()
    ship.blitme()
    aliens.draw(screen)

    # 让最近绘制的屏幕可见：每次执行循环时都会绘制一个空屏幕，并擦去旧屏幕，使得只有新屏幕可见，即是一个不断更新屏幕的过程，类似于电影的成像效果
    pygame.display.flip()
