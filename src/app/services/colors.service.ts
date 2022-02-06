import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { ColorData, MockColorsResponse } from '../models/colors';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {

  constructor(private http: HttpClient) { }

  getColors(): Observable<ColorData>{
    return this.http.get<ColorData>('/api/colors');
  }

  public getColorsFromFile(url:string):Observable<MockColorsResponse>{
    return this.http.get(url).pipe(map(data => this.transformMockData(data)))
  }

  private transformMockData(data:any){
    let listOfColorEntries = [];
    for(let i = 0; i < 20; i++){
        listOfColorEntries.push(this.getRandomColor(data));
    }

    listOfColorEntries = listOfColorEntries.filter(this.onlyUnique);
    listOfColorEntries.length = 6;

    return new MockColorsResponse(listOfColorEntries);
  }


  private getRandomColor = (data: any) =>{
    const keys = Object.keys(data)
    const hex = keys[Math.floor(Math.random() * keys.length)]
    return [hex, data[hex]];
  };

  onlyUnique = (value:any, index:any, self:any) =>{
    return self.indexOf(value) === index;
  }
}
