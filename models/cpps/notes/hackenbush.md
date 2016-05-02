# Hackenbush

# Green Hackenbush

## Stalk
A stalk of X nodes is same as a nim pile of $X$ height.

## Tree
All tree can be converted to a stalk using "Colon Principle". If two stalk meet at a node of size $S1$ and $S2$ ( excluding the common point ), then those two can be replaced by a single stalk of size $S1 \oplus S2$.

**Problem**: [HDU Circle Game](http://acm.hdu.edu.cn/showproblem.php?pid=5299)

# Red and Blue Hackenbush

## Stalk
Until the parity changes for the first time, each number is worth $+V$ or $-V$ (depending on whether it is Even or Odd, respectively). Once parity change occurs, each subsequent number (regardless of being Even or Odd), is worth half of the previous value, with a $+/-$ corresponding to the parity.

For example: `BBBRB = +V +V +V -V/2 -V/4`. Now sum them to get value of each stalk.

For multiple stalk, instead of using XOR, we add them normally. If positive then Blue wins and if negative Red wins.

**Problem**: [CC CHEFGM](https://www.codechef.com/problems/CHEFGM)

[Math Exchange](http://math.stackexchange.com/questions/556014/what-is-worth-of-a-stalk-in-red-blue-hackenbush)
