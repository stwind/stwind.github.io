(ns swnd.db
  (:require [cljs.core.async :as async :refer [<! >! chan close! put! alts!]]
            [bardo.ease :refer [wrap ease shift clamp]]
            [bardo.interpolate :refer 
             [interpolate into-lazy-seq mix blend chain pipeline]]
            [bardo.transition :refer [transition]]
            [swnd.diaries :as diaries]))

(def sub-chars (shuffle (vec "ァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵヶＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ０１２３４５６７８９")))

(defn rand-date
  []
  [(inc (rand-int 11)) (inc (rand-int 30))])

(def default-db
  {:state :stable
   :entropy 0.99
   :trans-duration 1000
   :trans-timer nil

   :viewport {:height 0 :width 0}

   :trail ()

   :date nil
   :diaries {:current 0
             :all (shuffle (diaries/get-all sub-chars 8))}})

(defn tween
  ([duration] (tween 0 1 duration))
  ([start end duration] (tween start end duration :linear))
  ([start end duration easing]
   (transition start end {:duration duration :easing easing})))

(defn viewport
  ([db]
   (:viewport db))
  ([db [width height]]
   (assoc db :viewport {:height height :width width})))

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

(defn gen-point
  [db]
  (let [viewport (viewport db)
        x (rand-int (:width viewport))
        y (rand-int (:height viewport))
        char (rand-nth sub-chars)]
    {:x x :y y :char char}))

(defn trail-next
  [db]
  (let [point (gen-point db)
        trail (conj (:trail db) point)]
    (assoc db :trail trail)))

(defn current-diary
  [db]
  (let [current (get-in db [:diaries :current])
        all (get-in db [:diaries :all])]
    (nth all current)))

(defn date-next
  [db]
  (let [diary (current-diary db)
        date (diaries/compile-date diary (rand-date) sub-chars)]
    (assoc db :date date)))

(defn diary-next
  [db]
  (let [current (get-in db [:diaries :current])
        next (inc current)
        all (get-in db [:diaries :all])
        count (count all)]
    (if (= next count)
      (-> db
          (assoc-in [:diaries :all] (shuffle all))
          (assoc-in [:diaries :current] 0)
          date-next)
      (-> db
          (assoc-in [:diaries :current] next)
          date-next))))
