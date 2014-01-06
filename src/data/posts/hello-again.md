---
title: Hello Again
name: hello-again
time: 2014-01-06T12:50:46+08:00
---
Anyway, this is my new site [Antagonista](http://stwind.github.io/) (did I just said that like I had an old one?). Now here will be the place for me to put my thoughts, memos, photos and experiments. It was a lot of fun to build a static site that is hosted on [Github](http://pages.github.com/) and using all those awesome [node.js](http://nodejs.org/) tools (I'll explain them later).


## An Identity Crisis

Another reason I need a site like this is because I have something like an identity crisis. I am kind of difficult answering questions like __what do you do__ in this era. I read a lot and think a lot, I see myself in a lot of things, but it seems that I just can not combine them together to be an unity. This is site is my another try, hope it works.

[readmore]: #the-making-of-antagonista

## The Making of Antagonista

### Static Site Generator

Since I want to do it like a real front-end project, I prefer a pure javescript workflow to something ruby-based like [Jekyll](http://jekyllrb.com/). With some googling I found this [summarization](http://www.mzlinux.org/?q=node/415), and by looking around the candidates I decided to give [wintersmith](http://wintersmith.io/) a try.

Wintersmith is ok, but it is not quite [grunt](http://gruntjs.com/) aware, sometime I had to reimplement some grunt-tasks like compressing and concatenating. After some frustrations I began to find another solution.

Then I found the awesome [assemble](http://assemble.io/), which is exactly built for grunt. It is highly customizable and only focusing on generating html however you want, leaving other js and css tasks back to other grunt. Perfect!

### Markdown

Another `thing` I want is being able to write using markdown, who dosen't? Assemble [supports](http://assemble.io/docs/Markdown.html) markdown by utilizing [marked](https://github.com/chjj/marked), nothing much to worry about.

One thing I like about [octopress](http://octopress.org/) is the [blogging rake tasks](http://octopress.org/docs/blogging/). Still not a big deal with grunt, actually it is just a `grunt new-post` I have to implement.

### Font-end Libraries

Here is the `bower.json` at the moment of writing:

```javascript
{
  "name": "antagonista",
  "version": "0.0.1",
  "dependencies": {
    "requirejs": "~2.1.8",
    "jquery": "~2.0.3",
    "backbone": "~1.1.0",
    "underscore": "~1.5.1",
    "normalize-css": "~2.1.3",
    "layoutmanager": "~0.9.2",
    "loglevel": "~0.5.0",
    "handlebars": "~1.1.2"
  },
  "devDependencies": {}
}
```

### Deployment

Again I got much inspiration from octopress' [branching](http://octopress.org/docs/deploying/github/). I'll just have a `source` branch for source code and commit final files to `master` branch for serving.

There are two tasks I have to implement:

* `grunt setup`: setup the `dist/` folder for final stuffs in `master` branch.
* `grunt deploy`: push updates to `master`