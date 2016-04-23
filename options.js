var name = "";
var color = "";
var custom_css = "";
var statusDisplay = null;

function updateSettings() {
    // Cancel the form submit
    event.preventDefault();

    name = document.getElementById('name').value;
    color = document.getElementById('color').value;
    custom_css = document.getElementById('custom_css').value;

    chrome.storage.local.set({'name': name});
    chrome.storage.local.set({'color': color});
    chrome.storage.local.set({'custom_css': custom_css});

    statusDisplay.innerHTML = 'Saved';
}

// When the popup HTML has loaded
window.addEventListener('load', function(evt) {

    getData();

    // Cache a reference to the status display SPAN
    statusDisplay = document.getElementById('status-display');
    document.getElementById('settings').addEventListener('submit', updateSettings);
});

function getData() {
    chrome.storage.local.get('name', function (data) {
        name = data.name;
        document.getElementById('name').value = name;
    });

    chrome.storage.local.get('color', function (data) {
        color = data.color;
        document.getElementById('color').value = color;
    });

    chrome.storage.local.get('custom_css', function (data) {
        custom_css = data.custom_css;
        document.getElementById('custom_css').value = custom_css;
    });
}

function echoData(){
    console.log("name: "+name);
    console.log("color: "+color);
    console.log("custom_css: "+custom_css);
}