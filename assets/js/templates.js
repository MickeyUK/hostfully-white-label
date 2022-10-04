var wlTemplates = {

    header: {
        template: {
            html: ``,
            css: ``,
            javascript: ``
        },
        slideFromRight: {
            html: `<div id="wl-header">
            <div class="wl-container">
                <div class="wl-logo">
                    <img src="/wp-content/plugins/hostfully-white-label/assets/images/placeholder-logo.png">
                </div>
                <div class="wl-nav-toggle">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z"/></svg>
                </div>
                <div id="wl-nav-top" class="wl-nav">
                    <a class="wl-link" href="#">Link</a>
                    <a class="wl-link" href="#">Link</a>
                    <a class="wl-link" href="#">Link</a>
                    <div class="wl-dropdown">
                        <a class="wl-link" href="#">Dropdown</a>
                        <div class="wl-nav">
                            <a class="wl-link" href="#">Link</a>
                            <a class="wl-link" href="#">Link</a>
                            <a class="wl-link" href="#">Link</a>
                        </div>
                    </div>
                    <a class="wl-link" href="#">Link</a>
                    <a class="wl-link" href="#">Link</a>
                </div>
            </div>
        </div>`,
            css: `#wl-header {
                width: 100%;
                padding: 0 20px;
            }
            
            #wl-header > .wl-container {
                display: flex;
                justify-content: space-between;
                width: 100%;
                max-width: 1140px;
                margin: 0 auto;
            }
            
            .wl-nav {
                display: flex;
                align-items: center;
                gap: 20px;
            }
            
            .wl-nav .wl-link {
                text-decoration: none;
                transition: ease all .2s;
            }
            
            .wl-nav .wl-link:hover {
                text-decoration: none;
                transition: ease all .2s;
            }
            
            .wl-dropdown .wl-nav {
                display: none;
                position: relative;
                gap: 10px;
                position: absolute;
                flex-direction: column;
            }
            
            .wl-dropdown .wl-nav.active {
                display: flex;
            }
            
            .wl-dropdown .wl-nav .wl-link {
                text-decoration: none;
                transition: ease all .2s;
            }
            
            .wl-dropdown .wl-nav .wl-link:hover {
                text-decoration: none;
                transition: ease all .2s;
            }
            
            .wl-nav-toggle {
                display: none;
            }
            
            .wl-pushed {
                transform: translateX(-300px);
                overflow: hidden;
            }
            
            .wl-pushed:after {
                content: "";
                position: fixed;
                background: rgba(0,0,0,0.3);
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                z-index: 100;
            }
            
            @media only screen and (max-width: 1200px) {
            
                .wl-nav {
                    display: none;
                }
                
                .wl-nav.active {
                    display: flex;
                }
                
                .wl-nav-toggle {
                    display: flex;
                    align-items: center;
                }
                
                #wl-nav-top.active {
                    position: absolute;
                    width: 300px;
                    right: -300px;
                    height: 100vh;
                    top: 0;
                    flex-direction: column;
                }
                
                .wl-dropdown .wl-nav {
                    display: flex;
                    position: relative;
                    flex-direction: column;
                }
            
            }`,
            javascript: `$('.wl-dropdown').mouseover(function(){
                $(this).find('.wl-nav').addClass('active');
            });
            
            $('.wl-dropdown').mouseleave(function(){
                $(this).find('.wl-nav').removeClass('active');
            });
            
            $('.wl-nav-toggle').click(function(){
                setTimeout(function(){
                    $('html,body').scrollTop(0);
                    $('body').addClass('wl-pushed');
                    $('.wl-nav').addClass('active');
                }, 100);
            });
            
            document.addEventListener('click', function(event) {
                if ($('body').hasClass('wl-pushed')) {
                    event.preventDefault();
                    var hcsMenu = document.getElementById('wl-nav-top');
                    var hcsMenuClicked = hcsMenu.contains(event.target);
                    if (!hcsMenuClicked) {
                        $('.wl-nav').removeClass('active');
                        $('body').removeClass('wl-pushed');
                    }
                }
            });`
        },
        slideFromLeft: {
            html: `<div id="wl-header">
            <div class="wl-container">
                <div class="wl-logo">
                    <img src="/wp-content/plugins/hostfully-white-label/assets/images/placeholder-logo.png">
                </div>
                <div class="wl-nav-toggle">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z"/></svg>
                </div>
                <div id="wl-nav-top" class="wl-nav">
                    <a class="wl-link" href="#">Link</a>
                    <a class="wl-link" href="#">Link</a>
                    <a class="wl-link" href="#">Link</a>
                    <div class="wl-dropdown">
                        <a class="wl-link" href="#">Dropdown</a>
                        <div class="wl-nav">
                            <a class="wl-link" href="#">Link</a>
                            <a class="wl-link" href="#">Link</a>
                            <a class="wl-link" href="#">Link</a>
                        </div>
                    </div>
                    <a class="wl-link" href="#">Link</a>
                    <a class="wl-link" href="#">Link</a>
                </div>
            </div>
        </div>`,
            css: `#wl-header {
                width: 100%;
                padding: 0 20px;
            }
            
            #wl-header > .wl-container {
                display: flex;
                justify-content: space-between;
                width: 100%;
                max-width: 1140px;
                margin: 0 auto;
            }
            
            .wl-nav {
                display: flex;
                align-items: center;
                gap: 20px;
            }
            
            .wl-nav .wl-link {
                text-decoration: none;
                transition: ease all .2s;
            }
            
            .wl-nav .wl-link:hover {
                text-decoration: none;
                transition: ease all .2s;
            }
            
            .wl-dropdown .wl-nav {
                display: none;
                position: relative;
                gap: 10px;
                position: absolute;
                flex-direction: column;
            }
            
            .wl-dropdown .wl-nav.active {
                display: flex;
            }
            
            .wl-dropdown .wl-nav .wl-link {
                text-decoration: none;
                transition: ease all .2s;
            }
            
            .wl-dropdown .wl-nav .wl-link:hover {
                text-decoration: none;
                transition: ease all .2s;
            }
            
            .wl-nav-toggle {
                display: none;
            }
            
            .wl-pushed {
                transform: translateX(300px);
                overflow: hidden;
            }
            
            .wl-pushed:after {
                content: "";
                position: fixed;
                background: rgba(0,0,0,0.3);
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                z-index: 100;
            }
            
            @media only screen and (max-width: 1200px) {
            
                .wl-nav {
                    display: none;
                }
                
                .wl-nav.active {
                    display: flex;
                }
                
                .wl-nav-toggle {
                    display: flex;
                    align-items: center;
                }
                
                #wl-nav-top.active {
                    position: absolute;
                    width: 300px;
                    left: -300px;
                    height: 100vh;
                    top: 0;
                    flex-direction: column;
                }
                
                .wl-dropdown .wl-nav {
                    display: flex;
                    position: relative;
                    flex-direction: column;
                }
            
            }`,
            javascript: `$('.wl-dropdown').mouseover(function(){
                $(this).find('.wl-nav').addClass('active');
            });
            
            $('.wl-dropdown').mouseleave(function(){
                $(this).find('.wl-nav').removeClass('active');
            });
            
            $('.wl-nav-toggle').click(function(){
                setTimeout(function(){
                    $('html,body').scrollTop(0);
                    $('body').addClass('wl-pushed');
                    $('.wl-nav').addClass('active');
                }, 100);
            });
            
            document.addEventListener('click', function(event) {
                if ($('body').hasClass('wl-pushed')) {
                    event.preventDefault();
                    var hcsMenu = document.getElementById('wl-nav-top');
                    var hcsMenuClicked = hcsMenu.contains(event.target);
                    if (!hcsMenuClicked) {
                        $('.wl-nav').removeClass('active');
                        $('body').removeClass('wl-pushed');
                    }
                }
            });`
        },
        fixedSlideFromRight: {
            html: `<div id="wl-header">
            <div class="wl-container">
                <div class="wl-logo">
                    <img src="/wp-content/plugins/hostfully-white-label/assets/images/placeholder-logo.png">
                </div>
                <div class="wl-nav-toggle">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z"/></svg>
                </div>
                <div id="wl-nav-top" class="wl-nav">
                    <a class="wl-link" href="#">Link</a>
                    <a class="wl-link" href="#">Link</a>
                    <a class="wl-link" href="#">Link</a>
                    <div class="wl-dropdown">
                        <a class="wl-link" href="#">Dropdown</a>
                        <div class="wl-nav">
                            <a class="wl-link" href="#">Link</a>
                            <a class="wl-link" href="#">Link</a>
                            <a class="wl-link" href="#">Link</a>
                        </div>
                    </div>
                    <a class="wl-link" href="#">Link</a>
                    <a class="wl-link" href="#">Link</a>
                </div>
            </div>
        </div>`,
            css: `.custom-header {
                height: 100px;
            }
            
            #wl-header {
                width: 100%;
                padding: 0 20px;
                position: fixed;
            }
            
            #wl-header > .wl-container {
                display: flex;
                justify-content: space-between;
                width: 100%;
                max-width: 1140px;
                margin: 0 auto;
            }
            
            .wl-nav {
                display: flex;
                align-items: center;
                gap: 20px;
            }
            
            .wl-nav .wl-link {
                text-decoration: none;
                transition: ease all .2s;
            }
            
            .wl-nav .wl-link:hover {
                text-decoration: none;
                transition: ease all .2s;
            }
            
            .wl-dropdown .wl-nav {
                display: none;
                position: relative;
                gap: 10px;
                position: absolute;
                flex-direction: column;
            }
            
            .wl-dropdown .wl-nav.active {
                display: flex;
            }
            
            .wl-dropdown .wl-nav .wl-link {
                text-decoration: none;
                transition: ease all .2s;
            }
            
            .wl-dropdown .wl-nav .wl-link:hover {
                text-decoration: none;
                transition: ease all .2s;
            }
            
            .wl-nav-toggle {
                display: none;
            }
            
            .wl-pushed {
                transform: translateX(-300px);
                overflow: hidden;
            }
            
            .wl-pushed:after {
                content: "";
                position: fixed;
                background: rgba(0,0,0,0.3);
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                z-index: 100;
            }
            
            @media only screen and (max-width: 1200px) {
            
                .wl-nav {
                    display: none;
                }
                
                .wl-nav.active {
                    display: flex;
                }
                
                .wl-nav-toggle {
                    display: flex;
                    align-items: center;
                }
                
                #wl-nav-top.active {
                    position: absolute;
                    width: 300px;
                    right: -300px;
                    height: 100vh;
                    top: 0;
                    flex-direction: column;
                }
                
                .wl-dropdown .wl-nav {
                    display: flex;
                    position: relative;
                    flex-direction: column;
                }
            
            }`,
            javascript: `$('.wl-dropdown').mouseover(function(){
                $(this).find('.wl-nav').addClass('active');
            });
            
            $('.wl-dropdown').mouseleave(function(){
                $(this).find('.wl-nav').removeClass('active');
            });
            
            $('.wl-nav-toggle').click(function(){
                setTimeout(function(){
                    $('html,body').scrollTop(0);
                    $('body').addClass('wl-pushed');
                    $('.wl-nav').addClass('active');
                }, 100);
            });
            
            document.addEventListener('click', function(event) {
                if ($('body').hasClass('wl-pushed')) {
                    event.preventDefault();
                    var hcsMenu = document.getElementById('wl-nav-top');
                    var hcsMenuClicked = hcsMenu.contains(event.target);
                    if (!hcsMenuClicked) {
                        $('.wl-nav').removeClass('active');
                        $('body').removeClass('wl-pushed');
                    }
                }
            });`
        },
        fixedSlideFromLeft: {
            html: `<div id="wl-header">
            <div class="wl-container">
                <div class="wl-logo">
                    <img src="/wp-content/plugins/hostfully-white-label/assets/images/placeholder-logo.png">
                </div>
                <div class="wl-nav-toggle">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z"/></svg>
                </div>
                <div id="wl-nav-top" class="wl-nav">
                    <a class="wl-link" href="#">Link</a>
                    <a class="wl-link" href="#">Link</a>
                    <a class="wl-link" href="#">Link</a>
                    <div class="wl-dropdown">
                        <a class="wl-link" href="#">Dropdown</a>
                        <div class="wl-nav">
                            <a class="wl-link" href="#">Link</a>
                            <a class="wl-link" href="#">Link</a>
                            <a class="wl-link" href="#">Link</a>
                        </div>
                    </div>
                    <a class="wl-link" href="#">Link</a>
                    <a class="wl-link" href="#">Link</a>
                </div>
            </div>
        </div>`,
            css: `.custom-header {
                height: 100px;
            }
            
            #wl-header {
                width: 100%;
                padding: 0 20px;
                position: fixed;
            }
            
            #wl-header > .wl-container {
                display: flex;
                justify-content: space-between;
                width: 100%;
                max-width: 1140px;
                margin: 0 auto;
            }
            
            .wl-nav {
                display: flex;
                align-items: center;
                gap: 20px;
            }
            
            .wl-nav .wl-link {
                text-decoration: none;
                transition: ease all .2s;
            }
            
            .wl-nav .wl-link:hover {
                text-decoration: none;
                transition: ease all .2s;
            }
            
            .wl-dropdown .wl-nav {
                display: none;
                position: relative;
                gap: 10px;
                position: absolute;
                flex-direction: column;
            }
            
            .wl-dropdown .wl-nav.active {
                display: flex;
            }
            
            .wl-dropdown .wl-nav .wl-link {
                text-decoration: none;
                transition: ease all .2s;
            }
            
            .wl-dropdown .wl-nav .wl-link:hover {
                text-decoration: none;
                transition: ease all .2s;
            }
            
            .wl-nav-toggle {
                display: none;
            }
            
            .wl-pushed {
                transform: translateX(300px);
                overflow: hidden;
            }
            
            .wl-pushed:after {
                content: "";
                position: fixed;
                background: rgba(0,0,0,0.3);
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                z-index: 100;
            }
            
            @media only screen and (max-width: 1200px) {
            
                .wl-nav {
                    display: none;
                }
                
                .wl-nav.active {
                    display: flex;
                }
                
                .wl-nav-toggle {
                    display: flex;
                    align-items: center;
                }
                
                #wl-nav-top.active {
                    position: absolute;
                    width: 300px;
                    left: -300px;
                    height: 100vh;
                    top: 0;
                    flex-direction: column;
                }
                
                .wl-dropdown .wl-nav {
                    display: flex;
                    position: relative;
                    flex-direction: column;
                }
            
            }`,
            javascript: `$('.wl-dropdown').mouseover(function(){
                $(this).find('.wl-nav').addClass('active');
            });
            
            $('.wl-dropdown').mouseleave(function(){
                $(this).find('.wl-nav').removeClass('active');
            });
            
            $('.wl-nav-toggle').click(function(){
                setTimeout(function(){
                    $('html,body').scrollTop(0);
                    $('body').addClass('wl-pushed');
                    $('.wl-nav').addClass('active');
                }, 100);
            });
            
            document.addEventListener('click', function(event) {
                if ($('body').hasClass('wl-pushed')) {
                    event.preventDefault();
                    var hcsMenu = document.getElementById('wl-nav-top');
                    var hcsMenuClicked = hcsMenu.contains(event.target);
                    if (!hcsMenuClicked) {
                        $('.wl-nav').removeClass('active');
                        $('body').removeClass('wl-pushed');
                    }
                }
            });`
        },
    }

};