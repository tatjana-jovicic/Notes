const postCoitainer = document.getElementById("posts");
const buttonClear = document.getElementById("button-clear");
const buttonShow = document.getElementById("button-show");

const inputFormPostHeadline = document.getElementById("form-post-headline");
const inputFormPostDescription = document.getElementById(
  "form-post-description"
);
const inputFormPostCreateButton = document.getElementById(
  "form-post-button-create"
);

const inputFormUpdateIndex = document.getElementById("form-update-index");
const inputFormUpdateHeadline = document.getElementById("form-update-headline");
const inputFormUpdateDescription = document.getElementById(
  "form-update-description"
);
const inputFormUpdateButton = document.getElementById(
  "form-update-button-create"
);

const errorMessage = document.getElementById("error_message");
const errorMessageHeadline = document.getElementById("error-message-headline");
const errorMessageDescription = document.getElementById(
  "error-message-description"
);
const inputSearch = document.getElementById("input-search");
let isContentRendered = false;
let editIsClick = false;
let indeks = "";
let alphabetRegex = /^[a-zA-Z\s]+$/;

const posts = [
  {
    headline: "Take your notes!",
    description: "Write down important things.",
  },
  {
    headline: "Prijava za Klika Praksu 2024!",
    description: "Poslati CV i motivaciono pismo.",
  },
  {
    headline: "Hello world!",
    description: "Hello world decription.",
  },
];

function validateText(value, minChar) {
  if (value.length < minChar || !alphabetRegex.test(value)) {
    return false;
  }
  return true;
}

function handleHeadlineValidation() {
  if (!validateText(inputFormPostHeadline.value, 3)) {
    errorMessageHeadline.classList.remove("hidden");
    inputFormPostHeadline.classList.add("border-red");
    return false;
  } else {
    errorMessageHeadline.classList.add("hidden");
    inputFormPostHeadline.classList.remove("border-red");
    return true;
  }
}

function handleDescriptionValidation() {
  if (!validateText(inputFormPostDescription.value, 5)) {
    errorMessageDescription.classList.remove("hidden");
    inputFormPostDescription.classList.add("border-red");
    return false;
  } else {
    errorMessageDescription.classList.add("hidden");
    inputFormPostDescription.classList.remove("border-red");
    return true;
  }
}

function handleCreateFormValidation() {
  let isValid = true;
  if (!handleHeadlineValidation()) {
    isValid = false;
  }

  if (!handleDescriptionValidation()) {
    isValid = false;
  }

  if (isValid) {
    inputFormPostCreateButton.disabled = false;
  } else {
    inputFormPostCreateButton.disabled = true;
  }

  return isValid;
}

const ShowPosts = () => {
  if (!isContentRendered) {
    RenderPosts(posts);
    isContentRendered = true;
  }
};

const RenderPosts = (postsToRender) => {
  postCoitainer.innerHTML = "";
  for (let index = 0; index < postsToRender.length; index++) {
    postCoitainer.innerHTML += `
            <div class ="post_card">
                <div class="post_top">
                        <div>
                            <h2>${postsToRender[index].headline}</h2>
                            <h3>${postsToRender[index].description}</h3>
                        </div>
                        <button data-id="${index}" onclick="editButtonOnClick(${index})" class="post_edit">edit</button>
                    </div>
            </div>
        `;
  }
};

function addPost(headline, description) {
  let isValid = handleCreateFormValidation();
  if (isValid) {
    posts.push({
      headline: headline,
      description: description,
    });

    RenderPosts(posts);
  }
}

function editButtonOnClick(id) {
  // console.log(id);
  indeks = id;
  inputFormUpdateIndex.classList.add("hidden");

  inputFormUpdateHeadline.value = posts[id].headline; //moze ovako
  document.getElementById("form-update-description").value =
    posts[id].description; //a moze i ovako
  editIsClick = true;
}

ShowPosts();

buttonClear.onclick = function () {
  postCoitainer.innerHTML = "";
  isContentRendered = false;
};

buttonShow.onclick = function () {
  ShowPosts();
};

inputFormPostCreateButton.onclick = () => {
  addPost(inputFormPostHeadline.value, inputFormPostDescription.value);
};

inputFormPostHeadline.oninput = () => {
  handleCreateFormValidation();
};

inputFormPostDescription.oninput = () => {
  handleCreateFormValidation();
};

inputSearch.oninput = () => {
  let foundPosts = [];
  for (let index = 0; index < posts.length; index++) {
    if (
      posts[index].headline
        .toLowerCase()
        .includes(inputSearch.value.toLowerCase())
    ) {
      foundPosts.push(posts[index]);
    }
  }

  RenderPosts(foundPosts);
};

inputFormUpdateButton.onclick = () => {
  let idIndex = inputFormUpdateIndex.value;

  if (!editIsClick) {
    posts[idIndex].headline = inputFormUpdateHeadline.value;
    posts[idIndex].description = inputFormUpdateDescription.value;
  } else {
    posts[indeks].headline = inputFormUpdateHeadline.value; //moze ovako
    posts[indeks].description = document.getElementById(
      "form-update-description"
    ).value; // a moze i ovako preko elementa
  }

  RenderPosts(posts);
};
