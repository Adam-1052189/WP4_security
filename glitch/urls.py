from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('api/login/', views.LoginView.as_view(), name='login'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api-auth/register-docent/', views.register_docent, name='register_docent'),
    path('domeinen/', views.DomeinList.as_view(), name='domeinen'),
    path('gebruikers/', views.GebruikerList.as_view(), name='gebruikers'),
    path('gebruikers/<int:pk>/', views.GebruikerDetail.as_view(), name='gebruiker-detail'),
    path('cursusjaren/<int:domein_id>/', views.GetCursusjaren.as_view(), name='get_cursusjaren'),
    path('cursusjaren/<str:cursusjaar>/cursussen/', views.GetCursussen.as_view(), name='get_cursussen'),
]