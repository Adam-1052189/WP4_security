from rest_framework import serializers
from .models import Domein, Gebruiker, Cursusjaar, Cursus

class DomeinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Domein
        fields = ['id', 'naam', 'gebruikers']

class CursusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cursus
        fields = ['id', 'naam', 'gebruikers']

class CursusjaarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cursusjaar
        fields = ['id', 'jaar', 'gebruikers']

class GebruikerSerializer(serializers.ModelSerializer):
    domeinen = DomeinSerializer(many=True, read_only=True)
    cursussen = CursusSerializer(many=True, read_only=True)
    cursusjaren = CursusjaarSerializer(many=True, read_only=True)

    class Meta:
        model = Gebruiker
        fields = ['id', 'naam', 'domeinen', 'cursussen', 'cursusjaren']