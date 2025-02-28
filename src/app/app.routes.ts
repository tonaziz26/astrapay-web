import { Routes } from '@angular/router';
import { ExampleFormComponent } from './example-form/example-form.component';
import { ExampleListComponent } from './example-list/example-list.component';
import { ExampleDetailComponent } from './example-detail/example-detail.component';

export const routes: Routes = [
  { path: 'example-form', component: ExampleFormComponent },
  { path: 'example-list', component: ExampleListComponent },
  { path: 'example-detail/:name', component: ExampleDetailComponent },
  { path: '', redirectTo: '/example-list', pathMatch: 'full' }
];
