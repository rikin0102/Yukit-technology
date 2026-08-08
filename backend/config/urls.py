from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

# Import views from local apps
from accounts.views import (
    CustomTokenObtainPairView, 
    RegisterView, 
    UserProfileView, 
    UserViewSet
)
from projects.views import ProjectViewSet
from services.views import ServiceViewSet
from inquiries.views import InquiryViewSet
from pricing.views import PricingTierViewSet, PricingInquiryViewSet
from website.views import SettingViewSet
from media.views import MediaFileViewSet
from analytics.views import PageViewLoggingView
from dashboard.views import DashboardMetricsView

# Initialize DefaultRouter
router = DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'services', ServiceViewSet, basename='service')
router.register(r'contact', InquiryViewSet, basename='inquiry')
router.register(r'pricing/tiers', PricingTierViewSet, basename='pricing-tier')
router.register(r'pricing/inquiries', PricingInquiryViewSet, basename='pricing-inquiry')
router.register(r'settings', SettingViewSet, basename='setting')
router.register(r'upload', MediaFileViewSet, basename='media')
router.register(r'users', UserViewSet, basename='user')  # Admin user management CRUD

urlpatterns = [
    # Admin URL (we'll keep it but default to Next.js admin dashboard)
    path('django-admin/', admin.site.urls),
    
    # REST API endpoints
    path('api/', include(router.urls)),
    
    # Custom auth views
    path('api/auth/login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/auth/register/', RegisterView.as_view(), name='register'),
    path('api/auth/me/', UserProfileView.as_view(), name='user_profile'),
    
    # Analytics pageview endpoint
    path('api/analytics/pageview/', PageViewLoggingView.as_view(), name='pageview_log'),
    
    # Dashboard metrics endpoint
    path('api/dashboard/metrics/', DashboardMetricsView.as_view(), name='dashboard_metrics'),
]

# Support static and media file delivery during development
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
