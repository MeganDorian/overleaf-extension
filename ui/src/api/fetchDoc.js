
// Returns what localhost returns
export async function fetchDoc(docUrl, nativeUrl) {
    let content = await fetch(docUrl)
        .then(response => response.blob())

    console.log(`Fetched ${content.size} bytes...`);

    return fetch(
        nativeUrl,
        {
            method: "POST",
            body: content
        }
    )
        .then(res => res.json())
        .then(json => json.code)
        .catch(console.error)
}

export async function requestDoc() {
    console.log("Doc requested... Cookies:");
    console.log(chrome.cookies);

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, "My message");
    });

}

chrome.runtime.onMessage.addListener((message, sender) => {
    console.log(`Received message: ${JSON.stringify(message)}`);
    if (message.ok) {
        fetchDoc(message.url, "http://localhost:19022/file");
    }
})
