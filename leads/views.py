from django.shortcuts import render
from .models import Lead
from .serializers import LeadSerializer
from rest_framework import generics, filters
from django_filters.rest_framework import DjangoFilterBackend

# Create your views here.
class LeadListCreate(generics.ListCreateAPIView):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer
    # filter_backends = [DjangoFilterBackend]
    filter_backends = [filters.SearchFilter]
    search_fields = ['id', 'subject', 'sentiment_score', 'keywords', 'date', 'pn', 'url', 'attachment']
    #filterset_fields = ['id', 'subject', 'sentiment_score', 'keywords', 'date', 'pn']

