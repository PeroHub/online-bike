import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { CartItem } from '@/components/storefront/cart-item';
import { useStore } from '@/components/storefront/store-context';
import { PrimaryButton, StoreHeader, StoreShell, formatPrice } from '@/components/storefront/store-shell';
import { palette, spacing } from '@/components/storefront/theme';
import { useWideLayout } from '@/components/storefront/use-wide-layout';
import { PRODUCTS } from '@/data/products';

export default function ShoppingBagScreen() {
  const wide = useWideLayout();
  const router = useRouter();
  const {
    quantities,
    promoCode,
    subtotal,
    discount,
    total,
    setPromoCode,
    applyPromo,
    updateQuantity,
    clearCart,
  } = useStore();
  const [promoMessage, setPromoMessage] = useState('');
  const items = PRODUCTS.filter((product) => (quantities[product.id] ?? 0) > 0);
  const itemCount = Object.values(quantities).reduce((sum, quantity) => sum + quantity, 0);

  const completeCheckout = () => {
    const params = { total: total.toFixed(2), itemCount: String(itemCount) };
    clearCart();
    router.replace({ pathname: '/checkout-success', params });
  };

  return (
    <StoreShell showMobileNav={false}>
      <StoreHeader title="My Shopping Bag" back />
      {items.length ? (
        <View style={[styles.layout, wide && styles.layoutWide]}>
          <View style={styles.items}>
            {items.map((product) => (
              <CartItem
                key={product.id}
                product={product}
                quantity={quantities[product.id]}
                onQuantityChange={(quantity) => updateQuantity(product.id, quantity)}
              />
            ))}
          </View>
          <View style={[styles.summary, wide && styles.summaryWide]}>
            <Text style={styles.shipping}>Your cart qualifies for free shipping</Text>
            <View style={styles.promoRow}>
              <TextInput
                value={promoCode}
                onChangeText={setPromoCode}
                placeholder="Promo code"
                placeholderTextColor={palette.muted}
                autoCapitalize="characters"
                style={styles.promoInput}
                accessibilityLabel="Promo code"
              />
              <PrimaryButton
                onPress={() => setPromoMessage(applyPromo() ? '30% discount applied' : 'Code not recognized')}
                style={styles.applyButton}>
                Apply
              </PrimaryButton>
            </View>
            {!!promoMessage && (
              <Text style={[styles.promoMessage, promoMessage.startsWith('30%') && styles.successMessage]}>
                {promoMessage}
              </Text>
            )}
            <View style={styles.priceRows}>
              <PriceRow label="Subtotal" value={formatPrice(subtotal)} />
              <PriceRow label="Delivery Fee" value={formatPrice(0)} />
              <PriceRow label="Discount" value={discount ? `${Math.round((discount / subtotal) * 100)}%` : '0%'} />
              <View style={[styles.priceRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>{formatPrice(total)}</Text>
              </View>
            </View>
            <PrimaryButton
              onPress={completeCheckout}
              icon="arrow"
              style={styles.checkoutButton}>
              Checkout
            </PrimaryButton>
          </View>
        </View>
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Your bag is empty</Text>
          <Text style={styles.emptyDescription}>A great ride is waiting for you.</Text>
          <PrimaryButton onPress={() => router.navigate('/')} style={styles.continueButton}>
            Browse bikes
          </PrimaryButton>
        </View>
      )}
    </StoreShell>
  );
}

function PriceRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.priceRow}>
      <Text style={styles.priceLabel}>{label}</Text>
      <Text style={styles.priceValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    gap: spacing.lg,
  },
  layoutWide: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.xl,
  },
  items: {
    flex: 1,
  },
  summary: {
    paddingTop: spacing.md,
  },
  summaryWide: {
    width: 360,
    padding: spacing.lg,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: 'rgba(32, 41, 58, 0.95)',
  },
  shipping: {
    marginBottom: spacing.md,
    color: palette.muted,
    textAlign: 'center',
    fontSize: 14,
  },
  promoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  promoInput: {
    flex: 1,
    height: 46,
    paddingHorizontal: spacing.md,
    borderRadius: 12,
    color: palette.text,
    backgroundColor: 'rgba(22, 29, 42, 0.92)',
    fontSize: 14,
  },
  applyButton: {
    minWidth: 94,
    minHeight: 46,
  },
  promoMessage: {
    marginTop: spacing.xs,
    color: '#f5a5a5',
    fontSize: 13,
  },
  successMessage: {
    color: palette.success,
  },
  priceRows: {
    gap: spacing.md,
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLabel: {
    color: '#e2e6ef',
    fontSize: 15,
  },
  priceValue: {
    color: palette.muted,
    fontSize: 15,
  },
  totalRow: {
    paddingTop: spacing.sm,
  },
  totalLabel: {
    color: palette.text,
    fontSize: 16,
    fontWeight: '700',
  },
  totalValue: {
    color: palette.accent,
    fontSize: 19,
    fontWeight: '800',
  },
  checkoutButton: {
    minHeight: 50,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
    gap: spacing.md,
  },
  emptyTitle: {
    color: palette.text,
    fontSize: 22,
    fontWeight: '800',
  },
  emptyDescription: {
    color: palette.muted,
    fontSize: 15,
  },
  continueButton: {
    marginTop: spacing.sm,
  },
});