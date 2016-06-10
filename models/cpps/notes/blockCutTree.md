# Block Cut Tree

Block Cut Tree is a tree made from biconnected components and articulation points of a graph. Building a block cut tree is simple.

## How to Build It

First decompose the graph into biconnected components and find all the articulation points. Next shrink the components into nodes. For each articulation point, connect it to a shrunk component if it is a member of that bcc. This will always form a tree known as Block Cut Tree.

## Application of Block Cut Tree

There are many application of block cut tree:

1. Given two nodes $A$ and $B$, can we travel from $A$ to $B$ in two vertex disjoint path? Complexity $O(1)$.
1. If we remove a node/edge, can we still travel from node $A$ to $B$? Complexity $O(logN)$.
