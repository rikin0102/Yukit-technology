from rest_framework import serializers
from website.models import Setting

class SettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Setting
        fields = ('id', 'key', 'value', 'description', 'group', 'updated_at')
        read_only_fields = ('id', 'updated_at')
