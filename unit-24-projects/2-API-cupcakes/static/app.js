BASE_URL = "http://localhost:5000/api";
CUPCAKE_LIST = document.getElementById("cupcake-list");
NEW_CUPCAKE_FORM = document.getElementById("add-cupcake-form");
EDIT_CUPCAKE_FORM = document.getElementById("edit-cupcake-form");
FLAVOR_INPUT = document.getElementById("flavor");
SIZE_INPUT = document.getElementById("size");
RATING_INPUT = document.getElementById("rating");
IMAGE_URL_INPUT = document.getElementById("image_url");

function generateCupcakeHTML(cupcake) {
  return `
        <div class="col-sm-6 col-md-4 card" style="width: 18rem;" data-cupcake-id=${cupcake.id}>
            <img class="card-img-top" src="${cupcake.image_url}" alt="${cupcake.flavor}-cupcake">
            <div class="card-body">
                <h2 class="card-title">${cupcake.flavor}</h2>
                <ul>
                    <li>${cupcake.size}</li>
                    <li>${cupcake.rating}</li>
                </ul>
                <a href="#" class="btn btn-primary" id="edit-button">Edit</a>
                <a href="#" class="btn btn-danger" id="delete-button">Delete</a>
            </div>
        </div>
    `;
}

async function showInitalCupcakes() {
  const res = await axios.get(`${BASE_URL}/cupcakes`);
  for (let cupcake of res.data.cupcakes) {
    let cupcakeHTML = generateCupcakeHTML(cupcake);
    CUPCAKE_LIST.innerHTML += cupcakeHTML;
  }
}

NEW_CUPCAKE_FORM.addEventListener("submit", async function (e) {
  e.preventDefault();
  let flavor = FLAVOR_INPUT.value;
  let size = SIZE_INPUT.value;
  let rating = RATING_INPUT.value;
  let image_url = IMAGE_URL_INPUT.value;

  const res = await axios.post(`${BASE_URL}/cupcakes`, {
    flavor,
    size,
    rating,
    image_url,
  });

  let newCupcakeHTML = generateCupcakeHTML(res.data.new_cupcake);
  CUPCAKE_LIST.innerHTML += newCupcakeHTML;
  NEW_CUPCAKE_FORM.reset();
});

showInitalCupcakes();

CUPCAKE_LIST.addEventListener("click", async function (e) {
  e.preventDefault();

  //   delete cupcake
  if (e.target.getAttribute("id") === "delete-button") {
    let cupcakeDiv = e.target.parentElement.parentElement;

    let cupcakeId = cupcakeDiv.getAttribute("data-cupcake-id");
    await axios.delete(`${BASE_URL}/cupcakes/${cupcakeId}`);
    cupcakeDiv.remove();
  }
});
