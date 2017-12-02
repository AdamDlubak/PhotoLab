import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule, XHRBackend } from "@angular/http";
import { AuthenticateXHRBackend } from "./authenticate-xhr.backend";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Routing } from "./app.routing";
import { AppComponent } from "./app.component";
import { ConfigService } from "./utils/config.service";
import { EmailValidator } from "./directives/email.validator.directive";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AppComponent, EmailValidator],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Routing,
    BrowserAnimationsModule,
    NgbModule.forRoot()
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
