from django.urls import path
from .views import DomeinList, GebruikerList, ServeAdminImage
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

router = DefaultRouter()
router.register(r'activiteiten', views.ActiviteitViewSet)
router.register(r'coreassignments', views.CoreAssignmentViewSet)

urlpatterns = [
    path('domeinen/', DomeinList.as_view(), name='domeinen'),
    path('gebruikers/', GebruikerList.as_view(), name='gebruikers'),
    path('static/glitch/img/admin.png', ServeAdminImage.as_view(), name='admin_image'),
    path('api/login/', views.LoginView.as_view(), name='login'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api-auth/register-docent/', views.register_docent, name='register_docent'),
    path('domeinen/', views.DomeinList.as_view(), name='domeinen'),
    path('gebruikers/', views.GebruikerList.as_view(), name='gebruikers'),
    path('gebruikers/<int:pk>/', views.GebruikerDetail.as_view(), name='gebruiker-detail'),
    path('cursusjaren/<int:domein_id>/', views.GetCursusjaren.as_view(), name='get_cursusjaren'),
    path('cursusjaren/<str:cursusjaar>/cursussen/', views.GetCursussen.as_view(), name='get_cursussen'),
    path('', include(router.urls)),
    path('gebruiker/<int:pk>/', views.GebruikerUpdate.as_view(), name='gebruiker-update'),
]