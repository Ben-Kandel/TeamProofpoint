from predictions.models import Predictions
from rest_framework import viewsets, permissions
from .serializers import PredictionsSerializer
from django_filters.rest_framework import DjangoFilterBackend



# Lead Viewset


class PredictionsViewSet(viewsets.ModelViewSet):
    queryset = Predictions.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = PredictionsSerializer

    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'subject', 'keyword', 'prediction']