/*
 * jQuery mmenu v5.6.5
 * @requires jQuery 1.7.0 or later
 *
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 * www.frebsite.nl
 *
 * License: CC-BY-NC-4.0
 * http://creativecommons.org/licenses/by-nc/4.0/
 */

(function( $ ) {

    var _PLUGIN_	= 'mmenu',
        _VERSION_	= '5.6.4';


    //	Plugin already excists
    if ( $[ _PLUGIN_ ] && $[ _PLUGIN_ ].version > _VERSION_ )
    {
        return;
    }


    /*
     Class
     */
    $[ _PLUGIN_ ] = function( $menu, opts, conf )
    {
        this.$menu	= $menu;
        this._api	= [ 'bind', 'init', 'update', 'setSelected', 'getInstance', 'openPanel', 'closePanel', 'closeAllPanels' ];
        this.opts	= opts;
        this.conf	= conf;
        this.vars	= {};
        this.cbck	= {};


        if ( typeof this.___deprecated == 'function' )
        {
            this.___deprecated();
        }

        this._initMenu();
        this._initAnchors();

        var $pnls = this.$pnls.children();

        this._initAddons();
        this.init( $pnls );


        if ( typeof this.___debug == 'function' )
        {
            this.___debug();
        }

        return this;
    };

    $[ _PLUGIN_ ].version 	= _VERSION_;
    $[ _PLUGIN_ ].addons 	= {};
    $[ _PLUGIN_ ].uniqueId 	= 0;


    $[ _PLUGIN_ ].defaults 	= {
        extensions		: [],
        navbar 			: {
            add 			: true,
            title			: 'Menu',
            titleLink		: 'panel'
        },
        onClick			: {
//			close			: true,
//			preventDefault	: null,
            setSelected		: true
        },
        slidingSubmenus	: true
    };

    $[ _PLUGIN_ ].configuration = {
        classNames			: {
            divider		: 'Divider',
            inset 		: 'Inset',
            panel		: 'Panel',
            selected	: 'Selected',
            spacer		: 'Spacer',
            vertical	: 'Vertical'
        },
        clone				: false,
        openingInterval		: 25,
        panelNodetype		: 'ul, ol, div',
        transitionDuration	: 400
    };

    $[ _PLUGIN_ ].prototype = {

        init: function( $panels )
        {
            $panels = $panels.not( '.' + _c.nopanel );
            $panels = this._initPanels( $panels );

            this.trigger( 'init', $panels );
            this.trigger( 'update' );
        },

        update: function()
        {
            this.trigger( 'update' );
        },

        setSelected: function( $li )
        {
            this.$menu.find( '.' + _c.listview ).children().removeClass( _c.selected );
            $li.addClass( _c.selected );
            this.trigger( 'setSelected', $li );
        },

        openPanel: function( $panel )
        {
            var $l = $panel.parent(),
                that = this;

            //	Vertical
            if ( $l.hasClass( _c.vertical ) )
            {
                var $sub = $l.parents( '.' + _c.subopened );
                if ( $sub.length )
                {
                    this.openPanel( $sub.first() );
                    return;
                }
                $l.addClass( _c.opened );
                this.trigger( 'openPanel', $panel );
                this.trigger( 'openingPanel', $panel );
                this.trigger( 'openedPanel', $panel );
            }

            //	Horizontal
            else
            {
                if ( $panel.hasClass( _c.current ) )
                {
                    return;
                }

                var $panels = this.$pnls.children( '.' + _c.panel ),
                    $current = $panels.filter( '.' + _c.current );

                $panels
                    .removeClass( _c.highest )
                    .removeClass( _c.current )
                    .not( $panel )
                    .not( $current )
                    .not( '.' + _c.vertical )
                    .addClass( _c.hidden );

                if ( !$[ _PLUGIN_ ].support.csstransitions )
                {
                    $current.addClass( _c.hidden );
                }

                if ( $panel.hasClass( _c.opened ) )
                {
                    $panel
                        .nextAll( '.' + _c.opened )
                        .addClass( _c.highest )
                        .removeClass( _c.opened )
                        .removeClass( _c.subopened );
                }
                else
                {
                    $panel.addClass( _c.highest );
                    $current.addClass( _c.subopened );
                }

                $panel
                    .removeClass( _c.hidden )
                    .addClass( _c.current );

                that.trigger( 'openPanel', $panel );

                //	Without the timeout, the animation won't work because the element had display: none;
                setTimeout(
                    function()
                    {
                        $panel
                            .removeClass( _c.subopened )
                            .addClass( _c.opened );

                        that.trigger( 'openingPanel', $panel );

                        //	Callback
                        that.__transitionend( $panel,
                            function()
                            {
                                that.trigger( 'openedPanel', $panel );
                            }, that.conf.transitionDuration
                        );

                    }, this.conf.openingInterval
                );
            }
        },

        closePanel: function( $panel )
        {
            var $l = $panel.parent();

            //	Vertical only
            if ( $l.hasClass( _c.vertical ) )
            {
                $l.removeClass( _c.opened );
                this.trigger( 'closePanel', $panel );
                this.trigger( 'closingPanel', $panel );
                this.trigger( 'closedPanel', $panel );
            }
        },

        closeAllPanels: function()
        {
            //	Vertical
            this.$menu
                .find( '.' + _c.listview )
                .children()
                .removeClass( _c.selected )
                .filter( '.' + _c.vertical )
                .removeClass( _c.opened );

            //	Horizontal
            var $pnls = this.$pnls.children( '.' + _c.panel ),
                $frst = $pnls.first();

            this.$pnls
                .children( '.' + _c.panel )
                .not( $frst )
                .removeClass( _c.subopened )
                .removeClass( _c.opened )
                .removeClass( _c.current )
                .removeClass( _c.highest )
                .addClass( _c.hidden );

            this.openPanel( $frst );
        },

        togglePanel: function( $panel )
        {
            var $l = $panel.parent();

            //	Vertical only
            if ( $l.hasClass( _c.vertical ) )
            {
                this[ $l.hasClass( _c.opened ) ? 'closePanel' : 'openPanel' ]( $panel );
            }
        },

        getInstance: function()
        {
            return this;
        },

        bind: function( evnt, fn )
        {
            this.cbck[ evnt ] = this.cbck[ evnt ] || [];
            this.cbck[ evnt ].push( fn );
        },

        trigger: function()
        {
            var that = this,
                args = Array.prototype.slice.call( arguments ),
                evnt = args.shift();

            if ( this.cbck[ evnt ] )
            {
                for ( var e = 0, l = this.cbck[ evnt ].length; e < l; e++ )
                {
                    this.cbck[ evnt ][ e ].apply( that, args );
                }
            }
        },

        _initMenu: function()
        {
            var that = this;

            //	Add ID
            this.$menu.attr( 'id', this.$menu.attr( 'id' ) || this.__getUniqueId() );

            //	Clone if needed
            if ( this.conf.clone )
            {
                this.$menu = this.$menu.clone( true );
                this.$menu.add( this.$menu.find( '[id]' ) )
                    .filter( '[id]' )
                    .each(
                        function()
                        {
                            $(this).attr( 'id', _c.mm( $(this).attr( 'id' ) ) );
                        }
                    );
            }

            //	Strip whitespace
            this.$menu.contents().each(
                function()
                {
                    if ( $(this)[ 0 ].nodeType == 3 )
                    {
                        $(this).remove();
                    }
                }
            );

            //	Add markup
            this.$pnls = $( '<div class="' + _c.panels + '" />' )
                .append( this.$menu.children( this.conf.panelNodetype ) )
                .prependTo( this.$menu );

            //	Add classes
            this.$menu
                .parent()
                .addClass( _c.wrapper );

            var clsn = [ _c.menu ];

            //	Add direction class
            if ( !this.opts.slidingSubmenus )
            {
                clsn.push( _c.vertical );
            }

            //	Add extensions classes
            this.opts.extensions = this.opts.extensions.length ? 'mm-' + this.opts.extensions.join( ' mm-' ) : '';

            if ( this.opts.extensions )
            {
                clsn.push( this.opts.extensions );
            }

            this.$menu.addClass( clsn.join( ' ' ) );
        },

        _initPanels: function( $panels )
        {
            var that = this;

            //	Add List class
            var $lists = this.__findAddBack( $panels, 'ul, ol' );

            this.__refactorClass( $lists, this.conf.classNames.inset, 'inset' )
                .addClass( _c.nolistview + ' ' + _c.nopanel );

            $lists.not( '.' + _c.nolistview )
                .addClass( _c.listview );

            var $lis = this.__findAddBack( $panels, '.' + _c.listview ).children();

            //	Refactor Selected class
            this.__refactorClass( $lis, this.conf.classNames.selected, 'selected' );

            //	Refactor divider class
            this.__refactorClass( $lis, this.conf.classNames.divider, 'divider' );

            //	Refactor Spacer class
            this.__refactorClass( $lis, this.conf.classNames.spacer, 'spacer' );

            //	Refactor Panel class
            this.__refactorClass( this.__findAddBack( $panels, '.' + this.conf.classNames.panel ), this.conf.classNames.panel, 'panel' );

            //	Create panels
            var $curpanels = $(),
                $oldpanels = $panels
                    .add( $panels.find( '.' + _c.panel ) )
                    .add( this.__findAddBack( $panels, '.' + _c.listview ).children().children( this.conf.panelNodetype ) )
                    .not( '.' + _c.nopanel );

            this.__refactorClass( $oldpanels, this.conf.classNames.vertical, 'vertical' );

            if ( !this.opts.slidingSubmenus )
            {
                $oldpanels.addClass( _c.vertical );
            }

            $oldpanels
                .each(
                    function()
                    {
                        var $t = $(this),
                            $p = $t;

                        if ( $t.is( 'ul, ol' ) )
                        {
                            $t.wrap( '<div class="' + _c.panel + '" />' );
                            $p = $t.parent();
                        }
                        else
                        {
                            $p.addClass( _c.panel );
                        }

                        var id = $t.attr( 'id' );
                        $t.removeAttr( 'id' );
                        $p.attr( 'id', id || that.__getUniqueId() );

                        if ( $t.hasClass( _c.vertical ) )
                        {
                            $t.removeClass( that.conf.classNames.vertical );
                            $p.add( $p.parent() ).addClass( _c.vertical );
                        }

                        $curpanels = $curpanels.add( $p );
                    }
                );

            var $allpanels = $('.' + _c.panel, this.$menu);

            //	Add open and close links to menu items
            $curpanels
                .each(
                    function( i )
                    {
                        var $t = $(this),
                            $p = $t.parent(),
                            $a = $p.children( 'a, span' ).first();

                        var id, $b;

                        if ( !$p.is( '.' + _c.panels ) )
                        {
                            $p.data( _d.sub, $t );
                            $t.data( _d.parent, $p );
                        }

                        //	Open link
                        if ( !$p.children( '.' + _c.next ).length )
                        {
                            if ( $p.parent().is( '.' + _c.listview ) )
                            {
                                id = $t.attr( 'id' );
                                $b = $( '<a class="' + _c.next + '" href="#' + id + '" data-target="#' + id + '" />' ).insertBefore( $a );

                                if ( $a.is( 'span' ) )
                                {
                                    $b.addClass( _c.fullsubopen );
                                }
                            }
                        }

                        //	Navbar
                        if ( $t.children( '.' + _c.navbar ).length ||
                            $p.hasClass( _c.vertical )
                        ) {
                            return;
                        }

                        if ( $p.parent().is( '.' + _c.listview ) )
                        {
                            //	Listview, the panel wrapping this panel
                            $p = $p.closest( '.' + _c.panel );
                        }
                        else
                        {
                            //	Non-listview, the first panel that has an anchor that links to this panel
                            $a = $p.closest( '.' + _c.panel ).find( 'a[href="#' + $t.attr( 'id' ) + '"]' ).first();
                            $p = $a.closest( '.' + _c.panel );
                        }

                        // fix: _url undefined
                        var _url = false;
                        var $navbar = $( '<div class="' + _c.navbar + '" />' );

                        if ( that.opts.navbar.add )
                        {
                            $t.addClass( _c.hasnavbar );
                        }

                        if ( $p.length )
                        {
                            id = $p.attr( 'id' );
                            switch ( that.opts.navbar.titleLink )
                            {
                                case 'anchor':
                                    _url = $a.attr( 'href' );
                                    break;

                                case 'panel':
                                case 'parent':
                                    _url = '#' + id;
                                    break;

                                default:
                                    _url = false;
                                    break;
                            }

                            $navbar
                                .append( '<a class="' + _c.btn + ' ' + _c.prev + '" href="#' + id + '" data-target="#' + id + '" />' )
                                .append( $('<a class="' + _c.title + '"' + ( _url ? ' href="' + _url + '"' : '' ) + ' />').text( $a.text() ) )
                                .prependTo( $t );
                        }
                        else if ( that.opts.navbar.title )
                        {
                            $navbar
                                .append( '<a class="' + _c.title + '">' + that.opts.navbar.title + '</a>' )
                                .prependTo( $t );
                        }
                    }
                );


            //	Add opened-classes to parents
            var $s = this.__findAddBack( $panels, '.' + _c.listview )
                .children( '.' + _c.selected )
                .removeClass( _c.selected )
                .last()
                .addClass( _c.selected );

            $s.add( $s.parentsUntil( '.' + _c.menu, 'li' ) )
                .filter( '.' + _c.vertical )
                .addClass( _c.opened )
                .end()
                .each(
                    function()
                    {
                        $(this).parentsUntil( '.' + _c.menu, '.' + _c.panel )
                            .not( '.' + _c.vertical )
                            .first()
                            .addClass( _c.opened )
                            .parentsUntil( '.' + _c.menu, '.' + _c.panel )
                            .not( '.' + _c.vertical )
                            .first()
                            .addClass( _c.opened )
                            .addClass( _c.subopened );
                    }
                );


            //	Add opened-classes to child
            $s.children( '.' + _c.panel )
                .not( '.' + _c.vertical )
                .addClass( _c.opened )
                .parentsUntil( '.' + _c.menu, '.' + _c.panel )
                .not( '.' + _c.vertical )
                .first()
                .addClass( _c.opened )
                .addClass( _c.subopened );


            //	Set current opened
            var $current = $allpanels.filter( '.' + _c.opened );
            if ( !$current.length )
            {
                $current = $curpanels.first();
            }
            $current
                .addClass( _c.opened )
                .last()
                .addClass( _c.current );


            //	Rearrange markup
            $curpanels
                .not( '.' + _c.vertical )
                .not( $current.last() )
                .addClass( _c.hidden )
                .end()
                .filter(
                    function()
                    {
                        return !$(this).parent().hasClass( _c.panels  );
                    }
                )
                .appendTo( this.$pnls );

            return $curpanels;
        },

        _initAnchors: function()
        {
            var that = this;

            glbl.$body
                .on( _e.click + '-oncanvas',
                    'a[href]',
                    function( e )
                    {
                        var $t = $(this),
                            fired 	= false,
                            inMenu 	= that.$menu.find( $t ).length;

                        //	Find behavior for addons
                        for ( var a in $[ _PLUGIN_ ].addons )
                        {
                            if ( $[ _PLUGIN_ ].addons[ a ].clickAnchor.call( that, $t, inMenu ) )
                            {
                                fired = true;
                                break;
                            }
                        }

                        var _h = $t.attr( 'href' );

                        //	Open/Close panel
                        if ( !fired && inMenu )
                        {
                            if ( _h.length > 1 && _h.slice( 0, 1 ) == '#' )
                            {
                                try
                                {
                                    var $h = $(_h, that.$menu);
                                    if ( $h.is( '.' + _c.panel ) )
                                    {
                                        fired = true;
                                        that[ $t.parent().hasClass( _c.vertical ) ? 'togglePanel' : 'openPanel' ]( $h );
                                    }
                                }
                                catch( err ) {}
                            }
                        }

                        if ( fired )
                        {
                            e.preventDefault();
                        }


                        //	All other anchors in lists
                        if ( !fired && inMenu )
                        {
                            if ( $t.is( '.' + _c.listview + ' > li > a' ) && !$t.is( '[rel="external"]' ) && !$t.is( '[target="_blank"]' ) )
                            {

                                //	Set selected item
                                if ( that.__valueOrFn( that.opts.onClick.setSelected, $t ) )
                                {
                                    that.setSelected( $(e.target).parent() );
                                }

                                //	Prevent default / don't follow link. Default: false
                                var preventDefault = that.__valueOrFn( that.opts.onClick.preventDefault, $t, _h.slice( 0, 1 ) == '#' );
                                if ( preventDefault )
                                {
                                    e.preventDefault();
                                }

                                //	Close menu. Default: true if preventDefault, false otherwise
                                if ( that.__valueOrFn( that.opts.onClick.close, $t, preventDefault ) )
                                {
                                    that.close();
                                }
                            }
                        }
                    }
                );
        },

        _initAddons: function()
        {
            //	Add add-ons to plugin
            var a;
            for ( a in $[ _PLUGIN_ ].addons )
            {
                $[ _PLUGIN_ ].addons[ a ].add.call( this );
                $[ _PLUGIN_ ].addons[ a ].add = function() {};
            }

            //	Setup adds-on for menu
            for ( a in $[ _PLUGIN_ ].addons )
            {
                $[ _PLUGIN_ ].addons[ a ].setup.call( this );
            }
        },

        _getOriginalMenuId: function()
        {
            var id = this.$menu.attr( 'id' );
            if ( id && id.length )
            {
                if ( this.conf.clone )
                {
                    id = _c.umm( id );
                }
            }
            return id;
        },

        __api: function()
        {
            var that = this,
                api = {};

            $.each( this._api,
                function( i )
                {
                    var fn = this;
                    api[ fn ] = function()
                    {
                        var re = that[ fn ].apply( that, arguments );
                        return ( typeof re == 'undefined' ) ? api : re;
                    };
                }
            );
            return api;
        },

        __valueOrFn: function( o, $e, d )
        {
            if ( typeof o == 'function' )
            {
                return o.call( $e[ 0 ] );
            }
            if ( typeof o == 'undefined' && typeof d != 'undefined' )
            {
                return d;
            }
            return o;
        },

        __refactorClass: function( $e, o, c )
        {
            return $e.filter( '.' + o ).removeClass( o ).addClass( _c[ c ] );
        },

        __findAddBack: function( $e, s )
        {
            return $e.find( s ).add( $e.filter( s ) );
        },

        __filterListItems: function( $i )
        {
            return $i
                .not( '.' + _c.divider )
                .not( '.' + _c.hidden );
        },

        __transitionend: function( $e, fn, duration )
        {
            var _ended = false,
                _fn = function()
                {
                    if ( !_ended )
                    {
                        fn.call( $e[ 0 ] );
                    }
                    _ended = true;
                };

            $e.one( _e.transitionend, _fn );
            $e.one( _e.webkitTransitionEnd, _fn );
            setTimeout( _fn, duration * 1.1 );
        },

        __getUniqueId: function()
        {
            return _c.mm( $[ _PLUGIN_ ].uniqueId++ );
        }
    };


    /*
     jQuery plugin
     */
    $.fn[ _PLUGIN_ ] = function( opts, conf )
    {
        //	First time plugin is fired
        initPlugin();

        //	Extend options
        opts = $.extend( true, {}, $[ _PLUGIN_ ].defaults, opts );
        conf = $.extend( true, {}, $[ _PLUGIN_ ].configuration, conf );

        return this.each(
            function()
            {
                var $menu = $(this);
                if ( $menu.data( _PLUGIN_ ) )
                {
                    return;
                }

                var _menu = new $[ _PLUGIN_ ]( $menu, opts, conf );
                _menu.$menu.data( _PLUGIN_, _menu.__api() );
            }
        );
    };


    /*
     SUPPORT
     */
    $[ _PLUGIN_ ].support = {
        touch: 'ontouchstart' in window || navigator.msMaxTouchPoints || false,
        csstransitions: (function()
        {
            //	Use Modernizr test
            if ( typeof Modernizr !== 'undefined' &&
                typeof Modernizr.csstransitions !== 'undefined'
            ) {
                return Modernizr.csstransitions;
            }

            var b = document.body || document.documentElement,
                s = b.style,
                p = 'transition';

            //	Default support
            if ( typeof s[ p ] == 'string' )
            {
                return true;
            }

            //	Vendor specific support
            var v = [ 'Moz', 'webkit', 'Webkit', 'Khtml', 'O', 'ms' ];
            p = p.charAt( 0 ).toUpperCase() + p.substr( 1 );

            for ( var i = 0; i < v.length; i++ )
            {
                if ( typeof s[ v[ i ] + p ] == 'string' )
                {
                    return true;
                }
            }

            //	No support
            return false;
        })()
    };


    //	Global variables
    var _c, _d, _e, glbl;

    function initPlugin()
    {
        if ( $[ _PLUGIN_ ].glbl )
        {
            return;
        }

        glbl = {
            $wndw : $(window),
            $docu : $(document),
            $html : $('html'),
            $body : $('body')
        };


        //	Classnames, Datanames, Eventnames
        _c = {};
        _d = {};
        _e = {};
        $.each( [ _c, _d, _e ],
            function( i, o )
            {
                o.add = function( a )
                {
                    a = a.split( ' ' );
                    for ( var b = 0, l = a.length; b < l; b++ )
                    {
                        o[ a[ b ] ] = o.mm( a[ b ] );
                    }
                };
            }
        );

        //	Classnames
        _c.mm = function( c ) { return 'mm-' + c; };
        _c.add( 'wrapper menu panels panel nopanel current highest opened subopened navbar hasnavbar title btn prev next listview nolistview inset vertical selected divider spacer hidden fullsubopen' );
        _c.umm = function( c )
        {
            if ( c.slice( 0, 3 ) == 'mm-' )
            {
                c = c.slice( 3 );
            }
            return c;
        };

        //	Datanames
        _d.mm = function( d ) { return 'mm-' + d; };
        _d.add( 'parent sub' );

        //	Eventnames
        _e.mm = function( e ) { return e + '.mm'; };
        _e.add( 'transitionend webkitTransitionEnd click scroll keydown mousedown mouseup touchstart touchmove touchend orientationchange' );


        $[ _PLUGIN_ ]._c = _c;
        $[ _PLUGIN_ ]._d = _d;
        $[ _PLUGIN_ ]._e = _e;

        $[ _PLUGIN_ ].glbl = glbl;
    }


})( jQuery );

/*
 * jQuery mmenu offCanvas addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */

(function( $ ) {

    var _PLUGIN_ = 'mmenu',
        _ADDON_  = 'offCanvas';


    $[ _PLUGIN_ ].addons[ _ADDON_ ] = {

        //	setup: fired once per menu
        setup: function()
        {
            if ( !this.opts[ _ADDON_ ] )
            {
                return;
            }

            var that = this,
                opts = this.opts[ _ADDON_ ],
                conf = this.conf[ _ADDON_ ];

            glbl = $[ _PLUGIN_ ].glbl;


            //	Add methods to api
            this._api = $.merge( this._api, [ 'open', 'close', 'setPage' ] );


            //	Extend options
            if ( opts.position == 'top' || opts.position == 'bottom' )
            {
                opts.zposition = 'front';
            }


            //	Extend configuration
            if ( typeof conf.pageSelector != 'string' )
            {
                conf.pageSelector = '> ' + conf.pageNodetype;
            }


            glbl.$allMenus = ( glbl.$allMenus || $() ).add( this.$menu );


            //	Setup the menu
            this.vars.opened = false;

            var clsn = [ _c.offcanvas ];

            if ( opts.position != 'left' )
            {
                clsn.push( _c.mm( opts.position ) );
            }
            if ( opts.zposition != 'back' )
            {
                clsn.push( _c.mm( opts.zposition ) );
            }

            this.$menu
                .addClass( clsn.join( ' ' ) )
                .parent()
                .removeClass( _c.wrapper );


            //	Setup the page
            this.setPage( glbl.$page );


            //	Setup the UI blocker and the window
            this._initBlocker();
            this[ '_initWindow_' + _ADDON_ ]();


            //	Append to the body
            this.$menu[ conf.menuInjectMethod + 'To' ]( conf.menuWrapperSelector );


            //	Open if url hash equals menu id (usefull when user clicks the hamburger icon before menu created)
            var hash = window.location.hash;
            if ( hash )
            {
                var id = this._getOriginalMenuId();
                if ( id && id == hash.slice( 1 ) )
                {
                    this.open();
                }
            }

        },

        //	add: fired once per page load
        add: function()
        {
            _c = $[ _PLUGIN_ ]._c;
            _d = $[ _PLUGIN_ ]._d;
            _e = $[ _PLUGIN_ ]._e;

            _c.add( 'offcanvas slideout blocking modal background opening blocker page' );
            _d.add( 'style' );
            _e.add( 'resize' );
        },

        //	clickAnchor: prevents default behavior when clicking an anchor
        clickAnchor: function( $a, inMenu )
        {
            if ( !this.opts[ _ADDON_ ] )
            {
                return false;
            }

            //	Open menu
            var id = this._getOriginalMenuId();
            if ( id )
            {
                if ( $a.is( '[href="#' + id + '"]' ) )
                {
                    this.open();
                    return true;
                }
            }

            //	Close menu
            if ( !glbl.$page )
            {
                return;
            }

            id = glbl.$page.first().attr( 'id' );
            if ( id )
            {
                if ( $a.is( '[href="#' + id + '"]' ) )
                {
                    this.close();
                    return true;
                }
            }

            return false;
        }
    };


    //	Default options and configuration
    $[ _PLUGIN_ ].defaults[ _ADDON_ ] = {
        position		: 'left',
        zposition		: 'back',
        blockUI			: true,
        moveBackground	: true
    };
    $[ _PLUGIN_ ].configuration[ _ADDON_ ] = {
        pageNodetype		: 'div',
        pageSelector		: null,
        noPageSelector		: [],
        wrapPageIfNeeded	: true,
        menuWrapperSelector	: 'body',
        menuInjectMethod	: 'prepend'
    };


    //	Methods
    $[ _PLUGIN_ ].prototype.open = function()
    {
        if ( this.vars.opened )
        {
            return;
        }

        var that = this;

        this._openSetup();

        //	Without the timeout, the animation won't work because the menu had display: none;
        setTimeout(
            function()
            {
                that._openFinish();
            }, this.conf.openingInterval
        );
        this.trigger( 'open' );
    };

    $[ _PLUGIN_ ].prototype._openSetup = function()
    {
        var that = this,
            opts = this.opts[ _ADDON_ ];

        //	Close other menus
        this.closeAllOthers();

        //	Store style and position
        glbl.$page.each(
            function()
            {
                $(this).data( _d.style, $(this).attr( 'style' ) || '' );
            }
        );

        //	Trigger window-resize to measure height
        glbl.$wndw.trigger( _e.resize + '-' + _ADDON_, [ true ] );

        var clsn = [ _c.opened ];

        //	Add options
        if ( opts.blockUI )
        {
            clsn.push( _c.blocking );
        }
        if ( opts.blockUI == 'modal' )
        {
            clsn.push( _c.modal );
        }
        if ( opts.moveBackground )
        {
            clsn.push( _c.background );
        }
        if ( opts.position != 'left' )
        {
            clsn.push( _c.mm( this.opts[ _ADDON_ ].position ) );
        }
        if ( opts.zposition != 'back' )
        {
            clsn.push( _c.mm( this.opts[ _ADDON_ ].zposition ) );
        }
        if ( this.opts.extensions )
        {
            clsn.push( this.opts.extensions );
        }
        glbl.$html.addClass( clsn.join( ' ' ) );

        //	Open
        setTimeout(function(){
            that.vars.opened = true;
        },this.conf.openingInterval);

        this.$menu.addClass( _c.current + ' ' + _c.opened );
    };

    $[ _PLUGIN_ ].prototype._openFinish = function()
    {
        var that = this;

        //	Callback
        this.__transitionend( glbl.$page.first(),
            function()
            {
                that.trigger( 'opened' );
            }, this.conf.transitionDuration
        );

        //	Opening
        glbl.$html.addClass( _c.opening );
        this.trigger( 'opening' );
    };

    $[ _PLUGIN_ ].prototype.close = function()
    {
        if ( !this.vars.opened )
        {
            return;
        }

        var that = this;

        //	Callback
        this.__transitionend( glbl.$page.first(),
            function()
            {
                that.$menu
                    .removeClass( _c.current )
                    .removeClass( _c.opened );

                glbl.$html
                    .removeClass( _c.opened )
                    .removeClass( _c.blocking )
                    .removeClass( _c.modal )
                    .removeClass( _c.background )
                    .removeClass( _c.mm( that.opts[ _ADDON_ ].position ) )
                    .removeClass( _c.mm( that.opts[ _ADDON_ ].zposition ) );

                if ( that.opts.extensions )
                {
                    glbl.$html.removeClass( that.opts.extensions );
                }

                //	Restore style and position
                glbl.$page.each(
                    function()
                    {
                        $(this).attr( 'style', $(this).data( _d.style ) );
                    }
                );

                that.vars.opened = false;
                that.trigger( 'closed' );

            }, this.conf.transitionDuration
        );

        //	Closing
        glbl.$html.removeClass( _c.opening );
        this.trigger( 'close' );
        this.trigger( 'closing' );
    };

    $[ _PLUGIN_ ].prototype.closeAllOthers = function()
    {
        glbl.$allMenus
            .not( this.$menu )
            .each(
                function()
                {
                    var api = $(this).data( _PLUGIN_ );
                    if ( api && api.close )
                    {
                        api.close();
                    }
                }
            );
    };

    $[ _PLUGIN_ ].prototype.setPage = function( $page )
    {
        var that = this,
            conf = this.conf[ _ADDON_ ];

        if ( !$page || !$page.length )
        {
            $page = glbl.$body.find( conf.pageSelector );

            if ( conf.noPageSelector.length )
            {
                $page = $page.not( conf.noPageSelector.join( ', ' ) );
            }
            if ( $page.length > 1 && conf.wrapPageIfNeeded )
            {
                $page = $page
                    .wrapAll( '<' + this.conf[ _ADDON_ ].pageNodetype + ' />' )
                    .parent();
            }
        }

        $page.each(
            function()
            {
                $(this).attr( 'id', $(this).attr( 'id' ) || that.__getUniqueId() );
            }
        );
        $page.addClass( _c.page + ' ' + _c.slideout );
        glbl.$page = $page;

        this.trigger( 'setPage', $page );
    };

    $[ _PLUGIN_ ].prototype[ '_initWindow_' + _ADDON_ ] = function()
    {
        //	Prevent tabbing
        glbl.$wndw
            .off( _e.keydown + '-' + _ADDON_ )
            .on(  _e.keydown + '-' + _ADDON_,
                function( e )
                {
                    if ( glbl.$html.hasClass( _c.opened ) )
                    {
                        if ( e.keyCode == 9 )
                        {
                            e.preventDefault();
                            return false;
                        }
                    }
                }
            );

        //	Set page min-height to window height
        var _h = 0;
        glbl.$wndw
            .off( _e.resize + '-' + _ADDON_ )
            .on(  _e.resize + '-' + _ADDON_,
                function( e, force )
                {
                    if ( glbl.$page.length == 1 )
                    {
                        if ( force || glbl.$html.hasClass( _c.opened ) )
                        {
                            var nh = glbl.$wndw.height();
                            if ( force || nh != _h )
                            {
                                _h = nh;
                                glbl.$page.css( 'minHeight', nh );
                            }
                        }
                    }
                }
            );
    };

    $[ _PLUGIN_ ].prototype._initBlocker = function()
    {
        var that = this;

        if ( !this.opts[ _ADDON_ ].blockUI )
        {
            return;
        }

        if ( !glbl.$blck )
        {
            glbl.$blck = $( '<div id="' + _c.blocker + '" class="' + _c.slideout + '" />' );
        }

        glbl.$blck
            .appendTo( glbl.$body )
            .off( _e.touchstart + '-' + _ADDON_ + ' ' + _e.touchmove + '-' + _ADDON_ )
            .on(  _e.touchstart + '-' + _ADDON_ + ' ' + _e.touchmove + '-' + _ADDON_,
                function( e )
                {
                    e.preventDefault();
                    e.stopPropagation();
                    glbl.$blck.trigger( _e.mousedown + '-' + _ADDON_ );
                }
            )
            .off( _e.mousedown + '-' + _ADDON_ )
            .on(  _e.mousedown + '-' + _ADDON_,
                function( e )
                {
                    e.preventDefault();
                    if ( !glbl.$html.hasClass( _c.modal ) )
                    {
                        that.closeAllOthers();
                        that.close();
                    }
                }
            );
    };


    var _c, _d, _e, glbl;

})( jQuery );

/*
 * jQuery mmenu scrollBugFix addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */

(function( $ ) {

    var _PLUGIN_ = 'mmenu',
        _ADDON_  = 'scrollBugFix';


    $[ _PLUGIN_ ].addons[ _ADDON_ ] = {

        //	setup: fired once per menu
        setup: function()
        {
            var that = this,
                opts = this.opts[ _ADDON_ ],
                conf = this.conf[ _ADDON_ ];

            glbl = $[ _PLUGIN_ ].glbl;


            if ( !$[ _PLUGIN_ ].support.touch || !this.opts.offCanvas || !this.opts.offCanvas.blockUI )
            {
                return;
            }


            //	Extend shortcut options
            if ( typeof opts == 'boolean' )
            {
                opts = {
                    fix: opts
                };
            }
            if ( typeof opts != 'object' )
            {
                opts = {};
            }
            opts = this.opts[ _ADDON_ ] = $.extend( true, {}, $[ _PLUGIN_ ].defaults[ _ADDON_ ], opts );

            if ( !opts.fix )
            {
                return;
            }


            var id = this.$menu.attr( 'id' ),
                scrolling = false;


            this.bind( 'opening',
                function()
                {
                    this.$pnls.children( '.' + _c.current ).scrollTop( 0 );
                }
            );

            //	Prevent body scroll
            glbl.$docu
                .on( _e.touchmove,
                    function( e )
                    {
                        if ( that.vars.opened )
                        {
                            e.preventDefault();
                        }
                    }
                );

            glbl.$body
                .on( _e.touchstart,
                    '#' + id + '> .' + _c.panels + '> .' + _c.current,
                    function( e )
                    {
                        if ( that.vars.opened )
                        {
                            if ( !scrolling )
                            {
                                scrolling = true;

                                if ( e.currentTarget.scrollTop === 0 )
                                {
                                    e.currentTarget.scrollTop = 1;
                                }
                                else if ( e.currentTarget.scrollHeight === e.currentTarget.scrollTop + e.currentTarget.offsetHeight )
                                {
                                    e.currentTarget.scrollTop -= 1;
                                }

                                scrolling = false;
                            }
                        }
                    }
                )
                .on( _e.touchmove,
                    '#' + id + '> .' + _c.panels + '> .' + _c.current,
                    function( e )
                    {
                        if ( that.vars.opened )
                        {
                            if ( $(this)[ 0 ].scrollHeight > $(this).innerHeight() )
                            {
                                e.stopPropagation();
                            }
                        }
                    }
                );

            //	Fix issue after device rotation change
            glbl.$wndw
                .on( _e.orientationchange,
                    function()
                    {
                        that.$pnls
                            .children( '.' + _c.current )
                            .scrollTop( 0 )
                            .css({ '-webkit-overflow-scrolling': 'auto' })
                            .css({ '-webkit-overflow-scrolling': "touch" });
                    }
                );

        },

        //	add: fired once per page load
        add: function()
        {
            _c = $[ _PLUGIN_ ]._c;
            _d = $[ _PLUGIN_ ]._d;
            _e = $[ _PLUGIN_ ]._e;
        },

        //	clickAnchor: prevents default behavior when clicking an anchor
        clickAnchor: function( $a, inMenu ) {}
    };


    //	Default options and configuration
    $[ _PLUGIN_ ].defaults[ _ADDON_ ] = {
        fix: true
    };


    var _c, _d, _e, glbl;

})( jQuery );
