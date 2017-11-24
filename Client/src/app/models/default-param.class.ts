import { Format } from './format.class';
import { Paper } from './paper.class';
import { DeliveryType } from './deliveryType.class';
export class DefaultParam {
    constructor(
        public id: number, 
        public formatId: number,
        public format: Format,
        public paperId: number, 
        public paper: Paper,
        public amount: number,
        public isHorizontal: boolean,
        public isContain: boolean,
        public deliveryTypeId: number,
        public deliveryType: DeliveryType
        ){ }
}