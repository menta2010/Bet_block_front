// @src/ui/FormScroll.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Keyboard,
  KeyboardEvent,
  Platform,
  ScrollView,
  StyleSheet,
  UIManager,
  View,
  findNodeHandle,
  TextInput,
} from "react-native";

type Props = {
  children: React.ReactNode;
  /** Altura do topo (ex.: header) para compensar no iOS */
  keyboardOffset?: number;
  /** Espaço extra abaixo do conteúdo quando teclado abre */
  extraBottom?: number;
  style?: any;
  contentContainerStyle?: any;
};

/**
 * ScrollView que:
 * 1) adiciona paddingBottom quando o teclado abre;
 * 2) tenta rolar automaticamente o campo focado para ficar visível.
 */
export default function FormScroll({
  children,
  keyboardOffset = 0,
  extraBottom = 24,
  style,
  contentContainerStyle,
}: Props) {
  const scrollRef = useRef<ScrollView>(null);
  const containerRef = useRef<View>(null);
  const [kbHeight, setKbHeight] = useState(0);

  // padding quando teclado abre
  useEffect(() => {
    const onShow = (e: KeyboardEvent) => {
      const h = e.endCoordinates?.height ?? 0;
      setKbHeight(h);
      // quando o teclado abre, tenta rolar para o input focado
      requestAnimationFrame(scrollToFocusedField);
    };
    const onHide = () => setKbHeight(0);

    const subShow =
      Platform.OS === "ios"
        ? Keyboard.addListener("keyboardWillShow", onShow)
        : Keyboard.addListener("keyboardDidShow", onShow);

    const subHide =
      Platform.OS === "ios"
        ? Keyboard.addListener("keyboardWillHide", onHide)
        : Keyboard.addListener("keyboardDidHide", onHide);

    return () => {
      subShow.remove();
      subHide.remove();
    };
  }, []);

  const paddingBottom = useMemo(() => {
    if (kbHeight === 0) return extraBottom;
    // iOS: compensa cabeçalho (keyboardOffset). Android não precisa.
    const offset = Platform.OS === "ios" ? keyboardOffset : 0;
    return kbHeight - offset + extraBottom;
  }, [kbHeight, keyboardOffset, extraBottom]);

  // Rola o ScrollView para que o campo focado fique 100% visível
  const scrollToFocusedField = () => {
    const scroll = scrollRef.current;
    const container = containerRef.current;
    if (!scroll || !container) return;

    const focused = TextInput.State.currentlyFocusedInput?.() as any;
    if (!focused) return;

    const focusedHandle = findNodeHandle(focused);
    const containerHandle = findNodeHandle(container);
    if (!focusedHandle || !containerHandle) return;

    // Mede o campo focado relativo ao container
    UIManager.measureLayout(
      focusedHandle,
      containerHandle,
      () => {},
      (x, y, w, h) => {
        // altura visível (sem teclado)
        const visibleHeight =
          // @ts-ignore - private prop ok para cálculo
          (scroll as any)?.layoutMeasurement?.height ??
          (scroll as any)?._layoutMeasurement?.height ??
          0;

        // onde o scroll está agora
        const currentY =
          // @ts-ignore
          (scroll as any)?.contentOffset?.y ??
          (scroll as any)?._scrollPos?.y ??
          0;

        // parte inferior visível considerando paddingBottom
        const bottomLimit = currentY + visibleHeight - extraBottom;

        const fieldBottom = y + h;
        const fieldTop = y;

        // Se o bottom do input estiver “por baixo” do limite visível, rola pra baixo
        if (fieldBottom > bottomLimit) {
          const target = fieldBottom - visibleHeight + extraBottom + 12; // 12 = folga
          scroll.scrollTo({ y: target, animated: true });
          return;
        }

        // Se o topo do input estiver “acima” da área visível, rola pra cima
        if (fieldTop < currentY) {
          const target = Math.max(fieldTop - 12, 0);
          scroll.scrollTo({ y: target, animated: true });
        }
      }
    );
  };

  return (
    <View ref={containerRef} style={[styles.flex, style]}>
      <ScrollView
        ref={scrollRef}
        style={styles.flex}
        contentContainerStyle={[
          styles.content,
          { paddingBottom },
          contentContainerStyle,
        ]}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode={Platform.OS === "ios" ? "interactive" : "on-drag"}
        // Isto ajuda a ScrollView a conhecer seu tamanho
        onLayout={() => {}}
      >
        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: {
    paddingHorizontal: 0,
    paddingTop: 0,
    flexGrow: 1,
  },
});
