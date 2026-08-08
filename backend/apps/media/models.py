from django.db import models

class MediaFile(models.Model):
    file = models.FileField(upload_to='uploads/')
    thumbnail = models.ImageField(upload_to='thumbnails/', blank=True, null=True)
    file_name = models.CharField(max_length=255)
    file_size = models.IntegerField()  # in bytes
    mime_type = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.file_name
