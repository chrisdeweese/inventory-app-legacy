var inventory = []
var boatSections = []
var quickReferences = []


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

    var SimpleListModel = function(items) {
        this.items = ko.observableArray(items);
    };
     
    ko.applyBindings(new SimpleListModel(inventory));

}

