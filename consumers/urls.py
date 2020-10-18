from rest_framework import routers
from .api import ConsumerViewSet

router = routers.DefaultRouter()
router.register('api/consumers', ConsumerViewSet, 'consumers')

urlpatterns = router.urls