var scpOpenTag  = '<pre class="scp"><code class="prettyprint linenums">';
var scpCloseTag = '</code></pre>';
// creates the text button
QTags.addButton( 'scp-text-button', 'pre code prettyprint', scpOpenTag, scpCloseTag, 'c', 'Add Code', 999);

(function($){
  $(function(){
    const si = setInterval(function(){
      const $editor = $('#content');
      if (! $editor.length) return;

      console.debug('text editor spellcheck off', [$editor[0]]);
      $editor.attr('spellcheck', false);
      
      clearInterval(si);
    }, 500);
  });
})(jQuery);