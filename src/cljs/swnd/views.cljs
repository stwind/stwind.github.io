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
      (let [x (:x @exit-point)
            y (:y @exit-point)]
        [:g
         [:text {:x x :y y :font-size 10} (:char @exit-point)]
         [:circle {:cx (+ x 5) :cy (- y 4) ;; FIX
                   :r @radius :stroke @exit-color
                   :fill @exit-color :fill-opacity 0
                   :on-mouse-enter (fn [e]
                                     (.preventDefault e)
                                     (rf/dispatch [:try-go-up]))
                   :on-mouse-leave (fn [e]
                                     (.preventDefault e)
                                     (rf/dispatch [:try-go-down]))
                   :on-touch-start (fn [e]
                                     (.preventDefault e)
                                     (rf/dispatch [:try-go-up]))
                   :on-touch-end (fn [e]
                                   (.preventDefault e)
                                   (rf/dispatch [:try-go-down]))
                   }]]))))

(defn trail
  []
  (let [trail (rf/subscribe [:trail])]
    (fn []
      [:g
       (for [{:keys [x y char]} @trail]
         ^{:key (str x ":" y)}
         [:text {:x x :y y :font-size 10} char])])))

(defn svg
  []
  (let [viewport (rf/subscribe [:viewport])]
    (fn []
      (if (= (:width viewport) 0)
        nil
        [:svg.panel {:width (:width @viewport)
                     :height (:height @viewport)}
         [trail]
         [exit]]))))

(defn diary-date
  [date]
  [:div.diary-date date])

(defn diary-text
  [text]
  [:div.diary-text text])

(defn diary
  []
  (let [diary (rf/subscribe [:diary])]
    (fn []
      [:div.diary
       [:div.diary-inner
        [diary-date (:date @diary)]
        [diary-text (:text @diary)]]])))

(defn main
  []
  (r/create-class
   {:component-did-mount
    (fn [comp]
      (let [node (r/dom-node comp)
            width (.-clientWidth node)
            height (.-clientHeight node)]
        (rf/dispatch [:app-mounted width height])))
    
    :reagent-render
    (fn []
      [:div.main
       [diary]
       [svg]])}))
