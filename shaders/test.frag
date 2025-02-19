#pragma header

uniform float iTime;

#define iChannel0 bitmap
#define CHESS_SCALE 3.0
#define RND_OPACITY false
#define USE_CHANNEL0 true
#define isSETUP iFrame == 0
#define rnd hash3( iTime )

vec2 fragCoord = openfl_TextureCoordv*openfl_TextureSize;

#define L(a,b) gl_FragColor.g+= 2e-1 / length(clamp(dot((openfl_TextureCoordv*openfl_TextureSize) - a, v=b-a)/dot(v,v), 0.0, 1.0) *v - (openfl_TextureCoordv * openfl_TextureSize) + a )

// implement PhotoShop perspective transformation like interaction .. under develop

// fork :: https://www.shadertoy.com/view/lsBSDm

	// Created by inigo quilez - iq/2014
	// License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
	// https://iquilezles.org/articles/ibilinear

// codepen version :: http://codepen.io/Omrega/pen/ONYpRb?editors=0010

#define ASPECT openfl_TextureSize.x / openfl_TextureSize.y; 

#define startA vec2(  1.1 ,  -1.0)
#define startB vec2(  1.5 , 1.)
#define startC vec2( -1.5 , 1.)
#define startD vec2( -1.1 ,  -1.)


vec2 a = startB;
vec2 b = startC;
vec2 c = startD;
vec2 d = startA;


float ccross( in vec2 a, in vec2 b ) { return a.x*b.y - a.y*b.x; }

vec2 invBilinear( vec2 p, vec2 a, vec2 b, vec2 c, vec2 d )
{
    vec2 e = b-a;
    vec2 f = d-a;
    vec2 g = a-b+c-d;
    vec2 h = p-a;
        
    float k2 = ccross( g, f );
    float k1 = ccross( e, f ) + ccross( h, g );
    float k0 = ccross( h, e );
    
    float w = k1*k1 - 4.0*k0*k2;
    
    if( w<0.0 ) return vec2(-1.0);

    w = sqrt( w );
    
    float v1 = (-k1 - w)/(2.0*k2);
    float v2 = (-k1 + w)/(2.0*k2);
    float u1 = (h.x - f.x*v1)/(e.x + g.x*v1);
    float u2 = (h.x - f.x*v2)/(e.x + g.x*v2);
    bool  b1 = v1>0.0 && v1<1.0 && u1>0.0 && u1<1.0;
    bool  b2 = v2>0.0 && v2<1.0 && u2>0.0 && u2<1.0;
    
    vec2 res = vec2(-1.0);

    if(  b1 && !b2 ) res = vec2( u1, v1 );
    if( !b1 &&  b2 ) res = vec2( u2, v2 );
    
    return res;
}

float sdSegment( in vec2 p, in vec2 a, in vec2 b )
{
	vec2 pa = p - a;
	vec2 ba = b - a;
	float h = clamp( dot(pa,ba)/dot(ba,ba), 0.0, 1.0 );
	return length( pa - ba*h );
}

vec3  hash3( float n ) { return fract(sin(vec3(n,n+1.0,n+2.0))*43758.5453123); }

float chessboard(vec2 uv)
{
    uv = floor(uv*2.0); 
    return mod(uv.x+uv.y, 2.0);
}

float IGN(vec2 p)
{
    vec3 magic = vec3(0.06711056, 0.00583715, 52.9829189);
    return fract( magic.z * fract(dot(p,magic.xy)) );
}

vec2 center( vec2 v )
{
    v = ( v - 0.5 ) * 2.0;
    v.x *= ASPECT; 
    return v;    
}    

bool closest( vec2 a , vec2 b , vec2 c , vec2 d , vec2 mou  )
{
   return distance(a,mou)<distance(b,mou) && distance(a,mou)<distance(c,mou) && distance(a,mou)<distance(d,mou);
}    

vec3 rcolor;

void main()
{
    vec2 p = (-openfl_TextureSize.xy + 2.0*(openfl_TextureCoordv*openfl_TextureSize).xy)/openfl_TextureSize.y;
    
    vec2 uv = invBilinear( p, a, b, c, d );
    uv.x = 1.0 - uv.x;
    uv.y = 1.0 - uv.y;

    vec4 color = texture2D(iChannel0, uv);
    gl_FragColor = color;
}

// remember click position:  https://www.shadertoy.com/view/Mss3zH