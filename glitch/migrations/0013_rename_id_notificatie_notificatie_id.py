# Generated by Django 5.0.4 on 2024-06-28 15:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('glitch', '0012_rename_notificatie_id_notificatie_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='notificatie',
            old_name='id',
            new_name='notificatie_id',
        ),
    ]
