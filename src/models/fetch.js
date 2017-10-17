function checkStatus(response)  {
  if (response.status === 200) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

function getJSON(response) {response.json()}

function showBlockData(responseAsText) {
  var message = document.getElementById('response');
  message.textContent = responseAsText;
}

var resource = 'pathToResource'
function fetchBlockData(resource) {
  fetch(resource)
  .then(checkStatus)
  .then(getJSON)
  .then(showBlockData)
  .catch(error => {
    console.log(error);
  });
}
