# SauceDemo – Playwright Automation Framework

# 1. Project Overview
This project contains an end-to-end UI automation framework developed using Playwright with TypeScript and Page Object Model.

# Automated Ecommerce Scenarios
- Verify login functionality with valid and invalid credentials.
- Verify product listing.
- Sort products by price (Low to High).
- Sort products by name (Z to A).
- Add products to the shopping cart.
- Verify cart badge count and cart contents.
- Complete the end-to-end checkout process.
- Validate item subtotal, tax, and final order total.
- Verify successful order placement.

# 2. Prerequisites
- Node.js And npm
- Visual Studio Code And Git

# 3. Project Setup
### Step 1: Clone the repository 
git clone <your-github-repository-url>
### Step 2: Navigate to the project directory
cd saucedemo-playwright
### Step 3: Install Playwright and Dependencies using terminal
npm init playwright@latest


# 4. Framework Structure
saucedemo-playwright
│
├── pages/
│   ├── login.Page.ts
│   ├── product.page.ts
│   ├── cart.page.ts
│   └── checkout.page.ts
│
├── tests/
│   └── login.spec.ts
│
├── playwright.config.ts
├── package.json
├── package-lock.json
└── README.md

### Folder Responsibilities
## pages
Contains page classes, locators, and reusable methods for application interactions.

## tests
Contains test scenarios and test execution logic.

## playwright.config.ts
Maintains common configuration, including:
- Base URL
- Browser configuration
- Headless/headed execution
- Screenshot and video settings
- Test reporting