from django.shortcuts import render
from .models import Stocks
from .serializers import StocksSerializer
from rest_framework import generics, filters
from django_filters.rest_framework import DjangoFilterBackend


# Create your views here.
class StockListCreate(generics.ListCreateAPIView):
    # control view for api (necessary but never seen)
    queryset = Stocks.objects.all()
    serializer_class = StocksSerializer
    # settings for search filters
    filter_backends = [filters.SearchFilter]
    search_fields = ['id', 'subject', 'sentiment_score', 'keywords', 'date', 'pn']
