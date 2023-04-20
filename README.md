# BaelzBot

## Installation

```bash
git clone https://github.com/miqbalfr12/BaelzBot.git
cd ./BaelzBot
npm install
```

## Usage
Create an ```.env``` file in BaelzBot's main folder to hold secret variables.

The variables needed in ```.env``` include:
```env
API_KEY_OPEN_AI = "YOUR API KEY OPEN AI" 
CHROME_PATH = "YOUR CHROME PATH"
ROOT = "YOUR DIR BOT"

# Firebase credential
type= 'service_account'
project_id= 'baelzbot'
private_key_id= '*********************'
private_key= "-----BEGIN PRIVATE KEY-----\n*******************************************\n-----END PRIVATE KEY-----\n"
client_email= 'firebase-adminsdk-xeuzc@baelzbot.iam.gserviceaccount.com'
client_id= '*********************'
auth_uri= 'https://accounts.google.com/o/oauth2/auth'
token_uri= 'https://oauth2.googleapis.com/token'
auth_provider_x509_cert_url= 'https://www.googleapis.com/oauth2/v1/certs'
client_x509_cert_url= 'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xeuzc%40baelzbot.iam.gserviceaccount.com'
```
API_KEY_OPEN_AI Found at [here](https://platform.openai.com/account/api-keys)

## Bot Activation
Once the .env is created, here's how to run the bot
```bash
node app.js
```