//https://www.shadertoy.com/view/4lBfRD
#pragma header

uniform float iTime;

void main() {
  vec2 iResolution = openfl_TextureSize;
  vec2 u = openfl_TextureCoordv*openfl_TextureSize;

  vec2 R = iResolution.xy, U = u+u-R, V;

  gl_FragColor *= 0.0;
  for(float r = 1.0, c, s, i=r; ++i < 99.0;)
    gl_FragColor = smoothstep(3.0, 0.0,
      max(V = abs(U *= mat2(c=cos(s=0.1*iTime-0.99),s=sin(s),-s,c) ), V.x )
        - R * (r /= abs(c)+abs(s))).y - gl_FragColor;
}