---
title: 'The (rust) Clippy Changelog Cat Contest, a retrospective'
date: 2025-10-28T13:19:01+01:00
draft: true
---

A long time ago, the Clippy kingdom was suffering from the darkest of epidemics; our changelog wasn't formatted as it
should. In an ocean of tears, a hero arose, a not so important issue with the name of [#10847][10847] It brought great joy to
the kingdom, as now the 3-4 people interested in the Changelog could categorize the relevant issues at their discretion.


And with that joy, once the dust settled, a years-old tradition would be born. The Clippy Changelog Cat Contest (CCCC).
Today, I'll tell you the history behind the tradition.

## The beginning

First, some context.
In Clippy (Rust's linter), for as long as I can remember, our changelog pull requests were... special. The team member
that took great care of writing them also liked to include a poem in each one. Fred's poems are a tradition that still goes on
to this day, through [**multiple changelog-writers**][alexey]. After [a meeting][meeting], we decided that maybe it was time to update how
the changelog was written, nothing fancy. Based on that meeting, the [forementioned issue][10847] was created.

Maybe I made my greatest comment to date, and I'm the reason for this post.

<blockquote class="mastodon-embed" data-embed-url="https://tech.lgbt/@jyn/111794340630068408/embed" style="background: #FCF8FF; border-radius: 8px; border: 1px solid #C9C4DA; margin: 0; max-width: 540px; min-width: 270px; overflow: hidden; padding: 0;"> <a href="https://tech.lgbt/@jyn/111794340630068408" target="_blank" style="align-items: center; color: #1C1A25; display: flex; flex-direction: column; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', Roboto, sans-serif; font-size: 14px; justify-content: center; letter-spacing: 0.25px; line-height: 20px; padding: 24px; text-decoration: none;"> <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32" viewBox="0 0 79 75"><path d="M63 45.3v-20c0-4.1-1-7.3-3.2-9.7-2.1-2.4-5-3.7-8.5-3.7-4.1 0-7.2 1.6-9.3 4.7l-2 3.3-2-3.3c-2-3.1-5.1-4.7-9.2-4.7-3.5 0-6.4 1.3-8.6 3.7-2.1 2.4-3.1 5.6-3.1 9.7v20h8V25.9c0-4.1 1.7-6.2 5.2-6.2 3.8 0 5.8 2.5 5.8 7.4V37.7H44V27.1c0-4.9 1.9-7.4 5.8-7.4 3.5 0 5.2 2.1 5.2 6.2V45.3h8ZM74.7 16.6c.6 6 .1 15.7.1 17.3 0 .5-.1 4.8-.1 5.3-.7 11.5-8 16-15.6 17.5-.1 0-.2 0-.3 0-4.9 1-10 1.2-14.9 1.4-1.2 0-2.4 0-3.6 0-4.8 0-9.7-.6-14.4-1.7-.1 0-.1 0-.1 0s-.1 0-.1 0 0 .1 0 .1 0 0 0 0c.1 1.6.4 3.1 1 4.5.6 1.7 2.9 5.7 11.4 5.7 5 0 9.9-.6 14.8-1.7 0 0 0 0 0 0 .1 0 .1 0 .1 0 0 .1 0 .1 0 .1.1 0 .1 0 .1.1v5.6s0 .1-.1.1c0 0 0 0 0 .1-1.6 1.1-3.7 1.7-5.6 2.3-.8.3-1.6.5-2.4.7-7.5 1.7-15.4 1.3-22.7-1.2-6.8-2.4-13.8-8.2-15.5-15.2-.9-3.8-1.6-7.6-1.9-11.5-.6-5.8-.6-11.7-.8-17.5C3.9 24.5 4 20 4.9 16 6.7 7.9 14.1 2.2 22.3 1c1.4-.2 4.1-1 16.5-1h.1C51.4 0 56.7.8 58.1 1c8.4 1.2 15.5 7.5 16.6 15.6Z" fill="currentColor"/></svg> <div style="color: #787588; margin-top: 16px;">Post by @jyn@tech.lgbt</div> <div style="font-weight: 500;">View on Mastodon</div> </a> </blockquote> <script data-allowed-prefixes="https://tech.lgbt/" async src="https://tech.lgbt/embed.js"></script>

> nothing has convinced me that rust-clippy is in fabulous shape more than seeing "meow meow" in the review comment for a clippy pr
> jyn514, [on Mastodon][on Mastodon]

[10847]: https://github.com/rust-lang/rust-clippy/issues/10847
[alexey]: https://github.com/rust-lang/rust-clippy/pull/15971
[meeting]: https://rust-lang.zulipchat.com/#narrow/channel/257328-clippy/topic/Meeting.202023-05-30/with/362328824
