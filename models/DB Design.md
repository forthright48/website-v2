# How gateway is designed

## 2016-4-8

Thinking about switching to [Array of Ancestor Tree model](https://docs.mongodb.com/manual/tutorial/model-tree-structures-with-ancestors-array/) for gateway. Currently using Tree Structure with parent reference.

I need to solve the following problems:

1. Who are the children of current node? This displays the problems/folders in a folder of gateway.
2. How many problems/text are under this node? This is statistics of total number nodes in a folder.
3. How many problems/text under this node are marked by user?
    1. For this, I need to store information of which user has solved a problem.
    2. Problem document will contain an array of users who solved the problem.
    3. Currently, users are storing what they have marked. No need to switch.

For 1, I have to store information of immediate parent of each node. For 2, I need to store array of ancestors. For 3, I have to store done list inside the problem documents.

1 is already done. 2 and 3 needs to be implemented.
