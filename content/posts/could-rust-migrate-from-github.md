---
title: 'Could Rust migrate from GitHub?'
date: 2025-12-10T14:00:00+01:00
draft: false
---

[Zig migrated from GitHub to Codeberg](https://ziglang.org/news/migrating-from-github-to-codeberg/), this
sent waves through the free and open source software ecosystem. It set a precedent for which big projects
_could_ migrate from GitHub, and people listened.

Until now, if you were a project born on GitHub, you'd die on GitHub. GitHub (i.e. Microsoft)
does not like that other code hosting tools exist, and thus, doesn't proportionate any kind of
migration tool or implement any open protocol. If Git wasn't already open, we can be sure that
Microsoft would close and obfuscate its algorithm.

So, we have this dissonance in which Git is an open standard, built to be able to be easily migrated
from/to other VCS systems such as [Jujutsu (`jj`)](https://www.jj-vcs.dev/latest/). While the
absolute biggest VCS hosting tool is not only closed source, but for-profit, proprietary and ruled
by a company [without the cleanest](https://www.businessinsider.com/github-ceo-developers-embrace-ai-or-get-out-2025-8) of [track records](https://www.datacenterdynamics.com/en/news/microsoft-confirms-its-providing-ai-and-cloud-services-to-israeli-military-for-war-in-gaza/).

Ok, so Git is an open standard, and big projects are moving out of GitHub because of a not-so-friendly
parent company. Why would Rust?

## Regaining control over the ecosystem

[78% of Rust crates live in GitHub](https://rust-digger.code-maven.com/vcs/), with another 17.13% not having a
public repository, but we can imagine that much of those are also on GitHub. This leaves out just 5% of crates
that do not live on GitHub.

In other words, for every 20 crates published in `crates.io`, 1 will be published
in something that isn't the Microsoft-owned proprietary VCS hosting site.

## Regaining control over their contributions

While the Rust Project (i.e. everything that lives under the official `rust-lang` organization, such as the compiler and dev tools)
does not suffer from a [AI-slop bug reports](https://www.theregister.com/2025/05/07/curl_ai_bug_reports/) problem like Curl does, I think
that it's just a matter of time until the abundance of all the Copilot-based tools makes it a problem in the Rust Project.

## GitHub Actions isn't really...

- YAML is really suboptimal. Does not have types or autocompletion, or functions really **(or curly brackets to denote bodies!)**.
- No real way to run/debug GitHub Actions locally (yes, I know, and I've used [`act`](https://github.com/nektos/act), it doesn't run well).
- No way to check if a GitHub action has the correct syntax (ties back to not being able to run locally).
- Is a security nightmare, extremely vulnerable to supply chain attacks with elevated privileges.
- Incredibly easy to script-inject.
- Complexity grows very big, very fast.

I'm sure everyone here has dealt before with Actions and knows exactly what I'm talking about.

# Migrate? To where?

**Realistically**, to [Codeberg](https://codeberg.org).

It's where Zig moved to, it's well-maintained, and it's a non-profit.
But preaching for Codeberg isn't really nothing new, as both Codeberg
and its parent project "Forgejo" are currently the most popular
self-hosted Git hosting platforms.

But just going with the most popular and well-maintained option isn't that interesting, what are some other options in the market currently?

## Srht?

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="1rem"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200z"></path></svg> Sourcehut, maintained by Drew DeVault and currently in a public alpha. It has support for mailing lists and ticket tracking, and it has two interesting features that GitHub lacks:

- Provides a hosted IRC, with a web chat; and,
- It's fully self-hostable; meaning that,

Sourcehut is self-hostable, although I don't know how much support is there for self-hosting it.
Also, it leaves us with the only pay-to-host solution. Definitely an interesting proposal thanks to its 0 Javascript, minimalist, "Get Things Done" approach.

## Radicle

![Radicle Banner Image](https://radicle.xyz/assets/images/banners/16.medium.png)

The most different solution in this whole article, [Radicle](https://radicle.xyz) offers a decentralized way to do Git hosting.
Unlike GitHub or Gitlab, Radicle replicates repositories across peers in a decentralized network, and **still** offering the familiar
interface for managing issues and pull requests. Also, being that Radicle is an open protocol, Rust could modify it without too much hassle
in order to adapt it to our needs.

I'm not going to lie, this is both the option that most intrigues me, _and_ the least likely.

Radicle is a project that solves a very specific issue, but that affects every modern programmer. GitHub won't last forever.
And everyone that hosts their project on GitHub will have to move it eventually to another platform if they wish to protect
it. I firmly believe that decentralization on the internet is not only the future, but also the past and the correct way in
general. The centralized internet is an oxymoron as the spirit of the internet is to be ungovernable, to empower everyone to share
their knowledge without fear of being taken down.

I think that the Radicle developers have a great vision of what the future of code hosting _could_ be, and I'd love to see
what that vision comes to.

# Conclusion

Will Rust move from GitHub? Probably, will it be soon? Probably not. I think that moving from GitHub would bring Rust several
benefits (both technical and moral-based) but it would also come with drawbacks, such as hosting.

If you're wondering if Rust has thought about it: I don't know, I couldn't find anything in the official Zulip or scouting through pull requests.
If someone that has been in the project more than me can testify for or against this, email me.

And that is all, remember to support your local indieweb and have a great evening!

