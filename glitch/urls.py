from django.urls import path
from .views import DomeinList, GebruikerList, ServeAdminImage

urlpatterns = [
    path('domeinen/', DomeinList.as_view(), name='domeinen'),
    path('gebruikers/', GebruikerList.as_view(), name='gebruikers'),
    path('static/glitch/img/admin.png', ServeAdminImage.as_view(), name='admin_image'),
]
