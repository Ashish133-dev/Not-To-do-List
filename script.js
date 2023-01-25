//get form data on button click
// store data in global array
// create a finction to display all the data from the array to our entry list

let taskList = [];
let badList = [];

let invalidChars = ["+", "-", "e", "E"];
const hrsPerWeek = 24 * 7;

const q = document.querySelector(".hrs-input");
q.addEventListener("keydown", (e) => {
  invalidChars.includes(e.key) && e.preventDefault();
});

console.log(badList);
document.querySelector("#form-submit").addEventListener("click", (e) => {
  e.preventDefault();
  const task = document.querySelector(".task-input").value;
  const hr = document.querySelector(".hrs-input").value;

  const obj = {
    task,
    hr,
  };

  const totallocatedHrs = totalTaskHours();
  if (totallocatedHrs + hr > hrsPerWeek) {
    return alert(
      "Sorry, you do not have enough time to add more tasks this week!"
    );
  }
  taskList.push(obj);

  displaytaskList();
  totalTaskHours();
});

const displaytaskList = () => {
  let str = "";

  taskList.map((item, i) => {
    str += `
      <tr>
          <td>${i + 1}</td>
          <td>${item.task}}</td>
          <td>${item.hr} hrs</td>
          <td class="text-end">
          <button onclick="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
          <button onclick="markAsNotToDo(${i})" class="btn btn-success"><i class="fa-solid fa-right-long"></i></button>
          </td>
      </tr>
          `;
  });
  document.querySelector("#task-list").innerHTML = str;
};

const displayBadTasks = () => {
  let str = "";

  badList.map((item, i) => {
    str += `
    <tr>
        <td>${i + 1}</td>
        <td>${item.task}}</td>
        <td>${item.hr} hrs</td>
        <td class="text-end">
        <button class="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
        <button class="btn btn-warning"><i class="fa-solid fa-left-long"></i></button>
        </td>
    </tr>
        `;
  });
  document.querySelector("#bad-task").innerHTML = str;
};

const markAsNotToDo = (i) => {
  const item = taskList.splice(i, 1);
  badList.push(item[0]);

  displaytaskList();
  displayBadTasks();
};

const markAsToDo = (i) => {
  const item = badList.splice(i, 1);
  taskList.push(item[0]);

  displaytaskList();
  displayBadTasks();
};

const deleteTask = (i) => {
  if (window.confirm("Are you sure you want to delete this task?")) {
    taskList = taskList.filter((item, index) => index !== 1);

    displaytaskList();
    totalTaskHours();
  }
};

const deleteBadTask = (i) => {
  if (window.confirm("Are you sure you want to delete this task?")) {
    badList = badList.filter((item, index) => index !== 1);

    displayBadTasks();
    totalTaskHours();
  }
};

const totalBadTaskHours = () => {
  const total = badList.reduce((a, i) => a + Number(i.hr), 0);
  document.querySelector("#totalBadHrs").innerText = total;
  return total;
};

const totalTaskHours = () => {
  const total = taskList.reduce((a, i) => a + Number(i.hr), 0);
  document.querySelector("#totalHrs").innerText = total + totalBadTaskHours();
  return total;
};
