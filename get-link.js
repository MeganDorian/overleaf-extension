
function log(obj) {
    console.log("[CONTENT]", obj);
}

const OVERLEAF_COMPILE_URL="/compile?enable_pdf_caching=true";

let overleaf_compile_body = {
    check: "silent",
    draft: false,
    incrementalCompilesEnabled: true,
    rootDoc_id: undefined
}

let csrfToken;

async function compilePdf(rootDocId) {
    log(`rootDoc_id: ${rootDocId}`);
    log(`CSRF Token: ${csrfToken}`);

    overleaf_compile_body.rootDoc_id = rootDocId;

    return fetch(window.location.href + OVERLEAF_COMPILE_URL, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "x-csrf-token": csrfToken
            },
            body: JSON.stringify(overleaf_compile_body)
        })
        .then(res => res.json())
        .then(json => {
            if (json.status !== 'success')
                throw Error('Could not compile PDF...');

            let url = undefined;
            json.outputFiles.forEach((e) => {
                if (e.path === "output.pdf")
                    url = e.url;
            })

            if (url === undefined)
                throw Error("output.pdf wasn't compiled");

            return origin + url;
        });
}

function sendError(error) {
    return chrome.runtime.sendMessage({
        ok: false,
        error
    })
}

function sendFileInfo(info) {
    info.ok = true;
    return chrome.runtime.sendMessage(info);
}

function makeRequest(name) {
    log(`Requested "${name} from injected script...`);
    window.postMessage(name);
}

log("Content Script running...");
chrome.runtime.onMessage.addListener((msg) => {
    log(`Received message: ${msg}`);
    makeRequest("get-current-file");
});

// Script injection:
/// Setup listeners:
const LISTENERS = {
    "csrf-token": (token) => { csrfToken = token },
    "current-file": (data) => {
        compilePdf(data.id)
            .then(url => {
                data.url = url;
                sendFileInfo(data);
            })
            .catch(sendError);
    }
}

function messageListener(event) {
    let { name, msg }  = JSON.parse(event.data);
    log(`Got "${name}" from injected script`);
    LISTENERS[name](msg);
}

// Inject:
log('Injecting script...');
window.addEventListener("message", messageListener);

let body = document.getElementsByTagName('body')[0];
let script = document.createElement('script');
script.setAttribute('src', chrome.runtime.getURL('injected_script.js'));
script.setAttribute('type', 'text/javascript');
body.appendChild(script);

// Get CSRF Token:
makeRequest('csrf-token');
