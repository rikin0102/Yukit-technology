import os
import io
from PIL import Image
from django.core.files.base import ContentFile
from media.models import MediaFile

class MediaService:
    @staticmethod
    def upload_and_optimize(uploaded_file):
        """
        Uploads a file, and if it's an image, optimizes/compresses it and generates a thumbnail.
        """
        file_name = uploaded_file.name
        file_size = uploaded_file.size
        mime_type = uploaded_file.content_type
        
        # Initialize default model instance variables
        optimized_file = uploaded_file
        thumbnail_file = None
        
        # Check if the file is an image
        if mime_type.startswith('image/') and not mime_type.endswith('svg+xml'):
            try:
                # Open image using Pillow
                img = Image.open(uploaded_file)
                
                # 1. Optimize Image
                output_io = io.BytesIO()
                # Determine format
                img_format = img.format if img.format else 'JPEG'
                if img_format == 'PNG' and img.mode in ('RGBA', 'LA'):
                    # Save as PNG with optimization
                    img.save(output_io, format='PNG', optimize=True)
                else:
                    # Convert to RGB if needed and save as JPEG
                    if img.mode != 'RGB':
                        img = img.convert('RGB')
                    img.save(output_io, format='JPEG', quality=75, optimize=True)
                
                output_io.seek(0)
                optimized_content = output_io.read()
                optimized_file = ContentFile(optimized_content, name=file_name)
                file_size = len(optimized_content)
                
                # 2. Generate Thumbnail
                thumb_io = io.BytesIO()
                # Copy for thumbnail
                thumb_img = Image.open(io.BytesIO(optimized_content))
                thumb_img.thumbnail((300, 300))
                
                # Save thumbnail
                if img_format == 'PNG':
                    thumb_img.save(thumb_io, format='PNG', optimize=True)
                else:
                    thumb_img.save(thumb_io, format='JPEG', quality=70, optimize=True)
                
                thumb_io.seek(0)
                thumb_name = f"thumb_{os.path.splitext(file_name)[0]}.jpg" if img_format != 'PNG' else f"thumb_{file_name}"
                thumbnail_file = ContentFile(thumb_io.read(), name=thumb_name)
                
            except Exception as e:
                # If optimization fails, fallback to original file
                print(f"Image optimization failed: {e}")
                optimized_file = uploaded_file
                thumbnail_file = None
                
        # Save to DB
        media_instance = MediaFile(
            file=optimized_file,
            thumbnail=thumbnail_file,
            file_name=file_name,
            file_size=file_size,
            mime_type=mime_type
        )
        media_instance.save()
        return media_instance
