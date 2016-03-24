
from django.http import HttpResponse
from django.shortcuts import render
from core.models import *
from taggit.models import *


app_name = 'core'


def home(request):

    todos = Todo.objects.all()

    context= {
        "todos":todos,
    }

    return render(request, "core/home.html", context)

def addTodo(request):

    todoText = request.GET.get('detail')
    todoUrl = request.GET.get('url')
    todo = Todo(url=todoUrl, detail=todoText)
    todo.save()
    todoTags = request.GET.get('tags').split(",")
    for tag in todoTags:
        todo.tags.add(tag)
    todo.save()

    return HttpResponse(todo.id)

def deleteTodo(request,todoId):

    todo = Todo.objects.get(id=todoId)
    todo.delete()

    return HttpResponse("true")

def appendTodo(request,todoId):

    todo = Todo.objects.get(id=todoId)
    context = {"todo":todo}

    if todo:
        return render(request, "core/todoAjax.html", context)

    else:
        return HttpResponse("false")

def getTodos(request):
    query = request.GET.get("query")
    todos = Todo.objects.filter(url__contains=query) | Todo.objects.filter(tags__name__contains=query)
    context ={"todos":todos, "query":query}

    return render(request, "core/todoSearch.html", context)

def resetSearch(request):

    todos = Todo.objects.all()

    context= {
        "todos":todos,
    }

    return render(request, "core/resetSearch.html", context)
