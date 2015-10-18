(ns swnd.views
  (:require [re-frame.core :as rf]))

(defn trigger
  [cx cy r]
  [:circle {:cx cx :cy cy :r r
            :on-mouse-enter #(rf/dispatch [:try-move-on])
            :on-mouse-leave #(rf/dispatch [:try-move-on-cancel])}])

(defn handle
  []
  (let [radius (rf/subscribe [:trigger-radius])]
    (fn []
      [:svg
       [trigger 100 100 @radius]])))

(defn main
  []
  [:div.main
   [handle]])
