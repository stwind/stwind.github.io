---
title: The Angularity Is Here
name: angularity
time: 2014-05-22T11:33:10+08:00
layout: node
next: [about,hello-again,infra-p1,py2erl,haskell-do]
---

One thing that I had been keep neglecting is [AngularJS](https://angularjs.org/), because I back then was a [BackboneJS](http://backbonejs.org/) lover, purist of HTML markup, skeptics of MVVM's flexibility, and doubter of the neccessity of another module system rather than [CommonJS](http://wiki.commonjs.org/wiki/CommonJS) or [RequireJS](http://requirejs.org/). One last reason is that if [WebComponents](http://webcomponents.org/) will be ultimate future, why AngularJS now.

## The ngAnimate Mystique

The previous version of [Antagonista](#/n/hello-again) is built with the traditional BackboneJS stack, and I was confused at few decisions like animation and data-binding. Later [React](http://facebook.github.io/react/) joins the scene. It is so prevaling that React can be a subsititude of Backbonejs' View module, so I started to read through its docs. In the chapter of [animation](http://facebook.github.io/react/docs/animation.html), it mentioned that React got its inspiration from AngularJS' [ngAnimate](https://docs.angularjs.org/api/ngAnimate) module. Suddenly I felt that maybe I just misunderstood AngularJS.

## First Impression

So I spent few days to learn about AngularJS, and got quite impressive.

### Clean Separation Of Concerns

Clean separation of concerns. Concepts like providers, services, controllers are quite clear and straightforward, while organically intertwined with each other, achiving very high flexibility. 

The most obvious example is [Forms](https://docs.angularjs.org/guide/forms), one of the most complicated use cases. To achieve different validation requirements and the correspondent visual feedback, Form controlls could soon to be a big mess. But with AngularJS, if you do it right, Forms can be done quite cleanly and elegantly. So beautiful that it feels like magic.

### Testability

The homepage emphasize a lot about testability, and almost every examples in the documentation have correspondent test cases. This occurred to me that how difficult it is do design modularity with testability, remembering the hard time writing test cases with BackboneJS and Requirejs. And I really like [Karma](https://github.com/karma-runner/karma), the side project borne out of AngularJS.

### Asynchronicity

All different components can be combined in a very asynchronous way. Although some builtin services don't implement that thoroughly (like ngAnimate callbacks), but if you really need that, you can still achieve that using low-level API while still being in the AngularJS context.

### Dependency Detection By Argument Names

This is what I felt a little frustrated about at the beginning. I understand convention is important, but program correctness totally depending on it? It means there must be some isoteric parsing behind the scene. But AngularJS dosen't go too far, you can still do everything in a primitive, physical and mechanical js style.

## Declarative Or Iterative

Declaritive programs are always easier for maintenance than iterative ones, but with trade off of flexibility. All the struggle and efforts when designing a framework are actually in search for a reasonable balance.

AngularJS makes me think about the border between these two. CSS and HTML are declarative, JS is iterative. The problem is that this world is scattered asynchronously and indeterministically, look at animation and network communication. Currently callback(reactive) seems to be the only way to wire them together, and callback is inherently iterative. 

We push iterative things to be declarative by abstraction, but most time have to move them back. With AngularJS, you abstract stable things to be [Directives](https://docs.angularjs.org/guide/directive) (declarative), but also remember that you can move them back to be a part of controller (iterative), otherwise you will get youself into a [Controllers](https://docs.angularjs.org/guide/controller) communication hell.

## Embracing The Angularity

Above are just some naive thoughts that occurred to me when remaking Antagonista, guess I have to read the code to dig more into it. Anyway, I am fascinated by the practical amazement of AngularJS, but more stimulated by its design philosophy. 