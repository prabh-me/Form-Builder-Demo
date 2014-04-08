Ext.define('MyApp.view.ContainerMenu',
{
    extend: 'Ext.Container',
    xtype: 'mainmenu',
    
    config: {
        
        bottom: 0,
        zIndex: 0,
		top: 0,
        left: 0,
        width: 266,
        cls: 'mainmenu',
        docked: 'left',
		padding: '83 0 0 0',
        open: false,
        scrollable: 'vertical',
        defaultType: 'button',
        defaults: 
		{
            textAlign: 'left'
        },
        items: 
		[{
            text: 'Build Form',
            ui: 'mainmenu',
            iconCls: 'ico'
        
		},
		
		{
            text: 'Search',
            ui: 'mainmenu',
            iconCls: 'ico'
        },
		
		{
            text: 'Options',
            ui: 'mainmenu',
            iconCls: 'ico'
        }
        
		
		
		]
    
	},
	
    setParent: function(parent) {
        this.callParent(arguments);
        this.maskCmp = parent.add({
            xtype   : 'component',
            cls     : 'mainmenu-mask',
            top     : 0,
            zIndex  : 5000,
            hidden  : true,
            width   : 9999,
            left    : this.getWidth(),
            bottom  : 0
        });

        this.maskCmp.element.on({
            scope   : this,
            touchend: 'onMaskRelease'
        });
    },

    onMaskRelease: function() {
        this.setOpen(false);
    },

    onDestroy: function() {
        this.maskCmp.destroy();
        delete this.maskCmp;

        this.callParent(arguments);
    },

    toggle: function() {
        this.setOpen(!this.getOpen());
    },

    updateOpen: function(open) {
        var targetEl,
            parentCt = this.up();

        if (!parentCt) {
            return;
        }

        targetEl = parentCt.innerElement;

        if (open) {
            targetEl.translate(this.getWidth(), 0, 0);
            this.maskCmp.show();
        }
        else {
            targetEl.translate(0, 0, 0);
            this.maskCmp.hide();
        }
    }
});
