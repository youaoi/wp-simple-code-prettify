(function($){
  function cleanhtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  tinymce.PluginManager.add('scpEditor', function( editor, url ) {
    editor.addButton('scpInputCode', {
        title: 'Insert Code',
        icon: 'icon fa fa-scp',
        onclick: function() {
          var width = $(window).width(), H = $(window).height(), W = ( 720 < width ) ? 720 : width;
          W = W - 40; H = H - 84;
          tb_show( 'Insert Code', '#TB_inline?width=' + W + '&height=' + H + '&inlineId=scp-e-form' );
          $('#scp-e-code').focus();
        }
      });
  });

  $(function(){
    var form = $('<div>').attr('id', 'scp-e-form');
    $('<textarea>').attr('id', 'scp-e-code').attr('name', 'code')
      .css('width', '100%').css('height', '85%').css('margin', '10px 0')
      .attr('placeholder', 'Paste or enter the code here.')
      .appendTo(form);
    $('<select>').attr('id', 'scp-e-lang').attr('name', 'lang')
      .css('float', 'left')
      .append($('<option>').attr('value', '').text('- LANGUAGE AUTO -'))
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
      .appendTo(form);
    $('<input>').attr('id', 'scp-e-submit').attr('name', 'submit').attr('type', 'button')
      .css('float', 'right')
      .attr('addClass', 'button-primary').attr('value', 'Insert Code')
      .appendTo(form);
    form.appendTo('body').hide();
    form.find('#scp-e-submit').click(function(){
      var shortcode = '<pre class="scp"><code class="prettyprint linenums ' + $('#scp-e-lang').val() + '">' + cleanhtml($('#scp-e-code').val()) + '</code></pre>';
      tinyMCE.activeEditor.execCommand('mceInsertRawHTML', 0, shortcode);
      $('#scp-e-code').val("");
      tb_remove();
    });
  });
})(jQuery);