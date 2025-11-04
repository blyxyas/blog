---
title: '[Talk] Improving the Incremental System in the Rust Compiler'
date: 2025-11-04T20:57:38+01:00
draft: false
---

> [!memo] There's a video of this!
> This post is the script for [this talk](https://www.bilibili.com/video/BV1yFn8z4E2m/) I gave at RustChinaConf 2025, the pacing may be a bit off if you're only reading the text version.
>
> [Slides here](/documents/RustChinaConf2025-slides.pdf)

你好! I'm Alejandra González, a Clippy team member that focuses mainly on performance for both the Clippy side of things, as well as the general Rust diagnostics (so, Rust’s compiler errors and warnings). ==SLIDE 2== I’m obsessed with performance, so obsessed in fact that I’ve been a project goal owner twice, both times for making Clippy faster. (With great results so far).

==SLIDE 3==

But first of all, let's state the obvious. The Rust compiler is slow, very slow. ==SLIDE 4== I've seen people complain that some package (i.e. bevy) take an awful lot of time to compile due to well, the Rust compiler being very complex which is a side effect of all the positive stuff we love about the Rust language.

==SLIDE 5 WIP==
Borrow checking takes time, trait solving takes time, macro expansion takes time. Everything takes time and I'm this little fish optimizing a linter, in an ocean made of complex, technical issues. So I thought to myself, what if we could, somehow, instead of making Clippy faster in single runs (which is something I'll continue to keep doing), tackle one of this big fish, ==SLIDE 6== in fact, it may even qualify as the fisherman.

{{< image src="/images/sharks-rcc25.png" alt="Slide from the presentation, drawing of me as a fish being haunted by three sharks, each marked with a Rust problem (borrow checking, trait solving and macro expansion)" >}}

Well, today I'll be talking about redesigning the incremental system so that we can, in fact, not build so much.

==SLIDE 7==
But first, let's describe the problem. If you right now go to a terminal and run `cargo check`, and THEN `cargo build`. The `cargo build` will rebuild your packages, including dependendants in your local tree and the target size will be a lot greater than if you just ran `cargo build` in the first place. It will be the sum of running `cargo build` & `cargo check` in both time and memory.

==SLIDE 8==
This means that, if in your CI you run `cargo check`, then `cargo clippy`, and **then** `cargo test`. You'll be met with redoing the heavy computations that compilers do, thrice. Making 0 use of the existence of the incrementals.

==SLIDE 9==
So that's why, today, I'm presenting a conceptual redesign for the incremental system in the Rust compiler.

---

==SLIDE 10==
We'll go through a quick breakdown of how the Rust compiler works. So, there are several stages as in almost any other compiler, they broadly are: The lexing (not pictured here), the parsing into AST, the HIR, the THIR, which is a substage of HIR, the MIR and **then** codegen. Several sublayers of analysis are also done, namely linting, borrow checking, macro expansion... etc.

==SLIDE 11==
A very useful concept that powers the compiler is the existence of "queries". These queries are a special ==SLIDE 12== kind of function that saves its inputs and outputs into a "query context" for later use. ==SLIDE 13== So, if you run the query with the same input, it can just return the output without doing expensive computations several times unnecesarilly. 

==SLIDE 13==
These two concepts can be mixed. We can extract each of these stages into their own query so, ==SLIDE 14== if the HIR doesn't change, the MIR wont be recomputed and thus the codegen won't be redone. ==SLIDE 15== This is something that more or less already exists and the compiler takes advantage of it ==SLIDE 16 CLICK CLICK==. The smart people in the compiler saw that, if you querify the different stages throughout the compilation, and you serialize the query context in a sensible manner, ==SLIDE 17== It could be possible for us to save all that information in a persistent way for future compilations. And that's how the dependency graph was born! `<simplification>`

==SLIDE 18==
If we track each executed query, and track all the subqueries that that query calls, we can make a graph out of that. ==EXPLAIN THE CODE SNIPPET==. Which tells more or less a complete story of how the compilation went. ==SLIDE 19== We can safely write that dependency graph into a file and for future compilations see the hashes, and perform the semi-famous "try mark green" algorithm. ==SLIDE 20== Which goes node by node checking if the hash is the same as expected, or re-evaluating the query if the original value has changed.

---

==SLIDE 21==
Now that all that is explained ==SUMMARIZE, EXPLAIN (queries save their inputs and outputs, we then save those results into disk, we querify the compiler stages and such)==, we know the problem, we know how the compiler works. Here's where we introduce the hero in our story. Atomic levels and data dependencies!!

==SLIDE 20 CLICK== Let's first talk about what those atomic levels mean. ==SLIDE 21== These are little stringy directives that we tell the compiler that represent what the target of our compilation is. If we just need AST information, we direct the compiler to only compute the AST and then exit, for example. All the queries related to processing the AST would be in their own atomic level, the same for HIR, for MIR, etc...

==SLIDE 22==
This way, any compiler-adjacent activity such as `check`, `build` or `clippy` could declare an atomic level ==SLIDE 22 CLICK== they'd like to go to.
==SLIDE 23== For example, while `check` or `clippy` go to the `borrowchecking` atomic level, `build` goes to the `emit-bin` atomic level, we can now represent neatly what the last compilation was doing in the incremental directory, and avoid tying an incremental to what flags are used or other arbitrary information.

---

==SLIDE 24==

Here's where data dependencies come in.  ==SLIDE 25== While we can extract what stage the compiler goes up to via atomic bits, not all information can be extracted this way because that's just redoing compiler flags all over again and it defeats the purpose. For example, the part of the compiler that produces binary files still needs to be reexecuted if flags related to codegen have changed. This is done via these data dependencies.

==SLIDE 26==
They are little bits of information that each query can request and that act like leaves in the dependency graph. ==SLIDE 27== Talking about the emitting binaries scenario, a data dependency would be things like linking arguments, link time optimizations or how the symbol mangling should be performed.

This allows us to move the change in the “try mark green” algorithm from the earlier stage to the necessary one. So LTO options wouldn’t impact `clippy`, for example.

==SLIDE 28==
These data dependencies aren’t only for emitting binaries,they are also the values of cfgs for macro expansion, or lint configuration. Being that these are “lazy” as they act like leaves only called when necessary, we can perform a few optimizations, I have a few ideas that we might get into later. ==SHOW [[#OPTIONAL]]==

---

==SLIDE 29==
Apart from not rechecking with `clippy` for linker changes, that also goes in the other direction. `build` can jump off the progress that `cargo check` made, because now that codegen options are extracted from hashing, we can guarantee that `emit-bin` will always overlap with `borrowchecking` and thus, use that information in our compilation.

---

==SLIDE 30==
And that’s it, that’s the great redesign! We have now tackled the fisherman in our odyssey. Users are now insanely happy with how the incremental information is handled, and everyone lived happily ever after.


==SLIDE 30 CLICK== Or did they? We can go further! Very little of rebuilds are actually just changing terminal flags and running a `build` after `check`. Let’s talk business.

==SLIDE 31==
If you work on a big proyect with many dependencies in your workspace, you probably know that emotion when you change something that’s ultimately irrelevant but you still trigger a rebuild. ==SLIDE 33== This sentiment is specially frustrating when you see that in your monorepo you have to build a whole branch of dependencies just because you changed a single constant that actually only affects another branch. ==SLIDE 33 CLICK CLICK== Or even funnier, Just performing a simple comment change that only affects, the same module.

==SLIDE 34==
As you may know, dependencies are not handled by the Rust compiler itself, but by Cargo. Cargo orchestrates package compilation so that every package has its dependencies ready when its the time to compile it.==SLIDE 35==

===SLIDE 36==
The process that Cargo follows to check if your package needs rebuilding starts from the outermost dependencies. Cargo checks if these dependencies have changed in any way and if so, they are rebuilt.

==SLIDE 37==
This “changed in any way” means that Cargo apart from checking obvious things like the compiler version or if the file has changed, also check more innocuous properties such as last modified time.

==SLIDE 38==
Here’s where the second key concept of the talk comes in. **Two stage fingerprints!!**
Instead of compiling all the way to emitting binaries, we only go so far as to perform name resolution.

==SLIDE 39==
Name resolution is the stage in which the compiler actually finds what you’re talking about when you mention items or variables, etc... in your source code. ==SLIDE 40== It takes into account variable shadowing, modules that haven’t been imported yet and obviously every single item in the given module. ==SLIDE 40 CLICK==

==SLIDE 41== Being that definition ids are calculated on name resolution, we need to see if those hashes that were changed in the dependency were used in the dependendant. So we actually have to come up with a way to know if K depends on one of the modified items in V, even indirectly.

There are lots of ways to do this, ==Way 1== one is to calculate the two modules up to name resolution and then compare if the dependant module needed any of the DefIds that were changed in the dependency.

In this model, we take advantage of the fact that the dependant module would have to be built either way, so we’re just saving the process of type checking, borrow checking and code generation, which takes a huge part of the compilation process.

==Way 2== Another way to solve this conundrum is to track the relationships between all items in the incremental of the dependant, write those to a file, and just check that file before recompiling the dependency. This saves even the parsing state for the dependant, because we already have all the name resolution information from the previous compilation.

And you might be thinking, how will Cargo signal to the compiler to just go up to name resolution? The answer is, yep, you’re correct, atomic bits!! Everything’s intertwined, it’s all a central theory and Santa’s real.

And that third key concept, the **two stage fingerprint verification** is just an example of what atomic bits can do. And similar to these ideas I’ve been giving, the powerful concept of atomic bits has lots of unexplored potential. I have a paper right here ==Show [[#OPTIONAL]] and if enough time offer to read them, change to auxiliary presentation or put a button on the slides themselves, I’m not sure if google slides allows for that== with some of them I’ve managed to come up with.


==Conclusion, more or less freestyle== And that’s it, thanks for coming here and listening to my talk,  you can reach me at any point in the event or via the internet. Have a great day.

---
# OPTIONAL

Apart from strictly incremental improvements, data dependencies have lots of possible optimizations. I’ll mention some of these:

1. We can filter early and late lint passes changed in the terminal, and avoid recompiling for a late lint change, if we’re only going up to, for example, macro expansion.

2. We can collect all used `cfg` in the whole crate and dependencies, and avoid recompilng next time for a cfg changed which doesn’t affect anything.

3. When only doing parsing, we can avoid recompiling for `-C` codegen flags.
