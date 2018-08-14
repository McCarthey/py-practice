from django.shortcuts import render
from .models import Topic

# Create your views here.
def index(request):
	"""学习笔记的主页"""
	return render(request, 'learning_logs/index.html')
	
def topics(request):
	"""显示所有的主题"""
	topics = Topics.objects.order_by('data_added')
	context = {'topics': topics}
	return render(request, 'learning_logs/topics.html', context)