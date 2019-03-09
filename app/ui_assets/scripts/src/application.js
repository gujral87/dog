/**
* @Author: Pawan Gujral <goofyCoder>
* @Date:   2018-08-08T05:47:42-04:00
* @Email:  goofyCoder.com
* @Last modified by:   codedoodler
* @Last modified time: 2018-08-11T04:29:19-04:00
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
  /*
  * Folder code
  */
  "use strict";

  const app = {
    validate : async () => {
      let isAuth_Data = await __read_DB("Auth");

      if (isAuth_Data.length) {
        if (isAuth_Data[0].Logged) {
          document.querySelector(".header-menu").innerHTML = `<p>
          <span class="user-name">Woof, <em>${isAuth_Data[0].Name}</em></span>
          <img src="${JSON.parse(isAuth_Data[0].Avatar)}" class="user-avatar" alt="" />
          </p>`;
          // ON Load / refresh detch Folder Data
          folder.Render();
        } else {
          window.location = "index.html";
        }
      } else {
        window.location = "index.html";
      }
    },
    Quit: async () => {
      let isLogged_Out = await __update_DB("Auth", {
        Id: 1
      }, {
        Logged: false
      });
      if (isLogged_Out) {
        window.location = "index.html";
      } else {
        notify("Something went wrong", "error");
      }
    }
  }

  app.validate();

  /*
  * Folder code
  */

  const folder_block = document.querySelector("#folder_block");
  const folder_Block_List = folder_block.querySelector(".folder_block_articles");
  const folder_Modal_Btn = folder_block.querySelector(".show_folder_modal");
  const folder_Submit_Btn = document.querySelector("#btn_add_folder");
  const group_label = document.querySelector(".label-group");
  const task_Modal_Btn = document.querySelector(".show_task_modal");

  const folder = {
    Render: async () => {
      let folders_Data = await __read_DB("Product", {"Type" : "Folder"});
      if (folders_Data.length) {
        let isFolder_Rendered = await folder.Set(folders_Data);
        folder_block.querySelector(".help-message").style.display = "none";
        if (isFolder_Rendered) {
          folder_Block_List.querySelector('P').click();
        }
      } else {
        folder_Block_List.innerHTML = "";
        task_List.innerHTML = "";
        todo_List.innerHTML = "";
        notes_List.innerHTML = "";
        todo_Block.style.display = "none";
        notes_Block.style.display = "none";
        folder_block.querySelector(".help-message").style.display = "block";
        folder_Modal_Btn.click();
      }

      let today_Date = parseToday(new Date());
      document.body.setAttribute("data-today", today_Date);

    },
    Set : async (data) => {
      console.log(data);
      folder_Block_List.innerHTML = "";
      let filtered_Data = data.filter((value, index, arr) => {
        if (value.Type == "Folder")
        return value;
      });
      let parsedDate;
      for (let [index, a] of filtered_Data.entries()) {
        let isListExist = document.querySelector(`[data-group-name="${a.Group}"]`);
        if (isListExist != null) {
          let list = document.createElement("ol");
          parsedDate = await parseDate(a.Date);
          isListExist.querySelector('ol').innerHTML += `<li data-id="${a.Id}" data-group="${a.Group}" data-folder="${a.Folder}" data-type="folder"><p>${a.Folder}</p>
          <span class="edit_Folder"></span>
          <span class="delete_Task"></span>
          <small>${parsedDate}</small></li>`;
        } else {
          let folder = document.createElement("article");
          let title = document.createElement("h4");
          let list = document.createElement("ol");
          folder.setAttribute("data-group-name", a.Group);
          title.textContent = a.Group;
          parsedDate = await parseDate(a.Date);
          list.innerHTML += `<li data-id="${a.Id}" data-group="${a.Group}" data-folder="${a.Folder}" data-type="folder" data-text="${a.Folder}">
          <p>${a.Folder} </p>
          <span class="edit_Folder"></span>
          <span class="delete_Task"></span>
          <small>${parsedDate}</small></li>`;
          folder.appendChild(title);
          folder.appendChild(list);
          folder_Block_List.appendChild(folder);
        }
      }
      return true;
    },
    Add : async () => {
      let group_Input = document.querySelector("#group_Input");
      let folder_Input = document.querySelector("#folder_Input");

      if (group_Input.value != "" && folder_Input.value != "") {
        if (folder_Submit_Btn.getAttribute("data-type") == "create") {
          let isFolder_Exists = await __read_DB("Product", {
            "Group": group_Input.value.toLowerCase().trim(),
            "Folder": folder_Input.value.toLowerCase().trim()
          });
          if (isFolder_Exists.length == 0) {
            // Add to DB
            let isAdded = await __add_Item_DB("Product", [{
              "Group": group_Input.value.toLowerCase().trim(),
              "Folder": folder_Input.value.toLowerCase().trim(),
              "Type": "Folder",
              "Date": new Date()
            }]);

            if (isAdded) {
              clear_Modal();
              folder.Render();
            }
          } else {
            notify("Folder already exists", "error");
          }
        } else if (folder_Submit_Btn.getAttribute("data-type") == "update") {
          let isUpdated = await __update_DB("Product", {
            "Group": folder_Submit_Btn.getAttribute("data-group"),
            "Folder": folder_Submit_Btn.getAttribute("data-folder")
          }, {
            "Group": group_Input.value.toLowerCase().trim(),
            "Folder": folder_Input.value.toLowerCase().trim()
          });

          console.log(isUpdated);

          if (isUpdated) {
            clear_Modal();
            folder.Render();
          }
        }
      } else {
        notify("Fields can't be empty", "error");
      }
    },
    Clicked : (e) => {
      let $this = e.target;
      if ($this.nodeName == "P" || $this.nodeName == "SMALL") {
        let data_Group = $this.parentElement.getAttribute("data-group");
        let data_Folder = $this.parentElement.getAttribute("data-folder");
        // Set attribute to body element
        document.body.setAttribute("data-group", data_Group);
        document.body.setAttribute("data-folder", data_Folder);

        let all_Folder_Items = folder_block.querySelectorAll("li");

        for (let a of all_Folder_Items) {
          a.classList.remove("active");
        }
        $this.parentElement.classList.add("active");

        task_Modal_Btn.style.display = "block";

        task.Render(data_Group, data_Folder);
      } else if ($this.className == "delete_Task") {
        let data_Group = $this.parentElement.getAttribute("data-group");
        let data_Folder = $this.parentElement.getAttribute("data-folder");
        let data_Name = $this.parentElement.children[0].textContent;
        folder.Remove(data_Name, data_Group, data_Folder);
      } else if ($this.className == "edit_Folder") {
        let $this_value = $this.parentElement.getAttribute("data-text");
        folder_Modal_Btn.click();
        document.querySelector("#folder_Input").value = $this_value;
        document.querySelector("#group_Input").value = $this.parentElement.getAttribute("data-group");
        folder_Submit_Btn.textContent = "Update Folder";
        folder_Submit_Btn.setAttribute("data-type", "update");
        folder_Submit_Btn.setAttribute("data-id", $this.parentElement.getAttribute("data-id"));
        folder_Submit_Btn.setAttribute("data-group", $this.parentElement.getAttribute("data-group"));
        folder_Submit_Btn.setAttribute("data-folder", $this.parentElement.getAttribute("data-folder"));
        group_label.querySelector(`[data-label=${$this.parentElement.getAttribute("data-group")}]`).classList.add("selected");
      }
    },
    Remove: async (text, groupName, folderName) => {
      let conf = confirm(`Do you really want to delete ${text}?`);
      if (conf) {
        let isRemove_Done = await __remove_Item_DB("Product", {
          "Group": groupName,
          "Folder": folderName
        });
        if (isRemove_Done) {
         folder.Render();
          notify("Successfully Deleled", "info");
        }
      }
    }
  }

  folder_Submit_Btn.addEventListener("click", folder.Add);
  folder_Block_List.addEventListener("click", folder.Clicked);
  folder_Modal_Btn.addEventListener("click", folder_Modal_Trigger);
  group_label.addEventListener("click", toggle_label_Input);
  // Show folder Modal
  function folder_Modal_Trigger() {
    document.body.classList.add("overlay");
    document.body.addEventListener("click", overlay_clicked);
    document.body.addEventListener("keyup", esc_trigger);
    document.querySelector(".folder_Modal").style.display = "block";
    document.querySelector(".folder_Modal .btn-close").addEventListener("click", close_Modal_Trigger);
    document.querySelector("#folder_Input").focus();
    // document.querySelector("#group_Input").addEventListener("keypress", submit_Folder_Form_OnEnter);
  }
  // On Enter Trigger
  const submit_Folder_Form_OnEnter = (e) => {
    if (e.keyCode == 13) {
      folder_Submit_Btn.click();
    }
  }
  // Fetch group label
  function toggle_label_Input(e) {
    if (e.target.nodeName == "SPAN") {
      if (e.target.textContent != "Other") {
        document.querySelector("#group_Input").setAttribute("type", "hidden");
        document.querySelector("#group_Input").value = e.target.textContent;
      } else {
        document.querySelector("#group_Input").value = "";
        document.querySelector("#group_Input").setAttribute("type", "text");
      }

      let all_Label_Span = document.querySelectorAll(".label-Value");
      for (let a of all_Label_Span) {
        a.classList.remove("selected");
      }
      e.target.classList.add("selected");
    }
  }


  /*
  * Task Code
  */
  const Task_block = document.querySelector("#task_block");
  const task_List = Task_block.querySelector("#task_list");
  const task_Submit_Btn = document.querySelector("#btn_add_task");
  const todo_Block = document.querySelector(".todo_Block_Todo_List");
  const notes_Block = document.querySelector('.notes_Block_Content');

  const task = {
    Render: async (group, folder) => {
      let tasks_Data = await __read_DB("Product", {
        "Group": group,
        "Folder": folder
      });

      if (tasks_Data.length > 1) {
        const filtered_Data = tasks_Data.filter((value, index, arr) => {
          if (value.Task != undefined) {
            return value;
          }
        });
        let isTask_Rendered = await task.Set(filtered_Data);
        task_List.querySelector('P').click();
      } else {
        task_List.innerHTML = "";
        todo_List.innerHTML = "";
        notes_List.innerHTML = "";
        todo_Block.style.display = "none";
        notes_Block.style.display = "none";
        task_block.querySelector(".help-message").style.display = "block";
      }
    },
    Set: async (data) => {
      task_block.querySelector(".help-message").style.display = "none";
      const list = Task_block.querySelector("ol");
      list.innerHTML = '';
      let today = document.body.getAttribute("data-today");
      for (let a of data) {
        let timeLine = await timeScheduler(today, a.Timeline.startDate, a.Timeline.endDate);

        list.innerHTML += `<li data-id="${a.Id}" class="${today == a.Timeline.endDate ? "attention" : "normal"} ${a.Type}" data-status="${a.Type}"  data-group="${a.Group}" data-folder="${a.Folder}" data-type="task" data-startDate="${a.Timeline.startDate}"  data-endDate="${a.Timeline.endDate}" data-text="${a.Task}" data-repeat="${a.Timeline.Repeat}">
        <p>${a.Task}</p>
        <span class="edit_Task"></span>
        <span class="delete_Task"></span>
        <small><em>${timeLine}</em></small>
        </li>`;
      }
      return true;
    },
    Add: async () => {
      const task_Folder = document.body.getAttribute("data-folder");
      const task_Group = document.body.getAttribute("data-group");
      const task_Input = document.querySelector("#task_Input");

      const startDate_Input = document.querySelector("#startDate_Input"); // YYYY-MM-DD
      const endDate_Input = document.querySelector("#endDate_Input"); // YYYY-MM-DD

      if (task_Input.value != "") {
        if (task_Submit_Btn.getAttribute("data-type") == "create") {
          let isExist = await __read_DB("Product", {
            "Group": task_Group.toLowerCase().trim(),
            "Folder": task_Folder.toLowerCase().trim(),
            "Task": task_Input.value.toLowerCase().trim()
          });

          if (isExist.length == 0) {
            let isAdded = __add_Item_DB("Product", [{
              "Group": task_Group.toLowerCase().trim(),
              "Folder": task_Folder.toLowerCase().trim(),
              "Task": task_Input.value.toLowerCase().trim(),
              "Date": new Date(),
              "Type" : "Pending",
              "Timeline": {
                "startDate": startDate_Input.value,
                "endDate": endDate_Input.value,
                "Repeat": false
              }
            }]);

            if (isAdded) {
              clear_Modal();
              task.Render(task_Group, task_Folder);
            }
          } else {
            notify("Task already exit", "error");
          }
        } else if (task_Submit_Btn.getAttribute("data-type") == "update") {
          let task_Completed_Checkbox = document.querySelector("#type_Input").checked;
          let isUpdated = __update_DB("Product", {
            Id: parseInt(task_Submit_Btn.getAttribute("data-id"))
          }, {
            "Task": task_Input.value.toLowerCase().trim(),
            "Type" : task_Completed_Checkbox ? "Completed" : "Pending",
            "Timeline": {
              "startDate": task_Completed_Checkbox ? "" : startDate_Input.value,
              "endDate": task_Completed_Checkbox ? "" : endDate_Input.value
            }
          });
          if (isUpdated) {
            clear_Modal();
            task.Render(task_Group, task_Folder);
          }
        }
      } else {
        notify("Enter Task name", "error");
      }
    },
    Clicked: (e) => {
      let $this = e.target;
      if ($this.nodeName == "P") {
        let task_Id = $this.parentElement.getAttribute("data-id");
        let task_Items = task_block.querySelectorAll("li");

        for (let a of task_Items) {
          a.classList.remove("active");
        }

        $this.parentElement.classList.add("active");
        document.body.setAttribute("data-task-id", task_Id);
        todo_Block.style.display = "block";
        notes_Block.style.display = "block";
        todo.Set(parseInt(task_Id));
        notes.Set(parseInt(task_Id));

      } else if (e.target.className == "delete_Task") {
        task.Remove(
          $this.parentElement.getAttribute("data-group"),
          $this.parentElement.getAttribute("data-folder"),
          $this.parentElement.getAttribute("data-id"),
          $this.parentElement.children[0].textContent
        );
      } else if (e.target.className == "edit_Task") {
        let $this_value_txt = $this.parentElement.getAttribute("data-text");
        let $this_value_start = $this.parentElement.getAttribute("data-startdate");
        let $this_value_end = $this.parentElement.getAttribute("data-enddate");
        let $this_Status = $this.parentElement.getAttribute("data-status");

        task_Modal_Btn.click();
        document.querySelector("#task_Input").value = $this_value_txt;
        document.querySelector("#startDate_Input").value = $this_value_start;
        document.querySelector("#endDate_Input").value = $this_value_end;
        task_Submit_Btn.textContent = "Update Task";
        task_Submit_Btn.setAttribute("data-type", "update");
        task_Submit_Btn.setAttribute("data-id", $this.parentElement.getAttribute("data-id"));
        document.querySelector("#startDate_Input").addEventListener("change", (e) => {
          document.querySelector("#endDate_Input").setAttribute('min', e.target.value);
        });

        if($this_Status == "Completed") {
          document.querySelector("#type_Input").checked = true;
        }else {
          document.querySelector("#type_Input").checked = false;
        }
        document.querySelector(".task_Modal .checkbox-group").style.display = "flex";
      }
    },
    Remove: async (group, folder, id, name) => {
      let conf = confirm(`Do you really want to delete ${name}?`);

      if (conf) {
        let isDeleted = await __remove_Item_DB("Product", {
          Id: parseInt(id)
        });

        if (isDeleted) {
          task.Render(group, folder);
          todo.Set(parseInt(document.body.getAttribute("data-task-Id")));
          notes.Set(parseInt(document.body.getAttribute("data-task-Id")));
        }
      }
    }
  }

  task_Modal_Btn.addEventListener("click", task_Modal_Trigger);
  task_Submit_Btn.addEventListener("click", task.Add);
  task_List.addEventListener("click", task.Clicked);

  // Show Task Modal
  function task_Modal_Trigger() {
    document.body.classList.add("overlay");
    document.body.addEventListener("click", overlay_clicked);
    document.body.addEventListener("keyup", esc_trigger);
    document.querySelector(".task_Modal").style.display = "block";
    document.querySelector(".task_Modal .btn-close").addEventListener("click", close_Modal_Trigger);
    document.querySelector("#task_Input").focus();
    document.querySelector("#task_Input").addEventListener("keypress", submit_Task_Form_OnEnter);

    let currentDate = new Date();
    currentDate = `${currentDate.getFullYear()}-${currentDate.getMonth().toString().length == 1 ? "0" + currentDate.getMonth() : currentDate.getMonth()}-${currentDate.getDate().toString().length == 1 ? "0" + currentDate.getDate() : currentDate.getDate()}`;
    document.querySelector("#startDate_Input").setAttribute('min', currentDate);
    document.querySelector("#endDate_Input").setAttribute('min', currentDate);
    document.querySelector("#startDate_Input").value = currentDate;
    document.querySelector("#startDate_Input").addEventListener("change", (e) => {
      document.querySelector("#endDate_Input").setAttribute('min', e.target.value);
    });
  }
  // Submit Task from enter keyboard
  const submit_Task_Form_OnEnter = (e) => {
    if (e.keyCode == 13) {
      task_Submit_Btn.click();
    }
  }
  // Timeline Schedule
  function timeScheduler(today, start, end) {
    // YYYY-MM-DD
    // console.log(today, start, end);
    let today_Arr = today.split("-");
    let start_Arr = start.split("-");
    let end_Arr = end.split("-");
    if(start != "" && end != "" && today != "") {
      if(end == today) {
        chrome.runtime.sendMessage({type: "badge"});
        return "Task Ending Today";
      }
      else if(end > today) {
        if(start == today) {
          return "Starting Today";
        }
        else if(end_Arr[1] != today_Arr[1]) {
          return "Starting coming month"
        } else {
          return `Ending in ${end_Arr[2] - today_Arr[2]} days`;
        }
      }
      else if (end < today) {
        if(end_Arr[1] != today_Arr[1]) {
          return "Pending over a month"
        } else {
          return `Pending since ${today_Arr[2] - end_Arr[2]} days`;
        }
      }
    } else {
      return "Time not scheduled";
    }
  }

  /*
  * Todo List
  */

  const todo_Input = todo_Block.querySelector("#todo_Item_Add_Input");
  const todo_List = todo_Block.querySelector("#todo_List");
  const todo_Clear_Btn = document.querySelector('.remove_Completed_Todo');

  const todo = {
    Set: async (id) => {
      todo_List.innerHTML = "";
      document.querySelector(".todo_stats_ongoing").textContent = 0;
      document.querySelector(".todo_stats_complete").textContent = 0;

      let todo_Data = await __read_DB("Product", {
        Id: id
      });
      if (todo_Data.length) {
        if (todo_Data[0].Todo != undefined) {
          let todo_Data_Parsed = todo_Data[0].Todo;
          if (todo_Data_Parsed.length) {
            todo_Block.querySelector(".help-message").style.display = "none";
            todo_List.innerHTML = "";
            let ongoing_Tasks = 0;
            let completed_Task = 0;
            for (let a of todo_Data_Parsed) {
              todo_List.innerHTML += `<li data-id="${a.Id}" class="${a.Status}"><span></span><p>${a.Data}</p><em></em></li>`;
              if (a.Status == "ongoing") {
                ongoing_Tasks++;
                document.querySelector(".todo_stats_ongoing").textContent = ongoing_Tasks;
              } else {
                completed_Task++
                document.querySelector(".todo_stats_complete").textContent = completed_Task;
              }
            }
          } else {
            todo_Block.querySelector(".help-message").style.display = "block";
          }
        } else {
          todo_Block.querySelector(".help-message").style.display = "block";
        }
      }
    },
    Add: async () => {
      let todo_Items = todo_List.querySelectorAll("li");
      let todo_Items_Data = await collect_Todo_Items(todo_Items);
      let isAdded = await __update_DB("Product", {
        Id: parseInt(document.body.getAttribute("data-task-id"))
      }, {
        "Todo": todo_Items_Data
      });

      if (isAdded) {
        todo_Input.value = "";
        if (todo_List.querySelectorAll("li").length) {
          todo_Block.querySelector(".help-message").style.display = "none";
        } else {
          todo_Block.querySelector(".help-message").style.display = "block";
        }
      }
    },
    Clicked: (e) => {
      if (e.target.nodeName == "SPAN") {
        let elem_Parent = e.target.parentElement;
        if (elem_Parent.className == "ongoing") {
          elem_Parent.classList.remove("ongoing");
          elem_Parent.classList.add("complete");
          let current_ongoing_count = document.querySelector(".todo_stats_ongoing").textContent;
          let current_complete_count = document.querySelector(".todo_stats_complete").textContent;

          document.querySelector(".todo_stats_ongoing").textContent = parseInt(current_ongoing_count) - 1;
          document.querySelector(".todo_stats_complete").textContent = parseInt(current_complete_count) + 1;
        } else {
          elem_Parent.classList.add("ongoing");
          elem_Parent.classList.remove("complete");

          let current_ongoing_count = document.querySelector(".todo_stats_ongoing").textContent;
          let current_complete_count = document.querySelector(".todo_stats_complete").textContent;

          document.querySelector(".todo_stats_ongoing").textContent = parseInt(current_ongoing_count) + 1;
          document.querySelector(".todo_stats_complete").textContent = parseInt(current_complete_count) - 1;
        }
        todo.Add();
      } else if (e.target.nodeName == "EM") {
        if (e.target.parentElement.className == "ongoing") {
          let current_ongoing_count = document.querySelector(".todo_stats_ongoing").textContent;
          document.querySelector(".todo_stats_ongoing").textContent = parseInt(current_ongoing_count) - 1;
        } else {
          let current_complete_count = document.querySelector(".todo_stats_complete").textContent;
          document.querySelector(".todo_stats_complete").textContent = parseInt(current_complete_count) - 1;
        }
        e.target.parentElement.remove();
        notify("Successfully deleted.", "info");

        todo.Add();
      }
    },
    RemoveCompletedTodo: () => {
      todo_Clear_Promise()
      .then((response) => {
        notify(response, "success");
        todo.Add();
      })
      .catch((error) => {
        notify(error, "error");
      });
    }
  }

  todo_List.addEventListener("click", todo.Clicked);
  todo_Clear_Btn.addEventListener("click", todo.RemoveCompletedTodo);
  todo_Input.addEventListener("keypress", todo_Input_Submit);
  // Collect todo items
  const collect_Todo_Items = function(items) {
    let todo_Items = [];
    for (let [index, a] of items.entries()) {
      todo_Items.push({
        "Id": index,
        "Status": a.className,
        "Data": a.textContent
      });
    }
    return todo_Items;
  }
  // Submit todo Item
  function todo_Input_Submit(e) {
    if (e.keyCode == 13 && this.value != '') {
      let li_Node = document.createElement("LI");
      li_Node.classList.add("ongoing");
      li_Node.innerHTML = `<span></span><p>${this.value}</p><em></em>`;
      todo_List.insertBefore(li_Node, todo_List.childNodes[0]);
      let current_ongoing_count = document.querySelector(".todo_stats_ongoing").textContent;
      document.querySelector(".todo_stats_ongoing").textContent = parseInt(current_ongoing_count) + 1;
      todo.Add();
    }
  }
  // todo list promise
  const todo_Clear_Promise = function() {
    return new Promise((resolve, reject) => {
      let todo_Items = todo_List.querySelectorAll("li");
      let completed_Count = 0;
      for (let a of todo_Items) {
        if (a.className == "complete") {
          a.remove();
          completed_Count++;
        }
      }
      if (completed_Count) {
        resolve("All completed task(s) deleted");
        document.querySelector(".todo_stats_complete").textContent = 0;

      } else {
        reject("No completed task(s) found.");
      }

    });
  }

  /*
  * Notes
  */

  const notes_Add_Input = notes_Block.querySelector("#notes_Add_Input");
  const notes_List = notes_Block.querySelector("#notes_List");
  const notes_Remove = notes_Block.querySelector(".remove_Notes");

  const notes = {
    Set: async (id) => {
      let notes_Data = await __read_DB("Product", {
        Id: id
      });
      notes_List.innerHTML = '';
      if (notes_Data.length) {
        if (notes_Data[0].Notes != undefined) {
          let notes_Data_Parsed = notes_Data[0].Notes
          if (notes_Data_Parsed.length) {
            notes_Block.querySelector(".help-message").style.display = "none";

            for (let a of notes_Data_Parsed) {
              if (a.search("@") != -1) {
                let txt_arr = a.split(" ");
                txt_arr = txt_arr.map((value, index) => {
                  if (value.search("@") != -1) {
                    return `<span>${value}</span>`;
                  } else {
                    return value;
                  }
                });
                txt_arr = txt_arr.join(" ");
                notes_List.innerHTML += `<li><p>${txt_arr}</p><em></em></li>`;
              } else {
                notes_List.innerHTML += `<li><p>${a}</p><em></em></li>`;
              }

            }
          } else {
            notes_Block.querySelector(".help-message").style.display = "block";
          }
        } else {
          notes_Block.querySelector(".help-message").style.display = "block";
        }
      }
    },
    Add:   async (e) => {
      if (e.keyCode == 13 && notes_Add_Input.value != '') {
        let task_Id = parseInt(document.body.getAttribute("data-task-id"));
        notes_Block.querySelector(".help-message").style.display = "none";

        let li_Node = document.createElement("LI");
        if (notes_Add_Input.value.search("@") != -1) {
          let txt_arr = notes_Add_Input.value.split(" ");
          txt_arr = txt_arr.map((value, index) => {
            if (value.search("@") != -1) {
              return `<span>${value}</span>`;
            } else {
              return value;
            }
          });
          txt_arr = txt_arr.join(" ");
          li_Node.innerHTML = `<p>${txt_arr}</p><em></em>`;
        } else {
          li_Node.innerHTML = `<p>${notes_Add_Input.value}</p><em></em>`;
        }

        notes_List.insertBefore(li_Node, notes_List.childNodes[0]);

        let notes_Data = await collect_Notes_Items();
        let isNote_Exists = await __read_DB("Product", {
          Id: task_Id
        });
        let isAdded = false;

        if (isNote_Exists.length) {
          isAdded = await __update_DB("Product", {
            Id: task_Id
          }, {
            Notes: notes_Data
          });

          if (isAdded) {
            notes_Add_Input.value = "";
          }
        } else {
          isAdded = await __add_Item_DB("Product", [{
            Id: task_Id,
            Notes: notes_Data
          }]);

          if (isAdded) {
            notes_Add_Input.value = "";
          }
        }
      }
    },
    Clicked:   async (e) => {
      if (e.target.nodeName == "EM") {
        let task_Id = parseInt(document.body.getAttribute("data-task-id"));

        e.target.parentElement.remove();
        let notes_Data = await collect_Notes_Items();

        let isNote_Updated = await __update_DB("Product", {
          Id: task_Id
        }, {
          Notes: notes_Data
        });

        if (isNote_Updated) {
          notify("Successfully deleted.", "info");
          notes.Set(task_Id);
        }
      }
    },
    RemoveAll: async () => {
      let task_Id = parseInt(document.body.getAttribute("data-task-id"));
      let isRemoved = await __update_DB("Product", {
        Id: task_Id
      }, {
        Notes: []
      })
      if (isRemoved) {
        notify("All notes deleted.", "error");
        notes_List.innerHTML = "";
      }
    }
  }

  notes_Add_Input.addEventListener("keypress", notes.Add);
  notes_Remove.addEventListener("click", notes.RemoveAll);
  notes_List.addEventListener("click", notes.Clicked);

  // Collect Notes list
  const collect_Notes_Items = function() {
    let notes_Items_Data = [];
    let notes_Items = notes_List.querySelectorAll("li");

    for (let a of notes_Items) {
      notes_Items_Data.push(a.textContent.trim());
    }
    return notes_Items_Data;
  }

  /*
  * Log out
  */

  // Log out
  const log_Out_Btn = document.querySelector("#log_Out");
  log_Out_Btn.addEventListener("click", app.Quit);

  // overlay trigger
  const overlay_clicked = function(e) {
    if (e.target.nodeName == "BODY") {
      clear_Modal();
    }
  }
  // ESC Trigger
  const esc_trigger = (e) => {
    if (e.keyCode == 27) {
      clear_Modal();
    }
  }
  // clearModal
  const clear_Modal = function() {
    document.querySelector("#group_Input").value = "";
    document.querySelector("#folder_Input").value = "";
    document.querySelector("#task_Input").value = "";
    let all_Label_Span = document.querySelectorAll(".label-Value");
    for (let a of all_Label_Span) {
      a.classList.remove("selected");
    }
    document.querySelector(".folder_Modal").style.display = "none";
    document.querySelector(".task_Modal").style.display = "none";
    document.body.classList.remove("overlay");
  }
  // Date Parsers
  const parseDate = function(date) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const days = ["Sun", "Mon", "Tues", "Wed", "Thru", "Fri", "Sat"]
    let week = days[date.getDay()];
    let day = date.getDate();
    let month = months[date.getMonth()];
    return `${week}, ${day} ${month}`;
  }
  // parse Today
  const parseToday = function(date) {
    return `${date.getFullYear()}-${date.getMonth().toString().length == 1 ? "0" + date.getMonth() : date.getMonth()}-${date.getDate().toString().length == 1 ? "0" + date.getDate() : date.getDate()}`;
  }
  // close modal
  const close_Modal_Trigger = function() {
    clear_Modal();
  }
  /*
  * Background Message Passing
  */

  chrome.commands.onCommand.addListener(function(command) {
    console.log('Command:', command);
    if (command == "quit-dog") {
      log_Out_Btn.click();
    } else if (command == "open-folder") {
      folder_Modal_Btn.click();
    } else if (command == "open-task") {
      task_Modal_Btn.click();
    }
  });


})();
