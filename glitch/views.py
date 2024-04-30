import json
from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.hashers import make_password
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

User = get_user_model()

class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, email=email, password=password)
        if user is not None:
            return Response({'status': 'success', 'user_type': user.user_type}, status=status.HTTP_200_OK)
        else:
            return Response({'status': 'error', 'message': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
def register(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email', '')
        password = data.get('password', '')

        if not email or not password:
            return JsonResponse({'error': 'Vul alle velden in'}, status=400)

        if User.objects.filter(email=email).exists():
            return JsonResponse({'error': 'Email bestaat al'}, status=400)

        user = User(email=email, password=make_password(password))
        user.save()

        return JsonResponse({'success': 'Gebruiker succesvol geregistreerd'}, status=201)

@csrf_exempt
def register_docent(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email', '')
        password = data.get('password', '')

        if not email or not password:
            return JsonResponse({'error': 'Vul alle velden in'}, status=400)

        if User.objects.filter(email=email).exists():
            return JsonResponse({'error': 'Email bestaat al'}, status=400)

        user = User.objects.create_docent(email=email, password=password)

        return JsonResponse({'success': 'Docent succesvol geregistreerd'}, status=201)