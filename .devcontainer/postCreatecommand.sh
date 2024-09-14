#!/bin/sh

# General Settings
pnpm config set store-dir /home/node/.local/share/pnpm/store

## Install dependencies
pnpm install

## migration
pnpm -C backend run migrate:local
