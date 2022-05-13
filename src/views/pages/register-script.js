let algorithmsElement = document.getElementById("algorithms");
let keyLengthElement = document.getElementById("keylength");
let operationModeElement = document.getElementById("operationmode");

let text = window.api.invoke_2("get-algorithms-list", undefined).then((algorithms) => {
  console.log(algorithms);
})
