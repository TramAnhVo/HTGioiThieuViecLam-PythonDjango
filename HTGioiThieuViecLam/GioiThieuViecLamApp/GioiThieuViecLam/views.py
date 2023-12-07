from rest_framework import viewsets, generics, status, permissions
from . import serializers, paginator
from rest_framework.decorators import action
from rest_framework.views import Response
from .models import Location, Major, Position, Company, Job, CV, User, Comment


class LocationView(viewsets.ViewSet,
                   generics.ListAPIView,
                   generics.CreateAPIView,
                   generics.UpdateAPIView,
                   generics.DestroyAPIView):
    queryset = Location.objects.all()
    serializer_class = serializers.LocationSerializer


class MajorView(viewsets.ViewSet,
                generics.ListAPIView,
                generics.CreateAPIView,
                generics.UpdateAPIView,
                generics.DestroyAPIView):
    queryset = Major.objects.all()
    serializer_class = serializers.MajorSerializer


class PositionView(viewsets.ViewSet,
                generics.ListAPIView,
                generics.CreateAPIView,
                generics.UpdateAPIView,
                generics.DestroyAPIView):
    queryset = Position.objects.all()
    serializer_class = serializers.PositionSerializer


class CompanyView(viewsets.ViewSet,
                generics.ListAPIView,
                generics.CreateAPIView,
                generics.UpdateAPIView,
                generics.DestroyAPIView):
    queryset = Company.objects.all()
    serializer_class = serializers.CompanySerializer


class JobView(viewsets.ViewSet,
                generics.ListAPIView,
                generics.CreateAPIView,
                generics.UpdateAPIView,
                generics.DestroyAPIView):
    queryset = Job.objects.all()
    serializer_class = serializers.JobSerializer
    pagination_class = paginator.BasePagination

    def get_queryset(self):
        queries = self.queryset

        q = self.request.query_params.get("q")
        if q:
            queries = queries.filter(subject__icontains=q)

        major_id = self.request.query_params.get('major_id')
        if major_id:
            queries = queries.filter(major_id=major_id)

        return queries


class CvViews(viewsets.ViewSet,
                generics.ListAPIView,
                generics.CreateAPIView,
                generics.UpdateAPIView,
                generics.DestroyAPIView):
    queryset = CV.objects.all()
    serializer_class = serializers.CVSerializer


class UserView(viewsets.ViewSet,
                generics.ListAPIView,
                generics.CreateAPIView,
                generics.UpdateAPIView,
                generics.DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer


class CommentView(viewsets.ViewSet,
                generics.ListAPIView,
                generics.CreateAPIView,
                generics.UpdateAPIView,
                generics.DestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = serializers.CommentSerializer