from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter

from projects.models import Project
from projects.serializers import ProjectSerializer
from projects.services import ProjectManagerService
from common.permissions import IsEditorOrReadOnly

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsEditorOrReadOnly]
    lookup_field = 'slug'
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['client', 'industry']
    search_fields = ['title', 'description', 'long_description']

    def get_queryset(self):
        user = self.request.user
        service_slug = self.request.query_params.get('service')
        
        # Editors see everything, public sees published
        if user and user.is_authenticated and user.is_editor:
            queryset = Project.objects.all().prefetch_related('images__media_file', 'services_rendered')
            if service_slug:
                queryset = queryset.filter(services_rendered__slug=service_slug)
            return queryset
            
        return ProjectManagerService.get_published_projects(service_slug=service_slug)
