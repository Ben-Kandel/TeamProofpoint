from django.db import models

# Create your models here.

# sample model for contact information for reference

class Lead(models.Model):
    name = models.CharField(max_length=100, default='name')
    score = models.DecimalField(decimal_places=2, max_digits=4, default=0)
    subject = models.CharField(max_length=100, default='candidate')
    data_type = models.CharField(max_length=100, default='unspecified')
    created_at = models.DateTimeField(auto_now_add=True)