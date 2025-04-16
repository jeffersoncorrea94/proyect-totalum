import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { FilterTableComponent } from '../../components/filter-table/filter-table.component';
import { TEMPLATES } from '../../constants/constants';

@Component({
  selector: 'app-customers',
  imports: [CommonModule, FilterTableComponent],
  providers: [HttpService],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit {
  private httpService = inject(HttpService);
  columns: string[] = ['Nombre', 'Fecha de Nacimiento', 'Correo', 'Telefono'];
  clientes: any[] = [];

  ngOnInit(): void {
    this.httpService.getItems(TEMPLATES.CUSTOMERS).then(response => {
      this.clientes = response.data.map((p: any) => ({
        nombre: p.nombre,
        fecha_nacimiento: p.fecha_nacimiento,
        email: p.email,
        telefono: p.telefono
      }));
    }).catch(error => {
      console.error('Error al cargar productos desde Totalum:', error);
    });
  }
}
