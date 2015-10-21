(ns swnd.diaries)

(def all 
  [{:text "にしおゆき陶人形にしおゆき陶人形"}
   {:text "過去に公開した日記を現在の注釈とする"}
   {:text "你丫舌头抽筋了吧，那叫雕塑家"}
   {:text "然后我发现：这些不是头像，是摇滚明星们的阳具副本"}])

(def num-chars
  ["０１" "０２" "０３" "０４" "０５" "０６" "０７" "０８" "０９" "１０"
   "１１" "１２" "１３" "１４" "１５" "１６" "１７" "１８" "１９" "２０"
   "２１" "２２" "２３" "２４" "２５" "２６" "２７" "２８" "２９" "３０"
   "３１"])

(defn compile-char-steps
  [[ch start] flash subs]
  (reduce 
   (fn [steps i]
     (let [s [(+ start i) (rand-nth subs)]]
       (conj steps s)))
   [[start ch]] (range 1 (inc flash))))

(defn compile
  [diary subs flash]
  (let [chars (vec (:text diary))
        length (count chars)
        pairs (map vector chars (shuffle (range 1 (inc length))))
        step-chars (map #(compile-char-steps % flash subs) pairs)]
    {:chars step-chars
     :steps (+ length flash)
     :flash flash}))

(defn compile-date
  [diary [m d] subs]
  (let [flash (:flash diary)
        total (:steps diary)
        start (Math/floor (* (/ total 3) 2))
        mm (nth num-chars (dec m))
        dd (nth num-chars (dec d))
        chars (vec (str mm "月" dd "日"))
        pairs (map vector chars (shuffle (range 1 (inc (count chars)))))
        step-chars (map #(compile-char-steps % flash subs) pairs)]
    step-chars))

(defn get-all
  [subs flash]
  (mapv #(compile % subs flash) all))
