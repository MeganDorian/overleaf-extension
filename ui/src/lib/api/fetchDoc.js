// Returns what localhost returns
export async function fetchDoc(docUrl) {
    let content = await fetch(docUrl)
        .then((response) => response.blob())
        .catch(console.error)

    if (content === undefined) return

    console.log(`Fetched ${content.size} bytes...`)
    return fetch('http://localhost:19022/file', {
        method: 'POST',
        body: content,
    })
        .then((res) => res.json())
        .then((json) => json.code)
        .catch(console.error)
}

let lastCallback

/*
 * callback(info)
 * info is js-object
 *
 * If everything is ok:
 * {
 *   ok: true,
 *   fileName: "<.tex file name>",
 *   fileCode: <code of the file that was returned by native server>
 * }
 *
 * If failed:
 * {
 *   ok: false
 *   fileName: "<.tex file name>" - can be undefined!
 *   error: "<error description>" - can be undefined!
 * }
 */
export async function requestDoc(callback) {
    console.log('Requested doc...')
    if (lastCallback !== undefined) {
        console.warn('One request is already in action... aborted')
        return
    }

    lastCallback = callback

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, 'My message')
    })
}

export function abortRequest() {
    console.log('Aborting request')
    lastCallback = undefined
}

chrome.runtime.onMessage.addListener(async (message) => {
    function callbackWrap(code) {
        if (lastCallback) {
            let info = {
                fileName: message.file,
                error: message.error,
            }

            if (code) {
                info.ok = true
                info.fileCode = code
            } else {
                info.ok = false
            }
            lastCallback(info)

            lastCallback = undefined
        }
    }

    console.log(`Received message: ${JSON.stringify(message)}`)
    if (message.ok) {
        fetchDoc(message.url, 'http://localhost:19022/file')
            .then(callbackWrap)
            .catch(console.error)
    } else {
        callbackWrap(undefined)
    }
})
