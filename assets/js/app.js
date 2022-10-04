/**
 * Hostfully White Label Editor
 *
 * @link       https://mickeyuk.github.io
 * @since      1.0.0
 */
function app() { }

/**
 * @description Saved data.
 */
app.data = {
    lang: 'en',
    editors: [],
    minCSS: true,
    minHTML: true,
    minJS: true
};

/**
 * @description Application text.
 */
app.lang = {};

/**
 * @description All the ACE editor instances.
 */
app.editors = [];

/**
 * @description All the CSS templates for the editor.
 */
app.cssTemplates = {};

/**
 * @description All the HTML templates for the editor.
 */
app.htmlTemplates = {};

/**
 * @description The URLs for all the editor resources.
 */
app.urls = {
    'images': null,
    'css': null,
    'js': null,
    'lang': null,
};

/**
 * @description The editor tabs and pills.
 */
app.tabs = {};

/**
 * @description The current tab index selected.
 */
app.activeTab = 0;

/**
 * @description The current pill index selected.
 */
app.activePill = 0;

/**
 * @description All the merged white label CSS.
 */
app.mergedCSS = '';

/**
 * @description All the merged white label HTML.
 */
app.mergedHTML = '';

/**
 * @description All the merged white label Javascript.
 */
app.mergedJS = '';

/**
 * @description Preview inspector is active.
 */
app.inspectorActive = false;

/**
 * @description Initialize the editor.
 */
app.init = function () {

    // Fetch language file
    fetch(`${app.urls.lang}/${app.data.lang}.json`)
    .then((res) => res.json())
    .then((translation) => {
        
        // Set language
        app.lang = translation;

        // Set image path for HTML templates
        for (var i in app.htmlTemplates) {
            app.htmlTemplates[i] = app.htmlTemplates[i].replace(/IMAGE_PATH/g, app.urls.images);
        }

        // Decode saved HTML
        for (var i = 0; i < app.data.editors.length; i++) {
            if (app.data.editors[i] != null) {
                app.data.editors[i].html = app.decodeHTML(app.data.editors[i].html);
                app.data.editors[i].css = app.decodeHTML(app.data.editors[i].css);
                app.data.editors[i].javascript = app.decodeHTML(app.data.editors[i].javascript);
            }
        }

        // Insert preview HTML and Javascript
        jQuery('#editor-preview-frame').contents().find('head').append(`<link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap" rel="stylesheet">`);
        jQuery('#editor-preview-frame').contents().find('head').append(`<link rel="stylesheet" href="${app.urls.css}" type="text/css" />`);
        jQuery('#editor-preview-frame').contents().find('head').append(`<script src="${app.urls.js}" type="text/javascript"></script>`);

        // Preview window size
        var editorIframe = document.getElementById('editor-preview-frame').contentWindow;
        jQuery('#editor-size').find('span').text(editorIframe.document.body.clientWidth + 16 + 'px');
        jQuery(editorIframe).on('resize', function () { 
            jQuery('#editor-size').find('span').text(editorIframe.document.body.clientWidth + 16 + 'px');
        });

        // Initialize the ACE editors
        app.initEditor();

        // Initialize the preview inspector
        app.initInspector();

        // Initialize the editor tabs and pills.
        app.initTabs();

        // Create the editor tabs HTML
        app.createTabs();

        // Default to first tab
        app.setTab(0);

    })
    .catch(() => {
        console.error(`Language file could not be loaded. Was the plugin installed correctly?`);
    });

};

/**
 * @description Initialize the ACE Editor instances.
 */
app.initEditor = function () {

    // For each editor container
    jQuery('.editor-code').each(function () {
      
        // Create editor instance
        var id = jQuery(this).attr('id');
        var editor = ace.edit(id);
        var mode = jQuery(this).data('mode');
        app.editors.push(editor);

        // Set theme
        editor.setTheme("ace/theme/chrome");
        
        // Set language mode
        editor.session.setMode("ace/mode/" + mode);

        // Set default value
        editor.setValue(app.data.editors[app.activeTab][mode]);

        // Update preview
        editor.on("input", function (event) {
            app.updateEditor();
        });
  
    });

}

/**
 * @description Initalizes the preview inspector.
 */
app.initInspector = function () {
    jQuery('#editor-preview-frame').on("mouseenter",function(e){
        app.inspectorActive = true;
    });
    jQuery('#editor-preview-frame').on("mouseleave", function (e) {
        app.inspectorActive = false;
        jQuery('#editor-inspector').find('span').text('');
    });

    jQuery("#editor-preview-frame").contents().find('body').mousemove(function (e) {
        if (app.inspectorActive) {

            // Init list
            var elements = [];

            // Get parent element
            var parent = e.target;

            // Add parent to list
            if (parent) {
                elements.push(app.idOrClass(parent));

                // Get childnode ID
                var children = parent.childNodes;
                for (var i = 0; i < children.length; i++) {
                    var child = app.idOrClass(children[i]);
                    if (child) {
                        elements.push(child);
                    }
                }
                elements = elements.filter(function (el) {
                    return el != undefined;
                });
                
                jQuery('#editor-inspector').find('span').text(elements.join(' > '));

            }

        }
    });
}

/**
 * @description Initialize the editor tabs and pills.
 */
app.initTabs = function () {

    // All the available editor tabs
    app.tabs = {
        'header': {
            'title': app._('tabs.header'),
            'editor': true,
            'preview': 'listings',
            'pills': {}
        },
        'footer': {
            'title': app._('tabs.footer'),
            'editor': true,
            'preview': 'listings',
            'pills': {}
        },
        'home': {
            'title': app._('tabs.home'),
            'editor': true,
            'preview': 'home',
            'pills': {}
        },
        'listings': {
            'title': app._('tabs.listings'),
            'editor': true,
            'preview': 'listings',
            'pills': {}
        },
        'property': {
            'title': app._('tabs.property'),
            'editor': true,
            'preview': 'property',
            'pills': {}
        },
        'checkout': {
            'title': app._('tabs.checkout'),
            'editor': true,
            'preview': 'checkout',
            'pills': {}
        },
        'global': {
            'title': app._('tabs.global'),
            'editor': true,
            'preview': 'listings',
            'pills': {}
        },
    };

};

/**
 * @description Creates the HTML for the editor tabs.
 */
app.createTabs = function () {

    // Create tabs
    var i = 0;
    for (var tab in app.tabs) {

        // Create the tab
        var tabElement = document.createElement('a');
        tabElement.setAttribute('href', '#');
        tabElement.innerHTML = app.tabs[tab].title;
        tabElement.setAttribute('onclick', `app.setTab(${i})`);

        jQuery('#editor-tabs').append(tabElement);

        // Create pills
        var pillGroup = document.createElement('div');
        pillGroup.classList.add('editor-pill-group');
        jQuery('#editor-pills').append(pillGroup);

        // Code pill
        var ii = 0;
        if (app.tabs[tab].editor) {
            var pillElement = document.createElement('a');
            pillElement.setAttribute('href', '#');
            pillElement.classList.add('editor-pill');
            pillElement.innerHTML = app._('pills.code');
            pillElement.setAttribute('onclick', `app.setEditor(${i})`);
            pillGroup.appendChild(pillElement);
            ii++;
        }

        // Additional pills
        for (var pill in app.tabs[tab].pills) {

            // Create the pill
            var pillElement = document.createElement('a');
            pillElement.setAttribute('href', '#');
            pillElement.classList.add('editor-pill');
            pillElement.innerHTML = app._(`pills.${pill}`);
            pillElement.setAttribute('onclick', `app.setPill(${ii})`);

            // Add the pill to the group
            pillGroup.appendChild(pillElement);
            ii++;

        }

        if (app.tabs[tab].title == 'Header') {
            tabElement.classList.add('active');
            pillGroup.classList.add('active');
            jQuery('.editor-pill:first-child').addClass('active');
        }

        i++;

    }

}

/**
 * @description Set the active tab.
 * 
 * @param int The tab index.
 */
app.setTab = function (index) {

    // Set active tab
    app.setPanel('code');
    app.activeTab = index;

    // Reset tabs and pills
    jQuery('#editor-tabs a').removeClass('active');
    jQuery('.editor-pill-group').removeClass('active');
    jQuery('.editor-pill-group a').removeClass('active');

    // Set the active tab
    jQuery('#editor-tabs a:nth-child(' + (index + 1) + ')').addClass('active');

    // Set the active pills
    jQuery('.editor-pill-group:nth-child(' + (index + 1) + ')').addClass('active');

    // Set first pill as active
    if (Object.values(app.tabs)[index].editor) {
        app.setEditor(index);
    } else {
        app.setPill(0);
    }

    // Update the editor and preview
    app.updateEditor();

}

/**
 * @description Set the active pill.
 * 
 * @param int The tab index.
 */
app.setPill = function (index) {

    // Set active pill
    app.activePill = index;

    // Reset pills
    jQuery('.editor-pill-group a').removeClass('active');

    // Set the first pill as active
    jQuery('.editor-pill-group:nth-child(' + (app.activeTab + 1) + ') a:nth-child(' + (index + 1) + ')').addClass('active');

}

/**
 * @description Set the active editor panel.
 * 
 * @param string name   The name of the editor panel.
 */
app.setPanel = function (name) {

    // Reset panels
    jQuery('.editor-panel').removeClass('active');
    jQuery('#editor-tabs a').removeClass('active');

    // Set the active panel
    jQuery(`#editor-panel-${name}`).addClass('active');

}

/**
 * @description Set the active pill.
 * 
 * @param int The tab index.
 */
app.setEditor = function (index) {

    // Reset pills
    jQuery('.editor-pill-group a').removeClass('active');
    jQuery('.editor-pill-group:nth-child(' + (app.activeTab + 1) + ') a:first-child').addClass('active');

    // Update editor instances
    for (var i = 0; i < app.editors.length; i++) {

        // Get editor
        var editor = app.editors[i];
        var mode = editor.session.$modeId;
        mode = mode.substr(mode.lastIndexOf('/') + 1);

        // Set content
        app.data.editors[app.activeTab][mode] = editor.setValue(app.data.editors[app.activeTab][mode]);

    }

}

/**
 * @description When active ACE editor is changed, 
 *              update the preview and save to data object.
 */
app.updateEditor = function () {

    // For each ACE editor
    for (var i = 0; i < app.editors.length; i++) {
        
        // Get editor
        var editor = app.editors[i];
        var mode = editor.session.$modeId;
        mode = mode.substr(mode.lastIndexOf('/') + 1);

        // Set content
        app.data.editors[app.activeTab][mode] = editor.getValue();

    }

    // Update form elements
    for (var i = 0; i < app.data.editors.length; i++) {
        jQuery('#editor-input-' + i + '-html').val(app.escapeHTML(app.data.editors[i].html));
        jQuery('#editor-input-' + i + '-css').val(app.escapeHTML(app.data.editors[i].css));
        jQuery('#editor-input-' + i + '-javascript').val(app.escapeHTML(app.data.editors[i].javascript));
    }

    // Merge everything
    app.updateCSS();
    app.updateJS();

    // Insert preview template into the preview
    app.updatePreview();

    // Update export code
    app.updateExport();

}

/**
 * @description Merges all the CSS.
 */
app.updateCSS = function () {

    // Merge all custom CSS
    var css = '';
    for (var i = 0; i < app.data.editors.length; i++) {
        css += app.data.editors[i].css;
    }

    // * CSS Parser
    // * Used to add important rule to everything and check is valid
    var parser = new cssjs();
    var parsed = parser.parseCSS(css);

    // Add important rule to all custom CSS (Hostfully tries to force some things)
    for (var i = 0; i < parsed.length; i++) {
        if (parsed[i].subStyles != undefined) {

            for (var j = 0; j < parsed[i].subStyles.length; j++) {

                // For each rule
                var rules = parsed[i].subStyles[j].rules;
                for (var k = 0; k < rules.length; k++) {

                    // Override Hostfully's CSS
                    var selector = parsed[i].subStyles[j].rules[k];
                    selector.value += ' !important';

                }

            }

        } else {

            // For each rule
            var rules = parsed[i].rules;
            for (var j = 0; j < rules.length; j++) {

                // Override Hostfully CSS
                var selector = parsed[i].rules[j];
                selector.value += ' !important';

            }

        }
    }

    // * Hostfully's stylesheet will often break stuff
    // * with custom white label code. These are some CSS rules
    // * to help fix things.
    css = this.cssTemplates.fixes;

    // Merge everything
    css += parser.getCSSForEditor(parsed);
    app.mergedCSS = (app.data.minCSS ? app.minCSS(css) : css);

}

/**
 * @description Merges all the custom javascript.
 */
app.updateJS = function () {

    // Inject custom HTML
    // TODO: Injecting custom HTML for specific pages
    app.mergedJS = `$(document).ready(function(){`;
    app.mergedJS += `$('.header-homepage').prepend(\`${app.data.editors[0].html}\`);`;
    app.mergedJS += `});`;

    // Merge all custom Javascript
    var js = '';
    for (var i = 0; i < app.data.editors.length; i++) {
        js += app.data.editors[i].javascript;
    }

    // Check custom javascript is valid
    JSHINT(js);
    if (JSHINT.errors.length == 0) {

        // Merge everything
        app.mergedJS += js;

    }

}

/**
 * @description When active ACE editor is changed, 
 *              update the preview template.
 */
app.updatePreview = function () {

    // Get active preview
    var previewName = app.tabs[Object.keys(app.tabs)[app.activeTab]].preview;
    var previewHTMLTemplate = app.htmlTemplates[previewName];

    // Insert body HTML
    jQuery("#editor-preview-frame").contents().find('body').html(previewHTMLTemplate);

    // Prepend meta HTML
    jQuery("#editor-preview-frame").contents().find('body').prepend(app.data.editors[6].html.replace(/\n|\t/g, ' '));

    // Custom CSS
    jQuery("#editor-preview-frame").contents().find('body').prepend('<style>' + app.mergedCSS + '</style>');

    // Insert header HTML
    jQuery("#editor-preview-frame").contents().find('.custom-header').html(app.data.editors[0].html.replace(/\n|\t/g, ' '));

    // Insert footer HTML and Javascript
    jQuery("#editor-preview-frame").contents().find('#footer .container').html(app.data.editors[1].html.replace(/\n|\t/g, ' ') + `<script>$('body').removeClass(); ${app.mergedJS}</script>`);

}

/**
 * @description Update the merged code export options.
 */
app.updateExport = function () {

    // Meta code
    var metaCode = '';
    metaCode += app.data.editors[6].html;
    metaCode += `<style>${app.mergedCSS}</style>`;

    jQuery('#meta-export').html(app.escapeHTML(metaCode));

    // Header code
    var headerCode = '';
    headerCode += app.data.editors[0].html;
    if (app.data.minHTML) {
        headerCode = headerCode.replace(/\n|\t/g, ' ');
    }

    jQuery('#header-export').html(app.escapeHTML(headerCode));

    // Footer code
    var footerCode = '';
    footerCode += app.data.editors[1].html;
    footerCode += `<script>${app.mergedJS}</script>`;

    jQuery('#footer-export').html(app.escapeHTML(footerCode));

}

/**
 * @description Decode HTML helper.
 * 
 * @param string The HTML to decode.
 * 
 * @returns string
 */
app.decodeHTML = function (input) {
    var e = document.createElement('textarea');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}

/**
 * @description Escape HTML for inserting in to textarea.
 * 
 * @param string The HTML to escape.
 * 
 * @returns string
 */
app.escapeHTML = function (unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/\\/g, "&#92;")
        .replace(/'/g, "&#039;");
}

/**
 * Helper function for minifying CSS.
 * 
 * @param string  CSS 
 * 
 * @returns string
 */
app.minCSS = function(_content) {
    var content = _content;
    content = content.replace( /\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, '' );
    content = content.replace( / {2,}/g, ' ' );
    content = content.replace( / ([{:}]) /g, '$1' );
    content = content.replace( /([;,]) /g, '$1' );
    content = content.replace( / !/g, '!' );
    return content;
}

/**
 * @description Helper functon to return an ID 
 *              or class of an element.
 * 
 * @param HTMLElement element 
 * 
 * @returns string
 */
app.idOrClass = function (element) {
    if ("id" in element === true && element.id.length > 0) {
        return '#' + element.id;
    } else if ("classList" in element === true && element.classList.length > 0) {
        return '.' + element.classList[0];
    }
}

/**
 * Il8n language support.
 * 
 * @param string path   The JSON path.
 * 
 * @returns string|array
 */
app._ = function(path) {

    var keys = path.split(".");
    var text = keys.reduce((obj, i) => obj[i], app.lang);

    return text;

}