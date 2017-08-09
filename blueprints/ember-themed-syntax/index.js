/* eslint-env node */
module.exports = {
  description: 'Install NPM dependencies',

	normalizeEntityName() {
		// this prevents an error when the entityName is
		// not specified (since that doesn't actually matter
		// to us
	},

	afterInstall() {
    return this.addPackagesToProject([
      { name: 'highlightjs', target: '^9.10.0' },
      { name: 'code-highlight-linenums', target: '^0.2.1' },
      { name: 'hljs-themes', target: '^1.0.0' }
    ]);
	}
};
