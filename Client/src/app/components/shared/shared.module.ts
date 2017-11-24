import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { myFocus } from "../../directives/focus.directive";
import { SpinnerComponent } from "../../components/shared/spinner/spinner.component";


@NgModule({
  imports: [CommonModule],
  declarations: [myFocus, SpinnerComponent],
  exports: [myFocus, SpinnerComponent],
  providers: []
})
export class SharedModule {}
