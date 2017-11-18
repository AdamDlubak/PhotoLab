import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./auth.guard";

const appRoutes: Routes = [
  {
    path: "",
    loadChildren: "app/components/lab/lab.module#LabModule"
  },
  {
    path: "login",
    loadChildren: "app/components/others/others.module#OthersModule"
  },
  {
    path: "admin",
    loadChildren: "app/components/admin/admin.module#AdminModule"
  },
  { path: "**", redirectTo: "", pathMatch: "full" }
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
