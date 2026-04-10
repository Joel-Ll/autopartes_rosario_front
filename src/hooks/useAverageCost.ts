import type { Product } from '@/types/products/products.type';
import { useMemo } from 'react';

export const useAverageCost = (product: Product | undefined, quantity: number, unitPrice: number) => {
  return useMemo(() => {
    const currentStock = product?.stock || 0;
    const currentAvg = product?.averageCost || 0;
    
    if (!quantity || !unitPrice || quantity <= 0 || unitPrice <= 0) {
      return currentAvg;
    }
    
    const totalCurrentValue = currentStock * currentAvg;
    const totalNewValue = quantity * unitPrice;
    const totalStock = currentStock + quantity;
    
    return totalStock > 0 ? (totalCurrentValue + totalNewValue) / totalStock : 0;
  }, [product, quantity, unitPrice]);
};
