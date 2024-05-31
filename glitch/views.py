import json
from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.hashers import make_password
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import action, api_view
from rest_framework.views import APIView
from rest_framework import status, generics, viewsets
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Domein, Cursus, Activiteit, CoreAssignment, Voortgang, Gebruiker, Cursusjaar
from .serializers import DomeinSerializer, GebruikerSerializer, CursusjaarSerializer, CursusSerializer, ActiviteitSerializer, CoreAssignmentSerializer, VoortgangSerializer
from django.core import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from django.http import FileResponse
from django.views import View
import os


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
            return Response({
                'status': 'success',
                'user_type': user.user_type,
                'user_id': user.id,
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

        user = User(email=email, password=make_password(password), voornaam=voornaam, achternaam=achternaam)
        user.save()

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

    def perform_update(self, serializer):
        instance = serializer.save()
        if instance.afgevinkt:
            instance.complete()


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
