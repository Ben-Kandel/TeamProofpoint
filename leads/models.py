from django.db import models

# Create your models here.
class Lead(models.Model):
    # model fields here
    # 1 for 1 make each field equal a category (row) in the SQLite3 database

    date = models.CharField(max_length=50, default='2020/10/01')
    volume = models.IntegerField(default=0)
    subject = models.CharField(max_length=100, default='candidate')
    ASS = models.DecimalField(decimal_places=4, max_digits=8, default=0)
    P_N = models.CharField(max_length=2, default='unspecified')
    url = models.IntegerField(default=0)
    attachment = models.IntegerField(default=0)



