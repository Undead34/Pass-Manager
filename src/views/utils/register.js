





// import { createAlgorithmObject } from './register/create-algorithm-object.js';
// import algorithms from './algorithms.json' assert { type: "json" };

// let algorithmList = document.getElementById("algorithmList");
// let keylenList = document.getElementById("keylenList");
// let modesList = document.getElementById("modesList");


// for (let algorithm in algorithms) {
//   let option = document.createElement("option");
//   option.value = algorithm;
//   option.innerHTML = algorithm;
//   algorithmList.appendChild(option);
// }

// const updateKeylenList = () => {
//   keylenList.innerHTML = "";
//   for (let keylen in algorithms[algorithmList.value]) {
//     let option = document.createElement("option");
//     option.value = keylen;
//     option.innerHTML = keylen;
//     keylenList.appendChild(option);
//   }
//   updateModesList();
// }

// const updateModesList = () => {
//   modesList.innerHTML = "";
//   for (let mode in algorithms[algorithmList.value][keylenList.value]) {
//     let option = document.createElement("option");
//     option.value = mode;
//     option.innerHTML = mode;
//     modesList.appendChild(option);
//   }
// }

// algorithmList.addEventListener("change", updateKeylenList);
// keylenList.addEventListener("change", updateModesList);

// document.getElementById("registerForm").addEventListener("submit", (e) => {
//   e.preventDefault();
//   let objectCrypto = createAlgorithmObject({ algorithm: algorithmList.value, keySize: keylenList.value, operationMode: modesList.value });
//   console.log(objectCrypto);
// });