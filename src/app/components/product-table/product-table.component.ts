import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../interfaces/product.interface';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})

export class ProductTableComponent {
  productos: Producto[] = [
    { nombre: 'Manzana', precio: 0.50, categoria: 'Frutas', cantidad: 5 },
    { nombre: 'Pera', precio: 0.60, categoria: 'Frutas', cantidad: 10 },
    { nombre: 'Pan', precio: 1.20, categoria: 'Panadería', cantidad: 20 },
    { nombre: 'Leche', precio: 1.00, categoria: 'Lácteos', cantidad: 15 },
    { nombre: 'Queso', precio: 2.50, categoria: 'Lácteos', cantidad: 8 },
    { nombre: 'Yogur', precio: 1.10, categoria: 'Lácteos', cantidad: 12 },
    { nombre: 'Banano', precio: 0.30, categoria: 'Frutas', cantidad: 18 },
  ];

  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;

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
