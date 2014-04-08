Ext.define('MyApp.view.MainForm', {
    extend: 'Ext.navigation.View',
    alias: 'widget.mainform',

    requires: [
        'MyApp.view.Myform'
    ],

    config: {
        items: [
            {
                xtype: 'myform',
                title: 'Form'
            }
        ]
    }

});