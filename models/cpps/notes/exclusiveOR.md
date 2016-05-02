# Exclusive OR

# Maximum XOR Subset
Given a set of integers, find a subset whose XOR is maximum.

See [Gaussian Elimination](gaussianElimination.md) for more details.

# XOR from $1$ to $N$
Cumulative XOR from $1$ to $N$ follows pattern.

Let $A[i] = 1 \oplus 2 \oplus 3 \oplus \dots \oplus N$. Then:

```
int r = i % 4;
if ( r == 0 ) A[i] = i;
else if ( r == 1 ) A[i] = 1;
else if ( r == 2 ) A[i] = i + 1;
else A[i] = 0;
```

**Problem**: [HR Xor Sequence](https://www.hackerrank.com/contests/hourrank-5/challenges/xor-se)

# Useful Properties
Assume, $a \leq b$, unless explicitly mentioned.

- $a \oplus b \geq b - a$ : xor value is always greater than or equal to the difference of the two numbers.

**Problem**: [UVa 12716 - GCD XOR](https://uva.onlinejudge.org/index.php?option=onlinejudge&Itemid=8&page=show_problem&problem=4454)
