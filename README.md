# reactnativestarter – React Native App

> A modern, fully-typed React Native (CLI) application for the Ed Trust organisation. It implements a feature-based architecture, NativeWind styling, React Navigation, React Query, and many other best-in-class libraries.

---

## 📦 Project Structure

```
├── App.tsx                # Root entry – registers providers & navigation
├── src/
│   ├── assets/            # Images, fonts, lottie, etc.
│   ├── modules/           # ✨ Feature folders (Auth, Dashboard, Document …)
│   │   └── <Feature>/
│   │       ├── components/    # UI parts scoped to feature
│   │       ├── constants/     # Feature-specific constants
│   │       ├── context/       # React Context providers
│   │       ├── hooks/         # Custom hooks (feature only)
│   │       ├── locales/       # i18n namespaces (JSON)
│   │       ├── navigation.tsx # Stack/Tab config for feature
│   │       ├── repositories/  # API / persistence layer (Repository pattern)
│   │       ├── schemas/       # Zod validation schemas
│   │       ├── screens/       # React Navigation screens
│   │       └── types/         # TS models for the feature
│   ├── shared/            # Cross-cutting, reusable code
│   │   ├── components/    # Design-system & generic components
│   │   ├── config/        # axios, toast & other singletons
│   │   ├── constants/     # Global constants & enums
│   │   ├── lib/           # Utilities (icons, helpers, …)
│   │   ├── locales/       # Common i18n strings
│   │   ├── queries/       # React-Query hooks / keys
│   │   └── types/         # Global TS declarations
│   └── plugin/            # NativeWind / Tailwind plugin support
└── android/ | ios/        # Native projects
```

### Architectural Patterns
- **Feature-based & Clean Architecture** – each module contains its own UI, state & data layer.
- **Repository Pattern** – abstracts API/network logic away from UI and hooks.
- **Design-System Layer** – shared components exported from `shared/components` ensure visual and behavioural consistency.

---

## 🧑‍💻 Coding Conventions

| Topic | Convention |
|-------|------------|
| File/folder names | `kebab-case` (`tax-status-card.tsx`)
| Components       | `PascalCase` (`TaxStatusCard`)
| Functions & vars | `camelCase` (`getUser`, `isLoading`)
| Types/Interfaces | `PascalCase`, often prefixed with domain (`AuthResponse`)
| Component style  | Functional components + React Hooks; no class components
| Props typing     | Explicit interfaces; `React.FC` only when children typing needed
| Styling          | **NativeWind/Tailwind** class strings + `cn()` util for conditional merge
| Barrel exports   | `index.ts` re-exports inside most folders for short imports
| Folder order in feature | constants → context → hooks → components → screens (top-down dependency rule)

### Reusable Utilities
- `src/shared/lib/utils.ts` → `cn`, `formatErrorApi`, `isTextChildren` helpers.
- Hooks start with **use*** and live next to their feature or in `shared/hooks`.

---

## 🔐 Rules & Best Practices

| Concern | Guideline |
|---------|-----------|
| State management | Context Providers per feature (e.g. `AuthProvider`) + **@tanstack/react-query** for server state caching.
| API requests     | Centralised **Axios** singleton (`shared/config/api-client.ts`) with token injection & FormData detection.
| Navigation       | React Navigation v7. Each module exposes its own navigator, wired in `root-navigator.tsx`. Route names enumerated in `shared/constants/route-name.ts`.
| Reusability      | UI atoms/molecules live in `shared/components`; variants with **class-variance-authority**.
| Animations       | **react-native-reanimated** & layout animations.
| Testing          | Jest + React Test Renderer. Write tests for hooks, utils, and critical UI.
| Accessibility    | Provide `accessibilityLabel` and proper roles for interactive elements.
| Git/Commits      | Conventional Commits (`feat:`, `fix:`, `docs:`) & `npm run lint` pre-push.

---

## 🧰 Main Packages & Why

| Package | Reason |
|---------|--------|
| `react-native@0.79` | Core mobile runtime |
| `@react-navigation/*` | Declarative navigation (stack, tab, drawer) |
| `nativewind` / `tailwindcss` | Utility-first styling with HSL token theme (`tailwind.config.js`) |
| `react-native-reanimated` | 60 fps gesture & transition animations |
| `@tanstack/react-query` | Declarative async caching & mutations |
| `axios` | Promise-based HTTP client (wrapped) |
| `react-hook-form` + `zod` | Performant forms + schema validation |
| `@react-native-async-storage/async-storage` | Persistent storage (tokens, cache) |
| `react-native-toast-message` | Cross-platform toast notifications |
| `lucide-react-native` / `react-native-vector-icons` | Icon set |
| `@rn-primitives/*` | Headless UI primitives (accordion, dialog, menu …) |
| `jest` | Unit testing harness |

Custom wrappers:
- **`shared/config/api-client.ts`** – Axios instance with interceptors & global error handling.
- **`shared/lib/toast.ts`** – Typed toast helper for consistent UX.

---

## 🚀 Setup & Development

```bash
# 1. Install dependencies
npm install        # or yarn

# 2. (Optional) Generate NativeWind types for autocompletion
npx nativewind

# 3. Start Metro Bundler
npm start

# 4. Run the app
npm run android    # Android
a) ensure emulator or device is connected

npm run ios        # iOS
b) first-time iOS: bundle install && bundle exec pod install
```

### Environment Variables
Create a `.env` (or inject via build pipeline) mirroring the keys in `src/shared/constants/index.ts`:
```
BACKEND_API_URL=https://your.api/
MODE_ENV=development
```

### Build & Release

| Platform | Steps |
|----------|-------|
| **Android** | 1) Create/sign keystore 2) `cd android && ./gradlew assembleRelease` 3) APK/AAB in `android/app/build/outputs` |
| **iOS**     | Open `ios/reactnativestarter.xcworkspace` in Xcode, set provisioning profile, `Product ▸ Archive`, then distribute |

---

## 🎨 UI Design Highlights
- HSL colour tokens defined in `tailwind.config.js` (`primary`, `background`, `foreground` …).
- Rounded corners, soft shadows, subtle gradients for modern aesthetic.
- Card-based login screen with top/bottom gradient ornaments and AnimatedView transitions.

---

## 🤝 Contributing
1. Fork & clone repo.
2. Create a branch: `git checkout -b feat/your-feature`.
3. Follow coding conventions & add tests.
4. Run `npm run lint` and ensure no ESLint errors.
5. Create a Pull Request with clear description.

---

## 📜 License
MIT © HAMZA TBIB
