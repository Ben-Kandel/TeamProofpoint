"""base URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include


# url patterns
# leads -> election data api
# transfer -> transferData.py functions
# stocks -> stocks data api
# consumers -> consumer sentiment data api (scrapped in development)
# prices -> stocks historical data
# predictions -> stores data from our prediction models

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('leads.urls')),
    path('transfer/', include('transfer.urls')),
    path('', include('stocks.urls')),
    path('', include('consumers.urls')),
    path('', include('prices.urls')),
    path('', include('predictions.urls'))

]
