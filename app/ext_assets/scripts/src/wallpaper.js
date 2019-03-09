/************
 *  Fetch Background image request from Unsplash
 * ********/

(function() {
  // Wallpaper config
  let wallpaperQuery = localStorage.getItem('DOG_Wallpaper_Category') || "Nature";
  const unsplashAPIConfig = {
    query: wallpaperQuery,
    featured: true,
    orientation: "landscape",
    width: 1500,
    key: "6bf5d1667179306d00b370fb1b980230b6ee65b5a4bd7de73eebd5046e30f8cb",
    count: 1
  }

  // Covert to Blob
  const covertToBlob = function(data) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", data[0].urls.custom, true);
    // Set the responseType to blob
    xhr.responseType = "blob";
    xhr.addEventListener("load", function() {
      if (xhr.status === 200) {
        // File as response
        let blob = xhr.response;
        // Put the received blob into IndexedDB
        let imgURL = URL.createObjectURL(blob);

        update_Wallpaper_DB(imgURL, data);
      }
    }, false);
    // Send XHR
    xhr.send();
  }
  // Check for DB
  const update_Wallpaper_DB = async function(blob, data) {
    let isBG_There = await __read_DB("wallpaper");
    if (isBG_There.length) {
      let isBG_Updated = await __update_DB("wallpaper", {
        Id: 1
      }, {
        Blob: blob,
        Author: data[0].user.name,
        Link: data[0].links.html
      });
    } else {
      let isBG_Added = await __add_Item_DB("wallpaper", [{
        Blob: blob,
        Author: data[0].user.name,
        Link: data[0].links.html
      }]);
    }
  }
  // Request for wallpaper
  const __request_Wallpaper = async function() {
    let image_URL = 'https://api.unsplash.com/photos/random?query=' + unsplashAPIConfig.query + '&count=' + unsplashAPIConfig.count + '&featured=' + unsplashAPIConfig.featured + '&w=' + unsplashAPIConfig.width + '&orientation=' + unsplashAPIConfig.orientation + '&client_id=' + unsplashAPIConfig.key;
    fetch(image_URL).then((response) => {
      return response.json();
    }).then((res) => {
      covertToBlob(res);
    }).catch((error) => {
      console.error(error, "error");
    });
  }
  // Request for wallpaper when new tab open
  chrome.tabs.onCreated.addListener((tab) => {
    if (tab.active) {
      __request_Wallpaper();
    }
  });



  // Update Badge with upcoming Tasks
  async function upcoming_tasks () {
    let data = await __read_DB("Product");
    let currentDate = new Date();
    currentDate = `${currentDate.getFullYear()}-${currentDate.getMonth().toString().length == 1 ? "0" + currentDate.getMonth() : currentDate.getMonth()}-${currentDate.getDate().toString().length == 1 ? "0" + currentDate.getDate() : currentDate.getDate()}`;
    let upcoming = data.filter((value, index, arr) => {
      if(value.Timeline != undefined) {
        if(value.Timeline.endDate == currentDate) {
          return value;
        }
      }
    });

    if(upcoming.length.toString() != 0 ) {
      chrome.browserAction.setBadgeText({text : upcoming.length.toString()});
      chrome.browserAction.setBadgeBackgroundColor({color : "#fa5252"});
    }
  }

  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if(request.type == "badge") {
      upcoming_tasks();
    }
  });

  upcoming_tasks();
})();
