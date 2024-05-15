import os
from django.core.management.base import BaseCommand
from django.core.files import File
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


        profielfoto_student = os.path.join("glitch", "management", "commands", "static", "img", "profiel1.png")

        # Check if the file exists
        if os.path.exists(profielfoto_student):
            # Open the file and save it to the student's profile picture field
            with open(profielfoto_student, 'rb') as f:
                # Use the 'student' object reference to save the profile picture
                student = Gebruiker.objects.get(email='student@hr.nl')  # Opnieuw ophalen van student object om de recent aangemaakte gebruiker te krijgen
                student.profielfoto.save(os.path.basename(profielfoto_student), File(f))

        # Output success message
        self.stdout.write(self.style.SUCCESS('Successfully created users with profile pictures.'))