(ns swnd.core
  (:require [weasel.repl :as repl]
            [reagent.core :as reagent]
            [re-frame.core :as re-frame]
            [swnd.handlers]
            [swnd.subs]
            [swnd.routes :as routes]
            [swnd.views :as views]))

(when-not (repl/alive?)
  (repl/connect "ws://localhost:9001"))

(enable-console-print!)

(defn render []
  (re-frame/dispatch [:initialize-db])
  (reagent/render [views/main]
                  (.getElementById js/document "app")))

(defn ^:export init
  []
  (routes/app-routes)
  (re-frame/dispatch-sync [:initialize-db])
  (render))
