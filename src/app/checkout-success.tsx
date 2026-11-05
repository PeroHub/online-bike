import { useLocalSearchParams, useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, ZoomIn } from 'react-native-reanimated';

import { StoreShell, formatPrice } from '@/components/storefront/store-shell';
import { palette, spacing } from '@/components/storefront/theme';

export default function CheckoutSuccessScreen() {
  const router = useRouter();
  const { total, itemCount } = useLocalSearchParams<{ total?: string; itemCount?: string }>();
  const parsedTotal = Number(total);
  const orderTotal = Number.isFinite(parsedTotal) ? parsedTotal : 0;
  const parsedItemCount = Number(itemCount);
  const orderItemCount = Number.isFinite(parsedItemCount) ? parsedItemCount : 0;

  return (
    <StoreShell showMobileNav={false}>
      <View style={styles.page}>
        <Animated.View entering={ZoomIn.delay(100).duration(500)} style={styles.checkBadge}>
          <SymbolView
            name={{ ios: 'checkmark', android: 'check', web: 'check' }}
            size={40}
            tintColor={palette.text}
          />
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(220).duration(550)} style={styles.message}>
          <Text style={styles.eyebrow}>ORDER CONFIRMED</Text>
          <Text style={styles.title}>Thank you for your order!</Text>
          <Text style={styles.description}>Your next great ride is one step closer.</Text>
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(360).duration(550)} style={styles.receipt}>
          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Order number</Text>
            <Text style={styles.receiptValue}>VELO-10482</Text>
          </View>
          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Items</Text>
            <Text style={styles.receiptValue}>{orderItemCount}</Text>
          </View>
          <View style={[styles.receiptRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total paid</Text>
            <Text style={styles.totalValue}>{formatPrice(orderTotal)}</Text>
          </View>
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(500).duration(550)} style={styles.actionWrap}>
          <Pressable
            onPress={() => router.replace('/')}
            accessibilityRole="button"
            style={styles.continueButton}>
            <Text style={styles.continueText}>Continue shopping</Text>
            <SymbolView
              name={{ ios: 'arrow.right', android: 'arrow_forward', web: 'arrow_forward' }}
              size={18}
              tintColor={palette.text}
            />
          </Pressable>
        </Animated.View>
      </View>
    </StoreShell>
  );
}

const styles = StyleSheet.create({
  page: {
    minHeight: 610,
    maxWidth: 560,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
  },
  checkBadge: {
    width: 100,
    height: 100,
    marginBottom: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'rgba(69, 213, 196, 0.45)',
    backgroundColor: '#207e83',
  },
  message: {
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  eyebrow: {
    marginBottom: spacing.sm,
    color: palette.success,
    fontSize: 12,
    fontWeight: '800',
  },
  title: {
    color: palette.text,
    fontSize: 29,
    lineHeight: 36,
    fontWeight: '800',
    textAlign: 'center',
  },
  description: {
    marginTop: spacing.sm,
    color: palette.muted,
    fontSize: 15,
    textAlign: 'center',
  },
  receipt: {
    width: '100%',
    marginTop: spacing.xl,
    padding: spacing.lg,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: 'rgba(32, 41, 58, 0.92)',
    gap: spacing.md,
  },
  receiptRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  receiptLabel: {
    color: palette.muted,
    fontSize: 14,
  },
  receiptValue: {
    color: palette.text,
    fontSize: 14,
    fontWeight: '600',
  },
  totalRow: {
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: palette.border,
  },
  totalLabel: {
    color: palette.text,
    fontSize: 16,
    fontWeight: '700',
  },
  totalValue: {
    color: palette.accent,
    fontSize: 20,
    fontWeight: '800',
  },
  actionWrap: {
    width: '100%',
    marginTop: spacing.lg,
  },
  continueButton: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    borderRadius: 12,
    backgroundColor: palette.blue,
    experimental_backgroundImage: 'linear-gradient(135deg, #32c5ed 0%, #3c55ec 100%)',
  },
  continueText: {
    color: palette.text,
    fontSize: 15,
    fontWeight: '700',
  },
});