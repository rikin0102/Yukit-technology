from django.db import models

class Inquiry(models.Model):
    NEW = 'NEW'
    IN_PROGRESS = 'IN_PROGRESS'
    RESOLVED = 'RESOLVED'
    
    STATUS_CHOICES = (
        (NEW, 'New'),
        (IN_PROGRESS, 'In Progress'),
        (RESOLVED, 'Resolved'),
    )

    name = models.CharField(max_length=150)
    email = models.EmailField()
    company = models.CharField(max_length=150, blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    message = models.TextField()
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default=NEW)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = 'Inquiries'

    def __str__(self):
        return f"Inquiry from {self.name} ({self.email})"
