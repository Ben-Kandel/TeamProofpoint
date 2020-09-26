from django.db import models

# Create your models here.

# model is a source of info about you data

# each attribute is a database field

class Lead(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.CharField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)