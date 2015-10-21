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

(defn gen-char-text
  [ch step]
  (reduce
   (fn [d [s c]]
     (if (> step s) d c)) (char 12288) (reverse ch)))

(defn gen-diary-text
  [diary step]
  (let [chars (:chars diary)
        chars2 (mapv #(gen-char-text % step) chars)]
    (apply str chars2)))

(rf/register-sub
 :current-diary
 (fn [db]
   (let [entropy (reaction (db/entropy @db))
         diary (reaction (db/current-diary @db))
         step (reaction (Math/floor (* @entropy (:steps @diary))))]
     (reaction 
      (let [text (gen-diary-text @diary @step)]
        {:text text})))))
