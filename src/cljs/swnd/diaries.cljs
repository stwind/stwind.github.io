(ns swnd.diaries)

(def all 
  [{:text "にしおゆき陶人形にしおゆき陶人形"}
   {:text "過去に公開した日記を現在の注釈とする"}
   {:text "你丫舌头抽筋了吧，那叫雕塑家"}
   {:text "然后我发现：这些不是头像，是摇滚明星们的阳具副本"}])

(defn compile-char-steps
  [start ch flash subs]
  (reduce 
   (fn [steps i]
     (let [s [(+ start i 1) (rand-nth subs)]]
       (conj steps s)))
   [[start ch]] (range flash)))

(defn compile
  [diary subs flash]
  (let [chars (vec (:text diary))
        length (count chars)
        step-chars (map 
                    (fn [[ch idx]]
                      (compile-char-steps (+ idx 1) ch flash subs))
                    (map vector chars (shuffle (range length))))]
    {:chars step-chars
     :steps (+ length flash)}))

(defn get-all
  [subs flash]
  (mapv #(compile % subs flash) all))
