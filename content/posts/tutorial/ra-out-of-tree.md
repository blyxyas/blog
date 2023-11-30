---
title: "Rust-analyzer on files outside of the module tree"
date: 2023-11-09T22:22:21+01:00
draft: true
tags: ["tutorial"]
---

There's this [Rust-Analyzer](https://github.com/rust-lang/rust-analyzer) functionality that not a lot of people know about, but has a great potential. And while the feature is documented, I heard of it just a few days ago.

Yeah, you can use Rust-Analyzer even for standalone files that are not on a Cargo workspace. While not mind-blowing, it's still an interesting piece of this software that many Rust developers use on a daily basis in their IDEs.

## `rust-project.json`

The trick is using a file with the name of `rust-project.json` and quite a weird schema (Obviously, written in JSON). This file can be used to designate any Rust file as its own root of module. For example, a `rust-project.json` is used in the [rustlings](https://github.com/rust-lang/rustlings) codebase (Rust's official interactive learning materials) to designate each exercise as its own module, so that they have Rust-Analyzer's benefits like syntax highlighting and autocompletion.

### The schema

The schema for `rust-project.json` is the following:


{{< code language="TypeScript" id="1" expand="Show" collapse="Hide" isCollapsed="false" >}}
interface JsonProject {
    /// $ rustc --print sysroot
    sysroot?: string;
    /// By default, this is `lib/rustlib/src/rust/library`
    /// relative to the sysroot.
    sysroot_src?: string;
    /// The set of crates comprising the current
    /// project. Must include all transitive
    /// dependencies as well as sysroot crate (libstd,
    /// libcore and such).
    crates: Crate[];
}

interface Crate {
    /// Optional crate name used for display purposes,
    /// without affecting semantics. See the `deps`
    /// key for semantically-significant crate names.
    display_name?: string;
    /// Path to the root module of the crate.
    root_module: string;
    /// Edition of the crate.
    edition: "2015" | "2018" | "2021";
    /// Dependencies
    deps: Dep[];
    /// Set this to `false` for things like standard
    /// library and 3rd party crates to enable
    /// performance optimizations (rust-analyzer
    /// assumes that non-member crates don't change).
    is_workspace_member?: boolean;
    /// Optionally specify the (super)set of `.rs`
    /// files comprising this crate.
    source?: {
        include_dirs: string[],
        exclude_dirs: string[],
    },
    /// The set of cfgs activated for a given crate, like
    /// `["unix", "feature=\"foo\"", "feature=\"bar\""]`.
    cfg: string[];
    /// Target triple for this Crate.
    ///
    /// Used when running `rustc --print cfg`
    /// to get target-specific cfgs.
    target?: string;
    /// Environment variables, used for
    /// the `env!` macro
    env: { [key: string]: string; },
    /// Whether the crate is a proc-macro crate.
    is_proc_macro: boolean;
    /// For proc-macro crates, path to compiled
    /// proc-macro (.so file).
    proc_macro_dylib_path?: string;
}

interface Dep {
    /// Index of a crate in the `crates` array.
    crate: number,
    /// Name as should appear in the (implicit)
    /// `extern crate name` declaration.
    name: string,
}
{{< /code >}}

Quite a lengthy schema definition (even though I cut some documentation), luckily a lot of these do have sensible defaults, and we can just piggyback of what Rust-Analyzer assumes about the codebase.

## Implementing `rust-project.json` in our project

After the `rust-project.json` file is created at the root of the project, we'll set up the key `rust-analyzer.linkedProjects` in the IDEs configuration for RA (e.g. 
`.vscode/settings.json` if we're using VSCode). This key's value will be the path to the `rust-project.json` file.

{{< code language="JSON" id="2" expand="Show" collapse="Hide" isCollapsed="false" >}}
{
  "rust-analyzer.linkedProjects": [
    "rust-project.json"
  ]
}
{{< /code >}}

So... that's it, now we just have to create the actual file.

## How is it used in rustlings

Each rustlings' exercise is in a directory called 
