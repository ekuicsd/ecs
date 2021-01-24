import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Books } from '../models/books.model';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cartList: Books[] = [];
  orderlist: Books[] = [];
  amount: number = 0;
  checkoutForm: FormGroup;

  constructor(private _apiService: ApiService,
    private _router: Router,
    private _fb: FormBuilder) { }

  ngOnInit() {
    this._apiService.curruntCartBooksList$.subscribe(res => {
      this.cartList = res;
      this.cartList.forEach(ele => {
        this.amount = this.amount + ele.price;
      });
      this.createForm();
    });
    this._apiService.curruntOrdersList$.subscribe(res => {
      this.orderlist = res;
    })
  }

  createForm() {
    this.checkoutForm = this._fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.minLength(3)]],
      city: ['', [Validators.required]],
      zip: ['', [Validators.required]],
      state: ['', [Validators.required]],
      cardName: ['', [Validators.required]],
      cardNumber: ['', [Validators.required]],
      expMonth: ['', [Validators.required]],
      expYear: ['', [Validators.required]],
      cvv: ['', [Validators.required]]
    })
  }

  placeOrder() {
    if (this.checkoutForm.valid) {
      let list = this._apiService.getOrdersList();
      this.cartList.forEach(ele => {
        list.push(ele);
      });
      this._apiService.saveCart([]);
      this._apiService.saveOrders(list);
      this._router.navigate(['/orders']);
    }
  }

}
