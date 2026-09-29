# MMM-StyleChanger

This is a module for the [MagicMirror²](https://github.com/MagicMirrorOrg/MagicMirror/).

## Installation

In `~/MagicMirror/modules`

```sh
git clone https://github.com/JHWelch/MMM-StyleChanger.git
cd MMM-StyleChanger
```

## Using the module

To use this module, add the following configuration block to the `modules` array in the `config/config.js` file:

```js
{
  module: 'MMM-StyleChanger',
  position: 'bottom_left',
  config: {
    //
  }
}
```

### Customizing Config

| Option | Required? | Description |
| ------ | --------- | ----------- |
|        |           |             |

## Update

### Automatic Update

Did you know MagicMirror² has a built-in module updater? Read more about it [here](https://docs.magicmirror.builders/modules/updatenotification.html#updates-array).

Add the following to your `updates` array of `updatenotification` in `config/config.js`

```js
{ 'MMM-StyleChanger': 'git pull' },
```

### Manual Update

In `~/MagicMirror/modules/MMM-StyleChanger`

```sh
git pull
npm install --omit=dev
```

## Development

Install dev dependencies

```sh
npm install
```

### Testing

There is a test suite using Jest.

```sh
node --run test
```

### Linting

There is linting using ESLint

```sh
# Run linting
node --run lint

# Fix linting errors
node --run fix
```
