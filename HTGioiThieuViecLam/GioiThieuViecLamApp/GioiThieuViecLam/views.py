from rest_framework import viewsets, generics, status, permissions, parsers
from . import serializers, paginator
from rest_framework.decorators import action
from rest_framework.views import Response
from .models import Location, Major, Position, Company, Job, CV, User, Comment
from .serializers import JobSerializer
from . import perms


class LocationView(viewsets.ViewSet,
                   generics.ListAPIView,
                   generics.CreateAPIView,
                   generics.UpdateAPIView,
                   generics.RetrieveAPIView,
                   generics.DestroyAPIView):
    queryset = Location.objects.all()
    serializer_class = serializers.LocationSerializer

    # danh sach viec lam cua mot dia diem
    @action(methods=['get'], detail=True)
    def jobs(self, request, pk):
        jobs = self.get_object().job_set.filter(active=True).all()

        return Response(serializers.JobSerializer(jobs, many=True, context={'request': request}).data,
                        status=status.HTTP_200_OK)


class MajorView(viewsets.ViewSet,
                generics.ListAPIView,
                generics.CreateAPIView,
                generics.UpdateAPIView,
                generics.RetrieveAPIView,
                generics.DestroyAPIView):
    queryset = Major.objects.all()
    serializer_class = serializers.MajorSerializer


class PositionView(viewsets.ViewSet,
                   generics.ListAPIView,
                   generics.CreateAPIView,
                   generics.RetrieveAPIView,
                   generics.UpdateAPIView,
                   generics.DestroyAPIView):
    queryset = Position.objects.all()
    serializer_class = serializers.PositionSerializer


class CompanyView(viewsets.ViewSet,
                  generics.ListAPIView,
                  generics.CreateAPIView,
                  generics.RetrieveAPIView,
                  generics.UpdateAPIView,
                  generics.DestroyAPIView):
    queryset = Company.objects.all()
    serializer_class = serializers.CompanySerializer

    # danh sach viec lam cua mot cong ty
    @action(methods=['get'], detail=True)
    def jobs(self, request, pk):
        jobs = self.get_object().job_set.filter(active=True).all()

        return Response(serializers.JobSerializer(jobs, many=True, context={'request': request}).data,
                        status=status.HTTP_200_OK)

    def get_permissions(self):
        if self.action in ['add_comment']:
            return [permissions.IsAuthenticated()]

        return self.permission_classes

    @action(methods=['post'], url_path='comments', detail=True)
    def add_comment(self, request, pk):
        c = Comment.objects.create(user=request.user, company=self.get_object(), content=request.data.get('content'))


class JobView(viewsets.ViewSet,
              generics.RetrieveAPIView,
              generics.ListAPIView,
              generics.CreateAPIView,
              generics.UpdateAPIView,
              generics.DestroyAPIView):
    queryset = Job.objects.all()
    serializer_class = serializers.JobSerializer
    pagination_class = paginator.BasePagination

    def get_queryset(self):
        queries = self.queryset

        # Tim kiem theo tu khoa
        q = self.request.query_params.get("q")
        if q:
            queries = queries.filter(title__icontains=q)

        # tim kiem ma chuyen nganh
        major_id = self.request.query_params.get('major_id')
        if major_id:
            queries = queries.filter(major_id=major_id)

        # tim kiem ma dia diem
        location_id = self.request.query_params.get('location_id')
        if location_id:
            queries = queries.filter(location_id=location_id)

        return queries


class CvViews(viewsets.ViewSet,
              generics.ListAPIView,
              generics.CreateAPIView,
              generics.RetrieveAPIView,
              generics.UpdateAPIView,
              generics.DestroyAPIView):
    queryset = CV.objects.all()
    serializer_class = serializers.CVSerializer


class UserView(viewsets.ViewSet,
               generics.ListAPIView,
               generics.CreateAPIView,
               generics.RetrieveAPIView,
               generics.UpdateAPIView,
               generics.DestroyAPIView):
    queryset = User.objects.filter(is_active=True).all()
    serializer_class = serializers.UserSerializer
    parser_classes = [parsers.MultiPartParser]

    def get_permissions(self):
        if self.action.__eq__('current_user'):
            return [permissions.IsAuthenticated()]

        return [permissions.AllowAny()]

    @action(methods=['get'], url_path='current-user', url_name='current-user', detail=False)
    def current_user(self, request):
        return Response(serializers.UserSerialzier(request.user).data)


class CommentView(viewsets.ViewSet,
                  generics.RetrieveAPIView,
                  generics.UpdateAPIView,
                  generics.DestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = serializers.CommentSerializer
    permission_classes = [perms.OwnerAuthenticated]

