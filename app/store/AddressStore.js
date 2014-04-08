Ext.define('MyApp.store.AddressStore', {
    extend: 'Ext.data.Store',
    alias: 'store.addressstore',

    requires: [
        'MyApp.model.AddressData'
    ],

    config: {
        model: 'MyApp.model.AddressData',
        storeId: 'addressStore',
        proxy: {
            type: 'memory',
            reader: {
                type: 'json',
                rootProperty: 'addressItems'
            }
        }
    }
});