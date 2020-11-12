from stocks.models import Stocks
from rest_framework import viewsets, permissions
from .serializers import Stocks_dataSerializer
from django_filters.rest_framework import DjangoFilterBackend

# Lead Viewset
# overided by api.py

class Stocks_dataViewSet(viewsets.ModelViewSet):
    queryset = Stocks.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = Stocks_dataSerializer

    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['date', 'price','index']