from celery import shared_task
from django.utils import timezone
from datetime import timedelta
from glitch.models import Activiteit, Notificatie

@shared_task
def check_deadlines():
    now = timezone.now()
    upcoming_deadlines = Activiteit.objects.filter(deadline__lte=now + timedelta(hours=2), deadline__gt=now)

    for activiteit in upcoming_deadlines:
        gebruiker = activiteit.cursus.gebruiker_set.first()
        if gebruiker:
            Notificatie.objects.create(
                gebruiker=gebruiker,
                beschrijving=f"Deadline voor activiteit {activiteit.taak} komt eraan over 2 uur.",
            )