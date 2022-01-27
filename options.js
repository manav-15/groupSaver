let page = document.getElementById("buttonDiv");
let selectedClassName = "current";
const presetButtonColors = ["#3aa757", "#e8453c", "#f9bb2d", "#4688f1", "#ffffff"];

// Reacts to a button click by marking the selected button and saving
// the selection
async function handleButtonClick(event) {
  // Remove styling from the previously selected color
  let current = event.target.parentElement.querySelector(
    `.${selectedClassName}`
  );
  if (current && current !== event.target) {
    current.classList.remove(selectedClassName);
  }

  // Mark the button as selected
  let color = event.target.dataset.color;
  event.target.classList.add(selectedClassName);
  chrome.storage.sync.set({ color });


  
  // let groups = await chrome.tabGroups.query({});
  // console.log(groups);
  // let groupsKey = [];

  // for(let group of groups){
  //     groupsKey.push(group.title)
  //     //console.log(group.title)
  //     let title = group.title;
  //     //let tabs = await chrome.tabs.query({groupId : group.id});
  //       let tabList = []
  //       chrome.tabs.query({groupId : group.id}, (tabs) => {
  //           for(let tab of tabs){
  //               tabList.push(tab.url)
  //           }
  //           //console.log(tabList);
  //           chrome.storage.local.set({[title] : tabList})
  //       })

  //     //console.log(tabs);
    
  // }

  // chrome.storage.local.set({groupsKey})



  // chrome.storage.local.get("BTP", (items) => {
  //     console.log(items.BTP);
  //     // chrome.windows.create(
  //     //   {
  //     //     url: items.BTP
  //     //   }
  //     // , window => {
  //     //   console.log(window.tabs)
  //     // })
      
  // })

  chrome.storage.local.get("groupsKey", (list) => {
    console.log(list)
    // for(let group of list.groupsKey){
    //   chrome.storage.local.get([group], item => {
    //     console.log(item[group])
    //   })
    // }
  })

}

// Add a button to the page for each supplied color
function constructOptions(buttonColors) {
  chrome.storage.sync.get("color", (data) => {
    let currentColor = data.color;
    // For each color we were provided…
    for (let buttonColor of buttonColors) {
      // …create a button with that color…
      let button = document.createElement("button");
      button.dataset.color = buttonColor;
      button.style.backgroundColor = buttonColor;

      // …mark the currently selected color…
      if (buttonColor === currentColor) {
        button.classList.add(selectedClassName);
      }

      // …and register a listener for when that button is clicked
      button.addEventListener("click", handleButtonClick);
      page.appendChild(button);
    }
  });
}

// Initialize the page by constructing the color options
constructOptions(presetButtonColors);