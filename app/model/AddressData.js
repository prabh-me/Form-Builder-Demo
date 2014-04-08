Ext.define('MyApp.model.AddressData', {
    extend: 'Ext.data.Model',
    alias: 'model.addressdata',

    config: {
        fields: [
            {
                name: 'item',
                type: 'auto'
            },
            {
                name: 'value',
                type: 'auto'
            }
        ]
    }
});