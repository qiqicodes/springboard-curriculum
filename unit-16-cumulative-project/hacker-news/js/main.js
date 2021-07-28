"use strict";

const $body = $("body");

const $storiesLoadingMsg = $("#stories-loading-msg");

const $storiesList = $(".stories-list");
const $allStoriesList = $("#all-stories-list");
const $favStoriesList = $("#fav-stories-list");
const $myStoriesList = $("#my-stories-list");

const $navSubmit = $("#nav-submit");
const $submitStoryForm = $("#submit-story-form");

const $navFav = $("#nav-favorites");
const $navOwnStories = $("#nav-own-stories");
const $updateStoryForm = $("#update-story-form");

const $loginForm = $("#login-form");
const $signupForm = $("#signup-form");
const $userProfile = $("#user-profile");

const $navLogin = $("#nav-login");
const $navUserProfile = $("#nav-user-profile");
const $updateUserName = $("#update-form");
const $navLogOut = $("#nav-logout");

function hidePageComponents() {
  const components = [
    $storiesList,
    $submitStoryForm,
    $loginForm,
    $signupForm,
    $updateUserName,
    $userProfile,
    $favStoriesList,
    $updateStoryForm,
  ];
  components.forEach((c) => c.hide());
}

/** Overall function to kick off the app. */

async function start() {
  console.debug("start");

  // "Remember logged-in user" and log in, if credentials in localStorage
  await checkForRememberedUser();
  await getAndShowStoriesOnStart();

  // if we got a logged-in user
  if (currentUser) updateUIOnUserLogin();
}

// Once the DOM is entirely loaded, begin the app

console.warn(
  "HEY STUDENT: This program sends many debug messages to" +
    " the console. If you don't see the message 'start' below this, you're not" +
    " seeing those helpful debug messages. In your browser console, click on" +
    " menu 'Default Levels' and add Verbose"
);

$(start);
