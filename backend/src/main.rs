extern crate postgres;
extern crate dotenv;
extern crate envy;
extern crate serde;
#[macro_use]
extern crate serde_derive;

mod config;
mod db;

fn main() {
  let conf = config::Config::new();
  let connection = db::connect(&conf.db);

}