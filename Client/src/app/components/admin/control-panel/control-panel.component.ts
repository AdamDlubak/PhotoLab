import { Observable } from "rxjs/Observable";
import { Paper } from "./../../lab/order-photo-upload/models/paper.class";
import { Format } from "./../../lab/order-photo-upload/models/format.class";
import { Component, OnInit } from "@angular/core";
import { FileService } from "../../lab/services/file.service";
import { ToastrService } from "ngx-toastr";
import { DefaultParam } from "../../lab/order-photo-upload/models/default-param.class";

@Component({
  selector: "app-control-panel",
  templateUrl: "./control-panel.component.html",
  styleUrls: ["./control-panel.component.scss"]
})
export class ControlPanelComponent implements OnInit {
  errorMessage: any;
  formats: Format[];
  papers: Paper[];
  defaultParam: DefaultParam;
  selectedFormat: number = 0;
  selectedPaper: number = 0;
  private editingFormat = false;
  private editingPaper = false;
  private tmpFormat = new Format(0, "", null, null, null);
  private tmpPaper = new Paper(0, "");
  title : string;
  context : string;
  formatToDelete : boolean;

  constructor(
    private fileService: FileService,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.loadFormats();
    this.loadPapers();
    this.loadDefault();
  }

  // Formats
  loadFormats() {
    this.fileService
      .getFormats()
      .subscribe(
        data => (this.formats = data),
        error => (this.errorMessage = error)
      );
  }
  selectFormat(value: boolean, id: number) {
    this.editingFormat = value; 
    this.selectedFormat = id; 
    if (id == 0) this.tmpFormat = new Format(0, "", 0, 0, 0);
    else this.tmpFormat = this.formats.find(item => item.id === id);
    console.log("editingFormat");
  }
  submitFormat() {
    let FormatOperation: Observable<Format[]>;
    FormatOperation = this.fileService.submitFormat(this.tmpFormat);

    FormatOperation.subscribe(formats => {
      this.tmpFormat = new Format(0, "", 0, 0, 0);
      if (this.editingFormat)
        this.toastrService.info("Zmieniono ustawienia formatu!");
      else this.toastrService.success("Dodano nowy rodzaj formatu!");
      this.loadFormats();
    }, error => (this.errorMessage = error));
  }
  deleteFormatModal(id: number){
    this.selectedFormat = id;
    this.title = "Usuwanie formatu papieru";
    this.context = "Czy jesteś pewien, że chcesz usunąć ten format papieru?";
    this.formatToDelete = true;
  }
  deleteFormat(id: number) {
    this.fileService.deleteFormat(id).subscribe(response => {
      this.loadFormats();
      this.toastrService.error("Format został usunięty!");
    });
  }

  // Papers
  loadPapers() {
    this.fileService
      .getPapers()
      .subscribe(
        data => (this.papers = data),
        error => (this.errorMessage = error)
      );
  }
  selectPaper(value: boolean, id: number) {
    this.editingPaper = value; 
    this.selectedPaper = id; 
    if (id == 0) this.tmpPaper = new Paper(0, "");
    else this.tmpPaper = this.papers.find(item => item.id === id);
  }
  submitPaper() {
    let paperOperation: Observable<Paper[]>;
    paperOperation = this.fileService.submitPaper(this.tmpPaper);

    paperOperation.subscribe(papers => {
      this.tmpPaper = new Paper(0, "");
      if (this.editingPaper)
        this.toastrService.info("Zmieniono ustawienia papieru!");
      else this.toastrService.success("Dodano nowy rodzaj papieru!");
      this.loadPapers();
    }, error => (this.errorMessage = error));
  }
  deletePaperModal(id: number){
    this.selectedPaper = id;
    this.title = "Usuwanie papieru";
    this.context = "Czy jesteś pewien, że chcesz usunąć ten rodzaj papieru?";
    this.formatToDelete = false;
  }
  deletePaper(id: number) {
    this.fileService.deletePaper(id).subscribe(response => {
      this.loadPapers();
      this.toastrService.error("Rodzaj papieru został usunięty!");
    });
  }

  // Default
  loadDefault(){
    this.fileService
    .getDefaults()
    .subscribe(
      data => (this.defaultParam = data),
      error => (this.errorMessage = error)
    );
  }
  getFormatName(){
    return this.formats.find(x => x.id == this.defaultParam.formatId).name;
  }
  getPaperName(){
    return this.papers.find(x => x.id == this.defaultParam.paperId).name;
  }
  getContainType() {
    if(this.defaultParam.isContain) return "Wypełnienie";
    else return "Białe Paski";
  }
  getPositionType() {
    if(this.defaultParam.isHorizontal) return "Poziome";
    else return "Pionowe";
  }
  editDefault() {
    let defaultOperation: Observable<DefaultParam>;
    defaultOperation = this.fileService.editDefault(this.defaultParam);

    defaultOperation.subscribe(papers => {
        this.toastrService.info("Zmieniono domyślne ustawienia odbitek!");
      this.loadDefault();
    }, error => (this.errorMessage = error));
  }
}
