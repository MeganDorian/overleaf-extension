
function log(obj) {
    console.log("[INJECTED]", obj);
}

function sendMessage(name, msg) {
    log(`Sending "${name}" to content script...`)
    window.postMessage(JSON.stringify({name, msg, sender: "injected"}));
}
// Send CSRF Token to the content script
sendMessage('csrf-token', window.csrfToken);

let ole_scope = window.angular.element(document.getElementsByName('rootDoc_id')[0]).scope();

window.addEventListener("message", event => {
    let { name, sender } = JSON.parse(event.data);

    if (sender !== "content")
        return;

    log(`Got "${name}" from content script`);
    if (name === "get-current-file") {
        let data = {};
        data.id   = ole_scope.editor.open_doc_id;
        data.file = ole_scope.editor.open_doc_name;
        sendMessage("current-file", data);
    }
})


