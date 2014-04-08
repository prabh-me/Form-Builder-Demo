Ext.define('MyApp.view.Myform', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.myform',

    config: {
        ui: 'light',
        tabBar: {
            docked: 'top'
        },
        items: [
            
			{
                xtype: 'container',
                title: 'Home',
                activeItem: 1,
                id: 'addressTab',
                ui: 'dark',
                layout: {
                    type: 'card'
                },
                items: [
                    {
                        xtype: 'panel',
                        cls: 'home',
                        html: '<br /><h1>Welcome to Form Builder<br><br>Tap the green button below to start building the form.<br><br>',
                        id: 'welcomePanel',
                        layout: {
                            type: 'fit'
                        }
                    },
                    {
                        xtype: 'container',
                        id: 'addressListContainer',
                        layout: {
                            type: 'fit'
                        },
                        items: [
                            {
                                xtype: 'list',
                                id: 'addresslist',
                                itemTpl: [
                                    '<div> {item} : {value}</div>'
                                ],
                                store: 'addressStore'
                            }
                        ]
                    },
                    {
                        xtype: 'toolbar',
                        docked: 'bottom',
                        layout: {
                            pack: 'center',
                            type: 'hbox'
                        },
                        items: [
                            {
                                xtype: 'button',
                                id: 'mypositionbtn',
                                iconCls: 'search',
                                text: 'Forms near me'
                            },
							{
								xtype: 'button',
								ui: 'confirm',
								iconCls: 'add',
								text: 'Build Form',
								listeners:{
      
								tap : function(){location.href="html/build.html";}
      
								}
								
								
							}
							
								
                        ]
                    }
                ]
            },
            {
                xtype: 'container',
                title: 'Search ',
				
				items:	[
				{xtype: 'toolbar',
				docked: 'bottom',
				layout: {
                            pack: 'center',
                            type: 'hbox'
                        },
                        items: [
                            
							{
								xtype: 'button',
								ui: 'confirm',
								iconCls: 'add',
								text: 'Build Form',
								listeners:{
      
								tap : function(){location.href="html/build.html";}
      
								}
								
								
							}
						
							
								
                        ]
				},
				{
					xtype: 'fieldset',
					title: 'Search',
					items: [
							{
								xtype: 'textfield',
								name: 'Search',
								required: true,
								placeHolder: 'Search for forms'
							},
							{
								xtype: 'button',
								text: 'Search',
								iconCls: 'search'
      
      
							}
							
     
							]
				}
				
				]
            },
			{
                xtype: 'map',
                title: 'Map of forms',
                id: 'detailMap',
				items:	[
				{xtype: 'toolbar',
				docked: 'bottom'
				}
				
				]

            }
			
			

        ]
    }

});