import logging
from pricing.models import PricingTier, PricingInquiry
from analytics.services import AnalyticsService
from analytics.models import AnalyticsEvent

logger = logging.getLogger(__name__)

class PricingService:
    @staticmethod
    def get_active_tiers():
        return PricingTier.objects.filter(is_active=True)

    @staticmethod
    def create_pricing_inquiry(validated_data, ip_address=None, user_agent=None):
        inquiry = PricingInquiry.objects.create(**validated_data)
        
        logger.info(f"New Pricing Inquiry created: ID {inquiry.id} for tier {inquiry.pricing_tier}")
        
        # Track in analytics
        AnalyticsService.record_event(
            event_type=AnalyticsEvent.INQUIRY_SUBMISSION,
            path='/api/pricing/',
            details={
                "pricing_inquiry_id": inquiry.id,
                "tier_name": inquiry.pricing_tier.name if inquiry.pricing_tier else "Custom",
                "estimated_budget": inquiry.estimated_budget,
                "company": inquiry.company
            },
            ip_address=ip_address,
            user_agent=user_agent
        )
        
        return inquiry
