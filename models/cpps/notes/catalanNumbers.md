# Catalan Numbers
In Combinatorics, Catalan Numbers are sequence of numbers that occur frequently in various counting problems.

The first Catalan numbers for $n = 0,1,2,3...$ are `1, 1, 2, 5, 14, 42, 132, 429, 1430, 4862, 16796, 58786, 208012, 742900, 2674440, 9694845, 35357670, 129644790, 477638700,
1767263190, 6564120420, 24466267020, 91482563640, 343059613650, 1289904147324, 4861946401452`

## Calculate $C_n$
Let $C_n$ be the $n_{th}$ Catalan Number.

$$C_n = \frac{1}{n+1}\binom{2n}{n} = \frac{(2n)!}{(n+1)!n!}$$

But calculating Catalan Number using the formulas above is computationally expensive. Finding the value of $(2n)!$ and then dividing it by $(n+1)!n!$ simply takes too long.

The following recurrence formula is what we will be using most of the time.
$$C_{n+1} = \frac{(4n+2)C_n}{n+2} = \sum_{i=0}^{n}C_iC_{n-i}$$

## Application
There are many applications ( refer to [Wiki](https://en.wikipedia.org/wiki/Catalan_number#Applications_in_combinatorics) or [PDF](http://www.sbc.edu/sites/default/files/Honors/XiaotongJiang.July20_0.pdf) for more ). Some noteworthy are:

1. **Parentheses Matching**: $C_n$ counts the number of expressions containing n pairs of parentheses which are correctly matched. For $n=3$, we get $5$ different arrangements: `()()(),()(()),(())(),(()()),((()))`

1. **Binary Parentheses**: $C_n$ is the number of different ways $n + 1$ factors can be completely parenthesized, such that each set of parentheses contains exactly two variables. For $n = 3$, for example, we have the following five different parenthesizations of four factors:  
`((ab)c)d     (a(bc))d     (ab)(cd)     a((bc)d)     a(b(cd))`

1. **Polygon Triangulation**: $C_n$ is the number of different ways a convex polygon with $n + 2$ sides can be cut into triangles by connecting vertices with straight lines.

1. **Balanced Binary Tree**: The number of full binary trees with n internal nodes is the $n_{th}$ Catalan number.

1. **Rooted Binary Tree**: Number of rooted binary tree with $n$ nodes is $C_n$. Also, $C_n$ is the number of rooted binary tree with height $n$.

1. **Rooted Plane Tree**: Number of rooted plane tree with $n+1$ nodes is $C_n$.

1. **Non-Crossing Partitions**: The number of noncrossing partitions of an $n$-element set is the Catalan number $C_n$.

# Super Catalan Numbers
The Super Catalan Numbers are similar to Catalan Numbers that simply solve different kinds of counting problems.

The first few Super Catalan Numbers for $n = 1,2,3...$ are: `1, 1, 3, 11, 45, 197, 903, 4279, 20793, 103049, 518859, 2646723, 13648869, 71039373, 372693519, 1968801519, 10463578353, 55909013009, 300159426963, 1618362158587, 8759309660445, 47574827600981, 259215937709463, 1416461675464871`

## Calculating $S_n$
$$S_n = \frac {3(2n-3)S_{n-1}-(n-3)S_{n-2}}{n}$$


## Application:

1. **Expression Parentheses**: The $n_{th}$ number counts the number of different ways of inserting parentheses into a sequence of n symbols, with each pair of parentheses surrounding two or more symbols or parenthesized groups, and without any parentheses surrounding the entire sequence.  
For $4$ letters, we parentheses them following way: `xxxx,(xx)xx, x(xx)x, xx(xx),(xxx)x, x(xxx),((xx)x)x,(x(xx))x,(xx)(xx), x((xx)x), x(x(xx))
`

# Narayana Number

Naryana Numbers often occur as solution to sub-problems of those that Catalan Number solves.

## Calculating $N(n,k)$

$$N(n,k) = \frac{1}{n}\binom{n}{k}\binom{n}{k-1}$$

## Application

1. **Parentheses Matching**: $N(n,k)$ counts number of ways we can match $n$ parenthesis such that $()$ occurs exactly $k$ times.

1. **Dyck Path**: $N(n,k)$ counts number of ways we can build Dyck Paths of length $2n$ exactly $k$ peaks.

1. **Non Crossing Partition**: $N(n,k)$ counts number of ways we can partition $n$ elements such that they don't cross and have exactly $k$ parts.

## Properties

$$\sum_{k=1}^{n}N(n,k) = C_n$$

# Conclusion

Basically, there are various counting problem whose answers are Catalan ( or Super Catalan ) numbers. How do we detect whether a particular problem is solved using Catalan number? Well, there is no analytical way. You just calculate answers for small values of that problem, and see if they match with first values of Catalan Numbers. Basically, these problems are similar to finding pattern.
