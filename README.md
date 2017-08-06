# ember-themed-syntax

An out-of-the-box solution for syntax highlighting with a couple of themes included

## Installation

* `ember install ember-themed-syntax`

## Demo and Documentation

http://demos.evolutionaryapps.com/EmberThemedSyntax

## Usage

The following params are accepted

  - `lang`: *default **html*** - The coding language inside the block
  - `theme`: *default **light*** - Your theme selection
  - `transparent`: *default **false*** - When set to true, a background color will not be applied
  - `withBuffers`: *default **true*** - Adds a line break to beginning and end of each block

Template

    {{#themed-syntax lang="htmlbars" theme="dark"}}
      {{! Some code }}
    {{/themed-syntax}}
    
The default theme is set to light

	{{#themed-syntax lang="htmlbars"}}
  	  {{! Some code }}
	{{/themed-syntax}}
