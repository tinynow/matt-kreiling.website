---
title: One month of developing in the open
description: Even with the massive amount of yak-shaving and bike-shedding, things are getting shipped.
date: 2022-05-25
updated: 2022-05-30
tags:
    - developing in the open
layout: layouts/post.njk
---

I decided to begin developing in the open because I couldn't tolerate my awful pattern of starting and never shipping. Developing in the open is a tech term for not giving a crap about quality while you build your website. Shipping is a tech term for finishing something you started.

Here are some of the insights and accomplishments that have blessed me after one month of this process.

- I published five posts if you count this one
- Rabbit holes still exist, and I am still diving down them, but there is a certain point where I am turning back. In my graveyard of previous ~~side~~ projects, the rabbit holes led to dead ends and often led me to abandon the project.
- My writing quality is poor in these posts, I plan on going back to them and adding an updated date. As someone who was a writing major before learning web development, I feel shame at the lack of focus, concision, and narrative flow.
- The posts have been more helpful to me than I had thought they would.
    - They are revealing aspects of why I haven't shipped side projects as I wanted to. I have always needed to negotiate with my tendency to procrastinate. For better or worse, I have come to value the benefits that procrastination has provided me, including perfectionism and the general value of doing nothing. Keeping this reality up front has been helpful so that I can honor the need to understand the problem space deeply, without becoming paralyzed.
    - They are reminding me of the amount of work I have done. Each post doesn't even cover all the research, thinking, and coding I have done. It is truly surprising to me how much I am doing, but at the same time it is understandable - because all those dead-end rabbit holes actually left me with useful knowledge and sometimes code that I can use in this project.
- Even with no real audience (I've told only a couple of people. And maybe one post on Twitter where I have almost not followers), I am motivated by the idea of publishing for them. Thank you audience. It is your support that keeps me going.
- It is just generally satisfying to publish. Seeing stuff you made at an actual URL on the world wide web doesn't seem to get old.
- I need a better editorial process, but one that doesn't slow me down too much.
- I have much more to say than I imagined. Just documenting the rabbit holes is enough to keep me in posts forever.
- I am providing myself some evidence that I really do know how to make a website and that I'm actually pretty amazing at it. Impostor syndrome is real and it seems ridiculous that it still effects me 12 years in. This process is a really good counter to those "not good enough" thoughts and feelings.

## Release notes

- Continued development of a color system. Initial development of some programmatic generation of shades from initial colors.
- Rabbit holes on how tokens should be structured. Took another look at [style-dictionary](https://amzn.github.io/style-dictionary/#/). I had decided not to take on dependencies easily. I understand that complexity exists, but I don't want to introduce anything that causes more pain that it solves. I've structured the tokens in a really weird way, mainly to provide hue,saturation, and lightness values separately.
- Bike-shedding on where color functions should go, where calculations should be made.
- A recognition that although Nunjucks and server side templating is working, the code is a little unorganized. Without a better system, things could become painful to manage.
    - Nunjucks is generating CSS variables and utilities out of tokens. This is ok as long as I can set it and forget it. Otherwise, it is a little unwieldy because the .njk file doesn't provide the syntax highlighting, intellisense, or auto-completion it would if it were in a .css or .scss.
    - Nunjucks is setting the styles on the swatches for the color tool in the kitchen sink.
    - Nunjucks has partials, but not a robust component system. Even Zach Leatherman and Netlify integrated Vue with 11ty to deal with these shortcomings.
- CSS organization, related to the component story, is something I am coming up against. Thus far, I've been editing the index.css file and generating utilities and variables in theme.njk.
