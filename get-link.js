
const OVERLEAF_COMPILE_URL="/compile?enable_pdf_caching=true";

const OVERLEAF_COMPILE_BODY = {
    check: "silent",
    draft: false,
    incrementalCompilesEnabled: true,
    rootDoc_id: project_id
}

async function compilePdf() {
    return fetch(window.location.href + OVERLEAF_COMPILE_URL, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "x-csrf-token": csrfToken
            },
            body: JSON.stringify(OVERLEAF_COMPILE_BODY)
        })
        .then(res => res.json())
        .then(json => {
            if (json.status !== 'success')
                throw Error('Could not compile PDF...');

            let url;
            json.outputFiles.forEach((e) => {
                if (e.path === "output.pdf")
                    url = e.url;
            })
            return origin + url;
        });
}

console.log("Content Script running...");
window.addEventListener("message", (e) => {
    if (e.data !== "get-pdf")
        return;

    console.log(`Injected script: got message: ${e.data}`);
    compilePdf()
        .then((url) => {
            window.postMessage(url)
        })
        .catch((err) => {
            console.error("Error occurred while loading PDF...")
            console.error(err)
            window.postMessage("error");
        })

})