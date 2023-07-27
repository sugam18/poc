import { Component } from '@angular/core';
import { FormioComponent } from '@formio/angular/components/formio/formio.component';
import { AlertComponent } from '../alert/alert.component';
import { AppService } from '../app.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  items: any = [];
  formData: any = "";
  selectedItem: any = "";
  selectedTaskInfo: any = "";
  submission: any = {
    data: {
        name: 'Joe',
        amount: 1000
    }
  };;
  loadForm: boolean = false;
  formioComponent: FormioComponent | undefined;

  constructor(
    private appService: AppService,
    private alertComponent: AlertComponent
  ){}
  ngOnInit(): void {
    
    this.appService.getAllTasks().subscribe(
      (response: any) => {
        this.items = response;
        this.onItemClick(this.items[0]);

        // this.filteredItems = response;
      },
      (error: any) => {
        console.error('Error fetching data:', error);
      }
    );
   //  this.filteredItems = this.items; // Initialize filteredItems with all items initially
  }

  onItemClick(item: any) {
    this.selectedItem = item;

    this.appService.getTaskInfo(item.id).subscribe(
      (response: any) => {
        console.log('Item clicked:', response);
        this.selectedTaskInfo = response;
      },
      (error: any) => {
        console.error('Error fetching data:', error);
      }
    );
    if(item.formKey){
      this.loadForm = true;
      this.appService.getTaskDetails(item.processDefinitionKey, item.formKey).subscribe(
        (response: any) => {
          console.log('Item clicked:', response);
          // this.formData = {
          //   "components": [
          //   {
          //     "label": "Name",
          //     "type": "textfield",
          //     "id": "Field_1g15251",
          //     "key": "name",
          //     "validate": {
          //       "required": true
          //     }
          //   },
          //   {
          //     "label": "Amount",
          //     "type": "number",
          //     "id": "Field_0zxkyeo",
          //     "key": "amount",
          //     "validate": {
          //       "required": true
          //     }
          //   }
          // ],
          // };
          this.formData = JSON.parse(response.schema);
          console.log(this.submission);
          // this.filteredItems = response.schme;
          // const a = {
          //   "components": JSON.parse(this.formData).components
          // }
          // this.formData = JSON.stringify(a);
        },
        (error: any) => {
          console.error('Error fetching data:', error);
        }
      );
  } else {
    this.loadForm = false;
  }
  }

  assignTaskOnClick(item: any) {
    this.selectedTaskInfo.assignee = 'sugampradhan1@gmail.com';
    this.appService.assignTask(this.selectedTaskInfo, item.id).subscribe(
      (response: any) => {
        console.log('Item clicked:', response);
        this.selectedTaskInfo = response;
      },
      (error: any) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  unassignTaskOnClick(item: any) {
    this.selectedTaskInfo.assignee = null;
    this.appService.unassignTask(this.selectedTaskInfo, item.id).subscribe(
      (response: any) => {
        console.log('Item clicked:', response);
        this.selectedTaskInfo = response;
      },
      (error: any) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  onFormReady($: FormioComponent) {
    this.formioComponent = $;
  }

  onFormChange(event: any) {

  }
  onComplete(event: any) {
    const variables: any = {
      submittedBy: {
        value: 'sugampradhan1@gmail.com',
        type: 'string',
      },
    };
    console.log(this.submission);
    this.formioComponent?.formioReady.then((formio: any) => {
      formio.executeSubmit().then(
        async (submission: { data: any }) => {
          console.log(submission);
          let variableData: any = {"variables": this.objectToArray(submission.data)};
          console.log(variableData)
          // this.claimComplete(variables);
          // variableData = this.convertToVariableTemp(variableData);
          this.appService.completeTask(variableData, this.selectedItem.id).subscribe(
            (response: any) => {
              console.log('response', response);
              this.alertComponent.showMessage('Task has been completed.', 'Close');

              // this.selectedTaskInfo = response;
            },
            (error: any) => {
              console.error('Error fetching data:', error);
            }
          );
        },
        (err: any) => {
          console.log('Error', err);
        }
      );
  });
  }

   objectToArray(obj: any) {
    return Object.entries(obj).map(([key, value]) => ({ name: key, value: JSON.stringify(value) }));
  }

  convertToVariableTemp(inputData: any) {

    const outputData = inputData.variables.map((variable: any) => {
      if (variable.name === "name") {
        variable.value = `"${variable.value}"`;
      } else if (variable.name === "region") {
        variable.value = `"Asia"`;
      }
      return variable;
    });

    const outputJSON = JSON.stringify({ variables: outputData });
    console.log(outputJSON);
    return outputJSON;
  }
}
