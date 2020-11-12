from rest_framework import routers
from .api import PricesViewSet

router = routers.DefaultRouter()
router.register('api/prices', PricesViewSet, 'prices')

urlpatterns = router.urls
