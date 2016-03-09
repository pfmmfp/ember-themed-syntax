# ember-themed-syntax

An out-of-the-box solution for syntax highlighting with a couple of themes included

## Installation

* `ember install ember-themed-syntax`

## Usage

The following params are accepted

  - `lang`: required, default is **html**
  - `theme`: optional, default is **light**
  - `transparent`: optional, default is **false**


    
Template 
    
    {{#themed-syntax lang="htmlbars" theme="dark"}}
      {{!Some code}}
    {{/themed-syntax}}

The default theme is set to light

	{{#themed-syntax lang="htmlbars"}}
  	  {{!Some code}}
	{{/themed-syntax}}
	
	
	
##Demo & Documentation
<http://demos.evolutionaryapps.com/EmberThemedSyntax>