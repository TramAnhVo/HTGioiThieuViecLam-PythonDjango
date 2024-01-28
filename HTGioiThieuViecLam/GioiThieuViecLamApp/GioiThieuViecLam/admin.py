from django.contrib import admin
from django.utils.safestring import mark_safe

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


class JobAdmin(admin.ModelAdmin):
    list_display = ['title', 'created_date', 'out_off_date', 'company', 'major', 'location', 'position', 'active']
    search_fields = ['title']
    list_filter = ['major', 'location', 'position']
    list_per_page = 20


class CompanyAdmin(admin.ModelAdmin):
    list_display = ['name', 'address', 'email', 'link', 'active']
    list_filter = ['active']
    search_fields = ['name']
    list_per_page = 20


class UserAdmin(admin.ModelAdmin):
    list_display = ['pk', 'last_name', 'first_name', 'email', 'is_active', 'is_superuser']
    list_filter = ['is_active']
    search_fields = ['name']
    list_per_page = 20


class CvAdmin(admin.ModelAdmin):
    list_display = ['user', 'job', 'active']
    list_filter = ['active']
    list_per_page = 20


admin_site.register(Location)
admin_site.register(Major)
admin_site.register(Position)
admin_site.register(Company, CompanyAdmin)
admin_site.register(Job, JobAdmin)
admin_site.register(User, UserAdmin)
admin_site.register(CV, CvAdmin)
admin_site.register(Comment)





