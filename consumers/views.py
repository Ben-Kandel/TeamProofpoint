from django.shortcuts import render
from .models import Consumer
from .serializers import ConsumerSerializer
from rest_framework import generics, filters
from django_filters.rest_framework import DjangoFilterBackend
# not connected uses api instead
# Create your views here.
class ConsumerListCreate(generics.ListCreateAPIView):
    queryset = Consumer.objects.all()
    serializer_class = ConsumerSerializer
    # filter_backends = [DjangoFilterBackend]
    filter_backends = [filters.SearchFilter]
    search_fields = ['id', 'subject', 'sentiment_score', 'keywords', 'date', 'pn']
    #filterset_fields = ['id', 'subject', 'sentiment_score', 'keywords', 'date', 'pn']
