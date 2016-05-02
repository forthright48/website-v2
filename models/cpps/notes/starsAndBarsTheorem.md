# Stars and Bars Theorem

How many ways can we write, $a + b + c = 10$, where $a,b,c$ are non-negative number? This is similar to the following situation. Imagine, we have three containers labeled $A,B,C$ and $10$ balls. How many ways can we place the balls? $2 + 1 + 7$ means we placed $2$ ball in $A$, $1$ balls in $B$ and $7$ balls in $C$. The same thing can be represented graphically as following: `**|*|*******`.

This is how it got the name, Stars and Bars theorem. The two bars, `|`, divide the stars into three sections. Therefore, if we have $x$ containers, then graphical representation will have $x-1$ bars.

Lets get back to the problem. We have three containers ( that is two bars ) and ten balls ( ten stars ). Our graphical representation will therefore have $12$ characters. Now, how many ways can we place the bars here? $\binom{12}{2}$. That is our answer. We can form $a+b+c=10$ in $\binom{12}{2}$ ways.

So, formally the Stars and Bars Theorem can be stated as:
> If we have N indistinguishable balls and K distinguishable containers, then we can distribute them in $\binom{N+K-1}{K-1}$ ways.

**Reference**: <a href="https://en.wikipedia.org/wiki/Stars_and_bars_(combinatorics)">Wiki</a> |  [Quora](https://www.quora.com/How-do-I-use-the-stars-and-bars-combinatorics/answer/Arpit-Shukla-13?srid=XV7a&share=e274a60a)

## Extensions

### Positive Number of Balls in Each Container

What if every container needs to have at least one ball? Simple. Place a ball in each bin and subtract those placed balls from total balls. Then apply Stars and Bars Theorem normally.

So, $a+b+c = 10$, where $a,b,c$ are positive, has $\binom{n-k+k-1}{k-1} = \binom{n-1}{k-1}$ solutions.

### Lower Bound with Each Container

This is more generalized version of the extension above. We are given the lower limits for each container. If a lower limit of a container is $x$, then we must place $x$ or more balls in that containers.

I will do it a bit differently this time. Suppose we want to find solution for $a+b+c = 100$, where lower limits of $a,b,c$ are $10,20,35$. Then, we can rewrite the equation as following:

$a+b+c = 100$ <br>
$(10+x) + (20+y) + (35+z) = 100$, where $x,y,z$ are non-negative integers. <br>
$\therefore x + y + z = 100 - 10 -20 -35 = 35$

Now, we apply Star and Bars theorem normally. The answer is $\binom{37}{2}$.

So, just subtract the lower bounds from total number of balls and apply the theorem normally.

### Upper Bound with Each Container

Now, this is tricky. This time we are given upper limit for each container. So number of balls we place must be smaller or equal to upper limit for that container.

This needs Dynamic Programming to solve. We iterate over each container and keep track of remaining balls in our hand. When at each container, we run a loop from $0$ to upper limit and try placing different amount of balls in each container.

It will be something similar to this ( not exactly this )
```cpp
int dp ( int container, int ball ) {
    int res = 0;
    for ( int i = 0; i < upperLimit[pos]; i++ ) {
        res += dp ( container + 1, ball - i );
    }
}
```

### Equation with Inequality

What if we are asked to find $a + b + c \leq X$? Simple, just solve for $a + b + c + d = X$. Whatever ball gets placed in box $d$ should be ignored from equation, thus we achieve $a+b+c \leq X$.

### Other Constraints
There are many ways to put constraints over this type of problem.

For example: $a + b + c = N$, where $a < b < c$.

No matter what the problem, if it has "indistinguishable" balls and "distinguishable" containers, see if you can use Stars and Bars Theorem in some way.

If that fails, see if you can construct a DP. Most of the time, it is possible to construct a $O(NK)$ or $O(N^2K)$ DP.
