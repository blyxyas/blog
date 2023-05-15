---
title: "Using maths to rearrange my kitchen"
date: 2023-04-29T20:52:32+02:00
draft: true
katex: true
plots: true
---

Ok, I recently moved to a new house (pretty cool!) and the style of arranging items in this kitchen is... questionable.

Random distributions are what you get from putting the items in a random order, without paying attention to anything
more than *"items must be stored"*. So in this blog post we'll measure my kitchen's furniture, categorize their items and create a new hypothetical optimal distribution, explaining each step so that you can apply it to your own kitchen!

---

But before creating a perfect kitchen distribution algorithm, we'll need to create a formula for checking that $ N $ parallelograms with $M_N$ sides length each parallelogram, fit inside a bigger $P$ regular polygon with $O$ sides, $Q$ length per side.

(Area of all $N$s is smaller than $P$'s area)

$${\frac{O\times Q^2}{4\times\tan(\frac{\pi}{O})}} \geq \sum_{i\ =\ 0}^{|M|}A(M_i) $$

${\frac{O\times Q^2}{4\times\tan(\frac{\pi}{O})}}$ is the operation used to check the area of any given polygon $P$ knowing it's sides and length per side.

$A(\cdots)$ is just the function that calculates the area of a parallelogram.

Ok, so given that the inequation is true ($P$'s area is bigger than the total area of the $N$ polygons), we can proceed.

---

But, turns out that arranging a kitchen isn't only a matter of stuffing all that furniture in there, but also about categorizing and grouping the food into sensible places. So I can open the breakfast's cabinet and find cookies next to cereal and not cookies next to raw meat (a very non-breakfasty food).

So we'll give a number to each food, grouping similar foods.
Ok, so for this hypothetical kitchen, we'll have 3 cabinets. One with cookies, another one with cereal, and a third one with meat.

We'll assign 1 and 3 to cookies and cereal respectively, and 10 to meat. Then double them to distinguish them more.

We can even plot our numbers in the following gradient to get our food's colors. (Just for explaining purposes).

<div class="gradient"><wbr></div>

So, our colors are: <span class="cookies">**cookies**</span>, <span class="cereal">**cereal**</span> and <span class="meat">**meat**</span>

---

Ok, so we have 3 ($N$) cabinets, the three of them having 4 sides ($M_N$ for the three $N$s). The dimensions of each
cabinet are the following:

* $M_0 = 80 \times 31$
* $M_1 = 122 \times 51$
* $M_2 = 111 \times 45$

<div class="mwrapper">
	<div class="m0">$M_0$</div>
	<div class="m1">$M_1$</div>
	<div class="m2">$M_2$</div>
</div>

We can now build an optimal configuration by maximizing the contact area and separating different foods as much as possible.

For each new $N$, we'll take a look at our already-placed $N$s in the $P$ polygon. And use the $\Gamma$ function to find the new best place to place this new $N$.

This is the equation for checking the best place to fit a new parallelogram $\varPhi$:
$$(x, y) = {\frac{O\times Q^2}{4\times\tan(\frac{\pi}{O})}} - \sum_{i\ =\ 0}^{|M|}A(M_i)$$

<style>
.gradient {
	background: rgb(91,255,0);
	background: -moz-linear-gradient(90deg, rgba(91,255,0,1) 0%, rgba(255,0,0,1) 30%);
	background: -webkit-linear-gradient(90deg, rgba(91,255,0,1) 0%, rgba(255,0,0,1) 30%);
	background: linear-gradient(90deg, rgba(91,255,0,1) 0%, rgba(255,0,0,1) 30%);
	filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#5bff00",endColorstr="#ff0000",GradientType=1);
}
.cookies {
	color: #5bff00;
	-webkit-text-stroke: 0.5px #292a2d;
}
.cereal {
	color: #7ccc00;
	-webkit-text-stroke: 0.5px #292a2d;

}
.meat {
	color: #c85500;
	-webkit-text-stroke: 0.5px #292a2d;

}
.m0 {
	width: 80px;
	height: 31px;
	padding-top: 4px;
	text-align: center;
	vertical-align: center;
	border: 1px solid white;
	color: black;
	background-color: #5bff00;
}
.m1 {
	width: 122px;
	height: 51px;
	padding-top: 12px;
  text-align: center;
	vertical-align: center;
	border: 1px solid white;
	color: black;
	background-color: #7ccc00;
}

.m2 {
	width: 111px;
	height: 45px;
	padding-top: 10px;
  text-align: center;
	vertical-align: center;
	border: 1px solid white;
	color: white;
	background-color: #c85500;
}
.mwrapper {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-gap: 33.33%;
	align-items: center;
}

</style>
