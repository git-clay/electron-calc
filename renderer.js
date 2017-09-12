// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
let $ = window.$ = window.jQuery = require('jquery');
let ipc = require('electron').ipcRenderer;

let buttons = $('button')

let buttonsArray = [].slice.call(buttons)
buttonsArray.forEach(function(element,idx) {
    element.addEventListener('click', function(){
        if($('#output').html()!=""){
                $('#output').html("")
        }
        switch(element.id){
            case "submit":
                ipc.send('asynchronous-message', {"submit":""})
            case "+":
            case "-":
            case "*":
            case "/":
                ipc.send('asynchronous-message', {"op":element.id})
                break;
            default:
                ipc.send('asynchronous-message', {"num":parseInt(element.id)})
                break;
        }
    })
}, this);

ipc.on('asynchronous-reply', function (event, arg) {
    $('#output').html(arg)
})
