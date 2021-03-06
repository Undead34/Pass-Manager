import { addEventListeners, addOptionsTagInSelectElement } from "../utils/default-functions.js"

let algorithmsElement = document.getElementById("algorithms");
let keyLengthElement = document.getElementById("keylength");
let operationModeElement = document.getElementById("operationmode");

let registerForm = document.getElementById("registerForm");

const drawEncryptionOptions = async () => {
  let algorithmsList = await window.api.invoke_2("get-algorithms-list", undefined);
  addOptionsTagInSelectElement(algorithmsElement, algorithmsList);
  addOptionsTagInSelectElement(keyLengthElement, algorithmsList[algorithmsElement.value]);
  addOptionsTagInSelectElement(operationModeElement, algorithmsList[algorithmsElement.value][keyLengthElement.value]);

  addEventListeners(algorithmsElement, ["change", "click"], () => {
    addOptionsTagInSelectElement(keyLengthElement, algorithmsList[algorithmsElement.value]);
    addOptionsTagInSelectElement(operationModeElement, algorithmsList[algorithmsElement.value][keyLengthElement.value]);
  })

  addEventListeners(keyLengthElement, ["change"], () => {
    addOptionsTagInSelectElement(operationModeElement, algorithmsList[algorithmsElement.value][keyLengthElement.value]);
  })
}

drawEncryptionOptions();

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  let registrePackage = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
  }

  let options = "default"

  await window.api.invoke_2("account-register", registrePackage, options);

  registrePackage = null;
})
