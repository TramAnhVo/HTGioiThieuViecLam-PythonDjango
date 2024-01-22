from django.db import models
from  django.contrib.auth.models import AbstractUser
from ckeditor.fields import RichTextField

class BaseModel(models.Model):
    created_date = models.DateField(auto_now_add=True, null=True)
    active = models.BooleanField(default=True)

    class Meta:
        abstract = True
        ordering = ['-id']


class Location(models.Model):
    name = models.CharField(max_length=255, null=False)

    def __str__(self):
        return self.name


class Major(models.Model):
    name = models.CharField(max_length=255, null=False)

    def __str__(self):
        return self.name


class Position(models.Model):
    name = models.CharField(max_length=255, null=False)

    def __str__(self):
        return self.name


class User(AbstractUser):
    phone = models.CharField(max_length=10, null=True)
    avatar = models.ImageField(upload_to='uploads/%Y/%m', null=True)

    location = models.ForeignKey(Location, on_delete=models.RESTRICT, null=True)
    major = models.ForeignKey(Major, on_delete=models.RESTRICT, null=True)



class Company(BaseModel):
    name = name = models.CharField(max_length=255, null=False)
    description = RichTextField()
    image = models.ImageField(upload_to='company/%Y/%m', null=False)
    address = models.CharField(max_length=255, null=False)
    email = models.CharField(max_length=255, null=False)
    link = models.CharField(max_length=255, null=False)

    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.name


class Job(BaseModel):
    title = models.CharField(max_length=255, null=False)
    description = RichTextField()
    requirement = RichTextField()
    experience = models.CharField(max_length=255, null=False)
    salary = models.CharField(max_length=255, null=False)
    out_off_date = models.DateField(auto_now=True, null=True)

    location = models.ForeignKey(Location, on_delete=models.RESTRICT)
    major = models.ForeignKey(Major, on_delete=models.RESTRICT)
    position = models.ForeignKey(Position, on_delete=models.RESTRICT)
    company = models.ForeignKey(Company, on_delete=models.RESTRICT)

    def __str__(self):
        return self.title


class CV(BaseModel):
    content = RichTextField()
    user = models.ForeignKey(User, on_delete=models.RESTRICT)
    job = models.ForeignKey(Job, on_delete=models.RESTRICT)


class Interaction(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    company = models.ForeignKey(Company, on_delete=models.CASCADE,null=False)

    class Meta:
        abstract = True


class Comment(Interaction):
    content = models.CharField(max_length=255, null=False)


class Rating(Interaction):
    rate = models.SmallIntegerField(default=0)