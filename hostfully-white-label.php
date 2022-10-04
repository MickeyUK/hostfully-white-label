<?php

/**
 * @link              https://mickeyuk.github.io
 * @since             1.0.2
 * @package           HCS_Hostfully_Whitelabel
 *
 * @wordpress-plugin
 * Plugin Name:       Hostfully White Labelling for WordPress
 * Plugin URI:        https://mickeyuk.github.io
 * Description:       An editor for creating white label code for Hostfully. This plugin is a pre-release and some features may not yet be implemented.
 * Version:           1.0.1 [PRE-RELEASE]
 * Author:            Michael Dearman
 * Author URI:        https://mickeyuk.github.io
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       hcs-hostfully
 * Domain Path:       /languages
*/

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

require_once plugin_dir_path( __FILE__ ) . 'includes/class-hostfully-white-label.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_hostfully_wl() {

	$plugin = new Hostfully_Whitelabel();
	$plugin->run();

}
run_hostfully_wl();