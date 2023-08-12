---
title: "Everything in this page is a Cat"
date: 2023-08-11T01:41:20+02:00
draft: false
---

Every single image, effect and filter except the original cat picture (see below)
is generated using the image of a cat. **No other asset is used.**

<div class="orig-cat"></div>

Yep, that background is just the same cat. There are no gradients, no images
generated with some collage technique, no painting individual pixels. Just the <span class="kittycat">kittycat</span>.

# How?

Turns out that there exists a somewhat underused feature on HMTL. That feature is the capability to define and use **SVG filters**. Turns out that you can use some very interesting elements such as `feTurbulence` or `feGaussianBlur` in an `<svg><filter id="my_filter">...</filter></svg>`in HTML and apply those filters to images and elements. These filters use the original cat image to generate new pixels. For example, they derive the cat image as a seed to generate pixels for some turbulence in the background. Both the smoke and the squares in the background are derived from the cat's pixels. Just applying filters in an interesting way can give very interesting results.

# The ship in the room

The ["Ship of Theseus"](https://en.wikipedia.org/wiki/Ship_of_Theseus) paradox is a thought experiment about whether an object which has had all of its original components replaced remains the same object.

In other words, if you keep repairing a ship, until not a single nail from the original ship is unreplaced, is it the same ship? If we put 16 filters over a cat image, is it still the same cat image? Does being a cat image imply that a common person can identify a cat in that image? Do we take into account the origin or the final product?

It's pretty interesting to ask ourselves, even if the background is formed **from a cat**, is it still a cat? Probably not, but I wanted to experiment with SVG filters, because they're cool <abbr title="As fuck">*af*</abbr> :sparkles:

> Yep, those moving titles are also generated using the same technique. *They're also cat*

<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><filter id="filter" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="linearRGB"><feTurbulence type="turbulence" baseFrequency="0.015 0.015" numOctaves="3" seed="8" stitchTiles="stitch" result="turbulence"></feTurbulence><feMorphology operator="dilate" radius="35 35" in="turbulence" result="morphology"></feMorphology><feColorMatrix type="matrix" values="1 0 0 0 0
0 1 0 0 0
0 0 1 0 0
0 0 0 10 0" in="morphology" result="colormatrix"></feColorMatrix><feColorMatrix type="saturate" values="10" in="colormatrix" result="colormatrix1"></feColorMatrix><feComposite in="colormatrix1" in2="SourceAlpha" operator="in" result="composite"></feComposite></filter><filter id="filterx" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="linearRGB"><feTurbulence type="turbulence" baseFrequency="0.013 0.01" numOctaves="2" seed="1" stitchTiles="stitch" result="turbulence"/><feFlood flood-color="#9d03fc" flood-opacity="1" result="flood"/><feComposite in="flood" in2="turbulence" operator="in" result="composite1"/><feComposite in="composite1" in2="SourceAlpha" operator="in" result="composite2"/></filter><filter id="stroke" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="linearRGB"><feMorphology operator="dilate" radius="4 4" in="SourceAlpha" result="morphology"/><feFlood flood-color="#9d03fc" flood-opacity="1" result="flood"/><feComposite in="flood" in2="morphology" operator="in" result="composite"/><feComposite in="composite" in2="SourceAlpha" operator="out" result="composite1"/><feTurbulence type="fractalNoise" baseFrequency="0.01 0.02" numOctaves="1" seed="0" stitchTiles="stitch" result="turbulence"/><feDisplacementMap in="composite1" in2="turbulence" scale="17" xChannelSelector="A" yChannelSelector="A" result="displacementMap"/><feMerge result="merge"><feMergeNode in="SourceGraphic" result="mergeNode"/><feMergeNode in="displacementMap" result="mergeNode1"/></feMerge></filter><filter id="waves" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="linearRGB"><feTurbulence type="turbulence" baseFrequency="0.01 0.01" numOctaves="100" id="waves_turbulence" seed="2" stitchTiles="noStitch" result="turbulence"/><feDisplacementMap in="SourceGraphic" in2="turbulence" scale="20" xChannelSelector="G" yChannelSelector="A" result="displacementMap"/></filter>
</svg>
<style>body{overflow-x:hidden;color:white}.post-title{background:url("https://placekitten.com/800/400");filter:url(#stroke);font-family:'Cherry Bomb One',cursive;-webkit-text-stroke:4px navy;text-stroke:4px navy}.content:before{content:"";position:absolute;top:-150px;left:0;width:100vw;height:400%;z-index:-1;filter:contrast(1000%) brightness(1000%);background:url("https://placekitten.com/800/400");filter:url(#filterx) url(#filter)}.orig-cat{background:url("https://placekitten.com/800/400");filter:url(#stroke);width:100%;height:400px}.post-date{filter:url(#stroke);width:100%;height:100px;background-repeat:no-repeat}h1{filter:url(#stroke) url(#waves);font-size:5rem;margin-top:-10px}.kittycat{font-family:'Cherry Bomb One',cursive;font-size:18px;text-stroke:1px navy;-webkit-text-stroke:1px navy}article{backdrop-filter:blur(15px) hue-rotate(180deg)}
</style>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cherry+Bomb+One&display=swap" rel="stylesheet">
<script>let waves_turbulence = document.getElementById("waves_turbulence");function newSeed() {window.requestAnimationFrame(newSeed);waves_turbulence.setAttribute("seed", Math.random() * 100);};newSeed();</script>