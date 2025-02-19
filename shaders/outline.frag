#pragma header

#define iChannel0 bitmap

void main()
{
    vec2 iResolution = openfl_TextureSize;
    vec2 fragCoord = openfl_TextureCoordv*openfl_TextureSize;
	  vec2 uv = fragCoord/iResolution.xy;

  vec2 TEXTURE_PIXEL_SIZE = vec2(0.0005, 0.0005);
  float line_thickness = 20.0;
  
    vec2 size = TEXTURE_PIXEL_SIZE * line_thickness;

    float outline = texture2D(iChannel0, uv + vec2(-size.x, 0.0)).a;
    outline += texture2D(iChannel0, uv + vec2(0.0, size.y)).a;
    outline += texture2D(iChannel0, uv + vec2(size.x, 0.0)).a;
    outline += texture2D(iChannel0, uv + vec2(0.0, -size.y)).a;
    outline += texture2D(iChannel0, uv + vec2(-size.x, size.y)).a;
    outline += texture2D(iChannel0, uv + vec2(size.x, size.y)).a;
    outline += texture2D(iChannel0, uv + vec2(-size.x, -size.y)).a;
    outline += texture2D(iChannel0, uv + vec2(size.x, -size.y)).a;
    outline = min(outline, 1.0);

    vec4 color = texture2D(iChannel0, uv);
    vec4 COLOR = mix(color, vec4(1.0, 1.0, 1.0, 1.0), outline - color.a);

    gl_FragColor = COLOR;
}