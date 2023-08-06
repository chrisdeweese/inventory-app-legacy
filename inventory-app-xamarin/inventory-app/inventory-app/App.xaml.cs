using System;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;
using inventory_app.Services;
using inventory_app.Views;

namespace inventory_app
{
    public partial class App : Application
    {

        public App ()
        {
            InitializeComponent();

            DependencyService.Register<MockDataStore>();
            MainPage = new AppShell();
        }

        protected override void OnStart ()
        {
        }

        protected override void OnSleep ()
        {
        }

        protected override void OnResume ()
        {
        }
    }
}

