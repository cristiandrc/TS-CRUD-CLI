import inquirer from 'inquirer';
import { TaskCollection } from "./models/TaskCollection";
import { tasks } from "./exampleData";

const collection = new TaskCollection('Cristian', tasks)
let showComplete: boolean = true

const displayTaskList = (): void => {
  console.log(`${collection.userName}'s Tasks (${collection.getTaskCounts().inCompleted}) task to do`)
  collection.getTaskItems(showComplete).forEach(task => task.printDetails())
}
displayTaskList()

enum Commands {
  Add = "Add new Task",
  Complete = "Complete Task",
  Toggle = "Show/Hide Completed",
  purge = 'Remove Completed Task',
  Quit = 'Quite'
}

const promptAdd = async (): Promise<void> => {
  console.clear()
  const answers = await inquirer.prompt({
    type: 'input',
    name: 'add',
    message: 'Enter task:'
  })

  if (answers.add !== '') {
    collection.addTask(answers.add)
  }

  promptUser()
}

const promptComplete = async (): Promise<void> => {
  console.clear()
  const answer = await inquirer.prompt({
    type: 'checkbox',
    name: 'complete',
    message: 'Mark task Complete',
    choices: collection.getTaskItems(showComplete).map(i => ({
      name: i.task,
      value: i.id,
      checked: i.complete
    }))
  })

  console.log(answer)
  let completeTasks: number[] = answer.complete

  collection.getTaskItems(true).forEach(task => collection.markComplete(
    task.id,
    completeTasks.find(id => id === task.id) != undefined))

  promptUser()
}


const promptUser = async () => {
  console.clear()
  displayTaskList()

  const answers = await inquirer.prompt({
    type: 'list',
    name: 'command',
    message: 'Choose Option',
    choices: Object.values(Commands)
  })

  switch (answers.command) {
    case Commands.Complete:
      promptComplete()
      break
    case Commands.Toggle:
      showComplete = !showComplete
      promptUser()
      break
    case Commands.Add:
      promptAdd()
      break
  }
}
promptUser()