(ns swnd.db
  (:require [cljs.core.async :as async :refer [<! >! chan close! put! alts!]]
            [bardo.ease :refer [wrap ease shift clamp]]
            [bardo.interpolate :refer 
             [interpolate into-lazy-seq mix blend chain pipeline]]
            [bardo.transition :refer [transition]]))

(def default-db
  {:state :stable
   :entropy 0
   :trans-duration 1000
   :trans-timer nil
   :size {:height 0 :width 0}})

(defn tween
  ([duration] (tween 0 1 duration))
  ([start end duration] (tween start end duration :linear))
  ([start end duration easing]
   (transition start end {:duration duration :easing easing})))

(defn set-size
  [db width height]
  (assoc db :size {:height height :width width}))

(defn state
  ([db] 
   (get-in db [:state]))
  ([db v]
   (assoc-in db [:state] v)))

(defn trans-timer
  ([db]
   (get-in db [:trans-timer]))
  ([db timer]
   (assoc-in db [:trans-timer] timer)))

(defn entropy
  ([db]
   (:entropy db))
  ([db v]
   (let [db (assoc db :entropy v)]
     (condp = v
       0 (state db :stable)
       db))))

(defn trans-time
  [db dir]
  (let [entropy (entropy db)
        duration (:trans-duration db)
        factor (if (= :up dir) (- 1 entropy) entropy)]
    (* factor duration)))

(defn create-trans-timer
  [db dir]
  (let [start (entropy db)
        end (if (= :up dir) 1 0) 
        time (trans-time db dir)
        chan (tween start end time)]
    (trans-timer db chan)))

(defn cancel-trans-timer
  [db]
  (when-let [timer (trans-timer db)]
    (close! timer))
  (trans-timer db nil))

(defn go-up
  [db]
  (-> db
      cancel-trans-timer
      (create-trans-timer :up)
      (state :up)))

(defn go-down
  [db]
  (-> db
      cancel-trans-timer
      (create-trans-timer :down)
      (state :down)))

(defn next-point
  [db]
  [(rand-int 640) (rand-int 480)])
