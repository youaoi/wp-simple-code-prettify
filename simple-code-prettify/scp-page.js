(function($){
  $(function(){
    $('.prettyprint').attr({
      contenteditable: true,
      spellcheck: false,
    });
    /*
    $('pre.scp[title]').each(function(){
      var title = $(this).attr('title');
      $(this).attr('title', '');
      var div = $('<div>').html(title)
        .addClass('scp-title');
      $(this).before(div);
    });
    */
  });
})(jQuery);