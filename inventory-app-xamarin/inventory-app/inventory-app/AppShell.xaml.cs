using System;
using System.Collections.Generic;
using inventory_app.ViewModels;
using inventory_app.Views;
using Xamarin.Forms;

namespace inventory_app
{
    public partial class AppShell : Xamarin.Forms.Shell
    {
        public AppShell()
        {
            InitializeComponent();
            Routing.RegisterRoute(nameof(ItemDetailPage), typeof(ItemDetailPage));
            Routing.RegisterRoute(nameof(NewItemPage), typeof(NewItemPage));
        }

    }
}

