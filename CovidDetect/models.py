from django.db import models
import uuid

# Create your models here.

class User(models.Model):
    # 存储用户信息的表单
    name = models.CharField(max_length=16)
    password = models.CharField(max_length=16)
    # UUID 给用户单独标记
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid1, editable=False, null=False)

# 存储用户上传的图片
class Picture(models.Model):
    # pic 的 uuid ，根据传输过来的 uid 确定，默认为 ''
    pic_uuid = models.CharField(primary_key=True, default='', editable=False, null=False, max_length=128)
    # 文件名
    pic_name = models.TextField()
    # 文件名字
    pic = models.ImageField()
    # 一个用户对应多个图片
    user = models.ForeignKey(User, on_delete=models.CASCADE, default='')
    # 判断的结果: Yes / No
    isCovid = models.CharField(max_length=3, default='No')
    check_date = models.DateField()
