import { AuthGuard } from "../../auth.guard";

export const Routing: ModuleWithProviders = RouterModule.forChild([
  {
    path: "",
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    
    children: [
      { path: "", redirectTo: 'home', pathMatch: 'full'},
      { path: "home", component: HomeComponent},
      ...