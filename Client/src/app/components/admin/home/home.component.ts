import { Component, OnInit } from "@angular/core";

import { HomeDetails } from "../models/home.details.interface";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  homeDetails: HomeDetails;

  constructor() {}

  ngOnInit() {
  }
}
