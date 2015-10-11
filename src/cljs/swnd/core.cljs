(ns swnd.core
  (:require [reagent.core :as reagent]
            [re-frame.core :as re-frame]
            [swnd.handlers]
            [swnd.subs]
            [swnd.routes :as routes]
            [swnd.views :as views]))

(defn render []
  (re-frame/dispatch [:initialize-db])
  (reagent/render-component [views/main]
                            (.getElementById js/document "app")))

(defn ^:export init
  []
  ;; (routes/app-routes)
  (re-frame/dispatch-sync [:initialize-db])
  (render))
