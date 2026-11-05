import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Product } from '@/data/products';

import { formatPrice, IconButton } from './store-shell';
import { palette, spacing } from './theme';

export function ProductCard({
  product,
  favorite,
  onFavorite,
  wide,
}: {
  product: Product;
  favorite: boolean;
  onFavorite: () => void;
  wide: boolean;
}) {
  return (
    <View style={[styles.card, wide && styles.wideCard]}>
      <Link href={{ pathname: '/product/[id]', params: { id: product.id } }} asChild>
        <Pressable accessibilityRole="link" accessibilityLabel={`View ${product.name}`}>
          <View style={styles.imageFrame}>
            <Image source={product.cardImage ?? product.image} contentFit="contain" style={styles.image} />
          </View>
          <View style={styles.productCopy}>
            <Text style={styles.category}>{product.category}</Text>
            <Text numberOfLines={1} style={styles.name}>{product.name}</Text>
            <Text style={styles.price}>{formatPrice(product.price)}</Text>
          </View>
        </Pressable>
      </Link>
      <View style={styles.favorite}>
        <IconButton
          name="heart"
          label={favorite ? `Remove ${product.name} from favorites` : `Add ${product.name} to favorites`}
          active={favorite}
          onPress={onFavorite}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    flexBasis: '47%',
    flexGrow: 1,
    maxWidth: '49%',
    minWidth: 0,
    padding: spacing.sm,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: 'rgba(42, 53, 73, 0.94)',
    experimental_backgroundImage: 'linear-gradient(145deg, #36435a 0%, #222b3b 86%)',
    overflow: 'hidden',
  },
  wideCard: {
    flexBasis: '31%',
    maxWidth: '32%',
    padding: spacing.md,
  },
  imageFrame: {
    height: 144,
    width: '100%',
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#283448',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  productCopy: {
    paddingTop: spacing.sm,
    paddingRight: 4,
    gap: 5,
  },
  category: {
    color: palette.muted,
    fontSize: 13,
    fontWeight: '500',
  },
  name: {
    color: palette.text,
    fontSize: 16,
    fontWeight: '800',
  },
  price: {
    color: palette.muted,
    fontSize: 16,
    fontWeight: '500',
  },
  favorite: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
  },
});