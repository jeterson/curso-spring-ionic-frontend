import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/protuto.service';
import { API_CONFIG } from '../../config/api.config';



@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items:ProdutoDTO[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public produtoService:ProdutoService) {
  }

  ionViewDidLoad() {
  let categoria_id = this.navParams.get('categoria_id');
    this.produtoService.findByCategoria(categoria_id).subscribe(res=>{      
      this.items = res['content'];
      this.loadImageUrl();
    }, error=>{});
  }

  loadImageUrl(){
    for(let p of this.items){
      this.produtoService.getSmallImageFromBucket(p.id).subscribe(res=>{
        p.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${p.id}-small.jpg`;
      }, error=>{        
      });
    }
  }

  

}
