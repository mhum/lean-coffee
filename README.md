# Lean Coffee
Lean Coffee is a simple web application built with Ruby on Rails with the intention of being used for distributed [Lean Coffee](http://leancoffee.org) sessions.

## Features
- Create sessions for holding topics
- Add topics to board
- Add descriptions, up/down vote, and move topics
- Topic information is persisted in a SQLite DB
- Timer to keep track of time left discussing topic
- WebSocket support for topic and timer management

## Install
[Bundler](http://bundler.io/) is recommended for managing the gem dependencies. Simply use `gem install bundler` to install Bundler. Once Bundler is installed, use it by running `bundle install` to install all the gem dependencies.

Once the dependencies are installed, run `rake db:migrate` to prepare the database. After that, simply run with `rails s`!