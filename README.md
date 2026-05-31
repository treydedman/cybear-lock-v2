# CyBear Lock 2.0

### The Secure Way to Forget Your Passwords

CyBear Lock is a sleek, lightweight, and secure password manager that makes it effortless to store and manage your login credentials. With strong AES encryption and a clean, responsive UI, CyBear Lock helps you stay organized and frees up your mental storage, so you can remember the important stuff (like where you put your car keys), not 27 different passwords.

This is a full rebuild of the original CyBear Lock, migrated from a React/Express/Vite stack deployed on AWS to a modern Next.js full-stack application deployed on Vercel with Supabase as the managed PostgreSQL database.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router), TypeScript
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL via Supabase
- **Auth:** JSON Web Tokens (JWT), Argon2 password hashing
- **Encryption:** AES encryption via CryptoJS
- **Deployment:** Vercel

---

## ✨ Features

- 🧑‍💻 **Instant Guest Access** — Explore a fully interactive demo with one-click guest sign-in, no account required
- 🔒 **Secure Credential Storage** — Passwords are AES encrypted before they ever touch the database
- 📱 **Mobile-First Responsive Design** — Seamless experience across all devices
- 🔑 **Session Management** — JWT-based authentication with secure cookie handling
- 🌙 **Dark Mode** — Toggle between light and dark themes

---

## 🚀 Live Demo

Try the live version: [cybear-lock-v2.vercel.app](https://cybear-lock-v2.vercel.app)

Click **Try as Guest** to enter a fully-featured demo environment with sample entries:

- `github.com` — Username: `KeepPushing` / Password: `commit2chaos`
- `canva.com` — Username: `AlmostOriginal` / Password: `ctrlC-ctrlV`
- `indeed.com` — Username: `HireMePls` / Password: `resume=!Spam`

⚠️ The Guest account cannot reset its password or delete the account — but everything else is fair game!

---

## 🧪 Local Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/treydedman/cybear-lock-v2.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file with the following:
   ```env
   DATABASE_URL=your_supabase_connection_string
   TOKEN_SECRET=your_jwt_secret
   AES_SECRET_KEY=your_aes_key
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

---

## 🤝 Contributing

Pull requests and feedback are welcome. Feel free to fork the repo or reach out with suggestions.
Open to ideas, issues, and cool collabs!

Trey Dedman – [treydedman@gmail.com](mailto:treydedman@gmail.com)
