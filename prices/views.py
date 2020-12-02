from django.shortcuts import render
from .models import Prices
from .serializers import PricesSerializer
from rest_framework import generics, filters
from django_filters.rest_framework import DjangoFilterBackend

# overided by api.py

# Create your views here.
class StockListCreate(generics.ListCreateAPIView):
    # control view for api (necessary but never seen)
    queryset = Prices.objects.all()
    serializer_class = PricesSerializer
    # settings for search filters
    filter_backends = [filters.SearchFilter]
    search_fields = ['id', 'date', 'price', 'name']

