from rest_framework import serializers
from .models import Location, Major, Position, Job, Company, CV, User, Comment


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'


class MajorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Major
        fields = '__all__'


class PositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Position
        fields = '__all__'


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'


class JobSerializer(serializers.ModelSerializer):
    # major = MajorSerializer()
    # location = LocationSerializer()
    # company = CompanySerializer()
    # position = PositionSerializer()
    # company = CompanySerializer(read_only=True)

    class Meta:
        model = Job
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "first_name", "last_name", "location", "major", "url_avatar", "role", "username", "password", "email", "date_joined","state"]
        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }

    def create(self, validated_data):
        data = validated_data.copy()
        u = User(**data)
        u.set_password(u.password)
        u.save()

        return u

class CVSerializer(serializers.ModelSerializer):
    class Meta:
        model = CV
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Comment
        fields = ['id', 'content', 'created_date','user']

