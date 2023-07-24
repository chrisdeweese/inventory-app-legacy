var inventory = []
var boatSections = []
var quickReferences = []
var inventoryByQuickRef = []
var inventoryByBoatSection = []

function onLoad() {
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
    console.log('inventoryByQuickRef', inventoryByQuickRef);


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
        this.inventoryItems.push(record);
    }


    this.searchTerm = ko.observable('');
    this.searchTerm.subscribe(function () {

        var searchTerm = this.searchTerm().toLowerCase();

        console.log('searchTerm', searchTerm);

        var selectedBoatSection = this.selectedBoatSection().toUpperCase();
        var items = this.inventoryItems();

        for (let index = 0; index < items.length; ++index) {
            const groupKey = items[index].groupKey.toUpperCase();

            var matchesSection = false;

            if (selectedBoatSection == 'ALL SECTIONS') {
                matchesSection = true;
            } else {
                matchesSection = groupKey == selectedBoatSection;
            }

            if (searchTerm.trim().length == 0) {
                items[index].matchesFilter(matchesSection);

            } else {

                // if matches section then filt on search term
                if (searchTerm.length > 0) {
         
                    var matchesSearchTerm = false;
                    var item = items[index];
                    console.log('item', item);

                    var BoatSection = items[index].BoatSection;
                    var Box = items[index].Box;
                    var ComponentName = items[index].ComponentName;
                    var FunctionOrUse = items[index].FunctionOrUse;
                    var PartNumber = items[index].PartNumber;
                    var QuickReference = items[index].QuickReference;
                    var SN = items[index].SN;
                    var SerialNumber = items[index].SerialNumber;
                    var Shelf = items[index].Shelf;
                    var ShelfComment = items[index].ShelfComment;
                   
                    console.log('ComponentName', ComponentName);

                    if (BoatSection != null && BoatSection.toLowerCase().includes(searchTerm)){ 
                        matchesSearchTerm = true;

                    } else if (Box != null && Box.toLowerCase().includes(searchTerm)){ 
                        matchesSearchTerm = true;

                    } else if (ComponentName != null && ComponentName.toLowerCase().includes(searchTerm)){ 
                        matchesSearchTerm = true;

                    } else if (FunctionOrUse != null && FunctionOrUse.toLowerCase().includes(searchTerm)){ 
                        matchesSearchTerm = true;
                    } else if (PartNumber != null && PartNumber.toLowerCase().includes(searchTerm)){ 
                        matchesSearchTerm = true;
                    } else if (QuickReference != null && QuickReference.toLowerCase().includes(searchTerm)){ 
                        matchesSearchTerm = true;
                    } else if (SN != null && SN.toLowerCase().includes(searchTerm)){ 
                        matchesSearchTerm = true;
                    } else if (SerialNumber != null && SerialNumber.toLowerCase().includes(searchTerm)){ 
                        matchesSearchTerm = true;
                    } else if (Shelf != null && Shelf.toLowerCase().includes(searchTerm)){ 
                        matchesSearchTerm = true;
                    } else if (ShelfComment != null && ShelfComment.toLowerCase().includes(searchTerm)){ 
                        matchesSearchTerm = true;
                    }

                    items[index].matchesFilter(matchesSearchTerm);
               
                }

            }

        }


    }, this);


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

    self.filterInventory = ko.computed(function () {
        return ko.utils.arrayFilter(self.inventoryItems(), function (item) {
            return item.matchesFilter() == true;
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