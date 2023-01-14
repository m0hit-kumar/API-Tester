// Get form elements
const endpoint = document.querySelector("#endpoint");
const requestMethod = document.querySelector("#request-method");
const requestBody = document.querySelector("#request-body");
const response = document.querySelector("#response");
const toggleModeButton = document.getElementById("toggle-mode-button");
const myform = document.getElementsByClassName("form-div");
toggleModeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  response.classList.toggle("black-text");

  document.querySelector("form").classList.toggle("bg-color");
});

// Get the text container
const container = document.getElementById("response");
// Get the text to copy
const textToCopy = container.textContent;
// Get the copy button
const copyBtn = document.getElementById("copyBtn");

// Add an event listener to the button to copy the text when clicked
copyBtn.addEventListener("click", () => {
  result = document.getElementById("response").innerText;
  navigator.clipboard.writeText(result).then(
    function () {
      console.log(result);
    },
    function (err) {
      console.error("Failed to copy: ", err);
    }
  );
});

// Handle form submit
document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();

  // Prepare the request
  const xhr = new XMLHttpRequest();
  xhr.open(requestMethod.value, endpoint.value);

  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("mode", "cors");
  xhr.setRequestHeader("credentials", "include");

  // Send the request
  xhr.send(requestBody.value);

  // Handle the response
  xhr.onload = () => {
    if (xhr.status === 200) {
      response.innerHTML = `<pre>${xhr.responseText}</pre>`;
    } else {
      response.innerHTML = `Error ${xhr.status}: ${xhr.statusText}`;
    }
  };
});
