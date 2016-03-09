import Ember from 'ember';
import layout from '../templates/components/themed-syntax';
import computed, { alias } from 'ember-computed-decorators';

const { run } = Ember;
const { schedule } = run;

//Credit: @OverZealous
const highlight = window.codeHighlightLinenums;

export default Ember.Component.extend({
  layout,
  tagName: 'pre',
  classNames: ['hljs'],
  classNameBindings: ['_theme', 'transparent:transparent'],

  /**
    Define CSS scope

    @property theme
    @returns String
    @public
  */
  theme: 'light',

  @computed('theme')
  _theme(theme) {
    let defaults = {
      dark: 'hybrid',
      light: 'github-gist'
    };
    this.set('dark', theme === 'dark');
    return defaults.hasOwnProperty(theme) ? defaults[theme] : theme;
  },

  /**

  */
  transparent: false,


  /**
    Syntax language

    @property lang
    @returns String
    @public
  */
  lang: 'html',

  /**
   Signal if line numbers should be excluded

   @property withLineNumbers
   @returns Boolean
   @default true
   @public
  */
  withLineNumbers: true,

  /**
    Common alias for language

    @property language
    @returns String
  */
  @alias('lang') language,

  /**
    Convert raw block to highlighted block

    @method _highlight
    @private
  */
  _highlight() {
    let lang = this.get('lang');

    schedule('afterRender', () => {
      //Get raw txt
      let raw = `\n${this.$().find('.code').text().trim()}\n`;
      let numbers = this.get('withLineNumbers');

      //Syntax instance
      let syntax = highlight(raw, {
          hljs: hljs,
          lang: lang,
          start: Number(numbers),
      });

      //output formatted
      this.set('code', syntax);
    });

  },
  didInitAttrs() {
    this._highlight();
  }
});
