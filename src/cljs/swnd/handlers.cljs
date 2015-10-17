(ns swnd.handlers
  (:require-macros [cljs.core.async.macros :refer [go go-loop]])
  (:require [re-frame.core :as rf]
            [swnd.db :as db]
            [cljs.core.async :as async
             :refer [<! >! chan close! put! alts!]]
            [bardo.ease :refer [wrap ease shift clamp]]
            [bardo.interpolate :refer [interpolate into-lazy-seq mix blend chain pipeline]]
            [bardo.transition :refer [transition]]))

(defn tween
  ([duration] (tween 0 1 duration))
  ([start end duration] (tween start end duration :linear))
  ([start end duration easing]
   (transition start end {:duration duration :easing easing})))

(rf/register-handler
 :initialize-db
 (fn [_ _]
   db/default-db))

(rf/register-handler
 :move-on-maybe
 (fn [db _]
   (when-let [timer (db/locus-timer db)]
     (close! timer))
   (let [chan (tween (db/locus-step db) 1 (db/locus-forward-time db))]
     (go-loop []
       (when-let [t (<! chan)]
         (rf/dispatch [:move-on-waiting t])
         (recur)))
     (db/locus-timer db chan))))

(rf/register-handler
 :move-on-waiting
 (fn [db [_ t]]
   (db/set-locus-step db t)))

(rf/register-handler
 :move-on-cancel
 (fn [db _]
   (when-let [timer (db/locus-timer db)]
     (close! timer))
   (let [chan (tween (db/locus-step db) 0 (db/locus-backword-time db))]
     (go-loop []
       (when-let [t (<! chan)]
         (rf/dispatch [:move-on-waiting t])
         (recur)))
     (db/locus-timer db chan))))
