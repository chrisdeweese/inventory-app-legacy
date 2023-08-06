﻿using System.ComponentModel;
using Xamarin.Forms;
using inventory_app.ViewModels;

namespace inventory_app.Views
{
    public partial class ItemDetailPage : ContentPage
    {
        public ItemDetailPage()
        {
            InitializeComponent();
            BindingContext = new ItemDetailViewModel();
        }
    }
}
