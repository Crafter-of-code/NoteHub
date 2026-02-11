package com.note.utility;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {
//    private string final
    private final String secretKey = "pL8ZsR1mQe6kJ9A2XHfT7NwYB0UoC4Vd";
    public String generateToken(String username){
        return Jwts.builder()
                .setSubject(username)
//                .setIssuedAt(new Date())
//                .setExpiration(new Date(System.currentTimeMillis() * 1000 * 60* 60))
                .signWith(Keys.hmacShaKeyFor(secretKey.getBytes()), SignatureAlgorithm.HS256)
                .compact();
    }
    // getClaimMethod
    private Claims getClaim(String token){
        return Jwts.parser()
                .setSigningKey(Keys.hmacShaKeyFor(secretKey.getBytes()))
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
    // extract userName
    public String extractUserName(String token){
        return getClaim(token).getSubject();
    }
    // validate token
    public boolean validateToken(String token){
        try{
            getClaim(token);
            return  true;
        }
        catch (JwtException e){
            System.out.println(e);
            return  false;
        }

    }
}

