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
  columns: string[] = ['Numero Pedido', 'Importe', 'Importe Impuesto', 'cantidad', 'fecha', 'nombre_cliente'];
  pedidos: any[] = [];

  ngOnInit(): void {
    this.httpService.getItems(TEMPLATES.ORDERS).then(response => {
      this.pedidos = response.data.map((p: any) => ({
        nombre: p.numero_de_pedido,
        importe: p.importe,
        importe_impuesto: p.importe_impuestos,
        cantidad: p.cantidad_de_productos,
        fecha_pedido: p.fecha_de_pedido,
        nombre_cliente: p.nombre_cliente,
      }));
    }).catch(error => {
      console.error('Error al cargar productos desde Totalum:', error);
    });
  }
}
