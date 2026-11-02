# Change Log

All notable changes to the Xmas Time extension will be documented in this file.

## 2.0.0

### Changed

-   Removed the `dayjs` dependency, the countdown is now calculated with built-in JavaScript date functions
-   The countdown updates as soon as the `yourXmas` setting changes

### Fixed

-   `yourXmas` is parsed as local midnight instead of UTC
-   An invalid `yourXmas` date shows "Invalid Xmas date!" instead of a broken countdown

## 1.1.2

### Fixed

-   Countdown now displays "Christmas is over!" after 13 days

## 1.1.1

### Changed

-   Description in the readme
-   Change log

## 1.1.0

### Added

-   `yourXmas` setting

### Changed

-   Description in the readme

## 1.0.0

-   Initial release
