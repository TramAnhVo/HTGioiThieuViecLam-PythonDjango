from .models import Major, Job, CV
from django.db.models import Count, Q
from datetime import datetime


def count_job_by_cate():
    return Major.objects.annotate(count=Count('job__cv')).values("id", "name", "count").order_by('-count')