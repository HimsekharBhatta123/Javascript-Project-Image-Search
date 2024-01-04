const accessKey="DHOS54Om0CWYCSUfFyab9t87hA8-mHe1HoiyHp-97WI";

let form=document.querySelector("form")
let inp=document.getElementById("search-input")
let searchResults=document.querySelector(".search-results")
let showMore=document.getElementById("show-more-btn")

let inputData=""
let page=1

async function searchImages(){
    inputData=inp.value;
    const url=`http://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    const response=await fetch(url);
    const data=await response.json();
    const results=data.results;

    if(page===1){
        searchResults.innerHTML="";
    }

    results.map((result)=>{
        const imagewrap=document.createElement("div")
        imagewrap.classList.add("search-result")
        const image=document.createElement("img")
        image.src=result.urls.small
        image.alt=result.alt_description
        const imagelink=document.createElement("a")
        imagelink.href=result.links.html
        imagelink.target= "_blank"
        imagelink.textContent=result.alt_description

        imagewrap.appendChild(image)
        imagewrap.appendChild(imagelink)
        searchResults.appendChild(imagewrap)
    });
    page++
    if(page>1){
        showMore.style.display="block"
    }
}
form.addEventListener("submit",(event)=>{
    event.preventDefault();
    page=1
    searchImages()
});

showMore.addEventListener("click",()=>{
    searchImages()
});