#!/usr/bin/env bash
# exit on error
set -o errexit

bundle install
rails db:setup
rails s