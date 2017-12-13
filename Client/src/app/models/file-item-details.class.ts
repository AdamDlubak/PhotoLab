import { DefaultParam } from "./default-param.class";
import { Format } from "./format.class";
export class  FileItemDetails {
  id: number;
  isContain: boolean;
  prints: Print[];
  name: string;
  path: string;
  isHorizontal: boolean;

  constructor(
    formats: Format[],
    name: string,
    path: string,
    defaultParams: DefaultParam
  ) {
    this.isContain = defaultParams.isContain;
    this.name = name;
    this.path = path;
    this.prints = [];
    this.isHorizontal = defaultParams.isHorizontal;
    for (let formatType of formats) {
      let print: Print;
      if (formatType.id == defaultParams.formatId) {
        print = {
          formatId: formatType.id,
          paperId: defaultParams.paperId,
          amount: defaultParams.amount
        };
      } else {
        print = {
          formatId: formatType.id,
          paperId: defaultParams.paperId,
          amount: 0
        };
      }

      this.prints.push(print);
    }
  }
}

interface Print {
  formatId: number;
  paperId: number;
  amount: number;
}
