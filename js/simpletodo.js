(function simpleTodo() {
  var todo = $('.todolist');

  var markup = "<div class='status'>Loading...</div><ul></ul><input type='text' id='text'/><input class='addbutton' type='button' value='Add'/></div>";
  todo.append($(markup));

  var addHandler = function() {
    var txt = $('#text')[0].value;
    if (txt.length > 0) {
      $('ul').append($('<li><input type="checkbox"/><span class="desc">' + txt + '</span> <span class="del">[x]</span></li>'));
      $('.status').html('');
    }
    $('#text')[0].value = '';
  }

  $('ul').bind('li .del', 'click', function() {
    $(this).closest('li').remove();
  });

  $('ul').bind('li input', 'click', function() {
    var decor = ($(this)[0].checked) ? "line-through" : "none";
    var line = $(this).closest('li');
    $(line, 'span.desc').css({'text-decoration': decor});
  });

  $('.addbutton').bind({
    'click': addHandler
  });

  $('#text').bind({
    'keypress' : function(e) {
      if (e.keyCode == 13) addHandler();
    }
  });

  $('.status').html('No items!');

})();

