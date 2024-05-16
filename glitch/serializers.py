from rest_framework import serializers
from .models import Domein, Gebruiker, Cursusjaar

class CursusjaarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cursusjaar
        fields = '__all__'


class DomeinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Domein
        fields = ['domeinnaam']

class GebruikerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gebruiker
        fields = ['voornaam', 'achternaam']