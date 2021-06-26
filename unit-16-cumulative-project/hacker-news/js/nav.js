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

// TODO: navSubmitStoryClick(e){}
const navSubmitStoryClick = (e) => {
  //do something
};

JQUERYNAVSUBMIT.on("click", navSubmitStoryClick);

// TODO: navFavClick(e){}
const navFavClick = (e) => {
  //do something
};

JQUERYNAVFAV.on("click", navFavClick);

// TODO: navMyStoriesClick(e){}
const navMyStoriesClick = (e) => {
  //do something
};

JQUERYNAVMYSTORIES.on("click", navMyStoriesClick);

// TODO: navProfileClick(e){}
const navProfileClick = (e) => {
  //do something
};

JQUERYNAVPROFILE.on("click", navProfileClick);

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
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}
