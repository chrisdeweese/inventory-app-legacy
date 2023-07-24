
var viewModel;


function onLoad() {
    viewModel = new viewModel();
    ko.applyBindings(viewModel);
    console.log('viewmodel', viewModel);
}


// create view model
var viewModel = function () {
    var self = this;

    var objJSON = JSON.parse(localStorage.getItem("lastInventoryItem"));

    this.inventoryItem = {}; 
    this.inventoryItem.AproxPriceValue =  ko.observable(objJSON.AproxPriceValue);
    this.inventoryItem.Availability =  ko.observable(objJSON.Availability);
    this.inventoryItem.BoatSection =  ko.observable(objJSON.BoatSection);
    this.inventoryItem.Box = ko.observable(objJSON.Box);
    this.inventoryItem.ComponentName = ko.observable(objJSON.ComponentName);
    this.inventoryItem.FunctionOrUse =  ko.observable(objJSON.FunctionOrUse);
    this.inventoryItem.OriginalQty =  ko.observable(objJSON.OriginalQty);
    this.inventoryItem.PartNumber =  ko.observable(objJSON.PartNumber);
    this.inventoryItem.Photos1 =  ko.observable(objJSON.Photos1);
    this.inventoryItem.Photos2 =  ko.observable(objJSON.Photos2);
    this.inventoryItem.PurchasePrice =  ko.observable(objJSON.PurchasePrice);
    this.inventoryItem.Quantity =  ko.observable(objJSON.Quantity);
    this.inventoryItem.QuickReference =  ko.observable(objJSON.QuickReference);
    this.inventoryItem.RecordID =  ko.observable(objJSON.RecordID);
    this.inventoryItem.SN =  ko.observable(objJSON.SN);
    this.inventoryItem.SerialNumber =  ko.observable(objJSON.SerialNumber);
    this.inventoryItem.Shelf =  ko.observable(objJSON.Shelf);
    this.inventoryItem.ShelfComment =  ko.observable(objJSON.ShelfComment);


    self.save = function () {
        var thisRecord =  JSON.parse(ko.toJSON(this.inventoryItem));
        console.log('thisRecord', thisRecord);
    }


};