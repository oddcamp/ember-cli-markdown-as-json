# ember-cli-markdown-as-json
Simple addon that allows you to transform directories of markdown posts to ember-data models.
Meant to be used in combination with [Prember](https://github.com/ef4/prember)
and [Fastboot](https://ember-fastboot.com/) for completely static single-page apps.

## Usage
Install the addon:
```bash
ember install ember-cli-markdown-as-json
```

Then any markdown file (ending in .md) found in the `content/` directory, it will be accessible
by the ember-data using the store's methods.

You can also override the defaultl look up path by adding in `config/environment.js`:

```javascript
var ENV = {
  'ember-cli-markdown-as-json': {
    contentDirectory: './foobar/', //relative to root path, defaults in ./content/'
  }
}
```

## Contributing
Bug reports and pull requests are welcome on GitHub at https://github.com/kollegorna/ember-cli-markdown-as-json.
