import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderComponent } from './Order/Order.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { ModuleWithProviders } from "@angular/core";
import { RouterModule } from "@angular/router";

import { AdminLayoutComponent } from "./_layout/admin-layout.component";
import { HomeComponent } from "./home/home.component";
import { UserEditComponent } from "./user-edit/user-edit.component";
import { UsersComponent } from "./users/users.component";

import { AuthGuardService as AuthGuard  } from "../../auth.guard";
import { RoleGuardService as RoleGuard  } from "../../auth.guard";
import { StatisticsComponent } from './statistics/statistics.component';

export const Routing: ModuleWithProviders = RouterModule.forChild([
  {
    path: "",
    component: AdminLayoutComponent,
    
    
    children: [
      { path: "", redirectTo: 'home', pathMatch: 'full'},
      { path: "home", component: HomeComponent, canActivate: [RoleGuard], 
      data: { 
        expectedRole: 'roladmin'
      } },
      { path: "user", component: UserEditComponent, canActivate: [AuthGuard]},
      { path: "users", component: UsersComponent},
      { path: "orders", component : OrderComponent},
      { path: "order-details/:id", component : OrderDetailsComponent},
      { path: "control-panel", component: ControlPanelComponent},
      { path: "statistics", component: StatisticsComponent},
      { path: "**", redirectTo: "home", pathMatch: "full" }    
    ]
  }
]);
