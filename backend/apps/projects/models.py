from django.db import models
from services.models import Service
from media.models import MediaFile

class Project(models.Model):
    DRAFT = 'DRAFT'
    PUBLISHED = 'PUBLISHED'
    
    STATUS_CHOICES = (
        (DRAFT, 'Draft'),
        (PUBLISHED, 'Published'),
    )

    title = models.CharField(max_length=150)
    slug = models.SlugField(unique=True)
    description = models.TextField(help_text="Short abstract / summary of the project.")
    long_description = models.TextField(help_text="Full case study breakdown.")
    client = models.CharField(max_length=100, blank=True, null=True)
    industry = models.CharField(max_length=100, blank=True, null=True)
    tech_stack = models.CharField(max_length=500, blank=True, null=True, help_text="Comma-separated technologies used, e.g. React, Next.js, Django")
    services_rendered = models.ManyToManyField(Service, related_name='projects', blank=True)
    live_url = models.URLField(blank=True, null=True)
    github_url = models.URLField(blank=True, null=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default=DRAFT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title

class ProjectImage(models.Model):
    project = models.ForeignKey(Project, related_name='images', on_delete=models.CASCADE)
    media_file = models.ForeignKey(MediaFile, related_name='project_images', on_delete=models.CASCADE)
    order = models.IntegerField(default=0)
    is_featured = models.BooleanField(default=False)

    class Meta:
        ordering = ['order', '-id']

    def __str__(self):
        return f"{self.project.title} - Image {self.order}"
