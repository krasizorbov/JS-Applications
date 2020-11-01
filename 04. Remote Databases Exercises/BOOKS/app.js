import * as data from './data.js';
function books(){
    let tbody = document.getElementsByTagName("tbody")[0];
    const loadBtn = document.getElementById("loadBooks");
    const submitBtn = document.getElementsByTagName("form")[0][3];

    loadBtn.addEventListener("click", loadBooks);
    submitBtn.addEventListener("click", createBook);

    async function loadBooks(){
        reloadBooks();
        let result = await data.getBooks();
        result.forEach(obj => {
            const tr = ce("tr", "", "", obj.objectId);
            const title = ce("td", obj.title);
            const author = ce("td", obj.author);
            const isbn = ce("td", obj.isbn);
            const td = ce("td");
            const editBtn = ce("button", "Edit");
            editBtn.addEventListener("click", updateBook);
            const deleteBtn = ce("button", "Delete");
            deleteBtn.addEventListener("click", deleteBook);
            td.appendChild(editBtn);
            td.appendChild(deleteBtn);
            tr.appendChild(title);
            tr.appendChild(author);
            tr.appendChild(isbn);
            tr.appendChild(td);
            tbody.appendChild(tr);
        })  
    }

    function reloadBooks(){
        let arr = tbody.children;
        for(let i = 2; i < arr.length; i++){
            arr[i].remove();
            i--;
        }
    }

    async function createBook(e){
        e.preventDefault();
        const form = document.getElementsByTagName("form")[0];
        const title = form[0].value;
        const author = form[1].value;
        const isbn = form[2].value;
        if (title === "" || author === "" || isbn === "") {
            return;
        }  
        try{
            await data.createBook({title: title, author: author, isbn: isbn});
        } catch(error){
            console.log(error);
        }
        form[0].value = "";
        form[1].value = "";
        form[2].value = "";
    }

    async function updateBook(){
        let tr = this.parentNode.parentNode;

        const id = tr.id;
        const title = tr.children[0];
        const author = tr.children[1];
        const isbn = tr.children[2];

        const titleInput = ce("input", "", "", "", ["type", "text"], ["value", title.textContent]);
        const authorInput = ce("input", "", "", "", ["type", "text"], ["value", author.textContent]);
        const isbnInput = ce("input", "", "", "", ["type", "text"], ["value", isbn.textContent]);

        title.textContent = "";
        author.textContent = "";
        isbn.textContent = "";
        
        title.appendChild(titleInput);
        author.appendChild(authorInput);
        isbn.appendChild(isbnInput);

        this.textContent = "Save";
        this.nextElementSibling.textContent = "Cancel";
        this.removeEventListener("click", updateBook);
        this.nextElementSibling.removeEventListener("click", deleteBook);

        this.nextElementSibling.addEventListener("click", () => {
            titleInput.remove();
            authorInput.remove();
            isbnInput.remove();

            title.textContent = titleInput.value;
            author.textContent = authorInput.value;
            isbn.textContent = isbnInput.value;
            
            this.textContent = "Edit";
            this.nextElementSibling.textContent = "Delete";
            this.nextElementSibling.addEventListener("click", deleteBook);
            this.addEventListener("click", updateBook);
            loadBooks();
        })

        this.addEventListener("click", () => {
            const book = {title: titleInput.value, author: authorInput.value, isbn: isbnInput.value, objectId: id};
            data.updateBook(book);

            titleInput.remove();
            authorInput.remove();
            isbnInput.remove();

            title.textContent = titleInput.value;
            author.textContent = authorInput.value;
            isbn.textContent = isbnInput.value;

            this.textContent = "Edit";
            this.nextElementSibling.textContent = "Delete";
            this.nextElementSibling.addEventListener("click", deleteBook);
            this.addEventListener("click", updateBook);
        })
    }

    async function deleteBook(){
        const id = this.parentNode.parentNode.id; 
        this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
        try{
            this.disabled = true;
            this.textContent = "Please wait...";
            await data.deleteBook(id);
        } catch(error){
            this.disabled = false;
            this.textContent = "Delete";
            console.log(error);
        } 
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
books();