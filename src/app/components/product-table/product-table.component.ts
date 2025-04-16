import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../interfaces/product.interface';
import { ProductsService } from '../../services/products/products.service';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [ProductsService],
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent implements OnInit {
  private productsService = inject(ProductsService);

  productos: Producto[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;

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

  get filteredProductos() {
    const filtrados = this.productos.filter(p =>
      p.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return filtrados.slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(
      this.productos.filter(p =>
        p.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
      ).length / this.itemsPerPage
    );
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }
}
