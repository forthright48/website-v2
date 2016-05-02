# Fibonacci Numbers

# Zeckendorf's Theorem
Every positive integer $N$ can be written **uniquely** as a sum of distinct non-neighboring Fibonacci numbers. To get unique representation, keep subtracting the biggest fibonacci number smaller than $N$ repeatedly until $N$ becomes $0$.

**Resources**: [Wiki](https://en.wikipedia.org/wiki/Zeckendorf%27s_theorem) | [Proof](https://proofwiki.org/wiki/Zeckendorf's_Theorem)

# Fibonacci GCD
Let $f(x)$ be the $x_{th}$ fibonacci number.

**Theorem**: $gcd ( f(x), f(y) ) = f ( gcd(x,y) )$

**Related Lemma**:

1. $gcd ( f(x), f(x-1) ) = 1$
2. $f(m+n) = f(m+1)f(n) + f(m)f(n-1)$
3. if $m | n$, then $f(m) | f(n)$

**Resources**: [Math Fun Facts](https://www.math.hmc.edu/funfacts/ffiles/20004.5.shtml)
