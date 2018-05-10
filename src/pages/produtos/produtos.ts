import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/protuto.service';
import { API_CONFIG } from '../../config/api.config';



@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items: ProdutoDTO[] = [];
  page:number = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams, public produtoService: ProdutoService, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadImageUrl(start:number, end:number) {
    for (let i=start;i<=end; i++) {
      let p = this.items[i];
      this.produtoService.getSmallImageFromBucket(p.id).subscribe(res => {
        p.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${p.id}-small.jpg`;
      }, error => {
      });
    }
  }

  loadData(){
    let categoria_id = this.navParams.get('categoria_id');
    let loader = this.presentLoading();
    this.produtoService.findByCategoria(categoria_id, this.page, 10).subscribe(res => {
      let start = this.items.length;      
      this.items = this.items.concat(res['content']);
      let end = this.items.length -1;
      loader.dismiss();
      this.loadImageUrl(start, end);
    }, error => {
      loader.dismiss();
    });
  }

  showDetail(id: string) {
    this.navCtrl.push('ProdutoDetailPage', { produto_id: id });
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }

  doRefresh(refresher) {
    this.page = 0;
    this.items = [];    
    this.loadData();
    setTimeout(() => {    
      refresher.complete();
    }, 1000);
  }

  doInfinite(infiniteScroll) {    
    this.page++;
    this.loadData();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  }

}
