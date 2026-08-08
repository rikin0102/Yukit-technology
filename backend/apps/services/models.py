from django.db import models

class Service(models.Model):
    title = models.CharField(max_length=150)
    slug = models.SlugField(unique=True)
    short_description = models.TextField()
    full_content = models.TextField()
    icon_identifier = models.CharField(max_length=50, default='Cpu', help_text="Lucide icon name (e.g. Cpu, Cloud, Database)")
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', 'title']

    def __str__(self):
        return self.title

class ServiceFeature(models.Model):
    service = models.ForeignKey(Service, related_name='features', on_delete=models.CASCADE)
    title = models.CharField(max_length=150)
    description = models.TextField(blank=True)

    def __str__(self):
        return f"{self.service.title} - {self.title}"
