Ext.define('MyApp.controller.AddressCtrl', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            positionbtn: '#mypositionbtn',
            addressList: '#addresslist',
            detailMap: '#detailMap',
            addressTab: '#addressTab',
            addressListContainer: '#addressListContainer',
            welcomePanel: '#welcomePanel'
        },

        control: {
            "positionbtn": {
                tap: 'onButtonTap'
            },
            "detailMap": {
                activate: 'onMapActivate'
            }
        }
    },

    onButtonTap: function(button, e, eOpts) {
        var me = this;

        Ext.Viewport.setMasked({ message: 'Search...' });

        // Get the user's location
        me.getPosition( function (location) {

            // Use Geo to get the address
            me.getAddress(location, function (store) {

                // Bind data to the list and display it
                me.getAddressList().setStore(store);
                return true;
            });
        });

        Ext.Viewport.setMasked(false);

        this.getAddressTab().setActiveItem ( this.getAddressListContainer() );
    },

    onMapActivate: function(newActiveItem, container, oldActiveItem, eOpts) {
        Ext.Viewport.setMasked({ message: 'Search...' });

        var lat = detailMap._lati,
            lng = detailMap._longi,
            centerMap = Ext.Function.createDelayed( function() {
                this.setMapOptions({
                    zoom: 18
                });
            this.setMapCenter({
                latitude: lat,
                longitude: lng
            });
        }, 2500, newActiveItem );

        if (lat && lng) {

            centerMap();

        }else {
            Ext.Msg.alert("Tap forms near me & then view.");
        }

        Ext.Viewport.setMasked( false );
    },

    getPosition: function(callback) {
        if (navigator && navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(
            function(position) { 
                callback(position); 
            }, 
            function(error) {
                // Handle the error
                Ext.Msg.alert( 'Error(' + err.code + '): ' + err.message );
                return false;
            }
            );

        } else {
            Ext.Msg.alert("Info: Geolocation is not supported by this browser!");
            return false;
        }

    },

    getAddress: function(location, callback) {
        // define variables
        var store = Ext.data.StoreManager.lookup('addressStore'),
            lati = location.coords.latitude,
            longi = location.coords.longitude,
            geoAddress = {},   // JSON data object 
            addressItems = [], // Array object having detail address
            addressItem;       // Temp object for each item of address 

            // remove old data
            store.remove( store.getRange() );
        store.sync(); // it just remove from localstorage. 

        // call google api to fetch geo address by lati & longi
        var latlng = new google.maps.LatLng(lati, longi);
        geocoder = this._geocoder || ( this._geocoder = new google.maps.Geocoder() );

        // begin to decode geo address to detail address 
        geocoder.geocode({'latLng': latlng}, function(results, status) {
        if ( status == google.maps.GeocoderStatus.OK ) {

            if (results[1]) {

                // transfer geo address to Map
                detailMap._lati = lati;
                detailMap._longi = longi;

                // store geo address only when google geocoder.geocode() successfully
                geoAddress.addressItems = addressItems;
                addressItem = { 'item': 'Latitude', 'value': lati };
                //geoAddress.addressItems.push( addressItem );
                addressItem = { 'item': 'Longitude', 'value': longi };
                //geoAddress.addressItems.push( addressItem );

                // decode results[0] (detail address) into JSON data object
                for (var i=0; i<results[0].address_components.length; i++) {
                    for (var b=0; b<results[0].address_components[i].types.length; b++) {
                        //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                        var addressType = results[0].address_components[i].types[b];
                        switch ( addressType ){
                            case 'street_number' :
                            addressItem = {
                                'item': 'No', 
                            'value': results[0].address_components[i].long_name };
                            geoAddress.addressItems.push( addressItem );
                            break;

                            case 'route' :
                            addressItem = {
                                'item': 'Street', 
                            'value': results[0].address_components[i].long_name };
                            geoAddress.addressItems.push( addressItem );
                            break;

                            case 'locality' :
                            addressItem = {
                                'item': 'City', 
                            'value': results[0].address_components[i].long_name };
                            geoAddress.addressItems.push( addressItem );
                            break;	

                            case 'administrative_area_level_1' :
                            addressItem = {
                                'item': 'State', 
                            'value': results[0].address_components[i].long_name };
                            geoAddress.addressItems.push( addressItem );
                            break;	

                            case 'country' :
                            addressItem = {
                                'item': 'Country', 
                            'value': results[0].address_components[i].long_name };
                            geoAddress.addressItems.push( addressItem );
                            break;	

                            case 'hospital' :
                            addressItem = {
                                'item': 'Hospital', 
                            'value': results[0].address_components[i].long_name };
                            geoAddress.addressItems.push( addressItem );
                            break;				
                        }
                    }
                }

                // console.log( geoAddress );
                // to load all addresses into store
                store.setData( geoAddress );

                // run callback function
                store.load( function(){ callback(store); } );

            } else 
            {
                Ext.Msg.alert( 'Info: No results found !' );
                return false;
            }
        } else 
        {
            Ext.Msg.alert( 'Info: Geocoder failed due to: ' + status );
            return false;
        }
			Ext.Msg.alert("Now, tap map of forms");
    });



    },

    launch: function() {
        this.getAddressTab().setActiveItem( this.getWelcomePanel() );
    }

});