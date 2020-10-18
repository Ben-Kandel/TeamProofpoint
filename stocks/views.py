from django.shortcuts import render
from .models import Stocks
from .serializers import StocksSerializer
from rest_framework import generics, filters
from django_filters.rest_framework import DjangoFilterBackend

# Create your views here.
class StockListCreate(generics.ListCreateAPIView):
    queryset = Stocks.objects.all()
    serializer_class = StocksSerializer
    # filter_backends = [DjangoFilterBackend]
    filter_backends = [filters.SearchFilter]
    search_fields = ['id', 'subject', 'sentiment_score', 'keywords', 'date', 'pn']
    #filterset_fields = ['id', 'subject', 'sentiment_score', 'keywords', 'date', 'pn']