console.log("Let's get this party started!");
const removebtn = document.getElementById('remove-all-content');
const gifdisplay = document.getElementById("gif-display")

removebtn.addEventListener("click", function(){
    gifdisplay.innerHTML="";
})