# 🎭 Proof of Mood DApp

**Proof of Mood** is a decentralized application (DApp) on the Ethereum blockchain that allows users to perform a daily mood check-in. The app stores moods on-chain, provides insightful user statistics, and visualizes mood trends over time through interactive charts and dashboards.

---

## 🚀 Features

- ✅ Daily mood check-in recorded on the blockchain
- 📊 Mood history visualization with charts
- 📈 User statistics (total check-ins, most frequent mood, etc.)
- ⏱️ Countdown timer until next check-in
- 🔐 Wallet integration (MetaMask or compatible Ethereum wallet)

---

## 🧱 Tech Stack

- React.js
- ethers.js
- Solidity Smart Contract (not included in this repo)
- Tailwind CSS
- MetaMask or WalletConnect (browser wallet)

---

## 📦 Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/proof-of-mood.git
   cd proof-of-mood

2. **Install depedencies:**

   ```bash
   npm install

3. **Start the development server:**

   ```bash
   npm start

🔑 How to Use

    Connect Your Wallet:

        Make sure MetaMask (or another Ethereum wallet) is installed.

        Click "Connect Wallet" on the homepage.

    Daily Mood Check-In:

        Select your current mood from the available options.

        Click "Check-In" to submit it to the blockchain.

        Confirm the transaction via your wallet.

    View Mood Insights:

        See your mood history displayed in charts.

        Track mood trends over time.

        See how long until your next available check-in.



---

## 🧠 Project Structure

```markdown
## 🧠 Project Structure

```bash
src/
│
├── abis/                       # Contract ABI
│   └── ProofOfMood.json
│
├── components/                 # Reusable UI components
│   ├── WalletNotConnected.js
│   ├── DashboardHeader.js
│   ├── MoodStatsCards.js
│   ├── Charts.js
│   └── CheckInSection.js
│
├── hooks/
│   └── useCountdown.js         # Custom countdown hook
│
├── utils/
│   ├── helpers.js              # Wallet & localStorage helpers
│   ├── moodUtils.js            # Fetch mood stats/history
│   └── constants.js            # Contract address & constants
│
├── ProofOfMoodDApp.js          # Main DApp component
└── index.js                    # App entry point

```

## 👨‍💻 Contributing

Contributions are welcome!
Please open an issue first to discuss your ideas or proposed changes before submitting a pull request.
