from django.test import TestCase, Client, LiveServerTestCase
from django.urls import resolve, reverse
from django.apps import apps

from .apps import LoginConfig
from .views import register


class UnitTest(TestCase):
    def test_login_app(self):
        self.assertEqual(LoginConfig.name, 'login')
        self.assertEqual(apps.get_app_config(
            'login').name, 'login')

    def test_login_url_is_exist(self):
        response = Client().get('/accounts/login/')
        self.assertEqual(response.status_code, 200)
        self.assertNotEqual(response.status_code, 404)

    def test_register_url_is_exist(self):
        response = Client().get('/accounts/register/')
        self.assertEqual(response.status_code, 200)
        self.assertNotEqual(response.status_code, 404)

    def test_register_using_register_func(self):
        found = reverse('login:register')
        self.assertEqual(resolve(found).func, register)

    def test_login_using_correct_template(self):
        response = Client().get('/accounts/login/')
        self.assertTemplateUsed(response, 'registration/login.html')
        self.assertContains(response, 'login')

    def test_register_using_correct_template(self):
        response = Client().get('/accounts/register/')
        self.assertTemplateUsed(response, 'register.html')
