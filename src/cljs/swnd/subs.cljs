(ns swnd.subs
  (:require-macros [reagent.ratom :refer [reaction]])
  (:require [re-frame.core :as rf]
            [swnd.db :as db]))

(rf/register-sub
 :locus-radius
 (fn [db]
   (reaction (db/locus-radius @db))))
