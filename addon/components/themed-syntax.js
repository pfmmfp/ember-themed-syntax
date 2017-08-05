import Ember from 'ember';
import layout from '../templates/components/themed-syntax';
import trimRight from 'ember-themed-syntax/-private/trim-right';
import { computed } from 'ember-decorators/object';
import { equal } from 'ember-decorators/object/computed';

const {
  Component,
  get,
  set
} = Ember;

// Credit: @OverZealous - https://github.com/OverZealous/code-highlight-linenums
const highlight = window.codeHighlightLinenums;

/**
  A styled code highlighting component

  @class ThemedSyntax
  @extends Ember Component
  @public
*/
export default Component.extend({
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
    @default false
    @private
  */
  @equal('theme', 'dark') isDark: false,

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
    Convert raw block to highlighted block using HighlightJS

    @method _highlight
    @private
  */
  _highlight() {
    // Get syntax language
    let lang = get(this, 'lang');

    // Get the trimmed/buffered raw text
    let raw = `${this.$().find('.code').text()}`;
    raw = trimRight(raw);
    if (get(this, 'withBuffers')) {
      raw = `\n${raw}\n`;
    }

    // Two valid line number states
    //    0: do not show line numbers
    //    1: show line numbers starting at Line 1
    let start = get(this, 'withLineNumbers') | 0;

    // Syntax instance
    let syntax = highlight(raw, {
      hljs,
      lang,
      start
    });

    // Output formatted
    set(this, 'code', syntax);
  },

  didInsertElement() {
    this._super(...arguments);

    this._highlight();
  }
});
