'use strict'

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {

    const { ValueSet } = require('@nodert-win10-rs4/windows.foundation.collections');
    const { AppServiceConnection } = require('@nodert-win10/windows.applicationmodel.appservice');
    const { AppServiceConnectionStatus } = require('@nodert-win10/windows.applicationmodel.appservice');
    const { AppServiceResponseStatus } = require('@nodert-win10/windows.applicationmodel.appservice');

    const connection = new AppServiceConnection();
    var message = new ValueSet();

    connection.appServiceName="com.microsoft.datastreamerconnect";
    connection.packageFamilyName = "f0703ee3-1a26-4028-b8f9-6b163214aa24_n3sawgb4qe5x4";
    
    connection.openAsync((error, result)=> {
      if (error) {
        console.error(error)
        return
      }

      if (result != AppServiceConnectionStatus.success)
      {
        console.error("Failed to connect.")
        return;
      }

      // Call the service.
     
      message["Command"]="Connect";
      message["Role"]="DataStreamerConnect";
      
      connection.sendMessageAsync(message, (error,response) => {
        if (response.status === AppServiceResponseStatus.success)
        {
            // Get the data  that the service sent to us.
          if (response.message["Result"] === "OK") // BUG need to unwrap opaque wrapper
          {
              result = response.message["Result"];
          }
        }
        console.info(result);
      });
    }) // openAync
  }
}
