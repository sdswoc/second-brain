function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  $(".g-signin2").css({ display: "none" });
  $(".data").css({ display: "block" });
  $("#profile-pic").attr({ src: profile.getImageUrl() });
  $("#email").text(profile.getEmail());
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(() => {
    alert("You have been logged out");
    $(".s-signin2").css({ display: "block" });
    $(".profile-info").css({ display: "none" });
  });
}
