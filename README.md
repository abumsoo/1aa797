# Avantos project
Author: Bum Soo Kim
## How to run
First have a local server running at `http://localhost:3000`

I used the following for the server, which has instructions on how to run the server
https://github.com/mosaic-avantos/frontendchallengeserver

Then run the following from this project:
- `npm run dev`

## How to test
- `npm run test`

## Notes
There are a couple of lint errors related to getData.ts. It'd be to write a type interface based on the shape of the data that we're expected to receive from the API call, but I've left it due to time constraints.

Some of the essential tests are there, but it could use a few more. There's one that I ended up skipping because it was going to take a lot of time to figure out how to mock the data through React's context and reducer.

There may also be a bit of a mess related to prop drilling because the initial attempt was to manage state through props, but eventually I moved it over to using context and reducer. I'm pretty sure I was able to make the full transition, but I may have missed some remnants of that kind of logic.
