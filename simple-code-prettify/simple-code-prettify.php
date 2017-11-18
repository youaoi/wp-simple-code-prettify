<?php
/*
 * Plugin Name: Simple Code Prettify - Yuki AOI
 * Plugin URI: http://aoi.ooo/simple-code-prettify
 * Description: Utility for google code-prettify.
 * Version: 0.0.1
 * Author: Yuki AOI
 * Author URI: http://aoi.ooo/
 */

class SimpleCodePrettify
{
    const URL_PRETTY_JS = 'https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js?skin=sunburst';
}

add_action('wp_enqueue_scripts', 'scp_wp_enqueue_scripts');
function scp_wp_enqueue_scripts() {
    if (is_admin()) return;
    wp_enqueue_script('pretty', SimpleCodePrettify::URL_PRETTY_JS, '', '', true);
    wp_enqueue_script('scp-page', plugins_url('scp-page.js', __FILE__ ), '', '', true);
    wp_enqueue_style('simple-code-prettify', plugins_url('simple-code-prettify.css', __FILE__ ));
}

add_action('after_setup_theme', 'scp_after_setup_theme');
function scp_after_setup_theme() {
    add_editor_style(plugins_url('simple-code-prettify.css', __FILE__));
    add_editor_style(plugins_url('scp-editor.css', __FILE__));
}

add_action('admin_enqueue_scripts', 'scp_admin_enqueue_scripts');
function scp_admin_enqueue_scripts() {
    wp_enqueue_style('scp-font-awesome', plugins_url('scp-font-awesome.css', __FILE__ ));
}

add_action('admin_head', 'scp_admin_head');
function scp_admin_head() {
    global $typenow;
    if (! current_user_can('edit_posts') && !current_user_can('edit_pages')) return;
    if (! in_array($typenow, array('post', 'page'))) return;

    wp_enqueue_script('scp-editor', plugins_url('scp-text-editor.js', __FILE__ ), '', '', true);

    if ( get_user_option('rich_editing') == 'true') {
        add_filter('mce_external_plugins', 'scp_mce_external_plugins');
        add_filter('mce_buttons', 'scp_mce_buttons');
    }
}
function scp_mce_external_plugins($plugin_array) {
    $plugin_array['scpEditor'] = plugins_url('scp-rich-editor.js', __FILE__);
    return $plugin_array;
}
function scp_mce_buttons($buttons) {
    array_push($buttons, 'scpInputCode');
    return $buttons;
}
