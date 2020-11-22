const errorDiv = document.getElementById('errorBox');

export default function(message){
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 3000)
}


        