---
title: "Crafting the best IDE theme to ever exist using science"
date: 2023-06-11T22:54:39+02:00
draft: true
katex: true
---

An IDE theme is the group of colors that represent all elements in your editor. There are a lot of themes available in online marketplaces, you can even make your own! In this post, we'll craft the best possible theme. We'll only focus on eye strain and contrast (*and maybe user's feelings?*). Not on :sparkles: ***aesthetics*** :sparkles:

Ok, so we know that bright colors really affect eye-strain after a long period of time[^1] in a dark room. These colors, mixed with high contrasts can amplify that effect[^2]. In short, not having a 100% contrast between font color and background color is "beneficial" (not as bad) to our eyes. (<span class="very-bad">Very bad, very high contrast</span> | <span class="kinda-good">A bit better, less contrast</span>)

If you've taken **any** design class, you probably know this. It's very basic and one of the first things web designers learn. But lowering contrast isn't always good. Higher contrast helps visual identification performance[^3] ([^4]) and may feel better under brighter settings (sunlight on the screen, etc...).

<span class="very-low-contr">Very low contrast</span> isn't an option neither.

## What about dark modes / themes?

You may be thinking about <span class="dark-mode">dark modes</span>, where the text is brighter than the background. They are better than the alternative; although, the way our screens work (having a white)

---

As a tangent, for power users (our target, programmers in this case), dark modes tend to be the norm. For normal users, they tend to be put of by the "negative text" [^6].

---

At the end, it isn't much better, as a lot of screens are back-lit; they have a white "square of light behind the pixels" so it lights the screen. So eye strain is practically the same (as well as long-term eye damage) and-

## WAIT, long-term eye damage?

Yep, turns out your parents were right about this. Exposure to blue light (400 - 500 nm) (Not only blue 
light, but any short-wavelength light) can be harmful to the retina. Peak damage being around 440 nm[^8], See Figure 1.

<a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4734149/figure/f1/">{{<figure src="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4734149/bin/mv-v22-61-f1.jpg" style="padding:20px;background-color: white; border: 5px dashed #292a2d;" caption="**Figure 1** | Source: [Tosini, G., Ferguson, I., & Tsubota, K. (2016). Effects of blue light on the circadian system and eye physiology. Molecular vision, 22, 61–72.](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4734149/) Copyright © 2016 Molecular Vision ; Creative Commons Attributions License" captionPosition="left">}}</a>

Note that longer duration ($12 - 48$) even with a lower intensity can also cause photochemical damage[^9], being cones (the <span class="wrd-color">**color**</span> ones) the most affected.

But don't worry, it seems like it doesn't represent a cause for concern for public health. Comparing natural exposures with the reasonably foreseeable exposure to optical radiation from lamps, computer screens and mobile devices, such as smartphones shows that the actual spectrally weighted irradiance is lower than the natural exposures.[^10]

Does this mean you can be dumb with your eyes? **No**.
Rant over.

## Ok, what about colors

As you probably know, humans don't see all colors with the same intensity. Although we have from <span class="wrd L">L</span>:<span class="wrd M">M</span> (red to green cones proportions) of about $1.1:1$ to $16.5:1$ ($52.7%$ - $94.3%$) in males[^11], we are actually a bit more perceptive to green (natural selection reasons). So, we should take this into account and make some calculations for balancing colors.

As we saw, <span class="wrd S">$440 nm$</span> is the most damaging wavelength in LED screens. So we'll use wavelengths shown on Figure 1 that have less than a $0.3$ in the Intensity scale.

So, we'll pick $420nm$ and $500nm$ (just some arbitrary values). If we do some math (that, admittedly may be wrong) we get that $420nm$ is <span style="background-color:#6a00ff;color:white;padding:2px;border-radius:5px;">this cool shade of purple</span> and $500nm$ is <span style="background-color:#00ff92;color:black;padding:2px;border-radius:5px;">this shade of green</span>.

There's a good thing here: Those are **almost** complementary colors. A complementary color is one that its opposite to another one in the color wheel. Orange and purple, green and red...

So, by being **almost** complementary, we already cover our requirement of having *kinda* low contrast
But, you're probably thinking that those colors are too bright, so we're going to lower their brightness in an equal way.

<span class="wrd" style="background-color: #400099;">We'll use this tone</span>, <span class="wrd" style="background-color:#009957;">waaay better</span>.

## Final touches.

So, we have our colors. Yay :D We can now put them to good use!
<div class="wrd" style="background-color: #400099;">I decided to use the darker color for the background so that your eyes are still... <i>where they should be.</i>

So, what do you think? <span style="color:#009957;">Is it pretty, is it beautiful?</span> Was this maybe just an excuse to research ophthalmology for a week and tell people about it? Do you feel <span style="color:#009957;">smarter</span> now?

If you were paying attention to the starting speech, you probably noticed that we just broke our first principle: "not too hairy, not too bald" meaning that, the contrast for these <span style="color:#009957;">green keywords</span> isn't really working... Maybe the idea of darkening both colors as much was just an idea I had. Maybe I'm bad at not following impulsive thoughts.

Anyway, I'll brighten this <span style="color:#009957;">color</span> to <span style="color:#00ff92;font-weight:bold;">this one</span>.

</div>

<br>

<div style="width:100%;height:0;padding-bottom:96%;position:relative;"><iframe src="https://giphy.com/embed/JmUfwENE6i4Jxig27n" width="100%" height="100%" style="position:absolute;border-radius:20px;" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/cat-wow-ruillu-JmUfwENE6i4Jxig27n">via GIPHY</a></p>

I can't believe it actually **looks kinda good**... *Maybe I should adopt it as the official theme for this blog...*

I really thought it would hurt my eyes even more. Maybe using science to craft things *does* work after all! 

## Conclusion

*Talking about eyes for so long makes my ocular globes feel weird...*
Ok, this was pretty fun to research, but note that I'm not even close to being an Ophthalmologist. Although I tried to provide as many references as I could, take this with a whole NaCl rock.

Also, did you know that I'm very scared by eyes? Like, a genuine phobia? Just a fun fact. *Making this was pretty fun :skull:* <sub>I think it all started when I was very young...</sub>

[^1]: [Dong Ju Kim, Chi-Yeon Lim, Namyi Gu, Choul Yong Park . "Visual Fatigue Induced by Viewing a Tablet Computer with a High-resolution Display"](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5636714/pdf/kjo-31-388.pdf)

[^2]: Isono H, Kumar A, Kamimura T, et al. . The effect of blue light on visual fatigue when reading on LED-backlit tablet LCDs. Procedings of International Display Workshops 2013

[^3]: [Chin-Chiuan Lin . Effects of contrast ratio and text color on visual performance with TFT-LCD](https://doi.org/10.1016/S0169-8141(02)00175-0)

[^4]: The findings of [REF 3] may not be too relevant for this post, as TFT-LCD screens aren't really used outside of calculators and digital watches. But I think it still works for our use-case

[^5]: [Sheppard, A. L., & Wolffsohn, J. S. (2018) . Digital eye strain: prevalence, measurement and amelioration. BMJ open ophthalmology, 3(1), e000146](https://doi.org/10.1136/bmjophth-2018-000146)

[^6]: [Richard H. Hall & Patrick Hanna (2004) . The impact of web page text-background colour combinations on readability, retention, aesthetics and behavioural intention](https://www.tandfonline.com/doi/abs/10.1080/01449290410001669932)

[^7]: [Light emitting diode physics -> Materials table, Wikipedia](https://en.wikipedia.org/wiki/Light-emitting_diode_physics#Materials)

[^8]: [Ham, W. T., Jr, Mueller, H. A., & Sliney, D. H. (1976). Retinal sensitivity to damage from short wavelength light. Nature, 260(5547), 153–155.](https://doi.org/10.1038/260153a0)

[^9]: [Tosini, G., Ferguson, I., & Tsubota, K. (2016). Effects of blue light on the circadian system and eye physiology. Molecular vision, 22, 61–72.](https://pubmed.ncbi.nlm.nih.gov/26900325/)

[^10]: [O'Hagan, J., Khazova, M. & Price, L. Low-energy light bulbs, computers, tablets and the blue light hazard. Eye 30, 230–233 (2016).](https://doi.org/10.1038/eye.2015.261)

[^11]: [Hofer, H., Carroll, J., Neitz, J., Neitz, M., & Williams, D. R. (2005). Organization of the human trichromatic cone mosaic. The Journal of neuroscience : the official journal of the Society for Neuroscience, 25(42), 9669–9679.](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6725723/)

<style>	.kinda-good {background-color: #dbdbdb !important;color: #262626;padding: 2px; border-radius: 5px;	}.very-bad {background-color: #FFFFFF;color: #000000;	padding: 2px;border-radius: 5px;} .very-low-contr { background-color: #9c9c9c; color: #737373; padding: 2px; border-radius: 5px;} .dark-mode { background-color: #000000; color: #FFFFFF; padding: 2px; border-radius: 5px; } .wrd-color { background: -webkit-linear-gradient(180deg, pink, hotpink); -webkit-background-clip: text; -webkit-text-fill-color: transparent; } .wrd { padding: 4px; color:white; border-radius: 5px; } .S { background-color: #0013ff } .M {background-color: green;} .L {background-color: red;} .correct {background-color: orange; color:black; padding: 2px; border-radius: 5px; border: 2px dashed yellow} </style>