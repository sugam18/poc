import { Component } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  items: any = [];
  filteredItems:any = [];
  searchText: string = '';
  constructor(private appService: AppService) {

  }
  ngOnInit(): void {
    this.appService.getData().subscribe(
      (response: any) => {
        this.items = response.items;
        this.filteredItems = response.items;
      },
      (error: any) => {
        console.error('Error fetching data:', error);
      }
    );
   //  this.filteredItems = this.items; // Initialize filteredItems with all items initially
  }
  applyFilter() {
    const filterValue = this.searchText.trim().toLowerCase();
    this.filteredItems = this.items.filter((item: any) =>
      item.bpmnProcessId.toLowerCase().includes(filterValue)
    );
  }
}
