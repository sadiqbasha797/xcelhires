import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DepartmentService } from '../services/department.service';
import { MatTableModule } from '@angular/material/table';
import { Papa } from 'ngx-papaparse';
import { saveAs } from 'file-saver';
import { SidenavComponent } from '../sidenav/sidenav.component';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatPaginator,MatTableModule,SidenavComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'status'];
  dataSource = new MatTableDataSource<any>();

  totalMembers = 0;
  activeMembers = 0;
  inactiveMembers = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private departmentService: DepartmentService, private papa: Papa) { }

  ngOnInit(): void {
    this.loadDepartments();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadDepartments(): void {
    this.departmentService.getDepartments().subscribe(response => {
      if (response.status === 200) {
        this.dataSource.data = response.data.rows;
        this.totalMembers = response.data.count;
        this.activeMembers = this.dataSource.data.filter((row: any) => row.status === 'a').length;
        this.inactiveMembers = this.totalMembers - this.activeMembers;
      } else {
        alert('Failed to fetch departments');
      }
    }, error => {
      alert('Error fetching departments: ' + error.message);
    });
  }

  exportData(): void {
    const dataToExport = this.dataSource.data.map(row => {
      return {
        ID: row.id,
        Name: row.name,
        Status: row.status
      };
    });

    const csvData = this.papa.unparse(dataToExport);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'departments.csv');
  }
}