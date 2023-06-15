import { Component, HostListener, EventEmitter,Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddDialogTasksComponent } from '../dashboard/dashboard-content/add-dialog-tasks/add-dialog-tasks.component';
import { EditDialogFunctionalitiesComponent } from '../dashboard/dashboard-content/edit-dialog-functionalities/edit-dialog-functionalities.component';
import { SaveFunctionalities } from '../helpers/localStorageHelper';
import { functionality } from '../models/functionality-model';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent {
  
  @Input() data!: any;
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

  openAddDialogTasks(id: number) {
    const dialogRef = this.dialog.open(AddDialogTasksComponent, {
      data: { id: id },
    });
  }

  openEditDialogFunctionalities(functionality: any) {
    console.log(functionality)
    this.dialog.open(EditDialogFunctionalitiesComponent, {
      data: functionality
    });
    
  }

  deleteFunctionality(id: any) {
    const deleteFunctionallity = this.loadProjects.filter(
      (func: functionality) => func.functionalityID !== id
    );

    SaveFunctionalities(deleteFunctionallity);
    location.reload();
  }
}
