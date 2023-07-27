import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token } from '@angular/compiler';
import { Tokens } from './token';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private operateUrl = 'https://dsm-1.operate.camunda.io/7340eef7-906d-4e98-8de0-c76b83ea3769';
  private tasklistUrl = 'https://dsm-1.tasklist.camunda.io/7340eef7-906d-4e98-8de0-c76b83ea3769';
  private apiUrl = `${this.operateUrl}/v1/process-instances/search`;
  private getDeployedProcessUrl = `${this.tasklistUrl}/v1/internal/processes`;
  private startProcessUrl = `${this.tasklistUrl}/v1/internal/processes/`;
  private allTaskUrl = `${this.tasklistUrl}/v1/tasks/search`;
  private getTaskDetailsUrl = `${this.tasklistUrl}/v1/forms`;
  private taskUrl = `${this.tasklistUrl}/v1/tasks`;
  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + Tokens.operateToken // Replace with your actual access token
    });
    const requestBody = {};
    return this.http.post<any>(this.apiUrl, requestBody, { headers });
  }

  getDeployedProcess(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + Tokens.taskToken // Replace with your actual access token
    });
    return this.http.get<any>(this.getDeployedProcessUrl, { headers });
  }

  startProcess(processDefiniationKey: string, id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + Tokens.taskToken // Replace with your actual access token
    });
    const cUrl = `${this.startProcessUrl}${processDefiniationKey}/start`
    const requestBody = { id: id };
    return this.http.patch<any>(cUrl, requestBody, { headers });
  }

  getAllTasks(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + Tokens.taskToken // Replace with your actual access token
    });
    const requestBody = {"sort":[{"field":"creationTime","order":"DESC"}],"pageSize":50,"state":"CREATED"};
    return this.http.post<any>(this.allTaskUrl, requestBody, { headers });
  }
  getTaskInfo(taskId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + Tokens.taskToken // Replace with your actual access token
    });
    const cUrl = `${this.taskUrl}/${taskId}`;
    return this.http.get<any>(cUrl, { headers });
  }
  getTaskDetails(taskId: string, formKey: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + Tokens.taskToken // Replace with your actual access token
    });
    const taskForm = this.getTheFormKey(formKey);
    const cUrl = `${this.getTaskDetailsUrl}/${taskForm}?processDefinitionKey=${taskId}`;
    return this.http.get<any>(cUrl, { headers });
  }

  completeTask(variables: any, taskId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + Tokens.taskToken // Replace with your actual access token
    });
    const requestBody = variables;
    const cUrl = `${this.taskUrl}/${taskId}/complete`;
    return this.http.patch<any>(cUrl, requestBody, { headers });
  }

  assignTask(data: any, taskId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + Tokens.taskToken // Replace with your actual access token
    });
    const requestBody = data;
    const cUrl = `${this.taskUrl}/${taskId}/assign`;
    return this.http.patch<any>(cUrl, requestBody, { headers });
  }
  unassignTask(data: any, taskId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + Tokens.taskToken // Replace with your actual access token
    });
    const requestBody = data;
    const cUrl = `${this.taskUrl}/${taskId}/unassign`;
    return this.http.patch<any>(cUrl, requestBody, { headers });
  }

  getTheFormKey(formKey: string) {
    return formKey?.split(":")[2];
  }
}
