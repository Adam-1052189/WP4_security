from django.db import models

class Gebruiker(models.Model):
    gebruikers_id = models.AutoField(primary_key=True)
    voortgang = models.ForeignKey('Voortgang', on_delete=models.CASCADE, null=True, related_name='gebruikers_voortgang')
    admin_docent_student = models.CharField(max_length=50)
    email = models.EmailField()
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    profielfoto = models.ImageField(null=True, upload_to='profielfotos/')
    bio = models.TextField(null=True)

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
    gebruiker = models.ForeignKey('Gebruiker', on_delete=models.CASCADE, null=True)
    domeinnaam = models.CharField(max_length=100)
    bovenliggend_domein = models.ForeignKey('self', on_delete=models.CASCADE, null=True)

class Activiteit(models.Model):
    activiteit_id = models.AutoField(primary_key=True)
    module = models.ForeignKey('Module', on_delete=models.CASCADE, null=True)
    gebruiker = models.ForeignKey('Gebruiker', on_delete=models.CASCADE, null=True)
    stap = models.IntegerField(null=True)
    taak = models.CharField(max_length=100, null=True)
    module = models.ForeignKey('Module', related_name='activiteiten', on_delete=models.CASCADE)

class Cursus(models.Model):
    vak_cursus_id = models.AutoField(primary_key=True)
    onderwijsperiode = models.ForeignKey('Onderwijsperiode', on_delete=models.CASCADE, null=True)
    domein = models.ForeignKey('Domein', on_delete=models.CASCADE, null=True)
    gebruiker = models.ForeignKey('Gebruiker', on_delete=models.CASCADE, null=True)
    vaknaam = models.CharField(max_length=100)

class Cursusjaar(models.Model):
    cursusjaar_id = models.AutoField(primary_key=True)
    domein = models.ForeignKey('Domein', on_delete=models.CASCADE)
    gebruiker = models.ForeignKey('Gebruiker', on_delete=models.CASCADE, null=True)
    naam = models.CharField(max_length=100)
    cursusjaar = models.CharField(max_length=100)

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
    opdracht_id = models.AutoField(primary_key=True)
    gebruiker = models.ForeignKey('Gebruiker', on_delete=models.CASCADE, null=True)
    opdrachtnaam = models.CharField(max_length=100)
    deadline = models.DateField(null=True)
    score = models.IntegerField(null=True)
    bijlage = models.FileField(upload_to='opdracht_bijlagen/', null=True)

class Challenge(models.Model):
    challenge_id = models.AutoField(primary_key=True)
    activiteit = models.ForeignKey('Activiteit', on_delete=models.CASCADE, null=True)
    gebruiker = models.ForeignKey('Gebruiker', on_delete=models.CASCADE, null=True)
    point_concept_chalenge = models.IntegerField()
    verzamelde_punten = models.IntegerField(null=True)

class Onderwijsperiode(models.Model):
    onderwijsperiode_id = models.AutoField(primary_key=True)
    cursusjaar = models.ForeignKey('Cursusjaar', on_delete=models.CASCADE, null=True)
    domein = models.ForeignKey('Domein', on_delete=models.CASCADE, null=True)
    periode = models.CharField(max_length=100)