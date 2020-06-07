#!/bin/bash
# if we do not want to use this build script, we do
# append "content_security_policy": "script-src 'self' 'sha256-OuGbMoprD7qcPi7ItS04tGMIZlGGXmA8jD06fSdcI6w='; object-src 'self'"
# to the manifest.json

build() {
    echo 'building react'

    rm -rf dist/*

    export INLINE_RUNTIME_CHUNK=false
    export GENERATE_SOURCEMAP=false

    react-scripts build

    mkdir -p dist
    cp -r build/* dist

    # mv dist/index.html dist/popup.html
}

build