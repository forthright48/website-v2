# Set Manipulation
Problems where we are given a set of elements and we have to perform various update and query operation on it.

# Add Single Element and Query $K_{th}$ Smallest Value
We have a set with operation to add a single value and query to find the $K_{th}$ smallest value in the set.

If there are $N$ operations, then number of different value in $N$ cannot exceed $N$. If the value of elements in the set exceed $N$, we can always renumber them to $\leq N$.

Keep an array `arr[]` of length $N$. Whenever we add a value $X$, simply increase `arr[X]` by $1$. Build a segment tree over this array where each segment contains the sum from `arr[L]` to `arr[R]`. Since we add a single number each time, its a point update with complexity $O(logN)$.

Now, for any query we iterate over the tree, starting from root. If the left child of current node has cumulative sum less than the position we seek, then the value we seek must be on right child, else it's on left child. This is like binary search and has complexity $O(logN)$.

**Problem**: [Toph Data Structure](https://toph.ws/c/nsu-intra-2016/arena#!/p/data-structure)
