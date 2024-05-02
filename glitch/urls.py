from django.urls import path
from .views import DomeinList, GebruikerList, GebruikerDetail

urlpatterns = [
    path('domeinen/', DomeinList.as_view(), name='domeinen'),
    path('gebruikers/', GebruikerList.as_view(), name='gebruikers'),
    path('gebruikers/<int:pk>/', GebruikerDetail.as_view(), name='gebruiker-detail'),
]
