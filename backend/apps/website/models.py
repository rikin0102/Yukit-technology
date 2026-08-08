from django.db import models

class Setting(models.Model):
    GENERAL = 'GENERAL'
    SEO = 'SEO'
    CONTACT = 'CONTACT'
    SOCIAL = 'SOCIAL'
    
    GROUP_CHOICES = (
        (GENERAL, 'General'),
        (SEO, 'SEO'),
        (CONTACT, 'Contact Details'),
        (SOCIAL, 'Social Links'),
    )

    key = models.CharField(max_length=100, unique=True, help_text="Config key (e.g. 'site_title', 'contact_email')")
    value = models.TextField()
    description = models.TextField(blank=True, help_text="Brief description explaining what this setting changes.")
    group = models.CharField(max_length=20, choices=GROUP_CHOICES, default=GENERAL)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['group', 'key']

    def __str__(self):
        return f"{self.group}: {self.key} = {self.value[:30]}"
