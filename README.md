# alexa-madrid-emt-skill

Amazon Alexa skill that provides real time information on Madrid's public transportation

## Usage

```
Alexa ask Madrid transport next times for stop {STOP_NUMBER}
```

## Data Source

We use Madrid's EMT (public transport org) public APIs to obtain the information about Bus, Subway and Train routes.

http://opendata.emtmadrid.es/Servicios-web.aspx?lang=en-GB

## Run locally

Install the required dependencies via `npm` or `yarn`.

```bash
npm install
```

Launch the `madrid-emt-skill` passing as ENV vars the required Application ID and Key provided by the EMT API.

```bash
EMT_CLIENT_ID=my_client_id EMT_KEY=my_key node src/madrid-emt-skill
```

## Reference

Some useful links with the documentation and related projects

Amazon Alexa's skills kit
https://developer.amazon.com/alexa-skills-kit/

Big Nerd Ranch's Developing Alexa Skill Solutions course
https://github.com/bignerdranch/developing-alexa-skills-solutions

Library that simplifies the use of EMT open data API
https://github.com/Lorengamboa/EMT-library
