function addTodo(){

    url=$("#submitForm input[id='url']").val();
    tags=$("#submitForm input[id='tags']").val();
    detail=$("#submitForm input[id='detail']").val();
    var todo = $.ajax({

                     url:"/todo/addTodo/",
                     data:"url=" + url + "&detail=" + detail + "&tags="+tags,
                     success: function(todoId){

                         $("#submitForm")[0].reset();
                         appendTodo(todoId);

                        }
                   });

}

function deleteTodo(todo){

    var del = $.ajax({

                url:"/todo/deleteTodo/" + todo + "/",
                success: function(){

                    $("#todo-"+ todo).fadeOut(500);
                    setTimeout(function(){$("#todo-" + todo).remove()
                    if ($('table tbody tr').length < 2 ){
                        $('#clsearch').html('No More Results to show<button class="btn bg-warning" type="submit" onclick="resetSearch()" style="margin-left:2em;">Reset</a><div class="clear"></div>');
                    }

                    $('#deleteSuccess').show();
                    setTimeout(function(){$('#deleteSuccess').fadeOut(1000);}, 2000);

                    },1000);



                    }

                });

}


function appendTodo(todoId){

    $.ajax({

        url:"/todo/appendTodo/" + todoId + "/",
        success: function(result){

            if ($('#clsearch').length == 0){

                $("#todoTable tbody").append(result);
                $("#todo-"+todoId).fadeIn(500);

            }
            $('#addSuccess').fadeIn(500);
            setTimeout(function(){$('#addSuccess').fadeOut(1000);}, 2000);

        }
    });

}

function getTodos(){

  query=$("#searchForm input[id='query']").val();

  $.ajax({

      url:"/todo/getTodos/",
      data:"query=" + query,
      success: function(result){
          $('#main').html(result)
      }
  });

}

function resetSearch(){

  $.ajax({

      url:"/todo/resetSearch/",
      success: function(result){
          $('#main').html(result)
      }
  });

}

function tagSearch(tag){

  query = $(tag).html();

  $.ajax({

      url:"/todo/getTodos/",
      data:"query=" + query,
      success: function(result){
          $('#main').html(result)
      }
  });

}
