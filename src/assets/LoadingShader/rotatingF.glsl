precision highp float;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vReflectionTowardsCamera;
uniform vec4 resolution;
varying vec3 vPosition;
uniform float flatNormals;
uniform sampler2D matcaptexture;
float PI = 3.141592653589793238;

// matcap reflection to camera
vec2 matcap(vec3 eye, vec3 normal) {
    vec3 reflected = reflect(eye, normal);
    float m = 2.8284271247461903 * sqrt(reflected.z + 1.);
    return reflected.xy / m + 0.6;
}

void main() {
    vec2 matcapReflectionUV;
    matcapReflectionUV = matcap(vReflectionTowardsCamera, vNormal);

    vec4 color = texture2D(matcaptexture, matcapReflectionUV);
    gl_FragColor = color;
}