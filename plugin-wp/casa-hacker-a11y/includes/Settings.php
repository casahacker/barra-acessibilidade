<?php
/**
 * Página de configuração em Settings → Acessibilidade.
 *
 * @package casa-hacker-a11y
 */

if (!defined('ABSPATH')) {
    exit;
}

add_action('admin_menu', function () {
    add_options_page(
        __('Acessibilidade', 'casa-hacker-a11y'),
        __('Acessibilidade', 'casa-hacker-a11y'),
        'manage_options',
        'ch-a11y-settings',
        'ch_a11y_render_settings_page'
    );
});

add_action('admin_init', function () {
    register_setting('ch_a11y_settings_group', 'ch_a11y_opts', [
        'type'              => 'array',
        'sanitize_callback' => 'ch_a11y_sanitize_opts',
        'default'           => [
            'enableVLibras' => true,
            'storagePrefix' => 'a11y-',
            'classPrefix'   => 'ch-a11y-',
        ],
    ]);

    add_settings_section(
        'ch_a11y_main_section',
        __('Configurações da Barra', 'casa-hacker-a11y'),
        function () {
            echo '<p>' . esc_html__('Customize o comportamento da barra de acessibilidade. As mudanças se aplicam ao frontend.', 'casa-hacker-a11y') . '</p>';
        },
        'ch-a11y-settings'
    );

    add_settings_field(
        'enableVLibras',
        __('Botão Libras (VLibras)', 'casa-hacker-a11y'),
        function () {
            $opts = get_option('ch_a11y_opts', []);
            $checked = !empty($opts['enableVLibras']) ? 'checked' : '';
            echo '<label><input type="checkbox" name="ch_a11y_opts[enableVLibras]" value="1" ' . esc_attr($checked) . '> ' .
                esc_html__('Habilita o botão Libras (carrega o widget VLibras do governo on-demand).', 'casa-hacker-a11y') .
                '</label>';
        },
        'ch-a11y-settings',
        'ch_a11y_main_section'
    );

    add_settings_field(
        'storagePrefix',
        __('Prefixo localStorage', 'casa-hacker-a11y'),
        function () {
            $opts = get_option('ch_a11y_opts', []);
            $val = !empty($opts['storagePrefix']) ? $opts['storagePrefix'] : 'a11y-';
            echo '<input type="text" name="ch_a11y_opts[storagePrefix]" value="' . esc_attr($val) . '" class="regular-text">';
            echo '<p class="description">' . esc_html__('Prefixo das chaves no localStorage (default: a11y-).', 'casa-hacker-a11y') . '</p>';
        },
        'ch-a11y-settings',
        'ch_a11y_main_section'
    );

    add_settings_field(
        'classPrefix',
        __('Prefixo de classes CSS', 'casa-hacker-a11y'),
        function () {
            $opts = get_option('ch_a11y_opts', []);
            $val = !empty($opts['classPrefix']) ? $opts['classPrefix'] : 'ch-a11y-';
            echo '<input type="text" name="ch_a11y_opts[classPrefix]" value="' . esc_attr($val) . '" class="regular-text">';
            echo '<p class="description">' . esc_html__('Prefixo das classes aplicadas no <html> (default: ch-a11y-).', 'casa-hacker-a11y') . '</p>';
        },
        'ch-a11y-settings',
        'ch_a11y_main_section'
    );
});

function ch_a11y_sanitize_opts($input): array
{
    $out = [];
    $out['enableVLibras'] = !empty($input['enableVLibras']);
    $out['storagePrefix'] = isset($input['storagePrefix']) ? sanitize_text_field($input['storagePrefix']) : 'a11y-';
    $out['classPrefix']   = isset($input['classPrefix']) ? sanitize_text_field($input['classPrefix']) : 'ch-a11y-';
    return $out;
}

function ch_a11y_render_settings_page(): void
{
    if (!current_user_can('manage_options')) {
        return;
    }
    ?>
    <div class="wrap">
        <h1><?php echo esc_html__('Barra de Acessibilidade — Casa Hacker', 'casa-hacker-a11y'); ?></h1>
        <p><?php echo esc_html__('Doação da Casa Hacker ao ecossistema brasileiro de acessibilidade web.', 'casa-hacker-a11y'); ?></p>
        <form method="post" action="options.php">
            <?php
            settings_fields('ch_a11y_settings_group');
            do_settings_sections('ch-a11y-settings');
            submit_button();
            ?>
        </form>
        <hr>
        <h2><?php echo esc_html__('Sobre o VLibras', 'casa-hacker-a11y'); ?></h2>
        <p>
            <?php echo esc_html__('O widget VLibras é mantido pela Secretaria de Governo Digital (Brasil) e Universidade Federal da Paraíba. Licença: LGPL v3.', 'casa-hacker-a11y'); ?>
            <a href="https://vlibras.gov.br/" target="_blank" rel="noopener">vlibras.gov.br</a>
        </p>
    </div>
    <?php
}
