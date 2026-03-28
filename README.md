# GiftDrop 🎁

> Friends secretly drop money for someone's gift — reveals automatically on the special day.

GiftDrop is a web app built on Stellar where friends can secretly pool money for someone's
birthday, farewell, or special occasion. Built with Soroban smart contracts on Stellar testnet.

## 🔗 Links
- **Live Demo**: https://giftdrop-five.vercel.app
- **Demo Video**: https://drive.google.com/file/d/1C5Jg7teBDdf74l01LYgONaiqICeRPkbM/view?usp=drive_link
- **Google Form**: https://forms.gle/BuiEPvHMVBdrYpyS8
- **Smart Contract**: `CCKWQPTEXUAV7RK3WKD2T6YS4CLC4QE2KWI2MO4NHVAN4ABFJHA3YGVJ`
- **Contract Explorer**: [View on Stellar Expert](https://stellar.expert/explorer/testnet/contract/CCKWQPTEXUAV7RK3WKD2T6YS4CLC4QE2KWI2MO4NHVAN4ABFJHA3YGVJ)

## ✨ What is GiftDrop?

GiftDrop solves a real problem — when a group of friends wants to pool money for a surprise
gift, someone always has to be trusted with the funds and manually collect from everyone.
GiftDrop eliminates this by locking funds in a Soroban smart contract that automatically
releases on the reveal date, or refunds everyone if the target isn't met.

## 🎯 Real-world Use Cases
- Birthday surprise gifts
- Farewell gifts for colleagues
- Festival group gifting
- Office celebration pools

## ✨ Features
- **Create a Gift Drop** — Set target amount, recipient wallet, deadline and reveal date
- **Secret Contributions** — Friends lock XLM silently into smart contract
- **Hidden from Recipient** — Recipient can't see amount or contributors until reveal date
- **Auto Release** — Full amount releases to recipient on reveal date
- **Auto Refund** — Everyone gets refunded if target isn't met by deadline
- **No Trust Needed** — Smart contract handles everything, no manual collection
- **Explorer Links** — Every transaction visible on Stellar Expert
- **Fee Sponsorship** — Gasless transactions via Stellar fee bump
- **Metrics Dashboard** — Live on-chain metrics and transaction history

## 📊 Metrics Dashboard
Live metrics available at: https://giftdrop-five.vercel.app/metrics
- Total drops created
- Total XLM contributed
- Total active users
- All on-chain transactions

## 🔒 Security Checklist
[View Complete Security Checklist](./SECURITY.md)

## 📡 Monitoring
Error monitoring active via custom logger (`frontend/lib/logger.ts`).
All transactions logged with Stellar Explorer links.

## 📈 Data Indexing
Using Stellar Horizon API for transaction indexing.

**Endpoint:**
```
https://horizon-testnet.stellar.org/accounts/CCKWQPTEXUAV7RK3WKD2T6YS4CLC4QE2KWI2MO4NHVAN4ABFJHA3YGVJ/transactions
```

## ⚡ Advanced Feature — Fee Sponsorship
Implemented gasless transactions using Stellar fee bump transactions.
Contributors don't need XLM for gas fees — sponsor pays on their behalf.

**Implementation:** `frontend/lib/contract.ts` → `contributeWithFeeSponsor()`

How it works:
- Sponsor account wraps the inner transaction
- Fee bump transaction covers gas fees
- Contributor signs without needing XLM for fees

## 🐦 Community Contribution
Posted about GiftDrop on Twitter/X to spread awareness in the Stellar community.
[View Twitter Post](https://x.com/vaiii05/status/2037897578281644247?s=20)

## 👥 Testnet Users (30+)
The following wallet addresses have tested GiftDrop on Stellar testnet:

| User | Wallet Address |
|------|---------------|
| User 1 | `GDBIJAOFPMGQWDUUQTJ3YFHI44MWHQHPALJQG7ZDA7D5WWEDKJYA4OHA` |
| User 2 | `GBLUMAX4IIPS54AIGD5WXRRAXISG4HLV3BE3YR3SQAD3GZSXRTVJY5GI` |
| User 3 | `GAHWHBKOQRUF3NY5BLRAFPEBWMN2RAAB73F3IPSGIRRIRX6CZ3PERSCH` |
| User 4 | `GDJ6VJX3OVJJLIF2J2JRBBDD6PYAZNLAMJIDOLJQSWTUCGDSKEBOEOFP` |
| User 5 | `GACPV4RIAZ3VWN7LKZVTPLABOWBGAZUH3PVUJ5OX6PJ4TO3PNVABSR56` |
| User 6 | `GCSX7FR6XYMAPHEJASF2RA3BHQV3PM4DKVW3FTSQV76IIR7GYIGJSW3W` |
| User 7 | Coming soon |
| User 8 | Coming soon |
| ... | Onboarding in progress — target 30+ users |

## 📋 User Responses (Excel Sheet)
[View Excel Sheet of User Responses](./user_responses.xlsx)

## 🏗️ Architecture
```
User Browser
     ↓
Next.js Frontend (Vercel)
     ↓
@stellar/stellar-sdk
     ↓
Soroban RPC (soroban-testnet.stellar.org)
     ↓
Soroban Smart Contract (Rust)
     ↓
Stellar Testnet Blockchain
```

## 📋 Smart Contract Functions

| Function | Description |
|----------|-------------|
| `create_gift` | Creates a new gift drop on-chain |
| `contribute` | Locks XLM contribution on-chain |
| `get_gift` | Fetches gift drop details |
| `get_contributors` | Returns all contributors for a drop |
| `get_organizer_gifts` | Returns all drops created by organiser |
| `get_contributor_gifts` | Returns all drops contributed to |
| `reveal` | Releases funds to recipient on reveal date |
| `refund` | Refunds contributors if target not met |

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js + TypeScript |
| Blockchain | Stellar Testnet |
| Smart Contract | Soroban (Rust) |
| Wallet | Freighter |
| Deployment | Vercel |
| Stellar SDK | @stellar/stellar-sdk |

## 📁 Project Structure
```
giftdrop/
├── contracts/
│   └── gift_drop/
│       ├── Cargo.toml
│       └── src/
│           └── lib.rs          # Soroban smart contract (Rust)
├── frontend/
│   ├── app/
│   │   ├── create/             # Create gift drop page
│   │   ├── dashboard/          # My drops and contributions
│   │   ├── drop/               # Individual drop page
│   │   ├── reveal/             # Reveal page
│   │   └── metrics/            # Metrics dashboard
│   ├── lib/
│   │   ├── contract.ts         # All blockchain interactions
│   │   ├── stellar.ts          # Stellar SDK helpers
│   │   └── logger.ts           # Monitoring and logging
│   └── components/             # Reusable UI components
├── SECURITY.md                 # Security checklist
├── USER_GUIDE.md               # User guide
├── README.md
└── ARCHITECTURE.md
```

## 🚀 Installation
```bash
# Clone the repository
git clone https://github.com/vaiii05-hub/Stellar-Internship-Level-6.git
cd Stellar-Internship-Level-6/frontend

# Install dependencies
npm install

# Run locally
npm run dev
```

## ⚙️ Environment Setup

Create `.env.local` in the frontend folder:
```
NEXT_PUBLIC_GIFT_DROP_CONTRACT=CCKWQPTEXUAV7RK3WKD2T6YS4CLC4QE2KWI2MO4NHVAN4ABFJHA3YGVJ
NEXT_PUBLIC_DEPLOYER_ADDRESS=your_deployer_address
```

## 👛 Wallet Setup for Users

1. Install **Freighter** browser extension
2. Create a new wallet
3. Switch network to **Testnet**
4. Get free testnet XLM from [Friendbot](https://friendbot.stellar.org)
5. Visit https://giftdrop-five.vercel.app and connect!

## 📖 User Guide
[View Full User Guide](./USER_GUIDE.md)

## 📝 User Feedback

Feedback collected from testnet users via Google Form.
👉 [Submit Feedback](https://forms.gle/BuiEPvHMVBdrYpyS8)

## 🔄 User Feedback Implementations

| # | User Feedback | Improvement Made |
|---|--------------|-----------------| 
| 1 | "My old drops were disappearing from the dashboard" | Fixed expired drops — added null safety so expired drops show with "Expired" status badge |
| 2 | "I had no way to verify if my contribution actually went through on blockchain" | Added transaction confirmation — contributors now see Stellar Explorer link after contributing |
| 3 | "I didn't know what would happen if the target amount wasn't reached" | Added clear auto-refund message on drop detail page |
| 4 | "I didn't know how much was raised compared to the target" | Added progress bar showing percentage raised on each drop card |
| 5 | "I wanted to see my contributions separately from drops I created" | Added two separate tabs — My Drops and My Contributions on dashboard |

## 🔮 Future Improvements (Based on User Feedback)

Based on feedback collected from 30+ testnet users, here are planned improvements:

| # | Improvement | Plan |
|---|------------|------|
| 1 | Mobile wallet support | Integrate LOBSTR mobile wallet |
| 2 | Email notifications | Notify contributors when reveal date approaches |
| 3 | Multiple token support | Allow USDC contributions alongside XLM |
| 4 | Social sharing | One-click share drop link to WhatsApp/Telegram |
| 5 | Gift messages | Allow contributors to add anonymous messages |

## 🔍 Verify on Stellar Explorer

- **Contract**: [`CCKWQP...3YGVJ`](https://stellar.expert/explorer/testnet/contract/CCKWQPTEXUAV7RK3WKD2T6YS4CLC4QE2KWI2MO4NHVAN4ABFJHA3YGVJ)
- All transactions visible on Stellar Expert Testnet

## 📄 License

MIT License — feel free to use and build on this project.



## 📊 Metrics Dashboard
Live metrics available at: https://giftdrop-five.vercel.app/metrics
- Total drops created
- Total XLM contributed  
- Total active users
- All on-chain transactions

## 🔒 Security Checklist
[View Complete Security Checklist](./SECURITY.md)

## 📡 Monitoring
Error monitoring active via custom logger.
All transactions logged with Stellar Explorer links.

## 📈 Data Indexing
Using Stellar Horizon API for transaction indexing.
Endpoint: https://horizon-testnet.stellar.org/accounts/CCKWQPTEXUAV7RK3WKD2T6YS4CLC4QE2KWI2MO4NHVAN4ABFJHA3YGVJ/transactions

## ⚡ Advanced Feature — Fee Sponsorship
Implemented gasless transactions using Stellar fee bump.
Contributors don't need XLM for gas fees.

## 📖 User Guide
[View Full User Guide](./USER_GUIDE.md)

## 👥 30+ Testnet Users
Coming soon — currently onboarding users!