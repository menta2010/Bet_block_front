import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import { Asset } from 'expo-asset';

// mantém a splash nativa até liberarmos
SplashScreen.preventAutoHideAsync().catch(() => {});

export function useAppBootstrap() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // pré-carrega a logo
        await Asset.fromModule(require('@/assets/branding/focai-logo.png')).downloadAsync();
        // se tiver fontes, pre-carregue aqui também
      } finally {
        setReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (ready) {
      // esconde a splash nativa quando nossa UI estiver montada
      await SplashScreen.hideAsync();
    }
  }, [ready]);

  return { ready, onLayoutRootView };
}
