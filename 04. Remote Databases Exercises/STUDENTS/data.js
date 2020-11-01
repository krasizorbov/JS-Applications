const apiID = '976A1E11-BD8E-EC4F-FF43-FEA6EBD52700';
const apiKey = '9F89216D-62F1-4B86-8AFB-60A3861A6101';

export async function getStudents(){
    const url = `https://api.backendless.com/${apiID}/${apiKey}/data/Students`;
    return await (await fetch(url)).json();
}
export async function createStudent(student){
    const url = `https://api.backendless.com/${apiID}/${apiKey}/data/Students`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(student)
    });
    const data = await response.json();
    return data;
}