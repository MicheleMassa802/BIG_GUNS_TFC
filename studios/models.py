from django.db import models
from django.db.models import SET_NULL

# Create your models here.


class Studio(models.Model):
    class Meta:
        verbose_name = 'Studio'
        verbose_name_plural = 'Studios'
    name = models.CharField(max_length=120)
    address = models.CharField(max_length=120)
    latitude = models.IntegerField()
    longitude = models.IntegerField()
    postal_code = models.CharField(max_length=120)
    phone_number = models.IntegerField()

    def __str__(self):
        return self.name

    # def amenities(self):
    #     return Amenities.objects.get(studio=self.id)


class Images(models.Model):
    class Meta:
        verbose_name = 'Images'
        verbose_name_plural = 'Images'
    studio = models.ForeignKey(to=Studio, related_name='images', on_delete=SET_NULL, null=True)
    image = models.ImageField()


class Amenities(models.Model):
    class Meta:
        verbose_name = 'Amenities'
        verbose_name_plural = 'Amenities'
    studio = models.ForeignKey(to=Studio, related_name='amenities', on_delete=SET_NULL, null=True)
    type = models.CharField(max_length=120)
    quantity = models.IntegerField()
