from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    ADMIN = 'ADMIN'
    EDITOR = 'EDITOR'
    VIEWER = 'VIEWER'
    
    ROLE_CHOICES = (
        (ADMIN, 'Admin'),
        (EDITOR, 'Editor'),
        (VIEWER, 'Viewer'),
    )
    
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default=VIEWER)
    phone = models.CharField(max_length=15, blank=True, null=True)
    company = models.CharField(max_length=100, blank=True, null=True)
    
    @property
    def is_admin(self):
        return self.role == self.ADMIN or self.is_superuser
        
    @property
    def is_editor(self):
        return self.role in [self.ADMIN, self.EDITOR] or self.is_superuser

    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"
