import { Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

export interface Board {
  lists: List[];
}

export interface List {
  title: string;
  tasks: Task[];
}

export interface Task {
  text: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public board: Board = {
    lists: [
      {
        title: 'Todo',
        tasks: [{ text: 'Do something' }, { text: 'Do another thing' }],
      },
      { title: 'In Progress', tasks: [{ text: 'Make my hair' }] },
      {
        title: 'Done',
        tasks: [
          { text: 'Apply to that job' },
          { text: 'Learn more Angular' },
          { text: 'Learn more CSS' },
        ],
      },
    ],
  };

  public drop(event: CdkDragDrop<List>): void {
    const { previousIndex, currentIndex, previousContainer, container } = event;
    const isSamePosition = previousIndex === currentIndex;
    const isSameContainer = previousContainer === container;

    if (isSameContainer && isSamePosition) return;

    isSameContainer
      ? moveItemInArray(container.data.tasks, previousIndex, currentIndex)
      : transferArrayItem(
          previousContainer.data.tasks,
          container.data.tasks,
          previousIndex,
          currentIndex
        );
  }
}
