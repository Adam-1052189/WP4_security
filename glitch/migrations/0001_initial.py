# Generated by Django 5.0.4 on 2024-05-31 17:16

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("auth", "0012_alter_user_first_name_max_length"),
    ]

    operations = [
        migrations.CreateModel(
            name="CoreAssignment",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("opdrachtnaam", models.CharField(max_length=100)),
                ("deadline", models.DateField(null=True)),
                ("point_challenge", models.IntegerField(default=0)),
                ("context_challenge", models.TextField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name="Cursus",
            fields=[
                ("vak_cursus_id", models.AutoField(primary_key=True, serialize=False)),
                ("vaknaam", models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name="Cursusjaar",
            fields=[
                ("cursusjaar_id", models.AutoField(primary_key=True, serialize=False)),
                ("cursusjaar", models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name="Domein",
            fields=[
                ("domein_id", models.AutoField(primary_key=True, serialize=False)),
                ("domeinnaam", models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name="Gebruiker",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("password", models.CharField(max_length=128, verbose_name="password")),
                (
                    "last_login",
                    models.DateTimeField(
                        blank=True, null=True, verbose_name="last login"
                    ),
                ),
                (
                    "is_superuser",
                    models.BooleanField(
                        default=False,
                        help_text="Designates that this user has all permissions without explicitly assigning them.",
                        verbose_name="superuser status",
                    ),
                ),
                ("voornaam", models.CharField(max_length=32)),
                ("achternaam", models.CharField(max_length=32)),
                ("email", models.EmailField(max_length=254, unique=True)),
                (
                    "user_type",
                    models.CharField(
                        choices=[
                            ("ADMIN", "Admin"),
                            ("DOCENT", "Docent"),
                            ("STUDENT", "Student"),
                        ],
                        default="STUDENT",
                        max_length=7,
                    ),
                ),
                ("is_active", models.BooleanField(default=True)),
                ("is_staff", models.BooleanField(default=False)),
                ("xp", models.IntegerField(default=0)),
                (
                    "profielfoto",
                    models.ImageField(null=True, upload_to="static/glitch/img/"),
                ),
                ("bio", models.TextField(null=True)),
                (
                    "groups",
                    models.ManyToManyField(
                        blank=True,
                        help_text="The groups this user belongs to. A user will get all permissions granted to each of their groups.",
                        related_name="user_set",
                        related_query_name="user",
                        to="auth.group",
                        verbose_name="groups",
                    ),
                ),
                (
                    "user_permissions",
                    models.ManyToManyField(
                        blank=True,
                        help_text="Specific permissions for this user.",
                        related_name="user_set",
                        related_query_name="user",
                        to="auth.permission",
                        verbose_name="user permissions",
                    ),
                ),
            ],
            options={
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="Activiteit",
            fields=[
                ("activiteit_id", models.AutoField(primary_key=True, serialize=False)),
                ("taak", models.CharField(max_length=100, null=True)),
                (
                    "niveau",
                    models.IntegerField(
                        choices=[
                            (1, "Niveau 1"),
                            (2, "Niveau 2"),
                            (3, "Niveau 3"),
                            (4, "Niveau 4"),
                        ],
                        default=0,
                    ),
                ),
                ("afgevinkt", models.BooleanField(default=False)),
                (
                    "gebruiker",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "core_assignment",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="activiteiten",
                        to="glitch.coreassignment",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Challenge",
            fields=[
                ("challenge_id", models.AutoField(primary_key=True, serialize=False)),
                ("point_concept_challenge", models.IntegerField()),
                ("verzamelde_punten", models.IntegerField(null=True)),
                (
                    "activiteit",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        to="glitch.activiteit",
                    ),
                ),
                (
                    "gebruiker",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="CursusjaarCursus",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "cursus",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="glitch.cursus"
                    ),
                ),
                (
                    "cursusjaar",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="glitch.cursusjaar",
                    ),
                ),
            ],
        ),
        migrations.AddField(
            model_name="cursusjaar",
            name="cursussen",
            field=models.ManyToManyField(
                through="glitch.CursusjaarCursus", to="glitch.cursus"
            ),
        ),
        migrations.CreateModel(
            name="Deelname",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "cursus",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="glitch.cursus"
                    ),
                ),
                (
                    "gebruiker",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.AddField(
            model_name="gebruiker",
            name="cursussen",
            field=models.ManyToManyField(through="glitch.Deelname", to="glitch.cursus"),
        ),
        migrations.AddField(
            model_name="cursusjaar",
            name="domein",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="glitch.domein"
            ),
        ),
        migrations.CreateModel(
            name="Notificatie",
            fields=[
                ("notificatie_id", models.AutoField(primary_key=True, serialize=False)),
                ("score", models.IntegerField(null=True)),
                ("beschrijving", models.TextField(null=True)),
                (
                    "gebruiker",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Voortgang",
            fields=[
                ("voortgang_id", models.AutoField(primary_key=True, serialize=False)),
                ("score", models.IntegerField(null=True)),
                (
                    "bijlage",
                    models.FileField(null=True, upload_to="opdracht_bijlagen/"),
                ),
                ("afgevinkt", models.BooleanField(default=False)),
                ("activiteiten", models.ManyToManyField(to="glitch.activiteit")),
                (
                    "core_assignment",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="glitch.coreassignment",
                    ),
                ),
                (
                    "cursus",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        to="glitch.cursus",
                    ),
                ),
                (
                    "gebruiker",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="voortgangen",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.AddField(
            model_name="coreassignment",
            name="gebruikers",
            field=models.ManyToManyField(
                through="glitch.Voortgang", to=settings.AUTH_USER_MODEL
            ),
        ),
    ]
