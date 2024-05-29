import os
from django.core.management.base import BaseCommand
from django.core.files import File
from glitch.models import Gebruiker

class Command(BaseCommand):
    help = 'Create initial users'

    def handle(self, *args, **options):
        # Create an admin user and save the profile picture
        admin = Gebruiker.objects.create_user(
            email='admin@hr.nl',
            user_type=Gebruiker.ADMIN,
            password='admin'
        )
        admin_profile_pic = os.path.join("glitch","migrations", "admin.png")
        self._save_profile_pic(admin, admin_profile_pic)

        # Create a docent user and save the profile picture
        docent = Gebruiker.objects.create_user(
            email='docent@hr.nl',
            user_type=Gebruiker.DOCENT,
            password='docent'
        )
        docent_profile_pic = os.path.join("glitch","migrations", "docent.png")
        self._save_profile_pic(docent, docent_profile_pic)

        # Create a student user and save the profile picture
        student = Gebruiker.objects.create_user(
            email='student@hr.nl',
            user_type=Gebruiker.STUDENT,
            password='student'
        )
        student_profile_pic = os.path.join("glitch","migrations", "student.png")
        self._save_profile_pic(student, student_profile_pic)

        # Output success message
        self.stdout.write(self.style.SUCCESS('Successfully created users with profile pictures.'))

    def _save_profile_pic(self, user, profile_pic_path):
        # Check if the file exists
        if os.path.exists(profile_pic_path):
            with open(profile_pic_path, 'rb') as f:
                user.profielfoto.save(os.path.basename(profile_pic_path), File(f))