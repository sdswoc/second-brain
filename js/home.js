function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log("ID: " + profile.getId());
  console.log('Name: '+profile.getName());
  console.log('Image URL: '+profile.getImageURL());
  console.log('Email: '+profile.getEmail());
}
