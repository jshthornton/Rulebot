Rulebot
=======

I don't know about you, but I am pretty tired of writing the same ol' validation functions project to project just to do even simple validation. Thus Rulebot was born! Can robots be born?

Rulebot loves your data, he wants to tell you how wrong it is. But more importantly he, when he wants to, tells you when your data is correct.

## Dependicies
- underscore / lodash (look into lodash if you use underscore)

## Usage
Rulebot supports both global and AMD builds. When using the AMD options Rulebot does not pollute the global object. To get him installed you just need to either add the script element to your page, or require him in.

**Script:** `<script src="PATH_TO_VENDOR/Rulebot.js"></script>`

**AMD:** `define(['PATH_TO_VENDOR/Rulebot], function(Rulebot) {})`

### New Rulebot
Rulebot is a function constructor, therefore an instance of him must be created. Why is Rulebot not just an object? Essentially to allow different rule sets depending on needs; allowing the developer to have two Rulebots with different sets of rules depending on what validation functions they need.

`var rulebot = new Rulebot();`

### Test
Now that we have an instance of Rulebot we can start running tests against our data. To run a test all you need to do is call `rulebot.test(TEST_NAME, value, TEST_ARG_1, ..., TEST_ARG_N);`.

### Core rules
Rulebot comes with some rules / tests out of the box. When you create a new instance of Rulebot these core rules are added to that Rulebot. This can be disabled via `new Rulebot({}, false)`.

- `alphaNumeric` - Tests if they value is only contains alpha numeric characters
- `between`
- `blank`
- `email`
- `extension`
- `ip`
- `minLength`
- `maxLength`
- `multiple`
- `naturalNumber`
- `range`
- `url` - Not yet implemented
- `uuid`

### Adding rules

