import { orderModel } from '../order-model/order-model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SharedService } from '../service/shared.service';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  formValue ! : FormGroup;
  showAdd ! :boolean;
  showUpdate !:boolean;
 
  orderModelObj : orderModel = new orderModel();
 
  orderAll:any;
 
   constructor(private FormBuilder:FormBuilder, private api:SharedService) { }
 
   ngOnInit() {

    this.getAllOrders();
    
   this.formValue=this.FormBuilder.group({
    orderNo: [''],
    orderDueDate: [''],
    CustomerBuyerName:[''],
    CustomerAddress:[''],
    CustomerPhone:['']
   })
   
   }

   addOrder(){
     this.formValue.reset();
     this.showAdd = true;
     this.showUpdate = false;
   }

   postOrderDetails(){
     
    this.orderModelObj.orderNo=this.formValue.value.orderNo;
    this.orderModelObj.orderDueDate=this.formValue.value.orderDueDate;
    this.orderModelObj.CustomerBuyerName=this.formValue.value.CustomerBuyerName;
    this.orderModelObj.CustomerAddress=this.formValue.value.CustomerAddress;
    this.orderModelObj.CustomerPhone=this.formValue.value.CustomerPhone;
  
  
    this.api.postOrder(this.orderModelObj).subscribe((res=>{
    console.log(res);
    alert("Order record added successfully!!");
    this.formValue.reset()
    }),
    err=>{
      alert("Something went wrong")
      })
    this.ngOnInit();

    }
    
      getAllOrders(){
        this.api.getOrder(this.orderModelObj).subscribe(res=>{
          this.orderAll = res
      })
    
    }
   editOrder(data:any){
     this.showAdd = false;
     this.showUpdate = true;

     this.orderModelObj.id = data.id;

     this.formValue.controls['orderNo'].setValue(data.orderNo),
     this.formValue.controls['orderDueDate'].setValue(data.orderDueDate),
     this.formValue.controls['CustomerBuyerName'].setValue(data.CustomerBuyerName),
     this.formValue.controls['CustomerAddress'].setValue(data.CustomerAddress),
     this.formValue.controls['CustomerPhone'].setValue(data.CustomerPhone)
    
  
   }

   updateOrderDetails(){
    this.orderModelObj.orderNo=this.formValue.value.orderNo;
    this.orderModelObj.orderDueDate=this.formValue.value.orderDueDate;
    this.orderModelObj.CustomerBuyerName=this.formValue.value.CustomerBuyerName;
    this.orderModelObj.CustomerAddress=this.formValue.value.CustomerAddress;
    this.orderModelObj.CustomerPhone=this.formValue.value.CustomerPhone;
    
     this.api.updateOrder(this.orderModelObj,this.orderModelObj.id).subscribe(res=>{
       alert("Record Updated")
       this.formValue.reset();
       this.getAllOrders();
     })
 
   }
   deleteOrder(data:any){
   
     this.api.deleteOrder (data.id).subscribe(res=>{
      alert("Are you want to delete data? ");
       this.orderAll = res
     })
     this.ngOnInit();
     this.getAllOrders()
     
     }
 }


