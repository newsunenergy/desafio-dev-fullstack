export class Consumo {
    private historico: ConsumoMensal[];
  
    constructor(historico: ConsumoMensal[]) {
      this.historico = historico;
    }
  
    getHistorico(): ConsumoMensal[] {
      return this.historico;
    }
  
    adicionarConsumoMensal(consumoMensal: ConsumoMensal) {
      this.historico.push(consumoMensal);
    }
  }
  
  export interface ConsumoMensal {
    consumoForaPontaEmKWH: number;
    mesDoConsumo: Date;
  }
  