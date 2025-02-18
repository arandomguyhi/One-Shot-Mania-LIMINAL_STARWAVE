//https://www.shadertoy.com/view/Ms3SRN#
#pragma header

#define iChannel0 bitmap

vec2 iResolution = openfl_TextureSize;
vec2 fragCoord = openfl_TextureCoordv*openfl_TextureSize;

void main()
{
    vec2 uv = fragCoord.xy / iResolution.xy;
        
    float aspectRatio = iResolution.x / iResolution.y;
    
    vec2 newRes = vec2(7.0 + 24 * (8.5 * 2.2));
    
    newRes.x *= aspectRatio;

    vec3 pal = vec3(6, 6, 6 );
    
    uv = floor( uv * newRes ) / newRes; 
    vec4 color = texture( iChannel0, uv ); 
            
    color.xyz = floor( color.xyz * pal  ) / pal.xyz;
    
    gl_FragColor = color;
}


