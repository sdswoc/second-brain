var isSiginedIn = false;
const signedin=document.getElementById("signed-in");
const notsignedin=document.getElementById("not-signed-in");

function onSignIn(googleUser) {
  isSiginedIn = true;
  var profile = googleUser.getBasicProfile();
  
}

function signOut() {
  isSiginedIn = false;
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(() => {
    alert("You have been logged out");
  });
}

if (isSignedIn){
  signedin.style.display=block;
  notsignedin.style.display=none;
  console.log('uff')
}else{
  signedin.style.display=none;
  notsignedin.style.display=block;
}