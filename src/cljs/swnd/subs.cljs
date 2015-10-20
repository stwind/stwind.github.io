(ns swnd.subs
  (:require-macros [reagent.ratom :refer [reaction]])
  (:require [re-frame.core :as rf]
            [swnd.db :as db]))

(rf/register-sub
 :entropy
 (fn [db]
   (reaction (db/entropy @db))))

