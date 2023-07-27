import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidenavContentComponent } from './sidenav-content/sidenav-content.component';

const routes: Routes = [
  { path: 'process-list', component: SidenavContentComponent, data: { componentToShow: 'process-list' } },
  { path: 'task-list', component: SidenavContentComponent, data: { componentToShow: 'task-list' } },
  { path: 'dashboard', component: SidenavContentComponent, data: { componentToShow: 'dashboard' } },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
