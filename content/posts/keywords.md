---
title: "Stop putting weird things in your titles, please ❤️"
date: 2023-06-19T23:12:03+02:00
draft: false
katex: true
rainbowcursor: true
---

I'm a frequent YouTube user, I've been watching videos as early as I can remember. If you are also a frequent YouTube user, you've probably seen content creators' title style changing in real time. There was an era when everything was IN ALL CAPS. Then, Every Single Word Started Being Capitalized. Now, some videos simply don't capitalize their videos as the stylistic choice. Do you remember when they used \*\*ASTERISKS\*\* as if they made the title bolder than it already is? In the early days, everything had to be in its own series. If you've made 2 vlogs, *now you have a vlogging series*! So you put " | Vlog Ep. 2" at the end of your title. Yay :D

In this post, we'll use some science to discover the actual reality between titles and user's attention.

## User attention

We take more time reading more complex words[^1], and because of time being a slippery slope, a user may decide to spend a bit more time watching closely the thumbnail.

Turns out **I lied**. Readability tests such as the SMOG grading[^2] have some exceptions (e.g. "Wikipedia", a quite simple word nowadays has the same smog grading as "Anesthetic"), so words enclosed by asterisks don't work, as users just try to ignore these symbols (and <abbr title="As Far As I Know">AFAIK</abbr>, YouTube doesn't format text in videos' titles). These asterisks could even annoy people, which could lead to them not clicking on your video.

---

<span id="allcaps-span">**What about ALL CAPS?** Well, it's more complex than it looks.
Writing in full-uppercase increases performance when the task involves identifying single characters or individual words during briefer exposure.[^3] But, mixing lower and uppercase could give readers with dyslexia some confusion (as well as italic and underline in order to give emphasis)[^4]. When the task involves reading continuous text, however, there is generally superior performance with lowercase letters (Miles Tinker reported that text in all uppercase letters slowed reading speed by $\approx10.2\\%-14.2\\%$[^5] compared with text in combined uppercase and lowercase letters). It lowers not only speed, but also comprehension[^6].</span>

<button onclick="allcaps()" style="color:var(--color);font-family: 'Inter', -apple-system, BlinkMacSystemFont, ;'Roboto', 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 1rem;"><p>If you don't believe this, click this for an ALL-CAPS demo! (<span class="correct">WARNING, It's veeery ugly</span>)</p></button>

## But could slower be better?

We now know that writing in styles other than the regular English (if you're writing in English) is worst in almost all ways on unformatted text. But, **what if being slower to read is better as a video creator?.** After all, if a person spends more time reading your video's title, that person may fall victim to a micro-sunk cost fallacy and may spend even more time analyzing your thumbnail, original channel and number of views (hard to say this, but views attract more views). Slower reading speeds can correlate to higher comprehension[^7] and higher comprehension may correlate to higher retention (in-memory)[^8]. Note that this **retention is heavily influenced by knowing some preceding context**.

If a user knows the context, it's much more likely that this user remembers the text.[^8] So, at the end, maybe having a 2-episodes series is better!

## Conclusion

So, at the end, we have some (not definitive) results. Don't use too much UPPERCASE (only for symbols or single words), capitalize like a normal human being, and, perhaps most important, **don't use \*\*asterisks\*\*, they hurt my eyes and do literally nothing apart from annoying your users.**

But before doing all that, remember to be original! Don't study it too much, users will click on a video different to the rest of their feed, not on a video that just has a cool title.

And with that, I think we're done! Thanks for reading! :heart:

<div class="tenor-gif-embed" data-postid="18642422" data-share-method="host" data-aspect-ratio="1.78771" data-width="100%"><a href="https://tenor.com/view/banana-cat-eating-gif-18642422">Banana Cat GIF</a>from <a href="https://tenor.com/search/banana-gifs">Banana GIFs</a></div> <script type="text/javascript" async src="https://tenor.com/embed.js"></script>

[^1]: [Ilan Kirsh. 2020. Using Mouse Movement Heatmaps to Visualize User Attention to Words. In Proceedings of the 11th Nordic Conference on Human-Computer Interaction: Shaping Experiences, Shaping Society (NordiCHI '20). Association for Computing Machinery, New York, NY, USA, Article 117, 1–5.](https://dl.acm.org/doi/abs/10.1145/3419249.3421250)

[^2]: [G. H McLaughlin. 1969. SMOG grading: A new readability formula. Journal of Reading 12 (08 1969), 639–646. Issue 8.](https://ogg.osu.edu/media/documents/health_lit/WRRSMOG_Readability_Formula_G._Harry_McLaughlin__1969_.pdf)

[^3]: [Carol Bergfeld Mills and Linda J. Weldon. 1987. Reading text from computer screens. ACM Comput. Surv. 19, 4 (Dec. 1987), 329–357.](https://doi.org/10.1145/45075.46162) <sup>*There may be some differences between screens and paper, we cannot get definitive information. Although it seems to be good enough</sup>

[^4]: [Yoliando, F. T. (2020, December). A comparative study of dyslexia style guides in improving readability for people with dyslexia. In International Conference of Innovation in Media and Visual Design (IMDES 2020) (pp. 32-37). Atlantis Press.](https://doi.org/10.2991/assehr.k.201202.050)

[^5]: Miles Tinker, Bases for Effective Reading, 1965, Minneapolis, Lund Press. p. 136.
[^6]: [Poulton, E. C., & Brown, C. H. (1968). Rate of comprehension of an existing teleprinter output and of possible alternatives. Journal of Applied Psychology, 52(1, Pt.1), 16–21](https://psycnet.apa.org/doi/10.1037/h0025358)

[^7]: [Wallot, S., O'Brien, B. A., Haussmann, A., Kloos, H., & Lyby, M. S. (2014). The role of reading time complexity and reading speed in text comprehension. Journal of Experimental Psychology: Learning, Memory, and Cognition, 40(6), 1745–1765.](https://doi.org/10.1037/xlm0000030)

[^8]: [Dooling, D. J., & Lachman, R. (1971). Effects of comprehension on retention of prose. Journal of Experimental Psychology, 88(2), 216–222.](https://doi.org/10.1037/h0030904)

<style>.post-title { font-size: 72px; background: -webkit-linear-gradient(#eee, #c974f7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; } .correct {background-color: orange; color:black; padding: 2px; border-radius: 5px; border: 2px dashed yellow}</style>

<script>
	let isAllCaps = false
	function allcaps() {
		isAllCaps = !isAllCaps
		if (isAllCaps) {
			document.getElementById("allcaps-span").innerHTML = document.getElementById("allcaps-span").innerHTML.toUpperCase();
		} else {
			document.getElementById("allcaps-span").innerHTML = document.getElementById("allcaps-span").innerHTML.toLowerCase();
		}
	}
</script>