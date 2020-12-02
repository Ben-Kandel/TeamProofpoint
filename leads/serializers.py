from rest_framework import serializers
from .models import Lead

class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        # list fields and model for each serializer
        model = Lead
        fields = ('id', 'date', 'volume', 'subject', 'ASS', 'P_N', 'url', 'attachment')