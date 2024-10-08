from rest_framework import serializers
from .models import Domein, Gebruiker, Cursusjaar, Cursus, Activiteit, CoreAssignment, Voortgang, GebruikerActiviteit, \
    GebruikerCoreAssignment, Notificatie


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
    password = serializers.CharField(write_only=True, required=False)
    profielfoto = serializers.ImageField(required=False)

    class Meta:
        model = Gebruiker
        fields = '__all__'


class CursusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cursus
        fields = '__all__'


class VoortgangSerializer(serializers.ModelSerializer):
    class Meta:
        model = Voortgang
        fields = '__all__'


class GebruikerActiviteitSerializer(serializers.ModelSerializer):
    class Meta:
        model = GebruikerActiviteit
        fields = '__all__'


class GebruikerCoreAssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = GebruikerCoreAssignment
        fields = '__all__'

class NotificatieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notificatie
        fields = '__all__'
