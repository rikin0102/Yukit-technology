from django.db import models

class AnalyticsEvent(models.Model):
    PAGEVIEW = 'PAGEVIEW'
    INQUIRY_SUBMISSION = 'INQUIRY_SUBMISSION'
    LOGIN_EVENT = 'LOGIN_EVENT'
    
    EVENT_TYPE_CHOICES = (
        (PAGEVIEW, 'Pageview'),
        (INQUIRY_SUBMISSION, 'Inquiry Submission'),
        (LOGIN_EVENT, 'Login Event'),
    )

    event_type = models.CharField(max_length=30, choices=EVENT_TYPE_CHOICES)
    path = models.CharField(max_length=255, blank=True, null=True)
    details = models.JSONField(blank=True, null=True, help_text="Additional key-value metadata for the event.")
    ip_hash = models.CharField(max_length=64, blank=True, null=True, help_text="Hashed IP address for privacy-compliant distinct user counts.")
    user_agent = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.get_event_type_display()} at {self.created_at}"
