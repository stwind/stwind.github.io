(ns swnd.views
  (:require [re-frame.core :as rf]))

(defn locus
  []
  (let [radius (rf/subscribe [:locus-radius])]
    (fn []
      [:svg
       [:circle {:cx 100 :cy 100 :r @radius
                 :on-mouse-enter #(rf/dispatch [:move-on-maybe])
                 :on-mouse-leave #(rf/dispatch [:move-on-cancel])}]])))

(defn main
  []
  [:div.main
   [locus]])
