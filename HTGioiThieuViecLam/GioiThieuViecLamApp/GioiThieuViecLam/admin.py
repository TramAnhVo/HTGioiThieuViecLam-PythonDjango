from django.contrib import admin

from .dao import activate_or_lock_company_account
from .models import Location, Major, Position, Job, Company, CV, Comment, User
from django.template.response import TemplateResponse
from oauth2_provider.models import Application, RefreshToken, IDToken, AccessToken, Grant
from django.contrib.auth.models import Group, Permission
from django.urls import path, reverse
from . import dao


class JobAppAdminSite(admin.AdminSite):
    site_header = 'GIỚI THIỆU VIỆC LÀM ONLINE'

    def get_urls(self):
        return [
                   path('job-stats/', self.stats_view,name='job-stats')
               ] + super().get_urls()

    def stats_view(self, request):
        return TemplateResponse(request, 'admin/stats.html', {
            'stats': dao.count_job_by_cate(request.GET.get('month'), request.GET.get('year'))
        })

admin_site = JobAppAdminSite(name='myapp')


class JobAdmin(admin.ModelAdmin):
    list_display = ['title', 'created_date', 'out_off_date', 'company', 'major', 'location', 'position', 'active']
    search_fields = ['title']
    list_filter = ['major', 'location', 'position']
    list_per_page = 20


class CompanyAdmin(admin.ModelAdmin):
    list_display = ['name', 'address', 'email', 'link', 'active']
    actions = ['activate_selected_accounts','lock_selected_accounts']
    list_filter = ['active']
    search_fields = ['name']
    list_per_page = 20

    def activate_selected_accounts(self, request, queryset):
        for company in queryset:
            activate_or_lock_company_account(company.id, True)
        self.message_user(request, "Selected accounts have been activated successfully.")

    activate_selected_accounts.short_description = "Activate selected accounts"

    def lock_selected_accounts(self, request, queryset):
        for company in queryset:
            activate_or_lock_company_account(company.id, False)
        self.message_user(request, "Selected accounts have been locked successfully.")

    lock_selected_accounts.short_description = "Lock selected accounts"

class UserAdmin(admin.ModelAdmin):
    list_display = ['pk', 'last_name', 'first_name', 'email', 'is_active', 'state', 'is_superuser']
    list_filter = ['is_active']
    search_fields = ['name']
    list_per_page = 20


class CvAdmin(admin.ModelAdmin):
    list_display = ['user', 'job', 'active']
    list_filter = ['active']
    list_per_page = 20


class CommentAdmin(admin.ModelAdmin):
    list_display = ['content', 'user', 'company', 'created_date', 'active']
    list_filter = ['active']
    list_per_page = 20


class OauthAdmin(admin.ModelAdmin):
    list_display = ['client_id', 'name', 'user_id', 'client_type', 'authorization_grant_type', 'created']


# menu gioi thieu viec lam
admin_site.register(Location)
admin_site.register(Major)
admin_site.register(Position)
admin_site.register(Company, CompanyAdmin)
admin_site.register(Job, JobAdmin)
admin_site.register(User, UserAdmin)
admin_site.register(CV, CvAdmin)
admin_site.register(Comment, CommentAdmin)

# menu chung thuc oauth2
admin_site.register(Application, OauthAdmin)
admin_site.register(AccessToken)
admin_site.register(RefreshToken)
admin_site.register(Grant)
admin_site.register(IDToken)

# menu chung thuc
admin_site.register(Permission)
admin_site.register(Group)





