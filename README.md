# Universal Jobs Search
Search for job offers on various sites, all in one page

Description:
A light-weight preact app I wanted to do while learning preact

Features:
- Fetching data from various sites
- Continuous scrolling
- Faving offers, which you've preferred
- Settings and favs are saved in the browser
- Selecting which jobs sites interest you, and optionally filtering by clicking on the badges

Supported sites:
- indeed
- stackoverflow
- monster

Uses:
- typescript
- preact
- parcel
- redux-zero
- lynt
- jest
- puppeteer

Planning to implement:
- Feature to add your own search for a jobs site
(If any of the sites has it's request routes or http classes changed, utils/ also need to be updated)
- Add search by location, salary range, job type and exclusions
- Saving favs and settings for added site
- Adding more sites
- Improving the searchbar and header

Run development server: `npm run dev`<br/>
Build the project (on /dist): `npm run build`<br/>
Run linting with: `npm run lint`<br/>
Run tests with: `npm run test` (Note: tests files aren't made yet)

Note: 
Running parcel on my setup gives me weird errors with typescript, removing moving typescript from `node_modules` and letting parcel install it on `run dev` or `run build` fixes this. I suspect it has something to do with `tsconfig.json` not being used but I've yet to find the cause for this weird behavior.