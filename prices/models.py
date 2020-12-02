from django.db import models


# Create your models here.
class Prices(models.Model):
    # model fields here
    # 1 for 1 make each field equal a category (row) in the SQLite3 database

    date = models.CharField(max_length=50, default='2020/10/01')
    price = models.DecimalField(decimal_places=15, max_digits=88, default=0)
    name = models.CharField(max_length=10, default='stonks')


from django.shortcuts import render

# Create your views here.

