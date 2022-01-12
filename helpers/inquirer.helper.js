const inquirer = require("inquirer");

require("colors");

const menuOptions = [
  {
    type: "list",
    name: "option",
    message: "Que desea hacer?",
    choices: [
      {
        value: "1",
        name: "1.".green + " Crear tarea",
      },
      {
        value: "2",
        name: "2.".green + " Listar tareas",
      },
      {
        value: "3",
        name: "3.".green + " Listar tareas completadas",
      },
      {
        value: "4",
        name: "4.".green + " Listar tareas pendientes",
      },
      {
        value: "5",
        name: "5.".green + " Completar tarea(s)",
      },
      {
        value: "6",
        name: "6.".green + " Borrar tarea",
      },
      {
        value: "0",
        name: "0.".green + " Salir",
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.log("===========================".green);
  console.log("   Seleccione una opcion   ".white);
  console.log("=========================== \n".green);

  const { option } = await inquirer.prompt(menuOptions);
  return option;
};

const pause = async () => {
  const questions = [
    {
      type: "input",
      name: "enter",
      message: `Presione ${"enter".green} para continuar`,
    },
  ];
  console.log("\n");
  await inquirer.prompt(questions);
};

const readInput = async (message) => {
  const questions = [
    {
      type: "input",
      name: "desc",
      message: message,
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingrese un valor";
        }
        return true;
      },
    },
  ];
  const { desc } = await inquirer.prompt(questions);
  return desc;
};

const deleteTasks = async (tasks = []) => {
  const choices = tasks.map((task, i) => {
    const idx = `${i + 1}`.green;
    return {
      value: task.id,
      name: `${idx} ${task.desc}`,
    };
  });
  choices.unshift({
      value: '0',
      name: '0'.green + 'Cancelar'
  });
  const questions = [
    {
      type: "list",
      name: "id",
      message: "Borrar",
      choices,
    },
  ];
  const { id } = await inquirer.prompt(questions);
  return id;
};

const confirm = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];
  const { ok } = await inquirer.prompt(question);
  return ok;
};

const multiSelect = async (tasks = []) => {
    const choices = tasks.map((task, i) => {
      const idx = `${i + 1}`.green;
      return {
        value: task.id,
        name: `${idx} ${task.desc}`,
        check: (task.completeOn) ? true : false
      };
    });
    const questions = [
      {
        type: "checkbox",
        name: "ids",
        message: "Seleccione",
        choices,
      },
    ];
    const { ids } = await inquirer.prompt(questions);
    return ids;
  };

module.exports = {
  inquirerMenu,
  pause,
  readInput,
  deleteTasks,
  confirm,
  multiSelect,
};
