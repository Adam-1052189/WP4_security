# Generated by Django 5.0.4 on 2024-05-29 07:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("glitch", "0002_alter_gebruiker_profielfoto"),
    ]

    operations = [
        migrations.AlterField(
            model_name="gebruiker",
            name="profielfoto",
            field=models.ImageField(null=True, upload_to="static/glitch/img/"),
        ),
    ]
