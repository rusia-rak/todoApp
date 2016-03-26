from django.db import models
from taggit.managers import TaggableManager

class Todo(models.Model):
    url = models.CharField(max_length=200, default='')
    detail = models.CharField(max_length=500, default=' ')
    tags = TaggableManager()

    def __str__(self):
        return self.title

