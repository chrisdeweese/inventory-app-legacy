var inventory = []
var boatSections = []
var quickReferences = []
var inventoryByQuickRef = []
var inventoryByBoatSection = []

function onLoad() {
    console.log('onLoad')
    load_inventory();
}

function load_inventory() {
    fetch('https://faraimapp.com/boat/inventory.json')
        .then(response => inventory = response.json())
        .then(data => inventory = data)
        .then(data => load_boatSections());
}
function load_boatSections() {
    fetch('https://faraimapp.com/boat/boatSections.json')
        .then(response => boatSections = response.json())
        .then(data => boatSections = data)
        .then(data => load_quickReferences())
}
function load_quickReferences() {
    fetch('https://faraimapp.com/boat/quickReferences.json')
        .then(response => quickReferences = response.json())
        .then(data => quickReferences = data)
        .then(data => dataLoad_onComplete())
}

function dataLoad_onComplete() {
    // console.log(inventory);
    // console.log(boatSections);
    // console.log(quickReferences);

    // create the inventoryByQuickRef array
    for (var index in inventory) {
        var dict = inventory[index];
        var qr = dict["QuickReference"].trim().toUpperCase();

        var filterBy = [qr];
        var res = inventoryByQuickRef.filter(({ groupKey }) => filterBy.includes(groupKey));
        if (res.length == 0) {
            inventoryByQuickRef.push({ 'groupKey': qr, 'items': [dict] })
        } else {
            res[0]['items'].push(dict);
        }
    }

    // sort the inventoryByQuickRef array
    inventoryByQuickRef.sort(function (a, b) {
        var nameA = a.groupKey.toLowerCase(), nameB = b.groupKey.toLowerCase()
        if (nameA < nameB) //sort string ascending
            return -1
        if (nameA > nameB)
            return 1
        return 0 //default return value (no sorting)
    })


    // Update blank section to unknown section
    for (var index in inventory) {
        var dict = inventory[index];
        var boatSection = dict["BoatSection"].trim().toUpperCase();
        if (boatSection == "") {
            inventory[index]["BoatSection"] = "🔎 Unassigned Section"
        }
    }


    // create the inventoryByBoatSection array
    for (var index in inventory) {
        var dict = inventory[index];
        var boatSection = dict["BoatSection"].trim().toUpperCase();

        var filterBy = [boatSection];
        var res = inventoryByBoatSection.filter(({ groupKey }) => filterBy.includes(groupKey));
        if (res.length == 0) {
            inventoryByBoatSection.push({ 'groupKey': boatSection, 'items': [dict] })
        } else {
            res[0]['items'].push(dict);
        }
    }

    // sort the inventoryByBoatSection array
    inventoryByBoatSection.sort(function (a, b) {
        var nameA = a.groupKey.toLowerCase(), nameB = b.groupKey.toLowerCase()
        if (nameA < nameB) //sort string ascending
            return -1
        if (nameA > nameB)
            return 1
        return 0 //default return value (no sorting)
    })

    console.log('inventoryByBoatSection ->')
    console.log(inventoryByBoatSection);

    ko.applyBindings(new SimpleListModel(boatSections, inventoryByBoatSection));
}

// create view model
var SimpleListModel = function (boatSections, inventoryByBoatSection) {
    var self = this;

    this.boatSectionsList = ko.observableArray(boatSections);
    this.boatSectionsList.unshift('ALL SECTIONS');

    this.boatSectionsList
    this.inventoryItems = ko.observableArray();
    for (let index = 0; index < inventoryByBoatSection.length; ++index) {
        var record = inventoryByBoatSection[index];
        record.matchesFilter = ko.observable(true);

        var items = record.items;
        for (let itemIndex = 0; itemIndex < items.length; ++itemIndex) {
            var item = items[itemIndex];
            item.matchesFilter = ko.observable(true);
        }

        this.inventoryItems.push(record);
    }


    this.searchTerm = ko.observable('');
    this.searchTerm.subscribe(function () {

        var searchTerm = this.searchTerm();
        if (!searchTerm) {
            searchTerm = "";
        }else {
            searchTerm = trim().toLowerCase();
        }

        var shouldSearch = searchTerm.length > 0;
        console.log('searchTerm', searchTerm);
        var groups = this.inventoryItems();

        localStorage.setItem("searchTerm", searchTerm);

        // loop through groups
        for (let groupIndex = 0; groupIndex < groups.length; ++groupIndex) {
            const group = groups[groupIndex];
            const groupItems = group.items;

            // loop through group items
            for (let index = 0; index < groupItems.length; ++index) {

                const item = groupItems[index];
                if (!shouldSearch) {
                    item.matchesFilter(true);
                    continue;
                }

                var matchesSearchTerm = false;
                var BoatSection = item.BoatSection;
                var Box = item.Box;
                var ComponentName = item.ComponentName;
                var FunctionOrUse = item.FunctionOrUse;
                var PartNumber = item.PartNumber;
                var QuickReference = item.QuickReference;
                var SN = item.SN;
                var SerialNumber = item.SerialNumber;
                var Shelf = item.Shelf;
                var ShelfComment = item.ShelfComment;

                var testFields = [];
                testFields.push(BoatSection);
                testFields.push(Box);
                testFields.push(ComponentName);
                testFields.push(FunctionOrUse);
                testFields.push(PartNumber);
                testFields.push(QuickReference);
                testFields.push(SN);
                testFields.push(SerialNumber);
                testFields.push(Shelf);
                testFields.push(ShelfComment);

                for (let fieldsIndex = 0; fieldsIndex < testFields.length; ++fieldsIndex) {
                    var field = testFields[fieldsIndex];
                    var fieldType = typeof field;

                    if (fieldType == 'string') {
                        field = field.toLowerCase();

                    } else if (fieldType == 'number') {
                        field = field + '';

                    }

                    if (field.includes(searchTerm)) {
                        matchesSearchTerm = true;
                        break;
                    }

                }

                item.matchesFilter(matchesSearchTerm);

            }

        }


    }, this);

    var storedSearchTerm = localStorage.getItem("searchTerm");
    this.searchTerm(storedSearchTerm);



    this.selectedBoatSection = ko.observable('ALL SECTIONS');
    this.selectedBoatSection.subscribe(function () {
        var selectedBoatSection = this.selectedBoatSection().toUpperCase();
        var items = this.inventoryItems();
        for (let index = 0; index < items.length; ++index) {
            const groupKey = items[index].groupKey.toUpperCase();
            if (selectedBoatSection == 'ALL SECTIONS') {
                items[index].matchesFilter(true);
            } else {
                items[index].matchesFilter(groupKey == selectedBoatSection);
            }
        }
    }, this);


    self.filteredGroups = ko.computed(function () {

        return ko.utils.arrayFilter(self.inventoryItems(), function (item) {

            var test1 = item.matchesFilter() == true;
            var childern = ko.utils.arrayFilter(item.items, function (item2) {
                return item2.matchesFilter() == true;
            });

            return (test1 && childern.length > 0);

        });

    });


    self.onInventoryRowClick = function (inventoryItem) {
        console.log('inventoryItem', inventoryItem);
        var thisItem = ko.toJSON(inventoryItem);
        localStorage.setItem("lastRecordID", inventoryItem.RecordID.toString());
        localStorage.setItem("lastInventoryItem", thisItem);
        window.location.href = 'item-details.html';
    }


};