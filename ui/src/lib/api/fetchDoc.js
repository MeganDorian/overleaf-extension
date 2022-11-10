// Returns what localhost returns
export async function fetchDoc(docUrl) {
    let content = await fetch(docUrl)
        .then(response => response.blob())

    console.log(`Fetched ${content.size} bytes...`);

    return fetch(
        "http://localhost:19022/file",
        {
            method: "POST",
            body: content
        }
    )
        .then(res => res.json())
        .then(json => json.code)
        .catch(console.error)
}

let lastCallback;

export function requestDoc(callback) {
    console.log("Doc requested... Cookies:");
    console.log(chrome.cookies);

    lastCallback = callback;

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, "My message");
    });
}

chrome.runtime.onMessage.addListener((message) => {
    console.log(`Received message: ${JSON.stringify(message)}`);
    if (message.ok) {
        fetchDoc(message.url)
            .then(lastCallback)
            .catch(console.error);
    }
})
