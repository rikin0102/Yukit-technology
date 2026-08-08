from projects.models import Project, ProjectImage
from django.db import transaction

class ProjectManagerService:
    @staticmethod
    def get_published_projects(service_slug=None):
        queryset = Project.objects.filter(status=Project.PUBLISHED).prefetch_related('images__media_file', 'services_rendered')
        if service_slug:
            queryset = queryset.filter(services_rendered__slug=service_slug)
        return queryset

    @staticmethod
    @transaction.atomic
    def create_project(project_data, images_data, services_list):
        project = Project.objects.create(**project_data)
        if services_list:
            project.services_rendered.set(services_list)
        for img in images_data:
            ProjectImage.objects.create(project=project, **img)
        return project
