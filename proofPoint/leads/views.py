from django.shortcuts import render

# Create your views here.

# turn web request into a web response

from .models import Lead
from .serializers import LeadSerializer
from rest_framework import generics

class LeadListCreate(generics.ListCreateAPIView):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer
