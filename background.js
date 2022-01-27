let color = "#3aa757";

chrome.runtime.onInstalled.addListener(async () => {

    chrome.storage.sync.set({color})
    console.log('Default background color set to %cgreen', `color: ${color}`);

    let groups = await chrome.tabGroups.query({});
    console.log(groups);
    let groupsKey = [];

    for (let group of groups) {
        groupsKey.push(group.title)
        //console.log(group.title)
        let title = group.title;
        //let tabs = await chrome.tabs.query({groupId : group.id});
        let tabList = []
        chrome.tabs.query({ groupId: group.id }, (tabs) => {
            for (let tab of tabs) {
                tabList.push(tab.url)
            }
            //console.log(tabList);
            chrome.storage.local.set({ [title]: tabList })
        })

        //console.log(tabs);

    }

    chrome.storage.local.set({ groupsKey })

    
});