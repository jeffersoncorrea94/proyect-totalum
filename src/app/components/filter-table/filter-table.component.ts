import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-table.component.html',
  styleUrls: ['./filter-table.component.css']
})
export class FilterTableComponent implements OnInit {
  @Input() tableData: any[] = [];
  @Input() columns: string[] = [];
  @Input() title: string = '';
  @Input() itemsPerPage: number = 5;

  searchTerm: string = '';
  currentPage: number = 1;

  ngOnInit(): void {
    if (!this.tableData) {
      this.tableData = [];
    }
  }

  get filteredData(): any[] {
    const lowerSearchTerm = this.searchTerm.toLowerCase();
    return this.tableData.filter(item => {
      return Object.values(item).some(value => {
        if (typeof value === 'string') {
          return value.toLowerCase().includes(lowerSearchTerm);
        }
        if (typeof value === 'number') {
          return value.toString().includes(lowerSearchTerm);
        }
        return false;
      });
    });
  }

  get pagedAndFilteredData(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredData.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredData.length / this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}