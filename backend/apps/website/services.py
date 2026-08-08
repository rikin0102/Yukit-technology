from website.models import Setting

class WebsiteService:
    @staticmethod
    def get_all_settings_dict():
        """
        Returns all website settings as a simple flat dictionary.
        """
        settings = Setting.objects.all()
        return {setting.key: setting.value for setting in settings}

    @staticmethod
    def update_setting(key, value):
        setting, created = Setting.objects.get_or_create(key=key)
        setting.value = value
        setting.save()
        return setting
