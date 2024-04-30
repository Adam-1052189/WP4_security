from rest_framework import serializers
from .models import Domein

class DomeinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Domein
        fields = ['domeinnaam']