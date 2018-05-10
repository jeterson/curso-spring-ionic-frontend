import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/protuto.service';
import { API_CONFIG } from '../../config/api.config';
import { StorageService } from '../../services/storage.service';
import { CartService } from '../../services/domain/cart.service';

/**
 * Generated class for the ProdutoDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})
export class ProdutoDetailPage {

  item:ProdutoDTO;
  constructor(public navCtrl: NavController, public navParams: NavParams, public produtoService:ProdutoService, public cartService:CartService) {
  }

  ionViewDidLoad() {
    let id = this.navParams.get('produto_id');
    this.produtoService.findById(id).subscribe(res=>{
      this.item = res;
      this.showImage();
    }, error=>{

    });
  }

  showImage(){
    this.produtoService.getImageFromBucket(this.item.id).subscribe(res=>{
      this.item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${this.item.id}.jpg`;
    }, error=>{

    });
  }

  addToCartItem(produto:ProdutoDTO){
    this.cartService.addProduto(produto);
    this.navCtrl.setRoot('CartPage');
  }

}
