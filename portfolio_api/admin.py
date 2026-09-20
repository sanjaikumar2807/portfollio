from django.contrib import admin
from .models import Profile, Skill, Project, Education, ContactMessage


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display  = ("name", "email", "created_at")
    list_filter   = ("created_at",)
    search_fields = ("name", "email", "message")
    readonly_fields = ("name", "email", "message", "created_at")
    ordering      = ("-created_at",)


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "phone", "location")


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "proficiency")


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "technologies", "date")


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ("institution", "degree", "year")
