precision highp float;
uniform float uTime;
uniform vec3 uColorStart;
uniform vec3 uColorEnd;
uniform float uIntensity;
uniform float uProgress2;
uniform float uAlpha;

varying float vDistort;
varying vec3 vNormal;
varying vec3 vPos;

vec3 cosPalette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
    return a + b * cos(6.28318 * (c * t + d));
}

void main() {
    float distort = vDistort * uIntensity;
    vec3 brightness = vec3(0.5, 0.5, 0.5);
    vec3 contrast = vec3(0.5, 0.5, 0.5);
    vec3 oscilation = vec3(1.0, 1.0, 1.0);
    vec3 phase = vec3(0.0, 0.1, 0.2);

  // Pass the distortion as input of cospalette
    vec3 color = cosPalette(distort, brightness, contrast, oscilation, phase);

    gl_FragColor = vec4(color, uAlpha);
}