﻿using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Runtime.InteropServices.WindowsRuntime;
using System.Threading.Tasks;
using Windows.ApplicationModel;
using Windows.ApplicationModel.Activation;
using Windows.ApplicationModel.AppService;
using Windows.ApplicationModel.Background;
using Windows.ApplicationModel.Core;
using Windows.Foundation;
using Windows.Foundation.Collections;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Controls.Primitives;
using Windows.UI.Xaml.Data;
using Windows.UI.Xaml.Input;
using Windows.UI.Xaml.Media;
using Windows.UI.Xaml.Navigation;

namespace AppServiceHost
{
    /// <summary>
    /// Provides application-specific behavior to supplement the default Application class.
    /// </summary>
    sealed partial class App : Application
    {
        /// <summary>
        /// Initializes the singleton application object.  This is the first line of authored code
        /// executed, and as such is the logical equivalent of main() or WinMain().
        /// </summary>
        public App()
        {
            this.InitializeComponent();
            this.Suspending += OnSuspending;
        }

        /// <summary>
        /// Invoked when the application is launched normally by the end user.  Other entry points
        /// will be used such as when the application is launched to open a specific file.
        /// </summary>
        /// <param name="e">Details about the launch request and process.</param>
        protected async override void OnLaunched(LaunchActivatedEventArgs e)
        {
            if (string.IsNullOrEmpty(e.Arguments))
            {
                // Launch Electron and Exit
                await FullTrustProcessLauncher.LaunchFullTrustProcessForCurrentAppAsync(); 
                Application.Current.Exit();
            }
            return;
            /** 
             * Frame rootFrame = Window.Current.Content as Frame;

                        // Do not repeat app initialization when the Window already has content,
                        // just ensure that the window is active
                        if (rootFrame == null)
                        {
                            // Create a Frame to act as the navigation context and navigate to the first page
                            rootFrame = new Frame();

                            rootFrame.NavigationFailed += OnNavigationFailed;

                            if (e.PreviousExecutionState == ApplicationExecutionState.Terminated)
                            {
                                //TODO: Load state from previously suspended application
                            }

                            // Place the frame in the current Window
                            Window.Current.Content = rootFrame;
                        }

                        if (e.PrelaunchActivated == false)
                        {
                            if (rootFrame.Content == null)
                            {
                                // When the navigation stack isn't restored navigate to the first page,
                                // configuring the new page by passing required information as a navigation
                                // parameter
                                rootFrame.Navigate(typeof(MainPage), e.Arguments);
                            }
                            // Ensure the current window is active
                            Window.Current.Activate();
                        }
               **/
        }

        /// <summary>
        /// Invoked when Navigation to a certain page fails
        /// </summary>
        /// <param name="sender">The Frame which failed navigation</param>
        /// <param name="e">Details about the navigation failure</param>
        void OnNavigationFailed(object sender, NavigationFailedEventArgs e)
        {
            throw new Exception("Failed to load Page " + e.SourcePageType.FullName);
        }

        /// <summary>
        /// Invoked when application execution is being suspended.  Application state is saved
        /// without knowing whether the application will be terminated or resumed with the contents
        /// of memory still intact.
        /// </summary>
        /// <param name="sender">The source of the suspend request.</param>
        /// <param name="e">Details about the suspend request.</param>
        private void OnSuspending(object sender, SuspendingEventArgs e)
        {

            var deferral = e.SuspendingOperation.GetDeferral();
            //TODO: Save application state and stop any background activity
            deferral.Complete();
        }

        private BackgroundTaskDeferral _appServiceDeferral;
        private AppServiceConnection _appServiceConnection;
        private AppServiceConnection _dataConnection;
        private AppServiceConnection _excelConnection;

        protected override async void OnBackgroundActivated(BackgroundActivatedEventArgs args)
        {
            base.OnBackgroundActivated(args);

            IBackgroundTaskInstance taskInstance = args.TaskInstance;
            _appServiceDeferral = taskInstance.GetDeferral();

            AppServiceTriggerDetails appService = taskInstance.TriggerDetails as AppServiceTriggerDetails;
            taskInstance.Canceled += OnAppServicesCanceled;
            _appServiceConnection = appService.AppServiceConnection;
            _appServiceConnection.RequestReceived += OnAppServiceRequestReceived;
            _appServiceConnection.ServiceClosed += AppServiceConnection_ServiceClosed;


            //if (string.IsNullOrEmpty(appService.CallerPackageFamilyName))
            //{
            //    _excelConnection = appService.AppServiceConnection;
            //    _excelConnection.RequestReceived += OnAppServiceRequestReceived;
            //    _excelConnection.ServiceClosed += AppServiceConnection_ServiceClosed;

            //}
            //else
            //{
            //    _dataConnection = appService.AppServiceConnection;
            //    _dataConnection.RequestReceived += OnAppServiceRequestReceived;
            //    _dataConnection.ServiceClosed += AppServiceConnection_ServiceClosed;
            //}
        }

        private void OnAppServicesCanceled(IBackgroundTaskInstance sender, BackgroundTaskCancellationReason reason)
        {
            if (_appServiceDeferral != null)
            {
                // Complete the service deferral.
                _appServiceDeferral.Complete();
            }
        }

        private void AppServiceConnection_ServiceClosed(AppServiceConnection sender, AppServiceClosedEventArgs args)
        {
            if (_appServiceDeferral != null)
            {
                // Complete the service deferral.
                _appServiceDeferral.Complete();
            }
        }

        private async void OnAppServiceRequestReceived(AppServiceConnection sender, AppServiceRequestReceivedEventArgs args)
        {
            var messageDeferral = args.GetDeferral();
            var request = args.Request;
            var m = request.Message;
            object command;
            m.TryGetValue("Command", out command);

            if (command as string == "Connect")
            {
                object role;
                m.TryGetValue("Role", out role);

                switch (role as string)
                {
                    case "DataStreamerConnect": // Client
                        _dataConnection = sender;

                        break;
                    case "DataStreamer": // Excel
                        _excelConnection = sender;

                        break;


                }
                var response = new ValueSet();
                response.Add("Response", "OK");
                await request.SendResponseAsync(response);
            }
            else if (command as string == "Write")
            {
                object data;
                if (m.TryGetValue("Data", out data))
                {
                    var message = new ValueSet();
                    AppServiceResponse res = null;
                    message["Command"] = "Write";
                    message["Data"] = (data as string);

                    res = await _excelConnection.SendMessageAsync(message);

                    if (res.Status != AppServiceResponseStatus.Success)
                    {
                        Debug.WriteLine($"Failed to send data: {res.Status.ToString()}");
                    }
                }
                
            }






         
            messageDeferral.Complete();
        }

    }
}
