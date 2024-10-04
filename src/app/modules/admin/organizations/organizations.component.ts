import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Organizations } from 'app/models/organizations.model';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { PaginatorModule } from 'primeng/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatSort } from '@angular/material/sort';
import { AddEditOrganizationComponent } from './add-edit-organization/add-edit-organization.component';

@Component({
  selector: 'app-organizations',
  standalone:true,
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss'],
  imports: [ NgClass, NgIf, NgFor, MatIconModule, MatTableModule, MatMenuModule, PaginatorModule, MatPaginatorModule,  MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule, ReactiveFormsModule, FormsModule, MatCheckboxModule ]

})
export class OrganizationsComponent implements OnInit {

  organizationForm: FormGroup;
  title = 'A16CrudMat';
  displayedColumns: string[] = ['id', 'Organization Name', 'status', 'edit'];
  // dataSource: any;
  isDelete: boolean = false;
  first: number = 0;
  rows: number = 5;
  totalRecords: number | undefined;
  sliceDataSource!: MatTableDataSource<Organizations>;
  selectedRowData: any;
  pageSize: number = 5;
  pageIndex: number = 0;

  dataSource: Organizations[] = [
    { id: 1, organizationName: 'Zin Technologies', isActive: true },
    { id: 2, organizationName: 'Health Solutions', isActive: true },
    { id: 3, organizationName: 'Eco Warriors', isActive: false },
    { id: 4, organizationName: 'Creative Minds', isActive: true },
    { id: 5, organizationName: 'Future Builders', isActive: true },
    { id: 6, organizationName: 'Tech Innovators', isActive: false },
    { id: 7, organizationName: 'Global Outreach', isActive: true },
    { id: 8, organizationName: 'Cultural Exchange', isActive: true },
    { id: 9, organizationName: 'Innovation Hub', isActive: false },
    { id: 10, organizationName: 'Social Impact', isActive: true }
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private fb: FormBuilder,private dialog: MatDialog) {
    this.dataSource //= new MatTableDataSource<Organizations>();
    this.totalRecords = 0;
  }

  ngOnInit(): void {
    this.organizationForm = this.fb.group({
      organizationName: ['', [Validators.required]],
      isActive: [false, [Validators.required]]
    });
  }

  onSubmit() {
    if (this.organizationForm.valid) {
      console.log(this.organizationForm.value);
    }
  }

  openAddEditOrganizationForm(){
    const dialogRef = this.dialog.open(AddEditOrganizationComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          // this.getEmployeeList();
        }
      }
    })
  }
  rowClicked(row){
    this.isDelete = false;
    console.log(row);
    const dialogRef = this.dialog.open(AddEditOrganizationComponent, {
      data: {
        animal: row,
      },
    });
    // dialogRef.afterClosed().subscribe({
    //   next: (val) => {
    //     if (val) {
    //       // this.getEmployeeList();
    //     }
    //   }
    // });
  }
  onDeleteEmp(row){
    this.isDelete = true;
    console.log("Delete-Clicked", row);
    const dialogRef = this.dialog.open(AddEditOrganizationComponent, {
      data: {
        DelEmp: row
      },
    });
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        console.log("After-Closed Worked !!!");
        // this.getEmployeeList();
      }
    });
  }
  onPageChange($event){

  }
  applyFilter($event){

  }
  setRowData(row: any) {
    console.log("Row-Menu-Clicked", row);
    this.selectedRowData = row;
  }
}
