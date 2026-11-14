# Security policy

## Supported versions

Only the latest release tag receives fixes. Upgrade before reporting an issue that a newer tag may already fix.

| Version | Supported |
|---|---|
| 0.2.x | yes |
| < 0.2 | no: 0.1.x has known issues fixed in 0.2.0 (see CHANGELOG.md) |

## Reporting a vulnerability

Do **not** open a public issue for a security problem.

Report it privately through GitHub: the repository's **Security** tab → **Report a vulnerability**.
Include the affected version or commit, a minimal reproduction and the impact you expect.

You should get an answer within 7 days. Fixes are released as a new tag and described in CHANGELOG.md, and credit is given unless you ask otherwise.

## Scope

In scope: anything in this repository that could leak VTEX credentials or send them to a non-VTEX host, let input change the target host or path, or retry a non-idempotent write without opt-in. The README's "Security model" section describes the guarantees.

Out of scope:
- vulnerabilities in the VTEX platform itself: report those to VTEX;
- an `account` value taken from untrusted input. The README explains why it must come from trusted configuration.

## Never post credentials

Never include an `appKey`, `appToken`, `VtexIdclientAutCookie` or any real order, customer or store data in a report, issue or pull request. If you have exposed a key, revoke or rotate it in the VTEX Admin first.
