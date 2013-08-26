define(['knockout', 'uuid', 'initialData'], function (ko, uuid, initialData) {
    return function () {
        var self = this,

        getIdArray = function (mainArray) {
            return ko.utils.arrayMap(mainArray(), function (item) {
                if (item.key === undefined) {
                    return item.id;
                }
                else {
                    return item.key;
                }
            });
        },
        
        updateMainArrayBasedOnIdsArray = function (mainArray, Ids, dataArray) {
            var newSelectedItems = [];
            for (var i = 0; i < Ids.length; i++) {
                for (var j = 0; j < dataArray.length; j++) {
                    var data = dataArray[j];

                    if (data.key === undefined) {
                        if (data.id === Ids[i]) {
                            newSelectedItems.push(data);
                        }
                    }
                    else {
                        if (data.key === Ids[i]) {
                            newSelectedItems.push(data);
                        }
                    }
                }
            }
            mainArray(newSelectedItems);
        };

        this.id = uuid.v4();
        this.content = {
            message: ko.observable(),
            id: ko.observable(self.id),
            network: ko.observable(),
            postType: ko.observable(),
            media: {
                fileName: ko.observable(),
                url: ko.observable()
            }
        };
        this.tags = ko.observableArray([]);
        this.status = ko.observable(),
        this.channels = ko.observableArray([]),

        this.scheduled = ko.observable(),
        this.geo = {
            countries: ko.observableArray([]),            
            languages: ko.observableArray([]),
            cities: ko.observableArray([]),
            regions: ko.observableArray([])
        };

        self.channelIds = ko.computed({
            read: function () {                
                return getIdArray(self.channels);
            },
            write: function (value) {
                updateMainArrayBasedOnIdsArray(self.channels, value, initialData.ChannelsData);
            },
            owner: self
        });

        self.geo.countryIds = ko.computed({
            read: function () {
                return getIdArray(self.geo.countries);
            },
            write: function (value) {
                updateMainArrayBasedOnIdsArray(self.geo.countries, value, initialData.CountriesData);
            },
            owner: self
        });

        self.geo.languageIds = ko.computed({
            read: function () {
                return getIdArray(self.geo.languages);
            },
            write: function (value) {
                updateMainArrayBasedOnIdsArray(self.geo.languages, value, initialData.LanguagesData);
            },
            owner: self
        });

        self.geo.cityIds = ko.computed({
            read: function () {
                return getIdArray(self.geo.cities);
            },
            write: function (value) {
                updateMainArrayBasedOnIdsArray(self.geo.cities, value, initialData.CitiesData);
            },
            owner: self
        });

        self.geo.regionIds = ko.computed({
            read: function () {
                return getIdArray(self.geo.regions);
            },
            write: function (value) {
                updateMainArrayBasedOnIdsArray(self.geo.regions, value, initialData.RegionsData);
            },
            owner: self
        });   

        this.init = function (obj) {
            self.id = obj.id;
            self.content.message(obj.content.message);
            self.content.id(obj.content.id);
            self.content.network(obj.content.network);
            self.content.postType(obj.content.postType);
            self.content.media.fileName(obj.content.media.fileName);
            self.content.media.url(obj.content.media.url);
            self.tags(obj.tags);
            self.status(obj.status);
            self.channels(obj.channels);
            self.scheduled(obj.scheduled);            
            self.geo.countries(obj.geo.countries);          
            self.geo.languages(obj.geo.languages);
            self.geo.cities(obj.geo.cities);
            self.geo.regions(obj.geo.regions);            
            return self;
        }
    }
});