# Bell Numbers

In combinatorial mathematics, the Bell numbers count the number of partitions of a set.

In mathematics, a partition of a set is a grouping of the set's elements into non-empty subsets, in such a way that every element is included in one and only one of the subsets.

Starting with $B_0 = B_1 = 1$, the first few Bell numbers are:

1, 1, 2, 5, 15, 52, 203, 877, 4140, 21147, 115975, 678570, 4213597, 27644437, 190899322, 1382958545, 10480142147, 82864869804, 682076806159, 5832742205057

# Application

1. **Set Partition**: $B_n$ ounts the number of different ways to partition a set that has exactly $n$ elements.

# Calculation

## Recurrence
$$B_{n+1} = \sum_{k=0}^{n}\binom{n}{k}B_k$$

Imagine we have $n+1$ object. Then the $(n+1)_{th}$ object will be in some partition along with other objects. Let that have size $k+1$. Then, there are $\binom{n}{k}$ ways of choosing the partition and remaining objects gets further partitioned in $B_{n-k}$ ways.

## Bell Triangle

Similar to Pascal Triangle, but generating rule is different. Let it be a two dimensional array `B[][]`.

1. Start with $1$ in first row.
1. For subsequent rows, the first element is the last element of previous row.
1. `B[i][j] = B[i][j-1] + B[i-1][j-1]`

The top element of the Bell's triangle is indexed as $B[1][1]$. Here, $B[n][k]$ means number of way we can partition $(n+1)$ object such that $k+1$ is the largest singleton. Therefore, $B[n][n] = B_n$.

### Augmented Bell Triangle
Similar to Bell Triangle, but the first element of row grater than $1$ is calculated as difference of rightmost and leftmost elemnt of previous row.

Basically, $B[n][0] = B[n-1][n-1] - B[n-1][0]$.

## Modular Arithmetic
If $p$ is any prime number, then

$$B_{p^m+n} \equiv mB_n + B_{n+1} \text{ ( mod p ) }$$

# Property of Bell Triangle

## Sum of Row
The sum of $n_{th}$ row of Bell triangle counts the number of partitions of $n$ elements into subsets, where one of the subsets is distinguished from the others.

For example, there are $10$ ways of partitioning three items into subsets and then choosing one of the subsets.

The sum of $n_{th}$ row is same as difference between $B_{n+1}$ and $B_n$.

Suppose we have to distinguish a subset in partition of $n$ elements. Then simply partition set of $n+1$ element and the subset that contains $n+1$ is the chosen subset. But, sometimes $n+1$ is a singleton. There are exactly $B_n$ number of such cases. So subtract those. Therefore, result is $B_{n+1} - B_n$.
