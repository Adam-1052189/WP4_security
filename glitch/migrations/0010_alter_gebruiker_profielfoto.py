# Generated by Django 5.0.4 on 2024-06-27 19:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('glitch', '0009_alter_activiteit_deadline'),
    ]

    operations = [
        migrations.AlterField(
            model_name='gebruiker',
            name='profielfoto',
            field=models.ImageField(blank=True, null=True, upload_to='profielfotos/'),
        ),
    ]
