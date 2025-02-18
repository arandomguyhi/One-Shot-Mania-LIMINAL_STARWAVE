#pragma header

#define iChannel0 bitmap

vec2 iResolution = openfl_TextureSize;
vec2 fragCoord = openfl_TextureCoordv*openfl_TextureSize;

void main()
{
vec2 resolution = iResolution.xy;
  vec2 uv = fragCoord / resolution;

  vec4 texColor = texture(iChannel0, uv);

  float gray = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));

  vec3 black = vec3(0.0, 0.0, 0.0);
  vec3 red = vec3(1.,1.,0.8);

  vec3 finalColor = mix(black, red, step(0.4, gray));

  gl_FragColor = vec4(finalColor, 1.0);
  
}