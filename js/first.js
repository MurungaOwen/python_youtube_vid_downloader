// frontend.js
let ready = false;
const result = document.getElementById("results");
const loader = document.getElementById("loader");

async function sendYouTubeUrl() {
    const url = document.getElementById("URL").value;
    console.log("url is ", url);

    if (ready) {
        try {
            // Show the loader before starting the fetch
            loader.classList.remove("d-none");
            loader.classList.add("visible");

            const response = await fetch('http://127.0.0.1:8000/download', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url })
            });

            const data = await response.json();
            console.log(data);

            if (data) {
                // Hide the loader after receiving the response
                loader.classList.add("d-none");
                loader.classList.remove("visible");
                
                result.classList.add("visible");
                result.classList.remove("d-none");

                document.getElementById("title").innerText = data.title || "None";
                document.getElementById("thumbnail").src = data.thumbnail;
                document.getElementById("vid-download").href = data.download_link;
                console.log("download link is ", data.download_link);
            } else {
                alert("Enter a valid URL");
            }
        } catch (error) {
            // Hide the loader if an error occurs
            loader.classList.add("d-none");
            loader.classList.remove("visible");

            alert("Enter a valid URL");
        }
    } else {
        alert("Please enter a URL");
    }
}




function lookForContent(){
    const URL = document.getElementById("URL").value
    if(URL.length === 0){
        alert("Enter URL")
    }else{
        ready = true
    }
}
function whenSearched(){
    lookForContent();
}
// loader
document.getElementById("search").addEventListener("click",whenSearched)

document.getElementById("search").addEventListener("click", sendYouTubeUrl)