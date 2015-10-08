(defproject swnd "0.1.0-SNAPSHOT"
  :description "none"
  :url "https://stwind.github.io"
  :dependencies [[org.clojure/clojure "1.7.0"]
                 [org.clojure/clojurescript "1.7.122"]
                 [org.clojure/core.async "0.1.346.0-17112a-alpha"]
                 [reagent "0.5.1"]
                 [re-frame "0.4.1"]
                 [secretary "1.2.3"]]
                 
  :plugins [[lein-cljsbuild "1.1.0"]
            [lein-garden "0.2.6"]
            [lein-npm "0.6.1"]]

  :clean-targets ^{:protect false} ["resources/public/js" "target"
                                    "resources/public/css"]

  :source-paths ["src/clj" "src/cljs"]

  ;; :npm {:dependencies [[react-motion "0.3.0"]]}

  :garden {:builds [{:id "screen"
                     :source-paths ["src/clj"]
                     :stylesheet swnd.css/screen
                     :compiler {:output-to "resources/public/css/screen.css"
                                :pretty-print? true}}]}

  :cljsbuild {:builds {:app {:source-paths ["src/cljs"]
                             :compiler {:output-to "resources/public/js/main.js"
                                        :output-dir "resources/public/js/out"
                                        :asset-path "js/out"
                                        :optimizations :none
                                        :pretty-print  true}}}}

  :profiles {:dev {:dependencies [[figwheel-sidecar "0.4.0"]
                                  [com.cemerick/piggieback "0.2.1"]
                                  [org.clojure/tools.nrepl "0.2.10"]
                                  [weasel "0.7.0"]]
                   :source-paths ["env/dev/cljs"]
                   :repl-options 
                   {:nrepl-middleware [cemerick.piggieback/wrap-cljs-repl]
                    :init (do
                            (require '[figwheel-sidecar.repl-api :as ra])
                            (require '[weasel.repl.websocket :as weasel])
                            (defn run []
                              (ra/start-figwheel! 
                               {:figwheel-options {:css-dirs ["resources/public/css"]
                                                   :repl false}
                                :build-ids ["dev"]
                                :all-builds
                                [{:id "dev"
                                  :source-paths ["src/cljs"]
                                  :figwheel { :on-jsload "swnd.core/render" }
                                  :compiler 
                                  {:main 'swnd.dev
                                   :asset-path "js/out"
                                   :output-to "resources/public/js/main.js"
                                   :output-dir "resources/public/js/out"
                                   :cache-analysis true
                                   :source-map true
                                   :source-map-timestamp true
                                   :optimizations :none }}]})
                              (ra/start-autobuild)
                              (cemerick.piggieback/cljs-repl
                               (weasel/repl-env :ip "0.0.0.0" :port 9001))))}}

             :production {:cljsbuild {:builds {:app {:source-paths ["env/prod/cljs"]
                                                     :compiler 
                                                     {:main swnd.prod
                                                      :optimizations :advanced
                                                      :pretty-print false}}}}}})
