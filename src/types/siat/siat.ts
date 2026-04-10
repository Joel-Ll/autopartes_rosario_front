
import {z} from 'zod';

export const catalogoSiatSchema = z.object({
  _id: z.string(),
  name: z.string(),
  type: z.string(),
  description: z.string(),
  state: z.enum(["sincronizado", "desactualizado", "no_sincronizado", "sincronizando"]),
  lastSyncAt: z.string().nullable(),
  totalRegisters: z.number(),
});
export type CatalogoSiat = z.infer<typeof catalogoSiatSchema>;
export const catalogosSiatSchema = z.array(catalogoSiatSchema);


// Productos Servicios
const productService = z.object({
  codigoActividad: z.string(),
  codigoProducto: z.number(),
  descripcionProducto: z.string(),
  _id: z.string(),
});
export type ProductService = z.infer<typeof productService>;
export const productsServicesSchema = z.object({
  _id: z.string(),
  registers: z.array(productService)
});

// Unidad Medida
const unidadMedida = z.object({
  codigoClasificador: z.number(),
  descripcion: z.string(),
  _id: z.string()
})
export type UnidadMedida = z.infer<typeof unidadMedida>
export const unidadesMedidaSchema = z.array(unidadMedida)