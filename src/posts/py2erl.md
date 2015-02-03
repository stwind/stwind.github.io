---
title: Porting things from Python to Erlang
time: 2014-01-21T10:06:32+08:00
---

Few days earlier I wanted to write a Erlang cli tool for the project I am working on. I wrote [one](https://github.com/stwind/ecli) few months ago. It just works, but I want to to be a truely universal lib that I can reuse with ease in future projects. Then I found [docopt](http://docopt.org/) and got so excited about it that I immediately decide to write an Erlang port for it. 

After spent few days working on it, I suddenly figure out there must be someone did this before. And true, there is [docopt-erl](https://github.com/plux/docopt-erl). It is done so great that I would better contribute to it rather than reinventing another.

Anyway I still learn something by poring things from one language to another:

[readmore]: #dirty-first-refractor-later

### Dirty first, refractor later

Erlang code can be very concise, which I am always fascinated of. But I had many frustrations when porting Python code to Erlang, because I always tried to rewrite the logic in Erlang way while not fully understanding the whole picture in Python. This pain was more obvious when one languge is iterative while another is functional.

So yeah, just do dirty and refractor later.
