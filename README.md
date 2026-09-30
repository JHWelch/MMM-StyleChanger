# MMM-StyleChanger

This is a module for the [MagicMirror²](https://github.com/MagicMirrorOrg/MagicMirror/). It allows you to toggle between a number of different stylesheets. Change the visual style of your mirror with the push of a button.

## Installation

In `~/MagicMirror/modules`

```sh
git clone https://github.com/JHWelch/MMM-StyleChanger.git
cd MMM-StyleChanger
```

No dependencies are required for usage. See below for development dependencies.

## Using the module

To use this module, add the following configuration block to the `modules` array in the `config/config.js` file:

```js
{
  module: 'MMM-StyleChanger',
  position: 'bottom_left',
  config: {
    styles: [
      {
        name: 'Style 1',
        path: 'config/custom1.css',
      },
      {
        name: 'Style 2',
        path: 'config/custom2.css',
      },
    ]
    // See below for optional configuration values
  }
}
```

### Customizing Config

| Option          | Required? | Default | Description                                                                                     |
| --------------- | --------- | ------- | ----------------------------------------------------------------------------------------------- |
| `styles`        | Yes       | `[]`    | The array of styles you would like to toggle through. See [Styles Config](#styles_config) below |
| `allowMultiple` | No        | `false` | Whether multiple styles can be loaded at once. If not each style added removes the others.      |

#### Styles Config

```js
{
  name: 'Style 1',
  path: 'config/custom1.css',
},
```

| Option | Required? | Description                        |
| ------ | --------- | ---------------------------------- |
| `name` | Yes       | The text to display on the button. |
| `path` | Yes       | The path to your CSS file to load. |

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
