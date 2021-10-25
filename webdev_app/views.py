from django.contrib.auth.decorators import login_required
from django.http.response import HttpResponse
from django.shortcuts import render,redirect
from django.contrib.auth.models import auth
from . import models


# Create your views here.
def root(request):
    if request.user.is_authenticated:
        return redirect('home')
    context = {}
    return render(request,'root.html',context=context)

@login_required(login_url='/login/')
def home(request):
    try:
        if request.user.is_staff:
            return redirect('manage')
        context = {}
        return render(request,'home.html',context=context)
    except Exception as e:
        return exception_render(e,request)

@login_required(login_url='/login/')
def manage(request):
    if request.user.is_staff:
        context = {
            'all_users' : models.UserAccounts.objects.all(),
            'all_products' : models.Menu.objects.all()
        }
        return render(request,'manage.html',context=context)
    else:
        return redirect('home')

def signup(request):
    try:
        if request.method == "POST":
            data = request.POST
            if data:
                if 'register' in data:
                    first_name = data.get('name').split(' ')[0]
                    last_name = ' '.join(data.get('name').split(' ')[1:])
                    new_user = models.UserAccounts(username=data.get('email'),first_name=first_name,last_name=last_name,email=data.get('email'),address=data.get('address'),plans=data.get('plans'),coupon=data.get('coupon'),language=data.get('language'))
                    new_user.set_password(data.get('password'))
                    new_user.save()
                    auth.login(request,new_user)
                    return redirect('home')

        context = {}
        return render(request,'signup.html',context=context)
    except Exception as e:
        return exception_render(e,request)

def login(request):
    try:
        if request.user.is_authenticated:
            return redirect('home')
        context = {}
        if request.method == "POST":
            data = request.POST
            if data:
                if 'authenticate' in data:
                    email = data.get('email')
                    pwd = data.get('password')
                    user = auth.authenticate(username=email,password=pwd)
                    if user is not None:
                        auth.login(request,user)
                        if request.GET.get('next'):
                            return redirect(request.GET.get('next'))
                        return redirect('home')
                    else:
                        context.update({
                            'login_status' : 'failed',
                        })

        return render(request,'login.html',context=context)
    except Exception as e:
        return exception_render(e,request)

def forgot_password(request):
    try:
        context = {}
        return render(request,'forgot_password.html',context=context)
    except Exception as e:
        return exception_render(e,request)

@login_required(login_url='/login/')
def logout(request):
    try:
        auth.logout(request)
        return redirect('home')
    except Exception as e:
        return exception_render(e,request)

def exception_render(exc,request):
    context = {
        'message' : str(exc)
    }
    return render(request,'exception.html',context=context)