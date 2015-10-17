(ns swnd.db
   (:require [bardo.ease :refer [wrap ease shift clamp]]
             [bardo.interpolate :refer [interpolate into-lazy-seq mix blend chain pipeline]]
             [bardo.transition :refer [transition]]))

(def default-db
  {:locus {:radius {:min 10 :max 50}
           :timer nil
           :step 0
           :duration 1000}})

(defn locus-timer
  ([db]
   (get-in db [:locus :timer]))
  ([db timer]
   (assoc-in db [:locus :timer] timer)))

(defn locus-step
  [db]
  (get-in db [:locus :step]))

(defn set-locus-step
  [db step]
  (assoc-in db [:locus :step] step))

(defn locus-radius
  [db]
  (let [min (get-in db [:locus :radius :min])
        max (get-in db [:locus :radius :max])
        step (locus-step db)]
    ((interpolate min max) step)))

(defn locus-forward-time
  [db]
  (let [step (locus-step db)
        duration (get-in db [:locus :duration])]
    (* (- 1 step) duration)))

(defn locus-backword-time
  [db]
  (let [step (locus-step db)
        duration (get-in db [:locus :duration])]
    (* step duration)))
