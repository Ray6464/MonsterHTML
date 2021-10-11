# Monster HTML
A compiler for Monster HTML, formerly known as PHTML aka Powerfull-HTML and informally known as HTMLX (as in Xtreme) is a templating markup framework which allows writting code within HTML to run at compile-time and modify the final product. In Many ways Monster HTML a very advanced HTML.

The file use the '.phtml' extention, and are compiled to a '.html' file.

# Installation
To install the Monster HTML Compiler use:
`npm i monsterhtml -g`

Or install it as a development dependency.

# Usage
To compile a `.phtml` file to a `.html` file use:
`monsterhtml -f /path/to/file.phtml`

# Features
1. Built in engine to run code at compile time.
2. Smaller end files then other industry-standard (outdated and bloated) frameworks.
3. Built in CSS like styling engine to run styling code at compile time.
4. Bootstrap like UI/UX library with a large collection of objects.
5. Suggest more features by contacting directly: rayvanet@gmail.com

# Monster HTML Syntax

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title> {{ project.title }} </title>
</head>
<body>
	<header
	  sticky=true
	  linear-gradient-color1="#00000000"
	  linear-gradient-color2="#eeeeeeee"
	  gradient-direction="top-down"
	  chevron-icon-right=true
	  home-icon-right=true>
	  <brand-logo sticky=true href="/path/to/brand-logo"></brand-logo>
	  <website-name>  {{ project.title }} </website-name>
	</header>
	<leftside></leftside>
	<main>
	  <article></article>
	  <
	</main>
	<riteside></riteside>
	<footer
	  sticky=true
	  linear-gradient-color1="#00000000"
	  linear-gradient-color2="#eeeeeeee"
	  gradient-direction="top-down">
	  <p>&copy; Ray Voice</p>
	</footer>
</body>
</html>
```

## Include (Attribute)
  All elements have a `include` attribute which works like a `href` attribute. This can be used to import the `innerHTML`, `attributes`, etc. for that element from an external file. If the name of the element does not match the name of the included element then the name of the included element takes precedence. Similarly, the content of the included element will completely overwrite the content of the existing element.

  If you have configured an element's external file url in the `monsterHTML.config` file then you can just use `include=true` to that element import it.

## Body
  Defaults for Monster HTML
```
position:relative;
```

## Header
  The header element works just like the regular HTML5 header, but has a few extra styling attributes.
### Options
  ```
  sticky=true                        (default)
  linear-gradient-color1="#00000000" (default)
  linear-gradient-color2="#eeeeeeee"
  gradient-direction="top-down"      (default)
  chevron-icon-right=false           (default)
  home-icon-right=true               (default)
  ```

### brand-logo options
```
  sticky=true                        (default)
  href="./brand-logo.svg"            (default)
```

### website-name

## Leftside

## Rightside

## Main
All the unique page content goes inside the `<main>` n, site logos, and search forms.

Note: There must not be more than one <main> element in a document. The <main> element must NOT be a descendant of an <article>, <aside>, <footer>, <header>, or <nav> element.


## Footer
  The header element works just like the regular HTML5 header, but has a few extra styling attributes.

### CSS
```
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
```

### Options
  ```
  sticky=false                       (default)
  linear-gradient-color1="#00000000"
  linear-gradient-color2="#eeeeeeee" (default)
  gradient-direction="top-down"      (default)
  ```

## Article

## Import Directives

## Variables

## Conditionals

## Loops




# License
MIT License

Copyright (c) 2021 Ray Voice

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
