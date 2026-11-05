import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

import { PRODUCTS } from '@/data/products';

type StoreContextValue = {
  quantities: Record<string, number>;
  promoCode: string;
  discountRate: number;
  subtotal: number;
  discount: number;
  total: number;
  setPromoCode: (code: string) => void;
  applyPromo: () => boolean;
  addItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [promoCode, setPromoCode] = useState('');
  const [discountRate, setDiscountRate] = useState(0);

  const totals = useMemo(() => {
    const subtotal = PRODUCTS.reduce(
      (sum, product) => sum + product.price * (quantities[product.id] ?? 0),
      0,
    );
    const discount = Math.round(subtotal * discountRate * 100) / 100;
    return { subtotal, discount, total: subtotal - discount };
  }, [discountRate, quantities]);

  const applyPromo = () => {
    const isValid = promoCode.trim().toLowerCase() === 'bike30';
    setDiscountRate(isValid ? 0.3 : 0);
    return isValid;
  };

  const addItem = (id: string) => {
    setQuantities((current) => ({ ...current, [id]: (current[id] ?? 0) + 1 }));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setQuantities((current) => {
      const next = { ...current };
      if (quantity <= 0) {
        delete next[id];
      } else {
        next[id] = Math.min(quantity, 9);
      }
      return next;
    });
  };

  const clearCart = () => {
    setQuantities({});
    setPromoCode('');
    setDiscountRate(0);
  };

  return (
    <StoreContext.Provider
      value={{
        quantities,
        promoCode,
        discountRate,
        ...totals,
        setPromoCode,
        applyPromo,
        addItem,
        updateQuantity,
        clearCart,
      }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return context;
}