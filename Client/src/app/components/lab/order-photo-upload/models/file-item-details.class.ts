import { DefaultParam } from "./default-param.class";
import { Format } from "./format.class";
export class  FileItemDetails {
  id: number;
  isContain: boolean;
  prints: Print[];
  name: string;
  isHorizontal: boolean;

  constructor(
    formats: Format[],
    name: string,
    defaultParams: DefaultParam
  ) {
    this.isContain = defaultParams.isContain;
    this.name = name;
    this.prints = [];
    this.isHorizontal = defaultParams.isHorizontal;
    for (let formatType of formats) {
      let print: Print;
      if (formatType.id == defaultParams.formatId) {
        print = {
          format: formatType.id,
          paper: defaultParams.paperId,
          amount: defaultParams.amount
        };
      } else {
        print = {
          format: formatType.id,
          paper: defaultParams.paperId,
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
