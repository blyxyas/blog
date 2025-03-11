---
title: 'Rust: Parallel Lints & the loudness wars'
date: 2025-03-11T17:14:29+01:00
draft: true
---

You probably know the phenomenon known as *The loudness wars*, which has
a way cooler name than what it actually is. *The loudness wars* is just
producers making the music we hear progressively louder in order to stand
out among other music. But turns out that the producer doesn't own my volume
knob, I do. So the consumer turns the general volume loud, and what was an
attempt to stand out makes your highs sound mid and your lows also mid.

Now, let's go onto the article.

# The lint structure

> Note: I have in the oven a greater article about the whole linting/type-checking
infrastructure that the compiler uses in order to do its compiler magic. Don't
worry if you'd like to know more about how the Rust compiler works. It will come
eventually.

For now, you just need to know that after the source code is parsed and 
typechecked, we register a bunch of trait objects into a big struct of
`Box<dyn Early/LateLintPass<'tcx>>`s, and then use a big visitor to run
each one of those lints in each relevant token.

For example, we have `LintA` and `LintB`, they have different forms, but each
implement `LateLintPass<'tcx>` and so they can be all pushed into that big struct.

What does the `LateLintPass` trait define? Well, it defines a bunch of
visitor functions like `check_expr`, `check_item` or `check_generic_param`.

So, this big struct visits each token of the token tree, and calls the corresponding
method for each of the lints registered. In a serial manner, one by one...

IDEA: What if, instead of running:

```rust
fn check_expr(&self, expr: &Expr<'_>) {
    // self.passes = [LintA, LintB];
    for lint in self.passes {
        lint.check_expr(&expr);
    }
}
```
We ran something like:

```rust
fn check_expr(&self, expr: &Expr<'_>) {
    // We first divide self.passes
    let passes_divided = self.passes.len().div_floor(2);
    
    // Now, spawn two threads
    for multiplier in 1..=2 {
        thread::spawn(move || {
            for lint_idx in 0..passes_divided {
                self.passes[lint_idx * multiplier].check_expr(&expr);
            };
        });
    };
}
```

Each lint would run in its own thread! With two lints this isn't an issue.
Even with the heaviest of lints, they are relatively lightweight functions.

Now, what happens if you have over 800 lints like Clippy has? Suddenly, running
them one after the other gets messy. We'll have to devise a new solution! And
that solutionwhich is parallelizing them 🤠🌵🐄

# The solution(s) devised

Here's where *the loudness wars*' metaphore comes into full effect. We can either
parallelize the producer's knob or the consumer's knob. I.e. we can either
parallelize the big visitor, or parallelize what is done in those `self.passes`
loops.

## The consumer's knob

Parallelizing the big visitor would entail precomputing what expressions need
to be visited, (i.e. by running a visitor before them, or adapting an already
existing query like [`hir_visit_all_item_likes_in_crate`][visit_all_itemlikes]
or [`hir_crate_items`][hir_crate_items].

After we have every single expression to be visited in a plain, flat array
we can start parallelizing an iteration. This has the con of 1. visiting
the whole tree and making an array with the same data can be memory and CPU
intensive without a guarantee that it will be faster. Plus, some lints maintain
some state, for example, a lot of lints like to take into account the
<abbr title="Minimum Safe Rust Version">MSRV</abbr> of the current crate before
submitting a fix that calls code implemented in later versions of Rust.

So, as not all lints can be independently ran on an arbitrary piece of code, we
would need to create additional subtypes to Late and Early lint passes. This new
categories would be called "Persistent" and "Non persistent" lint passes. I
just liked the name.

All in all, not the greatest of solutions (although it is a posible optimization
route I take in the future with Clippy)

## The producer's knob

The other route (which is the one that I'm developing on as we're speaking) is
doing some in-visitor optimization. This has the pro of just calling one (1)
visitor on the tree (which is significant as the visitor pattern is quite
innefficient).

For each `check_expr` we would spawn some threads to take care of the 800
lints that need to be checked in that expression.

Spawning short-lived threads is very expensive and very, **very** unnecessary 
work, so we would need to implement a thread pool system.

The main con of this, apart from having to manage a thread pool (which, if I'm
not mistaken [`rayon`][rustc_rayon] takes care of it for us), is having to
parallelize TyCtxt/the query system.

Some functions in Rust are very expensive and/or are called very frequently, to
the point that having a global cache of them is worth it. The query system is
even prepared to handle several threads calling the same query! Via some
locks and some sparkling magic ✨❇

Then what's the problem with parallelizing the `lint.check_expr` calls?
Well, what I've shown in the example above is a simplified example, in reality
we need an additional field called `LateContext`, this struct holds `TyCtxt`,
which holds the entirety of the query system... And the query system has
locks...

Oh, we cannot move `TyCtxt` between threads...

# Back to the present, with real problems

And that's where we are, I've been thinking about separating cloned `TyCtxt`s. That would
mean a lot of repeated data and **a lot** of repeated work which was exactly
what the query system set out to do, so, not the greatest solution. Maybe moving
the query system to another place? Not really, what about wrapping the context's
`TyCtxt` with a special struct? I'm not sure if there's any way to turn a
`T: !Send + !Sync` into a `T: Send + Sync`...

We'll keep investigating further. I made this blog post in part to explain a
cool concept without too much worry, and in equal part to show my thought
process behind the optimizations I dedicate all my time behind a computer to do.

In some sense, this is a kind of progress update on the Rust Project Goal from
a more entertaining angle.

Finally, if you liked this blog post, you can go follow me on [GitHub][gh], on
[Mastodon][mastodon], or even [sponsor me][sponsor]. Also, Thanks to [@xmakro][xmakro] for
sponsoring me! I appreciate it **a lot**.

You can find all my relevant information on the footer, thanks for reading! Written with ❤ from Spain

--

Alejandra (@blyxyas)

[visit_all_itemlikes]: https://doc.rust-lang.org/nightly/nightly-rustc/rustc_middle/ty/struct.TyCtxt.html#method.hir_visit_all_item_likes_in_crate
[hir_crate_items]: https://doc.rust-lang.org/nightly/nightly-rustc/rustc_middle/ty/struct.TyCtxt.html#method.hir_crate_items
[rustc_rayon]: https://github.com/rust-lang/rustc-rayon
[gh]: https://github.com/blyxyas
[mastodon]: https://tech.lgbt/@blyxyas
[xmakro]: https://github.com/xmakro
[sponsor]: https://github.com/sponsors/blyxyas
