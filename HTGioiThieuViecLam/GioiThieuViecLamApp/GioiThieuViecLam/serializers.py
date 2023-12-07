from rest_framework.fields import SerializerMethodField
from rest_framework.serializers import ModelSerializer

from .models import Location, Major, Position, Job, Company, CV, User, Comment

class LocationSerializer(ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'


class MajorSerializer(ModelSerializer):
    class Meta:
        model = Major
        fields = '__all__'


class PositionSerializer(ModelSerializer):
    class Meta:
        model = Position
        fields = '__all__'


class CompanySerializer(ModelSerializer):
    image = SerializerMethodField()

    def get_image(self, course):
        request = self.context['request']
        name = course.image.name
        if name.startswith("static/"):
            path = '/%s' % name
        else:
            path = '/static/%s' % name

        return request.build_absolute_uri(path)

    class Meta:
        model = Company
        fields = '__all__'


class JobSerializer(ModelSerializer):
    class Meta:
        model = Job
        fields = '__all__'


class CVSerializer(ModelSerializer):
    class Meta:
        model = CV
        fields = '__all__'


class CommentSerializer(ModelSerializer):
    # User = SerializerMethodField()

    # def get_user(self, comment):
    #     return UserSerializer(comment.user, context={"request": self.context.get('request')}).data

    class Meta:
        model = Comment
        fields = ['id', 'content', 'created_date', 'company_id','user_id']


class UserSerializer(ModelSerializer):
    avatar = SerializerMethodField()

    def get_avatar(self, user):
        request = self.context['request']
        if user.avatar:
            name = user.avatar.name
            if name.startswith("static/"):
                path = '/%s' % name
            else:
                path = '/static/%s' % name

            return request.build_absolute_uri(path)

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(user.password)
        user.save()

        return user

    class Meta:
        model = User
        fields = ["id", "first_name", "last_name", "avatar",
                  "username", "password", "email", "date_joined"]
        extra_kwargs = {
            'password': {'write_only': 'true'}
        }