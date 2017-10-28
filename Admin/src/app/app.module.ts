import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule, XHRBackend } from "@angular/http";
import { AuthenticateXHRBackend } from "./authenticate-xhr.backend";

import { routing } from "./app.routing";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { HomeComponent } from "./components/home/home.component";

import { AccountModule } from "./components/account/account.module";
import { DashboardModule } from "./components/dashboard/dashboard.module";

import { ConfigService } from "./shared/utils/config.service";

import { AdminLayoutComponent } from './shared/layouts/admin-layout/admin-layout.component';
import { LabLayoutComponent } from './shared/layouts/lab-layout/lab-layout.component';
import { OthersLayoutComponent } from './shared/layouts/others-layout/others-layout.component';


@NgModule({
  declarations: [AppComponent, HeaderComponent, HomeComponent, AdminLayoutComponent, LabLayoutComponent, OthersLayoutComponent],
  imports: [
    AccountModule,
    DashboardModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    ConfigService,
    {
      provide: XHRBackend,
      useClass: AuthenticateXHRBackend
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
