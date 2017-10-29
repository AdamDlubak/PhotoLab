import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule, XHRBackend } from "@angular/http";
import { AuthenticateXHRBackend } from "./authenticate-xhr.backend";

import { Routing } from "./app.routing";

import { AppComponent } from "./app.component";


// import { AdminModule } from "./components/admin/admin.module";
// import { LabModule } from "./components/lab/lab.module";
// import { OthersModule } from "./components/others/others.module";

import { ConfigService } from "./shared/utils/config.service";
import { EmailValidator } from "./directives/email.validator.directive";

// import { HomeComponent } from "./components/home/home.component";

// import { AdminLayoutComponent } from './shared/layouts/admin-layout/admin-layout.component';
// import { AdminSidebarComponent } from './shared/layouts/admin-layout/elements/sidebar/sidebar.component';
// import { AdminHeaderComponent } from './shared/layouts/admin-layout/elements/header/header.component';
// import { LabLayoutComponent } from './shared/layouts/lab-layout/lab-layout.component';
// import { OthersLayoutComponent } from './shared/layouts/others-layout/others-layout.component';


@NgModule({
  declarations: [AppComponent, EmailValidator],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Routing
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