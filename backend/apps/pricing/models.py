from django.db import models

class PricingTier(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    cost = models.CharField(max_length=50, help_text="e.g. '$499', '$1200', 'Custom'")
    billing_cycle = models.CharField(max_length=50, default='month', help_text="e.g. 'month', 'year', 'project'")
    short_description = models.TextField()
    features = models.JSONField(default=list, help_text="A list of string features, e.g. ['Up to 10 users', 'API Access']")
    is_featured = models.BooleanField(default=False)
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', 'name']

    def __str__(self):
        return f"{self.name} - {self.cost}/{self.billing_cycle}"

class PricingInquiry(models.Model):
    pricing_tier = models.ForeignKey(PricingTier, on_delete=models.SET_NULL, null=True, blank=True, related_name='inquiries')
    name = models.CharField(max_length=150)
    email = models.EmailField()
    company = models.CharField(max_length=150, blank=True, null=True)
    estimated_budget = models.CharField(max_length=100, blank=True, null=True)
    requirements = models.TextField()
    custom_configuration = models.JSONField(default=dict, blank=True, help_text="Stores calculator custom config state (sliders, checked features).")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Pricing Inquiry from {self.name} ({self.email})"
