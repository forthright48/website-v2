# Linear Diophantine Equation

Given the value of $A, B$ and $C$, find solution for the linear equation:
$$Ax + By = C$$
, where $(x,y)$ is a integer co-ordinate.

For detailed explanation, refer to my blog post [Linear Diophantine Equation](http://blog.forthright48.com/2015/07/linear-diophantine-equation.html).

From here on, assume that both $A$ and $B$ are non-zero.

# Existence of Solution

Let $g$ be $GCD(A,B)$. Then $g$ will divide left side of the equation, $Ax + By$. Therefore, $g$ should divide right side of the equation too. If not, there is no solution.

Hence, if $C \ \% \ g \neq 0$, then there is no solution.

# Simplification of Equation

Let $ax + by = c$ be simplified equation of $Ax + By = C$, where $a = \frac{A}{g}$, $b = \frac{B}{g}$ and $c = \frac{C}{g}$. Solving the simplified equation is same as solving the original equation.

# Bezout's Identity

Using extended euclidean algorithm, we can solve equation of the form $Ax + By = GCD(A,B)$. Suppose we simplified the equation, then we can solve $ax + by = 1$ using extended euclidean algorithm.

But, in our problem we need to solve $ax + by = c$, not $ax + by = 1$.

Let $(x',y')$ be a solution for $ax + by = 1$. Then, if we multiply both side with $c$, then it becomes $a(cx') + b(cy') = c$. Therefore, $(cx',cy')$ is a solution for our original solution.

# Generating Solutions

A linear diophantine equation can have more than one solution. How can we generate more solutions?

Let $(x,y)$ be a solution for $Ax + By = C$. Now, let $x' = x + \frac{kB}{g}$ and $y' = y - \frac{kA}{g}$, where $k$ is **any** integer and $g = GCD(A,B)$.

Now, if we evaluate with $(x',y')$, we get:

$$Ax' + By' = A(x + \frac{kB}{g}) + B(y + \frac{kA}{g}) $$
$$Ax + \frac{kAB}{g} + By - \frac{kAB}{g}$$
$$\therefore Ax + By = C$$

Hence, by adding $\frac{kB}{g}$ to $x$ and $\frac{-kA}{g}$ to $y$ we can generate more solutions.

## Run and Rise

Let us hence define few more terms.

Let $run = \frac{B}{g}$ and $rise = \frac{-A}{g}$. Also, run must be non-negative. If for some reason, $run$ is negative, we can just multiply both $run$ and $rise$ by $-1$ to make it non-negative.

The $run$ and $rise$ play important role in generating solutions for diophantine equation. What do they mean? Suppose $run = 3$ and $rise = -2$, then it means that every time we move our current solution $(x,y)$ $3$ units to right, it will go $2$ units down.

# $A,B$ with $0$ Value

## Both $A$ and $B$ with Value $0$
When both $A$ and $B$ are $0$, then $Ax + By$ will always evaluate to $0$. Hence, if $C \leq 0$, then there is no solution, else there are infinite solutions as any pair of $(x,y)$ is a solution.

## $A$ or $B$ with Value $0$
Suppose only A is 0. Then equation $Ax+By=C$ becomes $0x+By=C \text{, or } By=C$. Therefore $y=CB$. If $B$ does not divide $C$ then there is no solution. Else solution will be $(x,y)=(CB,k)$, where $k$ is any intger.

Using same logic, when B is $0$, solution will be $(x,y)=(k,CA)$.

# Negative GCD

Even though it doesn't make any sense, but output of euclidean algorithm, which is suppose to be greatest common divisor, can be negative. And we have to work with the negative value, otherwise the algorithm will not work. So, it's best we work with whatever result euclidean algorithm gives us.

# Algorithm for Solving Linear Diophantine Equation

Using all the theories above, the following code generates solution to Linear Diophantine Equation.

```cpp
/****************
Returns char according to kind of solution.
run and rise variable to generate more solution.
Solution stored in x and y variable.
************************/

struct linearDiphontine {
    vlong a, b, c, x, y, run, rise;
    char solution;

    char solve () {
        if ( a == 0 && b == 0 ) {
            if ( c == 0 ) {
                //Infinite solutions. Anything works
                return solution = 'i';
            }
            else return solution = '0'; //No solution
        }
        if ( a == 0 || b == 0 ) {
            //Vertical or Horizontal Line
            if ( !a ) {
                if ( c % b != 0 ) return solution = '0'; /// No Solution
                run = 1; rise = 0;
                return solution = 'h'; /// ( anything, c / b )
            }
            else {
                if ( c % a != 0 ) return solution = '0'; ///No Solution
                run = 0; rise = 1;
                return solution = 'v'; /// ( c / a , anything )
            }
        }

        ///Existence of solution
        vlong g = ext_gcd( a, b, &x, &y );
        if ( c % g != 0 ) {
            //No solution
            return solution = '0';
        }

        ///Simplification of equation
        a /= g; b /= g; c /= g;

        ///Bezout's Identity to Original Equation
        ext_gcd ( a, b, &x, &y );
        x *= c; y *= c;

        ///run and rise calculation
        run = b; rise = -a;
        if ( run < 0 ) {
          run *= -1; rise *= -1;
        }

        return solution = '1';
    }

    ///Move solution near to vertical line x = p
    void moveNearVerticalLine( int p ) {
        if ( run == 0 ) return; /// Both are vertical
        vlong jump = ( p - x ) / run;
        x += jump * run;
        y += jump * rise;

        if ( x < p ) { ///Keep solution on right of the line
            x += run;
            y += rise;
        }
    }

    void moveNearHorizontalLine( int p ) {
        if ( rise == 0 ) return; /// Both are horizontal
        vlong jump = ( p - y ) / rise;
        x += jump * run;
        y += jump * rise;

        if ( y < p ) { ///Keep solution above the line
           if ( rise > 0 ) {
             x += run;
             y += rise;
           }
           else {
             x -= run;
             y -= rise;
           }
        }
    }
};

```

## How to use this?

Set the value of $a,b,c$ and call $solve()$ method. Solution depends on the return character. To generate more solution use the value of $run$ and $rise$.

Often in problems we need to find solutions near vertical or horizontal lines. For those we can use $moveNearVerticalLine()$ and $moveNearHorizontalLine()$ functions.
