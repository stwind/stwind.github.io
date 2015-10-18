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

(defn progress
  [chan]
  (go-loop []
    (when-let [t (<! chan)]
      (rf/dispatch [:maybe-progress t])
      (recur))))

(rf/register-handler
 :initialize-db
 (fn [_ _]
   db/default-db))

(rf/register-handler
 :try-move-on
 (fn [db _]
   (case (db/state db)
     :idle
     (do
       (when-let [timer (db/trigger-timer db)]
         (close! timer))
       (let [chan (tween (db/trigger-step db) 1 (db/trigger-time db true))]
         (progress chan)
         (db/trigger-timer db chan)))
     db)))

(rf/register-handler
 :try-move-on-cancel
 (fn [db _]
   (case (db/state db)
     :idle
     (do
       (when-let [timer (db/trigger-timer db)]
         (close! timer))
       (let [chan (tween (db/trigger-step db) 0 (db/trigger-time db false))]
         (progress chan)
         (db/trigger-timer db chan)))
     db)))

(rf/register-handler
 :maybe-progress
 (fn [db [_ t]]
   (db/trigger-step db t)))
