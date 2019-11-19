from django.test import TestCase, Client, LiveServerTestCase
from django.urls import resolve, reverse
from django.apps import apps

from .apps import BooksConfig
from .views import index


class UnitTest(TestCase):
    def test_profile_app(self):
        self.assertEqual(BooksConfig.name, 'books')
        self.assertEqual(apps.get_app_config(
            'books').name, 'books')

    def test_profile_url_is_exist(self):
        response = Client().get('/coba')
        self.assertEqual(response.status_code, 200)
        self.assertNotEqual(response.status_code, 404)

    def test_profile_using_index_func(self):
        found = reverse('books:home')
        self.assertEqual(resolve(found).func, index)

    def test_profile_using_correct_template(self):
        response = Client().get('/coba')
        self.assertTemplateUsed(response, 'index.html')
        self.assertContains(response, 'MHSBooks.com')
