<img width=400 height=400 src="https://github.com/WilfredAlmeida/rooster-backend/assets/60785452/06588785-a0b5-4ef2-9f0a-57ad493c202f" />

# Rooster: Push Notifications from Smart Contracts

### Rooster comprises of dashboard, backend, and smart contract. This repo is the backend of Rooster and is still WIP. A monorepo will soon be created to house all of these.

### Please open an issue or DM [Wilfred](https://twitter.com/WilfredAlmeida_) on Twitter to get in touch.

With Rooster  you can:  
- Send Push Notifications from on-chain Smart Contracts.
- All you need is a CPI call to send notifications to the end users.
- Compatible with Firebase Cloud Messaging to accommodate your existing infra.


### [Pitch Deck](https://pitch.com/public/95ada362-51c9-4131-8a12-c1d70b213b12)
### [Hacker House BLR Demo](https://youtu.be/3kdLDshO4XA)
### [Rooster Demo](https://youtu.be/4fGYsbeb3fs)
### Check out the Rooster Dashboard: [rooster-dashboard.vercel.app/](https://rooster-dashboard.vercel.app/)

## Rooster Architecture
<img width="715" alt="image" src="https://github.com/WilfredAlmeida/rooster-backend/assets/60785452/80e6ec07-a3cc-4520-af62-bd2fd552f037">

1. A smart contract wants to send a push notification to its end users.
2. The contract make a Cross Program Invocation (CPI) call to the Rooster smart contract with some JSON data.
3. The Rooster program emits an Anchor event which is caught by the Rooster backend.
4. The Rooster backend delivers the notifications to user devices via Firebase Cloud Messaging (FCM).

### FAQ
1. **How does Rooster know whom to deliver?**  
Rooster utilizes the topic notifications feature of FCM. When calling the Rooster smart contract, the topic must be passed as a string in the JSON data. The Rooster backend will then send notifications for this topic.
2. **I already have existing notifications system, how to accomodate Rooster there?**  
You can add a webhook URL on the Rooster dashboard for your project. Rooster will deliver the notification payload to you via the webhook.
3. **Can I try Rooster?**  
Rooster is currently in development and in private alpha release. Please open an issue or DM [Wilfred](https://twitter.com/WilfredAlmeida_) on Twitter/X.
4. **How can I share feedback to Rooster?**  
Please open an issue or DM [Wilfred](https://twitter.com/WilfredAlmeida_) on Twitter/X.
