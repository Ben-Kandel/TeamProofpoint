from stocks.models import Stocks
from rest_framework import viewsets, permissions
from .serializers import StocksSerializer
from django_filters.rest_framework import DjangoFilterBackend



# Lead Viewset
# overided by api.py

class StocksViewSet(viewsets.ModelViewSet):
    queryset = Stocks.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = StocksSerializer

    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'date', 'volume', 'subject', 'ASS', 'P_N']

