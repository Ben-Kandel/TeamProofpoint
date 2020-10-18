from rest_framework import serializers
from .models import Stocks

class StocksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stocks
        fields = ('id', 'subject', 'sentiment_score', 'keywords', 'date', 'pn')