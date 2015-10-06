(ns swnd.views
  (:require [re-frame.core :as re-frame]))

(defn main
  []
  (let [name (re-frame/subscribe [:name])]
    (fn []
      [:div "hello"])))
