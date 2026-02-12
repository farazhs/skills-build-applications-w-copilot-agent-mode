from django.test import TestCase
from .models import User, Team, Activity, Workout, Leaderboard

class ModelSmokeTest(TestCase):
    def setUp(self):
        self.team = Team.objects.create(name='Test Team')
        self.user = User.objects.create(name='Test User', email='test@example.com', team=self.team)
        self.workout = Workout.objects.create(name='Test Workout', suggested_for='test')
        self.activity = Activity.objects.create(user=self.user, type='Test', duration=10, calories=100, date='2024-01-01')
        self.leaderboard = Leaderboard.objects.create(user=self.user, score=100, rank=1)

    def test_team_str(self):
        self.assertEqual(str(self.team), 'Test Team')
    def test_user_str(self):
        self.assertEqual(str(self.user), 'Test User')
    def test_workout_str(self):
        self.assertEqual(str(self.workout), 'Test Workout')
    def test_activity_str(self):
        self.assertIn('Test User', str(self.activity))
    def test_leaderboard_str(self):
        self.assertIn('Test User', str(self.leaderboard))
