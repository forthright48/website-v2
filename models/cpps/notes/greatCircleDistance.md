# Great Circle Distance

Given the longitude and latitude of two points on a sphere, find the geodesic distance ( curved distance ) between the two points.

## Haversine Formula

Let $(lat_1,long_1)$ be the first point, $(lat_2,long_2)$ be the second point and $r$ be the radius of the sphere.

$$dlon = long_2 - long_1$$
$$dlat = lat_2 - lat_1$$
$$a = sin(\frac{dlat}{2}) \times sin(\frac{dlat}{2})  + cos(lat_1) \times cos(lat_2) \times sin(\frac{dlon}{2}) \times sin ( \frac{dlon}{2} )$$
$$c = 2 \times atan2(\sqrt{a}, \sqrt{1-a})$$
$$d = r \times c$$

where, $d$ is the Great Circle Distance.

## Chord Length between Two Points

In case we need to find the straight line distance between two points on sphere, we can use the intermediate value of $a$ from the Haversine formula. Let $AB$ be the chord length, then we can calculate it using the formula:

$$AB = r \times \sqrt{4\times a}$$

## Problem
Can be found on [Gateway](http://forthright48.com/gateway/getChildren/575a842c6d4c1b1000399240)
