# Classr SDK for Node.js

Use microclassifiers in the cloud for spam detection, sentiment analysis and more.

![Classr logo](./logo.svg)

## Requirements

- Node.js 14 or newer

## Installation

The Classr SDK for Node.js can be installed using `npm`:

```sh
npm install classr --save
```

## Usage

Initiaize your microclassifier by passing its UUID to the `Classr` constructor like so:

```js
import { Classr } from 'classr'

// Initialize cloud microclassifier.
const classifier = new Classr('acd78708-850b-4cea-aeaa-23cec50d13b6');
```

Now, call the `classify` or `getInfo` functions of `classifier` to make use of it:

```js
// Classify unseen input.
const document = 'The unseen document you want to classify!';
console.log(`Predicted class: ${await classifier.classify(document)}`);

// Print macro F1 score of classifier.
const info = await classifier.get_info()
console.log(`Classifier macro F1 score is: ${await info.f1_score}`);
```

If you'd like to use a self-hosted deployment of the Classr application (i.e. not the default official API), you can
pass a different base URL when constructing your `Classr` object:

```js
import { Classr } from 'classr'

// Initialize cloud microclassifier.
const classifier = new Classr('acd78708-850b-4cea-aeaa-23cec50d13b6', 'https://self-hosted-classr.example.com/');
```

## Related Projects

This SDK is for the official [Classr application](https://github.com/lambdacasserole/classr) (but will work with a
self-hosted deployment too, of course).

## License

[MIT](LICENSE) © [lambdacasserole](https://github.com/lambdacasserole).
