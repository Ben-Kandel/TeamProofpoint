from rest_framework import serializers
from .models import Predictions

class PredictionsSerializer(serializers.ModelSerializer):
    class Meta:
        # list fields and model for each serializer
        # list fields and model for each serializer
        model = Predictions
        fields = ('id', 'subject', 'keyword', 'prediction')