(ns swnd.db
  (:require [bardo.ease :refer [wrap ease shift clamp]]
            [bardo.interpolate :refer [interpolate into-lazy-seq mix blend chain pipeline]]
            [bardo.transition :refer [transition]]))

(def default-db
  {:state :idle
   :handle {:trigger {:radius {:min 10 :max 50}
                      :step 0
                      :duration 1000}
            :timer nil}})

(defn state
  ([db] 
   (get-in db [:state]))
  ([db v]
   (assoc-in db [:state] v)))

(defn trigger-timer
  ([db]
   (get-in db [:handle :timer]))
  ([db timer]
   (assoc-in db [:handle :timer] timer)))

(defn trigger-step
  ([db]
   (get-in db [:handle :trigger :step]))
  ([db v]
   (assoc-in db [:handle :trigger :step] v)))

(defn trigger-radius
  [db]
  (let [radius (get-in db [:handle :trigger :radius])
        step (trigger-step db)
        interp (interpolate (:min radius) (:max radius))]
    (interp step)))

(defn trigger-time
  [db forward?]
  (let [step (trigger-step db)
        duration (get-in db [:handle :trigger :duration])
        factor (if forward? (- 1 step) step)]
    (* factor duration)))

