# Minimum Cut

An $S-T$ cut of graph is a set of edges, such that when those edges are removed from the graph, node $S$ gets disconnected from $T$. Minimum Cut is a cut whose summation of capacity is minimum among all cuts.

# Max-Flow Min-Cut Theorem

The value of Min-Cut between $S-T$ is equal to Max-Flow between $S-T$. [Wikipedia](https://en.wikipedia.org/wiki/Max-flow_min-cut_theorem)

# Edges of Min Cut

Edges of Min Cut can printed in $O(N)$ using a DFS.

1. First run max-flow algorithm and update the capacities of the residue graph accordingly.

1. Start a dfs from the source node. We traverse an edge only if there is non-zero capacity left in the residue graph.

1. Mark all nodes that are visited. Let the marked nodes be black and unmarked nodes be white.

1. Any edge between a black and white node is a part of Min Cut.

Read more at [Geeks for Geeks](http://www.geeksforgeeks.org/minimum-cut-in-a-directed-graph/).

**Problem**: [UVa 10480 - Sabotage](https://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=171&page=show_problem&problem=1421)

# Uniqueness of Min Cut

1. First use a max-flow algorithm to find augmented path on residue graph.

1. On residue graph, find all nodes that are reachable from source. Mark this set of nodes White.

1. On residue graph, find all nodes from which it is possible to reach sink. Mark these nodes Black.

1. Min Cut is unique if sum of White and Black nodes is equal to total number of nodes.

Read this answer on [Quora](http://qr.ae/RbVBWU)

## Why this works?

Imagine, we send one extra flow from source on the residue graph. What will happen? This extra flow can only travel to any white node. It cannot travel to any black node, since there is a bottleneck in between.

Suppose, some of the edges are between White-Black. All of these edges must be in min cut. If somehow, we bypass one of these edges, then the flow can travel to sink without any problem. So these edges can never be bypassed.

But now, what if there are some nodes which are neither White nor Black? Let them be Red. If there is an edge between White-Red, then even if we let the extra flow bypass this edge, the flow will get stuck somewhere else. It cannot reach sink, that's why its not Black. So, we can get a different set of bottleneck.

Therefore, if Min Cut is unique, there cannot be any Red nodes. So sum of White and Black nodes should be equal to total nodes, since they are disjoint.

**Problem**: [ZOJ 2587 - Unique Attack](http://acm.zju.edu.cn/onlinejudge/showProblem.do?problemCode=2587)

# Finding All Minimum Cut of Graph
This is a NP-Hard problem. Refer to this paper - [A Novel and Efficient Algorithm for Scanning All Minimal Cutsets of a Graph](http://arxiv.org/ftp/math/papers/0211/0211436.pdf)

# Application

## Disconnecting Two Nodes
Given a graph, we have to find out the minimum number of edge we need to remove so that source and destination is disconnected.

Assign capacity of $1$ to each edge of the graph. The max flow is the number of edge we need to remove.
