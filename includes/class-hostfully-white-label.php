<?php

/**
 * The core plugin class.
 *
 * This is used to define internationalization, admin-specific hooks, and
 * public-facing site hooks.
 *
 * Also maintains the unique identifier of this plugin as well as the current
 * version of the plugin.
 *
 * @since      1.0.0
 * @package    hostfully-white-label
 * @subpackage hostfully-white-label/includes
 * @author     Michael Dearman <https://github.com/mickeyuk>
 */
class Hostfully_Whitelabel {

    /**
     * The assets directory.
     *
     * @var [type]
     */
    public $dir_assets;

    /**
     * The loader that's responsible for maintaining and registering all hooks that power
     * the plugin.
     * @since    1.0.0
     * @access   protected
    **/
    public function run() {

        $this->dir_assets = plugins_url() . '/hostfully-white-label/assets/';

        add_action( 'admin_init', array($this, 'register_settings'));
        add_action( 'admin_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_action( 'admin_menu', array($this, 'register_pages'));

    }

    /**
     * Enqueues all the scripts and stylesheets needed for the plugin.
     *
     * @return void
     */
    public function enqueue_scripts() {

        // Only load on the plugin page
        $current_screen = get_current_screen();
        if ( strpos($current_screen->base, 'hostfully-white-label') === false) {
            return;
        }

        // Plugin scripts
        wp_enqueue_style('hostfullywl_css', plugins_url('../assets/css/app.css', __FILE__) );
        //wp_enqueue_script('hostfullywl_js', plugins_url('../assets/js/app.js', __FILE__), array( 'jquery', 'wp-api'), '1.0.0', false  );
        wp_enqueue_script('hostfullywl_js', plugins_url('../assets/js/app.js', __FILE__), array( 'jquery'), '1.0.0', false  );

        // Editor scripts
        wp_enqueue_script('ace', plugin_dir_url( __FILE__ ) . '../assets/js/vendor/ace.js');
        wp_enqueue_script('ace-language-tools', plugin_dir_url( __FILE__ ) . '../assets/js/vendor/ext-language_tools.js');
        wp_enqueue_script('ace-theme', plugin_dir_url( __FILE__ ) . '../assets/js/vendor/theme-chrome.js');

        wp_enqueue_script('ace-mode-css', plugin_dir_url( __FILE__ ) . '../assets/js/vendor/mode-css.js');
        wp_enqueue_script('ace-mode-html', plugin_dir_url( __FILE__ ) . '../assets/js/vendor/mode-html.js');
        wp_enqueue_script('ace-mode-javascript', plugin_dir_url( __FILE__ ) . '../assets/js/vendor/mode-javascript.js');

        wp_enqueue_script('ace-worker-css', plugin_dir_url( __FILE__ ) . '../assets/js/vendor/worker-css.js');
        wp_enqueue_script('ace-worker-html', plugin_dir_url( __FILE__ ) . '../assets/js/vendor/worker-html.js');
        wp_enqueue_script('ace-worker-javascript', plugin_dir_url( __FILE__ ) . '../assets/js/vendor/worker-javascript.js');

        // CSS parser
        wp_enqueue_script('css-parser', plugin_dir_url( __FILE__ ) . '../assets/js/vendor/css.min.js');

        // Javascript Validator
        wp_enqueue_script('js-validator', plugin_dir_url( __FILE__ ) . '../assets/js/vendor/jshint.js');

    }

    /**
     * Registers the custom settings.
     *
     * @return void
     */
    public function register_settings() {

        // Editor instance values
        register_setting( 'hostfullywl_options', 'hostfullywl_editor_instance_id' );
        for ($i=0; $i<6; $i++) {
            register_setting( 'hostfullywl_options', 'hostfullywl_editor_'.$i.'_html' );
            register_setting( 'hostfullywl_options', 'hostfullywl_editor_'.$i.'_css' );
            register_setting( 'hostfullywl_options', 'hostfullywl_editor_'.$i.'_javascript' );
        }

    }

    /**
     * Registers all the dashboard pages.
     *
     * @return void
     */
    public function register_pages() {

        // Register the editor page
        add_menu_page(
            __( 'Custom Menu Title', 'textdomain' ),
            'White Label',
            'manage_options',
            'hostfully-white-label',
            array($this, 'render_editor_page'),
            'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MDkuNDQgODY0LjI4Ij48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6I2ZmZjt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPkFzc2V0IDE8L3RpdGxlPjxnIGlkPSJMYXllcl8yIiBkYXRhLW5hbWU9IkxheWVyIDIiPjxnIGlkPSJMYXllcl8xLTIiIGRhdGEtbmFtZT0iTGF5ZXIgMSI+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNNjIuMDcsODY0LjI4Yy0xLjA2LTItMS00LjEtMS02LjI2UTYxLDYzOCw2MSw0MThjMC0zLjg2LDEuMzQtNiw0LjU1LTcuOTNRMTMzLjEsMzY5LDIwMC42LDMyNy42NWMxLjc1LTEuMDcsMy40Ni0zLjE2LDUuODItMS44OSwyLjYsMS40MSwxLjY4LDQuMTQsMS42OCw2LjM1cTAsMTA5LDAsMjE4YzAsNy41NCwwLDcuNTUsNy40MSw3LjU1cTkzLjc1LDAsMTg3LjQ5LjEyYzUsMCw1LjkyLTEuNDUsNS45MS02LjEzcS0uMjItMTA5LjI0LS4xLTIxOC40OWE0Miw0MiwwLDAsMSwuMDctNC40OWMuMzItMy4xOSwyLTQsNC44NC0yLjU1Ljg4LjQ1LDEuNzMsMSwyLjU4LDEuNVE0ODMuNjQsMzY4Ljc3LDU1MSw0MDkuODNjMy43OSwyLjMsNS4wOSw0LjgyLDUuMDksOS4xOHEtLjE3LDIxOS0uMDksNDM4YzAsMi40OC4xLDQuOTUtLjkyLDcuM2gtMTQ1Yy0xLjYyLTIuMTktMS4yMy00Ljc0LTEuMjMtNy4yMXEwLTc1LjkzLDAtMTUxLjg2YzAtNy4xOS0uMTItNy4zMi03LjE5LTcuMzJIMjE1LjMxYy03LjA5LDAtNy4xOC4xMS03LjE4LDcuMjhWODU3LjUzYzAsMi4zMS4yMiw0LjY0LTEuMDYsNi43NVoiLz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0uMDcsMzI5LjY3di01LjJRLjA3LDI1My4yNCwwLDE4MmMwLTMuNDEsMS01LjMsNC03LjA2UTE1Mi44NCw4OC4xMiwzMDEuNTEsMWMzLjE3LTEuODUsNS4wOS0uODYsNy41Ny41OVE0NDMuNjksODAuMzMsNTc4LjMxLDE1OWM5LjA1LDUuMjksMTgsMTAuNywyNy4xOCwxNS43OSwyLjgzLDEuNTcsNCwzLjI3LDQsNi41OXEtLjE4LDcxLjc1LS4wOSwxNDMuNDdjMCw1LjE5LDAsNS4xOS00Ljc0LDIuNDRRNDU2LjQ0LDI0MC43MSwzMDguMzIsMTU0Yy0zLjE3LTEuODYtNS4yOC0xLjM4LTguMDkuMjZRMTU0LjM0LDIzOS42Nyw4LjM3LDMyNUM1Ljk0LDMyNi4zOSwzLjQ3LDMyNy43NS4wNywzMjkuNjdaIi8+PC9nPjwvZz48L3N2Zz4=',
        );

    }

    /**
     * Displays the admin editor page.
     *
     * @return void
     */
    public function render_editor_page() {

        // Partial
        require_once( plugin_dir_path( __FILE__ ) . '../partials/admin-editor.php' );

    }

}