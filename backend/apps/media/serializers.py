from rest_framework import serializers
from media.models import MediaFile

class MediaFileSerializer(serializers.ModelSerializer):
    file_url = serializers.SerializerMethodField()
    thumbnail_url = serializers.SerializerMethodField()
    formatted_size = serializers.SerializerMethodField()

    class Meta:
        model = MediaFile
        fields = ('id', 'file', 'thumbnail', 'file_url', 'thumbnail_url', 'file_name', 'file_size', 'formatted_size', 'mime_type', 'created_at')
        read_only_fields = ('id', 'thumbnail', 'file_name', 'file_size', 'mime_type', 'created_at')

    def get_file_url(self, obj):
        request = self.context.get('request')
        if obj.file and hasattr(obj.file, 'url'):
            if request:
                return request.build_absolute_uri(obj.file.url)
            return obj.file.url
        return None

    def get_thumbnail_url(self, obj):
        request = self.context.get('request')
        if obj.thumbnail and hasattr(obj.thumbnail, 'url'):
            if request:
                return request.build_absolute_uri(obj.thumbnail.url)
            return obj.thumbnail.url
        # Fallback to normal file if thumbnail is not generated (e.g. non-image file types)
        return self.get_file_url(obj)

    def get_formatted_size(self, obj):
        size = obj.file_size
        for unit in ['B', 'KB', 'MB', 'GB']:
            if size < 1024.0:
                return f"{size:.2f} {unit}"
            size /= 1024.0
        return f"{size:.2f} TB"
