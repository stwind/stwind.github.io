(ns swnd.diaries)

(def all 
  [{:date [10 21]
    :text "花几天时间做了这个网页，作为 clojurescript 的练习，也用来处置一些随时产生的无处可安放的遗忘了又可惜的想法。"}
   {:date [10 20]
    :text "maybe that is how everyone becomes everyone."}])

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

(defn compile-chars
  [chars start subs flash]
  (let [count (count chars)
        length (min 30 count)
        indices (shuffle (take count (cycle (range start (inc length)))))
        pairs (map vector chars indices)]
    [(map #(compile-char-steps % flash subs) pairs)
     (+ length flash)]))

(defn date-chars
  [{[m d] :date}]
  (let [mm (nth num-chars (dec m))
        dd (nth num-chars (dec d))]
    (vec (str mm "月" dd "日"))))

(defn compile
  [diary subs flash]
  (let [tchars (vec (:text diary))
        dchars (date-chars diary)
        [text steps] (compile-chars tchars 1 subs flash)
        [dtext _] (compile-chars dchars 1 subs flash)]
    {:text text
     :date dtext
     :steps steps}))

(defn get-all
  [subs flash]
  (mapv #(compile % subs flash) all))
