from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Workout, Leaderboard
from django.utils import timezone

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Clear existing data
        Leaderboard.objects.all().delete()
        Activity.objects.all().delete()
        User.objects.all().delete()
        Team.objects.all().delete()
        Workout.objects.all().delete()

        # Create Teams
        marvel = Team.objects.create(name='Marvel', description='Marvel Superheroes')
        dc = Team.objects.create(name='DC', description='DC Superheroes')

        # Create Users
        users = [
            User.objects.create(name='Spider-Man', email='spiderman@marvel.com', team=marvel, is_superhero=True),
            User.objects.create(name='Iron Man', email='ironman@marvel.com', team=marvel, is_superhero=True),
            User.objects.create(name='Wonder Woman', email='wonderwoman@dc.com', team=dc, is_superhero=True),
            User.objects.create(name='Batman', email='batman@dc.com', team=dc, is_superhero=True),
        ]

        # Create Workouts
        workouts = [
            Workout.objects.create(name='Super Strength', description='Strength workout for heroes', suggested_for='superhero'),
            Workout.objects.create(name='Agility Training', description='Agility and speed drills', suggested_for='superhero'),
        ]

        # Create Activities
        for user in users:
            Activity.objects.create(user=user, type='Running', duration=30, calories=300, date=timezone.now().date())
            Activity.objects.create(user=user, type='Weight Lifting', duration=45, calories=500, date=timezone.now().date())

        # Create Leaderboard
        for i, user in enumerate(users, 1):
            Leaderboard.objects.create(user=user, score=1000-i*100, rank=i)

        self.stdout.write(self.style.SUCCESS('octofit_db populated with test data.'))
