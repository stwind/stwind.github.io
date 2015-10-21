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
      [:circle {:cx (:x @exit-point) :cy (:y @exit-point)
                :r @radius :fill @exit-color
                :on-mouse-enter #(rf/dispatch [:try-go-up])
                :on-mouse-leave #(rf/dispatch [:try-go-down])}]
      )))

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
  []
  (let [m (+ 1 (rand-int 11))
        d (+ 1 (rand-int 30))]
    [:div.diary-date (str "2015年" m "月" d "日")]))

(defn diary-text
  [text]
  [:div.diary-text text])

(defn diary
  []
  (let [current-diary (rf/subscribe [:current-diary])]
    (fn []
      [:div.diary
       [:div.diary-inner
        [diary-date]
        [diary-text (:text @current-diary)]]])))

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
