import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'exchangeCurrency'
})

export class ExchangeCurrencyPipe implements PipeTransform {

  currencyExchange: any = 65.4;
  constructor(
  ){

  }

  transform(val: any, currency: any): any {
    if(currency.toUpperCase() == 'INR') {
      return val * this.currencyExchange.toFixed(2);
    }

    return val;
  }

}
