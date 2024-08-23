# Debounced Search

## Task 1

![search example](./src/assets/search.png)

### Should show results as a drop down

- [x] The solution should use any appropriate React hooks
- [x] The solution should utilize debouncing for API interactions
- [x] Include any automated tests deemed necessary

### Notes

- Bootstrapping Project
  - I started a react project with Vite with Tailwind, and added Typscript, Jest, React Testing Library bc I'm familiar with these tools
  - I *am* open to others
- `debouncer`
  - I added a simple debouncer to reduce the need of importing other packages, and demonstrate how I test.
  - for debouncer, I mainly tested the debounced function and checked that it:
    - didn't call the callback until the delay was reached
    - called the callback with the correct arguments
    - bounced all calls prior to the last
    - continuted to call the callback after the an appropriate amount of time
- `SearchBar`
  - simple component that could be reused
- `useProduct`
  - where the magic happens:
    - calls end point and returns data
    - uses good ol `fetch` but we can switch to there module since it's dependency injected
    - I could/would break this appart more if we were calling other endpoints
- Automated tests
  - just checked on the three outcomes:
    - loading
    - successfully queried data
    - error

## Task 2

> You are not expected to write these test cases, only list them and write a summary of what type of test and their pass requirements

### Test cases

- for a modal I would test the following cases
  - test "loading displays expected copy"
    - This would check to see component behaves as expected when in a loading state
    - passing: The pattern used in the first task is usually how I'd do it, have `fetch` never resolve and check the modal looks as expected
  - test "error states display as expected"
    - Same as Task 1, I'd throw an error and see if component looked as expected
    - passing: perhaps a error message is visble or something is logged, or sentry is called (a mock sentry anyway)
  - test happy path "images are displayed"
    - passing: "check images are visible"
    - this might be redundant and we can just check that forward and next buttons work since then it's implied that the payload was recieved and images are showing up in the carrosel
  - Other functionality
    - test to see if expected copy is displayed (title, prices in various regions, special discounts)
      - passing: text is avaialble on screen
    - internationalization, (does copy translate across regions as expected)?
      - passing: copy is avaialble on screen
    - test "liking" feature works
      - passing: click heart and make that money (jk, see if expected baviour occurs, ex: functions are called)
    - test color expander works
      - passing: click on "+3 more" and see if component behavious as expected
      - ex: more colors are visible
  - other edge cases
    - test if there were only one image, would this have a intentional design?
      - passinb: Check to see if that is working as expected, ex: see if next buttons are disabled or invisible

- Other tests that might be useful
  - hitting endpoints can be easily overloaded, maybe check that calls are debounced like I did with the debouncer unit test
  - Accessibility and Cross-browser/platform (admittedly, I don't have extensive experience with this but I have used lighthouse and BrowserStack for more manual testing)
