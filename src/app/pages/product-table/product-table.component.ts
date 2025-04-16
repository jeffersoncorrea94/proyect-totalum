import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Producto } from '../../interfaces/product.interface';
import { ProductsService } from '../../services/products/products.service';
import { FilterTableComponent } from '../../components/filter-table/filter-table.component';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [CommonModule, FilterTableComponent],
  providers: [ProductsService],
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent implements OnInit {
  private productsService = inject(ProductsService);
  columns: string[]  = ['Nombre', 'Precio', 'Categoría', 'Cantidad'];
  productos: Producto[] = [];

  ngOnInit(): void {
    this.productsService.getItems().then(response => {
      this.productos = response.data.map((p: any) => ({
        nombre: p.nombre,
        precio: p.preciounidad,
        categoria: p.categoria,
        cantidad: p.cantidad
      }));
    }).catch(error => {
      console.error('Error al cargar productos desde Totalum:', error);
    });
  }
}
