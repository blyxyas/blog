---
title: 'So, you want to contribute to Rust?'
date: 2024-10-17T01:28:29+02:00
draft: false
---

**Note that I'm not the person with the most expertise in Rust contributions,
but I've done my fair share of PRs, bug reports on the whole Rust compiler ecosystem.**
(261 at the time of writing)

The first thing you need to know is how to use git and Rust, you can start
learning git by a myriad of ways, so I can't comment there, but the official
Rust learning material is great and interactive, [check it out.][learn_rust]
You should absolutely take care of before trying to contribute to Rust, so as
to not waste yours or the reviewer's time.

Great! Now that you know your fair share of Rust, and assuming you have a
[GitHub] account, you're ready to delve into the compilers architecture.

Get to know what you're looking for at contributing, `rust` handles the
compiler, both as a library and a binary and is depended on by other tools.
IF you're looking to contribute to the fabric of token parsin, lexical
analysis, typechecking, constant-time function evaluation and other cool
concepts, start [here][rust].

## Oh, my tip & guidelines collection just spilled!

- The main Rust repo has a version of all (or almost all) tools managed by the Rust team,
this includes a subtree for `rustdoc`, `rustfmt`, `cargo` and `clippy`.
Some tools are modified in-tree while others have their own repo, synced
every two weeks (for example Clippy actually lives in rust-lang/rust-clippy).
The tools that live in other repos generally don't want to be modified
in-tree, so open a PR in their respective repos for those.

- Familiarize   with both the [Rust Reference], the [`rustc-dev-guide`]

- If you want to contribute to the compiler, you'll have to learn what the
bootstrap process is: The compiler downloads a rustc version from CI (stage 0)
and builds your compiler with that old version, and with that new compiler
(stage 1) builds a new compiler with the same input. This is used to check
that your compiler is both compilable, and compiles itself without any problems.


- You will be working with [`rustbot`], mainly `@rustbot claim`,
`@rustbot label +<label>` (only some labels are available for general public).
Another name for rustbot is triagebot.

- No repo (that I know of) in the `rust-lang` organization accepts merge commits,
always rebase. Here's how to do it:

```terminal
# Pull from upstream
$ git pull upstream master --rebase
$ git push
```

Depending on the branch you're doing, you will be able to just `git push` now,
or you'll need to do fixes. In the case that you have to fix some conflicts,
fix them and use `git rebase --continue`.

- You will probably be asked to squash your commits, use
`git rebase -i HEAD~<how many commits are in your branch>` for that. This will
open your editor of choice with a message similar to this one:

```git
pick cbe9b532ec0 Follow review comments (optimize the filtering)
pick efeb32fc98f Remove module passes filtering
pick 32a2b9d16b7 Unify syntax (all to @eval_always)
pick 433d47cc051 Apply review comments + use `shallow_lint_levels_on`

# Rebase a76353065c7..433d47cc051 onto a76353065c7 (4 commands)
# [Here's a guide on how to rebase]
# However, if you remove everything, the rebase will be aborted.
#
```

Just identify the commits you wanna squash (like review commits, formatting,
or minor changes) and replace the `pick` with `s` or `squash`. The changes
made in those commits will be moved into the first commit above them with a
`pick` tag.

You can do a lot of things in this editor, not only squash and pick, you'll
have to inspect it more, but it generally isn't necessary.

- If you want to contact with the team that owns the files you're contributing
to, use [this Zulip chat][zulip]. You can also download the Zulip executable for
any device, or even terminal! Generally don't DM a team member for questions if
you can open a new thread and talk with the whole team.

- The Rust compiler is divided in a lot of modules, the entrypoint is at
[`rustc_interface::run_compiler`][run_compiler]. You will likely focus on a limited set of features, as the
whole rust-lang/rust has 2.8 million lines of Rust (including code, 3 million)

- The way to build Rust from the rust direcory is by using the `x.py`file, you
can install it into a simple `x` via `cargo install --path ./src/tools/x`.

- If you don't want to wait 30 seconds or so for Rust-analyzer (autocomplete
and intellisense) that may never come, use rustdoc, either locally or
[via this link.][docs] bookmark the crate that you will most be using,
in my case I have `rustc_hir` bookmarked.`

- Generally, don't ping team members of more busy teams (e.g. `compiler` or
`cargo`), they have very busy schedules and will get to your PR eventually.
There are legends about them eating people, and you don't wanna be next

- Learn to use [`dbg`][dbg], `env_logger` and [Rust's logs system][tracing].
Remember to remove temporary logging before submitting a PR (an error I've
comitted more than I'd like to admit).

- If you solve a repo-wide problem, try putting an automated solution to spare
future PRs solving the same issue. (e.g. formatting or typo-fixing).

## Conclusion

I think those are some good general guidelines. You will learn along the way
most of the craft. Make sure to enjoy your way through open source and don't
try to maximise your contributions just for the sake of having more. Always
treat people in the community like people and don't fear throwing some emojis
from time to time. It would not be my tenth time approving a PR with "Yeehaw
:cowboy_hat_face::heart:".

If you'd like to hear more about me and what I do, checkout the bottom of the
page, you'll find useful links (like my Mastodon, @blyxyas@tech.lgbt)

Peace! ✌️ :3

[learn_rust]: https://doc.rust-lang.org/book/
[Github]: https://github.com/
[rust]: https://github.com/rust-lang/rust
[Rust Reference]: https://doc.rust-lang.org/nightly/reference/introduction.html
[`rustc-dev-guide`]: https://doc.rust-lang.org/nightly/reference/introduction.html
[`rustbot`]: https://rustc-dev-guide.rust-lang.org/rustbot.html
[zulip]: https://rust-lang.zulipchat.com/
[docs]: https://doc.rust-lang.org/nightly/nightly-rustc/
[run_compiler]: https://doc.rust-lang.org/nightly/nightly-rustc/rustc_interface/interface/fn.run_compiler.html
[dbg]: https://doc.rust-lang.org/std/macro.dbg.html
[tracing]: https://rustc-dev-guide.rust-lang.org/tracing.html#using-tracing-to-debug-the-compiler
