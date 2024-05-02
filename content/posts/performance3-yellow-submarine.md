---
title: 'Performance3 Yellow Submarine'
date: 2024-05-02T22:38:17+02:00
draft: true
---

## Phase 3: Actually optimizing the compiler

NOTE: As a Clippy team member, the part of the compiler that I'm most familiar with is the diagnostic engine (the [`rustc_lint` module](https://github.com/rust-lang/rust/tree/master/compiler/rustc_lint)).

### Ignoring allowed lints

> We have about 800 lints, and each one of those have to be processed on every run... What if instead of having to do all that effort, we just filtered lints that won't emit a warning beforehand? :thinking:

That's what I thought ~8 months ago. And after 4 feature branches, about 30 commits, **a whole lot** of testing and debugging, and running the same benchmarking commands about a trillion times, we have... [An almost finished feature branch](https://github.com/blyxyas/rust/tree/ignore-allowed-lints-final). It's not much, but it's honest work :sweat_smile:

Due to how to compiler is built, this kind of change is difficult. Mastering things like [queries](https://github.com/rust-lang/rust/blob/master/compiler/rustc_middle/src/query/mod.rs), seeing where things are run, trying to generate useful [`flamegraph`](https://crates.io/crates/flamegraph)s (which is pretty difficult for a compiler).
