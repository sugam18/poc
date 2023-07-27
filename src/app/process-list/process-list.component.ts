import { Component } from '@angular/core';
import { AlertComponent } from '../alert/alert.component';
import { AppService } from '../app.service';

@Component({
  selector: 'app-process-list',
  templateUrl: './process-list.component.html',
  styleUrls: ['./process-list.component.scss']
})
export class ProcessListComponent {
  items: any = [];
  filteredItems:any = [];
  searchText: string = '';
  constructor(
    private appService: AppService,
    private alertComponent: AlertComponent
    ) {}
  
  ngOnInit(): void {
    this.appService.getDeployedProcess().subscribe(
      (response: any) => {
        this.items = response;
        this.filteredItems = response;
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

  startProcess(item: any) {
    this.appService.startProcess(item.processDefinitionKey, item.id).subscribe(
      (response: any) => {
        console.log(response);
        this.alertComponent.showMessage('Process has started.', 'Close');
      },
      (error: any) => {
        console.error('Error fetching data:', error);
      }
    );
  }
// We will redirect you to the task once it is created
  showAlert() {
    this.alertComponent.showMessage('This is an alert message!', 'Close');
  }

}
