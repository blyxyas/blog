---
title: '(26) Thoughts from an open source maintainer, as a numbered list'
date: 2025-04-15T16:13:01+01:00
draft: false
---

Hi dear reader; the other day I got approached by the [Open Source Initiative] to
make a post in their website talking about being a maintainer, what my experience was,
what I would say to contributors, and what are the hidden hardships of being a maintainer.

That post is not yet up (in fact, I'm not even sure if can disclose it). But that got me
thinking. What else do I have to say about maintainer (free) open source software? What
would other maintainers benefit from knowing? So I made a numbered list to talk about it all.

Also, this will probably end up as a series, because I have lots of these little bits of
information that just come up in my head everyday.

> Btw, did you notice my website redesign? It's now more readable, I'll have to ruin it in the future, too mobile friendly.

Before starting, while some of these represent an absolute truth (e.g. *Have an extensive
testing suit*), most of these have nuances. Don't just accept my advice, **always use your
critical thinking skills**, because I'm just another rando on the worldwide web.

## 1. Better pull requests, better software
While you may think "that's obvious", the amount of times I've seen pull requests
with 8+ commits and thousands of lines changed may be in the dozens. So in a [Sun Tzu]
fashion, I'll have to spell out everything in detail, even the seemingly obvious
ones.

### Have a good CI pipeline
Test for every target architecture that you care about
(at least Windows 64-Bit, Mac ARM and Linux x86_64). You'll probably have to use
a dedicated OS runner for this.

### Make a good pull request standard
Pull requests should **always** have a
description talking about what the problem is, the approach to fix that problem,
and ideally also how to review the pull request. You can use Github's pull request
template for this (e.g. Remembering the user to check formatting before submitting)

### Pull requests should be small
Ideally under 100-150 lines, but sometimes pull
requests deliver big features! In those cases, split your pull requests into commit,
each one with their own independent description. This will represent both less mental
load into the reviewer (who will catch more bugs) and reduce your review times.

### Review your own pull requests before submitting
(in a diff, with all the commits squished). You'll find typos that you have no recollection of writing, and you'll spot
obvious bugs. This saves the reviewer time, reduce the probability of a bug, and will
speed-up the contribution process.

### Have a pull request reviewing process documented
Depending on the complexity of your proyect this is either a *want* or a *need*.
Checking for every possible interaction within your program is tedious and there may
very well be 40+ things to take care for before merging. Forgetting a single one that
happens to cause a bug is very well possible.

### Always try to break the contributor's code
It's easy to just think that the
contributor has handled weird scenarios beforehand, even more if it's a known
contributor, but don't let yourself fall in this trap! Try thinking about what
would happen to a contribution if the user made the worst decision possible, or
what would happen if a hacker gave a specially crafted input. Is a loop early-returnable?
Always try your hardest to break in the worst ways possible a contributor's code.



## 2. Better mental health, better reviewer

A more maintainer-focused field, but still important for everyone.
I'm not a psychologist, so this won't be that kind of "mental health" talk. I'm
being a little bit more pragmatic than you may expect, but don't hesitate to seek
help from people that can provide it.

### Burnout is real and scary

While you may think that you can just "tank" through it,
burnout is not noticed until you find yourself not being able to focus for more
than 3 minutes without crying. You won't be able to read code without thinking
immediately of egyptian hieroglyphs.

### Better late than never
The last point also means sometimes priorizing yourself over
reviews. Mental load capacity is variable, there are periods in our lives where
we have almost infinite capacity, while there are others where it seems that we are
constantly at risk of a breakdown. This is natural if you have a life where things
happen and you aren't the best human cosplayer of a plant. Don't risk burnout for a review
being delivered one day faster.

### Don't overdo it.
I've seen many cases of people doing too much, to the point of them converting
what was initially a passion project into a burden, and then abandoning a project. Don't open/review
5+ pull requests a day, even if you think you have the capacity for them.

### Set up vacation periods
If you work with a larger team, set up a "protocol" to get yourself
in vacation. In the [Rust organization] we have a bot that randomly assigns reviewers to each pull request ([triagebot]), and
that bot has a configuration flag for setting a user as "on vacation" without taking them out of the team.

## 3. Better issues, results quicker
Making bugfixes without the help from your community is unrealistically hard
to do consistently. The difference between a good issue that reports everything
correctly, highlights the important details of the bug and provides the user's computer
specification, and one that doesn't, could be weeks of development.

Make yourself a favour and work on issue-reporting capabilities.

### The user shouldn't work hard for great issues
Direct the user to the relevant
details, the easiest way to do this is via an *issue report template* (you have these
on both GitHub and GitLab). The template should have **at least** the following fields:

    1. Version of the project that produced the issue.
    2. Operating system + Architecture (64 Bit? ARM?)
    3. A minimal reproducible example / a link to a page
    that showcases the error (like a repo in which the error appeared)

### Separate bugs from crashes and from feature requests
Pretty self-describing. Git[Hub/Lab] have these capabilities, with the already mentioned issue templates.

### Log everything, but don't send it automatically
And I want to put the
necessary emphasis to this statement. **TELEMETRY MUST BE MANUALLY SENT AND THE
USER MUST KNOW WHAT IS BEING SENT** as a minimum. Having an extensive log file
to backtrace is probably 💫 the number one 💫 debugging tool for any project, but don't
exploit the user's confidence by making it opt-out and automatically sent via the
internet.

### Learn to bisect issues
Either via [`git bisect`] or with any other bisecting tool.
Narrowing a bug to any individual commit might be the biggest booster in the
probability of resolving a bug.

### Learn to fuz
As [fuzz testing] are pretty project-specific, you might have to
create your own tool. But finding crashes in your application with some fuzzing is 100x times
better than a user's workflow being stopped from a bug in your application.

### The user's workflow is sacred

As a general mantra, the user's workflow is **sacred** (I learnt this from a maintainer
of [neovim]). And any issue that results in their workflow being paused, stopped or crashed
is of the utmost degree.

## 4. Save yourself work, write documentation
Nobody likes writing documentation (if you're one of those caritative souls,
please speak up). But the one single thing that will save you the most time.

### Documentation will increase your scope.
More contributors being able to
answer their own questions (even the more complex ones) means that more contributors
will get past the "fork and hack" phase.

### You'll be saving yourself work
Not as many questions to answer in
a pull request, having links at hand for a contributor's further reading.
This is a life-saver if I've even seen one.

### This also includes meta-documentation
Things like commit descriptions,
a `CONTRIBUTING.md` (**essential**) file, or Github's pull request and issue
templates are also very, very important.

### Document even internal processes
Processes like writing the changelog, syncing
the staging branch to production, how to formulate error messages, or a simple style guide
are also of great value and often overlooked.

## 5. Improve your systems

### Don't guess, benchmark
This also applies to all kinds of other "mystery events". Don't guess about
memory learks, use [heaptrack]. Don't guess about memory safety, use a static
code analyzer. Don't guess about performance, learn to use `perf`.

### Better tools' knowledge, more efficient workflow
Know your system, the better you know the tools you're using the better code
you'll produce and the faster you'll be able to iterate on a design. With this
I don't mean learning a fancy-schmancy IDE or keyboard layout, but learning to
make `perf` valuable, learning to read stack traces, learning to efficiently
search throughout your documentation to find that edge case that has been
bugging you out all week.

### Do W I D E experiments
Test your project over all projects that you can, depending on the scope of
your project this might be from a dozen to thousands. In Rust we have Crater,
a very handy tool that tests the latest version before becoming stable over
**all** Rust code publicly available. This is to ensure that we don't break anyone's
workflow. (Yes, this also means that Crater has tested *your* code). You can even
integrate some subset of these experiments in your CI workflow before every merge!

### Code coverage
Yep, I know, 100% test coverage is not really feasable or a good metric to strive for.
But I've seen files with 60% testing coverages in my limited career with code coverage.
If you're using LLVM (like the [Clang compiler] or [Rust]) you can use `llvm-cov` to ensure
that more or less everything is accounted for in your test suite.

## 6. Learn from your environment

### Every engineer is different
Everyone has strong points and weak points. Learning from other people lets us
improve those weak points that **we all** have. We are on the shoulders of giants,
let's not waste that. The only difference between us and a person from 2000 years
ago is the millenia that we carry as cumulative knowledge.

### READ

This is probably something you already do if you're reading this, but don't hesitate to
know about how other people do their stuff. Many people in the open source ecosystem have
a personal blog in which they post their shenanigans. Knowing who to look for in the
right scenario is one of the best skills that you can master.

## Conclusion

I will keep aggregating new tips and either update this post or make a new one with
some new knowledge. Did you learn anything today? I sure hope you did.

Go with peace my dear reader. I'm releasing you from the cage that is this post to
let you wonder freely over the green fields that is the open source ecosystem.

Bye! ✌

<!-- - **Always keep your CI in check**. Sanitize the inputs that your CI -->
<!-- pipeline uses, including branch names, contributor's user names, and -->
<!-- pull request's title/body. This also means keeping an eye on your CI -->
<!-- dependencies (which I'm not a fan of, btw). -->

<!-- Why are you reading these? They are for a future update!!! >:( -->

<!-- - **Your code might be ran in super-user mode**. If you're using dynamic -->
<!-- libraries (i.e. [`.so` files]), have them signed and checked on runtime. -->
<!-- An attacker could very well change those files and the user could -->
<!-- perfectly not notice. -->

[Rust]: https://rust-lang.org
[Open Source Initiative]: https://opensource.org
[Sun Tzu]: https://wikipedia.org/wiki/Sun_Tzu
[triagebot]: https://github.com/rust-lang/triagebot
[Rust organization]: https://github.com/rust-lang
[`.so` files]: https://en.wikipedia.org/wiki/Shared_library
[`git bisect`]: https://git-scm.com/docs/git-bisect
[fuzz]: https://en.wikipedia.org/wiki/Fuzzing
[fuzz testing]: https://en.wikipedia.org/wiki/Fuzzing
[neovim]: https://github.com/neovim/neovim
[heaptrack]: https://github.com/KDE/heaptrack
[Clang compiler]: https://clang.llvm.org/

