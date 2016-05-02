# Binary Indexed Tree

# Range Update & Point Query
Add $X$ in a range $[L,R]$ and query the value at a position $P$.

BIT can only add a value to prefix or suffix of an array. Adding in range will need a little trick. Let $N$ be the length of the array. Then for adding $X$, we simply update $[L,N]$ with $X$ and then update $[R+1,N]$ with $-X$.

While updating the BIT, we move towards right, and when querying we move towards left.

# Range Query and Point Update
Add $X$ to position $P$ and query the sum in range $[L,R]$.

Here, while querying we move towards right in BIT and during update we move left.

# Conclusion
Determining which way to move during update/query of BIT is sometimes confusing. I use the following tricks to determine their movement:

1. Query and Update will move in opposite direction.
1. Range Operation will move towards right.
