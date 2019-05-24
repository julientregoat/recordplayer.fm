extern crate postgres;
extern crate dotenv;
extern crate envy;
extern crate serde;
#[macro_use]
extern crate serde_derive;

mod config;

fn main() {
  config::load();
}