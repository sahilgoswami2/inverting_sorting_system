from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Product, SoldProduct
from .serializers import ProductSerializer, SoldProductSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    @action(detail=True, methods=['post'])
    def sell(self, request, pk=None):
        product = self.get_object()
        quantity = request.data.get('quantity', 0)
        if product.quantity >= int(quantity):
            product.quantity -= int(quantity)
            product.sold_quantity += int(quantity)
            product.save()

            # Add sold product to SoldProduct model
            SoldProduct.objects.create(product=product, quantity=quantity)

            return Response({'status': 'product sold'})
        else:
            return Response({'status': 'not enough stock'}, status=status.HTTP_400_BAD_REQUEST)

class SoldProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SoldProduct.objects.all()
    serializer_class = SoldProductSerializer

from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import json

@method_decorator(csrf_exempt, name='dispatch')
class RegisterUser(View):
    def post(self, request):
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')
            if not username or not password:
                return JsonResponse({'error': 'Username and password are required'}, status=400)
            if User.objects.filter(username=username).exists():
                return JsonResponse({'error': 'Username already exists'}, status=400)
            user = User.objects.create_user(username=username, password=password)
            return JsonResponse({'status': 'user registered'})
        except Exception as e:
            return JsonResponse({'error': 'Something went wrong'}, status=400)

@method_decorator(csrf_exempt, name='dispatch')
class LoginUser(View):
    def post(self, request):
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'status': 'user logged in'})
        else:
            return JsonResponse({'error': 'Invalid credentials test'}, status=400)