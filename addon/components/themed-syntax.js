import Ember from 'ember';
import layout from '../templates/components/themed-syntax';
import computed, { alias, equal } from 'ember-computed-decorators';

const {
  run,
  get,
  set
} = Ember;
const { schedule } = run;

// Credit: @OverZealous
const highlight = window.codeHighlightLinenums;

/**
  A styled code highlighting component

  @class ThemedSyntax
  @extends Ember Component
  @public
*/

export default Ember.Component.extend({
  layout,
  tagName: 'pre',
  classNames: ['themed-syntax'],
  classNameBindings: ['_theme', 'transparent:transparent'],

  /**
    Define CSS scope

    @property theme
    @type String
    @default light
    @public
  */
  theme: 'light',

  /**
    Compute class name from theme option provided

    @property _theme
    @type String
    @private
  */
  @computed('theme')
  _theme(theme) {
    let defaults = {
      dark: 'hybrid',
      light: 'github-gist'
    };
    return defaults.hasOwnProperty(theme) ? defaults[theme] : theme;
  },

  /**
    Signal if theme is set to dark,
    bound to dark class (so that line numbers will be styled accordingly)

    @property dark
    @type Boolean
    @private
  */
  @equal('theme', 'dark') isDark,

  /**
    Signal if the container should be transparent (background color set to none)

    @property transparent
    @type Bool
    @default false
    @public
  */
  transparent: false,

  /**
    Syntax language

    @property lang
    @type String
    @default html
    @public
  */
  lang: 'html',

  /**
   Signal if line numbers should be excluded

   @property withLineNumbers
   @type Boolean
   @default true
   @public
  */
  withLineNumbers: true,

  /**
    Adds a line break to beginning and end of each block

    @property withBuffers
    @type Boolean
    @default true
    @public
  */
  withBuffers: true,

  /**
    Common alias for language

    @property language
    @type String
    @private
  */
  @alias('lang') language,

  /**
    Convert raw block to highlighted block

    @method _highlight
    @private
  */
  _highlight() {
    let lang = get(this, 'lang');

    schedule('afterRender', () => {
      // Get raw txt
      let raw = `${this.$().find('.code').text().trim()}`;
      raw = get(this, 'withBuffers') ? `\n${raw}\n` : raw;
      let numbers = get(this, 'withLineNumbers');

      // Syntax instance
      let syntax = highlight(raw, {
        hljs,
        lang,
        start: Number(numbers)
      });

      // Output formatted
      set(this, 'code', syntax);
    });

  },
  init() {
    // Update from didinitattrs http://emberjs.com/deprecations/v2.x/#toc_ember-component-didinitattrs
    this._super(...arguments);
    this._highlight();
  }
});
