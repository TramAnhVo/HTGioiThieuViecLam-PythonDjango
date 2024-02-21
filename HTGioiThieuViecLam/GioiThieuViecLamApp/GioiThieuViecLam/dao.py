from .models import Major, Job, CV, Company
from django.db.models import Count, Q
from datetime import datetime


def count_job_by_cate(month=None, year=None):
    # Lọc theo tháng và năm nếu được chỉ định
    now = datetime.now()
    if month is None and year is None:
        month = now.month
        year = now.year
    if month and year:
        return Major.objects.filter(
            job__cv__created_date__month=month,
            job__cv__created_date__year=year
        ).annotate(count=Count('job__cv')
        ).values("id", "name", "count"
        ).order_by('-count')
    else:
        if year:
            return Major.objects.filter(
                job__cv__created_date__year=year
            ).annotate(count=Count('job__cv')
            ).values("id", "name", "count"
            ).order_by('-count')
        else:
            return Major.objects.filter(
                job__cv__created_date__month=month,
                job__cv__created_date__year=now.year
            ).annotate(count=Count('job__cv')
            ).values("id", "name", "count"
            ).order_by('-count')

def activate_or_lock_company_account(company_id,action):
    try:
        company = Company.objects.get(id=company_id)

        company.active = action
        company.save()

        user = company.user
        user.state = action
        user.save()

        return True
    except Company.DoesNotExist:
        return False