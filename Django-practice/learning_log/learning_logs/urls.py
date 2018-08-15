"""定义learning_logs的URL模式"""
from django.urls import include, path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('topics/', views.topics, name='topics')
]
