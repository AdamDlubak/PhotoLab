export class StatFrontierData {
    constructor (
        public datas : Array<FrontierResultData>,
        public labels : Array<Date>
    ){ }
}

export class FrontierResultData
{
   data : Array<number>;
   label : any;
}