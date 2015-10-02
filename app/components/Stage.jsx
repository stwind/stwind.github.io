import React, { Component, PropTypes as PT } from 'react';
import THREE from 'three';
import raf from 'raf';
import { FPSStats } from 'react-stats';

import styles from './Stage.css';
import imgSmokeElement from 'images/Smoke-Element.png';

import vshFire from './fire.vsh';
import fshFire from './fire.fsh';

function random (min, max) {
  return min + Math.random() * (max - min);
}

class Smoke {
  constructor(props) {
    var mesh = this.mesh = new THREE.Mesh(props.geometry, props.material);
    mesh.position.set(props.x, props.y, props.z);
    mesh.rotation.z = random(0, 360);
  }
}

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
  }

  componentDidMount() {
    var props = this.props,
        root = React.findDOMNode(this),
        size = { w: root.clientWidth, h: root.clientHeight };

    // camera
    var camera = this.camera = new THREE.PerspectiveCamera( 75, size.w / size.h, 1, 10000 );
    camera.position.z = props.cameraZ;
    this.scene.add(camera);

    // smoke
    var smokeTexture = THREE.ImageUtils.loadTexture(imgSmokeElement);
    smokeTexture.minFilter = THREE.LinearFilter;
    var smokeMaterial = new THREE.MeshLambertMaterial({
      color: props.smoke.color, map: smokeTexture, transparent: true
    });
    var smokeGeo = new THREE.PlaneBufferGeometry(300, 300);
    var smokeParticles = this.smokeParticles = [];
    for (var p = 0; p < props.smoke.count; p++) {
      var smoke = new Smoke({ 
        geometry: smokeGeo, material: smokeMaterial,
        x: random(-size.w, -size.w/2), y: random(-size.h, -size.h/2), z: random(0, 200)
      });
      this.scene.add(smoke.mesh);
      smokeParticles.push(smoke);
    }

    // fire
    var geometry = new THREE.Geometry();

    for (var i = 0; i < props.fire.count; i++) {
      var vertex = new THREE.Vector3();
      vertex.x = random(-size.w/2, size.w/2);
      vertex.y = random(-size.h/2, size.h/2);
      vertex.z = random(-100, 400);

      geometry.vertices.push(vertex);
    }

    var material = new THREE.PointCloudMaterial({
      size: props.fire.size, alphaTest: 0.5, transparent: true,
      color: props.fire.color
    });

    var attributes = {
      // alpha: { type: 'f', value: [] },
    };
    var uniforms = {
      color: { type: "c", value: new THREE.Color( props.fire.color ) },
    };
    // var material = new THREE.ShaderMaterial({
    //   uniforms:       uniforms,
    //   attributes:     attributes,
    //   vertexShader:   vshFire,
    //   fragmentShader: fshFire,
    //   transparent:    true
    // });

    var fireCloud = this.fireCloud = new THREE.PointCloud(geometry, material);

    // for( var i = 0; i < fireCloud.geometry.vertices.length; i ++ ) {
    //   // set alpha randomly
    //   attributes.alpha.value[ i ] = Math.random();
    // }

    this.scene.add(fireCloud);

    var renderer = this.renderer = new THREE.WebGLRenderer();
    renderer.setSize(size.w, size.h);
    renderer.setClearColor( new THREE.Color( 0x000000 ) );
    root.appendChild(renderer.domElement);

    this.setState({ size }, this.tick);
  }

  tick = () => {
    raf(this.tick);
    this.update();
    this.renderer.render(this.scene, this.camera);
  }

  update() {
    var size = this.state.size;
    var delta = this.clock.getDelta();

    var angle = 60;
    var wind = { cos: Math.cos((angle/180)*Math.PI), sin: Math.sin((angle/180)*Math.PI) }

    this.smokeParticles.forEach(sp => {
      sp.mesh.rotation.z += delta * 0.2;
      sp.mesh.position.x += wind.cos * 0.8;
      sp.mesh.position.y += wind.sin * 0.8;

      if (sp.mesh.position.x > size.w/2) {
        sp.mesh.position.x = -size.w/2;
      }
      if (sp.mesh.position.y > size.h/2) {
        sp.mesh.position.y = -size.h/2;
      }
    });

    this.fireCloud.geometry.vertices.forEach(v => {
      v.setX(v.x + wind.cos * 1.5);
      v.setY(v.y + wind.sin * 1.5);

      if (v.x > size.w / 2) {
        v.setX(-size.w/2);
      }
      if (v.y > size.h / 2) {
        v.setY(-size.h/2);
      }
    });

    this.fireCloud.geometry.verticesNeedUpdate = true;
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
    count: 0,
    color: 0xde2500
  },

  fire: {
    count: 700,
    color: 0xb30800,
    size: 5
  },

  stats: true
};
