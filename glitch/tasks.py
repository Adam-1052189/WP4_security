from celery import shared_task
from django.utils import timezone
from datetime import timedelta
from glitch.models import Activiteit, Notificatie

@shared_task
def check_deadlines():
    now = timezone.now()
    logger.info(f"Checking deadlines at {now}")
    
    upcoming_deadlines = Activiteit.objects.filter(deadline__lte=now + timedelta(hours=2), deadline__gt=now)
    logger.info(f"Found {upcoming_deadlines.count()} upcoming deadlines")
    
    for activiteit in upcoming_deadlines:
        gebruiker = activiteit.cursus.gebruiker_set.first()
        if gebruiker:
            Notificatie.objects.create(
                gebruiker=gebruiker,
                beschrijving=f"Deadline voor activiteit {activiteit.taak} komt eraan over 2 uur.",
            )
            logger.info(f"Notificatie aangemaakt voor gebruiker {gebruiker.email} voor activiteit {activiteit.taak}.")
        else:
            logger.warning(f"Geen gebruiker gevonden voor activiteit {activiteit.taak}.")