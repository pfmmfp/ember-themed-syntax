/* eslint-env node */
'use strict';

module.exports = {
  name: 'ember-themed-syntax',

  init(app) {
    this._super.init && this._super.init.apply(this, arguments);

    this.options = this.options || {};
    this.options.babel = this.options.babel || {};
    this.options.babel.plugins = this.options.babel.plugins || [];

    if (this.options.babel.plugins.indexOf('transform-decorators-legacy') === -1) {
      this.options.babel.plugins.push('transform-decorators-legacy');
    }

    if (this.options.babel.plugins.indexOf('transform-class-properties') === -1) {
      this.options.babel.plugins.push('transform-class-properties');
    }
  },

  included(app, parentAddon) {
    // See: https://github.com/ember-cli/ember-cli/issues/3718
    if (typeof app.import !== 'function' && app.app) {
      this.app = app = app.app;
    }

    this._super.included.apply(this, arguments);

    let target = parentAddon || app;

    // TODO: make each theme optional
    // var options = target.options.emberThemedSyntax || {};

    target.import(target.bowerDirectory + "/highlightjs/highlight.pack.min.js");
    target.import(target.bowerDirectory + "/code-highlight-linenums/code-highlight-linenums.js");
    // Just borrow some default styles
    target.import(target.bowerDirectory + "/hljs-themes/themes/dist/github-gist.min.css");
    target.import(target.bowerDirectory + "/hljs-themes/themes/dist/hybrid.min.css");
    target.import(target.bowerDirectory + "/hljs-themes/themes/dist/line-numbers.min.css");
  }
};
