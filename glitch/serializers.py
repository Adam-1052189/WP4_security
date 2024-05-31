from rest_framework import serializers
from .models import Domein, Gebruiker, Cursusjaar, Cursus, Activiteit, CoreAssignment, Voortgang


class ActiviteitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Activiteit
        fields = '__all__'


class CoreAssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoreAssignment
        fields = '__all__'


class CursusjaarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cursusjaar
        fields = '__all__'


class DomeinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Domein
        fields = ['domein_id', 'domeinnaam']


class GebruikerSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Gebruiker
        fields = ['voornaam', 'achternaam', 'email', 'password', 'xp', 'bio']


class CursusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cursus
        fields = '__all__'


class VoortgangSerializer(serializers.ModelSerializer):
    class Meta:
        model = Voortgang
        fields = '__all__'
