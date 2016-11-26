export function parseJson(response) {
    return response.json()
}

export function handleError(err) {
    console.log(`get error, ${err}`);
}