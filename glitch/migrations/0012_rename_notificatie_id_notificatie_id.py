# Generated by Django 5.0.4 on 2024-06-28 15:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('glitch', '0011_notificatie_created_at'),
    ]

    operations = [
        migrations.RenameField(
            model_name='notificatie',
            old_name='notificatie_id',
            new_name='id',
        ),
    ]
