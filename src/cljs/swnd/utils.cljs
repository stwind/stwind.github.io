(ns swnd.utils
  (:require [reagent.format :as rf]))

(defn hue->rgb
  "Convert hue color to rgb components
  Based on algorithm described in:
  http://en.wikipedia.org/wiki/Hue#Computing_hue_from_RGB
  and:
  http://www.w3.org/TR/css3-color/#hsl-color"
  [m1, m2, hue]
  (let* [h (cond
             (< hue 0) (inc hue)
             (> hue 1) (dec hue)
             :else hue)]
        (cond
          (< (* h 6) 1) (+ m1 (* (- m2 m1) h 6))
          (< (* h 2) 1) m2
          (< (* h 3) 2) (+ m1 (* (- m2 m1) (- (/ 2.0 3) h) 6))
          :else m1)))

(defn hsl->rgb
  "Given color with HSL values return vector of r, g, b.

  Based on algorithms described in:
  http://en.wikipedia.org/wiki/Luminance-Hue-Saturation#Conversion_from_HSL_to_RGB
  and:
  http://en.wikipedia.org/wiki/Hue#Computing_hue_from_RGB
  and:
  http://www.w3.org/TR/css3-color/#hsl-color"
  [hue saturation lightness]
  (let* [h (/ hue 360.0)
         s (/ saturation 100.0)
         l (/ lightness 100.0)
         m2 (if (<= l 0.5) (* l (+ s 1))
                (- (+ l s) (* l s)))
         m1 (- (* l 2) m2)]
        (into []
              (map #(.round js/Math (* 0xff %))
                   [(hue->rgb m1 m2 (+ h (/ 1.0 3)))
                    (hue->rgb m1 m2 h)
                    (hue->rgb m1 m2 (- h (/ 1.0 3)))]))))

(defn ->hex
  [i]
  (let [n (.toString i 16)]
    (if (< (.-length n) 2)
      (str "0" n)
      n)))

(defn rgb
  [r g b]
  (str "#" (->hex r) (->hex g) (->hex b)))

(defn hsl
  [h s l]
  (apply rgb (hsl->rgb h s l)))
