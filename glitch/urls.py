from django.urls import path
from .views import DomeinList, GebruikerList, GebruikerDetail, GetCursusjaren, GetCursussen

urlpatterns = [
    path('domeinen/', DomeinList.as_view(), name='domeinen'),
    path('gebruikers/', GebruikerList.as_view(), name='gebruikers'),
    path('gebruikers/<int:pk>/', GebruikerDetail.as_view(), name='gebruiker-detail'),
    path('cursusjaren/<int:domein_id>/', GetCursusjaren.as_view(), name='get_cursusjaren'),
    path('cursusjaren/<int:cursusjaar_id>/cursussen/', GetCursussen.as_view(), name='get_cursussen')
]