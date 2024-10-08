# Generated by Django 5.0.4 on 2024-06-26 10:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('glitch', '0004_activiteit_deadline'),
    ]

    operations = [
        migrations.AddField(
            model_name='voortgang',
            name='status',
            field=models.CharField(choices=[('OPEN', 'Open'), ('AFWACHTING', 'Afwachting'), ('GOEDGEKEURD', 'Goedgekeurd'), ('AFGEKEURD', 'Afgekeurd')], default='OPEN', max_length=11),
        ),
        migrations.AddField(
            model_name='voortgang',
            name='submission_text',
            field=models.TextField(null=True),
        ),
    ]
