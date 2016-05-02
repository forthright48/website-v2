# GCD Sum

Given the value $N$, find the vlaue of $g(N)$:
$$\sum_{i=1}^{N} gcd(i,N)$$

# Using Euler Phi Divisor Sum Theorem

We know that:
$$N = \sum_{d|N} \phi(d)$$

Let $gcd(i,N)$ be $g$. Then, $g | i$ and $g|N$. Therefore, $g$ must be a divisor of $N$. Hence, we can rewrite the equation as follows:

$$ g(N) = \sum_{i=1}^{N} gcd(i,N) = \sum_{d|N} \sum_{i=1}^{N} d \times [gcd(i,N) == d]$$

$$ g(N) = \sum_{d|N} \sum_{i=1}^{N} d \times [gcd(i/d,N/d) == 1]$$

$$ g(N) = \sum_{d|N} d \times \phi(N/d)$$

Therefore, if divisor and euler phi are precalculated, we can find $g(n)$ in $O(d)$.

# Using GCD-Sum Function

The GCD-Sum function is defined as:

$$g(N) = \sum_{i=1}^{N} gcd(i,N)$$

This function is multiplicative, as it can be written as sum of divisor in another multiplicative function ( euler phi ).

For every prime number $p$ and positive integer $a \geq 1$,

$$g(p^a) = (a+1)p^a - ap^{a-1}$$

Proof: [The GCD-Sum Function - cs.waterloo.ca](https://cs.uwaterloo.ca/journals/JIS/VOL4/BROUGHAN/gcdsum.pdf)
