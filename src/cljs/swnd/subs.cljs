(ns swnd.subs
  (:require-macros [reagent.ratom :refer [reaction]])
  (:require [re-frame.core :as rf]
            [bardo.ease :refer [wrap ease shift clamp]]
            [bardo.interpolate :refer 
             [interpolate into-lazy-seq mix blend chain pipeline]]
            [swnd.db :as db]
            [swnd.utils :as u]))

(rf/register-sub
 :viewport
 (fn [db]
   (reaction (db/viewport @db))))

(rf/register-sub
 :entropy
 (fn [db]
   (reaction (db/entropy @db))))

(rf/register-sub
 :exit-point
 (fn [db]
   (reaction (first (:trail @db)))))

(rf/register-sub
 :exit-radius
 (fn [db]
   (let [entropy (reaction (db/entropy @db))
         interp (interpolate 10 50)]
     (reaction (interp @entropy)))))

(rf/register-sub
 :exit-color
 (fn [db]
   (let [entropy (reaction (db/entropy @db))
         interp-l (interpolate 50 60)
         interp-s (interpolate 80 100)]
     (reaction (u/hsl 0 (interp-s @entropy) (interp-l @entropy))))))

(rf/register-sub
 :trail
 (fn [db]
   (reaction (rest (:trail @db)))))

(defn shuffle-text
  [text idxs]
  (let [chars (vec text)]
    (apply str (reduce #(assoc %1 %2 (rand-nth chars)) chars idxs))))

(rf/register-sub
 :current-diary
 (fn [db]
   (let [entropy (reaction (db/entropy @db))
         diary (reaction (db/current-diary @db))
         chars (reaction (:chars2 @db))]
     (reaction 
      (let [text (:text @diary)
            len (count text)
            n (.round js/Math (* len @entropy))
            idxs (take n (shuffle (range len)))
            text2 (shuffle-text text idxs)]
        (assoc @diary :text text2))))))
