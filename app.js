Ext.Loader.setConfig({

});

Ext.application({
    models: [
        'AddressData'
    ],
    stores: [
        'AddressStore'
    ],
    views: [
        'MainForm',
        'Myform'
    ],
    controllers: [
        'AddressCtrl'
    ],
    name: 'MyApp',

    launch: function() {

        Ext.create('MyApp.view.MainForm', {fullscreen: true});
    }

});
