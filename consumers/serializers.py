from rest_framework import serializers
from .models import Consumer

class ConsumerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consumer
        fields = ('id', 'subject', 'sentiment_score', 'keywords', 'date', 'pn')