"use strict";

/**
 * @Author: Pawan Gujral <codedoodler>
 * @Date:   2018-08-10T12:15:39-04:00
 * @Email:  goofyCoder.com
 * @Last modified by:   codedoodler
 * @Last modified time: 2018-08-10T12:48:48-04:00
 */

//e:g notify("PIN is incorrect", "error");
function notify(text, type) {
  var notify_Block = document.createElement("DIV");
  notify_Block.classList.add("notification");
  notify_Block.style.display = "block";
  notify_Block.innerHTML = "<p class=\"" + type + "\">" + text + "</p>";
  document.body.appendChild(notify_Block);

  setTimeout(function () {
    notify_Block.remove();
  }, 3000);
}
//# sourceMappingURL=notify.js.map
