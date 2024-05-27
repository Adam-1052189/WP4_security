from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'activiteiten', views.ActiviteitViewSet)
router.register(r'coreassignments', views.CoreAssignmentViewSet)

urlpatterns = [
    path('login/', views.LoginView.as_view(), name='login'),
    path('register/', views.register, name='register'),
    path('register_docent/', views.register_docent, name='register_docent'),
    path('gebruikers/', views.GebruikerList.as_view(), name='gebruiker_list'),
    path('gebruikers/<int:pk>/', views.GebruikerDetail.as_view(), name='gebruiker_detail'),
    path('cursusjaren/<int:domein_id>/', views.GetCursusjaren.as_view(), name='get_cursusjaren'),
    path('cursussen/<str:cursusjaar>/', views.GetCursussen.as_view(), name='get_cursussen'),
    path('', include(router.urls)),
]