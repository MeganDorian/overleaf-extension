
const OVERLEAF_COMPILE_URL="/compile?enable_pdf_caching=true";

let overleaf_compile_body = {
    check: "silent",
    draft: false,
    incrementalCompilesEnabled: true,
    rootDoc_id: undefined
}

let csrfToken;

async function compilePdf() {
    rootDic_id = document.getElementsByName('rootDoc_id')[0].value.split(':')[1];
    overleaf_compile_body.rootDoc_id = rootDic_id;

    console.log(`rootDoc_id: ${rootDic_id}`);
    console.log(`CSRF Token: ${csrfToken}`);

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

// Compile on request
function sendError(error) {
    return chrome.runtime.sendMessage({
        ok: false,
        error
    })
}

function sendUrl(url) {
    return chrome.runtime.sendMessage({
        ok: true,
        url
    });
}

console.log("Content Script running...");
chrome.runtime.onMessage.addListener((msg, sender) => {
    console.log(`Content script: ${msg}`)
    compilePdf()
        .then(sendUrl)
        .catch(sendError);
});

// Snatch CSRF:
console.log('Injecting script...');
window.addEventListener(
    "message",
    (event) => {
        csrfToken = event.data;
        console.log(`Snatched CSRF Token: ${csrfToken}`);
    }
)

let body = document.getElementsByTagName('body')[0];
let script = document.createElement('script');
script.setAttribute('src', chrome.runtime.getURL('snatch-csrf-token.js'));
script.setAttribute('type', 'text/javascript');
body.appendChild(script);
