(ns swnd.css
  (:require [garden.def :refer [defstyles defrule]]))

(defrule body :body)
(defrule lists :ul :ol)
(defrule links :a)

(defstyles screen
  [:html :body {:height "100%"}]

  [:html {:font-size "62.5%"}]  

  (body
   {:font-size "1.2em"
    :line-height 1.5
    :font-family "monospace, \"Helvetica Neue\", Helvetica, Arial, sans-serif"
    :background-color "#f7f7f7"
    :color "#191919"})

  (lists
   {:list-style "none"
    :margin 0
    :padding 0})

  (links {:color "#ffffff"})
  
  [:#pre :#app {:transform-style "preserve-3d"
                :height "100%"}]

  [:#msg {:position "relative"
          :top "50%"
          :transform "translateY(-50%)"
          :text-align "center"}]
  
  [:#app 
   [:.main {:width "100%"
            :height "100%"
            :position "relative"}]
   [:.panel {:position "absolute"
             :top 0
             :left 0}]
   [:.diary {:position "relative"
             :top "40%"
             :transform "translateY(-50%)"}
    [:.diary-inner {:width "300px"
                    :margin "0 auto"}]
    [:.diary-date {:margin-bottom "1em"}]]])
