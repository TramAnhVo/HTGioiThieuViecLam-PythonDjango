from django.urls import path, include
from rest_framework import routers
from . import views


router = routers.DefaultRouter()
router.register('locations', views.LocationView, basename='locations')
router.register('majors', views.MajorView, basename='majors')
router.register('positions', views.PositionView, basename='positions')
router.register('jobs', views.JobView, basename='jobs')
router.register('companies', views.CompanyView, basename='companies')
router.register('users', views.UserView, basename='users')
router.register('cvs', views.CvViews, basename='cvs')
router.register('comments', views.CommentView, basename='comments')

urlpatterns = [
    path('', include(router.urls))
]