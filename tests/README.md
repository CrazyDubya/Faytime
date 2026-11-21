# Optional local market-countdown regression

The site remains a standalone HTML page. These opt-in Node tests do not add a
site/runtime dependency or fetch a current exchange calendar. They run the full
page in jsdom with fixed historical clocks and assert actual market-card DOM.
Background fetch attempts are blocked inside each fixture.

Install the test-only dependency in a temporary directory, not this repository:

```sh
TEST_RUNTIME=$(mktemp -d)
npm install --prefix "$TEST_RUNTIME" --ignore-scripts --no-audit --no-fund jsdom@31.0.1
FAYTIME_JSDOM_MODULE="$TEST_RUNTIME/node_modules/jsdom/lib/api.js" node tests/market-countdown.mjs
```

Run from the project root using a Node version supported by jsdom 31.0.1. The
test script imports that explicit dependency path, reads ../index.html relative
to itself, prints all nine results and exits nonzero on any failed case. It does
not write product files. FAYTIME_SOURCE can point to another complete index.html
for a baseline comparison. No automatic install or test runner is added to the
site. Remove the temporary test-runtime directory afterward.

Fixtures check consistency with the page's own 2024-25 holiday table, not current
2026 exchange schedules, DST, early closes, external calendar accuracy or visual
layout. They do not refresh market hours or holidays.
