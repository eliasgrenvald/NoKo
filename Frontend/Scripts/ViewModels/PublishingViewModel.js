define(["knockout", "dataAccess", "initialData", "publishingModel", "io"], function (ko, dataAccess, initialData, publishingModel, io) {

    var self = null;

    var serverApi = 'publishings',
        editModalId = '#publishingEditPanel',
        editModalConfirmButtonId = '#confirmButtonEditPanel',
        addModalId = '#publishingAddPanel',
        addModalConfirmButtonId = '#confirmButtonAddPanel',
        modalPanelMode = {
            none: -1,
            add: 0,
            update: 1
        };


    var initialize = function (that) {
        self = that;

        dataAccess.Get(self.ServerApi).done(function (data) {
            if (data.length === 0) {
                dataAccess.Post('publishings', initialData.PublishingInitialData).done(function (data) {
                    addDataCollectionToPublishings(initialData.PublishingInitialData);
                    applyBinding();
                });
            }
            else {
                addDataCollectionToPublishings(data);
                applyBinding();
            }
        });
    },

    applyBinding = function () {
        ko.applyBindings(self, document.getElementById('publishingContainer'));
    },

    addDataCollectionToPublishings = function (data) {
        $.each(data, function (index, item) {
            var newPublishing = new publishingModel();
            newPublishing.init(item);
            self.Publishings.push(newPublishing);
        });
    },

    publishings = ko.observableArray([]),

    remove = function (item) {
        dataAccess.Delete(self.ServerApi, item.id, 'Removing Operation Failed!!').done(function () {
            self.Publishings.remove(item);
        });
    },

    editingRowItem = ko.observable(null),

    mainRowItem = null,

    openEditModal = function (item) {
        $(editModalId).modal('show');
        self.EditingRowItem(item);
        self.MainRowItem = ko.toJS(item);
        panelMode = modalPanelMode.update;
    },

    closeEditModal = function () {
        $(self.EditModalId).modal('hide');
        self.EditingRowItem(self.EditingRowItem().init(self.MainRowItem));
    },

    update = function () {
        var editModal = $(self.EditModalId);
        var confirmButton = $(self.EditModalConfirmButtonId);
        confirmButton.button("loading");
        var EditingRowItemPlain = ko.toJS(self.EditingRowItem);

        dataAccess.Update(self.ServerApi, EditingRowItemPlain).done(function () {
            confirmButton.button('reset');
            editModal.modal('hide');

        }).fail(function () {
            confirmButton.button('reset');
        });
    },

    panelMode = modalPanelMode.none,

    add = function () {
        var addModal = $(self.AddModalId);
        var confirmationButton = $(self.AddModalConfirmButtonId);
        confirmationButton.button('loading');
        dataAccess.Post(self.ServerApi, ko.toJS(self.NewItem)).done(function () {
            confirmationButton.button('reset');
            self.Publishings.push(self.NewItem());
            addModal.modal('hide');
            self.NewItem(new publishingModel());
        });
    },
    closeAddModal = function () {
        $(self.AddModalId).modal('hide');
        self.NewItem(new publishingModel());
    },
    newItem = ko.observable(new publishingModel()),
    openAddModal = function () {
        $(addModalId).modal('show');
        panelMode = modalPanelMode.add;
    },


    newTag = ko.observable(),  
    addNewTag = function () {
        if (panelMode == modalPanelMode.update) {
            self.EditingRowItem().tags.push(self.NewTag());

        }
        else {
            self.NewItem().tags.push(self.NewTag());
        }
        self.NewTag('');
    },
    tagsToRemove = ko.observableArray();
    removeTag = function () {
        self.EditingRowItem().tags.removeAll(self.TagsToRemove());
    },

    pushNewItemFromServer = function () {        
        var socket = io.connect('http://localhost:3000');
        socket.emit('Push New Publishing');
        socket.on('Add New Publishing', function (data) {
            self.Publishings.push(new publishingModel().init(data));
        });
    };

    return {
        Initialize: initialize,        
        Publishings: publishings,
        ServerApi: serverApi,
        EditModalId: editModalId,
        AddModalId: addModalId,
        AddModalConfirmButtonId: addModalConfirmButtonId,
        EditModalConfirmButtonId: editModalConfirmButtonId,

        CountriesData: initialData.CountriesData,
        LanguagesData: initialData.LanguagesData,
        ChannelsData: initialData.ChannelsData,
        CitiesData: initialData.CitiesData,
        RegionsData: initialData.RegionsData,
        
        Remove: remove,
        Add: add,
        Update: update,

        NewItem: newItem,
        OpenAddModal: openAddModal,
        CloseAddModal: closeAddModal,

        OpenEditModal: openEditModal,
        CloseEditModal: closeEditModal,
        EditingRowItem: editingRowItem,
        MainRowItem: mainRowItem,        
        
        AddNewTag: addNewTag,
        NewTag: newTag,
        TagsToRemove: tagsToRemove,
        RemoveTag: removeTag,
        PushNewItemFromServer: pushNewItemFromServer
    };
});