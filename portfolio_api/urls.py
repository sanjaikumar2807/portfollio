from django.urls import path
from .views import (
    ProfileDetailView,
    SkillListView,
    ProjectListView,
    EducationListView,
    ContactCreateView,
)

urlpatterns = [
    path('profile/', ProfileDetailView.as_view(), name='profile'),
    path('skills/', SkillListView.as_view(), name='skills'),
    path('projects/', ProjectListView.as_view(), name='projects'),
    path('education/', EducationListView.as_view(), name='education'),
    path('contact/', ContactCreateView.as_view(), name='contact'),
]
