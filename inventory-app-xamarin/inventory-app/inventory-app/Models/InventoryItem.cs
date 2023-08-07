using System;

namespace inventory_app.Models
{
    public class InventoryItem
    {
        public string ComponentName { get; set; }
        public string Availability { get; set; }
        public string BoatSection { get; set; }
        public int Shelf { get; set; }
        public int Box { get; set; }
        public int SerialNumber { get; set; }
        public string PurchasePrice { get; set; }
        public string AproxPriceValue { get; set; }
        public int Quantity { get; set; }
        public int OriginalQty { get; set; }
        public string FunctionOrUse { get; set; }
        public string ShelfComment { get; set; }
        public string QuickReference { get; set; }
        public string PartNumber { get; set; }
        public string Spacer { get; set; }
        public string Photos1 { get; set; }
        public string Photos2 { get; set; }
        public int SN { get; set; }
        public string RecordID { get; set; }
    }
}
