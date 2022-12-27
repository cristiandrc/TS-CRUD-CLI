import inquirer from 'inquirer';
import { TaskCollection } from "./models/TaskCollection";
import { tasks } from "./exampleData";

const collection = new TaskCollection('Cristian', tasks)

const displayTaskList = (): void => {
  // console.log(`${collection.userName}'s Tasks (${collection.getTaskCounts().inCompleted}) task to do`)
  collection.getTaskItems(true).forEach(task => task.printDetails())
}
displayTaskList()

enum Commands {
  Add = "Add new Task",
  Complete = "Complete Task",
  Toggle = "Show/Hide Completed",
  purge = 'Remove Completed Task',
  Quit = 'Quitee'
}


const promptUser = async () => {
  console.clear()
  displayTaskList()

  const answer = await inquirer.prompt({
    type: 'list',
    name: 'command',
    message: 'Choose Option',
    choices: Object.values(Commands)
  })

  console.log(answer)
}
promptUser()