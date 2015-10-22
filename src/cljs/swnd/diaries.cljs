(ns swnd.diaries)

(def all 
  [{:text "我完全没想过。我其实很难相信我已经８４岁多马上要８５岁了。我现在完全无法面对这个事实，我倒是认为这是很有用的态度。当然有时候我也允许自己面对这个现实，但我不会坐以待毙。我热爱工作。我工作起来十分卖力。"}
   {:text "这组肖像摄影里你看到的是一群年纪在八、九十岁，在各自的领域功名显赫的男男女女。虽然除了知道他们的名字和成就之外，我并不认识他们，我还是被问道这样的问题，为何他们到了事业和人生的这个阶段，他们对于事业的热爱并没有消失，而是仍然充满了热情去探索？以及为何这些年长的大师们仍能持续进取，到底是什么使他们拥有永不减退的创造力和发现新事物的能力？为何他们不停下来，吃老本安度晚年？"}
   {:text "现在我７９岁，我已经写了数百篇杂文了，而被淘汰的坏初稿和改的差不多的稿子有这个的大概十倍之多，现在我才开始懂得失败也有其自己的意义。人们在缩短实际水平和理想中的水平的距离之间所倾注的不懈努力，才带来了创作的无限自由，这个过程中，真正重要的不是在成功之镜中看到自己，而是得以从这过程之中，逃出固步自封的牢笼。"}
   {:text "这样的经验同样可以从那些八、九十岁仍在学习的大师们的经历中学到：人数众多这里只提到其中的若干：米开朗基罗、提香、托马斯·哈代、克劳德·莫奈、乔治亚·奥基芙、多纳泰罗、帕布罗·卡尔萨斯、贾斯博·琼斯、威尔第、托尼·莫瑞、和毕加索。"}])

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
        count (count chars)
        length (min 30 count)
        indices (shuffle (take count (cycle (range 1 (inc length)))))
        pairs (map vector chars indices)
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
