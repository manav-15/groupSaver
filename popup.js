function openGroup(event){
  alert(event.target.innerText)

}


//initialize the list of groups
chrome.storage.local.get("groupsKey", (groups) => {
 
  let list = document.getElementById("groupList")

  groups.groupsKey.forEach((item) => {
    let button = document.createElement("button");
    button.innerText = item ;
    button.addEventListener("click", openGroup)

    let li = document.createElement("li");
    li.appendChild(button)
    //li.innerHTML = `<button id="open">${item}</button>`;
    list.appendChild(li);
})

})






// let openButton = document.getElementById("open");
// openButton.addEventListener("click", openGroup)


// chrome.storage.sync.get("color", ({ color }) => {
//   console.log(color)
//   changeColor.style.backgroundColor = color;
// });


// // When the button is clicked, inject setPageBackgroundColor into current page
// changeColor.addEventListener("click", async () => {
//     let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
//     chrome.scripting.executeScript({
//       target: { tabId: tab.id },
//       function: setPageBackgroundColor,
//     });



//   });
  
// // The body of this function will be executed as a content script inside the
// // current page
// function setPageBackgroundColor() {
//   chrome.storage.sync.get("color", ({ color }) => {
//     document.body.style.backgroundColor = color;
//   });
// }