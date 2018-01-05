const Plugin = require('broccoli-plugin');
const walkSync = require('walk-sync');
const yamlFront = require('yaml-front-matter');
const { Serializer } = require('jsonapi-serializer');
const yaml = require('js-yaml');
const mkdirp = require('mkdirp');
const assign = require('lodash.assign');

const {
  existsSync,
  readFileSync,
  writeFileSync,
} = require('fs');

const {
  basename,
  dirname,
  extname,
  join,
} = require('path');

class BroccoliStaticSiteJson extends Plugin {
  constructor(folder, options) {
    // tell broccoli which "nodes" we're watching
    super([folder], options);

    this.options = options;

    Plugin.call(this, [folder], {
      annotation: options.annotation,
    });
  }

  build() {
    var _this = this;
    // build content folder if it doesnt exist
    if (!existsSync(join(this.outputPath, this.options.contentFolder))) {
      mkdirp.sync(join(this.outputPath, this.options.contentFolder));
    }

    // build the tree of MD files
    const paths = walkSync(this.inputPaths);

    const mdFiles = paths.filter(path => extname(path) === '.md');

    const fileData = mdFiles.map(path => ({
      path,
      content: readFileSync(join(this.options.folder, path)),
    })).map(file => assign({}, {
      path: file.path,
    }, yamlFront.loadFront(file.content)));

    let attributes = Array.from(
      new Set(
        fileData.map(data => Object.keys(data)).reduce(
          (a, b) => a.concat(b)
        ), []
      )
    );

    this.contentSerializer = new Serializer('content', {
      id: 'path',
      attributes: attributes,
      keyForAttribute(attr) {
        switch (attr) {
          case '__content':
            return 'content';
          default:
            return _this._camelCaseToDash(attr);
        }
      },
    });

    if (!existsSync(join(this.outputPath, this.options.contentFolder))) {
      mkdirp.sync(join(this.outputPath, this.options.contentFolder));
    }

    fileData.forEach((file) => {
      const directory = dirname(join(this.outputPath, this.options.contentFolder, file.path));
      if (!existsSync(directory)) {
        mkdirp.sync(dirname(join(this.outputPath, this.options.contentFolder, file.path)));
      }

      const serialized = this.contentSerializer.serialize(file);

      writeFileSync(
        join(
          this.outputPath,
          this.options.contentFolder,
          `${join(dirname(file.path), basename(file.path, '.md'))}.json`
        ),
        JSON.stringify(serialized)
      );
    });

    const all = fileData.map((file) => {
      const directory = dirname(join(this.outputPath, this.options.contentFolder, file.path));
      if (!existsSync(directory)) {
        mkdirp.sync(dirname(join(this.outputPath, this.options.contentFolder, file.path)));
      }

      return this.contentSerializer.serialize(file).data;
    });

    writeFileSync(
      join(
        this.outputPath,
        `${this.options.contentFolder}.json`,
      ),
      JSON.stringify({data: all})
    );
    this._introspectionInfoFor(attributes);
    this._informDeveloper();
  }

  _camelCaseToDash(str) {
    return str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();
  }

  _introspectionInfoFor(attributes) {
    if(!this.options.shutUp) {
      console.log(
        `<ember-cli-markdown-as-json> Attributes found in .md files: ${attributes.filter(i => i !== '__content').sort()}`
      );
    }
    writeFileSync(
      join(
        this.outputPath,
        `introspection.json`,
      ),
      JSON.stringify({attributes})
    );
  }

  _informDeveloper() {
    if(!this.options.shutUp) {
      console.log(
        `<ember-cli-markdown-as-json> Markdown files found under specified folder can be fetched on: /${this.options.contentFolder}.json`
      );
      console.log(
        '<ember-cli-markdown-as-json> Model is built based on the `attribute` option you gave in the config (otherwise default are used)'
      );
      console.log(
        '<ember-cli-markdown-as-json> Model properties are exposed here: : /introspection.json}'
      );
      console.log(
        '<ember-cli-markdown-as-json> However, nothing of those need to be manually fetched as this addon creates the model and adapter automatically.'
      );
      console.log(
        '<ember-cli-markdown-as-json> Listed here for debugging purposes'
      );
      console.log(
        "<ember-cli-markdown-as-json> Oh and btw if you want me to shut up, just add `shutUp: true` in the addon's config."
      );
    }
  }

}

module.exports = BroccoliStaticSiteJson;
