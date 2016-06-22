/*jshint node:true*/
module.exports = {
  description: 'Install bower dependencies',

	normalizeEntityName: function() {
		// this prevents an error when the entityName is
		// not specified (since that doesn't actually matter
		// to us
	},

	afterInstall: function() {
    return this.addBowerPackagesToProject([
      { name: 'highlightjs', target: '^9.4.0' },
      { name: 'code-highlight-linenums', target: '^0.2.0' },
      { name: 'hljs-themes', target: '^0.0.7' }
    ]);
	}
};
