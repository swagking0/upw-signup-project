from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class UserAccounts(AbstractUser):
    address = models.TextField()
    plans = models.CharField(max_length=10)
    coupon = models.CharField(max_length=10)
    language = models.CharField(max_length=10)

class Menu(models.Model):
    name = models.CharField(max_length=20)
    url = models.CharField(max_length=20)

class MenuUserMaps(models.Model):
    menu_instance = models.ForeignKey(Menu,on_delete=models.CASCADE)
    user_instance = models.ForeignKey(UserAccounts,on_delete=models.CASCADE)
    status = models.CharField(max_length=20)