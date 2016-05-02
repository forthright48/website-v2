# Permutation and Combination

## Permutation

Permutation is the arrangement of objects where order matters. Number of ways we can permute $k$ objects out of $n$ objects is:

$$ P_{k}^{n} = \frac{n!}{k!} $$

## Combination

Combination is the arrangement of objects where order does not matter. Number of ways we can choose $k$ objects out of $n$ objects is:

$$ C_{k}^{n} = \binom{n}{k} = \frac{n!}{k!(n-k)!} $$

### Calculating $C_{k}^{n}$

There are various methods to calculate $\binom{n}{k}$.

#### Dynamic Programming

Using the formula: $\binom{n}{k} = \binom{n-1}{k-1} + \binom{n-1}{k}$, we can formulate a DP.

``` cpp
#define NCKSIZE 100
int nck[NCKSIZE][NCKSIZE];
void generate_nck () {
    nck[0][0] = 1;
    for ( int n = 1; n < NCKSIZE; n++ ) {
        nck[n][0] = 1;
        for ( int k = 1; k < NCKSIZE; k++ ) {
            nck[n][k] = nck[n-1][k] + nck[n-1][k-1];
        }
    }
}
```

Pre-calculation takes $O(N^2)$ time, but after that we can answer any query in $O(1)$ time.

#### Loop Over the Row

$$ \binom{n}{k} = \binom{n}{k-1} \times \frac{n-k+1}{k}$$

We know that $\binom{n}{0} = 1$. So, if we want to calculate $\binom{n}{k}$, we can simply use the formula above to calculate the answer in $O(k)$ loop.

``` cpp
int nck ( int n, int k ) {
    int res = 1; /// nck(n,0)
    for ( int i = 1; i <= k; i++ ) {
        res = ( res * ( n - i + 1 ) ) / i;
    }
    return res;
}
```

Basically, we are just moving horizontally in a row of pascal triangle.

**Note**: $\binom{n}{k} = \binom{n}{n-k}$. Therefore, if $n-k < k$, then it is better to calculate $\binom{n}{n-k}$ instead of $\binom{n}{k}$. This is much faster on cases like $\binom{2^{30}}{2^{30}}$.

### Limits of Combinations

$\binom{33}{16} = 1166803110 = 1.1 \times 10^9$
$\binom{60}{30} = 118264581564861424 = 1.1 \times 10^{17}$

If $n \leq 60$, we can safely assume that $\binom{n}{k}$ will fit in `long long`.
