---
title: "Ok, what ACTUALLY uses Rust?"
date: 2026-04-15T01:45:01+02:00
draft: false
---

Nowadays Rust is mentioned in lots of places. Being that Rust is the "new" kid on the
block, setting new trends throughout the tech and programming world, it's sometimes
hard to have a grasp of where exactly Rust is used. Today I'm presenting a non-exhaustive
list of big projects and companies that use Rust. Note that many of these companies don't
have only one Rust project, but I'm highlighting the most talked about and significant.

# The (not) full list

|                                                                |
| --------------------------------------------------------------------------- |
| [Coreutils is currently being rewritten in Rust](https://uutils.github.io/) |
| [The Linux Kernel has been using Rust since Linux 6.1, and has been stable since 6.19](https://rust-for-linux.com/) |
| [Windows 11 also uses Rust components](https://winaero.com/not-only-linux-windows-11-now-includes-components-written-in-rust/) |
| [Ubuntu has now adopted uutil (Rust's coreutil)](https://www.cyberciti.biz/linux-news/ubuntu-to-explore-rust-based-uutils-as-potential-gnu-core-utilities-replacement/) |
| [ripgrep is the grep alternative, 10x faster with 60K stars](https://ripgrep.dev/) |
| [Deno, the Node.js spiritual successor is written in Rust](https://github.com/denoland/deno) |
| [Tauri, the Electron alternative/successor](https://github.com/tauri-apps/tauri) |
| [Chromium now integrates Rust](https://chromium.googlesource.com/chromium/src/+/refs/heads/main/docs/rust.md) |
| U.S (NSA) Government recommends Rust in its ["Guidance on How to Protect Against Software Memory Safety Issues"](https://www.nsa.gov/Press-Room/News-Highlights/Article/Article/3215760/nsa-releases-guidance-on-how-to-protect-against-software-memory-safety-issues/) |
| [White House urges developers to switch to Rust (replacing C and C++)](https://web.archive.org/web/20260319055104/https://www.bleepingcomputer.com/news/security/white-house-urges-devs-to-switch-to-memory-safe-programming-languages/) |
| [Signal, the private messaging app uses Rust for its protocol](https://github.com/signalapp/libsignal) |
| [Zed, the IDE written in Rust is used by 7.3%](https://survey.stackoverflow.co/2025/technology#1-dev-id-es) |
| [Brave Browser overhauled its adblock engine in Rust, cutting memory consumption by 75%](https://brave.com/privacy-updates/36-adblock-memory-reduction/) |
| [Alacritty, the terminal emulator written in Rust is used by 17% of developers (in Arch Linux Community Survey)](https://linuxiac.com/arch-linux-community-survey-results/) |
| [Azure has a Rust SDK as part of Microsoft's Rust embrace](https://github.com/Azure/azure-sdk-for-rust)|
| [Rust has been identified as the safer coding tool by NIST](https://rustfoundation.org/media/rust-identified-as-safer-coding-tool-by-nist/) |
| [Microsoft CTO recommends Rust over C and C++](https://www.geekwire.com/2025/orange-crabs-in-the-machine-how-rust-is-rewriting-the-rules-of-modern-software/) |
| [Apple is now using Rust in its cloud infrastructure and server backend](https://www.reddit.com/r/rust/comments/vx6lb0/apples_cloud_traffic_team_is_adopting_rust_as_per/) |
| [AWS now uses Rust in its AWS Lambda functions across containers via Firecracker](https://aws.amazon.com/blogs/aws/firecracker-lightweight-virtualization-for-serverless-computing/) |
| [Rust powers Proton Authenticator](https://proton.me/blog/authenticator-rust) |
| [Cloudflare has been using Rust since 2022, with Pingora](https://blog.cloudflare.com/pingora-open-source/) |
| [Discord switched from Go to Rust](https://discord.com/blog/why-discord-is-switching-from-go-to-rust) |
| [Valve Proton has been using Rust since 5.13](https://www.reddit.com/r/rust/comments/jbzorm/valves_proton_513_now_uses_rust/) |
| [Dropbox now uses Rust for its sync](https://dropbox.tech/application/why-we-built-a-custom-rust-library-for-capture) |
| [Notes by Firefox has been using Rust components since 1.1 Android (old post)](https://www.reddit.com/r/firefox/comments/99gdde/notes_now_uses_rust_android_components/) |
| [ruff, the currently-best Python linter by Astral](https://github.com/astral-sh/ruff) |
| [Typst, the Latex replacement](https://github.com/typst/typst) |
| [Microsoft's Quantum Development Kit is mostly written in Rust](https://quantum.microsoft.com/en-us/insights/blogs/qir/introducing-the-microsoft-quantum-development-kit-preview) |
| [arxiv is using a Rust program to generate HTML from Latex (will be open-sourced in the near future) |
| [Twitter is using Rust in its recommendation algorithm](https://github.com/twitter/the-algorithm/blob/main/navi/README.md) |
| [meilisearch, the search engine powering Renault Group and Hugging Face](https://github.com/meilisearch/meilisearch) |
| [The fish shell ported itself to Rust from C++ and reported a success](https://fishshell.com/blog/rustport/) |
| [nushell, a new type of shell that's gaining popularity](https://github.com/nushell/nushell) |
| [servo, the work-in-progress browser engine that would replace Gecko in Firefox (and is now an embeddable engine)](https://github.com/servo/servo) |
| [turborepo by Vercel, one of the most popular monorepo tools out there](https://github.com/vercel/turborepo) |
| [difftastic, the structural diff that understands syntax](https://github.com/Wilfred/difftastic) |
| [mdbook, the FOSS documentation tool alternative to gitbook](https://github.com/rust-lang/mdbook) |
| [swc, the Javascript compiler and bundler used by Next.js, Vercel, ByteDance, Tencent and more](https://swc.rs) |
| [ExpressVPN is now more lightweight thanks to Rust](https://www.zdnet.com/article/expressvpn-gets-faster-and-more-secure-thanks-to-rust/) |
| [Reckless, the strong chess engine that's fighting Stockfish in the TCEC chess superfinal](https://github.com/codedeliveryservice/Reckless) |
| [Zellij, the `tmux` alternative](https://github.com/zellij-org/zellij) |
| [just, the command runner that powers Pop OS!, flathub and catppuccin](https://github.com/casey/just) |
| [NASA using Rust for memory-safe programming](https://techport.nasa.gov/projects/96767) |
| Rust is the most popular language to compile to WASM, powering the likes of Youtube and Netflix. |
| [edit, Windows' new editor is written in Rust](https://www.heise.de/en/news/Microsoft-s-new-editor-runs-on-the-command-line-and-is-written-in-Rust-10394192.html) |
| There are lots of programming languages written in Rust, for example [Bend](https://github.com/HigherOrderCO/Bend) |
| [helix, the Rust-based editor with Kakoune keybinds](https://helix-editor.com/) |
| [vaultwarden, the written-in-Rust alternative to bitwarden](https://github.com/dani-garcia/vaultwarden) |
| [ty, the fast Python type checker and language server by Astral](https://github.com/astral-sh/ty) |
| Many AI and blockchain applications. If you use AI you know about these. |
| [Redox, the experimental OS written in Rust](https://gitlab.redox-os.org/redox-os/redox/) |
| [iced, the cross-platform GUI library used by Pop! OS](https://iced.rs/) |
| [Meta is now embracing Rust](https://engineering.fb.com/2021/04/29/developer-tools/rust/) |
| [Rust is now more popular in science-related fields (Nature article)](https://www.nature.com/articles/d41586-020-03382-2) |
| [Verus, the proof language used by Microsoft](https://github.com/verus-lang/verus) |
| [The currently most popular Flash engine (AFAIK), ruffle](https://github.com/ruffle-rs/ruffle) |
| [Ladybird, a Chrome alternative is moving from C++ to Rust](https://ladybird.org/posts/adopting-rust/) |
| [Google also uses Rust](https://security.googleblog.com/2025/11/rust-in-android-move-fast-fix-things.html) |
| [Figma uses Rust for its multiplayer service](https://medium.com/figma-design/rust-in-production-at-figma-e10a0ec31929) |

(Thanks to the wonderful folks at lobste.rs and everyone who contacted for additions)

I'll expand this list in the future with comentaries. If you know of a project that uses Rust that is not mentioned, please get in contact with me!

# Why this matters

No matter how much we (Rust developers) like to think that Rust is now
mainstream, truth is that while [we've crossed the chasm](https://ericsink.com/entries/fsharp_chasm.html),
Rust is still nowhere near the popularity of C++, or even Java.

Programming language usage is a weird metric, because while it heavily
depends on factors outside of the language developers control. _The Rust Project_
might control the compiler, new language design or tooling around Rust. But these people do not control
the whole ecosystem around the language. _The Rust Project_ does not control Youtube Videos, blog articles
or the number of crates (libraries) that are uploaded to our registry.

This means that no matter how good (and fast) Clippy is, or how great the memory safety caused by the borrow checker is.
The first language that's taught in many universities is still Java. People use Javascript for everything
and C++ is still used in planes. This is why I find it important to highlight and underscore which projects
have tried Rust, how the process went and what they learned along the way.

_At the end of the day there's no blitzscaling for programming languages. Or at least, we haven't found it yet._

<style>
table {
    border: 1px solid;
}
td {
    font-size: 16px;
    text-align: center;
    font-weight: bold;
    padding: 10px
}

tr:nth-child(even) {
    background-color: #111111;
}
</style>
