import { Image } from 'expo-image';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useStore } from '@/components/storefront/store-context';
import { PrimaryButton, StoreHeader, StoreShell, formatPrice } from '@/components/storefront/store-shell';
import { palette, spacing } from '@/components/storefront/theme';
import { useWideLayout } from '@/components/storefront/use-wide-layout';
import { PRODUCTS } from '@/data/products';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const wide = useWideLayout();
  const product = PRODUCTS.find((item) => item.id === id) ?? PRODUCTS[0];
  const { addItem } = useStore();
  const router = useRouter();
  const [tab, setTab] = useState<'description' | 'specifications'>('description');
  const [added, setAdded] = useState(false);

  return (
    <StoreShell showMobileNav={false}>
      <StoreHeader
        title={product.name}
        back
        action={
          <Link href="/cart" asChild>
            <Pressable style={styles.cartLink} accessibilityRole="link" accessibilityLabel="Open shopping bag">
              <SymbolView
                name={{ ios: 'cart', android: 'shopping_cart', web: 'shopping_cart' }}
                size={23}
                tintColor={palette.text}
              />
            </Pressable>
          </Link>
        }
      />
      <View style={[styles.layout, wide && styles.layoutWide]}>
        <View style={[styles.gallery, wide && styles.galleryWide]}>
          <Image source={product.image} contentFit="contain" style={styles.heroImage} />
          <View style={styles.pagination}>
            <View style={styles.dotActive} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>

        <View style={[styles.details, wide && styles.detailsWide]}>
          <View style={styles.tabs}>
            <Pressable
              onPress={() => setTab('description')}
              accessibilityRole="tab"
              accessibilityState={{ selected: tab === 'description' }}
              style={[styles.tab, tab === 'description' && styles.tabSelected]}>
              <Text style={[styles.tabText, tab === 'description' && styles.tabTextSelected]}>Description</Text>
            </Pressable>
            <Pressable
              onPress={() => setTab('specifications')}
              accessibilityRole="tab"
              accessibilityState={{ selected: tab === 'specifications' }}
              style={[styles.tab, tab === 'specifications' && styles.tabSelected]}>
              <Text style={[styles.tabText, tab === 'specifications' && styles.tabTextSelected]}>Specification</Text>
            </Pressable>
          </View>

          {tab === 'description' ? (
            <View style={styles.descriptionBlock}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.description}>{product.description}</Text>
            </View>
          ) : (
            <View style={styles.specifications}>
              {product.specifications.map((specification) => (
                <View key={specification.label} style={styles.specificationRow}>
                  <Text style={styles.specificationLabel}>{specification.label}</Text>
                  <Text style={styles.specificationValue}>{specification.value}</Text>
                </View>
              ))}
            </View>
          )}

          <View style={styles.purchaseSection}>
            <View style={[styles.purchaseBar, wide && styles.purchaseBarWide]}>
              <Text style={styles.price}>{formatPrice(product.price)}</Text>
              <PrimaryButton
                onPress={() => {
                  addItem(product.id);
                  setAdded(true);
                }}
                icon={added ? 'cart' : 'arrow'}
                style={styles.addButton}>
                {added ? 'Added to Bag' : 'Add to Cart'}
              </PrimaryButton>
            </View>
            {added && (
              <PrimaryButton
                onPress={() => router.push('/cart')}
                icon="arrow"
                style={styles.viewCartButton}>
                View Cart
              </PrimaryButton>
            )}
          </View>
        </View>
      </View>
    </StoreShell>
  );
}

const styles = StyleSheet.create({
  layout: {
    gap: spacing.lg,
  },
  layoutWide: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: spacing.xl,
  },
  gallery: {
    minHeight: 250,
    height: 280,
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 23,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: palette.backgroundDeep,
  },
  galleryWide: {
    flex: 1.1,
    height: 470,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  pagination: {
    position: 'absolute',
    bottom: 17,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 7,
  },
  dotActive: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: palette.text,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 4,
    backgroundColor: 'rgba(240, 244, 255, 0.38)',
  },
  details: {
    padding: spacing.md,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: 'rgba(32, 41, 58, 0.96)',
  },
  detailsWide: {
    flex: 0.9,
    padding: spacing.xl,
    justifyContent: 'space-between',
  },
  tabs: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  tab: {
    minHeight: 42,
    minWidth: 116,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: '#1e2737',
  },
  tabSelected: {
    backgroundColor: '#2c3d5a',
  },
  tabText: {
    color: palette.muted,
    fontSize: 14,
    fontWeight: '600',
  },
  tabTextSelected: {
    color: palette.accent,
  },
  descriptionBlock: {
    minHeight: 190,
  },
  productName: {
    marginBottom: spacing.sm,
    color: palette.text,
    fontSize: 16,
    fontWeight: '800',
  },
  description: {
    color: palette.muted,
    fontSize: 15,
    lineHeight: 23,
  },
  specifications: {
    minHeight: 190,
  },
  specificationRow: {
    minHeight: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: palette.border,
    gap: spacing.md,
  },
  specificationLabel: {
    color: palette.muted,
    fontSize: 14,
  },
  specificationValue: {
    flex: 1,
    color: palette.text,
    textAlign: 'right',
    fontSize: 14,
    fontWeight: '600',
  },
  purchaseSection: {
    marginTop: spacing.lg,
    gap: spacing.sm,
  },
  purchaseBar: {
    paddingTop: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: palette.border,
  },
  purchaseBarWide: {
    marginTop: spacing.xl,
  },
  price: {
    color: palette.accent,
    fontSize: 22,
    fontWeight: '600',
  },
  addButton: {
    minWidth: 148,
  },
  viewCartButton: {
    minWidth: 148,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: palette.accent,
    experimental_backgroundImage: 'none',
  },
  cartLink: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: palette.surface,
  },
});