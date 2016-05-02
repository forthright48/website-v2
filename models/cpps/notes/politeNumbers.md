# Polite Numbers
In number theory, a polite number is a positive integer that can be written as the sum of two or more consecutive positive integers. Other positive integers are Impolite.

# Impolite Numbers
The impolite numbers are exactly the powers of two. It follows from the Lambek-Moser theorem that the nth polite number is $f(n+1)$, where $f( n ) = n + \lfloor log_2( n + log_2n ) \rfloor$.

# Politeness
The Politeness of a positive number is defined as the number of ways it can be expressed as the sum of consecutive integers. For every $x$, the politeness of $x$ equals the number of odd divisors of $x$ that are greater than $1$.

# Polite Forms
All possible polite forms can be printed with $O(\sqrt{N})$ complexity.

The maximum length of a Polite Form of $N$ is $\sqrt{2N}$. Minimum length is $2$. By running a loop from minimum length to maximum length, we can find all possible polite forms.

We can find if a Polite Form of $N$ for a particular length exists or not. For example, if we are trying to find Polite Form of length $4$ for $N = 15$, it will be $x + (x+1) + (x+2) + (x+3) = 15$. Finding the value of x, if possible, gives us the starting position of a possible Polite Form.

```cpp
///Represent N as polite form of particular length.
///Returns the starting position. -1 if not possible.
int politeForm ( int n, int len ) {
    int sum = ( len * ( len - 1 ) ) / 2;
    int c = n - sum;
    if ( c <= 0 ) return -1;
    if ( c % len != 0 ) return -1;
    return c / len;
}
```

# Problems

1. CF 87/C Interesting Game
