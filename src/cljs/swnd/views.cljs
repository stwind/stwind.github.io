(ns swnd.views
  (:require [reagent.core :as r]
            [re-frame.core :as rf]
            [bardo.ease :refer [wrap ease shift clamp]]
            [bardo.interpolate :refer 
             [interpolate into-lazy-seq mix blend chain pipeline]]
            [swnd.utils :as u]))

(defn trigger
  []
  (let [entropy (rf/subscribe [:entropy])]
    (fn []
      (let [r ((interpolate 10 50) @entropy)
            l ((interpolate 40 60) @entropy)
            s ((interpolate 80 100) @entropy)]
        [:circle {:cx 100 :cy 100 :r r :fill (u/hsl 0 s l)
                  :on-mouse-enter #(rf/dispatch [:try-go-up])
                  :on-mouse-leave #(rf/dispatch [:try-go-down])}]))))

(defn handle
  []
  [:svg
   {:width 640
    :height 480}
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
