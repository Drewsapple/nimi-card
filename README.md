# Nimi Card App

Nimi Card App codebase. Exports a React component that takes an `Nimi` profile, and generates a Nimi Card. 

**Nimi Schema**

```typescript
export interface Nimi {
  displayName: string;
  displayImageUrl: string;
  description: string;
  ensAddress: string;
  ensName: string;
  links: NimiLink[];
  addresses: NimiBlockchainAddress[];
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
