import { Link } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import type { ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { palette, spacing } from './theme';
import { useWideLayout } from './use-wide-layout';

const symbols = {
  search: { ios: 'magnifyingglass', android: 'search', web: 'search' },
  back: { ios: 'arrow.left', android: 'arrow_back', web: 'arrow_back' },
  bike: { ios: 'bicycle', android: 'directions_bike', web: 'directions_bike' },
  cart: { ios: 'cart', android: 'shopping_cart', web: 'shopping_cart' },
  heart: { ios: 'heart', android: 'favorite_border', web: 'favorite_border' },
  heartFill: { ios: 'heart.fill', android: 'favorite', web: 'favorite' },
  add: { ios: 'plus', android: 'add', web: 'add' },
  remove: { ios: 'minus', android: 'remove', web: 'remove' },
  arrow: { ios: 'arrow.right', android: 'arrow_forward', web: 'arrow_forward' },
} as const;

export type StoreSymbol = keyof typeof symbols;

export function StoreShell({
  children,
  showMobileNav = true,
}: {
  children: ReactNode;
  showMobileNav?: boolean;
}) {
  const insets = useSafeAreaInsets();
  const wide = useWideLayout();

  return (
    <View style={styles.root}>
      <View pointerEvents="none" style={styles.blueField} />
      {wide && <DesktopNavigation />}
      <ScrollView
        contentContainerStyle={[styles.scrollContent, wide && styles.wideScrollContent]}
        keyboardShouldPersistTaps="handled">
        <View style={[styles.page, wide && styles.widePage]}>{children}</View>
      </ScrollView>
      {!wide && showMobileNav && <MobileNavigation bottomInset={insets.bottom} />}
    </View>
  );
}

function DesktopNavigation() {
  return (
    <View style={styles.desktopNav}>
      <Link href="/" asChild>
        <Pressable style={styles.brand} accessibilityRole="link">
          <View style={styles.brandMark}>
            <SymbolView name={symbols.bike} size={22} tintColor={palette.text} />
          </View>
          <Text style={styles.brandName}>VELO</Text>
        </Pressable>
      </Link>
      <View style={styles.desktopLinks}>
        <Link href="/" asChild>
          <Pressable style={styles.desktopLink} accessibilityRole="link">
            <Text style={styles.desktopLinkText}>Discover</Text>
          </Pressable>
        </Link>
        <Link href="/cart" asChild>
          <Pressable style={styles.desktopLink} accessibilityRole="link">
            <SymbolView name={symbols.cart} size={19} tintColor={palette.muted} />
            <Text style={styles.desktopLinkText}>Shopping Bag</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

function MobileNavigation({ bottomInset }: { bottomInset: number }) {
  return (
    <View style={[styles.mobileNav, { bottom: Math.max(bottomInset, spacing.sm) }]}>
      <Link href="/" asChild>
        <Pressable style={styles.mobileNavItem} accessibilityRole="link" accessibilityLabel="Discover">
          <SymbolView name={symbols.bike} size={23} tintColor={palette.text} />
          <Text style={styles.mobileNavLabel}>Discover</Text>
        </Pressable>
      </Link>
      <Link href="/cart" asChild>
        <Pressable style={styles.mobileNavItem} accessibilityRole="link" accessibilityLabel="Shopping bag">
          <SymbolView name={symbols.cart} size={23} tintColor={palette.muted} />
          <Text style={styles.mobileNavLabel}>Bag</Text>
        </Pressable>
      </Link>
    </View>
  );
}

export function StoreHeader({
  title,
  back = false,
  action,
}: {
  title: string;
  back?: boolean;
  action?: ReactNode;
}) {
  return (
    <View style={styles.header}>
      {back ? (
        <Link href="/" asChild>
          <Pressable style={styles.headerBack} accessibilityRole="link" accessibilityLabel="Back to discover">
            <SymbolView name={symbols.back} size={21} tintColor={palette.text} />
          </Pressable>
        </Link>
      ) : null}
      <Text numberOfLines={1} style={styles.headerTitle}>{title}</Text>
      {action ?? <View style={styles.headerSpacer} />}
    </View>
  );
}

export function IconButton({
  name,
  label,
  onPress,
  active = false,
}: {
  name: StoreSymbol;
  label: string;
  onPress: () => void;
  active?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={[styles.iconButton, active && styles.iconButtonActive]}>
      <SymbolView
        name={active && name === 'heart' ? symbols.heartFill : symbols[name]}
        size={23}
        tintColor={active ? palette.accent : palette.text}
      />
    </Pressable>
  );
}

export function PrimaryButton({
  children,
  onPress,
  icon,
  style,
}: {
  children: ReactNode;
  onPress: () => void;
  icon?: StoreSymbol;
  style?: object;
}) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" style={[styles.primaryButton, style]}>
      <Text style={styles.primaryButtonText}>{children}</Text>
      {icon && <SymbolView name={symbols[icon]} size={18} tintColor={palette.text} />}
    </Pressable>
  );
}

export function formatPrice(price: number) {
  return `₦${price.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: palette.background,
    experimental_backgroundImage:
      'radial-gradient(ellipse at 85% 32%, rgba(58, 114, 255, 0.28), transparent 43%)',
  },
  blueField: {
    position: 'absolute',
    top: '18%',
    right: '-43%',
    width: '95%',
    height: '118%',
    borderRadius: 80,
    opacity: 0.66,
    backgroundColor: '#2367db',
    transform: [{ rotateZ: '-20deg' }],
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: 112,
  },
  wideScrollContent: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
  },
  page: {
    width: '100%',
    maxWidth: 1180,
    alignSelf: 'center',
  },
  widePage: {
    paddingBottom: spacing.lg,
  },
  desktopNav: {
    width: '100%',
    maxWidth: 1180,
    alignSelf: 'center',
    minHeight: 76,
    paddingHorizontal: spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: palette.border,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  brandMark: {
    width: 40,
    height: 40,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.blue,
  },
  brandName: {
    color: palette.text,
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 1,
  },
  desktopLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xl,
  },
  desktopLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.sm,
  },
  desktopLinkText: {
    color: palette.muted,
    fontSize: 14,
    fontWeight: '600',
  },
  mobileNav: {
    position: 'absolute',
    left: spacing.md,
    right: spacing.md,
    height: 70,
    borderRadius: 22,
    backgroundColor: 'rgba(24, 31, 45, 0.96)',
    borderWidth: 1,
    borderColor: palette.border,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    zIndex: 5,
  },
  mobileNavItem: {
    minWidth: 92,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  mobileNavLabel: {
    color: palette.muted,
    fontSize: 13,
    fontWeight: '600',
  },
  header: {
    minHeight: 60,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  headerTitle: {
    flex: 1,
    color: palette.text,
    fontSize: 23,
    fontWeight: '800',
  },
  headerBack: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.blue,
  },
  headerSpacer: {
    width: 46,
    height: 46,
  },
  iconButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: palette.surface,
  },
  iconButtonActive: {
    backgroundColor: '#263d75',
  },
  primaryButton: {
    minHeight: 48,
    borderRadius: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: palette.blue,
    experimental_backgroundImage: 'linear-gradient(135deg, #32c5ed 0%, #3c55ec 100%)',
  },
  primaryButtonText: {
    color: palette.text,
    fontSize: 15,
    fontWeight: '700',
  },
});