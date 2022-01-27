function openGroup(event){
  //alert(event.target.innerText)
  let groupName = event.target.innerText;
  chrome.storage.local.get([groupName], (items) => {
        //alert(items[groupName]);
        chrome.windows.create(
          {
            url: items[groupName]
          }
        , window => {
          console.log(window.tabs)
        })
        
    })
}

function deleteEntry(event){
  //alert(event.target.id)
  chrome.storage.local.get("groupsKey", (list) => {
    let groupsKey = list.groupsKey;
    let position = groupsKey.indexOf(event.target.id);
    if(~position) groupsKey.splice(position,1);
    chrome.storage.local.set({groupsKey});
  })


  chrome.storage.local.remove([event.target.id], () =>{
    location.reload();
  })
  
}


//initialize the list of groups
chrome.storage.local.get("groupsKey", (groups) => {
 
  let list = document.getElementById("groupList")

  groups.groupsKey.forEach((item) => {
    let button = document.createElement("A");
    button.innerText = item ;
    button.addEventListener("click", openGroup);

    let img = document.createElement("img");
    img.src = "/images/delete2.png";
    img.height = "20";
    img.id = item;
    img.addEventListener("click", deleteEntry);


    let li = document.createElement("li");
    li.appendChild(button)
    li.appendChild(img)
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