from django.shortcuts import render
from .models import Prices
from .serializers import PricesSerializer
from rest_framework import generics, filters
from django_filters.rest_framework import DjangoFilterBackend

# Create your views here.
class StockListCreate(generics.ListCreateAPIView):
    queryset = Prices.objects.all()
    serializer_class = PricesSerializer
    # filter_backends = [DjangoFilterBackend]
    filter_backends = [filters.SearchFilter]
    search_fields = ['id', 'date', 'price', 'name']
    #filterset_fields = ['id', 'subject', 'sentiment_score', 'keywords', 'date', 'pn']
