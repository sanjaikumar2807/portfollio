from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Profile, Skill, Project, Education, ContactMessage
from .serializers import (
    ProfileSerializer,
    SkillSerializer,
    ProjectSerializer,
    EducationSerializer,
    ContactMessageSerializer,
)

class ProfileDetailView(APIView):
    def get(self, request):
        profile = Profile.objects.first()
        if not profile:
            return Response({"error": "No profile found. Please add data via Django Admin."}, status=404)
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)

class SkillListView(generics.ListAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer

class ProjectListView(generics.ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class EducationListView(generics.ListAPIView):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer

class ContactCreateView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Thank you for reaching out! Sanjai will get back to you shortly.", "data": serializer.data},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
