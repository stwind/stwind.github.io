(ns swnd.subs
  (:require-macros [reagent.ratom :refer [reaction]])
  (:require [re-frame.core :as rf]
            [swnd.db :as db]))

(rf/register-sub
 :trigger-radius
 (fn [db]
   (reaction (db/trigger-radius @db))))
