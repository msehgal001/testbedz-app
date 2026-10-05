# TestBedz

Aerospace test campaign management: move hardware requests from intake through facility review and test planning.

**[Try the interactive demo](https://msehgal001.github.io/testbedz-app/demo.html)**

The demo uses fictional campaigns and stores changes in the visitor's browser. No account, cloud access, or facility booking is required.

## Explore the workflow

- Open a sample campaign and inspect its hardware, schedule, and test plan.
- Create a fictional campaign and add a test.
- Switch between the client workspace and facility review.
- Update campaign status and watch the summary change.
- Reset the sample data whenever you want.

## Project scope

The original application in `index.html` implements multi-step aerospace campaign intake, Firebase email/password authentication, Firestore persistence, and separate client and administrator views. The public portfolio demo is a separate local-data experience in `demo.html`; it never connects to Firebase.

Earlier iterations are kept privately. This repository is the main public TestBedz project.

## Run locally

```bash
git clone https://github.com/msehgal001/testbedz-app.git
cd testbedz-app
python3 -m http.server 8000
```

Open `http://localhost:8000/demo.html` for the portfolio demo.

For an independent cloud deployment of the original application, configure your own Firebase project, authentication domains, and server-enforced Firestore rules. Client-side administrator views do not enforce database authorization. Do not use fictional demo data as qualification evidence or a real booking request.

## Source guide

| File | Responsibility |
| --- | --- |
| `demo.html` · `demo.css` · `demo.js` | Hosted portfolio demo; browser-local sample campaigns |
| `index.html` | Original Firebase-connected application |

**HTML · CSS · JavaScript · Firebase**

Built by [Madhav Sehgal](https://msehgal.net).
