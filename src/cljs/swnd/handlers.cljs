(ns swnd.handlers
  (:require-macros [cljs.core.async.macros :refer [go go-loop]])
  (:require [re-frame.core :as rf]
            [swnd.db :as db]
            [cljs.core.async :as async :refer [<! >! chan close! put! alts!]]
            [bardo.ease :refer [wrap ease shift clamp]]
            [bardo.interpolate :refer [interpolate into-lazy-seq mix blend chain pipeline]]
            [bardo.transition :refer [transition]]))

(rf/register-handler 
 :initialize-db 
 (constantly db/default-db))

(rf/register-handler
 :app-mounted
 (fn [db [_ width height]]
   (-> db
       (db/viewport [width height])
       (db/trail-next))))

(defn update-entropy-on-trans
  [db]
  (let [chan (db/trans-timer db)]
   (go-loop []
     (when-let [t (<! chan)]
       (rf/dispatch [:update-entropy t])
       (recur)))
   db))

(rf/register-handler
 :try-go-up
 (fn [db _]
   (case (db/state db)
     (:stable :up :down)
     (-> db
         db/go-up
         update-entropy-on-trans)
     db)))

(rf/register-handler
 :try-go-down
 (fn [db _]
   (case (db/state db)
     (:stable :up :down)
     (-> db
         db/go-down
         update-entropy-on-trans)
     db)))

(rf/register-handler
 :update-entropy
 (fn [db [_ t]]
   (condp = t
     1 (do
         (rf/dispatch [:go-next])
         (db/entropy db 0))
     (db/entropy db t))))

(rf/register-handler
 :go-next
 (fn [db _]
   (-> db
       db/trail-next
       db/diary-next)))
