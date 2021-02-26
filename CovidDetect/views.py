from django.db import models
from django.db.models.fields import json
from django.shortcuts import render
from django.http import HttpResponse
from .models import Picture, User
import json
# Create your views here.

def upload_file_to_detect(request):
    data = json.load(request.body)
    # 解析传送过来的 request
    to_deal = {}
    # 分析图像的过程
    res = analysis_pic()
    # 返回 json 格式数据给前台
    return HttpResponse(json.dumps(res), content_type='application/json')

def return_table_of_pic(request):
    data = json.load(request.body)
    # 在 to_deal 中间读取传过来的用户名和密码
    to_deal = {}
    # 获得 username 对应的存储了的图像
    username = ''
    pic_list = Picture.objects.filter(user=username)
    # 返回一个httpResponse，里面存储了pic_list信息，其中包含文件名 isCovid 检查的日期

def return_user_information(request):
    data = json.load(request.body)
    # 读取传过来的 username，获取username的存储信息
    to_deal = {}
    username = ''
    count = Picture.objects.count(user=username)
    isCovid = Picture.objects.count(isCovid='Yes')
    accuracy = isCovid / count
    # 返回一个httpResponse，里面存储了 检查过的文件总数 以及 患病率
     


# todo
def analysis_pic():
    pass