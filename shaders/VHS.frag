//https://www.shadertoy.com/view/NdccR2
#pragma header

#define PI 3.141592654f
#define PI 3.141592654f

#define iChannel0 bitmap

uniform float iTime;

float PHI2 = 1.324717957244746025960908854;
float sin_noise(in float x){
   return fract(sin(x*PHI2));
}

vec3 RGB_to_YIQ(vec3 RGB)
{
    return mat3
    (
        0.299, 0.587, 0.114,
        0.596, -0.275, -0.321,
        0.212, -0.523, 0.311
    ) * RGB;
}

vec3 YIQ_to_RGB(vec3 YIQ)
{
    return mat3
    (
        1.0, 0.956f, 0.619,
        1.0, -0.272, -0.647,
        1.0, -1.106, 1.703
    ) * YIQ;
}

vec3 VHS_effect(vec2 fragCoordd, float color_fuckery)
{
    vec2 fragCoord = openfl_TextureCoordv*openfl_TextureSize;
    vec2 iResolution = openfl_TextureSize;

    vec2    IQ = vec2(0.0,0.0),
            blur_size = vec2(16.0, 4.0),
            focal_point = blur_size * 0.5;
    
    float   smear_factor = blur_size.x * blur_size.y;
    
    vec2    UV_Y = fragCoordd / iResolution.xy;
    
    float a = sin_noise(UV_Y.x + iTime*iResolution.x)*2.0 - 1.0;
    float b = float(sin_noise(UV_Y.y + iTime*iResolution.y) < 0.001);
    UV_Y.x += abs(a)*a*b/iResolution.x;    

    for (int i = 0; i < int(smear_factor); i++)
    {
        vec2 uv_prime = vec2
        (
            (fragCoordd.x + mod(float(i), blur_size.x) - focal_point.x) / iResolution.x,
            (fragCoordd.y + float(float(i) / blur_size.y) - focal_point.y) / iResolution.y
        );
        IQ += RGB_to_YIQ(texture2D(iChannel0, uv_prime).xyz).yz;
    }
    IQ /= smear_factor;
    
    vec3 color = vec3
    (
        RGB_to_YIQ(texture2D(iChannel0, UV_Y).xyz).r,
        IQ * (1.0 + color_fuckery)
    );
    
    color.x += (IQ.x*sin((fragCoordd.x))) *
               (IQ.y*sin( fragCoordd.y * PI * 0.5));
             
    
    color = YIQ_to_RGB(color);
    
    return color;
}

void main()
{
    gl_FragColor = vec4(VHS_effect(openfl_TextureCoordv * openfl_TextureSize, 0.3), 1.0);
}