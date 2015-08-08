import React, { Component, PropTypes as PT } from 'react';
import THREE from 'three';
import raf from 'raf';
import { FPSStats } from 'react-stats';

import styles from './Stage.css';
import imgSmokeElement from 'images/Smoke-Element.png';
import imgDisc from 'images/disc.png';

function random (min, max) {
  return Math.floor(min + Math.random() * (max - min));
}

const FIRE_CLOUDS = [
  [[1, 1, 0.5], 5], 
  [[0.95, 1, 0.5], 4], 
  [[0.90, 1, 0.5], 3], 
  [[0.85, 1, 0.5], 2], 
  [[0.80, 1, 0.5], 1]
];

export default class Stage extends Component {
  constructor(props) {
    super(props);
    this.clock = new THREE.Clock();

    // scene
    var scene = this.scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(props.fog.hex, props.fog.density);

    // light
    var light = new THREE.DirectionalLight(props.light.hex, props.light.intensity);
    light.position.set(0, 0, 10);
    scene.add(light);

    // smoke
    var smokeTexture = THREE.ImageUtils.loadTexture(imgSmokeElement);
    smokeTexture.minFilter = THREE.LinearFilter;
    var smokeMaterial = new THREE.MeshLambertMaterial({
      color: props.smoke.color, map: smokeTexture, transparent: true
    });
    var smokeGeo = new THREE.PlaneBufferGeometry(300,300);
    var smokeParticles = this.smokeParticles = [];
    for (var p = 0; p < props.smoke.count; p++) {
      var particle = new THREE.Mesh(smokeGeo, smokeMaterial);
      particle.position.set(random(-500, 200),
                            random(-500, 200), 
                            random(-200, 300));
      particle.rotation.z = random(0, 360);
      smokeParticles.push(particle);
      scene.add(particle);
    }

    // fire
    var geometry = new THREE.Geometry();
    var fireClouds = this.fireClouds = [];

    for (var i = 0; i < props.fire.count; i++) {
      var vertex = new THREE.Vector3();
      vertex.x = random(-800, 400);
      vertex.y = random(-800, 400);
      vertex.z = random(-800, 400);

      geometry.vertices.push(vertex);
    }

    for (var i = 0; i < FIRE_CLOUDS.length; i++) {
      var color = FIRE_CLOUDS[i][0];
      var size  = FIRE_CLOUDS[i][1];

      // var sprite1 = THREE.ImageUtils.loadTexture(imgDisc);
      var material = new THREE.PointCloudMaterial({
        size: size, 
        color: props.fire.color,
        alphaTest: 0.5, transparent: true
      });

      var fireCloud = fireClouds[i] = new THREE.PointCloud(geometry, material);

      fireCloud.rotation.x = Math.random() * 6;
      fireCloud.rotation.y = Math.random() * 6;
      fireCloud.rotation.z = Math.random() * 6;

      scene.add(fireCloud);
    }
  }

  componentDidMount() {
    var props = this.props,
        root = React.findDOMNode(this),
        size = { w: root.clientWidth, h: root.clientHeight };

    // camera
    var camera = this.camera = new THREE.PerspectiveCamera( 75, size.w / size.h, 1, 10000 );
    camera.position.z = props.cameraZ;
    this.scene.add(camera);

    var renderer = this.renderer = new THREE.WebGLRenderer();
    renderer.setSize( size.w, size.h );

    root.appendChild( renderer.domElement );

    this.tick();
  }

  tick = () => {
    raf(this.tick);
    this.update();
    this.renderer.render(this.scene, this.camera);
  }

  update() {
    var delta = this.clock.getDelta();

    var angle = 60;
    var wind = { cos: Math.cos((angle/180)*Math.PI), sin: Math.sin((angle/180)*Math.PI) }

    this.smokeParticles.forEach(sp => {
      sp.rotation.z += delta * 0.2;
      sp.position.x += wind.cos * 0.8;
      sp.position.y += wind.sin * 0.8;
    })

    this.fireClouds.forEach(fc => {
      fc.position.x += wind.cos * 1;
      fc.position.y += wind.sin * 1;
    });
  }

  render() {
    return (
      <div className={styles.root}>
        <FPSStats isActive={this.props.stats} />
      </div>
    );
  }
}

Stage.propTypes = { 
  cameraZ: PT.number,
  fog: PT.shape({
    hex: PT.number,
    density: PT.number
  }),
  light: PT.shape({
    hex: PT.number,
    intensity: PT.number
  }),
  smoke: PT.shape({
    count: PT.number
  }),
  fire: PT.shape({
    count: PT.number,
    color: PT.number
  }),
  stats: PT.bool
};

Stage.defaultProps = { 
  cameraZ: 500,

  fog: {
    hex: 0x000000,
    density: 0.0007
  },

  light: {
    hex: 0xffffff,
    intensity: 1
  },

  smoke: {
    count: 150,
    color: 0xde2500
  },

  fire: {
    count: 2000,
    color: 0xb30800
  },

  stats: true
};
