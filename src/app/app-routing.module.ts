import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyDeskComponent } from './components/my-desk/my-desk.component';
import { SavingsComponent } from './components/savings/savings.component';
import { ForecastsSavingsComponent } from './components/savings/modules/forecasts-savings/forecasts-savings.component';
import { ElSavingsComponent } from './components/savings/modules/el-savings/el-savings.component';
import { AllocationSavingsComponent } from './components/savings/modules/allocation-savings/allocation-savings.component';
import { FsAllocationKeysMaintainanceComponent } from './components/savings/modules/forecasts-savings/fs-allocation-keys-maintainance/fs-allocation-keys-maintainance.component';
import { FsDashboardComponent } from './components/savings/modules/forecasts-savings/fs-dashboard/fs-dashboard.component';
import { FsBuyersComponent } from './components/savings/modules/forecasts-savings/fs-buyers/fs-buyers.component';


const routes: Routes = [
  { path: '', redirectTo: 'my-desk', pathMatch: 'prefix'},
  { path: 'my-desk', component : MyDeskComponent},
  { path: 'savings', component : SavingsComponent, 
    children: [
      {path: '', redirectTo : 'forecasts-savings', pathMatch: 'prefix'},
      {path: 'forecasts-savings', component : ForecastsSavingsComponent},
      {path: 'forecasts-savings/dashboard', component: FsDashboardComponent},
      {path: 'forecasts-savings/allocation-keys-maintainance', component: FsAllocationKeysMaintainanceComponent},
      {path: 'forecasts-savings/buyers', component: FsBuyersComponent},
      {path: 'el-savings', component : ElSavingsComponent},
      {path: 'allocation-savings', component : AllocationSavingsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
