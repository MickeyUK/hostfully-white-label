/**
 * Selected tab index.
 */
var activeTab = 0;

/**
 * All the Ace editors.
 */
var editorInstances = [];

/**
 * All the merged custom CSS.
 */
var mergedCSS;

/**
 * All the merged custom Javascript.
 */
var mergedJS;

/**
 * Merged header HTML.
 */
var headerHTML;

/**
 * Merged footer HTML.
 */
var footerHTML;

/**
 * Initializes the admin page.
 */
jQuery(document).ready(function () {

    // Set image path
    for (var i = 0; i < previewTemplates.length; i++) {
        if (previewTemplates[i] != null) {
            previewTemplates[i] = previewTemplates[i].replace(/IMAGE_PATH/g, imagePath);
        }
    }

    // Decode saved HTML
    for (var i = 0; i < editors.length; i++) {
        if (editors[i] != null) {
            editors[i].html = htmlDecode(editors[i].html);
            editors[i].css = htmlDecode(editors[i].css);
            editors[i].javascript = editors[i].javascript;
        }
    }

    // Set preview CSS
    jQuery('#editor-preview-frame').contents().find('head').append(`<link rel="stylesheet" href="${previewStyle}" type="text/css" />`);

    // Add scripts
    jQuery('#editor-preview-frame').contents().find('head').append(`<script src="${previewJs}" type="text/javascript"></script>`);
   
    // Initialize Ace editor instances
    initEditor();

    // Default tab
    setTab(jQuery('#editor-start-tab'), 0);

});

/**
 * Toggle editor tab
 */
function setTab(link, tabIndex) {

    // Set the active tab
    activeTab = tabIndex;

    // Toggle editor and export panels
    jQuery('#editor-panel-code').addClass('active');
    jQuery('#editor-panel-export').removeClass('active');
    jQuery('.editor-tabs a').removeClass('active');
    jQuery(link).addClass('active');

    // Update editor instances
    for (var i = 0; i < editorInstances.length; i++) {
        var editor = editorInstances[i];
        var mode = editor.session.$modeId;
        mode = mode.substr(mode.lastIndexOf('/') + 1);
        editor.setValue(editors[activeTab][mode]);
    }

    // Update everything
    update();

}

/**
 * This will update the preview window and generated code.
 */
function update() {

    // Set template
    var template = (previewTemplates[activeTab] != null ? previewTemplates[activeTab] : previewTemplates[3]);
    jQuery("#editor-preview-frame").contents().find('body').html(template);

    // Prepend meta
    jQuery("#editor-preview-frame").contents().find('body').html(template);

    // Save editor content
    saveEditors();

    // Merge all the HTML
    updateHTML();

    // Merge all the CSS
    updateCSS();

    // Merge all the Javascript
    updateJS();

    // Adds header to homepage preview
    jQuery("#editor-preview-frame").contents().find('.header-homepage').prepend(headerHTML);

    // Generate export code
    generateExportCode();

}

/**
 * Merges all the HTML.
 */
function updateHTML() {
    
    // Get HTML
    headerHTML = editors[0].html.replace(/\n|\t/g, ' ');
    footerHTML = editors[1].html.replace(/\n|\t/g, ' ');

    // Insert into template
    jQuery("#editor-preview-frame").contents().find('.custom-header').html(headerHTML);
    jQuery("#editor-preview-frame").contents().find('#footer .container').html(footerHTML);

}

/**
 * Merges all the CSS.
 */
function updateCSS() {

    var css = '';

    // Merge CSS
    var css = '';
    for (var i = 0; i < editors.length; i++) {
        css += editors[i].css;
    }

    // Parse CSS
    var parser = new cssjs();
    var parsed = parser.parseCSS(css);

    
    // Add important rule to all custom CSS (Hostfully tries to force some things)
    for (var i = 0; i < parsed.length; i++) {
        if (parsed[i].subStyles != undefined) {

            for (var j = 0; j < parsed[i].subStyles.length; j++) {

                var rules = parsed[i].subStyles[j].rules;
                for (var k = 0; k < rules.length; k++) {
                    var selector = parsed[i].subStyles[j].rules[k];
                    selector.value += ' !important';
                }

            }

        } else {
            var rules = parsed[i].rules;
            for (var j = 0; j < rules.length; j++) {
                var selector = parsed[i].rules[j];
                selector.value += ' !important';
            }
        }
    }

    // Merge CSS
    mergedCSS = minCSS(globalStyle + parser.getCSSForEditor(parsed));

    // Add custom CSS to preview
    jQuery("#editor-preview-frame").contents().find('body').prepend('<style>' + mergedCSS + '</style>');

}

/**
 * This will merge all the JavaScript.
 */
function updateJS() {

    // Merge JS
    var js = '';
    for (var i = 0; i < editors.length; i++) {
        js += editors[i].javascript;
    }

    // Merge javascript
    mergedJS = js;

    // Add to preview (if no errors)
    JSHINT(js);
    if (JSHINT.errors.length == 0) {
        jQuery("#editor-preview-frame").contents().find('body').append('<script>' + js + '</script>');
    }

}

/**
 * Saves content from the active editors.
 */
function saveEditors() {

    // For each CSS editor
    for (var i = 0; i < editorInstances.length; i++) {
        
        // Get editor
        var editor = editorInstances[i];
        var mode = editor.session.$modeId;
        mode = mode.substr(mode.lastIndexOf('/') + 1);

        // Set content
        editors[activeTab][mode] = editor.getValue();

        jQuery('#editor-input-' + activeTab + '-' + mode).val(escapeHTML(editor.getValue()));

    }

}

/**
 * Generates the export code for the white label
 * fields on Hostfully.com.
 */
function generateExportCode() {

    // Meta code
    var metaCode = '';
    metaCode += editors[5].html;
    metaCode += `<style>${mergedCSS}</style>`;

    jQuery('#meta-export').html(escapeHTML(metaCode));

    // Header code
    var headerCode = '';
    headerCode += headerHTML;

    jQuery('#header-export').html(escapeHTML(headerCode));

    // Footer code
    var footerCode = '';
    footerCode += footerHTML;
    footerCode += `<script>${mergedJS} $(document).ready(function(){$('.header-homepage').prepend(\`${headerHTML}\`);});</script>`;

    jQuery('#footer-export').html(escapeHTML(footerCode));

}

/**
 * Toggle export options
 */
function setExport() {
    jQuery('.editor-tabs a').removeClass('active');
    jQuery('#editor-panel-code').removeClass('active');
    jQuery('#editor-panel-export').addClass('active');
}

/**
 * Initializes the Ace editor.
 */
function initEditor() {

    // For each editor element
    jQuery('.editor-code').each(function () {
      
        // Create editor instance
        var id = jQuery(this).attr('id');
        var editor = ace.edit(id);
        var mode = jQuery(this).data('mode');
        editorInstances.push(editor);

        // Set theme
        editor.setTheme("ace/theme/chrome");
        
        // Set language mode
        editor.session.setMode("ace/mode/" + mode);

        // Set default value
        editor.setValue(editors[activeTab][mode]);

        // Update preview
        editor.on("input", function (event) {
            update();
        });
  
    });
  
}

/**
 * Minimizes CSS.
 * 
 * @param {*} _content 
 * @returns 
 */
function minCSS(_content) {
    var content = _content;
    content = content.replace( /\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, '' );
    content = content.replace( / {2,}/g, ' ' );
    content = content.replace( / ([{:}]) /g, '$1' );
    content = content.replace( /([;,]) /g, '$1' );
    content = content.replace( / !/g, '!' );
    return content;
}

/**
 * Escape HTML for inserting in to textarea.
 * 
 * @param {*} unsafe 
 * @returns 
 */
function escapeHTML(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/\\/g, "&#92;")
        .replace(/'/g, "&#039;");
}

/**
 * Unescape HTML for inserting in to textarea.
 * 
 * @param {*} input 
 * @returns 
 */
function htmlDecode(input) {
    var e = document.createElement('textarea');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}