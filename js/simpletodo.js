(function simpleTodo() {
  var data = $.cache('simpletodolist').get('items');
  var items = (data) ? data.split(';;') : [];

  var todo = $('.todolist');
  var markup = "<div class='status'></div><ul></ul><input type='text' class='newtext'/><input type='button' value='Add'/></div>>";
  todo.append($(markup));

  function addItem(txt) {
    $('ul').append($('<li><input type="checkbox"/><span class="desc">' + txt + '</span><span class="del">[x]</span></li>'));
  }

  function store() {
    $.cache('simpletodolist').set('items', (items.length > 1) ? items.join(';;') : items[0]);
  }

  var addHandler = function() {
    var txt = $('.newtext')[0].value;
    if (txt.length > 0) {
      addItem(txt);
      items.push(txt);
      store();
      $('.status').html('');
    }
    $('.newtext')[0].value = '';
  }

  $('ul').bind('li .del', 'click', function() {
    var line = $(this).closest('li');
    var value = line.find('.desc').text();
    items = $.without(items, value);
    store();

    line.animate({
      opacity: 0,
      duration: 500,
      after : function() {
        line.remove();
      }
    });

    if (items.length == 0) {
      $('.status').html("No Items!");
    }
  });

  $('ul').bind('li input', 'click', function() {
    var checked = ($(this)[0].checked);
    var line = $(this).closest('li');
    if (checked) {
      line.find('.desc').addClass('checked');
    } else {
      line.find('.desc').removeClass('checked');
    }
  });

  $('input[value=Add]').bind({
    'click': addHandler
  });

  $('.newtext').bind({
    'keypress' : function(e) {
      if (e.keyCode == 13) addHandler();
    }
  });

  for (var i=0 , max = items.length; i < max; i++) {
    addItem(items[i]);
  }

  $('.status').html(items.length > 0 ? "" : "No Items!");

})();