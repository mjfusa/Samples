'use strict'

const { ValueSet } = require('@nodert-win10-rs4/windows.foundation.collections');
const { PropertyValue } = require('@nodert-win10-rs4/windows.foundation');
const { AppServiceConnection } = require('@nodert-win10-rs4/windows.applicationmodel.appservice');
const { AppServiceConnectionStatus } = require('@nodert-win10-rs4/windows.applicationmodel.appservice');
const { AppServiceResponseStatus } = require('@nodert-win10-rs4/windows.applicationmodel.appservice');

var connection = new AppServiceConnection();

function Connect() {
  if (document.readyState === 'complete') {


    connection.appServiceName="com.microsoft.datastreamerconnect";
    connection.packageFamilyName = "1b835c82-3698-4236-a1f0-dbc764fab3a4_n3sawgb4qe5x4";
    
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
      document.querySelector('#txtResults').value = "openAsync: " + "0";      
    
    }) // openAync
  }
}

function Send() {
    // Call the service.
     
    var message = new ValueSet();
    message.insert("Command",PropertyValue.createString("Connect"));
    message.insert("Role", PropertyValue.createString("DataStreamerConnect"));
    
    connection.sendMessageAsync(message, (error,response) => {
      if (response.status === AppServiceResponseStatus.success)
      {
         var m = new ValueSet();
         var r = ValueSet.castFrom(response.message); 
          // var t= r.lookup("Result");
          // var pv = new PropertyValue();
          var t = response.message.first();
          var s1 = PropertyValue.castFrom( t.current.value);


        // var res = response.castFrom(response)

          // Get the data  that the service sent to us.
        // if (response.message["Result"] === "OK") // BUG need to unwrap opaque wrapper
        // {
        //     result = response.message["Result"];
        // }
      }
      document.querySelector('#txtResults').value = "sendMessageAsync: " + response.status;      
      // console.info(result);
    });
}

function Write() {
  var message = new ValueSet();
    message.insert("Command",PropertyValue.createString("Write"));
    message.insert("Data", PropertyValue.createString("Test Data"));
    
    connection.sendMessageAsync(message, (error,response) => {
      if (response.status === AppServiceResponseStatus.success)
      {
         var m = new ValueSet();  // BUG: Need to unwrap value set result from OpqueWrapper
         var r = ValueSet.castFrom(response.message); 
          // var t= r.lookup("Result");
          // var pv = new PropertyValue();
          var t = response.message.first();
          var s1 = PropertyValue.castFrom( t.current.value);


        // var res = response.castFrom(response)

          // Get the data  that the service sent to us.
        // if (response.message["Result"] === "OK") // BUG need to unwrap opaque wrapper
        // {
        //     result = response.message["Result"];
        // }
      }
      document.querySelector('#txtResults').value = "sendMessageAsync: " + response.status;      
      // console.info(result);
    });




}
document.onreadystatechange = () => {
  document.querySelector('#btnConnect').addEventListener('click', Connect);
  document.querySelector('#btnSend').addEventListener('click', Send);
  document.querySelector('#btnWrite').addEventListener('click', Write);
}
