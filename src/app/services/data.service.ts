import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBusinessUnit, ICategory, IGCAS, IProbability, IProcurementHandling, IProjectClassification, ISpendPoolHigh, ISpendPoolMedium, ISpendPoolLow, ISubRegion } from '../models/icommon';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  getBUs(): Observable<IBusinessUnit[]> {
    return this.httpClient.get<IBusinessUnit[]>('assets/data/business-unit.json')
      .pipe(map(bus => {
        let randMax = Math.floor(Math.random() * bus.length);
        let randMin = Math.floor(Math.random() * randMax);

        if (randMin === randMax) {
          randMax += 1;
        }
        return bus.slice(randMin, randMax);
      }));
  }

  getCategories(buID: string): Observable<ICategory[]> {
    return this.httpClient.get<ICategory[]>('assets/data/category.json')
      .pipe(map(cats => cats.filter(c => c.BUID === buID)));
  }

  getGCAS(): Observable<IGCAS[]> {
    return this.httpClient.get<IGCAS[]>('assets/data/gcas.json');
  }

  getProbabilities(): Observable<IProbability[]> {
    return this.httpClient.get<IProbability[]>('assets/data/probability.json');
  }

  getProcurementHandlings(): Observable<IProcurementHandling[]> {
    return this.httpClient.get<IProcurementHandling[]>('assets/data/procurement-handling.json');
  }

  getProjectClassifications(): Observable<IProjectClassification[]> {
    return this.httpClient.get<IProjectClassification[]>('assets/data/project-classification.json');
  }

  getSpendPoolsHigh(): Observable<ISpendPoolHigh[]> {
    return this.httpClient.get<ISpendPoolHigh[]>('assets/data/spend-pool-high.json');
  }

  getSpendPoolsMedium(sphID: string): Observable<ISpendPoolMedium[]> {
    return this.httpClient.get<ISpendPoolMedium[]>('assets/data/spend-pool-medium.json')
      .pipe(map(spm => spm.filter(s => s.SPHID === sphID)));
  }

  getSpendPoolsLow(spmID: string): Observable<ISpendPoolLow[]> {
    return this.httpClient.get<ISpendPoolLow[]>('assets/data/spend-pool-low.json')
      .pipe(map(spl => spl.filter(s => s.SPMID === spmID)));
  }

  getSubRegions(): Observable<ISubRegion[]> {
    return this.httpClient.get<ISubRegion[]>('assets/data/sub-region.json');
  }
}
