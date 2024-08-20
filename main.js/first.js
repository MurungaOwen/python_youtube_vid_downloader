// frontend.js
if(ready){
    async function sendYouTubeUrl() {
        const url = document.getElementById("URL").value;
        console.log("url is ",url)
        const response = await fetch('http://127.0.0.1:8000/download', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url })
        });
    
        const data = await response.json();
        console.log(data)
        document.getElementById("title").innerText = data.video_info.title
        document.getElementById("thumbnail").src = data.video_info.thumbnail
        document.getElementById("vid-download").href = data.video_info.download_link
        console.log("download link is ", data.video_info.download_link)
    }
} else{
    alert("Enter URL")
}


document.getElementById("search").addEventListener("click", sendYouTubeUrl);
const kelly = document.getElementById("kelly")
function whenDownload(){
    kelly.classList.add("visible")
    kelly.classList.remove("d-none")
}
document.getElementById("search").addEventListener("click",whenDownload)

function lookForContent(){
    const URL = document.getElementById("URL").value
    if(URL.length === 0){
        alert("Enter URL")
    }else{
        ready = true
    }
}
document.getElementById("search").addEventListener("click",lookForContent)