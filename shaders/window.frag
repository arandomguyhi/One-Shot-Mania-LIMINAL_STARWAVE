#pragma header

#define iChannel0 bitmap

uniform float iTime;

float randF(vec2 co){
	return fract(sin(dot(co,vec2(12.9898,78.233)))*43758.5453);
}

void main()
{
    vec2 iResolution = openfl_TextureSize;
    vec2 fragCoord = openfl_TextureCoordv*openfl_TextureSize;

    vec2 uv = fragCoord/iResolution.xy;
	vec3 video = texture2D(iChannel0, uv).rgb;
	float grey = (video.r + video.g + video.b) / 3.0;

	grey = smoothstep(1.0, 0.0, grey);

	grey = step(grey, randF(uv+iTime/1000.0));

  vec3 c = vec3(grey);
  vec2 ogRes = fragCoord / iResolution.xy;
  vec4 Color1 = texture2D(iChannel0, ogRes);
	c = mix(c, Color1.rgb, 1.0);

	gl_FragColor = vec4(c, 1.0);
}