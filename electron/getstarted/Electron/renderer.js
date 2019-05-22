'use strict'

const { ValueSet } = require('@nodert-win10-rs4/windows.foundation.collections');
const { PropertyValue } = require('@nodert-win10-rs4/windows.foundation');
const { IPropertyValue } = require('@nodert-win10-rs4/windows.foundation');
const { AppServiceConnection } = require('@nodert-win10-rs4/windows.applicationmodel.appservice');
const { AppServiceConnectionStatus } = require('@nodert-win10-rs4/windows.applicationmodel.appservice');
const { AppServiceResponseStatus } = require('@nodert-win10-rs4/windows.applicationmodel.appservice');
const { Package } = require('@nodert-win10-rs4/windows.applicationmodel');
// const DEBUG_PFN = "14d69bea-df8f-4ef7-be9b-7a7067f794a1_e8xk87pxx0yyw";
// const RELEASE_PFN = "1b835c82-3698-4236-a1f0-dbc764fab3a4_n3sawgb4qe5x4";

var clientConnected = false;
var excelConnected = false;
var connection = new AppServiceConnection();

function Connect() {
    if (document.readyState === 'complete') {
        document.querySelector('#txtResults').value = "";
        connection.appServiceName = "com.microsoft.datastreamerconnect";

        var pfn = Package.current.id.familyName;
        connection.packageFamilyName = pfn;
        connection.openAsync((error, result) => {
            if (error) {
                console.error(error);
                ReportResults("openAsync error: " + result);
                return;
            }

            if (result !== AppServiceConnectionStatus.success) {
                console.error("Failed to connect.");
                ReportResults("openAsync error: " + AppServiceConnectionStatusString(result));
                return;
            }
            ReportResults("openAsync: " + "AppServiceConnectionStatus.success");
            Send();
            AppServiceStatus();
        }) // openAync
    }
}

function Send() {
    // Call the service.

    var message = new ValueSet();
    message.insert("Command", PropertyValue.createString("Connect"));
    message.insert("Role", PropertyValue.createString("DataStreamerConnect"));

    connection.sendMessageAsync(message, (error, response) => {
        ReportResults("sendMessageAsync: " + AppServiceConnectionStatusString(response.status));
        if (response.status === AppServiceResponseStatus.success) {
            var f = response.message.first();
            if (f.hasCurrent) {
                var ipvt = IPropertyValue.castFrom(f.current.value);
                var ipvts = ipvt.getString();
                console.log('DataStreamer::Send response', ipvts);
                ReportResults("Send result: " + ipvts);
            }
        }
    });
}

function Write() {
    var message = new ValueSet();
    message.insert("Command", PropertyValue.createString("Write"));
    message.insert("Data", PropertyValue.createString("10,20,30,40"));

    connection.sendMessageAsync(message, (error, response) => {
        ReportResults("sendMessageAsync: " + AppServiceResponseStatusString(response.status));
        if (response.status === AppServiceResponseStatus.success) {
            if (response.status === AppServiceResponseStatus.success) {
                var f = response.message.first();
                if (f.hasCurrent) {
                    var ipvt = IPropertyValue.castFrom(f.current.value);
                    var ipvts = ipvt.getString();
                    console.log('DataStreamer::Send response', ipvts);
                    ReportResults("Write result: " + ipvts);
                }
            }
        }
    });
}

function AppServiceStatus() {
    var message = new ValueSet();
    message.insert("Command", PropertyValue.createString("Status"));
    connection.sendMessageAsync(message, (error, response) => {
        ReportResults("AppServiceStatus::sendMessageAsync: " + AppServiceResponseStatusString(response.status));
        if (response.status === AppServiceResponseStatus.success) {
            if (response.status === AppServiceResponseStatus.success) {
                var f = response.message.first();
                while (f.hasCurrent) {
                    var ipvt = IPropertyValue.castFrom(f.current.value);
                    var ipvts = ipvt.getString();
                    if (f.current.key == "Data") {
                        UpdateConnectionStatus(ipvts);
                    }
                    console.log('DataStreamer::Send response', ipvts);
                    ReportResults("AppServiceStatus result: " + ipvts);
                    f.moveNext();
                }
            }
        }
    });
}

function AppServiceResponseStatusString(iVal) {
    switch (iVal) {
        case (AppServiceResponseStatus.success):
            return "AppServiceResponseStatus.success";
        case (AppServiceResponseStatus.failure):
            return "AppServiceResponseStatus.failure";
        case (AppServiceResponseStatus.resourceLimitsExceeded):
            return "AppServiceResponseStatus.resourceLimitsExceeded";
        case (AppServiceResponseStatus.unknown):
            return "AppServiceResponseStatus.unknown";
        case (AppServiceResponseStatus.remoteSystemUnavailable):
            return "AppServiceResponseStatus.remoteSystemUnavailable";
        case (AppServiceResponseStatus.messageSizeTooLarge):
            return "AppServiceResponseStatus.messageSizeTooLarge";
        default:
            return "";
    }
}


function AppServiceConnectionStatusString(iVal) {
    switch (iVal) {
        case (AppServiceConnectionStatus.success):
            return "AppServiceConnectionStatus.success";
        case (AppServiceConnectionStatus.appNotInstalled):
            return "AppServiceConnectionStatus.appNotInstalled";
        case (AppServiceConnectionStatus.appUnavailable):
            return "AppServiceConnectionStatus.appUnavailable";
        case (AppServiceConnectionStatus.appServiceUnavailable):
            return "AppServiceConnectionStatus.appServiceUnavailable";
        case (AppServiceConnectionStatus.unknown):
            return "AppServiceConnectionStatus.unknown";
        case (AppServiceConnectionStatus.remoteSystemUnavailable):
            return "AppServiceConnectionStatus.remoteSystemUnavailable";
        case (AppServiceConnectionStatus.remoteSystemNotSupportedByApp):
            return "AppServiceConnectionStatus.remoteSystemNotSupportedByApp";
        case (AppServiceConnectionStatus.notAuthorized):
            return "AppServiceConnectionStatus.notAuthorized";
        default:
            return "";
    }
}

function ReportResults(strResult) {
    document.querySelector('#txtResults').value += "\n" + strResult;
}

function UpdateConnectionStatus(str) {
    //"Client:False,Excel:True"
    var res = str.split(",");
    var client = res[0].split(":");
    var excel = res[1].split(":");
    if (client[1] == "True") {
        document.querySelector('#cbClient').checked = true;
        clientConnected = true;
    }
    if (excel[1] == "True") {
        document.querySelector('#cbExcel').checked = true;
        excelConnected = true;
        document.querySelector('#btnWrite').disabled = false;
        document.querySelector('#btnWrite').className = "buttonEnabled";
    } else {
        document.querySelector('#cbExcel').checked = false;
        excelConnected = false;
        document.querySelector('#btnWrite').disabled = true;
        document.querySelector('#btnWrite').className = "buttonDisabled";

    }
}
document.onreadystatechange = () => {
    document.querySelector('#btnConnect').addEventListener('click', Connect);
    document.querySelector('#btnWrite').addEventListener('click', Write);
}

