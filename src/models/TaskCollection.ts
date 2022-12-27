import { TaskItem } from "./TaskItem";

type TaskCounts = {
  total: number,
  inCompleted: number
}
export class TaskCollection {
  nextId: number = 1
  taskMap = new Map<number, TaskItem>()

  constructor(
    public userName: string,
    public taskItem: TaskItem[] = []
  ) {
    taskItem.forEach(item => this.taskMap.set(item.id, item))
  }

  addTask(task: string): number {
    while (this.getTaskById(this.nextId)) {
      this.nextId++
    }

    this.taskMap.set(this.nextId, new TaskItem(this.nextId, task))
    return this.nextId
  }

  getTaskItems(includeComplete: boolean): TaskItem[] {
    return [...this.taskMap.values()]
      .filter(task => includeComplete || !task.complete)
  }

  getTaskById(id: number): TaskItem | undefined {
    return this.taskMap.get(id)
  }

  markComplete(id: number, complete: boolean): void {
    const taskItem = this.getTaskById(id)
    if (taskItem) {
      taskItem.complete = complete
    }
  }

  removeComplete(): void {
    this.taskMap.forEach(task => {
      if (task.complete) {
        this.taskMap.delete(task.id)
      }
    })
  }

  getTaskCounts(): TaskCounts {
    return {
      total: this.taskMap.size,
      inCompleted: this.getTaskItems(false).length
    }
  }
}