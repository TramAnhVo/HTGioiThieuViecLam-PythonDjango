from .models import Major, Job, CV
from django.db.models import Count


def load_job(params={}):
    q = Job.objects.filter(active=True)

    kw = params.get('kw')
    if kw:
        q = q.filter(title__icontains=kw)

    major_id = params.get('major_id')
    if major_id:
        q = q.filter(major_id=major_id)

    return q


def count_job_by_cate():
    return Major.objects.annotate(count=Count('job__id')).values("id", "name", "count").order_by('-count')