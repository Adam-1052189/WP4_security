# Generated by Django 5.0.4 on 2024-06-28 16:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('glitch', '0013_rename_id_notificatie_notificatie_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='notificatie',
            name='read',
            field=models.BooleanField(default=False),
        ),
    ]
