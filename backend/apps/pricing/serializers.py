from rest_framework import serializers
from pricing.models import PricingTier, PricingInquiry

class PricingTierSerializer(serializers.ModelSerializer):
    class Meta:
        model = PricingTier
        fields = ('id', 'name', 'slug', 'cost', 'billing_cycle', 'short_description', 'features', 'is_featured', 'order', 'is_active', 'created_at')

class PricingInquirySerializer(serializers.ModelSerializer):
    pricing_tier_details = PricingTierSerializer(source='pricing_tier', read_only=True)
    pricing_tier_id = serializers.PrimaryKeyRelatedField(
        queryset=PricingTier.objects.all(), source='pricing_tier', write_only=True, required=False, allow_null=True
    )

    class Meta:
        model = PricingInquiry
        fields = ('id', 'pricing_tier_id', 'pricing_tier_details', 'name', 'email', 'company', 'estimated_budget', 'requirements', 'custom_configuration', 'created_at')
        read_only_fields = ('id', 'created_at')
