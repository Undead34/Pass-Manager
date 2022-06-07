const addEventListeners = (element, events, callback) => {
  if (Array.isArray(events)) {
    for (let event = 0; event < events.length; event++) {
      element.addEventListener(events[event], callback);
    }
  } else if (typeof events === "string") {
    element.addEventListener(events, callback);
  } else {
    throw new Error("Invalid events type");
  }
}

const addOptionsTagInSelectElement = (element, options) => {
  let container = "";
  for (let value in options) {
    container += `<option value="${value}">${value}</option>`;
  }
  element.innerHTML = container;
}


export { addEventListeners, addOptionsTagInSelectElement };
