
console.log("Injecting script...");
let body = document.getElementsByTagName('body')[0];
let script = document.createElement('script');
script.setAttribute('src', chrome.runtime.getURL('get-link.js'));
script.setAttribute('type', 'text/javascript');
body.appendChild(script);

chrome.runtime.onMessage.addListener(
    (msg, sender) => {
        console.log(`${sender.origin} sent "${msg}"`);
        window.postMessage("get-pdf");
    });

window.addEventListener("message", (event) => {
    if (event.data === "get-pdf")
        return;

    console.log(`Content script hot a message: ${event.data}`);

    let msg;

    if (event.data === "error")
        msg = {ok: false};
    else
        msg = {ok: true, url: event.data};

    chrome.runtime.sendMessage(msg);
})



