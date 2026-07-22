---
title: 'I compared 14 hashing algorithms on Rust using Criterion'
date: 2024-08-12T16:30:54+02:00
draft: false
---

A vital piece of technologies in modern days is the [hashing function](https://en.wikipedia.org/wiki/Hash_function), a function that takes in some input and returns a non-meaningful and unique output.

<video src="/images/hashing-diagram.mp4" type="video/mp4" alt="Animated diagram of how hashing works" autoplay loop></video>

(As you can see, there's no pattern)

As hash functions just take a sequence of bits, they are used in **lots** of scenarios. From vital (mostly builtin) structures like the `HashMap`, to authenticating users without storing their plain-text password, to detecting if a file has changed by storing its hash and checking it continuously.

So yeah, their useful. But I'm focused on performance, I'm the kind of person that obsesses with numbers, that tries to use the least number of electrons to perform a task, that values user's time and computer resources more than gold. So...

## What hashing algorithm is the best?

There are **lots** of hashing algorithms, some (like [blake3](https://github.com/BLAKE3-team/BLAKE3)) are secure in the cryptographic sense, meaning that they can be used for encryption without worrying about your data being unencrypted by a malicious actor. While others (like [MD5](https://en.wikipedia.org/w/index.php?title=MD5&oldid=1238316053)) are not suitable for those purposes but excel in their ease of implementation.

As I wanted to check if the hashing algorithm used in the Rust compiler was optimal, I didn't care for security, just speed.
After publishing about my efforts, Ed Page reached to me about adding these benchmarks to his the [rosetta-rs project](https://github.com/rosetta-rs)

## OK but where are the numbers

These benchmarks were measured on Wikipedia articles, for the full Criterion benchmark see [here](https://github.com/rosetta-rs/hashing-rosetta-rs/blob/master/criterion.tar.gz).

(Click for a zoomable SVG version)

- Specific benchmarks:
  - [ahash](#ahash)
  - [blake3](#blake3)
  - [cityhasher](#cityhasher)
  - [Rust's default hasher (SipHasher)](#rusts-default-hasher-siphasher)
  - [fasthash](#fasthash)
  - [fnv](#fnv)
  - [gxhash](#gxhash)
  - [highway](#highway)
  - [hud_slice_by_8](#hud-slice-by-8)
  - [meowhash](#meowhash)
  - [rustc_hash](#rustc_hash)
  - [wyhash](#wyhash)
  - [xxh3](#xxh3)
  - [xxhash_rust_xxh3](#xxhash-rust-xxh3-feature-enabled)

- Comparisons:
  - [3 Bytes](#3-bytes)
  - [10 Bytes](#10-bytes)
  - [100 Bytes](#100-bytes)
  - [A short Wikipedia article](#hashing-a-short-wikipedia-article)
  - [A long Wikipedia article](#hashing-a-long-wikipedia-article)

### Ahash

[`Ahash` crate](https://crates.io/crates/ahash)

[![Ahash benchmark graph made in Criterion](/images/vectors/ahash.svg)](/images/vectors/ahash.svg)

<div class="additional_stats">
                    <h4>Additional Statistics:</h4>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th title="0.95 confidence level" class="ci-bound">Lower bound</th>
                                <th>Estimate</th>
                                <th title="0.95 confidence level" class="ci-bound">Upper bound</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Slope</td>
                                <td class="ci-bound">338.81 µs</td>
                                <td>340.25 µs</td>
                                <td class="ci-bound">342.02 µs</td>
                            </tr>
                            <tr>
                                <td>R²</td>
                                <td class="ci-bound">0.9585102</td>
                                <td>0.9606761</td>
                                <td class="ci-bound">0.9574668</td>
                            </tr>
                            <tr>
                                <td>Mean</td>
                                <td class="ci-bound">338.14 µs</td>
                                <td>339.03 µs</td>
                                <td class="ci-bound">340.11 µs</td>
                            </tr>
                            <tr>
                                <td title="Standard Deviation">Std. Dev.</td>
                                <td class="ci-bound">2.9573 µs</td>
                                <td>5.0396 µs</td>
                                <td class="ci-bound">7.3343 µs</td>
                            </tr>
                            <tr>
                                <td>Median</td>
                                <td class="ci-bound">337.89 µs</td>
                                <td>338.44 µs</td>
                                <td class="ci-bound">339.14 µs</td>
                            </tr>
                            <tr>
                                <td title="Median Absolute Deviation">MAD</td>
                                <td class="ci-bound">2.0893 µs</td>
                                <td>2.8450 µs</td>
                                <td class="ci-bound">3.6274 µs</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

### Blake3

[`blake3` crate](https://crates.io/crates/blake3)

[![Blake3 benchmark graph made in Criterion](/images/vectors/blake3.svg)](/images/vectors/blake3.svg)

<div class="additional_stats">
                    <h4>Additional Statistics:</h4>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th title="0.95 confidence level" class="ci-bound">Lower bound</th>
                                <th>Estimate</th>
                                <th title="0.95 confidence level" class="ci-bound">Upper bound</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>R²</td>
                                <td class="ci-bound">0.0011350</td>
                                <td>0.0011688</td>
                                <td class="ci-bound">0.0011170</td>
                            </tr>
                            <tr>
                                <td>Mean</td>
                                <td class="ci-bound">4.4504 ms</td>
                                <td>4.4721 ms</td>
                                <td class="ci-bound">4.4993 ms</td>
                            </tr>
                            <tr>
                                <td title="Standard Deviation">Std. Dev.</td>
                                <td class="ci-bound">59.649 µs</td>
                                <td>126.51 µs</td>
                                <td class="ci-bound">187.84 µs</td>
                            </tr>
                            <tr>
                                <td>Median</td>
                                <td class="ci-bound">4.4300 ms</td>
                                <td>4.4365 ms</td>
                                <td class="ci-bound">4.4482 ms</td>
                            </tr>
                            <tr>
                                <td title="Median Absolute Deviation">MAD</td>
                                <td class="ci-bound">29.871 µs</td>
                                <td>44.864 µs</td>
                                <td class="ci-bound">60.767 µs</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

### Cityhasher

[`cityhasher` crate](https://crates.io/crates/cityhasher)

[![Cityhasher benchmark graph made in Criterion](/images/vectors/cityhasher.svg)](/images/vectors/cityhasher.svg)

<div class="additional_stats">
                    <h4>Additional Statistics:</h4>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th title="0.95 confidence level" class="ci-bound">Lower bound</th>
                                <th>Estimate</th>
                                <th title="0.95 confidence level" class="ci-bound">Upper bound</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Slope</td>
                                <td class="ci-bound">687.10 µs</td>
                                <td>689.90 µs</td>
                                <td class="ci-bound">693.80 µs</td>
                            </tr>
                            <tr>
                                <td>R²</td>
                                <td class="ci-bound">0.9634161</td>
                                <td>0.9654814</td>
                                <td class="ci-bound">0.9614887</td>
                            </tr>
                            <tr>
                                <td>Mean</td>
                                <td class="ci-bound">686.78 µs</td>
                                <td>688.14 µs</td>
                                <td class="ci-bound">689.85 µs</td>
                            </tr>
                            <tr>
                                <td title="Standard Deviation">Std. Dev.</td>
                                <td class="ci-bound">3.7982 µs</td>
                                <td>7.9376 µs</td>
                                <td class="ci-bound">11.973 µs</td>
                            </tr>
                            <tr>
                                <td>Median</td>
                                <td class="ci-bound">686.49 µs</td>
                                <td>687.83 µs</td>
                                <td class="ci-bound">688.52 µs</td>
                            </tr>
                            <tr>
                                <td title="Median Absolute Deviation">MAD</td>
                                <td class="ci-bound">2.9458 µs</td>
                                <td>3.9158 µs</td>
                                <td class="ci-bound">4.8434 µs</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

### Rust's default hasher (SipHasher)

The hasher in the standard library :)

[![Rust's SipHasher benchmark graph made in Criterion](/images/vectors/default.svg)](/images/vectors/default.svg)

<div class="additional_stats">
        <h4>Additional Statistics:</h4>
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th title="0.95 confidence level" class="ci-bound">Lower bound</th>
                    <th>Estimate</th>
                    <th title="0.95 confidence level" class="ci-bound">Upper bound</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>R²</td>
                    <td class="ci-bound">0.0083939</td>
                    <td>0.0086935</td>
                    <td class="ci-bound">0.0083511</td>
                </tr>
                <tr>
                    <td>Mean</td>
                    <td class="ci-bound">2.1699 ms</td>
                    <td>2.1747 ms</td>
                    <td class="ci-bound">2.1799 ms</td>
                </tr>
                <tr>
                    <td title="Standard Deviation">Std. Dev.</td>
                    <td class="ci-bound">19.351 µs</td>
                    <td>25.374 µs</td>
                    <td class="ci-bound">30.680 µs</td>
                </tr>
                <tr>
                    <td>Median</td>
                    <td class="ci-bound">2.1668 ms</td>
                    <td>2.1718 ms</td>
                    <td class="ci-bound">2.1753 ms</td>
                </tr>
                <tr>
                    <td title="Median Absolute Deviation">MAD</td>
                    <td class="ci-bound">13.096 µs</td>
                    <td>16.616 µs</td>
                    <td class="ci-bound">22.484 µs</td>
                </tr>
            </tbody>
        </table>
    </div>

### Fasthash

[`fasthash` crate](https://crates.io/crates/fasthash)

[![Fasthash benchmark graph made in Criterion](/images/vectors/fasthash.svg)](/images/vectors/fasthash.svg)

<div class="additional_stats">
                    <h4>Additional Statistics:</h4>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th title="0.95 confidence level" class="ci-bound">Lower bound</th>
                                <th>Estimate</th>
                                <th title="0.95 confidence level" class="ci-bound">Upper bound</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Slope</td>
                                <td class="ci-bound">351.77 µs</td>
                                <td>353.82 µs</td>
                                <td class="ci-bound">357.12 µs</td>
                            </tr>
                            <tr>
                                <td>R²</td>
                                <td class="ci-bound">0.9077995</td>
                                <td>0.9117375</td>
                                <td class="ci-bound">0.9015936</td>
                            </tr>
                            <tr>
                                <td>Mean</td>
                                <td class="ci-bound">351.74 µs</td>
                                <td>353.01 µs</td>
                                <td class="ci-bound">354.57 µs</td>
                            </tr>
                            <tr>
                                <td title="Standard Deviation">Std. Dev.</td>
                                <td class="ci-bound">3.8843 µs</td>
                                <td>7.2967 µs</td>
                                <td class="ci-bound">10.761 µs</td>
                            </tr>
                            <tr>
                                <td>Median</td>
                                <td class="ci-bound">351.06 µs</td>
                                <td>351.67 µs</td>
                                <td class="ci-bound">352.46 µs</td>
                            </tr>
                            <tr>
                                <td title="Median Absolute Deviation">MAD</td>
                                <td class="ci-bound">2.3063 µs</td>
                                <td>2.9218 µs</td>
                                <td class="ci-bound">4.0742 µs</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

### FNV

[`FNV` crate](https://crates.io/crates/fnv)

[![FNV benchmark graph made in Criterion](/images/vectors/fnv.svg)](/images/vectors/fnv.svg)

<div class="additional_stats">
                    <h4>Additional Statistics:</h4>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th title="0.95 confidence level" class="ci-bound">Lower bound</th>
                                <th>Estimate</th>
                                <th title="0.95 confidence level" class="ci-bound">Upper bound</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>R²</td>
                                <td class="ci-bound">0.0017676</td>
                                <td>0.0018353</td>
                                <td class="ci-bound">0.0017671</td>
                            </tr>
                            <tr>
                                <td>Mean</td>
                                <td class="ci-bound">8.9217 ms</td>
                                <td>8.9375 ms</td>
                                <td class="ci-bound">8.9534 ms</td>
                            </tr>
                            <tr>
                                <td title="Standard Deviation">Std. Dev.</td>
                                <td class="ci-bound">71.171 µs</td>
                                <td>81.234 µs</td>
                                <td class="ci-bound">90.136 µs</td>
                            </tr>
                            <tr>
                                <td>Median</td>
                                <td class="ci-bound">8.9249 ms</td>
                                <td>8.9456 ms</td>
                                <td class="ci-bound">8.9589 ms</td>
                            </tr>
                            <tr>
                                <td title="Median Absolute Deviation">MAD</td>
                                <td class="ci-bound">62.277 µs</td>
                                <td>85.589 µs</td>
                                <td class="ci-bound">111.14 µs</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

### GxHash

[`GxHash` crate](https://crates.io/crates/gxhash)

[![GxHash benchmark graph made in Criterion](/images/vectors/gxhash.svg)](/images/vectors/gxhash.svg)

<div class="additional_stats">
                    <h4>Additional Statistics:</h4>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th title="0.95 confidence level" class="ci-bound">Lower bound</th>
                                <th>Estimate</th>
                                <th title="0.95 confidence level" class="ci-bound">Upper bound</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Slope</td>
                                <td class="ci-bound">341.59 µs</td>
                                <td>344.24 µs</td>
                                <td class="ci-bound">347.77 µs</td>
                            </tr>
                            <tr>
                                <td>R²</td>
                                <td class="ci-bound">0.8757005</td>
                                <td>0.8822405</td>
                                <td class="ci-bound">0.8707313</td>
                            </tr>
                            <tr>
                                <td>Mean</td>
                                <td class="ci-bound">340.64 µs</td>
                                <td>342.00 µs</td>
                                <td class="ci-bound">343.66 µs</td>
                            </tr>
                            <tr>
                                <td title="Standard Deviation">Std. Dev.</td>
                                <td class="ci-bound">4.3321 µs</td>
                                <td>7.7920 µs</td>
                                <td class="ci-bound">11.196 µs</td>
                            </tr>
                            <tr>
                                <td>Median</td>
                                <td class="ci-bound">340.11 µs</td>
                                <td>340.60 µs</td>
                                <td class="ci-bound">341.45 µs</td>
                            </tr>
                            <tr>
                                <td title="Median Absolute Deviation">MAD</td>
                                <td class="ci-bound">2.2106 µs</td>
                                <td>3.0310 µs</td>
                                <td class="ci-bound">3.8211 µs</td>
                            </tr>
                        </tbody>
                    </table>
                </div>


### Highway

[`highway` crate](https://crates.io/crates/highway)

[![highway benchmark graph made in Criterion](/images/vectors/highway.svg)](/images/vectors/highway.svg)

<div class="additional_stats">
                    <h4>Additional Statistics:</h4>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th title="0.95 confidence level" class="ci-bound">Lower bound</th>
                                <th>Estimate</th>
                                <th title="0.95 confidence level" class="ci-bound">Upper bound</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Slope</td>
                                <td class="ci-bound">806.07 µs</td>
                                <td>809.13 µs</td>
                                <td class="ci-bound">812.91 µs</td>
                            </tr>
                            <tr>
                                <td>R²</td>
                                <td class="ci-bound">0.9606204</td>
                                <td>0.9624894</td>
                                <td class="ci-bound">0.9596294</td>
                            </tr>
                            <tr>
                                <td>Mean</td>
                                <td class="ci-bound">804.24 µs</td>
                                <td>806.99 µs</td>
                                <td class="ci-bound">810.29 µs</td>
                            </tr>
                            <tr>
                                <td title="Standard Deviation">Std. Dev.</td>
                                <td class="ci-bound">8.8662 µs</td>
                                <td>15.629 µs</td>
                                <td class="ci-bound">22.160 µs</td>
                            </tr>
                            <tr>
                                <td>Median</td>
                                <td class="ci-bound">802.98 µs</td>
                                <td>804.86 µs</td>
                                <td class="ci-bound">806.18 µs</td>
                            </tr>
                            <tr>
                                <td title="Median Absolute Deviation">MAD</td>
                                <td class="ci-bound">4.2856 µs</td>
                                <td>5.5378 µs</td>
                                <td class="ci-bound">7.3743 µs</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

### Hud Slice By 8

[`hud_slice_by_8` crate](https://crates.io/crates/hud_slice_by_8)

[![highway benchmark graph made in Criterion](/images/vectors/hud_slice_by_8.svg)](/images/vectors/hud_slice_by_8.svg)
<div class="additional_stats">
                    <h4>Additional Statistics:</h4>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th title="0.95 confidence level" class="ci-bound">Lower bound</th>
                                <th>Estimate</th>
                                <th title="0.95 confidence level" class="ci-bound">Upper bound</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>R²</td>
                                <td class="ci-bound">0.0494594</td>
                                <td>0.0512050</td>
                                <td class="ci-bound">0.0493473</td>
                            </tr>
                            <tr>
                                <td>Mean</td>
                                <td class="ci-bound">3.6245 ms</td>
                                <td>3.6294 ms</td>
                                <td class="ci-bound">3.6345 ms</td>
                            </tr>
                            <tr>
                                <td title="Standard Deviation">Std. Dev.</td>
                                <td class="ci-bound">20.855 µs</td>
                                <td>25.670 µs</td>
                                <td class="ci-bound">30.210 µs</td>
                            </tr>
                            <tr>
                                <td>Median</td>
                                <td class="ci-bound">3.6201 ms</td>
                                <td>3.6273 ms</td>
                                <td class="ci-bound">3.6336 ms</td>
                            </tr>
                            <tr>
                                <td title="Median Absolute Deviation">MAD</td>
                                <td class="ci-bound">16.777 µs</td>
                                <td>23.124 µs</td>
                                <td class="ci-bound">29.173 µs</td>
                            </tr>
                        </tbody>
                    </table>
                <div></div></div>

### Meowhash

[`meowhash` crate](https://crates.io/crates/meowhash)

[![Meowhash benchmark graph made in Criterion](/images/vectors/meowhash.svg)](/images/vectors/meowhash.svg)

<div class="additional_stats">
                    <h4>Additional Statistics:</h4>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th title="0.95 confidence level" class="ci-bound">Lower bound</th>
                                <th>Estimate</th>
                                <th title="0.95 confidence level" class="ci-bound">Upper bound</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Slope</td>
                                <td class="ci-bound">331.04 µs</td>
                                <td>333.22 µs</td>
                                <td class="ci-bound">336.03 µs</td>
                            </tr>
                            <tr>
                                <td>R²</td>
                                <td class="ci-bound">0.8450817</td>
                                <td>0.8495119</td>
                                <td class="ci-bound">0.8421135</td>
                            </tr>
                            <tr>
                                <td>Mean</td>
                                <td class="ci-bound">331.04 µs</td>
                                <td>333.00 µs</td>
                                <td class="ci-bound">335.38 µs</td>
                            </tr>
                            <tr>
                                <td title="Standard Deviation">Std. Dev.</td>
                                <td class="ci-bound">5.2511 µs</td>
                                <td>11.249 µs</td>
                                <td class="ci-bound">15.575 µs</td>
                            </tr>
                            <tr>
                                <td>Median</td>
                                <td class="ci-bound">330.02 µs</td>
                                <td>330.46 µs</td>
                                <td class="ci-bound">331.54 µs</td>
                            </tr>
                            <tr>
                                <td title="Median Absolute Deviation">MAD</td>
                                <td class="ci-bound">2.1435 µs</td>
                                <td>2.6588 µs</td>
                                <td class="ci-bound">3.8049 µs</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

### rustc_hash

[`rustc_hash` crate](https://crates.io/crates/rustc_hash)

[![Rustc_hash benchmark graph made in Criterion](/images/vectors/rustc_hash.svg)](/images/vectors/rustc_hash.svg)

<div class="additional_stats">
                    <h4>Additional Statistics:</h4>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th title="0.95 confidence level" class="ci-bound">Lower bound</th>
                                <th>Estimate</th>
                                <th title="0.95 confidence level" class="ci-bound">Upper bound</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Slope</td>
                                <td class="ci-bound">467.44 µs</td>
                                <td>468.62 µs</td>
                                <td class="ci-bound">470.30 µs</td>
                            </tr>
                            <tr>
                                <td>R²</td>
                                <td class="ci-bound">0.9811459</td>
                                <td>0.9820067</td>
                                <td class="ci-bound">0.9802488</td>
                            </tr>
                            <tr>
                                <td>Mean</td>
                                <td class="ci-bound">467.07 µs</td>
                                <td>468.03 µs</td>
                                <td class="ci-bound">469.09 µs</td>
                            </tr>
                            <tr>
                                <td title="Standard Deviation">Std. Dev.</td>
                                <td class="ci-bound">3.6312 µs</td>
                                <td>5.2018 µs</td>
                                <td class="ci-bound">6.7921 µs</td>
                            </tr>
                            <tr>
                                <td>Median</td>
                                <td class="ci-bound">466.40 µs</td>
                                <td>467.22 µs</td>
                                <td class="ci-bound">467.95 µs</td>
                            </tr>
                            <tr>
                                <td title="Median Absolute Deviation">MAD</td>
                                <td class="ci-bound">2.1162 µs</td>
                                <td>2.7135 µs</td>
                                <td class="ci-bound">3.8039 µs</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

### wyhash

[`wyhash` crate](https://crates.io/crates/wyhash)

[![wyhash benchmark graph made in Criterion](/images/vectors/wyhash.svg)](/images/vectors/wyhash.svg)

<div class="additional_stats">
                    <h4>Additional Statistics:</h4>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th title="0.95 confidence level" class="ci-bound">Lower bound</th>
                                <th>Estimate</th>
                                <th title="0.95 confidence level" class="ci-bound">Upper bound</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Slope</td>
                                <td class="ci-bound">655.64 µs</td>
                                <td>659.54 µs</td>
                                <td class="ci-bound">666.00 µs</td>
                            </tr>
                            <tr>
                                <td>R²</td>
                                <td class="ci-bound">0.8464213</td>
                                <td>0.8499268</td>
                                <td class="ci-bound">0.8403519</td>
                            </tr>
                            <tr>
                                <td>Mean</td>
                                <td class="ci-bound">657.05 µs</td>
                                <td>660.88 µs</td>
                                <td class="ci-bound">665.86 µs</td>
                            </tr>
                            <tr>
                                <td title="Standard Deviation">Std. Dev.</td>
                                <td class="ci-bound">6.0535 µs</td>
                                <td>22.966 µs</td>
                                <td class="ci-bound">34.402 µs</td>
                            </tr>
                            <tr>
                                <td>Median</td>
                                <td class="ci-bound">655.55 µs</td>
                                <td>656.90 µs</td>
                                <td class="ci-bound">658.31 µs</td>
                            </tr>
                            <tr>
                                <td title="Median Absolute Deviation">MAD</td>
                                <td class="ci-bound">3.7501 µs</td>
                                <td>5.2448 µs</td>
                                <td class="ci-bound">6.9104 µs</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

### xxh3

[`twox-hash` crate](https://crates.io/crates/twox-hash)

[![twox-hash benchmark graph made in Criterion](/images/vectors/xxh3.svg)](/images/vectors/xxh3.svg)

<div class="additional_stats">
                    <h4>Additional Statistics:</h4>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th title="0.95 confidence level" class="ci-bound">Lower bound</th>
                                <th>Estimate</th>
                                <th title="0.95 confidence level" class="ci-bound">Upper bound</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Slope</td>
                                <td class="ci-bound">659.17 µs</td>
                                <td>661.56 µs</td>
                                <td class="ci-bound">664.04 µs</td>
                            </tr>
                            <tr>
                                <td>R²</td>
                                <td class="ci-bound">0.9671966</td>
                                <td>0.9688139</td>
                                <td class="ci-bound">0.9670582</td>
                            </tr>
                            <tr>
                                <td>Mean</td>
                                <td class="ci-bound">657.86 µs</td>
                                <td>660.22 µs</td>
                                <td class="ci-bound">662.85 µs</td>
                            </tr>
                            <tr>
                                <td title="Standard Deviation">Std. Dev.</td>
                                <td class="ci-bound">9.2149 µs</td>
                                <td>12.866 µs</td>
                                <td class="ci-bound">16.513 µs</td>
                            </tr>
                            <tr>
                                <td>Median</td>
                                <td class="ci-bound">654.77 µs</td>
                                <td>656.81 µs</td>
                                <td class="ci-bound">658.52 µs</td>
                            </tr>
                            <tr>
                                <td title="Median Absolute Deviation">MAD</td>
                                <td class="ci-bound">5.5970 µs</td>
                                <td>8.1636 µs</td>
                                <td class="ci-bound">10.199 µs</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

### xxhash-rust ("xxh3" feature enabled)

[`xxhash-rust` crate](https://crates.io/crates/xxhash-rust)

[![xxhash-rust benchmark graph made in Criterion](/images/vectors/xxhash_rust_xxh3.svg)](/images/vectors/xxhash_rust_xxh3.svg)

<div class="additional_stats">
                    <h4>Additional Statistics:</h4>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th title="0.95 confidence level" class="ci-bound">Lower bound</th>
                                <th>Estimate</th>
                                <th title="0.95 confidence level" class="ci-bound">Upper bound</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Slope</td>
                                <td class="ci-bound">576.27 µs</td>
                                <td>587.61 µs</td>
                                <td class="ci-bound">602.06 µs</td>
                            </tr>
                            <tr>
                                <td>R²</td>
                                <td class="ci-bound">0.4793268</td>
                                <td>0.4937587</td>
                                <td class="ci-bound">0.4707473</td>
                            </tr>
                            <tr>
                                <td>Mean</td>
                                <td class="ci-bound">572.73 µs</td>
                                <td>579.09 µs</td>
                                <td class="ci-bound">586.57 µs</td>
                            </tr>
                            <tr>
                                <td title="Standard Deviation">Std. Dev.</td>
                                <td class="ci-bound">20.630 µs</td>
                                <td>35.637 µs</td>
                                <td class="ci-bound">49.651 µs</td>
                            </tr>
                            <tr>
                                <td>Median</td>
                                <td class="ci-bound">567.49 µs</td>
                                <td>569.11 µs</td>
                                <td class="ci-bound">570.92 µs</td>
                            </tr>
                            <tr>
                                <td title="Median Absolute Deviation">MAD</td>
                                <td class="ci-bound">6.1172 µs</td>
                                <td>7.5161 µs</td>
                                <td class="ci-bound">12.285 µs</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

# General

These are the general comparisons between all hashing algothims on several benches.

### 3 Bytes

[![Benchmark of all algorithms above on 3 bytes](/images/vectors/violin3b.svg)](/images/vectors/violin3b.svg)

### 10 Bytes

[![Benchmark of all algorithms above on 10 bytes](/images/vectors/violin10b.svg)](/images/vectors/violin10b.svg)

### 100 Bytes

[![Benchmark of all algorithms above on 10 bytes](/images/vectors/violin100b.svg)](/images/vectors/violin100b.svg)

### Hashing a "short" Wikipedia article

[![Benchmark of all algorithms above on 10 bytes](/images/vectors/violin_short.svg)](/images/vectors/violin_short.svg)

### Hashing a "long" Wikipedia article

[![Benchmark of all algorithms above on 10 bytes](/images/vectors/violin_long.svg)](/images/vectors/violin_long.svg)
