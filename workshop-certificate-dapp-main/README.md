# Generating Certificates for Workshop Participants

## Website Link

[Workshop Certification Project](https://workshop-certification-project.vercel.app/)

## Overview

Blockchain-based application that issues participation certificates to workshop attendees, ensuring tamper-proof certification processes for participants.

## TechStack

- **Hardhat** for compiling and deploying solidity contracts
- **Vite** for frontend
- **Chai** and **Mocha** for testing the contract
- **IPFS** service through [Pinata Cloud](https://www.pinata.cloud/)

## How to initialize project

1. Install the node modules
1. Go to the frontend directory
1. Start the application

```
npm install
cd frontend
npm run dev
```

## How to use

1. Connect your metamask wallet
1. Enter the candidate public key who has attended a workshop
1. Select the workshops which he/she has attended
1. Click send certificates and wait for the receiver to confirm

## Features

- This application uses **ERC1155** token from _openzeppelin 5_ which allows us to support multiple events.
- It allows us to provide multiple certificates in a single transaction.
- The token also follows one of the two _Soulbound_ token principle, that is, the token is **not transferable**.
