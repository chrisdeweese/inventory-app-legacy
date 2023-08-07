using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using inventory_app.Models;
using inventoryapp.Resources;
using Newtonsoft.Json;

namespace inventory_app.Services
{
    public class InventoryService : IInventoryService<InventoryItem>
    {
        readonly List<InventoryItem> items;

        public InventoryService()
        {
            //items = new List<InventoryItem>()
            //{
            //    new InventoryItem { ComponentName = "First Item", RecordID = Guid.NewGuid().ToString() },
            //    new InventoryItem { ComponentName = "Second Item", RecordID = Guid.NewGuid().ToString() }
            //};
        }

        public async Task<bool> AddItemAsync(InventoryItem item)
        {
            items.Add(item);

            return await Task.FromResult(true);
        }

        public async Task<bool> UpdateItemAsync(InventoryItem item)
        {
            var oldItem = items.Where((InventoryItem arg) => arg.RecordID == item.RecordID).FirstOrDefault();
            items.Remove(oldItem);
            items.Add(item);

            return await Task.FromResult(true);
        }

        public async Task<bool> DeleteItemAsync(string recordID)
        {
            var oldItem = items.Where((InventoryItem arg) => arg.RecordID == recordID).FirstOrDefault();
            items.Remove(oldItem);

            return await Task.FromResult(true);
        }

        public async Task<InventoryItem> GetItemAsync(string recordID)
        {
            return await Task.FromResult(items.FirstOrDefault(s => s.RecordID == recordID));
        }

        public async Task<IEnumerable<InventoryItem>> GetItemsAsync(bool forceRefresh = false)
        {
            var uri = new Uri(Constants.InventoryURL);
            HttpClient myClient = new HttpClient();

            var response = await myClient.GetAsync(uri);
            if (response.IsSuccessStatusCode)
            {
                string content = await response.Content.ReadAsStringAsync();
                var result = JsonConvert.DeserializeObject<List<InventoryItem>>(content, new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });
                return result;
            }
            else
            {
                return null;
            }
        }
    }
}
