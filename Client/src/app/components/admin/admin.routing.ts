import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderComponent } from './Order/Order.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { ModuleWithProviders } from "@angular/core";
import { RouterModule } from "@angular/router";

import { AdminLayoutComponent } from "./_layout/admin-layout.component";
import { HomeComponent } from "./home/home.component";
import { UserEditComponent } from "./user-edit/user-edit.component";
import { UsersComponent } from "./users/users.component";

import { AuthGuard } from "../../auth.guard";

export const Routing: ModuleWithProviders = RouterModule.forChild([
  {
    path: "",
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    
    children: [
      { path: "", redirectTo: 'home', pathMatch: 'full'},
      { path: "home", component: HomeComponent},
      { path: "user", component: UserEditComponent},
      { path: "users", component: UsersComponent},
      { path: "orders", component : OrderComponent},
      { path: "order-details/:id", component : OrderDetailsComponent},
      { path: "control-panel", component: ControlPanelComponent},
      { path: "**", redirectTo: "home", pathMatch: "full" }    
    ]
  }
]);
