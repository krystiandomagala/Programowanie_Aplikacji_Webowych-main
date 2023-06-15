import { Component, HostListener, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogTasksComponent } from '../dashboard/dashboard-content/edit-dialog-tasks/edit-dialog-tasks.component';
import { SaveFunctionalities } from '../helpers/localStorageHelper';

@Component({
  selector: 'app-dropdown-task',
  templateUrl: './dropdown-task.component.html',
  styleUrls: ['./dropdown-task.component.scss']
})
export class DropdownTaskComponent {
  @Input() data!: any;
  @Input() taskData!: any;
  dropdownActive: boolean = false;
  loadProjects: any = {};
  
  constructor(public dialog: MatDialog) {
    const storedData = localStorage.getItem('functionalities');
    if (storedData) {
      this.loadProjects = JSON.parse(storedData);
    }
  }
  toggleDropdown(event: MouseEvent) {
    event.stopPropagation();
    this.dropdownActive = !this.dropdownActive;
  }

  closeDropdown() {
    this.dropdownActive = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      this.closeDropdown();
    }
  }

  openEditDialogTasks(functionalityId: number, taskId: number) {
    this.dialog.open(EditDialogTasksComponent, {
      data: {
        functionality: functionalityId,
        task: taskId
      }
    });
  }
  
  
  deleteTask(selectedFunctionalityId: number, taskId: number) {
    const selectedFunctionalityIndex = this.loadProjects.findIndex(
      (project: any) => project.functionalityID === selectedFunctionalityId
    );
    if (selectedFunctionalityIndex !== -1) {
      const selectedFunctionality =
        this.loadProjects[selectedFunctionalityIndex];
      const filteredTasks = selectedFunctionality.tasks.filter(
        (task: any) => task.taskID !== taskId
      );
      selectedFunctionality.tasks = filteredTasks;
      this.loadProjects[selectedFunctionalityIndex] = selectedFunctionality;
      SaveFunctionalities(this.loadProjects);
    }
    location.reload();
  }

}
