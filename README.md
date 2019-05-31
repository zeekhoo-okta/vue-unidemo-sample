# Unidemo Baseline App
A baseline multitenant app built as a SPA (Vue) using Unified Demo Platform. 

## Developing with Vue CLI
### Prerequisites
* Install the [Vue CLI](https://cli.vuejs.org/guide/prototyping.html) command line interface:
```
npm install -g @vue/cli-service-global
# or
yarn global add @vue/cli-service-global
```

### Setup the project to run with Vue CLI
* Fork the repo, then clone it:
```
git clone git@github.com:zeekhoo-okta/vue-unidemo-sample.git
```
* 'cd' into the directory
```
cd vue-unidemo-sample
```
* Install dependencies
```
npm install
```
* Edit `.config.js` with your Org variables
* Then (in the directory that has App.vue), run:
```
vue serve
```

Now you're ready to start developing! Once you're done, build the project:
```
vue build
```