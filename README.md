🎁 GiftDrop

Friends secretly pool money for someone's gift — reveals automatically on the special day.

GiftDrop is a decentralized group gifting platform built on Stellar, powered by Soroban smart contracts. Friends can silently contribute XLM toward a shared gift, with funds locked on-chain and automatically released to the recipient on the reveal date — or refunded to everyone if the target isn't met.

🔗 Quick Links
ResourceLink🌐 Live Demohttps://giftdrop-five.vercel.app🎥 Demo VideoWatch on Loom📊 Metrics Dashboardhttps://giftdrop-five.vercel.app/metrics🔍 Smart ContractView on Stellar Expert🐦 Community PostTwitter/X Post📋 User Feedback32 Responses — Google Form🔒 Security ChecklistView SECURITY.md📖 User GuideView USER_GUIDE.md📐 Architecture DocsView ARCHITECTURE.md
Smart Contract Address:
CCKWQPTEXUAV7RK3WKD2T6YS4CLC4QE2KWI2MO4NHVAN4ABFJHA3YGVJ

📌 Table of Contents

Problem Statement
What is GiftDrop?
Features
Tech Stack
Architecture
Smart Contract Functions
Advanced Feature — Fee Sponsorship
Metrics Dashboard
Monitoring
Data Indexing
Security Checklist
Community Contribution
User Feedback & Improvements
Future Roadmap
Testnet Users (32)
Installation & Setup
Wallet Setup


💡 Problem Statement
When a group of friends wants to pool money for a surprise gift, someone always has to be trusted with the funds — manually chasing people, collecting cash, and managing the entire process. This creates friction, trust issues, and often ruins the surprise.
GiftDrop eliminates this entirely. No coordinator needed. No trust required. The smart contract handles everything.

🎁 What is GiftDrop?
GiftDrop is a Web3 group gifting app on Stellar Testnet where:

An organizer creates a Gift Drop with a target amount, recipient wallet, deadline, and reveal date
Friends silently contribute XLM — all locked on-chain, invisible to the recipient
On the reveal date, the full amount automatically releases to the recipient
If the target isn't met by the deadline, everyone gets a full refund automatically

No middleman. No trust. Just code.

🎯 Real-World Use Cases

🎂 Birthday surprise gifts
👋 Farewell gifts for colleagues
🎉 Festival group gifting
🏢 Office celebration pools


✨ Features
FeatureDescription🎁 Create a Gift DropSet target amount, recipient wallet, deadline, and reveal date🤫 Secret ContributionsFriends lock XLM silently into the smart contract👁️ Hidden from RecipientRecipient cannot see amount or contributors until reveal date⚡ Auto ReleaseFull amount releases to recipient on reveal date🔄 Auto RefundEveryone is refunded if target isn't met by deadline🔒 No Trust NeededSmart contract handles everything — no manual collection🔍 Explorer LinksEvery transaction visible on Stellar Expert⛽ Fee SponsorshipGasless transactions via Stellar fee bump📊 Metrics DashboardLive on-chain metrics and full transaction history🧭 Metrics in NavbarMetrics page accessible directly from the navigation bar🚦 Contribution LimitMax contribution per user enforced on-chain to ensure fair participation

🛠️ Tech Stack
LayerTechnologyFrontendNext.js + TypeScriptBlockchainStellar TestnetSmart ContractSoroban (Rust)WalletFreighter Browser ExtensionDeploymentVercelStellar SDK@stellar/stellar-sdkMonitoringCustom Logger (frontend/lib/logger.ts) + Vercel LogsData IndexingStellar Horizon API

🏗️ Architecture
User Browser
     │
     ▼
Next.js Frontend (Vercel)
     │
     ▼
@stellar/stellar-sdk
     │
     ▼
Soroban RPC (soroban-testnet.stellar.org)
     │
     ▼
Soroban Smart Contract (Rust)
     │
     ▼
Stellar Testnet Blockchain

📋 Smart Contract Functions
FunctionDescriptioncreate_giftCreates a new gift drop on-chaincontributeLocks XLM contribution on-chain (subject to per-user contribution limit)get_giftFetches gift drop detailsget_contributorsReturns all contributors for a dropget_organizer_giftsReturns all drops created by organizerget_contributor_giftsReturns all drops contributed torevealReleases funds to recipient on reveal daterefundRefunds contributors if target not met

⚡ Advanced Feature — Fee Sponsorship
GiftDrop implements gasless transactions using Stellar fee bump transactions. Contributors do not need XLM for gas fees — a sponsor account covers fees on their behalf.
Implementation file: frontend/lib/contract.ts → contributeWithFeeSponsor()
How it works:

Sponsor account wraps the contributor's inner transaction
Fee bump transaction covers all gas fees
Contributor signs and submits without needing XLM for fees

This dramatically lowers the barrier to entry for new users — they only need XLM for their actual contribution, not for network fees.

📊 Metrics Dashboard
Live URL: https://giftdrop-five.vercel.app/metrics
The Metrics page is accessible directly from the navigation bar (added as part of recent improvements). It displays real-time on-chain data pulled from Stellar Testnet:

Total transactions on the contract
Network (Stellar Testnet)
Smart contract address with direct Explorer link
Full on-chain transaction history with hashes, types, dates, and individual Explorer links

Screenshot:
Show Image

19 on-chain transactions as of March 30, 2026 — all verifiable on Stellar Expert.


📡 Monitoring
GiftDrop uses a custom logger (frontend/lib/logger.ts) that logs all key application events with structured [GiftDrop INFO] prefixed messages. These are visible in the browser console and captured in Vercel deployment logs.
Screenshot:
Show Image

Console showing [GiftDrop INFO] GiftDrop app loaded — custom logger fires on every app load, confirming monitoring is active.

Monitoring stack:

Custom logger: frontend/lib/logger.ts
Vercel deployment logs: Available in Vercel dashboard under the GiftDrop project
On-chain transaction explorer: Stellar Expert — Contract Transactions


📈 Data Indexing
GiftDrop uses the Stellar Horizon API to index and display all on-chain transactions in the Metrics Dashboard.
Indexing Endpoint:
https://horizon-testnet.stellar.org/accounts/CCKWQPTEXUAV7RK3WKD2T6YS4CLC4QE2KWI2MO4NHVAN4ABFJHA3YGVJ/transactions
What is indexed:

All contract call transactions
Transaction hashes and timestamps
Contributor and organizer activity
Live metrics: total transactions, total XLM contributed, active users


🔒 Security Checklist
A complete security review has been conducted and documented.
👉 View Full Security Checklist — SECURITY.md
Key areas covered:

Smart contract access controls
Fund locking and release logic
Contribution limit enforcement (max per user)
Refund protection
Frontend input validation
Wallet connection safety


🐦 Community Contribution
GiftDrop was shared with the Stellar developer and user community on Twitter/X to spread awareness and onboard testnet users.
👉 View Twitter/X Post

📝 User Feedback & Improvements
Feedback was collected from 32 testnet users via Google Form.
👉 View All 32 Responses
Implemented Improvements
#User FeedbackImprovement Made1"My old drops were disappearing from the dashboard"Fixed expired drops — added null safety so expired drops show with an "Expired" status badge2"I had no way to verify if my contribution went through on blockchain"Added transaction confirmation — contributors now see a Stellar Explorer link after contributing3"I didn't know what would happen if the target amount wasn't reached"Added clear auto-refund message on the drop detail page4"I didn't know how much was raised compared to the target"Added a progress bar showing percentage raised on each drop card5"I wanted to see my contributions separately from drops I created"Added two separate tabs — My Drops and My Contributions on the dashboard6"Hard to find the metrics page"Added Metrics link directly to the navigation bar for easy access7"Some users were contributing too much, leaving less room for others"Implemented per-user max contribution limit enforced on-chain

🔮 Future Roadmap
Based on feedback from 32 testnet users:
#ImprovementPlan1Mobile wallet supportIntegrate LOBSTR mobile wallet2Email notificationsNotify contributors when reveal date approaches3Multiple token supportAllow USDC contributions alongside XLM4Social sharingOne-click share drop link to WhatsApp/Telegram5Gift messagesAllow contributors to add anonymous messages

👥 Testnet Users (32)
32 real users have tested GiftDrop on Stellar Testnet. All wallet addresses are verifiable on Stellar Expert Testnet Explorer.
Table 1 — User Onboarding (5 Level 5 Users + 20 Level 6 Users)

⭐ = Level 5 user (returning) | ✅ = Level 6 user (new)

#User NameUser EmailUser Wallet AddressLevel1Sumit Shindesumitshinde2305@gmail.comGCY335MWXOTIDG3JVLER2FSQ3LOFWIYUAZIDTCFAPFTXIOZ64CGLKUB5⭐ L52Janhavi Liparejanhavilipare9948@gmail.comGBLUMAX4IIPS54AIGD5WXRRAXISG4HLV3BE3YR3SQAD3GZSXRTVJY5GI⭐ L53Sumedh Chandanshivesumedhchandanshive2004@gmail.comGCXY4DOI4DOJOVISJSXCLXL25QF5SWK3JG4BIURXVNTCV2IFWNEHM2J⭐ L54Nayan Palandenpalande2106@gmail.comGCLTDFYMDJZYLDKETB6Z24CCPHGFQS7NRZFJWT4AUXQZ5SF2BJOME7CN⭐ L55Jadhav Gaurijadhavgauri347@gmail.comGDJ6VJX3OVJJLIF2J2JRBBDD6PYAZNLAMJIDOLJQSWTUCGDSKEBOEOFP⭐ L56Kumar Shankar Jadhavkumarjadhav030@gmail.comGARGMJJCMNGYHZPHPS47NANURZVT6EQIW2NDCE6PUFIC3YRCMDRBUDGD✅ L67Sayali Nighotsayali19425@gmail.comGDGAG234U66W25HS6EN4OYTD7RZWUKGMF5JGH5EWW46UEJTE7YUCJJTU✅ L68Jadhav Vaishnavivaishhhh0014@gmail.comGAGBXPGIVLCKAYRIAT3HMEXH7J2YMNO4WUGMNZW5DIN4MDXFTD246QHQ✅ L69Poorvapoorvam2006@gmail.comGBJ7S6KJYTGYY6COIUHRAH3INJXUTUJXG4EATKH6M6OE2ZC23WVWD4ZJ✅ L610Sayali Manoj BanpatteSayalibanpatte898@gmail.comGAHFDM4MHIGKWNZERUH4GC5IMZAFN4IH7PZFJ6RAIKLZ2H356ITDSTGL✅ L611Tanvi Pawartanvipawar631@gmail.comGAGBXPGIVLCKAYRIAT3HMEXH7J2YMNO4WUGMNZW5DIN4MDXFTD246QHQ✅ L612Vishal Wabalewabalevishal07@gmail.comGAEXD3KCFE3CBWDGSNQ5A624AMH74B4ONAEEF2QRUWHX6SOTTAVUGKRV✅ L613Samyak Chandanshivesum3dh@yahoo.comGBJ7S6KJYTGYY6COIUHRAH3INJXUTUJXG4EATKH6M6OE2ZC23WVWD4ZJ✅ L614Gayatri Deshmukhggdeshmukh12107@gmail.comGAHFDM4MHIGKWNZERUH4GC5IMZAFN4IH7PZFJ6RAIKLZ2H356ITDSTGL✅ L615Janhavi Manejanhaviamane123@gmail.comGAEXD3KCFE3CBWDGSNQ5A624AMH74B4ONAEEF2QRUWHX6SOTTAVUGKRV✅ L616Abhishek Bhujbalabhibhujbal279@gmail.comGARGMJJCMNGYHZPHPS47NANURZVT6EQIW2NDCE6PUFIC3YRCMDRBUDGD✅ L617Trisharan Gawaitrishyaspeaks@gmail.comGBTOTIACAKIJACTH62RZQZSZJV6QIYFVPXLSAPNCSB6Q4IYMWEKIH55D✅ L618Prashant Sawantsawantprashant2000@gmail.comGDZ2MUOTU45WYR4MA6IAR63OB6IU53QYGNYOAJPPJT6VBNQLSOQEZFE2✅ L619Mukesh Dholedholemukesh2002@gmail.comGDNLRW65EWJAP2AJQO5G6F2VSNHFZJJAC3VZ2GCAO452T5ICEJMFUFPL✅ L620Siddhant WasnikSidhantwasnik02@gmail.comGD32Y4KNZI7PNFO6FKRWZO7VTCHOXMNVR3EZYLEKJ6QYN4QC3X3JUMN4✅ L621Aditya JadhavAdi aj2004@gmail.comGAI2EC7HSJ4DCE5QHRFYO5MYA6EV3XJCIW7D66PWUH6VUYL4DWSVGNZ2✅ L622Sarangsawant.sarang98@gmail.comGCWGFZTDGBDQPTMU3KHRYWNDMW4PZEEHRL2INAX7UIKQB7UW7LMEH73V✅ L623Vaibhavi Agalevaibhaviagale7799@gmail.comGALWWEGHOMU5YODTZBVGPFP2OHCJH5VO3VKWNMW7ZNT6OECINVPQT7SQ✅ L624Sarthak Dheresarthakdhere0217@gmail.comGCRYPAQB3TFLQE727TA3R723QIEPTP5KCMP7OMH4HVXNLCEUKPD4AZJP✅ L625Soumyaasoumya02lipare@gmail.comGA5JVZLQAMAKQ4FVMV5XAX3EKHPIR2AHMH6FSNCWKTB664A7NMTT3NPH✅ L6

Table 2 — User Feedback Implementation
Users whose feedback was directly implemented, with the corresponding commit IDs:
#User NameUser EmailUser Wallet AddressFeedback ImplementedCommit ID1Trisharan Gawaitrishyaspeaks@gmail.comGBTOTIACAKIJACTH62RZQZSZJV6QIYFVPXLSAPNCSB6Q4IYMWEKIH55DExpired drops showing with "Expired" badgebf4c4962Gayatri Deshmukhggdeshmukh12107@gmail.comGAHFDM4MHIGKWNZERUH4GC5IMZAFN4IH7PZFJ6RAIKLZ2H356ITDSTGLStellar Explorer link shown after contributionb1654483Mukesh Dholedholemukesh2002@gmail.comGDNLRW65EWJAP2AJQO5G6F2VSNHFZJJAC3VZ2GCAO452T5ICEJMFUFPLAuto-refund message added on drop detail page21382704Prashant Sawantsawantprashant2000@gmail.comGDZ2MUOTU45WYR4MA6IAR63OB6IU53QYGNYOAJPPJT6VBNQLSOQEZFE2Progress bar showing % raised on each drop card84dd9bd5Siddhant WasnikSidhantwasnik02@gmail.comGD32Y4KNZI7PNFO6FKRWZO7VTCHOXMNVR3EZYLEKJ6QYN4QC3X3JUMN4Separate My Drops and My Contributions tabs59c03936Sarangsawant.sarang98@gmail.comGCWGFZTDGBDQPTMU3KHRYWNDMW4PZEEHRL2INAX7UIKQB7UW7LMEH73VMetrics link added directly to navbarcc469237Kumar Shankar Jadhavkumarjadhav030@gmail.comGARGMJJCMNGYHZPHPS47NANURZVT6EQIW2NDCE6PUFIC3YRCMDRBUDGDPer-user max contribution limit enforced on-chain2de757b

All 32 Wallet Addresses
#Wallet Address1GCY335MWXOTIDG3JVLER2FSQ3LOFWIYUAZIDTCFAPFTXIOZ64CGLKUB52GBLUMAX4IIPS54AIGD5WXRRAXISG4HLV3BE3YR3SQAD3GZSXRTVJY5GI3GCXY4DOI4DOJOVISJSXCLXL25QF5SWK3JG4BIURXVNTCV2IFWNEHM2J4GCLTDFYMDJZYLDKETB6Z24CCPHGFQS7NRZFJWT4AUXQZ5SF2BJOME7CN5GDJ6VJX3OVJJLIF2J2JRBBDD6PYAZNLAMJIDOLJQSWTUCGDSKEBOEOFP6GARGMJJCMNGYHZPHPS47NANURZVT6EQIW2NDCE6PUFIC3YRCMDRBUDGD7GDGAG234U66W25HS6EN4OYTD7RZWUKGMF5JGH5EWW46UEJTE7YUCJJTU8GAGBXPGIVLCKAYRIAT3HMEXH7J2YMNO4WUGMNZW5DIN4MDXFTD246QHQ9GBJ7S6KJYTGYY6COIUHRAH3INJXUTUJXG4EATKH6M6OE2ZC23WVWD4ZJ10GAHFDM4MHIGKWNZERUH4GC5IMZAFN4IH7PZFJ6RAIKLZ2H356ITDSTGL11GAEXD3KCFE3CBWDGSNQ5A624AMH74B4ONAEEF2QRUWHX6SOTTAVUGKRV12GBTOTIACAKIJACTH62RZQZSZJV6QIYFVPXLSAPNCSB6Q4IYMWEKIH55D13GDZ2MUOTU45WYR4MA6IAR63OB6IU53QYGNYOAJPPJT6VBNQLSOQEZFE214GDNLRW65EWJAP2AJQO5G6F2VSNHFZJJAC3VZ2GCAO452T5ICEJMFUFPL15GD32Y4KNZI7PNFO6FKRWZO7VTCHOXMNVR3EZYLEKJ6QYN4QC3X3JUMN416GAI2EC7HSJ4DCE5QHRFYO5MYA6EV3XJCIW7D66PWUH6VUYL4DWSVGNZ217GCWGFZTDGBDQPTMU3KHRYWNDMW4PZEEHRL2INAX7UIKQB7UW7LMEH73V18GALWWEGHOMU5YODTZBVGPFP2OHCJH5VO3VKWNMW7ZNT6OECINVPQT7SQ19GCRYPAQB3TFLQE727TA3R723QIEPTP5KCMP7OMH4HVXNLCEUKPD4AZJP20GA5JVZLQAMAKQ4FVMV5XAX3EKHPIR2AHMH6FSNCWKTB664A7NMTT3NPH21GBLUQBHZGX5PM2A6FX45L3ONQVL56RNEUJ2BUSYM47A5N3Z37VPJPQ2Y22GBNPQXKGMVPBGJUT2VTKOMWNG2JAGBG7DDOH4XY6CCO55NTTV5UKL3EQ23GBLPM5I4DCKOWWVUPXKF5XONZSD22ZF3GHNDHK6ZB7PSQLIPPINXNENC24GAHHWA4EMBFHGXN42EYODCP24G7YMT7FSMBARQZNMSEIPGVQWBYCDFCY25GBTCO5WSTBEMWTLI7CXNDMFHJV7NTIPIAHTPRRNW3LC5HDNZI6M5JAQCG26GCFQGTT5JEPZDJHFT7AKA4AD5CFLH3LU6TZMSYNTNNS2JO7BKAOAEFZV27GDNKE22S6C3D3PPRGBKHB7SSQEMEZFDEZ223MOYCW73TQGRGI2BPAIG428GDBIJAOFPMGQWDUUQTJ3YFHI44MWHQHPALJQG7ZDA7D5WWEDKJYA4OHA29GAHWHBKOQRUF3NY5BLRAFPEBWMN2RAAB73F3IPSGIRRIRX6CZ3PERSCH30GACPV4RIAZ3VWN7LKZVTPLABOWBGAZUH3PVUJ5OX6PJ4TO3PNVABSR5631GCSX7FR6XYMAPHEJASF2RA3BHQV3PM4DKVW3FTSQV76IIR7GYIGJSW3W32GBTOTIACAKIJACTH62RZQZSZJV6QIYFVPXLSAPNCSB6Q4IYMWEKIH55D

All addresses are verifiable on Stellar Expert Testnet.


📁 Project Structure
giftdrop/
├── contracts/
│   └── gift_drop/
│       ├── Cargo.toml
│       └── src/
│           └── lib.rs              # Soroban smart contract (Rust)
├── frontend/
│   ├── app/
│   │   ├── create/                 # Create gift drop page
│   │   ├── dashboard/              # My drops and contributions (tabbed)
│   │   ├── drop/                   # Individual drop detail page
│   │   ├── reveal/                 # Reveal page
│   │   └── metrics/                # Metrics dashboard (linked in navbar)
│   ├── lib/
│   │   ├── contract.ts             # All blockchain interactions
│   │   ├── stellar.ts              # Stellar SDK helpers
│   │   └── logger.ts               # Monitoring and structured logging
│   └── components/                 # Reusable UI components
├── assets/
│   ├── metrics-dashboard.png       # Metrics dashboard screenshot
│   └── monitoring-console.png     # Monitoring console screenshot
├── SECURITY.md                     # Security checklist
├── USER_GUIDE.md                   # Full user guide
├── ARCHITECTURE.md                 # Architecture documentation
└── README.md

🚀 Installation & Setup
Prerequisites

Node.js 18+
Freighter Wallet browser extension
Stellar testnet account with XLM (free via Friendbot)

Clone & Run
bash# Clone the repository
git clone https://github.com/vaiii05-hub/Stellar-Internship-Level-6.git
cd Stellar-Internship-Level-6/frontend

# Install dependencies
npm install

# Run locally
npm run dev
Environment Variables
Create a .env.local file in the frontend/ folder:
envNEXT_PUBLIC_GIFT_DROP_CONTRACT=CCKWQPTEXUAV7RK3WKD2T6YS4CLC4QE2KWI2MO4NHVAN4ABFJHA3YGVJ
NEXT_PUBLIC_DEPLOYER_ADDRESS=your_deployer_address

👛 Wallet Setup for Users

Install the Freighter browser extension
Create a new wallet and securely save your seed phrase
Switch the network to Testnet in Freighter settings
Get free testnet XLM from Friendbot
Visit https://giftdrop-five.vercel.app and connect your wallet


🔍 Verify on Stellar Explorer
All GiftDrop transactions are fully transparent and verifiable on-chain:

Contract: CCKWQP...3YGVJ
Network: Stellar Testnet
Explorer: Stellar Expert Testnet


📄 License
MIT License — free to use, fork, and build upon.

Built with ❤️ on Stellar by @vaiii05
