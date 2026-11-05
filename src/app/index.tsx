import { Image } from 'expo-image';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { ProductCard } from '@/components/storefront/product-card';
import { IconButton, StoreHeader, StoreShell } from '@/components/storefront/store-shell';
import { palette, spacing } from '@/components/storefront/theme';
import { useWideLayout } from '@/components/storefront/use-wide-layout';
import { PRODUCTS } from '@/data/products';

const categories = ['All', 'Road Bike', 'Mountain', 'Accessories'];

export default function DiscoverScreen() {
  const wide = useWideLayout();
  const [category, setCategory] = useState('All');
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);

  const visibleProducts = PRODUCTS.filter((product) => {
    const matchesCategory = category === 'All' || product.category === category;
    const matchesSearch = `${product.name} ${product.category}`.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFavorite = (id: string) => {
    setFavorites((current) => current.includes(id)
      ? current.filter((favorite) => favorite !== id)
      : [...current, id]);
  };

  return (
    <StoreShell>
      <StoreHeader
        title="Choose Your Bike"
        action={
          <IconButton
            name="search"
            label={searchOpen ? 'Close search' : 'Search products'}
            active={searchOpen}
            onPress={() => setSearchOpen((open) => !open)}
          />
        }
      />
      {searchOpen && (
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search bikes and gear"
          placeholderTextColor={palette.muted}
          autoFocus
          style={styles.searchInput}
          accessibilityLabel="Search bikes and gear"
        />
      )}

      <View style={[styles.promo, wide && styles.promoWide]}>
        <Image source={PRODUCTS[0].image} contentFit="contain" style={[styles.promoImage, wide && styles.promoImageWide]} />
        <View style={styles.promoCopy}>
          <Text style={styles.promoTitle}>30% Off</Text>
        </View>
      </View>

      <View style={styles.sectionHeading}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <Text style={styles.sectionMeta}>Built for every ride</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryList}>
        {categories.map((item) => {
          const selected = category === item;
          return (
            <Pressable
              key={item}
              onPress={() => setCategory(item)}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              style={[styles.categoryButton, selected && styles.categoryButtonSelected]}>
              <Text style={[styles.categoryText, selected && styles.categoryTextSelected]}>{item}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={[styles.sectionHeading, styles.productsHeading]}>
        <Text style={styles.sectionTitle}>Popular picks</Text>
        <Text style={styles.sectionMeta}>{visibleProducts.length} items</Text>
      </View>
      {visibleProducts.length ? (
        <View style={styles.productGrid}>
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              favorite={favorites.includes(product.id)}
              onFavorite={() => toggleFavorite(product.id)}
              wide={wide}
            />
          ))}
        </View>
      ) : (
        <Text style={styles.emptySearch}>No rides match that search.</Text>
      )}
    </StoreShell>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    height: 48,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: 'rgba(25, 33, 48, 0.94)',
    color: palette.text,
    fontSize: 15,
  },
  promo: {
    minHeight: 228,
    position: 'relative',
    overflow: 'hidden',
    marginBottom: spacing.xl,
    padding: spacing.lg,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(191, 212, 247, 0.24)',
    backgroundColor: '#283448',
  },
  promoWide: {
    minHeight: 250,
    padding: spacing.xl,
    marginBottom: spacing.xxl,
  },
  promoImage: {
    position: 'absolute',
    top: 4,
    right: -14,
    width: '78%',
    height: 155,
  },
  promoImageWide: {
    top: -3,
    right: 12,
    width: '58%',
    height: 220,
  },
  promoCopy: {
    marginTop: 'auto',
    alignItems: 'flex-start',
    zIndex: 1,
  },
  promoTitle: {
    color: palette.text,
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '900',
  },
  sectionHeading: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    color: palette.text,
    fontSize: 20,
    fontWeight: '800',
  },
  sectionMeta: {
    color: palette.muted,
    fontSize: 13,
  },
  categoryList: {
    gap: spacing.sm,
    paddingBottom: spacing.lg,
  },
  categoryButton: {
    minHeight: 42,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 13,
    backgroundColor: 'rgba(44, 56, 76, 0.9)',
    borderWidth: 1,
    borderColor: palette.border,
  },
  categoryButtonSelected: {
    backgroundColor: palette.blue,
  },
  categoryText: {
    color: palette.muted,
    fontSize: 14,
    fontWeight: '600',
  },
  categoryTextSelected: {
    color: palette.text,
  },
  productsHeading: {
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: spacing.sm,
  },
  emptySearch: {
    paddingVertical: spacing.xl,
    color: palette.muted,
    textAlign: 'center',
    fontSize: 15,
  },
});