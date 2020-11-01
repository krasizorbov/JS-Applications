import * as data from './data.js';
function students(){
    let tbody = document.getElementsByTagName("tbody")[0];
    const loadBtn = document.getElementById("loadStudents");
    const submitBtn = document.getElementsByTagName("form")[0][5];

    loadBtn.addEventListener("click", loadStudents);
    submitBtn.addEventListener("click", createStudent);

    async function loadStudents(){
        reloadStudents();
        let result = await data.getStudents();
        result.sort((a, b) => a.id - b.id).forEach(obj => {
            const tr = ce("tr");
            const id = ce("td", obj.id);
            const fName = ce("td", obj.firstName);
            const lName = ce("td", obj.lastName);
            const fNumber = ce("td", obj.facultyNumber);
            const grade = ce("td", obj.grade);

            tr.appendChild(id);
            tr.appendChild(fName);
            tr.appendChild(lName);
            tr.appendChild(fNumber);
            tr.appendChild(grade);
            tbody.appendChild(tr);
        })  
    }

    function reloadStudents(){
        let arr = tbody.children;
        for(let i = 1; i < arr.length; i++){
            arr[i].remove();
            i--;
        }
    }

    async function createStudent(e){
        e.preventDefault();
        const form = document.getElementsByTagName("form")[0];
        const id = form[0].value;
        const firstName = form[1].value;
        const lastName = form[2].value;
        const facultyNumber = form[3].value;
        const grade = form[4].value;

        if (id === "" || Number.isNaN(Number(id.value)) || firstName === "" || lastName === "" || 
            facultyNumber === "" || grade === "" || Number.isNaN(Number(grade.value))) {
            return;
        }  
        try{
            await data.createStudent({
                id: Number(id), 
                firstName: firstName, 
                lastName: lastName, 
                facultyNumber: facultyNumber, 
                grade: Number(grade)
            });
        } catch(error){
            console.log(error);
        }
        form[0].value = "";
        form[1].value = "";
        form[2].value = "";
        form[3].value = "";
        form[4].value = "";
        loadStudents();
    }

    function ce(el, text, className, id, attType, attValue) {
        let e = document.createElement(el);
        if (text) {
          e.textContent = text;
        }
        if (className) {
          e.classList = className;
        }
        if (id) {
          e.id = id;
        }
        if (attType) {
            e.setAttribute(attType[0], attType[1]);
        }
        if (attValue) {
            e.setAttribute(attValue[0], attValue[1]);
        }
        return e;
      }
}
students();