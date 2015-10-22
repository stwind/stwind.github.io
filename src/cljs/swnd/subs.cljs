(ns swnd.subs
  (:require-macros [reagent.ratom :refer [reaction]])
  (:require [re-frame.core :as rf]
            [reagent.format :refer [format]]
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
         interp (pipeline [15 40 50] [0 0.9 1])]
     (reaction (interp @entropy)))))

(rf/register-sub
 :exit-color
 (fn [db]
   (let [entropy (reaction (db/entropy @db))]
     (reaction (u/hsl 0 80 50)))))

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
  (let [chars (mapv #(gen-char-text % step) (:chars diary))]
    (apply str chars)))

(defn gen-date-text
  [date step]
  (let [chars (mapv #(gen-char-text % step) date)]
    (apply str chars)))

(rf/register-sub
 :diary
 (fn [db]
   (let [entropy (reaction (db/entropy @db))
         diary (reaction (db/current-diary @db))
         step (reaction (Math/floor (* @entropy (:steps @diary))))
         date (reaction (:date @db))]
     (reaction 
      {:text (gen-diary-text @diary @step)
       :date (gen-date-text @date @step)}))))
