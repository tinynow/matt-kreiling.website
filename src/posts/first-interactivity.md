---
title: How quickly we need JavaScript frameworks
description: Third day and I want to make a button click do something
date: 2022-05-05
tags:
    - developing in the open
layout: layouts/post.njk
---

For no virtuous reason, I avoided JavaScript for the first few years of my web development career.

Now, I avoid it for more virtuous reasons.

But I wanted to be able to set up a little [kitchen sink](/kitchen-sink) that also demoed the colors in the design system. I wanted each color to have a button that would change the background color.

I know I could code up something in vanilla JS, or I could use Vue, the framework I know very well. Or I could use something else. I opted for [Alpine.js](https://alpinejs.dev/) as it is very light weight and gives me what I want, a reactive state and simple declarative event bindings. It took me about 10 minutes with to make the functionality work. I made only one mistake, which was to set the state on the wrong element. Alpine.js reads special attributes on your HTML called directives. One of them is the `x-data` directive that creates a reactive state based on an object you pass it. Another the `x-bind` directive lets you control HTML attribute values like `class` by adding them after a colon like so: `x-bind:class`.

This is how the I set up a div so that the color and background color can be set dynamically.

```html
<div
    class="kitchen-sink"
    x-data="{ bgColor: 'inherit', color: 'inherit' }"
    x-bind:class="`bg--${bgColor} color--${color}`"
></div>
```

The list of colors looks like this:
{% raw %}

```html
<ul>
    {% for name, color in tokens.palette %}
    <li style="color: var(--{{ name }});">
        {{ name }}: {{ color }}
        <button x-on:click="bgColor = '{{ name }}'">Set as background</button>
        <button x-on:click="color = '{{ name }}'">Set as text</button>
    </li>
    {% endfor %}
</ul>
```

{% endraw %}

The stuff in double brackets or in the bracket and percent signs ({% raw %}`{%`, `%}`{% endraw %}) is Nunjucks, a server side templating language.

There are a lot more things to share about Nunjucks and how I passed the colors into the CSS and created the classes to set the colors.

## Release notes

- [A kitchen sink](/kitchen-sink)
- It has some buttons that change the background color of different parts of the page
- Alpine.js is as advertised very easy to use
- [Design tokens in 11ty are easy](https://heydonworks.com/article/design-tokens-in-eleventy/)
