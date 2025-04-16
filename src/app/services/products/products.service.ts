import { Injectable } from '@angular/core';
import { TotalumApiSdk } from 'totalum-api-sdk';
import { API_KEYS } from '../../constants/api-keys.constants';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private sdk: any;

  constructor() {
    const options = {
      apiKey: {
        'api-key': API_KEYS.KEY_PRODUCTS
      }
    };

    this.sdk = new TotalumApiSdk(options);
  }

  async getItems(): Promise<any> {
    try {
      const response = await this.sdk.crud.getItems('template__producto', {
        sort: { createdAt: 1 },
        pagination: { page: 0, limit: 50 }
      });
      return response.data;
    } catch (error: any) {
      console.error('Error al obtener los items:', error?.toString());
      console.error('Detalles:', error?.response?.data);
      throw error;
    }
  }
}
