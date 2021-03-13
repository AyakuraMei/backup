from django import http
from django.db import models
from django.db.models.fields import json
from django.shortcuts import render
from django.http import HttpResponse
from django.urls.conf import path
from .models import Picture, User
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
import json
import os
# Create your views here.

# request body is a dict
def check_login(request):
    res = {
        'success': True,
        'status': 1,
        'Description': 'wo ye shi long',
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
    """
    注册或者登录用户，前端传来用户名字、密码以及注册登录的操作

    Args:
        request:前端传过来的数据
            username: 用户名
            password: 密码
            isRegister: 1: 注册， 0：登录
    Returns:
        res{
            'Description': 描述出错的原因,
            'status': 是否进行跳转,
        },
    """ 
    def user_register(username, password):
        """
        注册用户
        
        Args:
            username: 用户名
            password: 用户密码
        """
        userQuery = User.object.create(name=username, password=password)
        # 如果 userQuery 不为 0 ，则代表创建用户成功
        return len(userQuery) != 0

    data = json.load(request.body)
    # 读取传送过来的 username 以及 password
    username = data['username']
    password = data['password']
    # 辨明是注册还是登录(1: 注册, 0: 登录)
    is_register = data['isRegister']
    isExist = User.objects.filter(user=username)
    if isExist.exists():
        # 如果用户存在，但是访客想要注册，那么提示访客用户存在
        if is_register == 1:
            res = {
                'Description': 'This user already register.',
                'status': False,
            }
            return HttpResponse(json.dumps(res), content_type="application/json")
        # 如果用户存在，但是用户想要登录
        elif is_register == 0:
            # 需要先检查用户输入的信息是否正确
            # todo
            # 如果用户输入的信息跟数据库中的用户 用户密码相对应成功，那么就返回成功状态进行跳转
            if isExist.filter(password=password).exists():
                res = {
                    'status': True,
                }
                return HttpResponse(json.dumps(res), content_type="application/json")
            # 如果不相符合，那么返回描述密码错误
            else:
                res = {
                    'Description': 'Password Error.',
                    'status': False,
                }
                return HttpResponse(json.dumps(res), content_type="application/json")
    # 如果查询的用户名不存在
    else:
        # 如果用户想要注册，那么就自动帮助用户注册
        if is_register == 1:
            user_register(username, password)
            res = {
                'Description': 'Register Successfully.',
                'status': True,
            }
            return HttpResponse(json.dumps(res), content_type="application/json")
        # 如果用户想要的是登录，但是用户不存在，那么提醒该用户不存在
        elif is_register == 0:
            res = {
                'Description': 'User has already registered.',
                'status': False,
            }
            return HttpResponse(json.dumps(res), content_type="application/json")

def get_user_information(request):
    """
        获取用户的信息，返回用户名字，存储过多少图像已经有多少个是推断为确诊的（前端可以利用这两个数据计算出准确率）
    """
    data = json.load(request)
    username = data['username']
    password = data['password']
    if username == '' or password == '':
        res = {
            'username':'',
            'totalPicture': 0,
            'isCovid': 0,
        }
        return HttpResponse(json.dumps(res), content_type="application/json")

    user = User.objects.filter(name=username, password=password)
    if user.exists():
        res = {
            'username': username,
            'totalPicture': len(Picture.objects.filter(user=username)),
            'isCovid':len(Picture.objects.filter(user=username, isCovid='Yes')),
        }
        return HttpResponse(json.dumps(res), content_type="application/json")

def get_my_history(request):
    """
        获取用户的检测历史
    """
    data = json.load(request)
    username = data['username']
    password = data['password']
    if username == '' or password == '':
        return {}
    
    data = json.load(request)
    username = data['username']
    pic_set = Picture.objects.filter(user=username)
    returnSet = dict(pic_set)
    return HttpResponse(json.dumps(returnSet), content_type="application/json")

"""
    存储以及检测发送过来的图片
"""
def upload_covid_picture(request):
    """
        上传图片文件，然后判断传入的CT图片是什么性质
    """
    # todo: 让前端附带上上传的文件
    # 解决方法：让前端写一个 formData，在上传文件的时候附带上
    # data = json.load(request)
    # pic_create = Picture.objects.create()
    if request.FILES == None:
        return HttpResponse('Must have files attached')
    # 获取用户传送过来的 image
    image = request.FILES.get('photo')
    # 有针对性地构建文件目录和文件名
    dir = str(request.POST['username']) + '\\' + str(image.name)
    print(dir)
    path = default_storage.save(dir ,ContentFile(image.read()))
    # todo: 返回一个判断结果
    res = {
        'isCovid':'',
    }
    return HttpResponse(json.dumps({'status': 200}), content_type="application/json")



# # todo
# def analysis_pic():
#     pass