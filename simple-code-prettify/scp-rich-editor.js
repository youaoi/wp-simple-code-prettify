(function($){

  tinymce.PluginManager.add('scpEditor', function( editor, url ) {
    editor.addButton('scpInputCode', {
        title: 'Insert Code',
        icon: 'icon fa fa-scp',
        onclick: function() {
          var width = $(window).width(), H = $(window).height(), W = ( 720 < width ) ? 720 : width;
          W = W - 40; H = H - 100;
          tb_show('Insert code dialog (After inserting the code, please press [Shift + Enter] to continue writing.)', '#TB_inline?inlineId=scp-e-form');
          $('#TB_ajaxContent').width('100%').height('100%')
            .css('height', 'calc(100% - ' + ($('#TB_ajaxWindowTitle').height() + 1) + 'px)')
            .css('padding', '1em').css('margin', '0')
            .css('box-sizing', 'border-box');
          $('#scp-e-code').val("");
          $('#scp-e-title').val("");
          $('#scp-e-title').focus();
        }
      });
  });

  $(function(){
    const $form = $('<div>').attr('id', 'scp-e-form');

    $('<input>').attr('id', 'scp-e-title').attr('name', 'title').attr('type', 'text')
      .css('width', '100%').css('display', 'block')
      .attr('placeholder', 'Code Title')
      .attr('accesskey', 'c')
      .attr('tabindex', '101')
      .appendTo($form);

    $('<select>').attr('id', 'scp-e-lang').attr('name', 'lang')
      .css('float', 'left')
      .append($('<option>').attr('value', '').text('- Language select -'))
      .append($('<option>').attr('value', 'lang-sh' ).text('BASH'))
      .append($('<option>').attr('value', 'lang-c'  ).text('C'))
      //.append($('<option>').attr('value', 'lang-cc' ).text('CC'))
      .append($('<option>').attr('value', 'lang-cpp').text('C++'))
      .append($('<option>').attr('value', 'lang-csh').text('C#'))
      //.append($('<option>').attr('value', 'lang-cys').text('CYS'))
      //.append($('<option>').attr('value', 'lang-cv' ).text('CV'))
      //.append($('<option>').attr('value', 'lang-htm').text('HTM'))
      .append($('<option>').attr('value', 'lang-css' ).text('CSS'))
      .append($('<option>').attr('value', 'lang-html').text('HTML'))
      .append($('<option>').attr('value', 'lang-java').text('Java'))
      .append($('<option>').attr('value', 'lang-js' ).text('JS(JavaScript)'))
      .append($('<option>').attr('value', 'lang-php').text('PHP'))
      .append($('<option>').attr('value', 'lang-sql').text('SQL'))
      .append($('<option>').attr('value', 'lang-xml').text('XML'))
      .append($('<option>').attr('value', 'lang-vb').text('Visual BASIC'))
      //.append($('<option>').attr('value', 'lang-').text(''))
      .attr('accesskey', 'l')
      .attr('tabindex', '102')
      .appendTo($form);

    $('<input>').attr('id', 'scp-e-submit').attr('name', 'submit').attr('type', 'button')
      .css('float', 'right')
      .addClass('button-primary')
      .attr('value', 'Insert this code')
      .attr('accesskey', 'i')
      .attr('tabindex', '104')
      .appendTo($form);

    $('<br>').css('clear', 'both')
      .appendTo($form);

    $('<textarea>').attr('id', 'scp-e-code').attr('name', 'code')
      .css('width', '100%').css('height', 'calc(100% - 70px)').css('margin', '1px 1px 0 1px')
      .attr('placeholder', 'Paste or enter the code here.')
      .attr('spellcheck', 'false')
      .attr('accesskey', 'p')
      .attr('tabindex', '103')
      .appendTo($form);
      
    $form.appendTo('body').hide();
    $form.find('#scp-e-submit').click(function() {
      const $div = $('<div>');
      const $pre = $('<pre>').addClass('scp');
      $pre.appendTo($div);

      if ($('#scp-e-title').val().length > 0) {
        //pre.attr('title', escape($('#scp-e-title').val()));//
        $('<div>').addClass('scp-title')
          .text($('#scp-e-title').val())
          .prependTo($div);
      }
      $('<code>').addClass('prettyprint').addClass('linenums').addClass($('#scp-e-lang').val())
        //.html(escape($('#scp-e-code').val()))
        .text($('#scp-e-code').val())
        .appendTo($pre);

      //tinyMCE.activeEditor.execCommand('mceInsertRawHTML', 0, $div.html());
      tinyMCE.activeEditor.execCommand('mceInsertContent', false, $div.html() + "\n\n");
      tb_remove();
    });
  });

  // spellcheck off
  $(function(){
    const si = setInterval(function(){
      const $editor = $('#content_ifr');
      if (! $editor.length) return;

      const editorDocument = $editor[0].contentWindow.document;
      const $body = $('body', editorDocument);
      if (! $body.length) return;

      console.debug('rich editor spellcheck off', [$body[0]]);
      $body.attr('spellcheck', false);
      
      clearInterval(si);
    }, 500);
  });
  /*
  function escape(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  */
})(jQuery);