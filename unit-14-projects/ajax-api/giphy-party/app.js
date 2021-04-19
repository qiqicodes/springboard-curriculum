console.log("Let's get this party started!");
const removeBtn = $("#remove-all-content");
const gifDisplay = $("#gif-display");
const searchContent = $("#search-content");

// use ajax result data to add gif
function addGif(data) {
 
}

// clear search box and make ajax call
$("form").on("submit", function(event){
    event.preventDefault();
})

// remove gif
$(removeBtn).on("click", function(){
    gifDisplay.empty();
}) 