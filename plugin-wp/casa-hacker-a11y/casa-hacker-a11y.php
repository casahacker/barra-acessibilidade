<?php
/**
 * Plugin Name: Casa Hacker — Barra de Acessibilidade
 * Plugin URI: https://github.com/casahacker/barra-acessibilidade
 * Description: Barra fixa com 12 features de acessibilidade (WCAG-aligned) + integração VLibras (governo BR). Sem dependências externas, ~15KB gzip.
 * Version: 0.1.0
 * Requires at least: 6.0
 * Requires PHP: 7.4
 * Author: Casa Hacker
 * Author URI: https://github.com/casahacker
 * License: Casa Hacker License
 * License URI: https://github.com/casahacker/barra-acessibilidade/blob/main/LICENSE
 * Text Domain: casa-hacker-a11y
 *
 * Copyright (c) 2026 Casa Hacker
 */

if (!defined('ABSPATH')) {
    exit;
}

define('CH_A11Y_VERSION', '0.1.0');
define('CH_A11Y_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('CH_A11Y_PLUGIN_URL', plugin_dir_url(__FILE__));

require_once CH_A11Y_PLUGIN_DIR . 'includes/Settings.php';

/**
 * Enfileira CSS + JS no frontend (não no admin).
 */
add_action('wp_enqueue_scripts', function () {
    wp_enqueue_style(
        'ch-a11y',
        CH_A11Y_PLUGIN_URL . 'assets/bar.css',
        [],
        CH_A11Y_VERSION
    );
    wp_enqueue_script(
        'ch-a11y',
        CH_A11Y_PLUGIN_URL . 'assets/bar.iife.js',
        [],
        CH_A11Y_VERSION,
        true
    );
});

/**
 * Injeta o root + inicializa o widget no footer com as opções configuradas.
 */
add_action('wp_footer', function () {
    $opts = get_option('ch_a11y_opts', []);
    $defaults = [
        'enableVLibras' => true,
        'storagePrefix' => 'a11y-',
        'classPrefix'   => 'ch-a11y-',
    ];
    $merged = wp_parse_args($opts, $defaults);

    echo '<div id="ch-a11y-root"></div>' . "\n";
    echo '<script>' .
        'window.addEventListener("DOMContentLoaded",function(){' .
            'if(window.CasaHackerA11y){window.CasaHackerA11y.mount(' .
                wp_json_encode($merged) .
            ');}' .
        '});' .
    '</script>' . "\n";
});

/**
 * Activation: define defaults se nada existir.
 */
register_activation_hook(__FILE__, function () {
    if (false === get_option('ch_a11y_opts')) {
        add_option('ch_a11y_opts', [
            'enableVLibras' => true,
            'storagePrefix' => 'a11y-',
            'classPrefix'   => 'ch-a11y-',
        ]);
    }
});
