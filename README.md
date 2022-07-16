# Nimi Card App

Nimi Card App codebase. Exports a React component that takes an `Nimi` profile, and generates a Nimi Card. 

**Nimi Schema**

```typescript
export interface Nimi {
  displayName: string;
  displayImageUrl?: string;
  image?: NimiImage;
  description?: string;
  ensName: string;
  ensAddress: string;
  links: NimiLinkBaseDetails[];
  addresses: NimiBlockchainAddress[];
  widgets: NimiWidget[];
}
```

# Usage


Import the `CardApp` component that provides the essential wrappers for the Nimi Card to function.

```typescript
// app.tsx
import {  CardApp, Nimi } from 'nimi-card'

export function App() {
  const nimi: NimiCard = {
    displayName: 'nimi.eth',
    ensName: 'nimi.eth',
    ensAddress: '0x0.....';
    links: [],
    addresses: [],
    widgets: []
  }

  return <CardApp nimi={nimi} />;
}
```

# Development

## Setup

Clone

```bash
git clone https://github.com/nimi-app/card nimi-card
cd nimi-card
```

Install dependencies

```bash
npm i
```

## Start

To start the app:

```bash
npm run start
```
