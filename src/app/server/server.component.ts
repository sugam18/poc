import { Component } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent {
  serverId: number = 12;
  serverStatus: string = "offline";
  allowNewServer: boolean = false; //

  constructor(){
    setTimeout(() => {
      this.allowNewServer = true;
    }, 3000);
  }
}
