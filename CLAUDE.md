# CLAUDE.md — Kopa Front

## Présentation du projet

**Kopa** est une application mobile sociale centrée sur le sport (principalement le football). Elle permet aux utilisateurs de suivre des matchs en live, voter/pronostiquer, débattre et participer à des communautés (clubs). L'interface est en français.

- **Stack** : React Native (0.81) + Expo SDK 54 + Expo Router v6 + TypeScript (strict)
- **Animations** : `react-native-reanimated` v4 (New Architecture activée)
- **Navigation** : Expo Router (file-based routing) avec `@react-navigation/bottom-tabs`
- **Styling** : `StyleSheet.create` natif — pas de bibliothèque CSS-in-JS tierce
- **Icônes** : `@expo/vector-icons` (Ionicons)

---

## Architecture & structure de fichiers

```
kopa-front/
├── app/                      # Routes (Expo Router — file-based)
│   ├── _layout.tsx           # Root Stack (ThemeProvider, StatusBar)
│   ├── index.tsx             # Écran Welcome / landing (non authentifié)
│   ├── modal.tsx             # Modal générique
│   ├── notifications.tsx     # Écran notifications
│   ├── profile.tsx           # Écran profil utilisateur
│   ├── match/
│   │   └── [id].tsx          # Détail d'un match (route dynamique)
│   └── (tabs)/               # Tab navigator principal
│       ├── _layout.tsx       # Custom tab bar animée (BlurView + Reanimated)
│       ├── index.tsx         # Accueil — feed + stories + match hype
│       ├── live.tsx          # Matchs en direct
│       ├── hype.tsx          # Matchs les plus populaires / votés
│       ├── pronos.tsx        # Pronostics
│       └── clubs.tsx         # Communautés / clubs
├── components/               # Composants réutilisables
│   ├── AnimatedCard.tsx      # Carte avec animation d'entrée (fade + slide)
│   ├── AnimatedNumber.tsx    # Nombre animé (compteur)
│   ├── KopaHeader.tsx        # Header app (logo, notifs, avatar)
│   ├── PulsingDot.tsx        # Indicateur "live" pulsant
│   ├── external-link.tsx     # Lien externe
│   ├── haptic-tab.tsx        # Tab avec retour haptique
│   ├── hello-wave.tsx        # Emoji animé (starter template, legacy)
│   ├── parallax-scroll-view.tsx  # ScrollView avec parallax header
│   ├── themed-text.tsx       # Text avec support thème light/dark
│   ├── themed-view.tsx       # View avec support thème light/dark
│   └── ui/                   # Primitives UI
│       ├── Avatar.tsx
│       ├── Badge.tsx
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Chip.tsx
│       ├── IconButton.tsx
│       ├── ProgressBar.tsx
│       ├── SearchBar.tsx
│       ├── SegmentedControl.tsx
│       ├── Separator.tsx
│       ├── collapsible.tsx
│       ├── icon-symbol.tsx       # Cross-platform SF Symbols / Material
│       └── icon-symbol.ios.tsx   # iOS-specific SF Symbols
├── constants/
│   └── theme.ts              # Design tokens (couleurs, spacing, radius, fonts, gradients)
├── contexts/
│   └── TabBarContext.tsx      # SharedValue pour visibilité tab bar (scroll hide/show)
├── hooks/
│   ├── useTheme.ts           # useThemeColors(), useThemeGradients(), useIsDark()
│   ├── useScrollTabBar.ts    # Scroll handler — hide/show tab bar
│   ├── use-color-scheme.ts   # Native color scheme
│   ├── use-color-scheme.web.ts
│   └── use-theme-color.ts    # Couleur thème par clé
├── assets/images/            # Icônes, splash, favicon
└── scripts/
    └── reset-project.js      # Script de reset Expo
```

---

## Système de thème

Le thème est défini dans `constants/theme.ts` et fournit :

- **Palette** : basée sur Tailwind (zinc + emerald), avec des couleurs sémantiques (live, warning, info, etc.)
- **Deux modes** : `darkColors` / `lightColors` (type `ThemeColors`)
- **Gradients** : `darkGradients` / `lightGradients`
- **Design tokens** : `spacing`, `radius`, `fontSize`, `Fonts`
- **Legacy** : `KopaColors` / `KopaGradients` / `Colors` — pour les écrans pas encore migrés

### Utilisation dans les composants

```tsx
import { useThemeColors, useThemeGradients, useIsDark } from "@/hooks/useTheme";

const colors = useThemeColors();    // ThemeColors
const gradients = useThemeGradients();
const isDark = useIsDark();
```

Le root layout (`app/_layout.tsx`) injecte le thème dans `@react-navigation/native` `ThemeProvider`.

---

## Conventions de code

### Imports
- Alias `@/` pointe vers la racine du projet (configuré dans `tsconfig.json`)
- Toujours utiliser `@/` pour les imports internes (ex. `@/components/...`, `@/hooks/...`)

### Styling
- Utiliser `StyleSheet.create()` en bas de fichier (variable `s` ou `styles`)
- Les couleurs viennent **toujours** du hook `useThemeColors()`, jamais en dur
- Les styles dynamiques (couleur thème) sont passés via `style={[staticStyle, { color: colors.xxx }]}`

### Composants
- Composants fonctionnels uniquement (pas de classes)
- TypeScript strict — typer les props inline ou avec des types séparés
- Animations via `react-native-reanimated` (`useSharedValue`, `useAnimatedStyle`, `withTiming`, etc.)
- Retour haptique sur iOS via `expo-haptics` pour les interactions importantes

### Navigation
- Utiliser `router.push()` / `router.replace()` d'Expo Router
- Routes dynamiques : `app/match/[id].tsx`
- Animations de transition : `slide_from_right` (par défaut), `slide_from_bottom` (profil)

### Tab Bar
- Tab bar custom animée avec BlurView (glassmorphism)
- Se cache au scroll via `useScrollTabBar()` → `TabBarContext` (SharedValue `visible`)
- Icônes : Ionicons (outline quand inactif, filled quand actif)
- Tabs : Live | Hype | Accueil (index) | Pronos | Clubs

---

## Patterns importants

### Animation d'entrée (AnimatedCard)
Les sections/cards utilisent `AnimatedCard` pour un fade-in + slide-up progressif basé sur l'index.

### Tab bar hide/show au scroll
1. `TabBarContext` fournit un `SharedValue<number>` (`visible`)
2. `useScrollTabBar()` hook utilise `useAnimatedScrollHandler` pour toggle la valeur
3. Le composant `CustomTabBar` anime sa position Y selon `visible`
4. Chaque écran tab doit utiliser `useScrollTabBar()` sur son `Animated.ScrollView`

### Écran Welcome
- Route racine `index.tsx` — écran landing avec logo animé + boutons glassmorphism
- `router.replace("/(tabs)")` pour naviguer vers l'app principale

---

## Commandes

```bash
# Démarrer le serveur de dev
npx expo start

# Lancer sur un simulateur
npx expo start --ios
npx expo start --android

# Linting
npm run lint        # ESLint avec eslint-config-expo (flat config)
```

---

## Notes

- **Pas de backend connecté** pour l'instant — toutes les données sont en dur (mock data dans les écrans)
- **New Architecture** React Native activée (`newArchEnabled: true`)
- **React Compiler** expérimental activé (`experiments.reactCompiler: true`)
- **Typed Routes** activées (`experiments.typedRoutes: true`)
- L'app cible iOS, Android et Web (output static pour le web)
- Orientation forcée en portrait
