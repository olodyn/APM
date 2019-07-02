import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';
import { IProduct } from '../product/IProduct';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  list1Filter: string;
  filteredProducts: IProduct[];
  products: IProduct[];
  errorMessage: string;
  error: any;

  get listFilter(): string {
    return this.list1Filter;
  }
  set listFilter(value: string) {
    this.list1Filter = value;
    this.filteredProducts = this.listFilter
      ? this.performFilter(this.listFilter)
      : this.products;
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  constructor(private productService: ProductService) {}

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message;
  }

  performFilter(filterBy: string): IProduct[] {
    return this.products.filter(
      (product: IProduct) =>
        product.productName
          .toLowerCase()
          .indexOf(filterBy.toLocaleLowerCase()) !== -1
    );
  }

  onNotify(message: string): void {}

  ngOnInit(): void {
    this.productService
      .getProducts()
      .subscribe(
        products => {
          this.products = products;
          this.filteredProducts = this.products;
         },
        error => this.errorMessage = error
      );

  }
}

// filterBy = filterBy.toLowerCase() ;
