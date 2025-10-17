---
title: 'How we organized the Rust Clippy feature freeze'
date: 2025-10-16T16:13:01+01:00
draft: false
---

During two releases (1.88.0 - 1.90.0) we paused the introduction of new features into the Clippy linter. This means
that we held hostage all lint-adding pull requests, all false-negative fixing pull requests, ALL new configuration
options for user-facing features and overall, anything that added new complexity instead of taking it away
(with the exception of bugfixes that focused on removing false positives, those were permitted to add complexity.)

## Motivation

Every good idea needs something that sparks it, if an idea doesn't have one, that isn't an idea, that's a random
thought. The motivation for this one was that we had a bigger surface for bugs that we were able to handle.

With over 750 lints, and every single one having to account for all patterns that can arise in your Rust codebase
both in current, past and future versions (and with both kinds of macros included!) the hard thing is for Clippy to
be as clean and effective as it is (which, hearing your feedback. seems like it is!)

We had too many lints, many with some reported issues that we were delaying fixing because of limited reviewing
capacity + it's objetively more fun working on adding new lints for contributors.

That's why on the March 4th Clippy meeting I presented the idea of doing a "bugfixes-only period", later renamed 
into _feature freeze_. Two days later I opened an issue on our issue tracker with some more details.

## Preparation

Feature freezes aren't a thing that we as Clippy or the broader Rust project does frequently. So we needed to iron out
every detail possible before execution.

As with any activity that involves humans, communication is extremely important. So we posted on
the ["Inside Rust" blog][inside-rust] and [edited the book](https://github.com/rust-lang/rust-clippy/pull/14456) in order to
include information about the feature freeze.

As a little indirection in our story, I want to mention how everyone's feedback was so positive! With online
communities you can never be completely sure about their reaction to events, but I was extremely pleased
to see everyone have such good and positive comments.

This is one that really got to my heart ❤️

![Lobsters comment goes: As an incredibly happy user of Clippy: thank you, maintainers, for deciding to take this twelve week freeze. Not because I find it buggy (I don't) but for having the self respect necessary to do it. I'd never have guessed this was needed, and I'm so pleased you're able to focus on the maintenance before my currently unshakable confidence started to notice cracks. Thank you for such an incredible tool!](/images/lobsters_comment.png)

---

One of the main objectives for this feature freeze was to bring some new fresh blood onto the project. Open source
projects thrive when new people are adopted into the project; So I wanted to make sure that people took this feature
freeze as an opportunity to contribute to high-impact, low difficulty issues.

So, being that I wanted to bring new contributors, highlighting easy issues to work on was crucial.
That's the birth of our [[TRACKING] Highlighted issues for the feature freeze #15086](https://github.com/rust-lang/rust-clippy/issues/15086)
issue.

That's why I created ["clippy-triager"](https://github.com/blyxyas/clippy-triager).
It's a tool that scans Clippy's github issues and lets me see the ones that haven't been fixed, and have received very little attention

Apart from highlighted issues, Mentorship and some initial evaluation was also provided. Issues were bisected to see
if there was a single change we could point to when bugfixing. We really went above and beyond so that any person that
wanted to contribute to Clippy, **could** contribute to Clippy. At the end of the day, no one can mantain a project
forever and contributions are the blood of an open source project. So lowering the amount of internal and
hyper-specific knowledge is vital for any open source project.

## Execution

Now that the team is all in the same page, and users have been warned, we can proceed into the freeze itself. Nothing about this period stands out. For the next two weeks I'll go look at 3-5 issues a day and add the easier ones with highest impact.

Whenever a question arrised, either I or other team member answered it. If a user opened a lint-adding pull request, a bot posted the following comment:

---

**Seems that you are trying to add a new lint!**

We are currently in a feature freeze, so we are delaying all lint-adding PRs to September 18 and [focusing on bugfixes](https://github.com/rust-lang/rust-clippy/issues/15086).

Thanks a lot for your contribution, and sorry for the inconvenience.

With ❤ from the Clippy team.

@rustbot note Feature-freeze
@rustbot blocked
@rustbot label +A-lint

---

We had to do lots of tunning to the Github action posting the comment, but that was the final revision (As you probably know, GHA is not the best tool).


## Conclusion

We can say that the [feature freeze was a complete success.](https://github.com/rust-lang/rust-clippy/blob/master/CHANGELOG.md#rust-190).
With 326 merged pull requests and about all of them being fixed false positives, we improved the accuracy of Clippy greatly!

If you're wondering if we'll be repeating this, the answer is _probably_. Not so frequently that anyone will notice
a slowdown in adding features, but just enough that everyone will be a little more confident that Clippy is correct.

And effectively, we brought **47 new contributors** into the project! 47 New people, each with their own aspirations.
In fact, being that this is my blog and I can do whatever I want, I'll just post the whole list along with their
first contribution.

[@ada4a](https://github.com/ada4a) with [#15763](https://github.com/rust-lang/rust-clippy/pull/15763)
[@AudaciousAxiom](https://github.com/AudaciousAxiom) with [#15758](https://github.com/rust-lang/rust-clippy/pull/15758)
[@zihan0822](https://github.com/zihan0822) with [#15748](https://github.com/rust-lang/rust-clippy/pull/15748)
[@qmwrygdxpzc](https://github.com/qmwrygdxpzc) with [#15745](https://github.com/rust-lang/rust-clippy/pull/15745)
[@illicitonion](https://github.com/illicitonion) with [#15734](https://github.com/rust-lang/rust-clippy/pull/15734)
[@felix91gr](https://github.com/felix91gr) with [#15711](https://github.com/rust-lang/rust-clippy/pull/15711)
[@code-with-aneesh](https://github.com/code-with-aneesh) with [#15700](https://github.com/rust-lang/rust-clippy/pull/15700)
[@GalileoCap](https://github.com/GalileoCap) with [#15689](https://github.com/rust-lang/rust-clippy/pull/15689)
[@jsgf](https://github.com/jsgf) with [#15686](https://github.com/rust-lang/rust-clippy/pull/15686)
[@teofr](https://github.com/teofr) with [#15678](https://github.com/rust-lang/rust-clippy/pull/15678)
[@km274](https://github.com/km274) with [#15656](https://github.com/rust-lang/rust-clippy/pull/15656)
[@dbaranov34](https://github.com/dbaranov34) with [#15640](https://github.com/rust-lang/rust-clippy/pull/15640)
[@dylni](https://github.com/dylni) with [#15633](https://github.com/rust-lang/rust-clippy/pull/15633)
[@JustusFluegel](https://github.com/JustusFluegel) with [#15628](https://github.com/rust-lang/rust-clippy/pull/15628)
[@nickdrozd](https://github.com/nickdrozd) with [#15625](https://github.com/rust-lang/rust-clippy/pull/15625)
[@folkertdev](https://github.com/folkertdev) with [#15613](https://github.com/rust-lang/rust-clippy/pull/15613)
[@NyCodeGHG](https://github.com/NyCodeGHG) with [#15597](https://github.com/rust-lang/rust-clippy/pull/15597)
[@AbhilashG12](https://github.com/AbhilashG12) with [#15588](https://github.com/rust-lang/rust-clippy/pull/15588)
[@zhoujiaweii](https://github.com/zhoujiaweii) with [#15586](https://github.com/rust-lang/rust-clippy/pull/15586)
[@YohDeadfall](https://github.com/YohDeadfall) with [#15565](https://github.com/rust-lang/rust-clippy/pull/15565)
[@szokeasaurusrex](https://github.com/szokeasaurusrex) with [#15563](https://github.com/rust-lang/rust-clippy/pull/15563)
[@xihuwenhua](https://github.com/xihuwenhua) with [#15530](https://github.com/rust-lang/rust-clippy/pull/15530)
[@AMS21](https://github.com/AMS21) with [#15517](https://github.com/rust-lang/rust-clippy/pull/15517)
[@KushalMeghani1644](https://github.com/KushalMeghani1644) with [#15505](https://github.com/rust-lang/rust-clippy/pull/15505)
[@scrabsha](https://github.com/scrabsha) with [#15496](https://github.com/rust-lang/rust-clippy/pull/15496)
[@RunDevelopment](https://github.com/RunDevelopment) with [#15488](https://github.com/rust-lang/rust-clippy/pull/15488)
[@SomeoneToIgnore](https://github.com/SomeoneToIgnore) with [#15454](https://github.com/rust-lang/rust-clippy/pull/15454)
[@2asoft](https://github.com/2asoft) with [#15452](https://github.com/rust-lang/rust-clippy/pull/15452)
[@reddevilmidzy](https://github.com/reddevilmidzy) with [#15448](https://github.com/rust-lang/rust-clippy/pull/15448)
[@autarch](https://github.com/autarch) with [#15447](https://github.com/rust-lang/rust-clippy/pull/15447)
[@esther-ff](https://github.com/esther-ff) with [#15443](https://github.com/rust-lang/rust-clippy/pull/15443)
[@Huterenok](https://github.com/Huterenok) with [#15416](https://github.com/rust-lang/rust-clippy/pull/15416)
[@Fayti1703](https://github.com/Fayti1703) with [#15409](https://github.com/rust-lang/rust-clippy/pull/15409)
[@krikera](https://github.com/krikera) with [#15382](https://github.com/rust-lang/rust-clippy/pull/15382)
[@houpo-bob](https://github.com/houpo-bob) with [#15372](https://github.com/rust-lang/rust-clippy/pull/15372)
[@ComputerDruid](https://github.com/ComputerDruid) with [#15339](https://github.com/rust-lang/rust-clippy/pull/15339)
[@marv7000](https://github.com/marv7000) with [#15332](https://github.com/rust-lang/rust-clippy/pull/15332)
[@lkshayb](https://github.com/lkshayb) with [#15241](https://github.com/rust-lang/rust-clippy/pull/15241)
[@AljoschaMeyer](https://github.com/AljoschaMeyer) with [#15228](https://github.com/rust-lang/rust-clippy/pull/15228)
[@Knotty123230](https://github.com/Knotty123230) with [#15226](https://github.com/rust-lang/rust-clippy/pull/15226)
[@Jared-Prime](https://github.com/Jared-Prime) with [#15222](https://github.com/rust-lang/rust-clippy/pull/15222)
[@Artur-Sulej](https://github.com/Artur-Sulej) with [#15215](https://github.com/rust-lang/rust-clippy/pull/15215)
[@isitreallyalive](https://github.com/isitreallyalive) with [#15212](https://github.com/rust-lang/rust-clippy/pull/15212)
[@Zarathustra2](https://github.com/Zarathustra2) with [#15179](https://github.com/rust-lang/rust-clippy/pull/15179)
[@itsjunetime](https://github.com/itsjunetime) with [#15170](https://github.com/rust-lang/rust-clippy/pull/15170)
[@odysa](https://github.com/odysa) with [#15157](https://github.com/rust-lang/rust-clippy/pull/15157)
[@PitiBouchon](https://github.com/PitiBouchon) with [#15154](https://github.com/rust-lang/rust-clippy/pull/15154)

In the case that some of these usernames becomes the next Steve Jobs, know that Clippy will be their forever home.
In the same breath, if some of these become a fascist dictator, we do not claim that person and do not even know their
name.

![Obama awards Obama a Medal](/images/obama_awards_obama_a_medal.jpg)

Also, I'll publish an interview with the most profilic contributor in the project soon. So stay tuned!

[inside-rust]:https://blog.rust-lang.org/inside-rust/2025/06/21/announcing-the-clippy-feature-freeze
