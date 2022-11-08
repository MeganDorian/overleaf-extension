
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
