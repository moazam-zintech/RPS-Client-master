import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-edit-organization',
  standalone: true,
  templateUrl: './add-edit-organization.component.html',
  styleUrls: ['./add-edit-organization.component.scss'],
  imports: [NgClass, NgIf, NgFor, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, FormsModule, MatCheckboxModule]
})
export class AddEditOrganizationComponent implements OnInit {
  organizationForm: FormGroup;
  isEditForm = false;
  receiveddata: any;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<AddEditOrganizationComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.organizationForm = this.fb.group({
      id: [''],
      organizationName: ['', [Validators.required]],
      isActive: [false, [Validators.required]]
    });
  }

  ngOnInit(): void {

    if (this.data) {
      if (this.data.animal) {
        this.organizationForm.setValue(this.data.animal);
        this.isEditForm = true;
      }
      if (this.data.DelEmp) {
        console.log("Is Delete: ", this.data.DelEmp);
        this.receiveddata = this.data.DelEmp;
        this.isEditForm = true;
      }
    }
  }

  onSubmit() {
    if (this.organizationForm.valid) {
      console.log(this.organizationForm.value);
    }
  }
}
