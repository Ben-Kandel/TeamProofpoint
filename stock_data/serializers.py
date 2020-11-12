from rest_framework import serializers
from .models import Stocks_data

class Stocks_dataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stocks_data
        fields = ('date', 'price', 'index')