# ember-cli-markdown-as-json
Simple addon that allows you to transform directories of markdown posts to ember-data models.
Meant to be used in combination with [Prember](https://github.com/ef4/prember)
and [Fastboot](https://ember-fastboot.com/) for completely static single-page apps.

For installation jump in the [install](#install) section.

## Usage
Now on your specified directory (default `content/` under root dir) you can start adding markdown (.md) files.
What is cool though is that each markdown file can have a
[frontmatter](https://jekyllrb.com/docs/frontmatter/) section, where you can define key-values.
So for example, a file can look like this:

```markdown
---
author: Filippos Vasilakis
title: How to use Markdown
url: how-to-use-markdown
subtitle: Better than HTML
isIndex: true
---

Markdown is a lightweight markup language with plain text formatting syntax.
It is designed so that it can be converted to HTML and many other formats using a tool by the same name.
```

The addon automatically creates a `Content` model (along with its adapter) which you can use to filter the markdown
files after you fetch everything. For instance parent route (like application route) you can fetch everything inside a (before/after) model hook

```javascript
  //parent route
  model() {
    return this.get('store').findAll('content');
  }
```
And in a child route you can filter those based on your needs:

```javascript
  model(params, transition) {
    return this.get('store').queryRecord('content', {
      title: 'How to use Markdown'
    });
  }
```

One common pattern is to define a dynamic route for all markdown contents
```javascript
  this.route('content', { path: '/:url' });
```

and inside the route use the url's path to find the relevant markdown:

```javascript
  model(params, transition) {
    return this.get('store').queryRecord('content', {
      url: transition.targetName
    });
  }
```

Once you have loaded the markdown that you want, you can render it using [ember-remarkable](https://github.com/johnotander/ember-remarkable):

```handlebars
{{md-text
  text=model.content
  typographer=true
  linkify=true
}}
```


It should be noted that the addon supports live reloading which means that you can edit the markdown and see the changes without
restarting the server :)

Also using Prember and Fastboot you can have a complete static site, regardless if you use ember-data in development mode for productivity :)
## Advanced stuff
If you want more advanced stuff, you can check [ember-remarkable](https://github.com/johnotander/ember-remarkable)'s `html` and `dynamic` options.
In fact, it's possible to write plain HTMLBars code inside your markdown, or call a component and it will be rendered correctly.

Use with care though :P


## Installation
Install the addon:
```bash
ember install ember-cli-markdown-as-json
```

You probably want to install [ember-remarkable](https://github.com/johnotander/ember-remarkable) as well:
```bash
ember install ember-remarkable
```

By default the addon looks in the `content/` dir inside the root directory. However,
you can change that through the config (`config/environment.js`) of your app.
In the same config you need to specify any attributes you expect your model to have,
based on the [frontmatter](https://jekyllrb.com/docs/frontmatter/) that you use in your .md files:

```javascript
var ENV = {
  'ember-cli-markdown-as-json': {
    contentDirectory: 'foobar', //relative to root path, defaults in `content`',
    attributes: {
      index: 'number', //addon creates `index: DS.attr('number') inside the Content model
      isIndex: 'boolean',
      linkName: 'string',
      name: 'string',
      path: 'string',
      subtitle: 'string',
      title: 'string',
      url: 'string'
    }
  }
}
```
(`attributes` can also be an array but then everything is declared as `string` in the model)


## Credits
I should credit [@mansona](https://github.com/mansona) (Chris Manson) for
his [original code](https://github.com/stonecircle/broccoli-static-site-json/blob/master/index.js) and help of
[Broccoli plugin](https://github.com/kollegorna/ember-cli-markdown-as-json/blob/master/broccoli/markdown-to-json.js) that 
parses, converts and adds the markdowns as JSON in Broccoli's tree

## Contributing
Bug reports and pull requests are welcome on GitHub at https://github.com/kollegorna/ember-cli-markdown-as-json.
