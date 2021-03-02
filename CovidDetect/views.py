from django import http
from django.db import models
from django.db.models.fields import json
from django.shortcuts import render
from django.http import HttpResponse
from .models import Picture, User
import json
# Create your views here.

# request body is a dict
def check_login(request):
    res = {
        'success': True,
    }
    print(request.body)
    return HttpResponse(json.dumps(res), content_type="application/json")

# def upload_file_to_detect(request):
#     data = json.load(request.body)
#     # 解析传送过来的 request
#     to_deal = {}
#     # 分析图像的过程
#     res = analysis_pic()
#     # 返回 json 格式数据给前台
#     return HttpResponse(json.dumps(res), content_type='application/json')

# def return_table_of_pic(request):
#     data = json.load(request.body)
#     # 在 to_deal 中间读取传过来的用户名和密码
#     to_deal = {}
#     # 获得 username 对应的存储了的图像
#     username = ''
#     pic_list = Picture.objects.filter(user=username)
#     # 返回一个httpResponse，里面存储了pic_list信息，其中包含文件名 isCovid 检查的日期

# def return_user_information(request):
#     data = json.load(request.body)
#     # 读取传过来的 username，获取username的存储信息
#     to_deal = {}
#     username = ''
#     count = Picture.objects.count(user=username)
#     isCovid = Picture.objects.count(isCovid='Yes')
#     accuracy = isCovid / count
#     # 返回一个httpResponse，里面存储了 检查过的文件总数 以及 患病率
     
def user_is_exist(request):
    # 注册用户
    def user_register(username, password):
        User.object.create(name=username, password=password)

    data = json.load(request.body)
    # 读取传送过来的 username 以及 password
    username = data['username']
    password = data['password']
    # 辨明是注册还是登录(1: 注册, 0: 登录)
    is_register = data['isRegister']
    isExist = User.objects.filter(user=username)
    # todo
    if isExist.exists():
        # 如果用户存在，但是访客想要注册，那么提示访客用户存在
        if is_register == 1:
            res = {
                'Description': 'This user already register.',
            }
            return HttpResponse(json.dumps(res), content_type="application/json")
        # 如果用户存在，但是用户想要登录
        elif is_register == 0:
            # 需要先检查用户输入的信息是否正确
            # 如果用户输入的信息跟数据库中的用户 用户密码相对应成功，那么就返回成功状态进行跳转
            if isExist.filter(password=password).exists():
                res = {
                    'status': True
                }
                return HttpResponse(json.dumps(res), content_type="application/json")
            # 如果不相符合，那么返回描述密码错误
            else:
                res = {
                    'Description': 'Password Error.'
                }
                return HttpResponse(json.dumps(res), content_type="application/json")
    # 如果查询的用户名不存在
    else:
        # 如果用户想要注册，那么就自动帮助用户注册
        if is_register == 1:
            user_register(username, password)
            res = {
                'Description': 'Register Successfully.',
            }
            return HttpResponse(json.dumps(res), content_type="application/json")
        # 如果用户想要的是登录，但是用户不存在，那么提醒该用户不存在
        elif is_register == 0:
            res = {
                'Description': 'User has already registered.',
            }
            return HttpResponse(json.dumps(res), content_type="application/json")


# # todo
# def analysis_pic():
#     pass