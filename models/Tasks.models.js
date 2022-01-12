const Task = require("./Task.models");

class Tasks {
  _list = {};

  constructor() {
    this._list = {};
  }

  get getList() {
    const list = [];
    Object.keys(this._list).forEach((key) => list.push(this._list[key]));
    return list;
  }

  loadTaskFromArray(tasks = []) {
    tasks.forEach(task => this._list[task.id] = task);
  }

  formatList() {
      this.getList.forEach((l, i) => {
          const idx = `${i + 1}`.green;
          const { desc, completeOn } = l;
          const state = (completeOn) ? 'Completada'.green : 'Pendiente'.red;
          const result = `${idx} ${desc} :: ${state}`;
          console.log(result);
      });
  }

  verifyTasks(complete = true) {
    let tasks = this.getList.filter(t => t.completeOn === complete);
    tasks.forEach(l => {
        const { id, desc, completeOn } = l;
        const state = (completeOn) ? 'Completada'.green : 'Pendiente'.red;
        const result = `${id.toString().green} ${desc} :: ${state}`;
        console.log(result);
    });
  }

  deleteTask(id = '') {
    if (this._list[id]) {
        delete this._list[id];
    }
  }

  toggleTask(ids = []) {
      ids.forEach(id => {
        const task = this._list[id];
        if (!task.completeOn) {
            task.createdOn = new Date().toISOString();
            task.completeOn = true;
        }
      });

      this.getList.forEach(task => {
        if (!ids.includes(task.id)) {
            const taskFilter = this._list[task.id];
            taskFilter.completeOn = false;
        }
      });
  }

  createTask(desc = "") {
    const task = new Task(desc);
    this._list[task.id] = task;
  }
}

module.exports = Tasks;
