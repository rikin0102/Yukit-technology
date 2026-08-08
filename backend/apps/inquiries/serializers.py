from rest_framework import serializers
from inquiries.models import Inquiry

class InquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inquiry
        fields = ('id', 'name', 'email', 'company', 'phone', 'message', 'status', 'created_at', 'updated_at')
        read_only_fields = ('id', 'created_at', 'updated_at')
