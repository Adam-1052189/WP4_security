import json
from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.hashers import make_password
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, generics
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Domein, Cursus
from .serializers import DomeinSerializer, GebruikerSerializer, CursusjaarSerializer, CursusSerializer
from django.views import View
from django.core import serializers
from .models import Gebruiker, Cursusjaar


User = get_user_model()

class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, email=email, password=password)
        if user is not None:
            return Response({'status': 'success', 'user_type': user.user_type, 'user_id': user.id}, status=status.HTTP_200_OK)
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