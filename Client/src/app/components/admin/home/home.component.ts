import { Component, OnInit } from "@angular/core";
import { UserService } from "../../../services/user.service";
import { User } from "../../../models/user.interface";
import { StatFrontierData } from "../../../models/stat-frontier-data.class";
import { StatData } from "./../../../models/stat-data.class";
import { StatParameters } from "./../../../models/stat-parameters.class";
import { StatsService } from "../../../services/stats.service";
import { DatePipe } from "@angular/common";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { OrderState } from "../../../models/order-state.class";
import { Order } from "../../../models/order.class";
import { FileService } from "../../../services/file.service";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  usersA: User[];
  rawFrontierData: StatFrontierData[];
  errorMessage: any;
  date: NgbDateStruct;
  public frontierData: Array<any>;
  public frontierLabels: Array<any>;

  constructor(
    private userService: UserService,
    public statsService: StatsService,
    public datepipe: DatePipe,
    public fileService: FileService
  ) {}
  public lineChartColors: Array<any> = [
    {
      // green
      backgroundColor: "rgba(40, 167, 69,0.2)",
      borderColor: "rgba(40, 167, 69, 1)",
      pointBackgroundColor: "rgba(40, 167, 69,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(40, 167, 69,0.8)"
    },
    {
      // red
      backgroundColor: "rgba(155, 24, 24,0.2)",
      borderColor: "rgba(155, 24, 24, 1)",
      pointBackgroundColor: "rgba(155, 24, 24,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(155, 24, 24,0.8)"
    },
    {
      // blue
      backgroundColor: "rgba(23, 69, 155, 0.2)",
      borderColor: "rgba(23, 69, 155, 1)",
      pointBackgroundColor: "rgba(23, 69, 155,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(23, 69, 155,0.8)"
    },
    {
      // magenta
      backgroundColor: "rgba(145, 20, 99,0.2)",
      borderColor: "rgba(145, 20, 99, 1)",
      pointBackgroundColor: "rgba(145, 20, 99,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(145, 20, 99,0.8)"
    },
    {
      // orange
      backgroundColor: "rgba(193, 141, 9,0.2)",
      borderColor: "rgba(193, 141, 9, 1)",
      pointBackgroundColor: "rgba(193, 141, 9,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(193, 141, 9,0.8)"
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = "line";
  ngOnInit() {
    // subscribe to router event
    this.loadData();
  }
  loadData() {
    this.getUsers();
    this.getFrontierStats();
    this.getOrders();
    this.getFormats();
  }
  orderState: OrderState = new OrderState();
  orders: Array<Order>;

  getStatusName(status: number) {
    return this.orderState.states.find(x => x.id == status).name;
  }
  getOrders() {
    this.fileService.getOrders().subscribe(data => {
      this.orders = data;
    }, error => (this.errorMessage = error));
  }
  public getFrontierStats() : void {
    let stat = new StatParameters(new Date( 
      "01.11.2017 00:00:00"), new Date("14.12.2017 00:00:00") )
    this.statsService
    .getFrontierStats(stat)
    .subscribe(
      data => {
          this.frontierLabels = data.labels;
          let i;
         for(i = 0; i < this.frontierLabels.length; i++) this.frontierLabels[i] = this.datepipe.transform(this.frontierLabels[i], 'dd.MM.yyyy');
          
         for(i = 0; i < data.datas.length; i++) data.datas[i].label = this.getFormatNamebyId(data.datas[i].label);
         
         
         setTimeout(() => { this.frontierData = data.datas }, 50);
     },
      error => (this.errorMessage = error)
    );
  }
  getFormats() {
    this.fileService
      .getFormats()
      .subscribe(
        data => (this.fileService.formats = data),
        error => (this.errorMessage = error)
      );
  }
  getFormatNamebyId(id : number){
    return this.fileService.formats.find(x => x.id == id).name;
  }
    // events
    public chartClicked(e:any):void {
      console.log(e);
    }
   
    public chartHovered(e:any):void {
      console.log(e);
    }
  getUsers() {
    this.userService
      .getUsers()
      .subscribe(
        users => this.onDataLoadSuccessful(users),
        error => this.onDataLoadFailed(error)
      );
  }

  onDataLoadSuccessful(users: User[]) {
    // this.alertService.stopLoadingMessage();
    // this.loadingIndicator = false;
    this.usersA = users;
  }
  onDataLoadFailed(error: any) {}
}
