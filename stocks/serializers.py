from rest_framework import serializers
from .models import Stocks

class StocksSerializer(serializers.ModelSerializer):
    class Meta:
        # list fields and model for each serializer
        model = Stocks
        fields = ('id', 'date', 'volume', 'subject', 'ASS', 'P_N')