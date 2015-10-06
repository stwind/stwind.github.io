(ns swnd.dev
  (:require [weasel.repl :as repl]
            [swnd.core :as core]))

(when-not (repl/alive?)
  (repl/connect "ws://localhost:9001"))

(core/init)
