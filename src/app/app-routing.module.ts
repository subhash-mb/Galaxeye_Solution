import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserMapComponent } from './user-map/user-map.component';

const routes: Routes = [
  {path:'', component:UserMapComponent},
  {path:'user',component:UserMapComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
