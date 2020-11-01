const apiID = '3823A5DA-A215-F437-FFC2-B31450B8A500';
const apiKey = 'F176B356-9F62-469D-BFED-39715CAEAC1F';

export async function getBooks(){
    const url = `https://api.backendless.com/${apiID}/${apiKey}/data/Books`;
    return await (await fetch(url)).json();
}
export async function createBook(book){
    const url = `https://api.backendless.com/${apiID}/${apiKey}/data/Books`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(book)
    });
    const data = await response.json();
    return data;
}
export async function updateBook(book){
    const id = book.objectId;
    const url = `https://api.backendless.com/${apiID}/${apiKey}/data/Books/${id}`;
    const response = await fetch(url, {
        method: "PUT",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(book)
    })
    const data = await response.json();
    return data;
}
export async function deleteBook(id){
    const url = `https://api.backendless.com/${apiID}/${apiKey}/data/Books/${id}`;
    const response = await fetch(url, {method: 'DELETE'});
    const data = await response.json();
    return data;
}
