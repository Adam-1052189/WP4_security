import os
from celery import Celery
from celery.schedules import crontab

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'resurrection.settings')

app = Celery('resurrection')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()

app.conf.beat_schedule = {
    'check-deadlines-every-minute': {
        'task': 'glitch.tasks.check_deadlines',
        'schedule': crontab(minute='*'),
    },
}