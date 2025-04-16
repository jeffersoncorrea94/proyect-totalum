import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Producto } from '../../interfaces/product.interface';
import { HttpService } from '../../services/http.service';
import { FilterTableComponent } from '../../components/filter-table/filter-table.component';
import { TEMPLATES } from '../../constants/constants';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FilterTableComponent],
  providers: [HttpService],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductTableComponent implements OnInit {
  private httpService = inject(HttpService);
  columns: string[]  = ['Nombre', 'Precio', 'Categoría', 'Cantidad'];
  productos: Producto[] = [];

  ngOnInit(): void {
    this.httpService.getItems(TEMPLATES.PRODUCTS).then(response => {
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
