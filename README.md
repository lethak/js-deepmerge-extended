# deepmerge-analyzer-js


This package is built in ES6.

The merge algorithm is inspired by [TehShrike/deepmerge](https://github.com/TehShrike/deepmerge)


## Purpose

Built for a specific need where I am required to explain the inheritance of results following multiple sequential merge.

> :warning: DeepMergeAnalyzer is not built with peak performance in mind.

I am fairly certain you should not use this if you are after the best deep-merge. Speed and memory usage were not a factor for me when building DeepMergeAnalyzer. 

## Dependencies

* [is-mergeable-object](https://github.com/TehShrike/is-mergeable-object)

## Installation

```bash
npm install --save deepmerge-analyzer-js
```

## Usage

> :grey_exclamation: You will find a lot more usages and examples in the [Playground folder](./playground)

### Quick Start

### Customizing
What you are looking for is the main class `DeepMergeAnalyzer` in `./src`

Methods prefixed with an underscore (`_`) are supposed to be private, I chose to expose them anyway to be sure the class instance can be exploited and customized without much restriction.


