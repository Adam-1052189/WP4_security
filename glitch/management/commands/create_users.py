from django.core.management.base import BaseCommand
from glitch.models import Gebruiker

class Command(BaseCommand):
    help = 'Create initial users'

    def handle(self, *args, **options):
        # Create an admin user
        Gebruiker.objects.create_user(
            email='admin@hr.nl',
            user_type=Gebruiker.ADMIN,
            password='admin'
        )

        # Create a docent user
        Gebruiker.objects.create_user(
            email='docent@hr.nl',
            user_type=Gebruiker.DOCENT,
            password='docent'
        )

        # Create a student user
        Gebruiker.objects.create_user(
            email='student@hr.nl',
            user_type=Gebruiker.STUDENT,
            password='student'
        )