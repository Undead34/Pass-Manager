let algorithmsElement = document.getElementById("algorithms");
let keyLengthElement = document.getElementById("keylength");
let operationModeElement = document.getElementById("operationmode");
let algorithmsList = await window.api.invoke_2("get-algorithms-list", undefined);

const drawAlgorithmsListOptions = async () => {
  let options = "";
  for (let algorithm in algorithmsList) {
    options += `<option value="${algorithm}">${algorithm}</option>`;
  }
  algorithmsElement.innerHTML = options;
}
const drawKeyLengthListOptions = async () => {
  options = "";
  for (let keyLength in algorithmsList[algorithmsElement.value]) {
    options += `<option value="${keyLength}">${keyLength}</option>`;
  }
  keyLengthElement.innerHTML = options;
}
const drawOperationModesListOptions = async () => {
  options = "";
  for (let operationMode in algorithmsList[algorithmsElement.value][keyLengthElement.value]) {
    options += `<option value="${operationMode}">${operationMode}</option>`;
  }
  operationModeElement.innerHTML = options;
}

const drawEncryptionOptions = async () => {
  drawAlgorithmsListOptions();
  drawKeyLengthListOptions();
  drawOperationModesListOptions();
}

drawEncryptionOptions();