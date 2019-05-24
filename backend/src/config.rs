use std::env::{var};
use dotenv::{dotenv};
use envy::from_env;

#[derive(Deserialize, Debug)]
pub struct DatabaseConfig {
  pub user: String,
  pub password: String,
  pub dbname: String,
  pub host: String,
  pub port: u16
}

pub struct Config {
  pub db: DatabaseConfig
}

pub fn load() {
  let mut c: Config;

  match var("RENV") {
    Ok(ref x) if x == "production" => None,
    _ => Some(dotenv().expect("Failed to read .env file")),
  };

  match from_env::<DatabaseConfig>() {
    Ok(config) => println!("{:?}", config),
    Err(e) => println!("Couldn't read config ({})", e),
  };
}