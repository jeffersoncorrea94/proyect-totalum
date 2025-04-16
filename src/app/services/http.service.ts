import { Injectable } from '@angular/core';
import { TotalumApiSdk } from 'totalum-api-sdk';
import { API_KEYS } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private sdk: any;

  constructor() {
    const options = {
      apiKey: {
        'api-key': API_KEYS
      }
    };

    this.sdk = new TotalumApiSdk(options);
  }

  async getItems(template: string): Promise<any> {
    try {
      const response = await this.sdk.crud.getItems(template, {
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
