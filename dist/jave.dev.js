"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

console.clear();
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setClearColor(0xff5555);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 1;
var controls = new THREE.TrackballControls(camera, renderer.domElement);
controls.noPan = true;
controls.maxDistance = 3;
controls.minDistance = 0.7;
var group = new THREE.Group();
scene.add(group);
var heart = null;
var sampler = null;
var originHeart = null;
new THREE.OBJLoader().load('https://assets.codepen.io/127738/heart_2.obj', function (obj) {
  heart = obj.children[0];
  heart.geometry.rotateX(-Math.PI * 0.5);
  heart.geometry.scale(0.04, 0.04, 0.04);
  heart.geometry.translate(0, -0.4, 0);
  group.add(heart);
  heart.material = new THREE.MeshBasicMaterial({
    color: 0xff5555
  });
  originHeart = Array.from(heart.geometry.attributes.position.array);
  sampler = new THREE.MeshSurfaceSampler(heart).build();
  init();
  renderer.setAnimationLoop(render);
});
var positions = [];
var geometry = new THREE.BufferGeometry();
var material = new THREE.LineBasicMaterial({
  color: 0xffffff
});
var lines = new THREE.LineSegments(geometry, material);
group.add(lines);
var simplex = new SimplexNoise();
var pos = new THREE.Vector3();

var Grass =
/*#__PURE__*/
function () {
  function Grass() {
    _classCallCheck(this, Grass);

    sampler.sample(pos);
    this.pos = pos.clone();
    this.scale = Math.random() * 0.01 + 0.001;
    this.one = null;
    this.two = null;
  }

  _createClass(Grass, [{
    key: "update",
    value: function update(a) {
      var noise = simplex.noise4D(this.pos.x * 1.5, this.pos.y * 1.5, this.pos.z * 1.5, a * 0.0005) + 1;
      this.one = this.pos.clone().multiplyScalar(1.01 + noise * 0.15 * beat.a);
      this.two = this.one.clone().add(this.one.clone().setLength(this.scale));
    }
  }]);

  return Grass;
}();

var spikes = [];

function init(a) {
  positions = [];

  for (var i = 0; i < 20000; i++) {
    var g = new Grass();
    spikes.push(g);
  }
}

var beat = {
  a: 0
};
gsap.timeline({
  repeat: -1,
  repeatDelay: 0.3
}).to(beat, {
  a: 1.2,
  duration: 0.6,
  ease: 'power2.in'
}).to(beat, {
  a: 0.0,
  duration: 0.6,
  ease: 'power3.out'
});
gsap.to(group.rotation, {
  y: Math.PI * 2,
  duration: 12,
  ease: 'none',
  repeat: -1
});

function render(a) {
  positions = [];
  spikes.forEach(function (g) {
    g.update(a);
    positions.push(g.one.x, g.one.y, g.one.z);
    positions.push(g.two.x, g.two.y, g.two.z);
  });
  geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
  var vs = heart.geometry.attributes.position.array;

  for (var i = 0; i < vs.length; i += 3) {
    var v = new THREE.Vector3(originHeart[i], originHeart[i + 1], originHeart[i + 2]);
    var noise = simplex.noise4D(originHeart[i] * 1.5, originHeart[i + 1] * 1.5, originHeart[i + 2] * 1.5, a * 0.0005) + 1;
    v.multiplyScalar(1 + noise * 0.15 * beat.a);
    vs[i] = v.x;
    vs[i + 1] = v.y;
    vs[i + 2] = v.z;
  }

  heart.geometry.attributes.position.needsUpdate = true;
  controls.update();
  renderer.render(scene, camera);
}

window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
//# sourceMappingURL=jave.dev.js.map
