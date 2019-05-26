use std::env::{var};
use dotenv::{dotenv};
use envy::from_env;

#[derive(Deserialize, Debug)]
pub struct AppConfig {
  pub prefix: String
}

#[derive(Deserialize, Debug)]
pub struct DatabaseConfig {
  pub user: String,
  pub password: String,
  pub dbname: String,
  pub host: String,
  pub port: u16
}

pub struct Config {
  pub app: AppConfig,
  pub db: DatabaseConfig
}

impl Config {
  pub fn new() -> Config {
    match var("RENV") {
      Ok(ref x) if x == "production" => None,
      _ => Some(dotenv().expect("Failed to read .env file")),
    };

    let app = from_env::<AppConfig>().expect("Error loading app config!");
    let db = from_env::<DatabaseConfig>().expect("Error loading db config!");

    Config { db, app }
  }
}