import { DefaultParam } from "./default-param.class";
import { Format } from "./format.class";
export class  FileItemDetails {
  index: number;
  crop: boolean;
  prints: Print[];
  name: string;

  constructor(
    formats: Format[],
    name: string,
    defaultParams: any
  ) {
    this.crop = false;
    this.name = name;
    this.prints = [];
    for (let formatType of formats) {
      let print: Print;
      if (formatType.id == defaultParams.format) {
        print = {
          format: formatType.id,
          paper: defaultParams.paper,
          amount: defaultParams.amount
        };
      } else {
        print = {
          format: formatType.id,
          paper: defaultParams.paper,
          amount: 0
        };
      }

      this.prints.push(print);
    }
  }
}

interface Print {
  format: number;
  paper: number;
  amount: number;
}
