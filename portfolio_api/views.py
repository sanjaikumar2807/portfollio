from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core.mail import send_mail
from django.conf import settings
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

            # ── Send email notification to sanjaikumar1135@gmail.com ──────────
            sender_name    = serializer.validated_data.get("name", "Unknown")
            sender_email   = serializer.validated_data.get("email", "")
            sender_message = serializer.validated_data.get("message", "")

            subject = f"📬 Portfolio Contact: Message from {sender_name}"
            body = (
                f"New contact form submission from your portfolio!\n\n"
                f"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
                f"Name    : {sender_name}\n"
                f"Email   : {sender_email}\n"
                f"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n"
                f"Message:\n{sender_message}\n\n"
                f"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
                f"Reply directly to: {sender_email}"
            )

            email_sent = False
            try:
                send_mail(
                    subject=subject,
                    message=body,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[settings.CONTACT_RECEIVER_EMAIL],
                    fail_silently=False,
                )
                email_sent = True
            except Exception as e:
                # Email not configured yet – don't block the response
                print(f"[Email] Could not send email: {e}")

            return Response(
                {
                    "message": "✅ Message received! Sanjai will get back to you shortly.",
                    "email_sent": email_sent,
                    "data": serializer.data,
                },
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
