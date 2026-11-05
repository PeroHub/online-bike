import { Image } from 'expo-image';
import { SymbolView } from 'expo-symbols';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Product } from '@/data/products';

import { formatPrice } from './store-shell';
import { palette, spacing } from './theme';

export function CartItem({
  product,
  quantity,
  onQuantityChange,
}: {
  product: Product;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}) {
  return (
    <View style={styles.row}>
      <Image source={product.cardImage ?? product.image} contentFit="contain" style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
        <Text style={styles.price}>{formatPrice(product.price)}</Text>
      </View>
      <View style={styles.stepper}>
        <QuantityButton
          label={`Decrease ${product.name} quantity`}
          symbol="remove"
          onPress={() => onQuantityChange(quantity - 1)}
        />
        <Text style={styles.quantity}>{quantity}</Text>
        <QuantityButton
          label={`Increase ${product.name} quantity`}
          symbol="add"
          onPress={() => onQuantityChange(quantity + 1)}
          active
        />
      </View>
    </View>
  );
}

function QuantityButton({
  label,
  symbol,
  onPress,
  active = false,
}: {
  label: string;
  symbol: 'add' | 'remove';
  onPress: () => void;
  active?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={[styles.quantityButton, active && styles.quantityButtonActive]}>
      <SymbolView
        name={symbol === 'add'
          ? { ios: 'plus', android: 'add', web: 'add' }
          : { ios: 'minus', android: 'remove', web: 'remove' }}
        size={16}
        tintColor={palette.text}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: 112,
    paddingVertical: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: palette.border,
  },
  image: {
    width: 84,
    height: 84,
    borderRadius: 17,
    backgroundColor: palette.surfaceRaised,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
    gap: spacing.md,
  },
  name: {
    color: palette.text,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '800',
  },
  price: {
    color: palette.accent,
    fontSize: 14,
    fontWeight: '600',
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.surfaceRaised,
  },
  quantityButtonActive: {
    backgroundColor: palette.blue,
    experimental_backgroundImage: 'linear-gradient(135deg, #32c5ed 0%, #3c55ec 100%)',
  },
  quantity: {
    minWidth: 18,
    color: palette.text,
    textAlign: 'center',
    fontSize: 14,
  },
});