# My Wellness Complete

A total wellness tracker inspired by the Dead Space health bar.

## Installation

1. Create a project on the [Google Dashboard](https://console.cloud.google.com) with all Google Fit API permissions
2. Pull the repository to your local machine
3. Create a _./src/private/keys.js_ file with the following structure:

   ```js
   module.exports = {
     sessionSecret: 'YOUR_SESSION_SECRET',
     googleID: 'YOUR_GOOGLE_CLIENT_ID',
     googleSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
     googleAPI: 'YOUR_GOOGLE_API_KEY',
   };

4. Run `npm install`
5. Run `npm run start` or `npm run dev`
