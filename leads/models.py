from django.db import models

# Create your models here.
class Lead(models.Model):
    subject = models.CharField(max_length=100, default='candidate')
    sentiment_score = models.DecimalField(decimal_places=2, max_digits=4, default=0)
    keywords = models.CharField(max_length=100, default='unspecified')
    date = models.DateTimeField(default='2020-10-01 12:05')
    pn = models.CharField(max_length=2, default='unspecified')

