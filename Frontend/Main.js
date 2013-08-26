
var lib = 'libs/',
    data = 'scripts/data/',
    viewModel = 'scripts/viewmodels/',
    model = 'scripts/models/';

requirejs.config({
    paths: {
        'jquery': lib + 'jquery-1.7.1.min',
        'knockout': lib + 'knockout-2.1.0',
        'koTemplateEngine': lib + 'koExternalTemplateEngine_all',
        'koMapping': lib + 'knockout.mapping',
        'bootstrap': lib + 'bootstrap.min',
        'uuid': lib + 'uuid',
        'd3': lib + 'd3.v3',
        'io': lib + 'socket.io.min',

        'dataAccess': data + 'DataAccess',
        'initialData': data + 'InitialData',

        'publishingViewModel': viewModel + 'PublishingViewModel',
        'reachViewModel': viewModel + 'ReachViewModel',

        'publishingModel': model + 'PublishingModel'
    },

    shim: {
        'bootstrap': {
            deps: ['jquery'],
            exports: 'bootstrap'
        },

        'd3': {
            deps: [],
            exports: 'd3'
        }
    }
});

require(["publishingViewModel", "reachViewModel", "bootstrap"], function (publishingViewModel, reachViewModel, bootstrap) {
    publishingViewModel.Initialize(publishingViewModel);
    reachViewModel.Initialize(reachViewModel);
});

