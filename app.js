const { saveDb, readDb } = require("./helpers/fileManager.helper");
const {
  inquirerMenu,
  pause,
  readInput,
  deleteTasks,
  confirm,
  multiSelect,
} = require("./helpers/inquirer.helper");
const Task = require("./models/Task.models");
const Tasks = require("./models/Tasks.models");

require("colors");

const main = async () => {
  let opt = "";
  const tasks = new Tasks();
  const readTask = readDb();
  if (readTask) tasks.loadTaskFromArray(readTask);
  do {
    opt = await inquirerMenu();
    switch (opt) {
      case "1":
        const desc = await readInput("Descripcion: ");
        tasks.createTask(desc);
        break;
      case "2":
        tasks.formatList();
        break;
      case "3":
        tasks.verifyTasks(true);
        break;
      case "4":
        tasks.verifyTasks(false);
        break;
      case "5":
        const currentSelections = await multiSelect(tasks.getList);
        tasks.toggleTask(currentSelections);
        break;
      case "6":
        const id = await deleteTasks(tasks.getList);
        if (id !== "0") {
          const isConfirm = await confirm("Estas seguro?");
          if (isConfirm) {
            tasks.deleteTask(id);
            console.log("Task deleted successfully");
          }
        }
        break;
    }
    saveDb(tasks.getList);
    await pause();
  } while (opt !== "0");
};

main();
