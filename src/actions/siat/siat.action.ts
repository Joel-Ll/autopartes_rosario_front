import { isAxiosError } from 'axios';
import api from '@/lib/axios';
import { catalogosSiatSchema, productsServicesSchema, unidadesMedidaSchema } from '@/types/siat/siat';

export const getCatalogosSiatAction = async () => {
  try {
    const url = '/siat/catalogos';
    const { data } = await api.get(url);
    const response = catalogosSiatSchema.safeParse(data);
    if(response.success) {
      return response.data;   
    }
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message);
  }
}

export const verificarComunicacionAction = async () => {
  try {
    const url = '/siat/verificar-comunicacion';
    const { data } = await api.get<string>(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message);
  }
}

export const sincronizarCatalogos = async (method: string) => {
  try {
    const url = `/siat-sync/${method}`;
    const { data } = await api.post(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message);
  }
}

export const getProductsServicesSiatAction = async () => {
  try {
    const url = '/siat-list/productos-servicios';
    const { data } = await api.get(url);
    const response = productsServicesSchema.safeParse(data);
    if(response.success) {
      return response.data;   
    }
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message);
  }
}

export const getUnidadMedidaSiatAction = async () => {
  try {
    const url = '/siat-list/unidad-medida';
    const { data } = await api.get(url);
    const response = unidadesMedidaSchema.safeParse(data);
    if(response.success) {
      return response.data;   
    }
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message);
  }
}