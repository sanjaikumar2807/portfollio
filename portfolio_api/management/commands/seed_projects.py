from django.core.management.base import BaseCommand
from portfolio_api.models import Project, Skill, Profile, Education

class Command(BaseCommand):
    help = 'Seeds the database with initial portfolio data'

    def handle(self, *args, **options):
        # 1. Seed Profile
        profile, created = Profile.objects.get_or_create(
            email="sanjaikumar1135@gmail.com",
            defaults={
                "name": "SANJAIKUMAR S",
                "phone": "+91 8015501005",
                "location": "Ramapuram, Tamil Nadu",
                "summary": "Aspiring web developer with a strong foundation in Python, HTML, CSS, JavaScript, and MySQL, focused on building practical, user-friendly web applications. Experienced in end-to-end project development through personal and hackathon projects, including a real-time bus tracking platform and an automated bank challan system.",
                "github": "https://github.com/sanjaikumar",
                "linkedin": "https://linkedin.com/in/sanjaikumar",
            }
        )
        if created:
            self.stdout.write(self.style.SUCCESS('Successfully created profile'))

        # 2. Seed Education
        edu_data = [
            {
                "institution": "SRM Valliammai Engineering College",
                "degree": "B.Tech - Artificial Intelligence and Data Science",
                "cgpa": "8.2",
                "year": "2021 - 2025",
            }
        ]
        for item in edu_data:
            Education.objects.get_or_create(
                institution=item['institution'],
                degree=item['degree'],
                defaults=item
            )
        self.stdout.write(self.style.SUCCESS('Successfully seeded education'))

        # 3. Seed Projects
        projects_data = [
            {
                "title": "MyBusstand — Real-Time Bus Tracking Web App",
                "description": "Developed a web application that helps users in villages and towns track real-time bus arrival information. Designed a user-friendly, responsive interface for both mobile and desktop users. Implemented live bus route tracking to reduce commuter waiting time.",
                "technologies": "HTML, CSS, JavaScript",
                "link": None,
            },
            {
                "title": "Bank Challan Filling Machine — Hackathon Project",
                "description": "Built an automated system to digitally fill bank challans, reducing manual effort and human error. Led a team during the hackathon — managed task distribution, coordinated development, and delivered within deadline. Gained experience in team leadership, requirement analysis, and rapid prototyping under time pressure.",
                "technologies": "Python, HTML, CSS",
                "link": None,
            }
        ]
        for proj in projects_data:
            Project.objects.get_or_create(
                title=proj['title'],
                defaults=proj
            )
        self.stdout.write(self.style.SUCCESS('Successfully seeded projects'))

        # 4. Seed Some Basic Skills
        skills_data = [
            {"name": "Python", "category": "Backend", "proficiency": 90},
            {"name": "JavaScript", "category": "Frontend", "proficiency": 85},
            {"name": "HTML/CSS", "category": "Frontend", "proficiency": 90},
            {"name": "MySQL", "category": "Database", "proficiency": 80},
            {"name": "React", "category": "Frontend", "proficiency": 75},
            {"name": "Django", "category": "Backend", "proficiency": 80},
        ]
        for skill in skills_data:
            Skill.objects.get_or_create(
                name=skill['name'],
                defaults=skill
            )
        self.stdout.write(self.style.SUCCESS('Successfully seeded skills'))

        self.stdout.write(self.style.SUCCESS('Database seeding completed!'))
