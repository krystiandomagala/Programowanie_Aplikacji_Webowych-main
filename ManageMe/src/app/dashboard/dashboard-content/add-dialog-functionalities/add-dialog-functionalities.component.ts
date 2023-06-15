import { Component } from '@angular/core';
import { AddFunctionality } from '../../../helpers/localStorageHelper';
import { functionality } from 'src/app/models/functionality-model';

@Component({
  selector: 'app-add-dialog-functionalities',
  templateUrl: './add-dialog-functionalities.component.html',
  styleUrls: ['./add-dialog-functionalities.component.scss'],
})

export class AddDialogFunctionalitiesComponent {

  input!: string;
  data: functionality = { functionalityID: Date.now(), name: '', description: '', tasks: [] };
  functionallityName!: any;
  functionallityDesc!: any;

  onAdd() {
    const storedData = localStorage.getItem('functionalities');
    if(storedData?.includes(this.functionallityName)) 
    {
      alert("Ta nazwa już istnieje!")
      return;
    }
    if (this.functionallityName.trim() === '') {
      return;
    }
    this.data.name = this.functionallityName;
    this.data.description = this.functionallityDesc;
    AddFunctionality(this.data);
    location.reload();
  }
}