import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http'; 
import{map}from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http:HttpClient) { }

postOrder(data:any){
 return this.http.post<any>('http://localhost:3000/orders',data).pipe(map((res:any)=>{
return res;

 }))

}
getOrder(data:any){
  return this.http.get<any>('http://localhost:3000/orders');
 
 }
 updateOrder(data:any,id:number){
  return this.http.put<any>('http://localhost:3000/orders/'+id,data).pipe(map(
    (res:any)=>{
 return res;
 
  }))
 
 } 
 deleteOrder(id:number){
  return this.http.delete<any>('http://localhost:3000/orders/'+id).pipe(map((res:any)=>{
 return res;
 
  }))
 
 }

}
