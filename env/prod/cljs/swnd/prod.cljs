(ns swnd.prod
  (:require [swnd.core :as core]))

(let [pre (.-pre js/window)]
  (.stop pre core/init))
