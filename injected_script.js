
function log(obj) {
    console.log("[INJECTED]", obj);
}

function sendMessage(name, msg) {
    log(`Sending "name" to content script...`)
    window.postMessage(JSON.stringify({name, msg}));
}
// Send CSRF Token to the content script
sendMessage('csrf-token', window.csrfToken);

let ole_scope = window.angular.element(document.getElementsByName('rootDoc_id')[0]).scope();

window.addEventListener("message", event => {
    if (event.data === "get-current-file") {
        let data = {};
        data.id   = ole_scope.editor.open_doc_id;
        data.name = ole_scope.editor.open_doc_name;
        sendMessage("current-file", data);
    }
})


