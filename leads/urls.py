from django.urls import path
# from . import views
#
# urlpatterns = [
#     path('api/lead/', views.LeadListCreate.as_view() ),
# ]

from rest_framework import routers
from .api import LeadViewSet

router = routers.DefaultRouter()
router.register('api/leads', LeadViewSet, 'leads')

urlpatterns = router.urls

