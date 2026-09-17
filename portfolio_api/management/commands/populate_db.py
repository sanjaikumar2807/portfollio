from django.core.management.base import BaseCommand
from portfolio_api.models import Profile, Skill, Project, Education

class Command(BaseCommand):
    help = 'Populates the database with resume data'

    def handle(self, *args, **options):
        # Create Profile
        profile, created = Profile.objects.get_or_create(
            name="SANJAIKUMAR S",
            defaults={
                'email': 'sanjaikumar1135@gmail.com',
                'phone': '+91 8015501005',
                'location': 'Ramapuram, Tamil Nadu',
                'summary': 'Aspiring web developer with a strong foundation in Python, HTML, CSS, JavaScript, and MySQL, focused on building practical, user-friendly web applications. Experienced in end-to-end project development through personal and hackathon projects, including a real-time bus tracking platform and an automated bank challan system.',
                'github': 'https://github.com/sanjaikumar',
                'linkedin': 'https://linkedin.com/in/sanjaikumar',
            }
        )

        # Create Skills
        skills_data = [
            ('Python', 'Programming Languages', 70),
            ('JavaScript', 'Programming Languages', 80),
            ('HTML', 'Programming Languages', 90),
            ('CSS', 'Programming Languages', 85),
            ('Django', 'Frameworks', 60),
            ('MySQL', 'Databases', 75),
            ('Git', 'Tools', 70),
            ('GitHub', 'Tools', 70),
            ('VS Code', 'Tools', 90),
        ]
        for name, cat, prof in skills_data:
            Skill.objects.get_or_create(name=name, defaults={'category': cat, 'proficiency': prof})

        # Create Projects
        projects_data = [
            {
                'title': 'MyBusstand',
                'description': 'Real-Time Bus Tracking Web App. Developed a web application that helps users in villages and towns track real-time bus arrival information. Designed a user-friendly, responsive interface.',
                'technologies': 'HTML, CSS, JavaScript',
                'date': '2023-2024'
            },
            {
                'title': 'Bank Challan Filling Machine',
                'description': 'Hackathon Project. Built an automated system to digitally fill bank challans, reducing manual effort and human error. Led a team and delivered within deadline.',
                'technologies': 'Python, HTML, CSS',
                'date': '2026'
            },
        ]
        for p in projects_data:
            Project.objects.get_or_create(title=p['title'], defaults={
                'description': p['description'],
                'technologies': p['technologies'],
                'date': p['date']
            })

        # Create Education
        edu_data = [
            {
                'institution': 'Adhiparasakthi Engineering College',
                'degree': 'B.E Computer Science and Engineering',
                'cgpa': '8.33',
                'year': '2027'
            },
            {
                'institution': 'Kingston Matric Hr. Sec. School',
                'degree': 'Higher Secondary Certificate (HSC)',
                'cgpa': '76%',
                'year': '2023'
            },
            {
                'institution': 'Kingston Matric Hr. Sec. School',
                'degree': 'Secondary School Leaving Certificate (SSLC)',
                'year': '2021'
            },
        ]
        for e in edu_data:
            Education.objects.get_or_create(
                institution=e['institution'],
                degree=e['degree'],
                defaults={'cgpa': e.get('cgpa'), 'year': e['year']}
            )

        self.stdout.write(self.style.SUCCESS('Successfully populated the database with Sanjai\'s data!'))
