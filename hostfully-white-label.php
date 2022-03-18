<?php

/**
 * @link              https://mickeyuk.github.io
 * @since             1.0.0
 * @package           HCS_Hostfully_Whitelabel
 *
 * @wordpress-plugin
 * Plugin Name:       Hostfully White Labelling for WordPress
 * Plugin URI:        https://mickeyuk.github.io
 * Description:       An editor for creating white label code for Hostfully.
 * Version:           1.0.0
 * Author:            Michael Dearman
 * Author URI:        https://mickeyuk.github.io
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       hcs-hostfully
 * Domain Path:       /languages
*/

/**
 * Register all the settings for the plugin.
 *
 * @return void
 */
function hostfullywl_register_settings() {

    // Editor instance values
    register_setting( 'hostfullywl_options', 'hostfullywl_editor_instance_id' );
    for ($i=0; $i<6; $i++) {
        register_setting( 'hostfullywl_options', 'hostfullywl_editor_'.$i.'_html' );
        register_setting( 'hostfullywl_options', 'hostfullywl_editor_'.$i.'_css' );
        register_setting( 'hostfullywl_options', 'hostfullywl_editor_'.$i.'_javascript' );
    }

}
add_action( 'admin_init', 'hostfullywl_register_settings' );

/**
 * Enqueue all the required admin scripts and styles.
 *
 * @param object $hook
 * @return void
 */
function hostfullywl_enqueue_scripts($hook) {

    // Only load on the plugin page
    $current_screen = get_current_screen();
    if ( strpos($current_screen->base, 'hostfully-white-label') === false) {
        return;
    }

    // Plugin scripts
    wp_enqueue_style('hostfullywl_css', plugins_url('css/admin.css', __FILE__) );
    wp_enqueue_script('hostfullywl_js', plugins_url('js/admin.js', __FILE__), array( 'jquery', 'wp-api'), '1.0.0', false  );

    // Editor scripts
    wp_enqueue_script('ace', plugin_dir_url( __FILE__ ) . 'js/vendor/ace.js');
    wp_enqueue_script('ace-language-tools', plugin_dir_url( __FILE__ ) . 'js/vendor/ext-language_tools.js');
    wp_enqueue_script('ace-theme', plugin_dir_url( __FILE__ ) . 'js/vendor/theme-chrome.js');

    wp_enqueue_script('ace-mode-css', plugin_dir_url( __FILE__ ) . 'js/vendor/mode-css.js');
    wp_enqueue_script('ace-mode-html', plugin_dir_url( __FILE__ ) . 'js/vendor/mode-html.js');
    wp_enqueue_script('ace-mode-javascript', plugin_dir_url( __FILE__ ) . 'js/vendor/mode-javascript.js');

    wp_enqueue_script('ace-worker-css', plugin_dir_url( __FILE__ ) . 'js/vendor/worker-css.js');
	wp_enqueue_script('ace-worker-html', plugin_dir_url( __FILE__ ) . 'js/vendor/worker-html.js');
	wp_enqueue_script('ace-worker-javascript', plugin_dir_url( __FILE__ ) . 'js/vendor/worker-javascript.js');

    // CSS parser
    wp_enqueue_script('css-parser', plugin_dir_url( __FILE__ ) . 'js/vendor/css.min.js');

    // Javascript Validator
    wp_enqueue_script('js-validator', plugin_dir_url( __FILE__ ) . 'js/vendor/jshint.js');
}
add_action( 'admin_enqueue_scripts', 'hostfullywl_enqueue_scripts' );
 
/**
 * Register the admin menu page.
 */
function hostfullywl_register_page() {
    add_menu_page(
        __( 'Custom Menu Title', 'textdomain' ),
        'White Label',
        'manage_options',
        'hostfully-white-label',
        'hostfullywl_admin_page',
        'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MDkuNDQgODY0LjI4Ij48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6I2ZmZjt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPkFzc2V0IDE8L3RpdGxlPjxnIGlkPSJMYXllcl8yIiBkYXRhLW5hbWU9IkxheWVyIDIiPjxnIGlkPSJMYXllcl8xLTIiIGRhdGEtbmFtZT0iTGF5ZXIgMSI+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNNjIuMDcsODY0LjI4Yy0xLjA2LTItMS00LjEtMS02LjI2UTYxLDYzOCw2MSw0MThjMC0zLjg2LDEuMzQtNiw0LjU1LTcuOTNRMTMzLjEsMzY5LDIwMC42LDMyNy42NWMxLjc1LTEuMDcsMy40Ni0zLjE2LDUuODItMS44OSwyLjYsMS40MSwxLjY4LDQuMTQsMS42OCw2LjM1cTAsMTA5LDAsMjE4YzAsNy41NCwwLDcuNTUsNy40MSw3LjU1cTkzLjc1LDAsMTg3LjQ5LjEyYzUsMCw1LjkyLTEuNDUsNS45MS02LjEzcS0uMjItMTA5LjI0LS4xLTIxOC40OWE0Miw0MiwwLDAsMSwuMDctNC40OWMuMzItMy4xOSwyLTQsNC44NC0yLjU1Ljg4LjQ1LDEuNzMsMSwyLjU4LDEuNVE0ODMuNjQsMzY4Ljc3LDU1MSw0MDkuODNjMy43OSwyLjMsNS4wOSw0LjgyLDUuMDksOS4xOHEtLjE3LDIxOS0uMDksNDM4YzAsMi40OC4xLDQuOTUtLjkyLDcuM2gtMTQ1Yy0xLjYyLTIuMTktMS4yMy00Ljc0LTEuMjMtNy4yMXEwLTc1LjkzLDAtMTUxLjg2YzAtNy4xOS0uMTItNy4zMi03LjE5LTcuMzJIMjE1LjMxYy03LjA5LDAtNy4xOC4xMS03LjE4LDcuMjhWODU3LjUzYzAsMi4zMS4yMiw0LjY0LTEuMDYsNi43NVoiLz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0uMDcsMzI5LjY3di01LjJRLjA3LDI1My4yNCwwLDE4MmMwLTMuNDEsMS01LjMsNC03LjA2UTE1Mi44NCw4OC4xMiwzMDEuNTEsMWMzLjE3LTEuODUsNS4wOS0uODYsNy41Ny41OVE0NDMuNjksODAuMzMsNTc4LjMxLDE1OWM5LjA1LDUuMjksMTgsMTAuNywyNy4xOCwxNS43OSwyLjgzLDEuNTcsNCwzLjI3LDQsNi41OXEtLjE4LDcxLjc1LS4wOSwxNDMuNDdjMCw1LjE5LDAsNS4xOS00Ljc0LDIuNDRRNDU2LjQ0LDI0MC43MSwzMDguMzIsMTU0Yy0zLjE3LTEuODYtNS4yOC0xLjM4LTguMDkuMjZRMTU0LjM0LDIzOS42Nyw4LjM3LDMyNUM1Ljk0LDMyNi4zOSwzLjQ3LDMyNy43NS4wNywzMjkuNjdaIi8+PC9nPjwvZz48L3N2Zz4=',
        6
    );
}
add_action( 'admin_menu', 'hostfullywl_register_page' );

/**
 * Register the admin settings page.
 */
function hostfullywl_admin_page() { 
    
    // Add all the inline javascript
    hostfully_admin_page_js();

    ?>
    <div class="wrap">
        <h1>Hostfully White Labelling</h1>
        <form method="post" action="options.php">
            <?php
                settings_fields( 'hostfullywl_options' );
                do_settings_sections( 'hostfullywl_options' );

                for ($i=0; $i<6; $i++) {
                    echo '<input type="hidden" id="editor-input-'.$i.'-html" name="hostfullywl_editor_'.$i.'_html" value="'.get_option('hostfullywl_editor_'.$i.'_html').'">';
                    echo '<input type="hidden" id="editor-input-'.$i.'-css" name="hostfullywl_editor_'.$i.'_css" value="'.get_option('hostfullywl_editor_'.$i.'_css').'">';
                    echo '<input type="hidden" id="editor-input-'.$i.'-javascript" name="hostfullywl_editor_'.$i.'_javascript" value="'.get_option('hostfullywl_editor_'.$i.'_javascript').'">';
                }
            ?>
            <div id="editor-grid">
            
                <div id="editor-preview">
                    <div class="editor-preview-window">
                        <iframe id="editor-preview-frame" style="width: 100%; height: 100%;"></iframe>
                    </div>
                </div>

                <div id="editor-tools">
                    <div class="editor-tabs">
                        <a id="editor-start-tab" href="#" class="active" onclick="setTab(this, 0)">Header</a>
                        <a href="#" onclick="setTab(this, 1)">Footer</a>
                        <a href="#" onclick="setTab(this, 2)">Home Page</a>
                        <a href="#" onclick="setTab(this, 3)">Search Page</a>
                        <a href="#" onclick="setTab(this, 4)">Property Page</a>
                        <a href="#" onclick="setTab(this, 5)">Global</a>
                    </div>
                    <div id="editor-panel-code" class="editor-panel active">
                        <div class="editor-col">
                            <h2>HTML</h2>
                            <div id="editor-html" class="editor-code" data-mode="html"></div>
                        </div>
                        <div class="editor-col">
                            <h2>CSS</h2>
                            <div id="editor-css" class="editor-code" data-mode="css"></div>
                        </div>
                        <div class="editor-col">
                            <h2>Javascript</h2>
                            <div id="editor-javascript" class="editor-code" data-mode="javascript"></div>
                        </div>
                    </div>
                    <div id="editor-panel-export" class="editor-panel">
                        <div class="editor-col">
                            <h2>META HTML</h2>
                            <textarea id="meta-export" readonly onfocus="this.select()"></textarea>
                        </div>
                        <div class="editor-col">
                            <h2>HEADER HTML</h2>
                            <textarea id="header-export" readonly onfocus="this.select()"></textarea>
                        </div>
                        <div class="editor-col">
                            <h2>FOOTER HTML</h2>
                            <textarea id="footer-export" readonly onfocus="this.select()"></textarea>
                        </div>
                    </div>
                </div>

            </div>

            <input type="submit" name="submit" id="submit" class="button button-primary" value="Save Changes">
            <input type="submit" name="submit" id="submit" class="button button-secondary" value="Export" onclick="event.preventDefault(); setExport();">
        </form>
    </div>

<?php
}

/**
 * Inline javascript for the editor page.
 *
 * @return void
 */
function hostfully_admin_page_js() { ?>

    <script>

    // Hostfully default style
    var previewStyle = `<?php echo plugins_url('css/hostfully.css', __FILE__); ?>`;

    // Some common fixes
    var globalStyle = `<?php echo file_get_contents(plugins_url('css/global.css', __FILE__)); ?>`;

    // Hostfully scripts
    var previewJs = `<?php echo plugins_url('js/jquery.js', __FILE__); ?>`;

    // Preview page layouts
    var previewTemplates = [
        null,
        null,
        `<?php echo file_get_contents(plugins_url('inc/home.html', __FILE__)); ?>`,
        `<?php echo file_get_contents(plugins_url('inc/search.html', __FILE__)); ?>`,
        `<?php echo file_get_contents(plugins_url('inc/property.html', __FILE__)); ?>`,
        null
    ];

    // Create data objects for editors
    var editors = [];
    <?php for ($i=0; $i<6; $i++) { ?>
        editors.push({
            html: `<?php echo get_option('hostfullywl_editor_'.$i.'_html'); ?>`,
            css: `<?php echo get_option('hostfullywl_editor_'.$i.'_css'); ?>`,
            javascript: `<?php echo get_option('hostfullywl_editor_'.$i.'_javascript'); ?>`
        });
    <?php } ?>

    </script>

<?php
}