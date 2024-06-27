from django.urls import path
from .views import DomeinList, GebruikerList, ServeAdminImage, check_completion
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from . import views
from django.conf import settings
from django.conf.urls.static import static

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
    path('check_completion/<int:gebruiker_id>/<int:core_assignment_id>/', check_completion, name='check_completion'),
    path('', include(router.urls)),
    path('gebruiker/<int:pk>/', views.GebruikerUpdate.as_view(), name='gebruiker-update'),
    path('update-activiteit-status/<int:pk>/', views.update_activiteit_status, name='update-activiteit-status'),
    path('docent_voortgang/<int:docent_id>/',views.docent_voortgang, name='docent-voortgang'),
    path('cursussen/<str:cursusnaam>/activiteiten/', views.ActiviteitenView.as_view(), name='activiteiten'),
    path('cursussen/<str:cursusnaam>/coreassignment/', views.GetCoreAssignment.as_view(), name='core_assignment'),
    path('activiteiten/', views.GetAllActiviteiten.as_view(), name='get_all_activiteiten'),
    path('activiteiten/<int:pk>/submit/', views.SubmitActiviteitView.as_view(), name='submit-activiteit'),
    path('coreassignments/<int:pk>/submit/', views.SubmitCoreAssignmentView.as_view(), name='submit-coreassignment'),
    path('activiteiten/<int:pk>/', views.ActiviteitUpdate.as_view(), name='activiteit-update'),
    path('gebruikers/<int:gebruiker_id>/activities/', views.StudentActivities.as_view(), name='get_student_activiteiten'),
    path('activiteiten/<int:pk>/update/', views.ActiviteitUpdate.as_view(), name='activiteit-update'),
    path('update-coreassignment-status/<int:pk>/', views.update_coreassignment_status, name='update-coreassignment-status'),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)