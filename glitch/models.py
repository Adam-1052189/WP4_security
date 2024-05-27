from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models

class CustomUserManager(BaseUserManager):
    def create_user(self, email, user_type, password=None, voornaam=None, achternaam=None):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, user_type=user_type, voornaam=voornaam, achternaam=achternaam)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, user_type, password):
        user = self.create_user(email, user_type, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

    def create_docent(self, email, password, voornaam=None, achternaam=None):
        user = self.create_user(email, 'DOCENT', password, voornaam, achternaam)
        user.is_staff = True
        user.save(using=self._db)
        return user

class Gebruiker(AbstractBaseUser, PermissionsMixin):
    ADMIN = 'ADMIN'
    DOCENT = 'DOCENT'
    STUDENT = 'STUDENT'
    USER_TYPES = [
        (ADMIN, 'Admin'),
        (DOCENT, 'Docent'),
        (STUDENT, 'Student'),
    ]

    voornaam = models.CharField(max_length=32)
    achternaam = models.CharField(max_length=32)
    email = models.EmailField(unique=True)
    user_type = models.CharField(max_length=7, choices=USER_TYPES, default=STUDENT)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    cursussen = models.ManyToManyField('Cursus', through='Deelname')
    voortgang = models.ForeignKey('Voortgang', on_delete=models.CASCADE, null=True, related_name='gebruikers_voortgang')
    xp = models.IntegerField(default=0)
    profielfoto = models.ImageField(null=True, upload_to='profielfotos/')
    bio = models.TextField(null=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['user_type']

    def __str__(self):
        return self.email

    def update_xp(self, xp_to_add):
        self.xp += xp_to_add
        self.save()

class Notificatie(models.Model):
    notificatie_id = models.AutoField(primary_key=True)
    gebruiker = models.ForeignKey('Gebruiker', on_delete=models.CASCADE, null=True)
    score = models.IntegerField(null=True)
    beschrijving = models.TextField(null=True)

class Voortgang(models.Model):
    voortgang_id = models.AutoField(primary_key=True)
    cursus = models.ForeignKey('Cursus', on_delete=models.CASCADE, null=True)
    gebruiker = models.ForeignKey('Gebruiker', on_delete=models.CASCADE, null=True, related_name='voortgang_gebruikers')
    totale_score = models.IntegerField(null=True)

class Domein(models.Model):
    domein_id = models.AutoField(primary_key=True)
    domeinnaam = models.CharField(max_length=100)
    bovenliggend_domein = models.ForeignKey('self', on_delete=models.CASCADE, null=True)

class Activiteit(models.Model):
    NIVEAUS = [
        (1, 'Niveau 1'),
        (2, 'Niveau 2'),
        (3, 'Niveau 3'),
        (4, 'Niveau 4'),
    ]
    activiteit_id = models.AutoField(primary_key=True)
    module = models.ForeignKey('Module', on_delete=models.SET_NULL, null=True)
    gebruiker = models.ForeignKey('Gebruiker', on_delete=models.CASCADE, null=True)
    stap = models.IntegerField(null=True)
    taak = models.CharField(max_length=100, null=True)
    module = models.ForeignKey('Module', related_name='activiteiten', on_delete=models.CASCADE)
    niveau = models.IntegerField(choices=NIVEAUS, default=1)
    afgevinkt = models.BooleanField(default=False)
    core_assignment = models.ForeignKey('CoreAssignment', related_name='activiteiten', on_delete=models.CASCADE, null=True)

    def complete(self):
        self.afgevinkt = True
        self.save()
        xp_to_add = self.niveau
        self.gebruiker.update_xp(xp_to_add)

class Cursus(models.Model):
    vak_cursus_id = models.AutoField(primary_key=True)
    domein = models.ForeignKey('Domein', on_delete=models.CASCADE, null=True)
    vaknaam = models.CharField(max_length=100)

class Cursusjaar(models.Model):
    cursusjaar_id = models.AutoField(primary_key=True)
    domein = models.ForeignKey('Domein', on_delete=models.CASCADE)
    cursusjaar = models.CharField(max_length=100)
    cursussen = models.ManyToManyField('Cursus', through='CursusjaarCursus')

class Module(models.Model):
    module_id = models.AutoField(primary_key=True)
    cursus = models.ForeignKey('Cursus', on_delete=models.CASCADE, null=True)
    voortgang = models.ForeignKey('Voortgang', on_delete=models.CASCADE)
    opdracht = models.ForeignKey('CoreAssignment', on_delete=models.CASCADE)
    chalenge = models.ForeignKey('Challenge', on_delete=models.CASCADE)
    activiteit = models.ForeignKey('Activiteit', on_delete=models.CASCADE)
    gebruiker = models.ForeignKey('Gebruiker', on_delete=models.CASCADE, null=True)
    modulenaam = models.CharField(max_length=100)
    beschrijving = models.TextField()
    activiteit = models.ForeignKey(Activiteit, related_name='modules', on_delete=models.CASCADE)

class CoreAssignment(models.Model):
    id = models.AutoField(primary_key=True)
    gebruiker = models.ForeignKey('Gebruiker', on_delete=models.CASCADE, null=True)
    opdrachtnaam = models.CharField(max_length=100)
    deadline = models.DateField(null=True)
    score = models.IntegerField(null=True)
    bijlage = models.FileField(upload_to='opdracht_bijlagen/', null=True)
    point_challenge = models.IntegerField(default=0)
    context_challenge = models.TextField(null=True)
    afgevinkt = models.BooleanField(default=False)

    def check_completion(self):
        all_tasks_completed = all(task.afgevinkt for task in self.activiteiten.all())
        if all_tasks_completed:
            self.afgevinkt = True
            self.save()

    def check_point_challenge(self):
        total_points = sum(task.niveau for task in self.activiteiten.all())
        if total_points >= self.point_challenge:
            self.gebruiker.update_xp(self.point_challenge)
            return True

    def check_context_challenge(self):
        if self.context_challenge:
            return True

class Challenge(models.Model):
    challenge_id = models.AutoField(primary_key=True)
    activiteit = models.ForeignKey('Activiteit', on_delete=models.CASCADE, null=True)
    gebruiker = models.ForeignKey('Gebruiker', on_delete=models.CASCADE, null=True)
    point_concept_challenge = models.IntegerField()
    verzamelde_punten = models.IntegerField(null=True)

class Deelname(models.Model):
    gebruiker = models.ForeignKey(Gebruiker, on_delete=models.CASCADE)
    cursus = models.ForeignKey(Cursus, on_delete=models.CASCADE)


class CursusjaarCursus(models.Model):
    cursusjaar = models.ForeignKey(Cursusjaar, on_delete=models.CASCADE)
    cursus = models.ForeignKey(Cursus, on_delete=models.CASCADE)