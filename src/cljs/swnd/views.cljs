(ns swnd.views
  (:require [reagent.core :as r]
            [re-frame.core :as rf]
            [swnd.utils :as u]))

(defn exit
  []
  (let [exit-point (rf/subscribe [:exit-point])
        radius (rf/subscribe [:exit-radius])
        exit-color (rf/subscribe [:exit-color])]
    (fn []
      (let [[cx cy] @exit-point]
        [:circle {:cx cx :cy cy 
                  :r @radius :fill @exit-color
                  :on-mouse-enter #(rf/dispatch [:try-go-up])
                  :on-mouse-leave #(rf/dispatch [:try-go-down])}]))))

(defn trail
  []
  (let [trail (rf/subscribe [:trail])]
    (fn []
      [:g
       (for [[x y] @trail]
         ^{:key (str x ":" y)}
         [:circle {:cx x :cy y :r 10}])])))

(defn svg
  []
  (let [viewport (rf/subscribe [:viewport])]
    (fn []
      (if (= (:width viewport) 0)
        nil
        [:svg {:width (:width @viewport)
               :height (:height @viewport)}
         [trail]
         [exit]]))))

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
       [svg]])}))
