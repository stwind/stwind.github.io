(ns ^:figwheel-no-load swnd.dev
  (:require [weasel.repl :as repl]
            [swnd.core :as core]))

(when-not (repl/alive?)
  (repl/connect "ws://localhost:9001"))

(enable-console-print!)

(let [pre (.-pre js/window)]
  (.stop pre core/init))
