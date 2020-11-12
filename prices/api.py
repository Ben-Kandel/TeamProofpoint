from prices.models import Prices
from rest_framework import viewsets, permissions
from .serializers import PricesSerializer
from django_filters.rest_framework import DjangoFilterBackend



# Lead Viewset
# overided by api.py

class PricesViewSet(viewsets.ModelViewSet):
    queryset = Prices.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = PricesSerializer

    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'date', 'price', 'name']