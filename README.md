# TestBedz
### Aerospace test campaign management · Version 3

A web application for submitting aerospace test campaigns, reviewing facility capabilities, and tracking requests from intake through planning. Client and administrator views share campaign data through Firebase.

## Core workflows

**For clients:** create an account, submit company and hardware details, specify test needs and schedule, add individual tests, and follow campaign status.

**For facility administrators:** review incoming campaigns, inspect submitted test details, update campaign status, and view the facility calendar.

## Features

- Multi-step campaign intake with conditional fields for different test types.
- Firebase email/password authentication.
- Persistent campaign records in Cloud Firestore.
- Live campaign updates through Firestore listeners.
- Facility information, testing resources, and separate client and administrator dashboards.

## Technology

| Layer | Technology |
| --- | --- |
| Interface | HTML, Tailwind CSS, vanilla JavaScript modules |
| Authentication | Firebase Authentication |
| Database | Cloud Firestore |
| Application | [index.html](index.html) |

## Run locally

```bash
git clone https://github.com/msehgal001/tb3.git
cd tb3
python3 -m http.server 8000
```

Open [localhost:8000](http://localhost:8000).

For an independent deployment, replace `firebaseConfig` in `index.html` with your own Firebase project, enable email/password sign-in, configure Firestore access rules, and add your hosting domain to the authentication configuration. This repository does not include the deployed Firestore rules; administrator access also needs to be enforced in that configuration.

## Repository guide

| Repository | Purpose |
| --- | --- |
| [TestBedz](https://github.com/msehgal001/TestBedz) | Original local demo with example data |
| [testbedzv2](https://github.com/msehgal001/testbedzv2) | Firebase-connected version |
| [tb3](https://github.com/msehgal001/tb3) | Further Firebase-connected iteration |

Built by [Madhav Sehgal](https://msehgal.net), M.S.E. Aerospace Engineering, University of Michigan.
