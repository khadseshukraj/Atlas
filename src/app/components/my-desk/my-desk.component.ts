import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-my-desk',
  templateUrl: './my-desk.component.html',
  styleUrls: ['./my-desk.component.scss']
})
export class MyDeskComponent {

  aboutToExpireBARS = [
    {
      "name": "Next 30 Days",
      "value": 1
    },
  
    {
      "name": "Next 60 Days",
      "value": 5
    }, 

    {
      "name": "Next 90 Days",
      "value": 12
    }
  ];

  aboutToExpireContracts = [
    {
      "name": "Next 30 Days",
      "value": 2
    },
  
    {
      "name": "Next 60 Days",
      "value": 4
    }, 

    {
      "name": "Next 90 Days",
      "value": 9
    }
  ];


  pricesExpiringIn30DaysData = [
    {
      "name": "BASF",
      "value": 20
    },
    {
      "name": "ALPLA",
      "value": 3
    },
    {
      "name": "Other",
      "value": 7
    }
  ];

  spendByOrganizationalUnit = [
    {
      "name": "FABRIC CARE",
      "value": 1800000
    },
    {
      "name": "HOME CARE",
      "value": 1200000
    },
    {
      "name": "BABY CARE",
      "value": 800000
    }
  ];

  savingsData = [
    {
      "name": "Commited at the FIRM",
      "value": 3400000
    },
    {
      "name": "Submitted in FEB FF",
      "value": 2900000
    },
    {
      "name": "Help/Hurt",
      "value": 500000
    }
  ];

  colors = { domain : ['#00ADF9', '#FDB45C', '#803690', '#e74c3c', '#AAAAAA'] };

  formatMoney(val: number): string {
    const currencyPipe = new CurrencyPipe('en_US');

    var amount = val;
    var sufix = '';
    if (amount >= 1000000) {
      amount /= 1000000;
      sufix = 'M'
    } else if (amount >= 1000) {
      amount /= 1000;
      sufix = 'K'
    }

    return `${currencyPipe.transform(amount, 'USD', 'symbol', '1.0-1')}${sufix}`
  }

  formatMoneyCards(obj: any): string {
    const currencyPipe = new CurrencyPipe('en_US');

    var amount = obj.value;
    var sufix = '';
    if (amount >= 1000000) {
      amount /= 1000000;
      sufix = 'M'
    } else if (amount >= 1000) {
      amount /= 1000;
      sufix = 'K'
    }

    return `${currencyPipe.transform(amount, 'USD', 'symbol', '1.0-1')}${sufix}`
  }
}
