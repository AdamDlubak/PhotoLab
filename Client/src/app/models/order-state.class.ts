import { State } from './order-state.class';
export class OrderState {
    public states : State[] = [];
    constructor(){
        this.states.push({id: 0, name: "Zlecone | Oczekuje na płatność" });
        this.states.push({id: 1, name: "Zlecone | Opłacone" });
        this.states.push({id: 2, name: "Zlecone | Płatność za pobraniem" });
        this.states.push({id: 3, name: "Przyjęte | W trakcie realizacji" });
        this.states.push({id: 4, name: "Gotowe | Do odbioru" });
        this.states.push({id: 5, name: "Gotowe | Do wysyłki" });
        this.states.push({id: 6, name: "Zakończone | Wysłane" });
        this.states.push({id: 7, name: "Zakończone | Odebrane" });
    }
}
export interface State
{
  id : number;
  name : string;
}