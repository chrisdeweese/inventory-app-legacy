using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace inventory_app.Services
{
    public interface IInventoryService<T>
    {
        Task<bool> AddItemAsync(T item);
        Task<bool> UpdateItemAsync(T item);
        Task<bool> DeleteItemAsync(string id);
        Task<T> GetItemAsync(string id);
        Task<IEnumerable<T>> GetItemsAsync(bool forceRefresh = false);
    }
}

