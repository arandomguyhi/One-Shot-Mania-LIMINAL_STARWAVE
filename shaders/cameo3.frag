//https://www.shadertoy.com/view/4lBfRD

void mainImage(out vec4 O, vec2 u) {
    vec2 R = iResolution.xy,
         U = u+u-R, V; 
    O *= 0.;
    for( float r=1.,c,s,i=r; ++i < 99.; )
        O = smoothstep(
              3., 0.,
              max( V = abs( U *= mat2(c=cos(s=.1*iTime-.99),s=sin(s),-s,c) ), V.x )
              - R * (r /= abs(c)+abs(s))
            ).y - O; }
        
