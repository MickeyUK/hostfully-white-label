<div class="wrap">
    <form method="post" action="options.php">
        <?php
            settings_fields( 'hostfullywl_options' );
            do_settings_sections( 'hostfullywl_options' );

            // ACE Editor code
            for ($i=0; $i<6; $i++) {
                echo '<input type="hidden" id="editor-input-'.$i.'-html" name="hostfullywl_editor_'.$i.'_html">';
                echo '<input type="hidden" id="editor-input-'.$i.'-css" name="hostfullywl_editor_'.$i.'_css">';
                echo '<input type="hidden" id="editor-input-'.$i.'-javascript" name="hostfullywl_editor_'.$i.'_javascript">';
            }
        ?>

        <div id="editor-grid">
        
            <div id="editor-preview">
                <div class="editor-preview-window">
                    <iframe id="editor-preview-frame" style="width: 100%; height: 100%;"></iframe>
                </div>
                <div id="editor-info">
                    <span id="editor-size">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6.426 10.668l-3.547-3.547-2.879 2.879v-10h10l-2.879 2.879 3.547 3.547-4.242 4.242zm11.148 2.664l3.547 3.547 2.879-2.879v10h-10l2.879-2.879-3.547-3.547 4.242-4.242zm-6.906 4.242l-3.547 3.547 2.879 2.879h-10v-10l2.879 2.879 3.547-3.547 4.242 4.242zm2.664-11.148l3.547-3.547-2.879-2.879h10v10l-2.879-2.879-3.547 3.547-4.242-4.242z"/></svg>
                        <span></span>
                    </span>
                    <span id="editor-inspector">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M23.809 21.646l-6.205-6.205c1.167-1.605 1.857-3.579 1.857-5.711 0-5.365-4.365-9.73-9.731-9.73-5.365 0-9.73 4.365-9.73 9.73 0 5.366 4.365 9.73 9.73 9.73 2.034 0 3.923-.627 5.487-1.698l6.238 6.238 2.354-2.354zm-20.955-11.916c0-3.792 3.085-6.877 6.877-6.877s6.877 3.085 6.877 6.877-3.085 6.877-6.877 6.877c-3.793 0-6.877-3.085-6.877-6.877z"/></svg>
                        <span></span>
                    </span>
                </div>
            </div>

            <div id="editor-tools">
                <div id="editor-tabs" class="editor-tabs">
                </div>
                <div id="editor-pills" class="editor-pills">
                </div>

                <div id="editor-panel-code" class="editor-panel active">
                    <div class="editor-col">
                        <h2>
                            HTML
                            <a href="#TB_inline?width=600&height=550&inlineId=modal-html-id" class="thickbox">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1.25 17c0 .69-.559 1.25-1.25 1.25-.689 0-1.25-.56-1.25-1.25s.561-1.25 1.25-1.25c.691 0 1.25.56 1.25 1.25zm1.393-9.998c-.608-.616-1.515-.955-2.551-.955-2.18 0-3.59 1.55-3.59 3.95h2.011c0-1.486.829-2.013 1.538-2.013.634 0 1.307.421 1.364 1.226.062.847-.39 1.277-.962 1.821-1.412 1.343-1.438 1.993-1.432 3.468h2.005c-.013-.664.03-1.203.935-2.178.677-.73 1.519-1.638 1.536-3.022.011-.924-.284-1.719-.854-2.297z"/></svg>
                            </a>
                        </h2>
                        <div id="editor-html" class="editor-code" data-mode="html"></div>
                    </div>
                    <div class="editor-col">
                        <h2>
                            CSS
                            <a href="#" class="thickbox">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1.25 17c0 .69-.559 1.25-1.25 1.25-.689 0-1.25-.56-1.25-1.25s.561-1.25 1.25-1.25c.691 0 1.25.56 1.25 1.25zm1.393-9.998c-.608-.616-1.515-.955-2.551-.955-2.18 0-3.59 1.55-3.59 3.95h2.011c0-1.486.829-2.013 1.538-2.013.634 0 1.307.421 1.364 1.226.062.847-.39 1.277-.962 1.821-1.412 1.343-1.438 1.993-1.432 3.468h2.005c-.013-.664.03-1.203.935-2.178.677-.73 1.519-1.638 1.536-3.022.011-.924-.284-1.719-.854-2.297z"/></svg>
                            </a>
                        </h2>
                        <div id="editor-css" class="editor-code" data-mode="css"></div>
                    </div>
                    <div class="editor-col">
                        <h2>
                            Javascript
                            <a href="#" class="thickbox">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1.25 17c0 .69-.559 1.25-1.25 1.25-.689 0-1.25-.56-1.25-1.25s.561-1.25 1.25-1.25c.691 0 1.25.56 1.25 1.25zm1.393-9.998c-.608-.616-1.515-.955-2.551-.955-2.18 0-3.59 1.55-3.59 3.95h2.011c0-1.486.829-2.013 1.538-2.013.634 0 1.307.421 1.364 1.226.062.847-.39 1.277-.962 1.821-1.412 1.343-1.438 1.993-1.432 3.468h2.005c-.013-.664.03-1.203.935-2.178.677-.73 1.519-1.638 1.536-3.022.011-.924-.284-1.719-.854-2.297z"/></svg>
                            </a>
                        </h2>
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

                <div id="editor-panel-settings" class="editor-panel">
                    <div class="editor-col">
                        <div class="form-group">
                            <label>Template</label>
                            <div style="display: flex; gap: 5px;">
                                <select class="regular-text">
                                    <option>Hello</option>
                                </select>
                                <a href="#" id="editor-update-template" title="Load template">
                                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M22 24h-20v-24h8.409c4.857 0 3.335 8 3.335 8 3.009-.745 8.256-.419 8.256 3v13zm-10-10l-1.339-1.674c.404-.203.856-.326 1.339-.326 1.656 0 3 1.345 3 3s-1.344 3-3 3c-1.503 0-2.75-1.108-2.967-2.551l-1.967.367c.39 2.372 2.452 4.184 4.934 4.184 2.76 0 5-2.24 5-5s-2.24-5-5-5c-.957 0-1.845.277-2.605.744l-1.395-1.744-1 5h5zm2.568-13.925c2.201 1.174 5.938 4.884 7.432 6.882-1.286-.9-4.044-1.657-6.091-1.18.222-1.468-.186-4.534-1.341-5.702z"/></svg>
                                </a>
                            </div>
                            <small>This will automatically add some template white label code for tweaking.</small>
                        </div>
                    </div>
                    <div class="editor-col">
                        x
                    </div>
                    <div class="editor-col">
                        x
                    </div>
                </div>

            </div>

        </div>

        <input type="submit" name="submit" id="submit" class="button button-primary" value="Save Changes">
        <input type="submit" name="submit" id="submit" class="button button-secondary" value="Export" onclick="event.preventDefault(); app.setPanel('export');">
    </form>
</div>

<?php add_thickbox(); ?>

<!-- Help Modals -->

<!-- Modal Window -->
<div id="modal-window-id" style="display:none;"></div>

<script>
    
    // Default Hostfully stylesheet URL
    app.urls.css = `<?php echo $this->dir_assets . 'css/hostfully.css'; ?>`;

    // Preview javascript libraries
    app.urls.js = `<?php echo $this->dir_assets . 'js/jquery.js'; ?>`;

    // Preview images directory
    app.urls.images = `<?php echo $this->dir_assets . 'images/'; ?>`;

    // Language directory
    app.urls.lang = `<?php echo $this->dir_assets . 'lang/'; ?>`;

    // Preview page CSS templates
    app.cssTemplates = {<?php
        $files = scandir(WP_PLUGIN_DIR . '/hostfully-white-label/assets/css/templates');
        foreach ($files as $file) {
            if (substr($file, -4) == '.css') {
                echo "'" . substr($file, 0, -4) . "': `" . file_get_contents(WP_PLUGIN_DIR . '/hostfully-white-label/assets/css/templates/' . $file) . "`,\n";
            }
        }
    ?>};

    // Preview page HTML Templates
    app.htmlTemplates = {<?php
        $files = scandir(WP_PLUGIN_DIR . '/hostfully-white-label/assets/html');
        foreach ($files as $file) {
            if (substr($file, -5) == '.html') {
                echo "'" . substr($file, 0, -5) . "': `" . file_get_contents(WP_PLUGIN_DIR . '/hostfully-white-label/assets/html/' . $file) . "`,\n";
            }
        }
    ?>};

    // Get saved data
    <?php for ($i=0; $i<7; $i++) { ?>
        app.data.editors.push({
            html: `<?php echo get_option('hostfullywl_editor_'.$i.'_html'); ?>`,
            css: `<?php echo get_option('hostfullywl_editor_'.$i.'_css'); ?>`,
            javascript: `<?php echo get_option('hostfullywl_editor_'.$i.'_javascript'); ?>`
        });
    <?php } ?>

    // Start the application
    jQuery(document).ready(function() {
        app.init();
    });
</script>