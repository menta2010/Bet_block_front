import { useEffect, useRef } from 'react';
import { Animated, Easing, Image, StyleSheet, View } from 'react-native';

type Props = { visible: boolean };

export default function Splash({ visible }: Props) {
  const opacity = useRef(new Animated.Value(1)).current;
  const scale = useRef(new Animated.Value(0.92)).current;

  useEffect(() => {
    // pulso suave enquanto visível
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, { toValue: 1, duration: 800, easing: Easing.out(Easing.quad), useNativeDriver: true }),
        Animated.timing(scale, { toValue: 0.92, duration: 800, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
      ])
    ).start();
  }, []);

  useEffect(() => {
    if (!visible) {
      // fade-out quando o app estiver pronto
      Animated.timing(opacity, { toValue: 0, duration: 260, useNativeDriver: true }).start();
    }
  }, [visible]);

  if (!visible && (opacity as any)._value === 0) return null;

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <Animated.Image
        source={require('@/assets/branding/focai-logo.png')}
        resizeMode="contain"
        style={[styles.logo, { transform: [{ scale }] }]}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#EEF9F4', // pastel
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  logo: {
    width: '58%',
    aspectRatio: 3/4, // ajuste se sua arte for mais “larga” ou mais “alta”
    maxWidth: 360,
  },
});
