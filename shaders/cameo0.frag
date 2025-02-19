// Cole Peterson
//https://www.shadertoy.com/view/flBSzw
#pragma header

#define R openfl_TextureSize.xy
#define m 0.0 / R.y
#define ss(a, b, t) smoothstep(a, b, t)

uniform float iTime;

void main(){
    vec2 iResolution = openfl_TextureSize;
    vec2 u = openfl_TextureCoordv*openfl_TextureSize;

    float t = iTime*.25 - 1.5;
    
    vec2 uv = vec2( u - .5*R ) / R.y;
    uv += vec2(t, t*.2 - .4);
    
    if(iMouse.z > 0.)
        uv += m*5.;
    
    uv = (uv + vec2(-uv.y,uv.x) ) / 1.41;
    uv = fract(uv * .35) - .5;
    uv = abs(uv);
    
    vec2 v = vec2(cos(.09), sin(.09));
    float dp = dot(uv, v);
    uv -= v*max(0., dp)*2.;
    
    float w = 0.;
    for(float i = 0.; i < 27.;i++){
        uv *= 1.23;
        uv = abs(uv);
    	uv -= 0.36;
    	uv -= v*min(0., dot(uv, v))*2.;
        uv.y += cos(uv.x*45.)*.007;
        w += dot(uv, uv);
    }
    
    float n = (w*12. + dp*15.);
    vec3 col = 1. - (.6 + .6*cos(vec3(.45, 0.6, .81) * n + vec3(-.6, .3, -.6)));
    
    col *= max(ss(.0, .11, abs(uv.y*.4)), .8);
    col = pow(col * 1.2, vec3(1.6));
    gl_FragColor = vec4(1.-exp(-col), 1.);
}