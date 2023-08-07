using System;
using System.Collections.Generic;
using System.ComponentModel;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

using inventory_app.Models;
using inventory_app.ViewModels;

namespace inventory_app.Views
{
    public partial class NewItemPage : ContentPage
    {
        public InventoryItem Item { get; set; }

        public NewItemPage()
        {
            InitializeComponent();
            BindingContext = new NewItemViewModel();
        }
    }
}
