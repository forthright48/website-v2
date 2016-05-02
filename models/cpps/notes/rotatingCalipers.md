# Rotating Calipers

For a given side of convex-hull, find its anti-podal point.

# Wrong Algorithm

Assuming that distance from a fixed point of convex hull increases until maximum reached and decreases back to zero is a wrong assumption.

More details: [Incorrect Diameter Algorithms for Convex Polygons](http://cgm.cs.mcgill.ca/~athens/cs507/Projects/2000/MS/diameter/document.html)

# Correct Algorithm

If we fix a side of the convex hull as base, then the perpendicular distance of the vertices of convex hull first increases until maximum and then decreases. Therefore, the area also follows same trend.

Hence, we can use two-pointer method on area to find the farthest point from the fixed base.
