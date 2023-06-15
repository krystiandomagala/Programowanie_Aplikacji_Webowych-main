import { Component, OnInit } from '@angular/core';
import { projectDetails } from './project-details';
import { MatDialog } from '@angular/material/dialog';
import { AddDialogFunctionalitiesComponent } from './add-dialog-functionalities/add-dialog-functionalities.component';
import { SaveFunctionalities } from 'src/app/helpers/localStorageHelper';

@Component({
  selector: 'app-dashboard-content',
  templateUrl: './dashboard-content.component.html',
  styleUrls: ['./dashboard-content.component.scss'],
})
export class DashboardContentComponent implements OnInit {
  enums: string[] = [];

  ToDo: any = localStorage.getItem('ToDo');
  Done: any = localStorage.getItem('Done');
  Doing: any = localStorage.getItem('Doing');

  projectList = projectDetails;
  loadProjects: any = {};

  constructor(public dialog: MatDialog) {
    const storedData = localStorage.getItem('functionalities');
    if (storedData) {
      this.loadProjects = JSON.parse(storedData);
    }
  }

  isToDo(item: any){

    console.log(item)
    if(item == 'To Do')
      return true;

    return false;
  }
  
  isDoing(item: any){

    console.log(item)
    if(item == 'Doing')
      return true;

    return false;
  }

  isDone(item: any){

    console.log(item)
    if(item == 'Done')
      return true;

    return false;
  }

  ngOnInit(): void {
    this.enums.push(this.ToDo);
    this.enums.push(this.Done);
    this.enums.push(this.Doing);

    for (const functionality of this.loadProjects) {
      for (const task of functionality.tasks) {
        const taskState = localStorage.getItem(task.taskID.toString());
        if (taskState) {
          task.state = taskState;
        }
      }

    }

  }

  saveToLocal(option: any, task: any) {
    task.state = option.value;
    SaveFunctionalities(this.loadProjects);
  }

  openAddDialogFunctionalities() {
    this.dialog.open(AddDialogFunctionalitiesComponent);
  }

  changeState() {}
}
