(ns swnd.views
  (:require [reagent.core :as r]
            [re-frame.core :as rf]
            [bardo.ease :refer [wrap ease shift clamp]]
            [bardo.interpolate :refer 
             [interpolate into-lazy-seq mix blend chain pipeline]]
            [bardo.transition :refer [transition]]
            [goog.string :as gstr]
            [goog.string.format]))

(defn trigger
  []
  (let [step (rf/subscribe [:trigger-step])]
    (fn []
      (let [r ((interpolate 10 50) @step)]
        [:circle {:cx 100 :cy 100 :r r
                  :on-mouse-enter #(rf/dispatch [:try-move-on])
                  :on-mouse-leave #(rf/dispatch [:try-move-on-cancel])}]))))

(defn handle
  []
  [:svg
   [trigger]])

(defn main
  []
  (r/create-class
   {:component-did-mount
    (fn [comp]
      (let [node (r/dom-node comp)
            width (.-clientWidth node)
            height (.-clientHeight node)]
        (rf/dispatch [:app-mounted width height])))
    
    :display-name "main"
    
    :reagent-render
    (fn []
      [:div.main
       [handle]])}))
