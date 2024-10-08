import json
from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.hashers import make_password
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import action, api_view
from rest_framework.views import APIView
from rest_framework import status, generics, viewsets, permissions
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import (Domein, Cursus, Activiteit, CoreAssignment, Voortgang, Gebruiker, Cursusjaar,
                     GebruikerCoreAssignment, GebruikerActiviteit, Notificatie)
from .serializers import (DomeinSerializer, GebruikerSerializer, CursusjaarSerializer, CursusSerializer,
                          ActiviteitSerializer, CoreAssignmentSerializer, VoortgangSerializer,
                          GebruikerActiviteitSerializer, NotificatieSerializer)
from django.core import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from django.http import FileResponse, JsonResponse
from django.views import View
from django.conf import settings
import os
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework.parsers import MultiPartParser, FormParser
import base64
from django.core.files.base import ContentFile
from django.utils import timezone


User = get_user_model()


@api_view(['GET'])
def docent_voortgang(request, docent_id):
    core_assignments = CoreAssignment.objects.filter(gebruiker__id=docent_id)
    voortgangen = Voortgang.objects.filter(gebruiker__id=docent_id)

    core_assignments_serializer = CoreAssignmentSerializer(core_assignments, many=True)
    voortgang_serializer = VoortgangSerializer(voortgangen, many=True)

    return Response({
        'core_assignments': core_assignments_serializer.data,
        'voortgangen': voortgang_serializer.data
    })

def check_completion(request, gebruiker_id, core_assignment_id):
    gebruiker = get_object_or_404(Gebruiker, pk=gebruiker_id)
    core_assignment = get_object_or_404(CoreAssignment, pk=core_assignment_id)
    voortgang = get_object_or_404(Voortgang, gebruiker=gebruiker, core_assignment=core_assignment)

    all_tasks_completed = all(task.afgevinkt for task in voortgang.activiteiten.all())
    if all_tasks_completed:
        voortgang.afgevinkt = True
        voortgang.save()
    return JsonResponse({'status': 'Opdracht gecontroleerd'}, status=status.HTTP_200_OK)


class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, email=email, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            profielfoto_url = request.build_absolute_uri(user.profielfoto.url) if user.profielfoto else None
            return Response({
                'status': 'success',
                'user_type': user.user_type,
                'user_id': user.id,
                'profielfoto': profielfoto_url,
                'access': str(refresh.access_token),
                'refresh': str(refresh),
            }, status=status.HTTP_200_OK)
        else:
            return Response({'status': 'error', 'message': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
def register(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email', '')
        password = data.get('password', '')
        voornaam = data.get('voornaam', '')
        achternaam = data.get('achternaam', '')

        if not email or not password or not voornaam or not achternaam:
            return JsonResponse({'error': 'Vul alle velden in'}, status=400)

        if User.objects.filter(email=email).exists():
            return JsonResponse({'error': 'Email bestaat al'}, status=400)

        user = Gebruiker.objects.create_user(
            email=email,
            password=password,
            voornaam=voornaam,
            achternaam=achternaam,
            user_type=Gebruiker.STUDENT
        )

        # Koppel de gebruiker aan alle bestaande activiteiten
        activiteiten = Activiteit.objects.all()
        for activiteit in activiteiten:
            GebruikerActiviteit.objects.create(
                gebruiker=user,
                activiteit=activiteit,
                niveau=0,
                status='OPEN'
            )

        # Koppel de gebruiker aan alle bestaande core assignments
        core_assignments = CoreAssignment.objects.all()
        for core_assignment in core_assignments:
            GebruikerCoreAssignment.objects.create(
                gebruiker=user,
                core_assignment=core_assignment,
                status='OPEN'
            )

        return JsonResponse({'success': 'Gebruiker succesvol geregistreerd'}, status=201)


class DomeinList(generics.ListAPIView):
    queryset = Domein.objects.all()
    serializer_class = DomeinSerializer


@csrf_exempt
def register_docent(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email', '')
        password = data.get('password', '')
        voornaam = data.get('voornaam', '')
        achternaam = data.get('achternaam', '')

        if not email or not password or not voornaam or not achternaam:
            return JsonResponse({'error': 'Vul alle velden in'}, status=400)

        if User.objects.filter(email=email).exists():
            return JsonResponse({'error': 'Email bestaat al'}, status=400)

        user = User.objects.create_docent(email=email, password=password, voornaam=voornaam, achternaam=achternaam)

        return JsonResponse({'success': 'Docent succesvol geregistreerd'}, status=201)


class ServeAdminImage(View):
    def get(self, request):
        image_path = os.path.join(settings.STATIC_ROOT, 'glitch/img/admin.png')
        try:
            with open(image_path, 'rb') as f:
                image_data = f.read()
            return FileResponse(image_data, content_type='image/png')
        except FileNotFoundError:
            return JsonResponse({'error': 'Image not found'}, status=404)


class GebruikerList(View):
    def get(self, request):
        gebruikers = Gebruiker.objects.all()
        data = serializers.serialize('json', gebruikers)
        return JsonResponse(data, safe=False)


class GebruikerDetail(generics.RetrieveAPIView):
    queryset = Gebruiker.objects.all()
    serializer_class = GebruikerSerializer


class GetCursusjaren(APIView):
    def get(self, request, domein_id):
        cursusjaren = Cursusjaar.objects.filter(domein__domein_id=domein_id)
        serializer = CursusjaarSerializer(cursusjaren, many=True)
        return Response(serializer.data)


class GetCursussen(APIView):
    def get(self, request, cursusjaar, format=None):
        cursussen = Cursus.objects.filter(cursusjaarcursus__cursusjaar__cursusjaar=cursusjaar)
        serializer = CursusSerializer(cursussen, many=True)
        return Response(serializer.data)


class ActiviteitViewSet(viewsets.ModelViewSet):
    queryset = Activiteit.objects.all()
    serializer_class = ActiviteitSerializer

    @action(detail=True, methods=['post'])
    def complete(self, request, pk=None):
        activiteit = self.get_object()
        activiteit.complete()
        return Response({'status': 'Taak voltooid'}, status=status.HTTP_200_OK)

class CoreAssignmentViewSet(viewsets.ModelViewSet):
    queryset = CoreAssignment.objects.all()
    serializer_class = CoreAssignmentSerializer

    @action(detail=True, methods=['get'])
    def check_completion(self, request, pk=None):
        core_assignment = self.get_object()
        core_assignment.check_completion()
        core_assignment.check_point_challenge()
        core_assignment.check_context_challenge()
        return Response({'status': 'Opdracht gecontroleerd'}, status=status.HTTP_200_OK)

    def perform_update(self, serializer):
        instance = serializer.save()
        if instance.afgevinkt:
            instance.check_completion()
            instance.check_point_challenge()
            instance.check_context_challenge()


class GebruikerUpdate(generics.RetrieveUpdateAPIView):
    queryset = Gebruiker.objects.all()
    serializer_class = GebruikerSerializer

    def update(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            if 'password' in serializer.validated_data:
                serializer.validated_data['password'] = make_password(serializer.validated_data['password'])
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ActiviteitenView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, cursusnaam):
        try:
            gebruiker = request.user
            gebruiker_activiteiten = GebruikerActiviteit.objects.filter(
                gebruiker=gebruiker,
                activiteit__cursus__vaknaam=cursusnaam
            ).select_related('activiteit')

            activiteiten_data = [{
                'pk': ga.pk,
                'activiteit_id': ga.activiteit.activiteit_id,
                'taak': ga.activiteit.taak,
                'status': ga.status,
                'niveau': ga.niveau,
                'submission_text': ga.submission_text,
                'deadline': ga.activiteit.deadline.strftime('%d-%m-%Y') if ga.activiteit.deadline else None
            } for ga in gebruiker_activiteiten]

            data = {"activiteiten": activiteiten_data}
            print(f"Data: {data}")
            return JsonResponse(data)
        except Exception as e:
            print(f"Error: {str(e)}")
            return JsonResponse({'error': str(e)}, status=500)


class GetCoreAssignment(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, cursusnaam, format=None):
        try:
            gebruiker = request.user
            core_assignment = CoreAssignment.get_by_cursusnaam(cursusnaam)
            if core_assignment is not None:
                gebruiker_core_assignment = GebruikerCoreAssignment.objects.filter(
                    gebruiker=gebruiker,
                    core_assignment=core_assignment
                ).first()

                if gebruiker_core_assignment:
                    data = {
                        'id': gebruiker_core_assignment.core_assignment.id,
                        'opdrachtnaam': gebruiker_core_assignment.core_assignment.opdrachtnaam,
                        'status': gebruiker_core_assignment.status,
                        'submission_text': gebruiker_core_assignment.submission_text,
                        'deadline': gebruiker_core_assignment.core_assignment.deadline.strftime('%d-%m-%Y') if gebruiker_core_assignment.core_assignment.deadline else None
                    }
                    return Response(data)
                else:
                    return Response({'error': 'No core assignment found for this user'}, status=status.HTTP_404_NOT_FOUND)
            else:
                return Response({'error': 'No core assignment found for this cursusnaam'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class NotificationView(APIView):
    def get(self, request, gebruiker_id, format=None):
        print(f"Fetching notifications for user: {gebruiker_id}")
        notificaties = Notificatie.objects.filter(gebruiker_id=gebruiker_id).order_by('-created_at')
        print(f"Notifications found: {notificaties}")
        serializer = NotificatieSerializer(notificaties, many=True)
        return Response(serializer.data)

@api_view(['POST'])
def mark_notifications_as_read(request, gebruiker_id):
    try:
        notifications = Notificatie.objects.filter(gebruiker__id=gebruiker_id, read=False)
        notifications.update(read=True)
        notifications.delete()
        return Response({'status': 'Notifications marked as read and cleared'}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'status': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['DELETE'])
def delete_notification(request, notificatie_id):
    try:
        notification = Notificatie.objects.get(pk=notificatie_id)
        notification.delete()
        return Response({'status': 'Notification deleted'}, status=status.HTTP_200_OK)
    except Notificatie.DoesNotExist:
        return Response({'status': 'Not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'status': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@api_view(['POST'])
def update_activiteit_status(request, pk):
    try:
        gebruiker_activiteit = GebruikerActiviteit.objects.get(pk=pk)
        new_status = request.data.get('status')
        new_niveau = request.data.get('niveau')

        if new_status not in ['GOEDGEKEURD', 'AFGEKEURD', 'AFWACHTING']:
            return Response({'status': 'Invalid status'}, status=status.HTTP_400_BAD_REQUEST)

        gebruiker_activiteit.status = new_status

        if new_niveau is not None:
            gebruiker_activiteit.niveau = new_niveau

        gebruiker_activiteit.save()

        # Create a notification
        Notificatie.objects.create(
            gebruiker=gebruiker_activiteit.gebruiker,
            beschrijving=f'De status van je activiteit "{gebruiker_activiteit.activiteit.taak}" is veranderd naar {new_status}.'
        )

        return Response({'status': 'Status updated'}, status=status.HTTP_200_OK)
    except GebruikerActiviteit.DoesNotExist:
        return Response({'status': 'Not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'status': 'Internal Server Error', 'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def update_coreassignment_status(request, pk):
    try:
        gebruiker_core_assignment = GebruikerCoreAssignment.objects.get(pk=pk)
        new_status = request.data.get('status')
        new_submission_text = request.data.get('submission_text')

        if new_status in ['GOEDGEKEURD', 'AFGEKEURD', 'AFWACHTING']:
            gebruiker_core_assignment.status = new_status

        if new_submission_text is not None:
            gebruiker_core_assignment.submission_text = new_submission_text

        gebruiker_core_assignment.save()

        # Create a notification
        Notificatie.objects.create(
            gebruiker=gebruiker_core_assignment.gebruiker,
            beschrijving=f'De status van je kernopdracht "{gebruiker_core_assignment.core_assignment.opdrachtnaam}" is veranderd naar {new_status}.'
        )

        return Response({'status': 'Status updated'}, status=status.HTTP_200_OK)
    except GebruikerCoreAssignment.DoesNotExist:
        return Response({'status': 'Not found'}, status=status.HTTP_404_NOT_FOUND)



class GetAllActiviteiten(APIView):
    def get(self, request, format=None):
        activiteiten = Activiteit.objects.all()
        serializer = ActiviteitSerializer(activiteiten, many=True)
        return Response(serializer.data)


class SubmitActiviteitView(APIView):
    def post(self, request, pk, format=None):
        try:
            gebruiker_activiteit = GebruikerActiviteit.objects.get(pk=pk)
            submission_text = request.data.get('submission_text')
            if submission_text:
                gebruiker_activiteit.submission_text = submission_text
                gebruiker_activiteit.status = 'AFWACHTING'
                gebruiker_activiteit.save()
                return Response({'status': 'Submission received'}, status=status.HTTP_200_OK)
            else:
                return Response({'status': 'Invalid submission'}, status=status.HTTP_400_BAD_REQUEST)
        except GebruikerActiviteit.DoesNotExist:
            return Response({'status': 'Not found'}, status=status.HTTP_404_NOT_FOUND)


class SubmitCoreAssignmentView(APIView):
    def post(self, request, pk, format=None):
        try:
            gebruiker_core_assignment = GebruikerCoreAssignment.objects.get(pk=pk)
            submission_text = request.data.get('submission_text')
            if submission_text:
                gebruiker_core_assignment.submission_text = submission_text
                gebruiker_core_assignment.status = 'AFWACHTING'
                gebruiker_core_assignment.save()
                return Response({'status': 'Submission received'}, status=status.HTTP_200_OK)
            else:
                return Response({'status': 'Invalid submission'}, status=status.HTTP_400_BAD_REQUEST)
        except GebruikerCoreAssignment.DoesNotExist:
            return Response({'status': 'Not found'}, status=status.HTTP_404_NOT_FOUND)


class ActiviteitUpdate(generics.UpdateAPIView):
    queryset = Activiteit.objects.all()
    serializer_class = ActiviteitSerializer


class StudentActivities(APIView):
    def get(self, request, gebruiker_id, format=None):
        gebruiker_activiteiten = GebruikerActiviteit.objects.filter(gebruiker__id=gebruiker_id).select_related('activiteit')
        activities = [{
            'id': ga.activiteit.activiteit_id,
            'taak': ga.activiteit.taak,
            'niveau': ga.niveau,
            'status': ga.status,
            'deadline': ga.activiteit.deadline
        } for ga in gebruiker_activiteiten]

        gebruiker_core_assignments = GebruikerCoreAssignment.objects.filter(gebruiker__id=gebruiker_id).select_related('core_assignment')
        core_assignments = [{
            'id': gca.core_assignment.id,
            'opdrachtnaam': gca.core_assignment.opdrachtnaam,
            'deadline': gca.core_assignment.deadline,
            'point_challenge': gca.core_assignment.point_challenge,
            'concept_challenge': gca.core_assignment.concept_challenge,
            'status': gca.status,
            'submission_text': gca.submission_text
        } for gca in gebruiker_core_assignments]

        return Response({
            'activiteiten': activities,
            'core_assignments': core_assignments
        })


class ProfielfotoUploadView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk, format=None):
        try:
            gebruiker = Gebruiker.objects.get(pk=pk)
            profielfoto_data = request.data.get('profielfoto')

            if profielfoto_data:
                format, imgstr = profielfoto_data.split(';base64,')
                ext = format.split('/')[-1]
                gebruiker.profielfoto = ContentFile(base64.b64decode(imgstr), name=f'profielfoto.{ext}')

            gebruiker.save()
            serializer = GebruikerSerializer(gebruiker)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Gebruiker.DoesNotExist:
            return Response({"error": "Gebruiker niet gevonden"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

