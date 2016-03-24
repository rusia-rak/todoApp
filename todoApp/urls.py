from django.conf.urls import url, include

urlpatterns = [
    url(r'^todo/', include('core.urls'))
]

