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

(defn app-mounted
  [db [_ width height]]
  (db/set-dimension db width height))

(defn progress
  [chan]
  (go-loop []
    (when-let [t (<! chan)]
      (rf/dispatch [:update-try-progress t])
      (recur))))

(defn try-move-on
  [db _]
  (case (db/state db)
    :idle
    (do
      (when-let [timer (db/trigger-timer db)]
        (close! timer))
      (let [chan (tween (db/trigger-step db) 1 (db/trigger-time db true))]
        (progress chan)
        (db/trigger-timer db chan)))
    db))

(defn try-move-on-cancel
  [db _]
  (case (db/state db)
    :idle
    (do
      (when-let [timer (db/trigger-timer db)]
        (close! timer))
      (let [chan (tween (db/trigger-step db) 0 (db/trigger-time db false))]
        (progress chan)
        (db/trigger-timer db chan)))
    db))

(defn update-try-progress
  [db [_ t]]
  (condp = t
    1 (do
        (rf/dispatch [:move-on])
        (db/trigger-step db t))
    (db/trigger-step db t)))

(defn move-on
  [db _]
  db)

(rf/register-handler :initialize-db (constantly db/default-db))

(rf/register-handler :app-mounted app-mounted)

(rf/register-handler :try-move-on try-move-on)
(rf/register-handler :try-move-on-cancel try-move-on-cancel)

(rf/register-handler :update-try-progress update-try-progress)

(rf/register-handler :move-on move-on)
