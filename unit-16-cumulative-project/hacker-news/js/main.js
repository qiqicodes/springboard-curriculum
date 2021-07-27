"use strict";

// So we don't have to keep re-finding things on page, find DOM elements once:

// TODO: assign all elements to jQuery
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

const $loginForm = $("#login-form");
const $signupForm = $("#signup-form");
const $userProfile = $("#user-profile");

const $navLogin = $("#nav-login");
const $navUserProfile = $("#nav-user-profile");
const $updateUserName = $("#update-form");
const $navLogOut = $("#nav-logout");

/** To make it easier for individual components to show just themselves, this
 * is a useful function that hides pretty much everything on the page. After
 * calling this, individual components can re-show just what they want.
 */

// TODO: hide all the components when signed in
function hidePageComponents() {
  const components = [
    $storiesList,
    $submitStoryForm,
    $loginForm,
    $signupForm,
    $updateUserName,
    $userProfile,
    $("#update-story-form"),
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
