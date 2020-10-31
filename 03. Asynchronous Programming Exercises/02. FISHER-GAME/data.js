const baseUrl = `https://fisher-game.firebaseio.com/`;

export function data() {
    return {
        loadData: () => fetch(`${baseUrl}catches.json`).then(resources => resources.json()),
        deleteCatch: (id, headers) => fetch(`${baseUrl}catches/${id}.json`, headers),
        addCatch: (headers) => fetch(`${baseUrl}catches.json`, headers),
        updateCatch: (id, headers) => fetch(`${baseUrl}catches/${id}.json`, headers)
    }
}