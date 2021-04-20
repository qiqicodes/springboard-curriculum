console.log("Let's get this party started!");

const removeBtn = $("#remove-all-content");
const gifDisplay = $("#gif-display");
const searchContent = $("#search-content");

// use ajax result data to add gif
function addGif(result) {
    let numResult = result.data.length;
    if (numResult) {
        let randomIndex = Math.floor(Math.random() * numResult);
        let newCard = $("<div>", { class: "col-lg-4 col-12 mt-3 mb-3" });
        let newGif = $("<img>", { 
            class: "w-100", 
            src: result.data[randomIndex].images.original.url 
        });
        newCard.append(newGif);
        gifDisplay.append($(newCard));
    }
}

// clear search box and make ajax call
$("form").on("submit", async function(event){
    event.preventDefault();

    let search = searchContent.val();
    searchContent.val("");

    // make call
    const response = await axios.get("http://api.giphy.com/v1/gifs/search", {
        params: {
            q: search,
            api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym"
        }
    });

    // add gif
    addGif(response.data);
});

// remove gif
$(removeBtn).on("click", function(){
    gifDisplay.empty();
}) 