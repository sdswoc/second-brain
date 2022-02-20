var task = "";
var splitTask=[];
var time;

function getTask() {
  task = document.getElementById("task-input").value;
  task=task.replace(/\s+/g, "");
  console.log(task);
  document.getElementById("task-input").value = "";
  return task;
}

function timeSelection(task) {
  splitTask = task.split("@");
  time=splitTask[1];
  return splitTask;
  return time;
}

function executionCode() {
  getTask();
  timeSelection(task);
  console.log(time);
}
