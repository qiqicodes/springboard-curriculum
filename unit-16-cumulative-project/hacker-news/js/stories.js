"use strict";

let storyList;

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

// DONE: modify this function to show Fav Stars - DONE, and Delete Button - DONE based on Boolean of currentUser variable
// init currentUser as null
function generateStoryMarkup(story, loggedInUser = false) {
  console.debug("generateStoryMarkup");
  const hostName = story.getHostName();

  const loggedUser = Boolean(currentUser);

  return $(`
      <li id="${story.storyId}">
      ${loggedInUser ? deleteBtnHtml() : ""}
      ${loggedUser ? getStarHTML(story, currentUser) : ""}
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        ${loggedInUser ? updateBtnHtml() : ""}
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

function getStarHTML(story, currentUser) {
  const isFavorite = currentUser.isFavorite(story);

  const favStar = isFavorite ? "fas" : "far";

  return `
    <span class="star">
      <i class="${favStar} fa-star"></i>
    </span>
  `;
}

const deleteBtnHtml = () => `
  <span class="trash">
    <i class="fas fa-trash"></i>
  </span>
`;

const updateBtnHtml = () => `
  <span class="edit">
    <i class="far fa-edit"></i>
  </span>
`;
// DONE: delete story
// remove story from the array and dom
// dependent on user storylist.
// N> storyId, token

async function getUpdateStoryForm(e) {
  console.debug("getUpdateStoryForm");
  e.preventDefault();

  const storyId = $(e.target).closest("li").attr("id");
  const story = await storyList.getStory(storyId);

  const { title, author, url } = story;
  $("#current-title").val(title);
  $("#current-author").val(author);
  $("#current-url").val(url);
  $updateStoryForm.attr("class", storyId);
  $updateStoryForm.show();
}

$body.on("click", ".edit", getUpdateStoryForm);

async function updateStory(e) {
  console.debug("updateStory");
  e.preventDefault();

  const storyId = $(e.target).closest("form").attr("class");
  const title = $("#update-title").val();
  const author = $("#update-author").val();
  const url = $("#update-url").val();
  const data = { title, author, url, storyId };
  const story = await storyList.updateStory(currentUser, data);

  currentUser.ownStories = currentUser.ownStories.filter(
    (s) => s.storyId !== storyId
  );

  currentUser.ownStories.unshift(story);

  putMyStoriesOnPage();

  $updateStoryForm.slideUp("slow");
  $updateStoryForm.trigger("reset");
}

$("#update-story-form").on("submit", updateStory);

async function deleteStory(e) {
  console.debug("deleteStory");
  e.preventDefault();

  const storyId = $(e.target).closest("li").attr("id");

  await storyList.removeStory(currentUser, storyId);

  putMyStoriesOnPage();
}

$body.on("click", ".trash", deleteStory);

// DONE: submit new story
// 1. collect form data
// 2. create instance of storyList.addStory
// 3. generateStoryMarkup()
// 4. append to all stories list
// 5. hide form and reset form
async function handleSubmitNewStory(e) {
  console.debug("handleSubmitNewStory", e);
  e.preventDefault();

  const title = $("#new-title").val();
  const author = $("#new-author").val();
  const url = $("#new-url").val();
  const data = { title, author, url };
  const story = await storyList.addStory(currentUser, data);

  const $story = generateStoryMarkup(story);
  $allStoriesList.prepend($story);

  $submitStoryForm.slideUp("slow");
  $submitStoryForm.trigger("reset");
}

$submitStoryForm.on("submit", handleSubmitNewStory);

// Done: display User's story lists
//currentUser.ownStories

const putMyStoriesOnPage = () => {
  console.debug("putMyStoriesOnPage");

  $myStoriesList.empty();

  if (currentUser.ownStories.length !== 0) {
    for (let story of currentUser.ownStories) {
      const $story = generateStoryMarkup(story, true);
      $myStoriesList.append($story);
    }
  } else {
    $myStoriesList.append(`<h1>${currentUser.name} has no story</h1>`);
  }

  $myStoriesList.show();
};

// Done: display User favorite stories
//currentUser.favorites

const putFavStoriesOnPage = () => {
  console.debug("putFavStoriesOnPage");

  $favStoriesList.empty();

  if (currentUser.favorites.length !== 0) {
    for (let story of currentUser.favorites) {
      const $story = generateStoryMarkup(story);
      $favStoriesList.append($story);
    }
  } else {
    $favStoriesList.append(
      `<h1>${currentUser.name} has no favorite story</h1>`
    );
  }

  $favStoriesList.show();
};

// Done: toggle story favorite stars on and off
// toggle star style
// modify fav story list by currentUser.addFavorite or currentUser.removeFavorite methods

async function favStarToggle(e) {
  console.debug("favStarToggle");

  const $target = $(e.target);
  const storyId = $target.closest("li").attr("id");
  const story = storyList.stories.find((story) => story.storyId === storyId);

  if ($target.hasClass("far")) {
    currentUser.favorites.push(story);
    await currentUser.addOrRemoveFavorite("add", story);
    $target.closest("i").toggleClass("far fas");
  } else {
    currentUser.favorites = currentUser.favorites.filter(
      (s) => s.storyId !== storyId
    );

    await currentUser.addOrRemoveFavorite("remove", story);
    $target.closest("i").toggleClass("fas far");
    putFavStoriesOnPage();
  }
}

$storiesList.on("click", ".star", favStarToggle);
