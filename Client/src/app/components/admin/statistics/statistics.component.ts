import { StatData } from './../../../models/stat-data.class';
import { StatParameters } from './../../../models/stat-parameters.class';
import { Component, OnInit } from '@angular/core';
import { StatsService } from '../../../services/stats.service';
import { DatePipe } from '@angular/common'
import { NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { StatEvidenceForm } from '../../../models/stat-evidence-form.class';
import { StatEvidenceData } from '../../../models/stat-evidence-data.class';
import { StatFrontierData } from '../../../models/stat-frontier-data.class';

const now = new Date();

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./../control-panel/control-panel.component.scss']
})
export class StatisticsComponent implements OnInit {

  errorMessage: any;
  date: NgbDateStruct;
  formData = new StatEvidenceForm();
  rawEvidenceData : StatEvidenceData[]; 
  rawFrontierData : StatFrontierData[];
  elem : StatEvidenceData;
  constructor(public statsService : StatsService, public datepipe: DatePipe) { }

  ngOnInit() {
    this.getEvidenceStats();
    this.getSystemStats();
    this.getFrontierStats();
  }
  selectToday(id : any) {
    this.date = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
    if(id != 0) {
      this.elem = this.rawEvidenceData.find(x => x.id == id);
        this.formData.proceeds =  this.elem.proceeds;
        this.formData.quantity = this.elem.quantity;
       
    }
  }

  // lineChart
  public lineChartData:Array<any> = [
    {data: [65, 123], label: 'Series A'},
  ];
  public lineChartLabels:Array<any> = ['January', 'February'];
  public lineChartOptions:any = {
    responsive: true
  };

  public evidenceChartOptions:any = {
    responsive: true,
    legend: {
      display: false
    }

  };
  public evidenceData:Array<any>;
  public evidenceLabels:Array<any>;

  public frontierData:Array<any>;
  public frontierLabels:Array<any>;

  private submit() : void {
    this.formData.statDate = new Date(this.date.year, this.date.month - 1, this.date.day, 2, 0, 0, 0);
    this.statsService
    .addEvidenceStat(this.formData)
    .subscribe(data => {
        this.getEvidenceStats();
        },
      error => (this.errorMessage = error)
    );   
  }
  public lineChartColors:Array<any> = [
    { // green
      backgroundColor: 'rgba(40, 167, 69,0.2)',
      borderColor: 'rgba(40, 167, 69, 1)',
      pointBackgroundColor: 'rgba(40, 167, 69,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(40, 167, 69,0.8)'
    },
    { // red
      backgroundColor: 'rgba(155, 24, 24,0.2)',
      borderColor: 'rgba(155, 24, 24, 1)',
      pointBackgroundColor: 'rgba(155, 24, 24,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(155, 24, 24,0.8)'
    },
    { // blue
      backgroundColor: 'rgba(23, 69, 155, 0.2)',
      borderColor: 'rgba(23, 69, 155, 1)',
      pointBackgroundColor: 'rgba(23, 69, 155,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(23, 69, 155,0.8)'
    },
    { // magenta
      backgroundColor: 'rgba(145, 20, 99,0.2)',
      borderColor: 'rgba(145, 20, 99, 1)',
      pointBackgroundColor: 'rgba(145, 20, 99,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(145, 20, 99,0.8)'
    },
    { // orange
      backgroundColor: 'rgba(193, 141, 9,0.2)',
      borderColor: 'rgba(193, 141, 9, 1)',
      pointBackgroundColor: 'rgba(193, 141, 9,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(193, 141, 9,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  public getEvidenceStats() : void {
    let stat = new StatParameters(new Date(
      "01.11.2017 00:00:00"), new Date("30.11.2017 00:00:00") )
    this.statsService
    .getEvidenceStats(stat)
    .subscribe(
      data => {
        this.rawEvidenceData = data;
        let _lineChartData:Array<any> = new Array(1);
        let _lineChartLabels:Array<any> = new Array(data.length);

        let i = 0;
          data.forEach(element => { 
            
            
            _lineChartLabels[i] = this.datepipe.transform(element.statDate, 'dd.MM.yyyy'); i++ });

          _lineChartData[0] = {data: new Array(data.length), proceeds: new Array(data.length), label: "Legitymacyjne", id: new Array(data.length)};
          i = 0;
          data.forEach(element => { _lineChartData[0].data[i] = element.quantity; _lineChartData[0].proceeds[i] = element.proceeds; _lineChartData[0].id[i] = element.id; i++ });
          this.evidenceLabels = _lineChartLabels;
          
          setTimeout(() => {this.evidenceData = _lineChartData;}, 50);
        },
      error => (this.errorMessage = error)
    );
  }
  public getSystemStats() : void {
    let stat = new StatParameters(new Date(
      "01.11.2017 00:00:00"), new Date("30.11.2017 00:00:00") )
    this.statsService
    .getSystemStats(stat)
    .subscribe(
      data => {
        let _lineChartData:Array<any> = new Array(1);
        let _lineChartLabels:Array<any> = new Array(data.length);

        let i = 0;
          data.forEach(element => { 
            
            
            _lineChartLabels[i] = this.datepipe.transform(element.date, 'yyyy-MM-dd'); i++ });

          _lineChartData[0] = {data: new Array(data.length), label: "10x15"};
          i = 0;
          data.forEach(element => { _lineChartData[0].data[i] = element.quantity; i++ });
          this.lineChartLabels = _lineChartLabels;
          
          setTimeout(() => {this.lineChartData = _lineChartData;}, 50);
        },
      error => (this.errorMessage = error)
    );
  }
  public getFrontierStats() : void {
    let stat = new StatParameters(new Date(
      "01.11.2017 00:00:00"), new Date("14.12.2017 00:00:00") )
    this.statsService
    .getFrontierStats(stat)
    .subscribe(
      data => {
        this.rawFrontierData = data;
        let _lineChartData:Array<any> = new Array(5);
        let _lineChartLabels:Array<any> = new Array(5);

        let i = 0;
        
          data.forEach(element => {  _lineChartLabels[i] = this.datepipe.transform(element.statDate, 'dd.MM.yyyy'); i++ });

          _lineChartData[0] = {data: new Array(5), label: "9x13", id: new Array(data.length)};
          _lineChartData[1] = {data: new Array(5), label: "10x15", id: new Array(data.length)};
          _lineChartData[2] = {data: new Array(5), label: "13x18", id: new Array(data.length)};
          _lineChartData[3] = {data: new Array(5), label: "15x21", id: new Array(data.length)};
          _lineChartData[4] = {data: new Array(5), label: "21x30", id: new Array(data.length)};
          i = 0;

          _lineChartData[0].data[0] = 15;
          _lineChartData[0].data[1] = 96;
          _lineChartData[0].data[2] = 34;
          _lineChartData[0].data[3] = 34;
          _lineChartData[0].data[4] = 17;

          _lineChartData[1].data[0] = 0;
          _lineChartData[1].data[1] = 9;
          _lineChartData[1].data[2] = 75;
          _lineChartData[1].data[3] = 22;
          _lineChartData[1].data[4] = 2;

          _lineChartData[2].data[0] = 75;
          _lineChartData[2].data[1] = 34;
          _lineChartData[2].data[2] = 33;
          _lineChartData[2].data[3] = 96;
          _lineChartData[2].data[4] = 75;

          _lineChartData[3].data[0] = 22;
          _lineChartData[3].data[1] = 23;
          _lineChartData[3].data[2] = 64;
          _lineChartData[3].data[3] = 0;
          _lineChartData[3].data[4] = 111;

          _lineChartData[4].data[0] = 64;
          _lineChartData[4].data[1] = 53;
          _lineChartData[4].data[2] = 12;
          _lineChartData[4].data[3] = 21;
          _lineChartData[4].data[4] = 123;
          // data.forEach(element => { 
          //   console.log(element);
          //   if(element.formatId == 1) { _lineChartData[0].data[i] = element.quantity;  _lineChartData[0].id[i] = element.id; i++; }
          //   if(element.formatId == 2) { _lineChartData[1].data[i] = element.quantity;  _lineChartData[1].id[i] = element.id; i++; }
          //   if(element.formatId == 3) { _lineChartData[2].data[i] = element.quantity;  _lineChartData[2].id[i] = element.id; i++; }
          //   if(element.formatId == 4) { _lineChartData[3].data[i] = element.quantity;  _lineChartData[3].id[i] = element.id; i++; }
          //   if(element.formatId == 5) { _lineChartData[4].data[i] = element.quantity;  _lineChartData[4].id[i] = element.id; i++; }
          // });
          this.frontierLabels = _lineChartLabels;
          
          setTimeout(() => {this.frontierData = _lineChartData;}, 50);

          console.log(this.frontierLabels);
          console.log(this.frontierData);
        
        },
      error => (this.errorMessage = error)
    );
  }
}
