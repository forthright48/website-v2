# Euler Path
Euler Path or Tour of a graph is a simple path using which it is possible to traverse every edge of the graph without using an edge twice.

# Euler Path in Undirected Graph
An undirected graph is Eulerian graph, if it fulfills the following conditions.

- It is connected.
- Euler Tour or Path
  - Euler Tour: Every node has even degree.
  - Euler Path: Exactly two nodes have odd degree.

**Note**: This ensures that there is a path that visits every node **and** traverses every edge. If visiting every node is not necessary, that is, we are only interested in traversing every edge, then we can ignore the singleton components from the graph.

# Euler Path in Directed Graph
A directed graph is Eulerian graph, if it fulfills the following conditions.

## Euler Tour
- Every node has same out degree and in degree.
- It is strongly connected.

## Euler Path
- Every node has same out-degree and in-degree, except for two. The difference between out-degree and in-degree for one node needs to be $+1$ and for another $-1$.
- Adding edge between the two nodes with unequal in degree and out degree makes the graph strongly connected.

**Note**: This ensures that there is a path that visits every node **and** traverses every edge. If visiting every node is not necessary, that is, we are only interested in traversing every edge, then we can ignore the singleton components from the graph.

**Problem**: [HR The Cabalistic Hills](https://www.hackerrank.com/contests/womenscup/challenges/the-cabbalistic-hills-1)

# Edge Disjoint Cycles
Let us label every edge an unique id from $0$ to $E-1$. We can now define a set of Edges as Binary numbers.

A single "Edge Disjoint Cycle" (EDC) in graph, with all edges included, is a Euler Tour or Path. If all edges are not included then it is Euler Tour, it is simply an EDC.

Take binary notion of two EDC. The XOR between the two numbers will also be an EDC.

**Problem**: [HR Lovely Cycles](https://www.hackerrank.com/contests/worldcupfinals/challenges/lovely-cycles)
