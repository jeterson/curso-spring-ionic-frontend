import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartItem } from '../../models/cart-item';
import { ProdutoService } from '../../services/domain/protuto.service';
import { API_CONFIG } from '../../config/api.config';
import { CartService } from '../../services/domain/cart.service';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  items:CartItem[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public cartService:CartService, public produtoService:ProdutoService) {
  }

  ionViewDidLoad() {
    let cart = this.cartService.getCart();
    this.items = cart.itens;
    this.loadImageUrl();
  }


  loadImageUrl(){
    for(let p of this.items){
      this.produtoService.getSmallImageFromBucket(p.produto.id).subscribe(res=>{
        p.produto.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${p.produto.id}-small.jpg`;
      }, error=>{        
      });
    }
  }

}
