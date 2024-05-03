#from django.conf.urls import url
from django.urls import path
from members import views

from django.conf.urls.static import static
from django.conf import settings
urlpatterns=[
    path('department/', views.departmentApi),
    path('department/<int:id>', views.departmentApi),
    path('employee/',views.employeeApi),
    path('employee/<int:id>', views.employeeApi),

    path('SaveUploadImg',views.SaveUploadImg)
] + static(settings.MEDIA_URL,document_root = settings.MEDIA_ROOT)