---
title: "The Clippy Performance Project"
date: 2023-11-04T14:20:46+01:00
draft: true
---

There's this project I've been working on a project that nobody outside the Clippy team (or people that read the [`#clippy` Zulip channel](https://rust-lang.zulipchat.com/#narrow/stream/257328-clippy)) knows about.

I'm working on the <span class="cpp">Clippy Performance Project</span>, a project focused on making [Clippy, the official Rust linter](https://github.com/rust-lang/rust-clippy) faster through optimization based on data we gather.

I've been working on this project for about 4 months. The main improvements to the codebase in this time are <span class="cpp">benchmarking and monitoring tools</span>, so we'll talk about them. This will be more of a devlog article, instead of an artsy one. So sorry for the boringness! Next post will have an OpenGL motorcycle mini-game as an apology.

## Integrating Clippy with existing benchmarking infrastructure

Before optimizing, we should know what is our baseline. In our case, the Rust project has this very cool program (and GitHub bot) called [`rustc-perf`](https://github.com/rust-lang/rustc-perf). It generates [perf.rust-lang.org](https://perf.rust-lang.org), used to track Rust's compiling and running times on multiple crates across several profiles (Building, checking...).

The current profiles are:

- Check
- Debug
- Doc
- Opt
- All

So, if we take this infrastructure and just add a "Clippy" profile, we could locally benchmark any build of Clippy with one command:

{{< code language="Bash" id="1" expand="Show" collapse="Hide" isCollapsed="false" >}}
$ ./target/release/collector bench_local ../rust/build/host/stage2/bin/rustc --profiles Clippy --clippy ../rust/build/host/stage2/bin/cargo-clippy --id "master-$(date +%Y-%m-%d)"
{{< /code >}}

This will benchmark the Clippy build contained in `../rust/build/host/stage2/bin/cargo-clippy`. But this command is not only long, but also pretty confusing, what if the Clippy path doesn't contain our desired build, but a newer one we forgot that we built. Or we want to compare the current Clippy `master` branch with a GitHub PR?

## The convenience tool

To go along with the `rustc-perf` Clippy integration, I made [becnh](https://github.com/blyxyas/becnh). It's run with a command like `./becnh #10404 unused_enumerate_index`. Becnh will then go visit the `rust-clippy` local repo, pull the #10404 PR and build the Rust compiler replacing the upstream Clippy module with the PR.

The final artifact with the custom Clippy is then benchmarked. Furthermore, it can also compare it with `master` if the user chooses to do so.
In general, I find it to be a very good Quality Of Life improvement. Becnh provides a labeled and reproducible environment using the full potential of Git.

## Scheduling these benchmarks

There's no use to a monitoring tool if we don't monitor the default state on a schedule. We could do it manually, *or* we could create a GitHub action to run in on a schedule (using cronjobs).

I tried doing that in [a (now archived) repository](https://github.com/blyxyas/clippy-ci) that would later become the becnh repository. It only had one flaw...

**GitHub doesn't let you use `perf` in their actions**.

To use `perf`, a machine must have `kernel.perf_event_paranoid` set to 1 or less in `/etc/sysctl.conf`. If that's not set, you'll get this error:

```
Error:
Access to performance monitoring and observability operations is limited.
Consider adjusting /proc/sys/kernel/perf_event_paranoid setting to open
access to performance monitoring and observability operations for processes
without CAP_PERFMON, CAP_SYS_PTRACE or CAP_SYS_ADMIN Linux capability.
More information can be found at 'Perf events and tool security' document:
https://www.kernel.org/doc/html/latest/admin-guide/perf-security.html
perf_event_paranoid setting is 4:
  -1: Allow use of (almost) all events by all users
      Ignore mlock limit after perf_event_mlock_kb without CAP_IPC_LOCK
>= 0: Disallow raw and ftrace function tracepoint access
>= 1: Disallow CPU event access
>= 2: Disallow kernel profiling
To make the adjusted perf_event_paranoid setting permanent preserve it
in /etc/sysctl.conf (e.g. kernel.perf_event_paranoid = <setting>)
```

I tried everything, but I just couldn't use `perf` in the actions, we had to invent something... Well, it's more of a discovery.

---

I have access to some servers provided by the Rust foundation, they are called ["Dev Desktops"](https://forge.rust-lang.org/infra/docs/dev-desktop.html). What if, instead of scheduling the benchmark to run in the GitHub infrastructure, we schedule the GitHub action to SSH the server and run becnh there? Indeed, that's what the new scheduling does, allowing us to have weekly benchmark results committed to the repo!

But weekly is **not** enough. We should also be able to have on-demand benchmarking! We can set up another action, this one would make sure to catch all comments, and if they pass some requirements, benchmark the PR:branch that they're talking about.

## What's next in line?

In the current stage of the <span class="cpp">Clippy Performance Project</span> we have almost finished the benchmarking and monitoring stage. The next big milestone to achieve is removing all unused lints on preprocessing, so that the compiler doesn't need to process allowed lints (currently what's happening). I'll post some :beverage_box: juicy updates once the next milestone is reached.

<div style="width:100%;height:0;padding-bottom:125%;position:relative;"><iframe src="https://giphy.com/embed/VbnUQpnihPSIgIXuZv" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div>

---

<div class="disclaimer-embark">

My work on making Clippy faster is sponsored by [Embark Studios](https://www.embark-studios.com/), you can also support me through [GitHub Sponsors](https://github.com/blyxyas)

<img src="https://raw.githubusercontent.com/EmbarkStudios/opensource-website/main/static/img/logo_black.png" width="50%">
</div>

<style>
.cpp {
    font-family: 'Fugaz One', sans-serif;
}
h2 {
    color: white;
    text-shadow: 2px 2px 0px rgba(255, 26, 140, 1);
    transition: 0.1s;
    transition-timing-function: ease-out;
}

h2:hover {
    text-shadow: 3px 3px 0px rgba(255, 26, 140, 1);
}

.disclaimer-embark {
    opacity: .4;
    display: flex;
    align-items: center;
    justify-content: center;
}

.disclaimer-embark img {
    opacity: .3;
}

</style>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fugaz+One&display=swap" rel="stylesheet">
