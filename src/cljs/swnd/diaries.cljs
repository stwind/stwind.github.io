(ns swnd.diaries)

(def all 
  [{:date [11 02]
    :text "在候诊室的阳光下看书"}
   {:date [10 29]
    :text "自从离开那里之后，就没再见过夜晚"}
   {:date [10 28]
    :text "tofubeats 的声音有种被抽走了情感的冷漠，喜欢"}
   {:date [10 28]
    :text "把重大目标定在了某月某日，在那之后的事变得像世界末日之后，不存在的未来"}
   {:date [10 25]
    :text "hate this street"}
   {:date [10 25]
    :text "床是用来放人的地方"}
   {:date [10 23]
    :text "在一个地方住久了会和附近的人有个脸熟，遇到楼下看更或者小店老板娘，会打声招呼说上两句。因为没熟到需要道别的程度，离开时只好不辞而别"}
   {:date [10 21]
    :text "遗忘是一种怎样的过程，也许就是这样"}
   {:date [10 21]
    :text "花几天时间做了这个网页，作为 clojurescript 的练习，也用来处置一些随时产生的无处可安放的遗忘了又可惜的想法"}
   {:date [10 20]
    :text "maybe that is how everyone becomes everyone"}])

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
