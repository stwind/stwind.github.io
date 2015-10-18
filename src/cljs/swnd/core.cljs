(ns swnd.core
  (:require [reagent.core :as r]
            [re-frame.core :as rf]
            [swnd.handlers]
            [swnd.subs]
            [swnd.routes :as routes]
            [swnd.views :as views]))

(enable-console-print!)

(defn render []
  (r/render [#'views/main] (.getElementById js/document "app")))

(defn ^:export init
  []
  ;; (routes/app-routes)
  (rf/dispatch-sync [:initialize-db])
  (render))
