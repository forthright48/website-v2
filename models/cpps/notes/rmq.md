# Range Minimum/Maximum Query

Given an array `arr` of length $N$ and a segment $[L,R]$, we have to find maximum/minimum element in the segment. Often, we have additional queries like updates.

Without loss of generality, let us assume we are finding maximum element.

## No Update and $[1,R]$ Query
This can be easily achieved by keeping a cumulative maximum array `cum`, where `cum[i] = max(cum[i-1],arr[i])`. $O(N)$ build and $O(1)$ per query.

## No Update and $[L,R]$ Query
This can be solved using a sparse table. $O(NlogN)$ build and $O(1)$ per query.

## Point Update and $[1,R]$ Query
This can be solved using Binary Indexed Tree. $O(logN)$ update and $O(logN)$ per query.

## Range Update and $[L,R]$ Query
Use Segment Tree. 
