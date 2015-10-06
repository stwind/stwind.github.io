(ns swnd.handlers
  (:require [re-frame.core :as re-frame]
            [swnd.db :as db]))

(re-frame/register-handler
 :initialize-db
 (fn [_ _]
   db/default-db))
