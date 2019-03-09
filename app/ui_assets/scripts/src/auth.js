/**
* @Author: Pawan Gujral <codedoodler>
* @Date:   2018-08-08T05:47:42-04:00
* @Email:  goofyCoder.com
* @Last modified by:   codedoodler
* @Last modified time: 2018-08-10T12:49:36-04:00
*/


//e:g notify("PIN is incorrect", "error");
function notify(text, type) {
  const notify_Block = document.createElement("DIV");
  notify_Block.classList.add("notification");
  notify_Block.style.display = "block";
  notify_Block.innerHTML = `<p class="${type}">${text}</p>`;
  document.body.appendChild(notify_Block);

  setTimeout(() => {
    notify_Block.remove();
  }, 3000);
}



(function() {
  "use strict";
  const signIn_Block = document.querySelector("#signIn_Block");
  const signIn_Block_Codes = signIn_Block.querySelector(".auth_code");
  const allSpan = signIn_Block_Codes.querySelectorAll("span");
  const avatar_Block = document.querySelector(".avatar-Block");
  const signUp_Block = document.querySelector("#signUp_Block");
  const signUp_Submit = document.querySelector("#signUp_Submit");


  const user = {
    Auth: async () => {
      let isAuth_Data = await __read_DB("Auth");

      if (isAuth_Data.length) {
        signIn_Block.style.display = "block";
        document.querySelector(".user_name").textContent = isAuth_Data[0].Name;
      } else {
        signUp_Block.style.display = "block";
        document.querySelector("#name_Input").focus();
      }
      __render_Wallpaper();
    },
    SignUp: async (e) => {
      e.preventDefault();
      let all_Inputs = signUp_Block.querySelectorAll("input");
      validateForm(all_Inputs)
      .then((res) => {
        console.log(res);
        if (document.querySelector(".selected")) {
          let avatar = document.querySelector(".selected img").getAttribute("src");
          res.Avatar = JSON.stringify(avatar);
          return res;
        } else {
          notify("Don't forget to select your avatar", "error");
          return false;
        }
      })
      .then((data) => {
        console.log(data);
        if (data) {
          add_User_To_DB(data);
        }
      })
      .catch((err) => {
        notify(err, "error");
      });
    },
    SignIn: async (e) => {
      let isRecord_Exists = await __read_DB("Auth");
      if (isRecord_Exists.length) {
        let auth_Pin = isRecord_Exists[0].Pin;

        let isAuth_Valided = await check_Auth(user_Entered_Code, auth_Pin);

        if (isAuth_Valided) {
          let isLogged_Out = await __update_DB("Auth", {
            Id: 1
          }, {
            Logged: true
          });
          if (isLogged_Out) {
            window.location = "work.html";
          } else {
            notify("Something went wrong error, Try again.", "error");
          }
          window.location = "work.html";
        }
      }
    },
    UpcomingTasks: () => {

    }
  }

  document.addEventListener("keypress", auth_trigger_keyboard);
  signUp_Submit.addEventListener("click", user.SignUp);
  avatar_Block.addEventListener("click", avatar_Select);

  function avatar_Select(e) {
    if (e.target.nodeName == "IMG") {
      let all_Avatar = avatar_Block.querySelectorAll("LI");
      for (let a of all_Avatar) {
        a.classList.remove("selected");
      }
      e.target.parentElement.classList.add("selected");
    }
  };

  const check_Auth = function(user_Input, db_Input) {
    let count = 0;
    for (let [index, a] of user_Input.entries()) {
      if (user_Input[index] == db_Input[index]) {
        count++;
      } else {
        notify("Incorrect PIN, Try again.", "error");
        clear();
        return false;
      }
    }
    if (count == 4) {
      return true;
    }
  }

  let key_counter = 1;
  let user_Entered_Code = [];
  // Keyboard trigger
  async function auth_trigger_keyboard(e) {
    if (e.keyCode == 13) {
      if (signIn_Block.style.display == "block") {
        if (key_counter <= 4) {
          notify("Enter all 4 digits", "error");
        } else {
          user.SignIn(e);
        }
      } else if (signUp_Block.style.display == "block") {
        signUp_Submit.click();
      }
    } else if (e.keyCode >= 48 && e.keyCode <= 57) {
      passcode_Trigger(e);
    }

  }

  const passcode_Trigger = (e) => {
    if (key_counter <= 4) {
      let capture_UI_Elem = signIn_Block_Codes.querySelector(`[data-count="${key_counter}"]`);
      capture_UI_Elem.setAttribute("data-keyCode", e.keyCode);
      capture_UI_Elem.removeAttribute("data-animate");
      if (capture_UI_Elem.nextElementSibling) {
        capture_UI_Elem.nextElementSibling.setAttribute("data-animate", "icon");
      }
      user_Entered_Code.push(parseInt(e.key));
      key_counter++;
    }
  }
  // validate email
  const validateForm = function(Inputs) {
    return new Promise((resolve, reject) => {
      let input_Serialize = {};
      for (let a of Inputs) {
        if (a.value == "") {
          reject(a.getAttribute("data-error"));
        } else if (a.getAttribute("name") == "Email") {
          let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (!re.test(a.value)) {
            reject("Email Should be valid");
          } else {
            input_Serialize["Email"] = a.value;
          }
        } else {
          let input_Name = a.getAttribute("name");
          input_Serialize[input_Name] = a.value;

        }
      }
      resolve(input_Serialize);
    });
  }

  const add_User_To_DB = async (data) => {
    console.log([parseInt(data.Pin_1), parseInt(data.Pin_2), parseInt(data.Pin_3), parseInt(data.Pin_4)]);
    let isUser_Added = await __add_Item_DB("Auth", [{
      Name: data.Name,
      Email: data.Email,
      Avatar: data.Avatar,
      Pin: [parseInt(data.Pin_1), parseInt(data.Pin_2), parseInt(data.Pin_3), parseInt(data.Pin_4)],
      Logged: false
    }]);

    if (isUser_Added) {
      window.location.reload();
    }
  }
  // Check image blob
  const ImageChecker = function(Data) {
    var img_Blob = new Image();
    img_Blob.onload = function() {
      document.body.style.backgroundImage = `url("${Data[0].Blob}")`;
      document.querySelector(".unsplash_copyright").innerHTML = `Photo by
      <a href="${Data[0].Link}?utm_source=DOG&utm_medium=referral" target="_blank">${Data[0].Author}</a>
      on
      <a href="https://unsplash.com/?utm_source=DOG&utm_medium=referral" target="_blank">Unsplash</a>
      `;
    };
    img_Blob.onerror = function() {
      document.body.style.backgroundImage = 'url("ext_assets/images/bg.jpg")';
      document.querySelector(".unsplash_copyright").innerHTML = `Image from
      <a href="https://unsplash.com/?utm_source=DOG&utm_medium=referral" target="_blank">Unsplash</a>
      `;
    }
    img_Blob.src = Data[0].Blob;
  }
  // wallpaper render
  const __render_Wallpaper = async function() {
    let img_Data = await __read_DB("wallpaper");

    if (img_Data.length) {
      ImageChecker(img_Data);

    } else {
      document.body.style.backgroundImage = 'url("ext_assets/images/bg.jpg")';
      document.querySelector(".unsplash_copyright").innerHTML = `Photo by
      <a href="https://unsplash.com/photos/n3XTxxV7qhI?utm_source=DOG&amp;utm_medium=referral" target="_blank">Faye Cornish</a>
      on
      <a href="https://unsplash.com/?utm_source=DOG&utm_medium=referral" target="_blank">Unsplash</a>
      `;

    }
  }
  // Render auth

  user.Auth();

  /*
  * extension communication
  */

  // Send Request to Background Js
  const request_Background = function(action, data, callback) {
    chrome.runtime.sendMessage({
      action: action
    }, callback);
  }

  /*
  * settings
  */

  document.addEventListener("keyup", (e) => {
    clear_PassCode_Box(e)
  });

  const clear_PassCode_Box = (e) => {
    if (e.keyCode == 27 || e.keyCode == 8) {
      clear();
    }
  }

  function clear () {
    if (signIn_Block.style.display == "block") {
      for (let a of allSpan) {
        a.removeAttribute("data-keycode");
        a.removeAttribute("data-animate");
      }
      key_counter = 1;
      user_Entered_Code = [];
    }
  }



})();
