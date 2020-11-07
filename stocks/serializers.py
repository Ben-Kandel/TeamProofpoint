from rest_framework import serializers
from .models import Stocks

class StocksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stocks
        fields = ('id', 'date', 'volume', 'subject', 'ASS', 'P_N')