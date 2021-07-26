"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

// DONE: navSubmitStoryClick(e){}
const navSubmitStoryClick = (e) => {
  console.debug("navSubmitStoryClick", e);
  hidePageComponents();
  $allStoriesList.show();
  $submitStoryForm.show();
};

$navSubmit.on("click", navSubmitStoryClick);

// TODO: navFavClick(e){}
const navFavClick = (e) => {
  //do something
  console.log("clicked on fav link");
};

$navFav.on("click", navFavClick);

// TODO: navMyStoriesClick(e){}
const navMyStoriesClick = (e) => {
  //do something
  console.log("clicked on own stories link");
};

$navOwnStories.on("click", navMyStoriesClick);

// DONE: navProfileClick(e){}
const navProfileClick = (e) => {
  //do something
  console.debug("navProfileClick", e);
  hidePageComponents();
  $userProfile.show();
};

$navUserProfile.on("click", navProfileClick);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".navbar-main-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}
