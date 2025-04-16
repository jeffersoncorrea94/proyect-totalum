import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { FilterTableComponent } from '../../components/filter-table/filter-table.component';
import { TEMPLATES } from '../../constants/constants';

@Component({
  selector: 'app-orders',
  imports: [CommonModule, FilterTableComponent],
  providers: [HttpService],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
  private httpService = inject(HttpService);
  columns: string[] = ['Estado', 'Precio', 'Fecha', 'Numero Factura'];
  pedidos: any[] = [];

  ngOnInit(): void {
    this.httpService.getItems(TEMPLATES.ORDERS).then(response => {
      this.pedidos = response.data.map((p: any) => ({
        nombre: p.estado,
        precio: p.precio_total,
        categoria: p.fecha_de_pedido,
        cantidad: p.numero_de_factura
      }));
    }).catch(error => {
      console.error('Error al cargar productos desde Totalum:', error);
    });
  }
}
