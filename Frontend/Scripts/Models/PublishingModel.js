define(['knockout', 'uuid', 'initialData'], function (ko, uuid, initialData) {
    return function () {
        var self = this;
        
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
                return ko.utils.arrayMap(self.channels(), function (channel) {                    
                    return channel.id;
                });
            },
            write: function (value) {
                var newSelectedItems = [],
                channels = initialData.ChannelsData;
                for (var i = 0; i < value.length; i++) {
                    for (var j = 0; j < channels.length; j++) {
                        var channel = channels[j];
                        if (channel.id === value[i]) {
                            newSelectedItems.push(channel);
                        }
                    }
                }

                self.channels(newSelectedItems);
            },
            owner: self
        });

        self.geo.countryIds = ko.computed({
            read: function () {

                return ko.utils.arrayMap(self.geo.countries(), function (country) {
                    return country.key;
                });
            },
            write: function (value) {
                var newSelectedItems = [],
                countries = initialData.CountriesData;
                for (var i = 0; i < value.length; i++) {
                    for (var j = 0; j < countries.length; j++) {
                        var country = countries[j];
                        if (country.key === value[i]) {
                            newSelectedItems.push(country);
                        }
                    }
                }

                self.geo.countries(newSelectedItems);
            },
            owner: self
        });

        self.geo.languageIds = ko.computed({
            read: function () {

                return ko.utils.arrayMap(self.geo.languages(), function (language) {
                    return language.key;
                });
            },
            write: function (value) {
                var newSelectedItems = [],
                languages = initialData.LanguagesData;
                for (var i = 0; i < value.length; i++) {
                    for (var j = 0; j < languages.length; j++) {
                        var language = languages[j];
                        if (language.key === value[i]) {
                            newSelectedItems.push(language);
                        }
                    }
                }

                self.geo.languages(newSelectedItems);
            },
            owner: self
        });

        self.geo.cityIds = ko.computed({
            read: function () {
                return ko.utils.arrayMap(self.geo.cities(), function (city) {
                    return city.key;
                });
            },
            write: function (value) {
                var newSelectedItems = [],
                cities = initialData.CitiesData;
                for (var i = 0; i < value.length; i++) {
                    for (var j = 0; j < cities.length; j++) {
                        var city = cities[j];
                        if (city.key === value[i]) {
                            newSelectedItems.push(city);
                        }
                    }
                }

                self.geo.cities(newSelectedItems);
            },
            owner: self
        });

        self.geo.regionIds = ko.computed({
            read: function () {

                return ko.utils.arrayMap(self.geo.regions(), function (region) {
                    return region.key;
                });
            },
            write: function (value) {
                var newSelectedItems = [],
                regions = initialData.RegionsData;
                for (var i = 0; i < value.length; i++) {
                    for (var j = 0; j < regions.length; j++) {
                        var region = regions[j];
                        if (region.key === value[i]) {
                            newSelectedItems.push(region);
                        }
                    }
                }

                self.geo.regions(newSelectedItems);
            },
            owner: self
        });

        self.geo.regionIds = ko.computed({
            read: function () {

                return ko.utils.arrayMap(self.geo.regions(), function (region) {
                    return region.key;
                });
            },
            write: function (value) {
                var newSelectedItems = [],
                regions = initialData.RegionsData;
                for (var i = 0; i < value.length; i++) {
                    for (var j = 0; j < regions.length; j++) {
                        var region = regions[j];
                        if (region.key === value[i]) {
                            newSelectedItems.push(region);
                        }
                    }
                }

                self.geo.regions(newSelectedItems);
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