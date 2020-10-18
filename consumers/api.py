from consumers.models import Consumer
from rest_framework import viewsets, permissions
from .serializers import ConsumerSerializer
from django_filters.rest_framework import DjangoFilterBackend



# Lead Viewset
# overided by api.py

class ConsumerViewSet(viewsets.ModelViewSet):
    queryset = Consumer.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ConsumerSerializer

    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'subject', 'sentiment_score', 'keywords', 'date', 'pn']