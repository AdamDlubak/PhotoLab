export class OrderService extends BaseService {
...
  baseUrl: string = "";
  formats: Format[];
  uploader: FileUploader;
  fileItemDetails: Array<FileItemDetails>;
  order: Order;
  defaultParam: DefaultParam;
..
  constructor(private http: Http, private configService: ConfigService) {
    super();
    this.baseUrl = configService.getApiURI();
  }
..
  public getFormatPrice(formats: Format[], formatId: number) {
    return formats.find(x => x.id == formatId).price;
  }
  getNewOrdersAmount() : Observable <number> {
    return this.http
    .get(this.baseUrl + "/photo/getnewordersamount")
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  public notifyCart(itemDetails) {
    this.invokeEvent.next(itemDetails);
  }