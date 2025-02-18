#pragma header

#define iChannel0 bitmap

vec2 iResolution = openfl_TextureSize;
vec2 fragCoord = openfl_TextureCoordv*openfl_TextureSize;

float pixel_w = 10.0;
float pixel_h = 10.0;
float color_r = 0.25;

void main()
{
	float vx_offset = 0.5;
    
	vec2 uv = fragCoord.xy / iResolution.xy;
    vec4 c = texture(iChannel0, uv);
    vec3 tc = vec3(1., 0., 0.);
    
    vec2 coord = vec2(0.,0.);

        float dx = 1./160.;
        float dy = 1./144.;
        coord = vec2(dx*floor(uv.x/dx),
                     dy*floor(uv.y/dy));
    
    tc = texture(iChannel0, coord).rgb;
    
    // Ramp colors
    float brightness = sqrt(
        0.299* (tc.r*tc.r) +
        0.587* (tc.g*tc.g) +
        0.114* (tc.b*tc.b) );
    float target_c = color_r*floor(brightness/color_r);
    tc = vec3(target_c, target_c, target_c);
    
    
	gl_FragColor = vec4(tc, 1.0);
    
    
}