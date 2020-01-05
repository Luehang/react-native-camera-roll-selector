export function findUri (data) {
    return data.source
        ? data.source : data.uri
        ? { uri: data.uri } : data.URI
        ? { uri: data.URI } : data.url
        ? { uri: data.url } : data.URL
        ? { uri: data.URL } : undefined;
}
