from django.contrib import admin
from .models import Location, Major, Position, Job, Company, CV, Comment, User
from django.template.response import TemplateResponse
from django.urls import path
from . import dao


class JobAppAdminSite(admin.AdminSite):
    site_header = 'GIỚI THIỆU VIỆC LÀM ONLINE'

    def get_urls(self):
        return [
                   path('job-stats/', self.stats_view)
               ] + super().get_urls()

    def stats_view(self, request):
        return TemplateResponse(request, 'admin/stats.html', {
            'stats': dao.count_job_by_cate()
        })


admin_site = JobAppAdminSite(name='myapp')


admin_site.register(Location)
admin_site.register(Major)
admin_site.register(Position)
admin_site.register(Company)
admin_site.register(Job)
admin_site.register(User)
admin_site.register(CV)
admin_site.register(Comment)





