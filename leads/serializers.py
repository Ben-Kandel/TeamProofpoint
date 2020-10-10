from rest_framework import serializers
from .models import Lead

# serializer for lead class

class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = ('id', 'name', 'score', 'subject', 'data_type')

