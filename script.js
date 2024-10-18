const CLIENT_ID = '95926557097-a9di5rshias5edd729l7v5kkeh2ok4bf.apps.googleusercontent.com.apps.googleusercontent.com';
const API_KEY = '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';
const DISCOVERY_DOCS = ["https://sites.googleapis.com/$discovery/rest?version=v1"];
const SCOPES = "https://www.googleapis.com/auth/sites";

// Get DOM elements
const authorizeButton = document.getElementById('authorize_button');
const signoutButton = document.getElementById('signout_button');
const apiSection = document.getElementById('api_section');
const responseOutput = document.getElementById('responseOutput');

// Load the API and make an API request
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

// Initialize the API client library
function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(() => {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
  });
}

// Update the UI based on sign-in status
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'block';
    apiSection.style.display = 'block';
  } else {
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
    apiSection.style.display = 'none';
  }
}

// Handle authorization
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

// Handle sign out
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

// Create a new Google Site using the API
document.getElementById('createSite').addEventListener('click', () => {
  const siteName = document.getElementById('siteName').value;
  const pageTitle = document.getElementById('pageTitle').value;

  const resource = {
    name: siteName,
    title: pageTitle,
    structure: {
      home: {
        title: "Home",
        isHome: true
      }
    }
  };

  gapi.client.sites.sites.create({
    resource: resource
  }).then(response => {
    responseOutput.textContent = JSON.stringify(response.result, null, 2);
  }, error => {
    responseOutput.textContent = `Error: ${error.result.error.message}`;
  });
});

handleClientLoad();
