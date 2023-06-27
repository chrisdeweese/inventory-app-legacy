var inventory = []
var boatSections = []
var quickReferences = []
var inventoryByQuickRef = []
var inventoryByBoatSection = []

function onLoad() {
    load_inventory();
}

function load_inventory(){
    fetch('https://faraimapp.com//boat/inventory.json')
    .then(response => inventory = response.json())
    .then(data => inventory = data)
    .then(data => load_boatSections());
}
function load_boatSections(){
    fetch('https://faraimapp.com//boat/boatSections.json')
    .then(response => boatSections = response.json())
    .then(data => boatSections = data)
    .then(data => load_quickReferences())
}
function load_quickReferences(){
    fetch('https://faraimapp.com//boat/quickReferences.json')
    .then(response => quickReferences = response.json())
    .then(data => quickReferences = data)
    .then(data => dataLoad_onComplete())
}

function dataLoad_onComplete() {
    console.log(inventory);
    console.log(boatSections);
    console.log(quickReferences);

    // create the inventoryByQuickRef array
    for (var index in inventory) {
        var dict = inventory[index];
        var qr = dict["Quick Reference"].trim().toUpperCase();

        var filterBy = [qr];
        var res = inventoryByQuickRef.filter(({groupKey}) => filterBy.includes(groupKey));
        if (res.length == 0){
            inventoryByQuickRef.push({'groupKey': qr, 'items': [dict]})
        }else{
            res[0]['items'].push(dict);
        }
    }

    // sort the inventoryByQuickRef array
    inventoryByQuickRef.sort(function(a, b){
        var nameA=a.groupKey.toLowerCase(), nameB=b.groupKey.toLowerCase()
        if (nameA < nameB) //sort string ascending
            return -1 
        if (nameA > nameB)
            return 1
        return 0 //default return value (no sorting)
    })
    console.log(inventoryByQuickRef);


     // create the inventoryByBoatSection array
     for (var index in inventory) {
        var dict = inventory[index];
        var boatSection = dict["Boat Section"].trim().toUpperCase();

        var filterBy = [boatSection];
        var res = inventoryByBoatSection.filter(({groupKey}) => filterBy.includes(groupKey));
        if (res.length == 0){
            inventoryByBoatSection.push({'groupKey': boatSection, 'items': [dict]})
        }else{
            res[0]['items'].push(dict);
        }
    }

    // sort the inventoryByBoatSection array
    inventoryByBoatSection.sort(function(a, b){
        var nameA=a.groupKey.toLowerCase(), nameB=b.groupKey.toLowerCase()
        if (nameA < nameB) //sort string ascending
            return -1 
        if (nameA > nameB)
            return 1
        return 0 //default return value (no sorting)
    })

    console.log(inventoryByBoatSection);



    var SimpleListModel = function(items) {
        this.items = ko.observableArray(items);
    };
     
    ko.applyBindings(new SimpleListModel(boatSections));

}

