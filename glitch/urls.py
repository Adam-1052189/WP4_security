from django.urls import path
from .views import DomeinList

urlpatterns = [
    path('domeinen/', DomeinList.as_view(), name='domeinen'),
]
