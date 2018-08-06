# Create your models here.
# 模型告诉Django如何处理应用程序中存储的数据，是一个类
from django.db import models

class Topic(models.Model):
	"""用户学习的主题"""
	text = models.CharField(max_length=200)
	date_added = models.DateTimeField(auto_now_add=True)
	
	def __str__(self):
		"""返回模型的字符串表示"""
		return self.text