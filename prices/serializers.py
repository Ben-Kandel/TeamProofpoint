from rest_framework import serializers
from .models import Prices

class PricesSerializer(serializers.ModelSerializer):
    class Meta:
        # list fields and model for each serializer
        model = Prices
        fields = ('id', 'date', 'price', 'name')